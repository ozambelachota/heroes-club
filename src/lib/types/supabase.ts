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
      categoria: {
        Row: {
          categoria_area: string | null
          created_at: string
          id: number
        }
        Insert: {
          categoria_area?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          categoria_area?: string | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      clase: {
        Row: {
          cantidad_alumno: number | null
          created_at: string
          curso_id: number | null
          hora_final: string | null
          hora_inicio: string | null
          id: number
        }
        Insert: {
          cantidad_alumno?: number | null
          created_at?: string
          curso_id?: number | null
          hora_final?: string | null
          hora_inicio?: string | null
          id?: number
        }
        Update: {
          cantidad_alumno?: number | null
          created_at?: string
          curso_id?: number | null
          hora_final?: string | null
          hora_inicio?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "clase_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos"
            referencedColumns: ["id"]
          },
        ]
      }
      curso_estudiante: {
        Row: {
          created_at: string
          curso_id: number | null
          estudiante_id: number | null
          id: number
        }
        Insert: {
          created_at?: string
          curso_id?: number | null
          estudiante_id?: number | null
          id?: number
        }
        Update: {
          created_at?: string
          curso_id?: number | null
          estudiante_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "curso_estudiante_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "cursos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "curso_estudiante_estudiante_id_fkey"
            columns: ["estudiante_id"]
            isOneToOne: false
            referencedRelation: "estudiante"
            referencedColumns: ["id"]
          },
        ]
      }
      cursos: {
        Row: {
          categoria_id: number | null
          created_at: string
          curso_duracion: number
          curso_fecha_final: string | null
          curso_fecha_inicio: string | null
          curso_nombre: string
          docente_id: number | null
          id: number
        }
        Insert: {
          categoria_id?: number | null
          created_at?: string
          curso_duracion: number
          curso_fecha_final?: string | null
          curso_fecha_inicio?: string | null
          curso_nombre: string
          docente_id?: number | null
          id?: number
        }
        Update: {
          categoria_id?: number | null
          created_at?: string
          curso_duracion?: number
          curso_fecha_final?: string | null
          curso_fecha_inicio?: string | null
          curso_nombre?: string
          docente_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "cursos_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categoria"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cursos_docente_id_fkey"
            columns: ["docente_id"]
            isOneToOne: false
            referencedRelation: "docente"
            referencedColumns: ["id"]
          },
        ]
      }
      docente: {
        Row: {
          created_at: string
          docente_apellidos: string
          docente_dni: string
          docente_estado: boolean
          docente_fecha_nacimiento: string
          docente_nombre: string
          id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          docente_apellidos: string
          docente_dni?: string
          docente_estado: boolean
          docente_fecha_nacimiento: string
          docente_nombre: string
          id?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          docente_apellidos?: string
          docente_dni?: string
          docente_estado?: boolean
          docente_fecha_nacimiento?: string
          docente_nombre?: string
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "docente_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      estudiante: {
        Row: {
          created_at: string
          estudiante_apellidos: string
          estudiante_dni: string
          estudiante_fecha_nacimiento: string
          estudiante_id: string | null
          estudiante_nombre: string
          id: number
        }
        Insert: {
          created_at?: string
          estudiante_apellidos: string
          estudiante_dni?: string
          estudiante_fecha_nacimiento: string
          estudiante_id?: string | null
          estudiante_nombre: string
          id?: number
        }
        Update: {
          created_at?: string
          estudiante_apellidos?: string
          estudiante_dni?: string
          estudiante_fecha_nacimiento?: string
          estudiante_id?: string | null
          estudiante_nombre?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "estudiante_estudiante_id_fkey"
            columns: ["estudiante_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          created_at: string
          email: string | null
          id: string
          image_url: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          image_url?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          image_url?: string | null
          name?: string | null
        }
        Relationships: []
      }
      user: {
        Row: {
          created_at: string
          id: string
          role: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
