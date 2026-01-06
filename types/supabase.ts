// Supabase Database Types for Alifbaba
// Generated types for tables and auth

export type UserRole = "student" | "teacher" | "superadmin";

// Database table types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          password: string;
          email: string | null;
          role: UserRole;
          avatar_url: string | null;
          teacher_id: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          username: string;
          password: string;
          email?: string | null;
          role?: UserRole;
          avatar_url?: string | null;
          teacher_id?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          password?: string;
          email?: string | null;
          role?: UserRole;
          avatar_url?: string | null;
          teacher_id?: string | null;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          hearts: number;
          xp: number;
          points: number;
          streak: number;
          last_active_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          hearts?: number;
          xp?: number;
          points?: number;
          streak?: number;
          last_active_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          hearts?: number;
          xp?: number;
          points?: number;
          streak?: number;
          last_active_date?: string | null;
          updated_at?: string;
        };
      };
      hijaiyah_progress: {
        Row: {
          id: string;
          user_id: string;
          letter_id: string;
          letter_name: string;
          completed: boolean;
          score: number;
          attempts: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          letter_id: string;
          letter_name: string;
          completed?: boolean;
          score?: number;
          attempts?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          completed?: boolean;
          score?: number;
          attempts?: number;
          updated_at?: string;
        };
      };
      story_progress: {
        Row: {
          id: string;
          user_id: string;
          story_id: string;
          story_title: string;
          completed: boolean;
          video_watched: boolean;
          quiz_score: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          story_id: string;
          story_title: string;
          completed?: boolean;
          video_watched?: boolean;
          quiz_score?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          completed?: boolean;
          video_watched?: boolean;
          quiz_score?: number;
          updated_at?: string;
        };
      };
      hadith_progress: {
        Row: {
          id: string;
          user_id: string;
          hadith_id: string;
          hadith_title: string;
          completed: boolean;
          audio_played: boolean;
          quiz_score: number;
          memorized: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          hadith_id: string;
          hadith_title: string;
          completed?: boolean;
          audio_played?: boolean;
          quiz_score?: number;
          memorized?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          completed?: boolean;
          audio_played?: boolean;
          quiz_score?: number;
          memorized?: boolean;
          updated_at?: string;
        };
      };
      iqro_progress: {
        Row: {
          id: string;
          user_id: string;
          iqro_id: number;
          current_page: number;
          total_pages: number;
          completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          iqro_id: number;
          current_page?: number;
          total_pages: number;
          completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          current_page?: number;
          total_pages?: number;
          completed?: boolean;
          updated_at?: string;
        };
      };
      quest_progress: {
        Row: {
          id: string;
          user_id: string;
          quest_id: string;
          current_progress: number;
          target: number;
          completed: boolean;
          claimed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          quest_id: string;
          current_progress?: number;
          target: number;
          completed?: boolean;
          claimed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          current_progress?: number;
          target?: number;
          completed?: boolean;
          claimed?: boolean;
          updated_at?: string;
        };
      };
      leaderboard: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          avatar_url: string | null;
          xp: number;
          rank: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          avatar_url?: string | null;
          xp?: number;
          rank?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          avatar_url?: string | null;
          xp?: number;
          rank?: number | null;
          updated_at?: string;
        };
      };
    };
    Views: {
      student_summary: {
        Row: {
          user_id: string;
          username: string;
          name: string;
          email: string | null;
          role: string;
          teacher_id: string | null;
          teacher_name: string | null;
          xp: number | null;
          hearts: number | null;
          points: number | null;
          streak: number | null;
          last_login_date: string | null;
          hijaiyah_completed: number;
          stories_completed: number;
          hadith_completed: number;
          iqro_completed: number;
        };
      };
      teacher_summary: {
        Row: {
          teacher_id: string;
          username: string;
          name: string;
          email: string | null;
          is_active: boolean;
          created_at: string;
          student_count: number;
        };
      };
    };
    Functions: {
      get_teacher_students: {
        Args: { teacher_uuid: string };
        Returns: Array<{
          student_id: string;
          student_name: string;
          student_username: string;
          total_xp: number;
          hearts: number;
          streak: number;
          hijaiyah_completed: number;
          stories_completed: number;
          hadith_completed: number;
          iqro_completed: number;
          last_active: string | null;
        }>;
      };
      get_all_users_summary: {
        Args: Record<string, never>;
        Returns: Array<{
          user_id: string;
          username: string;
          name: string;
          role: string;
          teacher_name: string | null;
          total_xp: number;
          hearts: number;
          streak: number;
          is_active: boolean;
          created_at: string;
        }>;
      };
      update_leaderboard_ranks: {
        Args: Record<string, never>;
        Returns: void;
      };
      add_user_xp: {
        Args: { p_user_id: string; p_amount: number };
        Returns: boolean;
      };
    };
  };
}

// Helper types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type UserProgressRow = Database["public"]["Tables"]["user_progress"]["Row"];
export type HijaiyahProgressRow = Database["public"]["Tables"]["hijaiyah_progress"]["Row"];
export type StoryProgressRow = Database["public"]["Tables"]["story_progress"]["Row"];
export type HadithProgressRow = Database["public"]["Tables"]["hadith_progress"]["Row"];
export type IqroProgressRow = Database["public"]["Tables"]["iqro_progress"]["Row"];
export type QuestProgressRow = Database["public"]["Tables"]["quest_progress"]["Row"];
export type LeaderboardRow = Database["public"]["Tables"]["leaderboard"]["Row"];

// View types
export type StudentSummary = Database["public"]["Views"]["student_summary"]["Row"];
export type TeacherSummary = Database["public"]["Views"]["teacher_summary"]["Row"];

// Auth user type with profile
export interface AuthUser {
  id: string;
  email: string | null;
  profile: Profile | null;
}

