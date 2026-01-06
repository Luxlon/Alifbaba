import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProgress } from "@/types/database";
import { userProgressService } from "@/lib/supabase/progress-service";

interface UserProgressStore extends UserProgress {
  // Sync state
  isSyncing: boolean;
  isOnline: boolean;

  // Actions
  addHearts: (amount: number) => void;
  removeHearts: (amount: number) => void;
  addXp: (amount: number) => void;
  addPoints: (amount: number) => void;
  spendPoints: (amount: number) => boolean; // Returns false if not enough points
  updateStreak: () => void;
  resetHearts: () => void;
  setUserData: (data: Partial<UserProgress>) => void;

  // Supabase sync
  syncWithSupabase: (userId: string) => Promise<void>;
  loadFromSupabase: (userId: string) => Promise<void>;
  setOnlineStatus: (isOnline: boolean) => void;
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

export const useUserProgress = create<UserProgressStore>()(
  persist(
    (set, get) => ({
      // Initial state
      userId: "demo-user",
      name: "Pelajar Alifbaba",
      imageUrl: "/profile/default-avatar.svg",
      hearts: MAX_HEARTS,
      maxHearts: MAX_HEARTS,
      xp: 0,
      points: 100, // Starting points
      streak: 0,
      lastLoginDate: getTodayString(),
      createdAt: new Date().toISOString(),

      // Sync state
      isSyncing: false,
      isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,

      // Actions
      addHearts: (amount: number) => {
        const state = get();
        const newHearts = Math.min(state.hearts + amount, state.maxHearts);
        set({ hearts: newHearts });

        // Sync in background if online and logged in
        if (state.isOnline && state.userId !== "demo-user") {
          userProgressService
            .update(state.userId, { hearts: newHearts })
            .catch(console.error);
        }
      },

      removeHearts: (amount: number) => {
        const state = get();
        const newHearts = Math.max(state.hearts - amount, 0);
        set({ hearts: newHearts });

        if (state.isOnline && state.userId !== "demo-user") {
          userProgressService
            .update(state.userId, { hearts: newHearts })
            .catch(console.error);
        }
      },

      addXp: (amount: number) => {
        const state = get();
        const newXp = state.xp + amount;
        set({ xp: newXp });

        if (state.isOnline && state.userId !== "demo-user") {
          userProgressService.addXp(state.userId, amount).catch(console.error);
        }
      },

      addPoints: (amount: number) => {
        const state = get();
        const newPoints = state.points + amount;
        set({ points: newPoints });

        if (state.isOnline && state.userId !== "demo-user") {
          userProgressService
            .update(state.userId, { points: newPoints })
            .catch(console.error);
        }
      },

      spendPoints: (amount: number) => {
        const state = get();
        if (state.points < amount) {
          return false; // Not enough points
        }
        const newPoints = state.points - amount;
        set({ points: newPoints });

        if (state.isOnline && state.userId !== "demo-user") {
          userProgressService
            .update(state.userId, { points: newPoints })
            .catch(console.error);
        }
        return true;
      },

      updateStreak: () => {
        const state = get();
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

        if (state.isOnline && state.userId !== "demo-user") {
          userProgressService
            .update(state.userId, {
              streak: newStreak,
              lastLoginDate: today,
            })
            .catch(console.error);
        }
      },

      resetHearts: () => {
        const state = get();
        set({ hearts: state.maxHearts });

        if (state.isOnline && state.userId !== "demo-user") {
          userProgressService
            .update(state.userId, { hearts: state.maxHearts })
            .catch(console.error);
        }
      },

      setUserData: (data: Partial<UserProgress>) => {
        set(data);
      },

      // Supabase sync methods
      syncWithSupabase: async (userId: string) => {
        const state = get();
        set({ isSyncing: true });

        try {
          await userProgressService.update(userId, {
            hearts: state.hearts,
            xp: state.xp,
            points: state.points,
            streak: state.streak,
            lastLoginDate: state.lastLoginDate,
          });
        } catch (error) {
          console.error("Error syncing with Supabase:", error);
        } finally {
          set({ isSyncing: false });
        }
      },

      loadFromSupabase: async (userId: string) => {
        set({ isSyncing: true });

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
            });
          }
        } catch (error) {
          console.error("Error loading from Supabase:", error);
        } finally {
          set({ isSyncing: false });
        }
      },

      setOnlineStatus: (isOnline: boolean) => {
        set({ isOnline });
      },
    }),
    {
      name: "user-progress-storage",
      partialize: (state) => ({
        userId: state.userId,
        name: state.name,
        imageUrl: state.imageUrl,
        hearts: state.hearts,
        maxHearts: state.maxHearts,
        xp: state.xp,
        points: state.points,
        streak: state.streak,
        lastLoginDate: state.lastLoginDate,
        createdAt: state.createdAt,
      }),
    }
  )
);
