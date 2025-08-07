-- Supabase Database Schema for UnityTrials
-- This schema supports user management, trial searches, and chatbot interactions

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    date_of_birth DATE,
    phone TEXT,
    location TEXT,
    medical_conditions TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User preferences for trial matching
CREATE TABLE public.user_preferences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    preferred_conditions TEXT[],
    preferred_locations TEXT[],
    preferred_phases TEXT[],
    age_range_min INTEGER,
    age_range_max INTEGER,
    gender TEXT,
    travel_distance INTEGER, -- in miles
    notification_preferences JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trial search history
CREATE TABLE public.trial_searches (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    search_query TEXT NOT NULL,
    search_filters JSONB,
    results_count INTEGER,
    search_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT
);

-- Saved/favorited trials
CREATE TABLE public.saved_trials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    nct_id TEXT NOT NULL,
    trial_title TEXT,
    condition TEXT,
    phase TEXT,
    status TEXT,
    location TEXT,
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT,
    UNIQUE(user_id, nct_id)
);

-- Chatbot conversation history
CREATE TABLE public.chatbot_conversations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    message_type TEXT NOT NULL, -- 'user' or 'bot'
    message_content TEXT NOT NULL,
    message_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    intent TEXT,
    entities JSONB,
    trials_returned JSONB,
    user_agent TEXT,
    ip_address INET
);

-- Trial application tracking
CREATE TABLE public.trial_applications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    nct_id TEXT NOT NULL,
    application_status TEXT DEFAULT 'interested', -- interested, applied, contacted, enrolled, declined
    application_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    contact_date TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    follow_up_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics and usage tracking
CREATE TABLE public.analytics_events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- 'page_view', 'trial_search', 'trial_view', 'chatbot_interaction', etc.
    event_data JSONB,
    page_url TEXT,
    user_agent TEXT,
    ip_address INET,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trial recommendations (AI-generated)
CREATE TABLE public.trial_recommendations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    nct_id TEXT NOT NULL,
    recommendation_score DECIMAL(3,2), -- 0.00 to 1.00
    recommendation_reason TEXT,
    recommended_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    viewed_at TIMESTAMP WITH TIME ZONE,
    clicked_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_trial_searches_user_id ON public.trial_searches(user_id);
CREATE INDEX idx_trial_searches_timestamp ON public.trial_searches(search_timestamp);
CREATE INDEX idx_saved_trials_user_id ON public.saved_trials(user_id);
CREATE INDEX idx_saved_trials_nct_id ON public.saved_trials(nct_id);
CREATE INDEX idx_chatbot_conversations_session_id ON public.chatbot_conversations(session_id);
CREATE INDEX idx_chatbot_conversations_user_id ON public.chatbot_conversations(user_id);
CREATE INDEX idx_trial_applications_user_id ON public.trial_applications(user_id);
CREATE INDEX idx_trial_applications_nct_id ON public.trial_applications(nct_id);
CREATE INDEX idx_analytics_events_user_id ON public.analytics_events(user_id);
CREATE INDEX idx_analytics_events_timestamp ON public.analytics_events(timestamp);
CREATE INDEX idx_trial_recommendations_user_id ON public.trial_recommendations(user_id);

-- Row Level Security (RLS) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trial_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_trials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trial_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trial_recommendations ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- User preferences policies
CREATE POLICY "Users can manage own preferences" ON public.user_preferences
    FOR ALL USING (auth.uid() = user_id);

-- Trial searches policies
CREATE POLICY "Users can view own searches" ON public.trial_searches
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own searches" ON public.trial_searches
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Saved trials policies
CREATE POLICY "Users can manage own saved trials" ON public.saved_trials
    FOR ALL USING (auth.uid() = user_id);

-- Chatbot conversations policies
CREATE POLICY "Users can view own conversations" ON public.chatbot_conversations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversations" ON public.chatbot_conversations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trial applications policies
CREATE POLICY "Users can manage own applications" ON public.trial_applications
    FOR ALL USING (auth.uid() = user_id);

-- Analytics events policies
CREATE POLICY "Users can view own analytics" ON public.analytics_events
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analytics" ON public.analytics_events
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trial recommendations policies
CREATE POLICY "Users can view own recommendations" ON public.trial_recommendations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own recommendations" ON public.trial_recommendations
    FOR UPDATE USING (auth.uid() = user_id);

-- Functions for common operations
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON public.user_preferences
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_trial_applications_updated_at BEFORE UPDATE ON public.trial_applications
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to get trial recommendations for a user
CREATE OR REPLACE FUNCTION public.get_trial_recommendations(user_uuid UUID, limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
    nct_id TEXT,
    recommendation_score DECIMAL(3,2),
    recommendation_reason TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT tr.nct_id, tr.recommendation_score, tr.recommendation_reason
    FROM public.trial_recommendations tr
    WHERE tr.user_id = user_uuid
    ORDER BY tr.recommendation_score DESC, tr.recommended_at DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log analytics event
CREATE OR REPLACE FUNCTION public.log_analytics_event(
    event_type TEXT,
    event_data JSONB DEFAULT '{}'::jsonb,
    page_url TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    event_id UUID;
BEGIN
    INSERT INTO public.analytics_events (user_id, event_type, event_data, page_url, user_agent, ip_address)
    VALUES (
        auth.uid(),
        event_type,
        event_data,
        page_url,
        current_setting('request.headers')::json->>'user-agent',
        inet_client_addr()
    )
    RETURNING id INTO event_id;
    
    RETURN event_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 