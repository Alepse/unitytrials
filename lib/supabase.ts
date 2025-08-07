import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          date_of_birth: string | null
          phone: string | null
          location: string | null
          medical_conditions: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          date_of_birth?: string | null
          phone?: string | null
          location?: string | null
          medical_conditions?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          date_of_birth?: string | null
          phone?: string | null
          location?: string | null
          medical_conditions?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          preferred_conditions: string[] | null
          preferred_locations: string[] | null
          preferred_phases: string[] | null
          age_range_min: number | null
          age_range_max: number | null
          gender: string | null
          travel_distance: number | null
          notification_preferences: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          preferred_conditions?: string[] | null
          preferred_locations?: string[] | null
          preferred_phases?: string[] | null
          age_range_min?: number | null
          age_range_max?: number | null
          gender?: string | null
          travel_distance?: number | null
          notification_preferences?: any | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          preferred_conditions?: string[] | null
          preferred_locations?: string[] | null
          preferred_phases?: string[] | null
          age_range_min?: number | null
          age_range_max?: number | null
          gender?: string | null
          travel_distance?: number | null
          notification_preferences?: any | null
          created_at?: string
          updated_at?: string
        }
      }
      trial_searches: {
        Row: {
          id: string
          user_id: string | null
          search_query: string
          search_filters: any | null
          results_count: number | null
          search_timestamp: string
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          search_query: string
          search_filters?: any | null
          results_count?: number | null
          search_timestamp?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          search_query?: string
          search_filters?: any | null
          results_count?: number | null
          search_timestamp?: string
          ip_address?: string | null
          user_agent?: string | null
        }
      }
      saved_trials: {
        Row: {
          id: string
          user_id: string
          nct_id: string
          trial_title: string | null
          condition: string | null
          phase: string | null
          status: string | null
          location: string | null
          saved_at: string
          notes: string | null
        }
        Insert: {
          id?: string
          user_id: string
          nct_id: string
          trial_title?: string | null
          condition?: string | null
          phase?: string | null
          status?: string | null
          location?: string | null
          saved_at?: string
          notes?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          nct_id?: string
          trial_title?: string | null
          condition?: string | null
          phase?: string | null
          status?: string | null
          location?: string | null
          saved_at?: string
          notes?: string | null
        }
      }
      chatbot_conversations: {
        Row: {
          id: string
          user_id: string | null
          session_id: string
          message_type: string
          message_content: string
          message_timestamp: string
          intent: string | null
          entities: any | null
          trials_returned: any | null
          user_agent: string | null
          ip_address: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_id: string
          message_type: string
          message_content: string
          message_timestamp?: string
          intent?: string | null
          entities?: any | null
          trials_returned?: any | null
          user_agent?: string | null
          ip_address?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          session_id?: string
          message_type?: string
          message_content?: string
          message_timestamp?: string
          intent?: string | null
          entities?: any | null
          trials_returned?: any | null
          user_agent?: string | null
          ip_address?: string | null
        }
      }
      trial_applications: {
        Row: {
          id: string
          user_id: string
          nct_id: string
          application_status: string
          application_date: string
          contact_date: string | null
          notes: string | null
          follow_up_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          nct_id: string
          application_status?: string
          application_date?: string
          contact_date?: string | null
          notes?: string | null
          follow_up_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          nct_id?: string
          application_status?: string
          application_date?: string
          contact_date?: string | null
          notes?: string | null
          follow_up_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      analytics_events: {
        Row: {
          id: string
          user_id: string | null
          event_type: string
          event_data: any | null
          page_url: string | null
          user_agent: string | null
          ip_address: string | null
          timestamp: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          event_type: string
          event_data?: any | null
          page_url?: string | null
          user_agent?: string | null
          ip_address?: string | null
          timestamp?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          event_type?: string
          event_data?: any | null
          page_url?: string | null
          user_agent?: string | null
          ip_address?: string | null
          timestamp?: string
        }
      }
      trial_recommendations: {
        Row: {
          id: string
          user_id: string
          nct_id: string
          recommendation_score: number | null
          recommendation_reason: string | null
          recommended_at: string
          viewed_at: string | null
          clicked_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          nct_id: string
          recommendation_score?: number | null
          recommendation_reason?: string | null
          recommended_at?: string
          viewed_at?: string | null
          clicked_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          nct_id?: string
          recommendation_score?: number | null
          recommendation_reason?: string | null
          recommended_at?: string
          viewed_at?: string | null
          clicked_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_trial_recommendations: {
        Args: {
          user_uuid: string
          limit_count?: number
        }
        Returns: {
          nct_id: string
          recommendation_score: number
          recommendation_reason: string
        }[]
      }
      log_analytics_event: {
        Args: {
          event_type: string
          event_data?: any
          page_url?: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
} 