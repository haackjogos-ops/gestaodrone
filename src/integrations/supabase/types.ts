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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      relatorio_pulverizacao: {
        Row: {
          altura_voo: number
          area_hectares: number
          created_at: string
          cultura: string
          data_voo: string
          dose_hectare: number
          id: string
          observacoes: string | null
          produto: string
          temperatura: number | null
          umidade: number | null
          updated_at: string
          user_id: string
          velocidade: number
          vento_velocidade: number | null
          volume_calda: number
        }
        Insert: {
          altura_voo: number
          area_hectares: number
          created_at?: string
          cultura: string
          data_voo: string
          dose_hectare: number
          id?: string
          observacoes?: string | null
          produto: string
          temperatura?: number | null
          umidade?: number | null
          updated_at?: string
          user_id: string
          velocidade: number
          vento_velocidade?: number | null
          volume_calda: number
        }
        Update: {
          altura_voo?: number
          area_hectares?: number
          created_at?: string
          cultura?: string
          data_voo?: string
          dose_hectare?: number
          id?: string
          observacoes?: string | null
          produto?: string
          temperatura?: number | null
          umidade?: number | null
          updated_at?: string
          user_id?: string
          velocidade?: number
          vento_velocidade?: number | null
          volume_calda?: number
        }
        Relationships: []
      }
      relatorio_solido: {
        Row: {
          altura_aplicacao: number
          area_hectares: number
          created_at: string
          cultura: string
          data_aplicacao: string
          dose_hectare: number
          id: string
          observacoes: string | null
          produto: string
          quantidade_kg: number
          temperatura: number | null
          umidade: number | null
          updated_at: string
          user_id: string
          velocidade: number
          vento_velocidade: number | null
        }
        Insert: {
          altura_aplicacao: number
          area_hectares: number
          created_at?: string
          cultura: string
          data_aplicacao: string
          dose_hectare: number
          id?: string
          observacoes?: string | null
          produto: string
          quantidade_kg: number
          temperatura?: number | null
          umidade?: number | null
          updated_at?: string
          user_id: string
          velocidade: number
          vento_velocidade?: number | null
        }
        Update: {
          altura_aplicacao?: number
          area_hectares?: number
          created_at?: string
          cultura?: string
          data_aplicacao?: string
          dose_hectare?: number
          id?: string
          observacoes?: string | null
          produto?: string
          quantidade_kg?: number
          temperatura?: number | null
          umidade?: number | null
          updated_at?: string
          user_id?: string
          velocidade?: number
          vento_velocidade?: number | null
        }
        Relationships: []
      }
      relatorio_voo_agricola: {
        Row: {
          altitude_voo: number
          area_hectares: number
          created_at: string
          cultura: string
          data_voo: string
          id: string
          observacoes: string | null
          temperatura: number | null
          tempo_voo: number
          tipo_operacao: string
          umidade: number | null
          updated_at: string
          user_id: string
          velocidade: number
          vento_velocidade: number | null
        }
        Insert: {
          altitude_voo: number
          area_hectares: number
          created_at?: string
          cultura: string
          data_voo: string
          id?: string
          observacoes?: string | null
          temperatura?: number | null
          tempo_voo: number
          tipo_operacao: string
          umidade?: number | null
          updated_at?: string
          user_id: string
          velocidade: number
          vento_velocidade?: number | null
        }
        Update: {
          altitude_voo?: number
          area_hectares?: number
          created_at?: string
          cultura?: string
          data_voo?: string
          id?: string
          observacoes?: string | null
          temperatura?: number | null
          tempo_voo?: number
          tipo_operacao?: string
          umidade?: number | null
          updated_at?: string
          user_id?: string
          velocidade?: number
          vento_velocidade?: number | null
        }
        Relationships: []
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
    Enums: {},
  },
} as const
