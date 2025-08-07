-- =====================================================
-- UnityTrials Complete Database Schema for Supabase
-- =====================================================
-- This schema supports the complete UnityTrials platform
-- including user management, trial searches, chatbot interactions,
-- and USA-only clinical trial matching

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search

-- =====================================================
-- CORE USER MANAGEMENT TABLES
-- =====================================================

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    date_of_birth DATE,
    phone TEXT,
    location TEXT,
    medical_conditions TEXT[],
    emergency_contact JSONB,
    insurance_info JSONB,
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
    search_frequency TEXT DEFAULT 'weekly', -- daily, weekly, monthly
    email_notifications BOOLEAN DEFAULT true,
    sms_notifications BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TRIAL SEARCH AND TRACKING TABLES
-- =====================================================

-- Trial search history
CREATE TABLE public.trial_searches (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    search_query TEXT NOT NULL,
    search_filters JSONB,
    results_count INTEGER,
    search_type TEXT DEFAULT 'general', -- general, usa_only, advanced
    search_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT,
    session_id TEXT,
    search_duration_ms INTEGER -- how long the search took
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
    priority TEXT DEFAULT 'medium', -- low, medium, high
    reminder_date DATE,
    UNIQUE(user_id, nct_id)
);

-- Trial application tracking
CREATE TABLE public.trial_applications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    nct_id TEXT NOT NULL,
    application_status TEXT DEFAULT 'interested', -- interested, applied, contacted, enrolled, declined, completed
    application_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    contact_date TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    follow_up_date DATE,
    contact_person TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    application_method TEXT, -- email, phone, website, in-person
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CHATBOT AND AI INTERACTION TABLES
-- =====================================================

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
    ip_address INET,
    response_time_ms INTEGER,
    confidence_score DECIMAL(3,2)
);

-- AI model usage tracking
CREATE TABLE public.ai_model_usage (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    model_name TEXT NOT NULL, -- 'ollama', 'huggingface', 'openai'
    request_type TEXT NOT NULL, -- 'general_chat', 'trial_search', 'intent_detection'
    tokens_used INTEGER,
    response_time_ms INTEGER,
    cost_usd DECIMAL(10,4),
    success BOOLEAN,
    error_message TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ANALYTICS AND REPORTING TABLES
-- =====================================================

-- Analytics and usage tracking
CREATE TABLE public.analytics_events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- 'page_view', 'trial_search', 'trial_view', 'chatbot_interaction', 'trial_save', 'trial_apply'
    event_data JSONB,
    page_url TEXT,
    user_agent TEXT,
    ip_address INET,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_id TEXT
);

-- Trial recommendations (AI-generated)
CREATE TABLE public.trial_recommendations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    nct_id TEXT NOT NULL,
    recommendation_score DECIMAL(3,2), -- 0.00 to 1.00
    recommendation_reason TEXT,
    recommendation_factors JSONB, -- why this trial was recommended
    recommended_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    viewed_at TIMESTAMP WITH TIME ZONE,
    clicked_at TIMESTAMP WITH TIME ZONE,
    saved_at TIMESTAMP WITH TIME ZONE,
    applied_at TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- USA-SPECIFIC TRIAL DATA TABLES
-- =====================================================

-- USA trial cache for faster searches
CREATE TABLE public.usa_trial_cache (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nct_id TEXT UNIQUE NOT NULL,
    trial_data JSONB NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    search_keywords TEXT[], -- for faster text search
    condition_keywords TEXT[],
    location_keywords TEXT[],
    phase_keywords TEXT[]
);

-- USA trial search statistics
CREATE TABLE public.usa_trial_stats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    search_date DATE DEFAULT CURRENT_DATE,
    total_searches INTEGER DEFAULT 0,
    successful_searches INTEGER DEFAULT 0,
    average_results_count DECIMAL(5,2),
    most_searched_conditions TEXT[],
    most_searched_locations TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- NOTIFICATION AND COMMUNICATION TABLES
-- =====================================================

-- User notifications
CREATE TABLE public.user_notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    notification_type TEXT NOT NULL, -- 'new_trial', 'reminder', 'update', 'system'
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    data JSONB,
    read_at TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    delivery_method TEXT DEFAULT 'email' -- email, sms, push
);

-- Email templates
CREATE TABLE public.email_templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    template_name TEXT UNIQUE NOT NULL,
    subject TEXT NOT NULL,
    html_content TEXT NOT NULL,
    text_content TEXT NOT NULL,
    variables JSONB, -- template variables
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- SYSTEM CONFIGURATION TABLES
-- =====================================================

-- System settings
CREATE TABLE public.system_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API rate limiting
CREATE TABLE public.api_rate_limits (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ip_address INET NOT NULL,
    endpoint TEXT NOT NULL,
    request_count INTEGER DEFAULT 1,
    window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- User indexes
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_created_at ON public.users(created_at);

-- Trial search indexes
CREATE INDEX idx_trial_searches_user_id ON public.trial_searches(user_id);
CREATE INDEX idx_trial_searches_timestamp ON public.trial_searches(search_timestamp);
CREATE INDEX idx_trial_searches_type ON public.trial_searches(search_type);
CREATE INDEX idx_trial_searches_query_gin ON public.trial_searches USING gin(to_tsvector('english', search_query));

-- Saved trials indexes
CREATE INDEX idx_saved_trials_user_id ON public.saved_trials(user_id);
CREATE INDEX idx_saved_trials_nct_id ON public.saved_trials(nct_id);
CREATE INDEX idx_saved_trials_saved_at ON public.saved_trials(saved_at);

-- Chatbot indexes
CREATE INDEX idx_chatbot_conversations_session_id ON public.chatbot_conversations(session_id);
CREATE INDEX idx_chatbot_conversations_user_id ON public.chatbot_conversations(user_id);
CREATE INDEX idx_chatbot_conversations_timestamp ON public.chatbot_conversations(message_timestamp);

-- Trial applications indexes
CREATE INDEX idx_trial_applications_user_id ON public.trial_applications(user_id);
CREATE INDEX idx_trial_applications_nct_id ON public.trial_applications(nct_id);
CREATE INDEX idx_trial_applications_status ON public.trial_applications(application_status);

-- Analytics indexes
CREATE INDEX idx_analytics_events_user_id ON public.analytics_events(user_id);
CREATE INDEX idx_analytics_events_timestamp ON public.analytics_events(timestamp);
CREATE INDEX idx_analytics_events_type ON public.analytics_events(event_type);

-- Trial recommendations indexes
CREATE INDEX idx_trial_recommendations_user_id ON public.trial_recommendations(user_id);
CREATE INDEX idx_trial_recommendations_score ON public.trial_recommendations(recommendation_score DESC);

-- USA trial cache indexes
CREATE INDEX idx_usa_trial_cache_nct_id ON public.usa_trial_cache(nct_id);
CREATE INDEX idx_usa_trial_cache_keywords_gin ON public.usa_trial_cache USING gin(search_keywords);
CREATE INDEX idx_usa_trial_cache_condition_gin ON public.usa_trial_cache USING gin(condition_keywords);
CREATE INDEX idx_usa_trial_cache_location_gin ON public.usa_trial_cache USING gin(location_keywords);

-- Rate limiting indexes
CREATE INDEX idx_api_rate_limits_ip_endpoint ON public.api_rate_limits(ip_address, endpoint);
CREATE INDEX idx_api_rate_limits_window ON public.api_rate_limits(window_start);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trial_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_trials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trial_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trial_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notifications ENABLE ROW LEVEL SECURITY;

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

-- User notifications policies
CREATE POLICY "Users can view own notifications" ON public.user_notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON public.user_notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to create user profile on signup
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

CREATE TRIGGER update_email_templates_updated_at BEFORE UPDATE ON public.email_templates
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to get trial recommendations for a user
CREATE OR REPLACE FUNCTION public.get_trial_recommendations(user_uuid UUID, limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
    nct_id TEXT,
    recommendation_score DECIMAL(3,2),
    recommendation_reason TEXT,
    trial_data JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT tr.nct_id, tr.recommendation_score, tr.recommendation_reason, utc.trial_data
    FROM public.trial_recommendations tr
    LEFT JOIN public.usa_trial_cache utc ON tr.nct_id = utc.nct_id
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

-- Function to search USA trials with caching
CREATE OR REPLACE FUNCTION public.search_usa_trials(
    search_term TEXT,
    condition_filter TEXT DEFAULT NULL,
    location_filter TEXT DEFAULT NULL,
    phase_filter TEXT DEFAULT NULL,
    limit_count INTEGER DEFAULT 10
)
RETURNS TABLE (
    nct_id TEXT,
    trial_data JSONB,
    relevance_score DECIMAL(3,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        utc.nct_id,
        utc.trial_data,
        CASE 
            WHEN search_term IS NOT NULL AND utc.search_keywords && string_to_array(lower(search_term), ' ') THEN 0.9
            WHEN condition_filter IS NOT NULL AND utc.condition_keywords && string_to_array(lower(condition_filter), ' ') THEN 0.8
            WHEN location_filter IS NOT NULL AND utc.location_keywords && string_to_array(lower(location_filter), ' ') THEN 0.7
            ELSE 0.5
        END as relevance_score
    FROM public.usa_trial_cache utc
    WHERE (search_term IS NULL OR utc.search_keywords && string_to_array(lower(search_term), ' '))
        AND (condition_filter IS NULL OR utc.condition_keywords && string_to_array(lower(condition_filter), ' '))
        AND (location_filter IS NULL OR utc.location_keywords && string_to_array(lower(location_filter), ' '))
        AND (phase_filter IS NULL OR utc.phase_keywords && string_to_array(lower(phase_filter), ' '))
    ORDER BY relevance_score DESC, utc.last_updated DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- INITIAL DATA INSERTS
-- =====================================================

-- Insert default email templates
INSERT INTO public.email_templates (template_name, subject, html_content, text_content, variables) VALUES
(
    'welcome_email',
    'Welcome to UnityTrials - Your Clinical Trial Matching Platform',
    '<h1>Welcome to UnityTrials!</h1><p>Thank you for joining our platform. We''re here to help you find the right clinical trials.</p>',
    'Welcome to UnityTrials! Thank you for joining our platform. We''re here to help you find the right clinical trials.',
    '{"user_name": "string", "trial_count": "number"}'
),
(
    'trial_recommendation',
    'New Clinical Trial Recommendations for You',
    '<h1>New Trial Recommendations</h1><p>We found {{trial_count}} new trials that match your criteria.</p>',
    'New Trial Recommendations: We found {{trial_count}} new trials that match your criteria.',
    '{"trial_count": "number", "user_name": "string"}'
),
(
    'trial_reminder',
    'Reminder: Clinical Trial Application Due',
    '<h1>Trial Application Reminder</h1><p>Don''t forget to apply for the clinical trial: {{trial_title}}</p>',
    'Trial Application Reminder: Don''t forget to apply for the clinical trial: {{trial_title}}',
    '{"trial_title": "string", "due_date": "date"}'
);

-- Insert default system settings
INSERT INTO public.system_settings (setting_key, setting_value, description) VALUES
(
    'ai_model_config',
    '{"default_model": "huggingface", "fallback_model": "ollama", "max_tokens": 1000}',
    'AI model configuration for chatbot'
),
(
    'search_config',
    '{"default_limit": 10, "max_limit": 50, "cache_duration_hours": 24}',
    'Search configuration settings'
),
(
    'notification_config',
    '{"email_enabled": true, "sms_enabled": false, "frequency": "weekly"}',
    'Notification configuration settings'
);

-- =====================================================
-- COMMENTS AND DOCUMENTATION
-- =====================================================

COMMENT ON TABLE public.users IS 'User profiles extending Supabase auth';
COMMENT ON TABLE public.user_preferences IS 'User preferences for trial matching';
COMMENT ON TABLE public.trial_searches IS 'Search history and analytics';
COMMENT ON TABLE public.saved_trials IS 'User-saved/favorited trials';
COMMENT ON TABLE public.trial_applications IS 'Trial application tracking';
COMMENT ON TABLE public.chatbot_conversations IS 'AI chatbot conversation history';
COMMENT ON TABLE public.ai_model_usage IS 'AI model usage tracking and billing';
COMMENT ON TABLE public.analytics_events IS 'User behavior analytics';
COMMENT ON TABLE public.trial_recommendations IS 'AI-generated trial recommendations';
COMMENT ON TABLE public.usa_trial_cache IS 'Cached USA trial data for fast searches';
COMMENT ON TABLE public.user_notifications IS 'User notification system';
COMMENT ON TABLE public.email_templates IS 'Email template system';

-- =====================================================
-- SCHEMA COMPLETE
-- =====================================================
-- This schema provides a complete foundation for UnityTrials
-- with USA-only clinical trial matching, AI chatbot integration,
-- user management, analytics, and notification systems. 