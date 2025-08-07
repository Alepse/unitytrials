-- =====================================================
-- UnityTrials Database Schema UPDATE
-- =====================================================
-- This script adds missing tables and features to existing UnityTrials database
-- Run this AFTER the basic schema is already set up

-- Enable additional extensions if not already enabled
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search

-- =====================================================
-- ADD MISSING COLUMNS TO EXISTING TABLES
-- =====================================================

-- Add missing columns to users table (if they don't exist)
DO $$ 
BEGIN
    -- Add emergency_contact column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'emergency_contact') THEN
        ALTER TABLE public.users ADD COLUMN emergency_contact JSONB;
    END IF;
    
    -- Add insurance_info column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'insurance_info') THEN
        ALTER TABLE public.users ADD COLUMN insurance_info JSONB;
    END IF;
END $$;

-- Add missing columns to user_preferences table
DO $$ 
BEGIN
    -- Add search_frequency column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'user_preferences' AND column_name = 'search_frequency') THEN
        ALTER TABLE public.user_preferences ADD COLUMN search_frequency TEXT DEFAULT 'weekly';
    END IF;
    
    -- Add email_notifications column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'user_preferences' AND column_name = 'email_notifications') THEN
        ALTER TABLE public.user_preferences ADD COLUMN email_notifications BOOLEAN DEFAULT true;
    END IF;
    
    -- Add sms_notifications column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'user_preferences' AND column_name = 'sms_notifications') THEN
        ALTER TABLE public.user_preferences ADD COLUMN sms_notifications BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Add missing columns to trial_searches table
DO $$ 
BEGIN
    -- Add search_type column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'trial_searches' AND column_name = 'search_type') THEN
        ALTER TABLE public.trial_searches ADD COLUMN search_type TEXT DEFAULT 'general';
    END IF;
    
    -- Add session_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'trial_searches' AND column_name = 'session_id') THEN
        ALTER TABLE public.trial_searches ADD COLUMN session_id TEXT;
    END IF;
    
    -- Add search_duration_ms column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'trial_searches' AND column_name = 'search_duration_ms') THEN
        ALTER TABLE public.trial_searches ADD COLUMN search_duration_ms INTEGER;
    END IF;
END $$;

-- Add missing columns to saved_trials table
DO $$ 
BEGIN
    -- Add priority column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'saved_trials' AND column_name = 'priority') THEN
        ALTER TABLE public.saved_trials ADD COLUMN priority TEXT DEFAULT 'medium';
    END IF;
    
    -- Add reminder_date column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'saved_trials' AND column_name = 'reminder_date') THEN
        ALTER TABLE public.saved_trials ADD COLUMN reminder_date DATE;
    END IF;
END $$;

-- Add missing columns to trial_applications table
DO $$ 
BEGIN
    -- Add contact_person column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'trial_applications' AND column_name = 'contact_person') THEN
        ALTER TABLE public.trial_applications ADD COLUMN contact_person TEXT;
    END IF;
    
    -- Add contact_email column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'trial_applications' AND column_name = 'contact_email') THEN
        ALTER TABLE public.trial_applications ADD COLUMN contact_email TEXT;
    END IF;
    
    -- Add contact_phone column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'trial_applications' AND column_name = 'contact_phone') THEN
        ALTER TABLE public.trial_applications ADD COLUMN contact_phone TEXT;
    END IF;
    
    -- Add application_method column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'trial_applications' AND column_name = 'application_method') THEN
        ALTER TABLE public.trial_applications ADD COLUMN application_method TEXT;
    END IF;
    
    -- Update application_status to include 'completed'
    ALTER TABLE public.trial_applications 
    DROP CONSTRAINT IF EXISTS trial_applications_application_status_check;
    
    ALTER TABLE public.trial_applications 
    ADD CONSTRAINT trial_applications_application_status_check 
    CHECK (application_status IN ('interested', 'applied', 'contacted', 'enrolled', 'declined', 'completed'));
END $$;

-- Add missing columns to chatbot_conversations table
DO $$ 
BEGIN
    -- Add response_time_ms column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'chatbot_conversations' AND column_name = 'response_time_ms') THEN
        ALTER TABLE public.chatbot_conversations ADD COLUMN response_time_ms INTEGER;
    END IF;
    
    -- Add confidence_score column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'chatbot_conversations' AND column_name = 'confidence_score') THEN
        ALTER TABLE public.chatbot_conversations ADD COLUMN confidence_score DECIMAL(3,2);
    END IF;
END $$;

-- Add missing columns to trial_recommendations table
DO $$ 
BEGIN
    -- Add recommendation_factors column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'trial_recommendations' AND column_name = 'recommendation_factors') THEN
        ALTER TABLE public.trial_recommendations ADD COLUMN recommendation_factors JSONB;
    END IF;
    
    -- Add saved_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'trial_recommendations' AND column_name = 'saved_at') THEN
        ALTER TABLE public.trial_recommendations ADD COLUMN saved_at TIMESTAMP WITH TIME ZONE;
    END IF;
    
    -- Add applied_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'trial_recommendations' AND column_name = 'applied_at') THEN
        ALTER TABLE public.trial_recommendations ADD COLUMN applied_at TIMESTAMP WITH TIME ZONE;
    END IF;
END $$;

-- Add missing columns to analytics_events table
DO $$ 
BEGIN
    -- Add session_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'analytics_events' AND column_name = 'session_id') THEN
        ALTER TABLE public.analytics_events ADD COLUMN session_id TEXT;
    END IF;
END $$;

-- =====================================================
-- CREATE NEW TABLES (only if they don't exist)
-- =====================================================

-- AI model usage tracking
CREATE TABLE IF NOT EXISTS public.ai_model_usage (
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

-- USA trial cache for faster searches
CREATE TABLE IF NOT EXISTS public.usa_trial_cache (
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
CREATE TABLE IF NOT EXISTS public.usa_trial_stats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    search_date DATE DEFAULT CURRENT_DATE,
    total_searches INTEGER DEFAULT 0,
    successful_searches INTEGER DEFAULT 0,
    average_results_count DECIMAL(5,2),
    most_searched_conditions TEXT[],
    most_searched_locations TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User notifications
CREATE TABLE IF NOT EXISTS public.user_notifications (
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
CREATE TABLE IF NOT EXISTS public.email_templates (
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

-- System settings
CREATE TABLE IF NOT EXISTS public.system_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API rate limiting
CREATE TABLE IF NOT EXISTS public.api_rate_limits (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ip_address INET NOT NULL,
    endpoint TEXT NOT NULL,
    request_count INTEGER DEFAULT 1,
    window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ADD MISSING INDEXES
-- =====================================================

-- Add missing indexes (only if they don't exist)
DO $$ 
BEGIN
    -- Trial search indexes
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_trial_searches_type') THEN
        CREATE INDEX idx_trial_searches_type ON public.trial_searches(search_type);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_trial_searches_query_gin') THEN
        CREATE INDEX idx_trial_searches_query_gin ON public.trial_searches USING gin(to_tsvector('english', search_query));
    END IF;
    
    -- Users indexes
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_users_created_at') THEN
        CREATE INDEX idx_users_created_at ON public.users(created_at);
    END IF;
    
    -- Saved trials indexes
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_saved_trials_saved_at') THEN
        CREATE INDEX idx_saved_trials_saved_at ON public.saved_trials(saved_at);
    END IF;
    
    -- Chatbot indexes
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_chatbot_conversations_timestamp') THEN
        CREATE INDEX idx_chatbot_conversations_timestamp ON public.chatbot_conversations(message_timestamp);
    END IF;
    
    -- Trial applications indexes
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_trial_applications_status') THEN
        CREATE INDEX idx_trial_applications_status ON public.trial_applications(application_status);
    END IF;
    
    -- Analytics indexes
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_analytics_events_type') THEN
        CREATE INDEX idx_analytics_events_type ON public.analytics_events(event_type);
    END IF;
    
    -- Trial recommendations indexes
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_trial_recommendations_score') THEN
        CREATE INDEX idx_trial_recommendations_score ON public.trial_recommendations(recommendation_score DESC);
    END IF;
    
    -- USA trial cache indexes
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_usa_trial_cache_nct_id') THEN
        CREATE INDEX idx_usa_trial_cache_nct_id ON public.usa_trial_cache(nct_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_usa_trial_cache_keywords_gin') THEN
        CREATE INDEX idx_usa_trial_cache_keywords_gin ON public.usa_trial_cache USING gin(search_keywords);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_usa_trial_cache_condition_gin') THEN
        CREATE INDEX idx_usa_trial_cache_condition_gin ON public.usa_trial_cache USING gin(condition_keywords);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_usa_trial_cache_location_gin') THEN
        CREATE INDEX idx_usa_trial_cache_location_gin ON public.usa_trial_cache USING gin(location_keywords);
    END IF;
    
    -- Rate limiting indexes
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_api_rate_limits_ip_endpoint') THEN
        CREATE INDEX idx_api_rate_limits_ip_endpoint ON public.api_rate_limits(ip_address, endpoint);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_api_rate_limits_window') THEN
        CREATE INDEX idx_api_rate_limits_window ON public.api_rate_limits(window_start);
    END IF;
END $$;

-- =====================================================
-- ENABLE RLS ON NEW TABLES
-- =====================================================

-- Enable RLS on new tables
ALTER TABLE public.ai_model_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usa_trial_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usa_trial_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_rate_limits ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- ADD RLS POLICIES FOR NEW TABLES
-- =====================================================

-- AI model usage policies
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'ai_model_usage' AND policyname = 'Users can view own AI usage') THEN
        CREATE POLICY "Users can view own AI usage" ON public.ai_model_usage
            FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'ai_model_usage' AND policyname = 'Users can insert own AI usage') THEN
        CREATE POLICY "Users can insert own AI usage" ON public.ai_model_usage
            FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

-- User notifications policies
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_notifications' AND policyname = 'Users can view own notifications') THEN
        CREATE POLICY "Users can view own notifications" ON public.user_notifications
            FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_notifications' AND policyname = 'Users can update own notifications') THEN
        CREATE POLICY "Users can update own notifications" ON public.user_notifications
            FOR UPDATE USING (auth.uid() = user_id);
    END IF;
END $$;

-- =====================================================
-- ADD MISSING TRIGGERS
-- =====================================================

-- Add missing triggers (only if they don't exist)
DO $$ 
BEGIN
    -- Email templates updated_at trigger
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_email_templates_updated_at') THEN
        CREATE TRIGGER update_email_templates_updated_at BEFORE UPDATE ON public.email_templates
            FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END $$;

-- =====================================================
-- ADD MISSING FUNCTIONS
-- =====================================================

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
-- INSERT DEFAULT DATA (only if not exists)
-- =====================================================

-- Insert default email templates (only if they don't exist)
INSERT INTO public.email_templates (template_name, subject, html_content, text_content, variables) 
SELECT 
    'welcome_email',
    'Welcome to UnityTrials - Your Clinical Trial Matching Platform',
    '<h1>Welcome to UnityTrials!</h1><p>Thank you for joining our platform. We''re here to help you find the right clinical trials.</p>',
    'Welcome to UnityTrials! Thank you for joining our platform. We''re here to help you find the right clinical trials.',
    '{"user_name": "string", "trial_count": "number"}'
WHERE NOT EXISTS (SELECT 1 FROM public.email_templates WHERE template_name = 'welcome_email');

INSERT INTO public.email_templates (template_name, subject, html_content, text_content, variables) 
SELECT 
    'trial_recommendation',
    'New Clinical Trial Recommendations for You',
    '<h1>New Trial Recommendations</h1><p>We found {{trial_count}} new trials that match your criteria.</p>',
    'New Trial Recommendations: We found {{trial_count}} new trials that match your criteria.',
    '{"trial_count": "number", "user_name": "string"}'
WHERE NOT EXISTS (SELECT 1 FROM public.email_templates WHERE template_name = 'trial_recommendation');

INSERT INTO public.email_templates (template_name, subject, html_content, text_content, variables) 
SELECT 
    'trial_reminder',
    'Reminder: Clinical Trial Application Due',
    '<h1>Trial Application Reminder</h1><p>Don''t forget to apply for the clinical trial: {{trial_title}}</p>',
    'Trial Application Reminder: Don''t forget to apply for the clinical trial: {{trial_title}}',
    '{"trial_title": "string", "due_date": "date"}'
WHERE NOT EXISTS (SELECT 1 FROM public.email_templates WHERE template_name = 'trial_reminder');

-- Insert default system settings (only if they don't exist)
INSERT INTO public.system_settings (setting_key, setting_value, description) 
SELECT 
    'ai_model_config',
    '{"default_model": "huggingface", "fallback_model": "ollama", "max_tokens": 1000}',
    'AI model configuration for chatbot'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE setting_key = 'ai_model_config');

INSERT INTO public.system_settings (setting_key, setting_value, description) 
SELECT 
    'search_config',
    '{"default_limit": 10, "max_limit": 50, "cache_duration_hours": 24}',
    'Search configuration settings'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE setting_key = 'search_config');

INSERT INTO public.system_settings (setting_key, setting_value, description) 
SELECT 
    'notification_config',
    '{"email_enabled": true, "sms_enabled": false, "frequency": "weekly"}',
    'Notification configuration settings'
WHERE NOT EXISTS (SELECT 1 FROM public.system_settings WHERE setting_key = 'notification_config');

-- =====================================================
-- UPDATE COMPLETE
-- =====================================================
-- This update script has successfully added all missing features
-- to your existing UnityTrials database without conflicts. 