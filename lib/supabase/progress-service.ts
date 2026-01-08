import { createBrowserClient } from "@/lib/supabase/client";
import type {
  UserProgress,
  HijaiyahProgress,
  StoryProgress,
  HadithProgress,
  IqroProgress,
} from "@/types/database";

const supabase = createBrowserClient();

// Helper type for Supabase query results
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type QueryResult = any;

/**
 * User Progress Service
 * Handles sync between Zustand store and Supabase
 */
export const userProgressService = {
  /**
   * Fetch user progress from Supabase
   */
  async fetch(userId: string): Promise<UserProgress | null> {
    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching user progress:", error);
      return null;
    }

    const row = data as QueryResult;
    return row ? {
      userId: row.user_id,
      name: row.name || "Pelajar AlifBaBa",
      imageUrl: row.image_url || "/profile/default-avatar.svg",
      hearts: row.hearts,
      maxHearts: 5,
      xp: row.xp,
      points: row.points,
      streak: row.streak,
      lastLoginDate: row.last_active_date || new Date().toISOString().split("T")[0],
      createdAt: row.created_at,
    } : null;
  },

  /**
   * Create initial user progress
   */
  async create(userId: string, name: string): Promise<UserProgress | null> {
    const payload = {
      user_id: userId,
      name,
      hearts: 5,
      xp: 0,
      points: 100,
      streak: 0,
      last_active_date: new Date().toISOString().split("T")[0],
    };

    const { data, error } = await supabase
      .from("user_progress")
      .insert(payload as never)
      .select()
      .single();

    if (error) {
      console.error("Error creating user progress:", error);
      return null;
    }

    const row = data as QueryResult;
    return row ? {
      userId: row.user_id,
      name: row.name || name,
      imageUrl: row.image_url || "/profile/default-avatar.svg",
      hearts: row.hearts,
      maxHearts: 5,
      xp: row.xp,
      points: row.points,
      streak: row.streak,
      lastLoginDate: row.last_active_date || new Date().toISOString().split("T")[0],
      createdAt: row.created_at,
    } : null;
  },

  /**
   * Update user progress
   */
  async update(userId: string, updates: Partial<{
    hearts: number;
    xp: number;
    points: number;
    streak: number;
    lastLoginDate: string;
  }>): Promise<boolean> {
    const payload = {
      ...(updates.hearts !== undefined && { hearts: updates.hearts }),
      ...(updates.xp !== undefined && { xp: updates.xp }),
      ...(updates.points !== undefined && { points: updates.points }),
      ...(updates.streak !== undefined && { streak: updates.streak }),
      ...(updates.lastLoginDate !== undefined && { last_active_date: updates.lastLoginDate }),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("user_progress")
      .update(payload as never)
      .eq("user_id", userId);

    if (error) {
      console.error("Error updating user progress:", error);
      return false;
    }

    return true;
  },

  /**
   * Add XP to user
   */
  async addXp(userId: string, amount: number): Promise<boolean> {
    const current = await this.fetch(userId);
    if (current) {
      return this.update(userId, { xp: current.xp + amount });
    }
    return false;
  },

  /**
   * Update streak
   */
  async updateStreak(userId: string): Promise<{ newStreak: number; updated: boolean }> {
    const current = await this.fetch(userId);
    if (!current) return { newStreak: 0, updated: false };

    const today = new Date().toISOString().split("T")[0];
    const lastLogin = current.lastLoginDate;

    // Already logged in today
    if (lastLogin === today) {
      return { newStreak: current.streak, updated: false };
    }

    // Check if yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = lastLogin === yesterday.toISOString().split("T")[0];

    const newStreak = isYesterday ? current.streak + 1 : 1;

    const success = await this.update(userId, {
      streak: newStreak,
      lastLoginDate: today,
    });

    return { newStreak, updated: success };
  },
};

/**
 * Hijaiyah Progress Service
 */
export const hijaiyahProgressService = {
  async fetchAll(userId: string): Promise<Record<string, HijaiyahProgress>> {
    const { data, error } = await supabase
      .from("hijaiyah_progress")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching hijaiyah progress:", error);
      return {};
    }

    const result: Record<string, HijaiyahProgress> = {};
    const rows = (data || []) as QueryResult[];
    
    rows.forEach((item) => {
      // Use letter_name as key for easier lookup by name
      const letterName = String(item.letter_name);
      result[letterName] = {
        id: item.id,
        userId: item.user_id,
        letterId: String(item.letter_id),
        letterName: letterName,
        completed: item.completed,
        score: item.score,
        attempts: item.attempts,
        lastAttemptDate: "",
        harakatMastered: [],
      };
    });

    return result;
  },

  async upsert(userId: string, progress: HijaiyahProgress): Promise<boolean> {
    const payload = {
      user_id: userId,
      letter_id: progress.letterId, // Use letterId (TEXT in database)
      letter_name: progress.letterName,
      completed: progress.completed,
      score: progress.score,
      attempts: progress.attempts,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("hijaiyah_progress")
      .upsert(payload as never, { onConflict: "user_id,letter_id" });

    if (error) {
      console.error("Error upserting hijaiyah progress:", error);
      return false;
    }

    return true;
  },
};

/**
 * Story Progress Service
 */
export const storyProgressService = {
  async fetchAll(userId: string): Promise<Record<string, StoryProgress>> {
    const { data, error } = await supabase
      .from("story_progress")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching story progress:", error);
      return {};
    }

    const result: Record<string, StoryProgress> = {};
    const rows = (data || []) as QueryResult[];
    
    rows.forEach((item) => {
      const storyId = String(item.story_id);
      result[storyId] = {
        id: item.id,
        userId: item.user_id,
        storyId: storyId,
        storyTitle: item.story_title,
        completed: item.completed,
        videoWatched: item.video_watched,
        quizScore: item.quiz_score,
        quizAttempts: 0,
        lastAttemptDate: "",
      };
    });

    return result;
  },

  async upsert(userId: string, progress: StoryProgress): Promise<boolean> {
    const payload = {
      user_id: userId,
      story_id: progress.storyId, // TEXT in database
      story_title: progress.storyTitle,
      completed: progress.completed,
      video_watched: progress.videoWatched,
      quiz_score: progress.quizScore,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("story_progress")
      .upsert(payload as never, { onConflict: "user_id,story_id" });

    if (error) {
      console.error("Error upserting story progress:", error);
      return false;
    }

    return true;
  },
};

/**
 * Hadith Progress Service
 */
export const hadithProgressService = {
  async fetchAll(userId: string): Promise<Record<string, HadithProgress>> {
    const { data, error } = await supabase
      .from("hadith_progress")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching hadith progress:", error);
      return {};
    }

    const result: Record<string, HadithProgress> = {};
    const rows = (data || []) as QueryResult[];
    
    rows.forEach((item) => {
      const hadithId = String(item.hadith_id);
      result[hadithId] = {
        id: item.id,
        userId: item.user_id,
        hadithId: hadithId,
        hadithTitle: item.hadith_title,
        completed: item.completed,
        audioPlayed: item.audio_played,
        quizScore: item.quiz_score,
        quizAttempts: 0,
        memorized: item.memorized,
        lastAttemptDate: "",
      };
    });

    return result;
  },

  async upsert(userId: string, progress: HadithProgress): Promise<boolean> {
    const payload = {
      user_id: userId,
      hadith_id: progress.hadithId, // TEXT in database
      hadith_title: progress.hadithTitle,
      completed: progress.completed,
      audio_played: progress.audioPlayed,
      quiz_score: progress.quizScore,
      memorized: progress.memorized,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("hadith_progress")
      .upsert(payload as never, { onConflict: "user_id,hadith_id" });

    if (error) {
      console.error("Error upserting hadith progress:", error);
      return false;
    }

    return true;
  },
};

/**
 * Iqro Progress Service
 */
export const iqroProgressService = {
  async fetchAll(userId: string): Promise<Record<number, IqroProgress>> {
    const { data, error } = await supabase
      .from("iqro_progress")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching iqro progress:", error);
      return {};
    }

    const result: Record<number, IqroProgress> = {};
    const rows = (data || []) as QueryResult[];
    
    rows.forEach((item) => {
      result[item.iqro_id] = {
        id: item.iqro_id, // Using iqro_id as id for consistency
        userId: item.user_id,
        iqroId: item.iqro_id,
        currentPage: item.current_page,
        totalPages: item.total_pages,
        completed: item.completed,
        lastReadDate: "",
      };
    });

    return result;
  },

  async upsert(userId: string, progress: IqroProgress): Promise<boolean> {
    const payload = {
      user_id: userId,
      iqro_id: progress.iqroId,
      current_page: progress.currentPage,
      total_pages: progress.totalPages,
      completed: progress.completed,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("iqro_progress")
      .upsert(payload as never, { onConflict: "user_id,iqro_id" });

    if (error) {
      console.error("Error upserting iqro progress:", error);
      return false;
    }

    return true;
  },
};

/**
 * Sync all progress from localStorage to Supabase
 * Called after user logs in
 */
export async function syncLocalProgressToSupabase(userId: string): Promise<boolean> {
  try {
    // Get localStorage data
    const userProgressStorage = localStorage.getItem("user-progress-storage");
    const lessonProgressStorage = localStorage.getItem("lesson-progress-storage");

    // Sync user progress
    if (userProgressStorage) {
      const parsed = JSON.parse(userProgressStorage);
      const state = parsed.state;
      
      if (state) {
        await userProgressService.update(userId, {
          hearts: state.hearts,
          xp: state.xp,
          points: state.points,
          streak: state.streak,
          lastLoginDate: state.lastLoginDate,
        });
      }
    }

    // Sync lesson progress
    if (lessonProgressStorage) {
      const parsed = JSON.parse(lessonProgressStorage);
      const state = parsed.state;

      if (state) {
        // Sync hijaiyah progress
        for (const progress of Object.values(state.hijaiyahProgress || {})) {
          await hijaiyahProgressService.upsert(userId, progress as HijaiyahProgress);
        }

        // Sync story progress
        for (const progress of Object.values(state.storyProgress || {})) {
          await storyProgressService.upsert(userId, progress as StoryProgress);
        }

        // Sync hadith progress
        for (const progress of Object.values(state.hadithProgress || {})) {
          await hadithProgressService.upsert(userId, progress as HadithProgress);
        }

        // Sync iqro progress
        for (const progress of Object.values(state.iqroProgress || {})) {
          await iqroProgressService.upsert(userId, progress as IqroProgress);
        }
      }
    }

    return true;
  } catch (error) {
    console.error("Error syncing local progress to Supabase:", error);
    return false;
  }
}

/**
 * Load progress from Supabase to localStorage
 * Called after user logs in
 */
export async function loadProgressFromSupabase(userId: string): Promise<{
  userProgress: UserProgress | null;
  hijaiyahProgress: Record<string, HijaiyahProgress>;
  storyProgress: Record<string, StoryProgress>;
  hadithProgress: Record<string, HadithProgress>;
  iqroProgress: Record<number, IqroProgress>;
}> {
  const [userProgress, hijaiyahProgress, storyProgress, hadithProgress, iqroProgress] = await Promise.all([
    userProgressService.fetch(userId),
    hijaiyahProgressService.fetchAll(userId),
    storyProgressService.fetchAll(userId),
    hadithProgressService.fetchAll(userId),
    iqroProgressService.fetchAll(userId),
  ]);

  return {
    userProgress,
    hijaiyahProgress,
    storyProgress,
    hadithProgress,
    iqroProgress,
  };
}
