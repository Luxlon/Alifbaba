import { create } from "zustand";
import type { UserProgress } from "@/types/database";
import { userProgressService } from "@/lib/supabase/progress-service";

interface UserProgressStore extends UserProgress {
  // Loading state
  isLoading: boolean;
  isInitialized: boolean;

  // Actions
  addHearts: (amount: number) => Promise<void>;
  removeHearts: (amount: number) => Promise<void>;
  addXp: (amount: number) => Promise<void>;
  addPoints: (amount: number) => Promise<void>;
  spendPoints: (amount: number) => Promise<boolean>;
  updateStreak: () => Promise<void>;
  resetHearts: () => Promise<void>;
  setUserData: (data: Partial<UserProgress>) => void;

  // Supabase operations
  loadFromSupabase: (userId: string) => Promise<void>;
  refreshFromSupabase: () => Promise<void>;
  resetStore: () => void;
}

const MAX_HEARTS = 5;

// Get today's date as string (YYYY-MM-DD)
const getTodayString = () => {
  return new Date().toISOString().split("T")[0];
};

// Check if user logged in today
const isToday = (dateString: string) => {
  return dateString === getTodayString();
};

// Check if user logged in yesterday
const isYesterday = (dateString: string) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateString === yesterday.toISOString().split("T")[0];
};

// Initial/default state
const initialState = {
  userId: "",
  name: "Pelajar Alifbaba",
  imageUrl: "/profile/default-avatar.svg",
  hearts: MAX_HEARTS,
  maxHearts: MAX_HEARTS,
  xp: 0,
  points: 100,
  streak: 0,
  lastLoginDate: getTodayString(),
  createdAt: new Date().toISOString(),
  isLoading: false,
  isInitialized: false,
};

export const useUserProgress = create<UserProgressStore>()((set, get) => ({
  ...initialState,

  // Actions - all update both local state and Supabase
  addHearts: async (amount: number) => {
    const state = get();
    if (!state.userId) return;

    const newHearts = Math.min(state.hearts + amount, state.maxHearts);
    set({ hearts: newHearts });

    // Update Supabase
    await userProgressService.update(state.userId, { hearts: newHearts });
  },

  removeHearts: async (amount: number) => {
    const state = get();
    if (!state.userId) return;

    const newHearts = Math.max(state.hearts - amount, 0);
    set({ hearts: newHearts });

    // Update Supabase
    await userProgressService.update(state.userId, { hearts: newHearts });
  },

  addXp: async (amount: number) => {
    const state = get();
    if (!state.userId) return;

    const newXp = state.xp + amount;
    set({ xp: newXp });

    // Update Supabase
    await userProgressService.addXp(state.userId, amount);
  },

  addPoints: async (amount: number) => {
    const state = get();
    if (!state.userId) return;

    const newPoints = state.points + amount;
    set({ points: newPoints });

    // Update Supabase
    await userProgressService.update(state.userId, { points: newPoints });
  },

  spendPoints: async (amount: number) => {
    const state = get();
    if (!state.userId) return false;

    if (state.points < amount) {
      return false;
    }

    const newPoints = state.points - amount;
    set({ points: newPoints });

    // Update Supabase
    await userProgressService.update(state.userId, { points: newPoints });
    return true;
  },

  updateStreak: async () => {
    const state = get();
    if (!state.userId) return;

    const today = getTodayString();

    // Already logged in today, don't update streak
    if (isToday(state.lastLoginDate)) {
      return;
    }

    // Logged in yesterday, increment streak
    let newStreak: number;
    if (isYesterday(state.lastLoginDate)) {
      newStreak = state.streak + 1;
    } else {
      // Streak broken, reset to 1
      newStreak = 1;
    }

    set({
      streak: newStreak,
      lastLoginDate: today,
    });

    // Update Supabase
    await userProgressService.update(state.userId, {
      streak: newStreak,
      lastLoginDate: today,
    });
  },

  resetHearts: async () => {
    const state = get();
    if (!state.userId) return;

    set({ hearts: state.maxHearts });

    // Update Supabase
    await userProgressService.update(state.userId, { hearts: state.maxHearts });
  },

  setUserData: (data: Partial<UserProgress>) => {
    set(data);
  },

  // Load progress from Supabase for a specific user
  loadFromSupabase: async (userId: string) => {
    set({ isLoading: true });

    try {
      const data = await userProgressService.fetch(userId);
      
      if (data) {
        set({
          userId: data.userId,
          name: data.name,
          imageUrl: data.imageUrl,
          hearts: data.hearts,
          maxHearts: data.maxHearts,
          xp: data.xp,
          points: data.points,
          streak: data.streak,
          lastLoginDate: data.lastLoginDate,
          createdAt: data.createdAt,
          isInitialized: true,
        });
      } else {
        // Create initial progress if not exists
        const newProgress = await userProgressService.create(userId, "Pelajar AlifBaBa");
        if (newProgress) {
          set({
            userId: newProgress.userId,
            name: newProgress.name,
            imageUrl: newProgress.imageUrl,
            hearts: newProgress.hearts,
            maxHearts: newProgress.maxHearts,
            xp: newProgress.xp,
            points: newProgress.points,
            streak: newProgress.streak,
            lastLoginDate: newProgress.lastLoginDate,
            createdAt: newProgress.createdAt,
            isInitialized: true,
          });
        }
      }
    } catch (error) {
      console.error("Error loading from Supabase:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Refresh current user's data from Supabase
  refreshFromSupabase: async () => {
    const state = get();
    if (!state.userId) return;

    await get().loadFromSupabase(state.userId);
  },

  // Reset store to initial state (on logout)
  resetStore: () => {
    set(initialState);
  },
}));
