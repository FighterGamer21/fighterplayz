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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          body: string
          created_at: string
          id: string
          pinned: boolean
          published: boolean
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          pinned?: boolean
          published?: boolean
          title: string
          type?: string
          updated_at?: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          pinned?: boolean
          published?: boolean
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          content: string
          cover_image: string | null
          created_at: string
          excerpt: string
          id: string
          published: boolean
          slug: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          cover_image?: string | null
          created_at?: string
          excerpt: string
          id?: string
          published?: boolean
          slug: string
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          cover_image?: string | null
          created_at?: string
          excerpt?: string
          id?: string
          published?: boolean
          slug?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          budget_range: string | null
          created_at: string
          discord: string | null
          email: string
          id: string
          message: string
          name: string
          project_type: string | null
          status: Database["public"]["Enums"]["message_status"]
          subject: string
        }
        Insert: {
          budget_range?: string | null
          created_at?: string
          discord?: string | null
          email: string
          id?: string
          message: string
          name: string
          project_type?: string | null
          status?: Database["public"]["Enums"]["message_status"]
          subject: string
        }
        Update: {
          budget_range?: string | null
          created_at?: string
          discord?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          project_type?: string | null
          status?: Database["public"]["Enums"]["message_status"]
          subject?: string
        }
        Relationships: []
      }
      experiences: {
        Row: {
          currently_working: boolean
          description: string
          end_date: string | null
          id: string
          logo: string | null
          organization: string
          start_date: string
          title: string
          type: string
        }
        Insert: {
          currently_working?: boolean
          description: string
          end_date?: string | null
          id?: string
          logo?: string | null
          organization: string
          start_date: string
          title: string
          type: string
        }
        Update: {
          currently_working?: boolean
          description?: string
          end_date?: string | null
          id?: string
          logo?: string | null
          organization?: string
          start_date?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      hire_tickets: {
        Row: {
          admin_notes: string | null
          budget_range: string | null
          converted_amount: number | null
          created_at: string
          details: string
          discord: string | null
          display_currency: string | null
          email: string
          id: string
          name: string
          priority: string
          project_type: string
          reference_link: string | null
          service_price_inr: number | null
          service_slug: string | null
          status: Database["public"]["Enums"]["hire_status"]
          ticket_id: string
          timeline: string | null
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          budget_range?: string | null
          converted_amount?: number | null
          created_at?: string
          details: string
          discord?: string | null
          display_currency?: string | null
          email: string
          id?: string
          name: string
          priority?: string
          project_type: string
          reference_link?: string | null
          service_price_inr?: number | null
          service_slug?: string | null
          status?: Database["public"]["Enums"]["hire_status"]
          ticket_id?: string
          timeline?: string | null
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          budget_range?: string | null
          converted_amount?: number | null
          created_at?: string
          details?: string
          discord?: string | null
          display_currency?: string | null
          email?: string
          id?: string
          name?: string
          priority?: string
          project_type?: string
          reference_link?: string | null
          service_price_inr?: number | null
          service_slug?: string | null
          status?: Database["public"]["Enums"]["hire_status"]
          ticket_id?: string
          timeline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      plugins: {
        Row: {
          changelog: Json
          commands: Json
          config_example: string | null
          created_at: string
          dependencies: string[]
          description: string
          docs_url: string | null
          download_url: string | null
          featured: boolean
          features: string[]
          gallery: string[]
          github_url: string | null
          id: string
          image: string | null
          name: string
          permissions: Json
          plugin_type: string
          price: number | null
          price_type: string
          slug: string
          spigot_url: string | null
          status: Database["public"]["Enums"]["content_status"]
          supported_versions: string[]
          tagline: string
          updated_at: string
          version: string
        }
        Insert: {
          changelog?: Json
          commands?: Json
          config_example?: string | null
          created_at?: string
          dependencies?: string[]
          description: string
          docs_url?: string | null
          download_url?: string | null
          featured?: boolean
          features?: string[]
          gallery?: string[]
          github_url?: string | null
          id?: string
          image?: string | null
          name: string
          permissions?: Json
          plugin_type: string
          price?: number | null
          price_type?: string
          slug: string
          spigot_url?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          supported_versions?: string[]
          tagline: string
          updated_at?: string
          version: string
        }
        Update: {
          changelog?: Json
          commands?: Json
          config_example?: string | null
          created_at?: string
          dependencies?: string[]
          description?: string
          docs_url?: string | null
          download_url?: string | null
          featured?: boolean
          features?: string[]
          gallery?: string[]
          github_url?: string | null
          id?: string
          image?: string | null
          name?: string
          permissions?: Json
          plugin_type?: string
          price?: number | null
          price_type?: string
          slug?: string
          spigot_url?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          supported_versions?: string[]
          tagline?: string
          updated_at?: string
          version?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          created_at: string
          development_notes: string | null
          featured: boolean
          features: string[]
          full_description: string
          gallery: string[]
          github_url: string | null
          id: string
          image: string | null
          live_url: string | null
          outcome: string | null
          problem_solved: string | null
          short_description: string
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          tech_stack: string[]
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          development_notes?: string | null
          featured?: boolean
          features?: string[]
          full_description: string
          gallery?: string[]
          github_url?: string | null
          id?: string
          image?: string | null
          live_url?: string | null
          outcome?: string | null
          problem_solved?: string | null
          short_description: string
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          tech_stack?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          development_notes?: string | null
          featured?: boolean
          features?: string[]
          full_description?: string
          gallery?: string[]
          github_url?: string | null
          id?: string
          image?: string | null
          live_url?: string | null
          outcome?: string | null
          problem_solved?: string | null
          short_description?: string
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          tech_stack?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          approved: boolean
          created_at: string
          id: string
          message: string
          name: string
          rating: number
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          approved?: boolean
          created_at?: string
          id?: string
          message: string
          name: string
          rating?: number
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          approved?: boolean
          created_at?: string
          id?: string
          message?: string
          name?: string
          rating?: number
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          active: boolean
          description: string
          features: string[]
          icon: string | null
          id: string
          slug: string
          starting_price: string | null
          title: string
        }
        Insert: {
          active?: boolean
          description: string
          features?: string[]
          icon?: string | null
          id?: string
          slug: string
          starting_price?: string | null
          title: string
        }
        Update: {
          active?: boolean
          description?: string
          features?: string[]
          icon?: string | null
          id?: string
          slug?: string
          starting_price?: string | null
          title?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: Json
        }
        Insert: {
          id?: string
          key: string
          value: Json
        }
        Update: {
          id?: string
          key?: string
          value?: Json
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          description: string
          icon: string | null
          id: string
          level: number
          name: string
          sort_order: number
        }
        Insert: {
          category: string
          description: string
          icon?: string | null
          id?: string
          level: number
          name: string
          sort_order?: number
        }
        Update: {
          category?: string
          description?: string
          icon?: string | null
          id?: string
          level?: number
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          approved: boolean
          avatar: string | null
          id: string
          message: string
          name: string
          rating: number
          role: string
        }
        Insert: {
          approved?: boolean
          avatar?: string | null
          id?: string
          message: string
          name: string
          rating?: number
          role: string
        }
        Update: {
          approved?: boolean
          avatar?: string | null
          id?: string
          message?: string
          name?: string
          rating?: number
          role?: string
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
      app_role: "admin" | "editor"
      content_status: "CONCEPT" | "ACTIVE" | "MAINTAINED" | "ARCHIVED"
      hire_status:
        | "NEW"
        | "REVIEWING"
        | "ACCEPTED"
        | "IN_PROGRESS"
        | "COMPLETED"
        | "REJECTED"
      message_status: "NEW" | "REVIEWED" | "REPLIED" | "CLOSED"
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
      app_role: ["admin", "editor"],
      content_status: ["CONCEPT", "ACTIVE", "MAINTAINED", "ARCHIVED"],
      hire_status: [
        "NEW",
        "REVIEWING",
        "ACCEPTED",
        "IN_PROGRESS",
        "COMPLETED",
        "REJECTED",
      ],
      message_status: ["NEW", "REVIEWED", "REPLIED", "CLOSED"],
    },
  },
} as const
