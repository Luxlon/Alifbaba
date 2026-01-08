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
  // Loading state
  isLoading: boolean;
  isInitialized: boolean;
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
  ) => Promise<void>;

  getHijaiyahProgress: (letterId: string) => HijaiyahProgress | undefined;

  isHijaiyahCompleted: (letterId: string) => boolean;

  // Actions - Story
  completeStoryLesson: (
    storyId: string,
    storyTitle: string,
    quizScore: number,
    videoWatched: boolean
  ) => Promise<void>;

  getStoryProgress: (storyId: string) => StoryProgress | undefined;

  isStoryCompleted: (storyId: string) => boolean;

  // Actions - Hadith
  completeHadithLesson: (
    hadithId: string,
    hadithTitle: string,
    quizScore: number,
    audioPlayed: boolean,
    memorized: boolean
  ) => Promise<void>;

  getHadithProgress: (hadithId: string) => HadithProgress | undefined;

  isHadithCompleted: (hadithId: string) => boolean;

  // Actions - Iqro
  updateIqroProgress: (
    iqroId: number,
    currentPage: number,
    totalPages: number,
    completed: boolean
  ) => Promise<void>;

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

  // Supabase operations
  setCurrentUserId: (userId: string | null) => void;
  loadFromSupabase: (userId: string) => Promise<void>;
  refreshFromSupabase: () => Promise<void>;
  resetStore: () => void;
}

// Initial state
const initialState = {
  isLoading: false,
  isInitialized: false,
  currentUserId: null as string | null,
  hijaiyahProgress: {} as Record<string, HijaiyahProgress>,
  storyProgress: {} as Record<string, StoryProgress>,
  hadithProgress: {} as Record<string, HadithProgress>,
  iqroProgress: {} as Record<number, IqroProgress>,
};

export const useLessonProgress = create<LessonProgressStore>()((set, get) => ({
  ...initialState,

  // Hijaiyah Actions
  completeHijaiyahLesson: async (
    letterId: string,
    letterName: string,
    score: number,
    harakatMastered: string[]
  ) => {
    const state = get();
    if (!state.currentUserId) return;

    // Use letterName as key for consistency
    const existing = state.hijaiyahProgress[letterName];
    const attempts = existing ? existing.attempts + 1 : 1;
    const bestScore = Math.max(score, existing?.score || 0);
    const wasCompleted = existing?.completed || false;

    const progress: HijaiyahProgress = {
      id: letterName,
      userId: state.currentUserId,
      letterId,
      letterName,
      // Once completed, stay completed (use best score)
      completed: wasCompleted || bestScore >= 80,
      score: bestScore,
      attempts,
      lastAttemptDate: new Date().toISOString(),
      harakatMastered: [
        ...new Set([
          ...(existing?.harakatMastered || []),
          ...harakatMastered,
        ]),
      ],
    };

    // Update local state - use letterName as key
    set({
      hijaiyahProgress: {
        ...state.hijaiyahProgress,
        [letterName]: progress,
      },
    });

    // Sync to Supabase
    await hijaiyahProgressService.upsert(state.currentUserId, progress);
  },

  getHijaiyahProgress: (letterName: string) => {
    return get().hijaiyahProgress[letterName];
  },

  isHijaiyahCompleted: (letterName: string) => {
    const progress = get().hijaiyahProgress[letterName];
    return progress?.completed || false;
  },

  // Story Actions
  completeStoryLesson: async (
    storyId: string,
    storyTitle: string,
    quizScore: number,
    videoWatched: boolean
  ) => {
    const state = get();
    if (!state.currentUserId) return;

    const existing = state.storyProgress[storyId];
    const attempts = existing ? existing.quizAttempts + 1 : 1;
    const bestScore = Math.max(quizScore, existing?.quizScore || 0);
    const wasCompleted = existing?.completed || false;

    const progress: StoryProgress = {
      id: storyId,
      userId: state.currentUserId,
      storyId,
      storyTitle,
      // Once completed, stay completed (use best score)
      completed: wasCompleted || (bestScore >= 80 && (videoWatched || existing?.videoWatched || false)),
      videoWatched: videoWatched || existing?.videoWatched || false,
      quizScore: bestScore,
      quizAttempts: attempts,
      lastAttemptDate: new Date().toISOString(),
    };

    // Update local state
    set({
      storyProgress: {
        ...state.storyProgress,
        [storyId]: progress,
      },
    });

    // Sync to Supabase
    await storyProgressService.upsert(state.currentUserId, progress);
  },

  getStoryProgress: (storyId: string) => {
    return get().storyProgress[storyId];
  },

  isStoryCompleted: (storyId: string) => {
    const progress = get().storyProgress[storyId];
    return progress?.completed || false;
  },

  // Hadith Actions
  completeHadithLesson: async (
    hadithId: string,
    hadithTitle: string,
    quizScore: number,
    audioPlayed: boolean,
    memorized: boolean
  ) => {
    const state = get();
    if (!state.currentUserId) return;

    const existing = state.hadithProgress[hadithId];
    const attempts = existing ? existing.quizAttempts + 1 : 1;
    const bestScore = Math.max(quizScore, existing?.quizScore || 0);
    const wasCompleted = existing?.completed || false;

    const progress: HadithProgress = {
      id: hadithId,
      userId: state.currentUserId,
      hadithId,
      hadithTitle,
      // Once completed, stay completed (use best score)
      completed: wasCompleted || (bestScore >= 80 && (audioPlayed || existing?.audioPlayed || false)),
      audioPlayed: audioPlayed || existing?.audioPlayed || false,
      quizScore: bestScore,
      quizAttempts: attempts,
      memorized: memorized || existing?.memorized || false,
      lastAttemptDate: new Date().toISOString(),
    };

    // Update local state
    set({
      hadithProgress: {
        ...state.hadithProgress,
        [hadithId]: progress,
      },
    });

    // Sync to Supabase
    await hadithProgressService.upsert(state.currentUserId, progress);
  },

  getHadithProgress: (hadithId: string) => {
    return get().hadithProgress[hadithId];
  },

  isHadithCompleted: (hadithId: string) => {
    const progress = get().hadithProgress[hadithId];
    return progress?.completed || false;
  },

  // Iqro Actions
  updateIqroProgress: async (
    iqroId: number,
    currentPage: number,
    totalPages: number,
    completed: boolean
  ) => {
    const state = get();
    if (!state.currentUserId) return;

    const progress: IqroProgress = {
      id: iqroId,
      userId: state.currentUserId,
      iqroId,
      currentPage,
      totalPages,
      completed: completed || state.iqroProgress[iqroId]?.completed || false,
      lastReadDate: new Date().toISOString(),
    };

    // Update local state
    set({
      iqroProgress: {
        ...state.iqroProgress,
        [iqroId]: progress,
      },
    });

    // Sync to Supabase
    await iqroProgressService.upsert(state.currentUserId, progress);
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

  // Supabase operations
  setCurrentUserId: (userId: string | null) => {
    set({ currentUserId: userId });
  },

  loadFromSupabase: async (userId: string) => {
    set({ isLoading: true });

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
        isInitialized: true,
      });
    } catch (error) {
      console.error("Error loading progress from Supabase:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  refreshFromSupabase: async () => {
    const state = get();
    if (!state.currentUserId) return;

    await get().loadFromSupabase(state.currentUserId);
  },

  resetStore: () => {
    set(initialState);
  },
}));
