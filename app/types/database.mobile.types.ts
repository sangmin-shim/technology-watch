export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      medium_blog_contents: {
        Row: {
          blog_name: string
          contents: Json | null
          guid: string
          id: number
          published_at: string | null
          year: number | null
        }
        Insert: {
          blog_name: string
          contents?: Json | null
          guid: string
          id?: number
          published_at?: string | null
          year?: number | null
        }
        Update: {
          blog_name?: string
          contents?: Json | null
          guid?: string
          id?: number
          published_at?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "medium_blog_contents_blog_name_fkey"
            columns: ["blog_name"]
            isOneToOne: false
            referencedRelation: "medium_blogs"
            referencedColumns: ["blog_name"]
          },
        ]
      }
      medium_blogs: {
        Row: {
          blog_id: string | null
          blog_name: string
          id: number
        }
        Insert: {
          blog_id?: string | null
          blog_name: string
          id?: number
        }
        Update: {
          blog_id?: string | null
          blog_name?: string
          id?: number
        }
        Relationships: []
      }
      official_blog_contents: {
        Row: {
          blog_name: string | null
          contents: Json | null
          id: number
          published_at: string
          year: number | null
        }
        Insert: {
          blog_name?: string | null
          contents?: Json | null
          id?: number
          published_at?: string
          year?: number | null
        }
        Update: {
          blog_name?: string | null
          contents?: Json | null
          id?: number
          published_at?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "official_blog_contents_blog_name_fkey"
            columns: ["blog_name"]
            isOneToOne: false
            referencedRelation: "official_blogs"
            referencedColumns: ["blog_name"]
          },
        ]
      }
      official_blogs: {
        Row: {
          blog_name: string
          blog_url: string | null
          id: number
          parsing_code: string | null
        }
        Insert: {
          blog_name: string
          blog_url?: string | null
          id?: number
          parsing_code?: string | null
        }
        Update: {
          blog_name?: string
          blog_url?: string | null
          id?: number
          parsing_code?: string | null
        }
        Relationships: []
      }
      youtube_channels: {
        Row: {
          channel_id: string
          channel_name: string
          id: number
        }
        Insert: {
          channel_id: string
          channel_name: string
          id?: number
        }
        Update: {
          channel_id?: string
          channel_name?: string
          id?: number
        }
        Relationships: []
      }
      youtube_videos: {
        Row: {
          channel_id: string
          created_at: string
          description: string | null
          id: number
          published_at: string
          thumbnail_url: string
          title: string | null
          video_id: string
        }
        Insert: {
          channel_id: string
          created_at?: string
          description?: string | null
          id?: number
          published_at: string
          thumbnail_url: string
          title?: string | null
          video_id: string
        }
        Update: {
          channel_id?: string
          created_at?: string
          description?: string | null
          id?: number
          published_at?: string
          thumbnail_url?: string
          title?: string | null
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "youtube_videos_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "youtube_channels"
            referencedColumns: ["channel_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
