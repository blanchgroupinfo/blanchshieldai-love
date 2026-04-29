export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      baptism_registrations: {
        Row: {
          created_at: string
          date_of_baptism: string | null
          full_name: string
          hebrew_name: string | null
          id: string
          location_of_baptism: string | null
          officiant: string | null
          registration_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date_of_baptism?: string | null
          full_name: string
          hebrew_name?: string | null
          id?: string
          location_of_baptism?: string | null
          officiant?: string | null
          registration_type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date_of_baptism?: string | null
          full_name?: string
          hebrew_name?: string | null
          id?: string
          location_of_baptism?: string | null
          officiant?: string | null
          registration_type?: string
          user_id?: string
        }
        Relationships: []
      }
      build_status: {
        Row: {
          category: string
          component_name: string
          created_at: string
          error_message: string | null
          file_path: string | null
          id: string
          run_at: string
          status: string
          suggested_fix: string | null
        }
        Insert: {
          category?: string
          component_name: string
          created_at?: string
          error_message?: string | null
          file_path?: string | null
          id?: string
          run_at?: string
          status?: string
          suggested_fix?: string | null
        }
        Update: {
          category?: string
          component_name?: string
          created_at?: string
          error_message?: string | null
          file_path?: string | null
          id?: string
          run_at?: string
          status?: string
          suggested_fix?: string | null
        }
        Relationships: []
      }
      calendar_events: {
        Row: {
          calendar_day: number
          calendar_month: number
          calendar_year: number
          created_at: string
          description: string | null
          event_type: string | null
          id: string
          is_recurring: boolean | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          calendar_day: number
          calendar_month: number
          calendar_year: number
          created_at?: string
          description?: string | null
          event_type?: string | null
          id?: string
          is_recurring?: boolean | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          calendar_day?: number
          calendar_month?: number
          calendar_year?: number
          created_at?: string
          description?: string | null
          event_type?: string | null
          id?: string
          is_recurring?: boolean | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          created_at: string
          id: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          subject?: string
        }
        Relationships: []
      }
      enrollment_submissions: {
        Row: {
          compounding: string
          created_at: string
          deposit_amount: string
          email: string
          full_name: string
          id: string
          phone: string
          program_duration: string
          program_name: string
          status: string
          updated_at: string
        }
        Insert: {
          compounding?: string
          created_at?: string
          deposit_amount: string
          email: string
          full_name: string
          id?: string
          phone: string
          program_duration: string
          program_name: string
          status?: string
          updated_at?: string
        }
        Update: {
          compounding?: string
          created_at?: string
          deposit_amount?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string
          program_duration?: string
          program_name?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      file_versions: {
        Row: {
          created_at: string
          file_path: string
          file_size: number | null
          id: string
          notes: string | null
          user_id: string
          version_number: number
        }
        Insert: {
          created_at?: string
          file_path: string
          file_size?: number | null
          id?: string
          notes?: string | null
          user_id: string
          version_number?: number
        }
        Update: {
          created_at?: string
          file_path?: string
          file_size?: number | null
          id?: string
          notes?: string | null
          user_id?: string
          version_number?: number
        }
        Relationships: []
      }
      holy_day_reminders: {
        Row: {
          created_at: string
          email_address: string | null
          email_enabled: boolean
          holy_day_name: string
          id: string
          phone_number: string | null
          remind_days_before: number | null
          reminder_enabled: boolean | null
          sms_enabled: boolean
          user_id: string
          whatsapp_enabled: boolean
        }
        Insert: {
          created_at?: string
          email_address?: string | null
          email_enabled?: boolean
          holy_day_name: string
          id?: string
          phone_number?: string | null
          remind_days_before?: number | null
          reminder_enabled?: boolean | null
          sms_enabled?: boolean
          user_id: string
          whatsapp_enabled?: boolean
        }
        Update: {
          created_at?: string
          email_address?: string | null
          email_enabled?: boolean
          holy_day_name?: string
          id?: string
          phone_number?: string | null
          remind_days_before?: number | null
          reminder_enabled?: boolean | null
          sms_enabled?: boolean
          user_id?: string
          whatsapp_enabled?: boolean
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          subscribed_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
        }
        Relationships: []
      }
      prayer_requests: {
        Row: {
          created_at: string
          full_name: string
          hebrew_name: string | null
          id: string
          prayer_message: string
          request_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          full_name: string
          hebrew_name?: string | null
          id?: string
          prayer_message: string
          request_type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          full_name?: string
          hebrew_name?: string | null
          id?: string
          prayer_message?: string
          request_type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      shared_files: {
        Row: {
          access_type: string
          created_at: string
          expires_at: string | null
          file_path: string
          id: string
          is_active: boolean
          owner_id: string
          share_token: string
        }
        Insert: {
          access_type?: string
          created_at?: string
          expires_at?: string | null
          file_path: string
          id?: string
          is_active?: boolean
          owner_id: string
          share_token?: string
        }
        Update: {
          access_type?: string
          created_at?: string
          expires_at?: string | null
          file_path?: string
          id?: string
          is_active?: boolean
          owner_id?: string
          share_token?: string
        }
        Relationships: []
      }
      user_locations: {
        Row: {
          created_at: string
          id: string
          latitude: number
          location_name: string | null
          longitude: number
          timezone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          latitude: number
          location_name?: string | null
          longitude: number
          timezone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          latitude?: number
          location_name?: string | null
          longitude?: number
          timezone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
