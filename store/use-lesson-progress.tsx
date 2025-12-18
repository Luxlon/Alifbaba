import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  HijaiyahProgress,
  StoryProgress,
  HadithProgress,
} from "@/types/database";

interface LessonProgressStore {
  // Hijaiyah Progress
  hijaiyahProgress: Record<string, HijaiyahProgress>;
  
  // Story Progress
  storyProgress: Record<string, StoryProgress>;
  
  // Hadith Progress
  hadithProgress: Record<string, HadithProgress>;

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

  // Stats
  getTotalCompleted: () => {
    hijaiyah: number;
    stories: number;
    hadith: number;
    total: number;
  };
}

export const useLessonProgress = create<LessonProgressStore>()(
  persist(
    (set, get) => ({
      // Initial state
      hijaiyahProgress: {},
      storyProgress: {},
      hadithProgress: {},

      // Hijaiyah Actions
      completeHijaiyahLesson: (
        letterId: string,
        letterName: string,
        score: number,
        harakatMastered: string[]
      ) => {
        set((state) => {
          const existing = state.hijaiyahProgress[letterId];
          const attempts = existing ? existing.attempts + 1 : 1;

          return {
            hijaiyahProgress: {
              ...state.hijaiyahProgress,
              [letterId]: {
                id: letterId,
                userId: "demo-user",
                letterId,
                letterName,
                completed: score >= 80, // 80% to pass
                score: Math.max(score, existing?.score || 0), // Keep best score
                attempts,
                lastAttemptDate: new Date().toISOString(),
                harakatMastered: [
                  ...new Set([
                    ...(existing?.harakatMastered || []),
                    ...harakatMastered,
                  ]),
                ],
              },
            },
          };
        });
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
        set((state) => {
          const existing = state.storyProgress[storyId];
          const attempts = existing ? existing.quizAttempts + 1 : 1;

          return {
            storyProgress: {
              ...state.storyProgress,
              [storyId]: {
                id: storyId,
                userId: "demo-user",
                storyId,
                storyTitle,
                completed: quizScore >= 80 && videoWatched,
                videoWatched: videoWatched || existing?.videoWatched || false,
                quizScore: Math.max(quizScore, existing?.quizScore || 0),
                quizAttempts: attempts,
                lastAttemptDate: new Date().toISOString(),
              },
            },
          };
        });
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
        set((state) => {
          const existing = state.hadithProgress[hadithId];
          const attempts = existing ? existing.quizAttempts + 1 : 1;

          return {
            hadithProgress: {
              ...state.hadithProgress,
              [hadithId]: {
                id: hadithId,
                userId: "demo-user",
                hadithId,
                hadithTitle,
                completed: quizScore >= 80 && audioPlayed,
                audioPlayed: audioPlayed || existing?.audioPlayed || false,
                quizScore: Math.max(quizScore, existing?.quizScore || 0),
                quizAttempts: attempts,
                memorized: memorized || existing?.memorized || false,
                lastAttemptDate: new Date().toISOString(),
              },
            },
          };
        });
      },

      getHadithProgress: (hadithId: string) => {
        return get().hadithProgress[hadithId];
      },

      isHadithCompleted: (hadithId: string) => {
        const progress = get().hadithProgress[hadithId];
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

        return {
          hijaiyah,
          stories,
          hadith,
          total: hijaiyah + stories + hadith,
        };
      },
    }),
    {
      name: "lesson-progress-storage",
    }
  )
);
