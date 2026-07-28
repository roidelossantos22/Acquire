import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types based on our schema
export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      workflows: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          category_id: string | null
          status: string
          content: any
          search_keywords: string[]
          common_phrases: string[]
          reading_time_minutes: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          category_id?: string | null
          status?: string
          content?: any
          search_keywords?: string[]
          common_phrases?: string[]
          reading_time_minutes?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          category_id?: string | null
          status?: string
          content?: any
          search_keywords?: string[]
          common_phrases?: string[]
          reading_time_minutes?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      scripts: {
        Row: {
          id: string
          title: string
          content: string
          internal_note: string | null
          communication_channel: string | null
          situation: string | null
          workflow_id: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          internal_note?: string | null
          communication_channel?: string | null
          situation?: string | null
          workflow_id?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          internal_note?: string | null
          communication_channel?: string | null
          situation?: string | null
          workflow_id?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
