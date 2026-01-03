import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProgress } from "@/types/database";

interface UserProgressStore extends UserProgress {
  // Actions
  addHearts: (amount: number) => void;
  removeHearts: (amount: number) => void;
  addXp: (amount: number) => void;
  addPoints: (amount: number) => void;
  spendPoints: (amount: number) => boolean; // Returns false if not enough points
  updateStreak: () => void;
  resetHearts: () => void;
  setUserData: (data: Partial<UserProgress>) => void;
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

      // Actions
      addHearts: (amount: number) => {
        set((state) => ({
          hearts: Math.min(state.hearts + amount, state.maxHearts),
        }));
      },

      removeHearts: (amount: number) => {
        set((state) => ({
          hearts: Math.max(state.hearts - amount, 0),
        }));
      },

      addXp: (amount: number) => {
        set((state) => ({
          xp: state.xp + amount,
        }));
      },

      addPoints: (amount: number) => {
        set((state) => ({
          points: state.points + amount,
        }));
      },

      spendPoints: (amount: number) => {
        const state = get();
        if (state.points < amount) {
          return false; // Not enough points
        }
        set({ points: state.points - amount });
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
        if (isYesterday(state.lastLoginDate)) {
          set({
            streak: state.streak + 1,
            lastLoginDate: today,
          });
        } else {
          // Streak broken, reset to 1
          set({
            streak: 1,
            lastLoginDate: today,
          });
        }
      },

      resetHearts: () => {
        set((state) => ({
          hearts: state.maxHearts,
        }));
      },

      setUserData: (data: Partial<UserProgress>) => {
        set(data);
      },
    }),
    {
      name: "user-progress-storage",
    }
  )
);
