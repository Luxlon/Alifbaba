import { create } from "zustand";
import type {
  HijaiyahProgress,
  StoryProgress,
  HadithProgress,
  IqroProgress,
} from "@/types/database";
import {
  hijaiyahProgressService,
  storyProgressService,
  hadithProgressService,
  iqroProgressService,
} from "@/lib/supabase/progress-service";

interface LessonProgressStore {
  // Sync state
  isSyncing: boolean;
  currentUserId: string | null;

  // Hijaiyah Progress
  hijaiyahProgress: Record<string, HijaiyahProgress>;

  // Story Progress
  storyProgress: Record<string, StoryProgress>;

  // Hadith Progress
  hadithProgress: Record<string, HadithProgress>;

  // Iqro Progress
  iqroProgress: Record<number, IqroProgress>;

  // Actions - Hijaiyah
  completeHijaiyahLesson: (
    letterId: string,
    letterName: string,
    score: number,
    harakatMastered: string[]
  ) => void;

  getHijaiyahProgress: (letterId: string) => HijaiyahProgress | undefined;

  isHijaiyahCompleted: (letterId: string) => boolean;

  // Actions - Story
  completeStoryLesson: (
    storyId: string,
    storyTitle: string,
    quizScore: number,
    videoWatched: boolean
  ) => void;

  getStoryProgress: (storyId: string) => StoryProgress | undefined;

  isStoryCompleted: (storyId: string) => boolean;

  // Actions - Hadith
  completeHadithLesson: (
    hadithId: string,
    hadithTitle: string,
    quizScore: number,
    audioPlayed: boolean,
    memorized: boolean
  ) => void;

  getHadithProgress: (hadithId: string) => HadithProgress | undefined;

  isHadithCompleted: (hadithId: string) => boolean;

  // Actions - Iqro
  updateIqroProgress: (
    iqroId: number,
    currentPage: number,
    totalPages: number,
    completed: boolean
  ) => void;

  getIqroProgress: (iqroId: number) => IqroProgress | undefined;

  isIqroCompleted: (iqroId: number) => boolean;

  // Stats
  getTotalCompleted: () => {
    hijaiyah: number;
    stories: number;
    hadith: number;
    iqro: number;
    total: number;
  };

  // Supabase sync
  setCurrentUserId: (userId: string | null) => void;
  loadFromSupabase: (userId: string) => Promise<void>;
  syncAllToSupabase: (userId: string) => Promise<void>;
  clearProgress: () => void;
}

export const useLessonProgress = create<LessonProgressStore>()((set, get) => ({
      // Initial state
      isSyncing: false,
      currentUserId: null,
      hijaiyahProgress: {},
      storyProgress: {},
      hadithProgress: {},
      iqroProgress: {},

      // Hijaiyah Actions
      completeHijaiyahLesson: (
        letterId: string,
        letterName: string,
        score: number,
        harakatMastered: string[]
      ) => {
        const state = get();
        const existing = state.hijaiyahProgress[letterId];
        const attempts = existing ? existing.attempts + 1 : 1;
        const userId = state.currentUserId || "demo-user";

        const progress: HijaiyahProgress = {
          id: letterId,
          userId,
          letterId,
          letterName,
          completed: score >= 80,
          score: Math.max(score, existing?.score || 0),
          attempts,
          lastAttemptDate: new Date().toISOString(),
          harakatMastered: [
            ...new Set([
              ...(existing?.harakatMastered || []),
              ...harakatMastered,
            ]),
          ],
        };

        set({
          hijaiyahProgress: {
            ...state.hijaiyahProgress,
            [letterId]: progress,
          },
        });

        // Sync to Supabase in background
        if (state.currentUserId) {
          hijaiyahProgressService
            .upsert(state.currentUserId, progress)
            .catch(console.error);
        }
      },

      getHijaiyahProgress: (letterId: string) => {
        return get().hijaiyahProgress[letterId];
      },

      isHijaiyahCompleted: (letterId: string) => {
        const progress = get().hijaiyahProgress[letterId];
        return progress?.completed || false;
      },

      // Story Actions
      completeStoryLesson: (
        storyId: string,
        storyTitle: string,
        quizScore: number,
        videoWatched: boolean
      ) => {
        const state = get();
        const existing = state.storyProgress[storyId];
        const attempts = existing ? existing.quizAttempts + 1 : 1;
        const userId = state.currentUserId || "demo-user";

        const progress: StoryProgress = {
          id: storyId,
          userId,
          storyId,
          storyTitle,
          completed: quizScore >= 80 && videoWatched,
          videoWatched: videoWatched || existing?.videoWatched || false,
          quizScore: Math.max(quizScore, existing?.quizScore || 0),
          quizAttempts: attempts,
          lastAttemptDate: new Date().toISOString(),
        };

        set({
          storyProgress: {
            ...state.storyProgress,
            [storyId]: progress,
          },
        });

        // Sync to Supabase in background
        if (state.currentUserId) {
          storyProgressService
            .upsert(state.currentUserId, progress)
            .catch(console.error);
        }
      },

      getStoryProgress: (storyId: string) => {
        return get().storyProgress[storyId];
      },

      isStoryCompleted: (storyId: string) => {
        const progress = get().storyProgress[storyId];
        return progress?.completed || false;
      },

      // Hadith Actions
      completeHadithLesson: (
        hadithId: string,
        hadithTitle: string,
        quizScore: number,
        audioPlayed: boolean,
        memorized: boolean
      ) => {
        const state = get();
        const existing = state.hadithProgress[hadithId];
        const attempts = existing ? existing.quizAttempts + 1 : 1;
        const userId = state.currentUserId || "demo-user";

        const progress: HadithProgress = {
          id: hadithId,
          userId,
          hadithId,
          hadithTitle,
          completed: quizScore >= 80 && audioPlayed,
          audioPlayed: audioPlayed || existing?.audioPlayed || false,
          quizScore: Math.max(quizScore, existing?.quizScore || 0),
          quizAttempts: attempts,
          memorized: memorized || existing?.memorized || false,
          lastAttemptDate: new Date().toISOString(),
        };

        set({
          hadithProgress: {
            ...state.hadithProgress,
            [hadithId]: progress,
          },
        });

        // Sync to Supabase in background
        if (state.currentUserId) {
          hadithProgressService
            .upsert(state.currentUserId, progress)
            .catch(console.error);
        }
      },

      getHadithProgress: (hadithId: string) => {
        return get().hadithProgress[hadithId];
      },

      isHadithCompleted: (hadithId: string) => {
        const progress = get().hadithProgress[hadithId];
        return progress?.completed || false;
      },

      // Iqro Actions
      updateIqroProgress: (
        iqroId: number,
        currentPage: number,
        totalPages: number,
        completed: boolean
      ) => {
        const state = get();
        const userId = state.currentUserId || "demo-user";

        const progress: IqroProgress = {
          id: iqroId,
          userId,
          iqroId,
          currentPage,
          totalPages,
          completed:
            completed || state.iqroProgress[iqroId]?.completed || false,
          lastReadDate: new Date().toISOString(),
        };

        set({
          iqroProgress: {
            ...state.iqroProgress,
            [iqroId]: progress,
          },
        });

        // Sync to Supabase in background
        if (state.currentUserId) {
          iqroProgressService
            .upsert(state.currentUserId, progress)
            .catch(console.error);
        }
      },

      getIqroProgress: (iqroId: number) => {
        return get().iqroProgress[iqroId];
      },

      isIqroCompleted: (iqroId: number) => {
        const progress = get().iqroProgress[iqroId];
        return progress?.completed || false;
      },

      // Stats
      getTotalCompleted: () => {
        const state = get();

        const hijaiyah = Object.values(state.hijaiyahProgress).filter(
          (p) => p.completed
        ).length;

        const stories = Object.values(state.storyProgress).filter(
          (p) => p.completed
        ).length;

        const hadith = Object.values(state.hadithProgress).filter(
          (p) => p.completed
        ).length;

        const iqro = Object.values(state.iqroProgress).filter(
          (p) => p.completed
        ).length;

        return {
          hijaiyah,
          stories,
          hadith,
          iqro,
          total: hijaiyah + stories + hadith + iqro,
        };
      },

      // Supabase sync methods
      setCurrentUserId: (userId: string | null) => {
        set({ currentUserId: userId });
      },

      loadFromSupabase: async (userId: string) => {
        set({ isSyncing: true });

        try {
          const [hijaiyah, story, hadith, iqro] = await Promise.all([
            hijaiyahProgressService.fetchAll(userId),
            storyProgressService.fetchAll(userId),
            hadithProgressService.fetchAll(userId),
            iqroProgressService.fetchAll(userId),
          ]);

          set({
            currentUserId: userId,
            hijaiyahProgress: hijaiyah,
            storyProgress: story,
            hadithProgress: hadith,
            iqroProgress: iqro,
          });
        } catch (error) {
          console.error("Error loading progress from Supabase:", error);
        } finally {
          set({ isSyncing: false });
        }
      },

      clearProgress: () => {
        set({
          currentUserId: null,
          hijaiyahProgress: {},
          storyProgress: {},
          hadithProgress: {},
          iqroProgress: {},
        });
      },

      syncAllToSupabase: async (userId: string) => {
        const state = get();
        set({ isSyncing: true });

        try {
          // Sync all progress to Supabase
          const promises: Promise<boolean>[] = [];

          for (const progress of Object.values(state.hijaiyahProgress)) {
            promises.push(hijaiyahProgressService.upsert(userId, progress));
          }

          for (const progress of Object.values(state.storyProgress)) {
            promises.push(storyProgressService.upsert(userId, progress));
          }

          for (const progress of Object.values(state.hadithProgress)) {
            promises.push(hadithProgressService.upsert(userId, progress));
          }

          for (const progress of Object.values(state.iqroProgress)) {
            promises.push(iqroProgressService.upsert(userId, progress));
          }

          await Promise.all(promises);
        } catch (error) {
          console.error("Error syncing progress to Supabase:", error);
        } finally {
          set({ isSyncing: false });
        }
      },
}));
