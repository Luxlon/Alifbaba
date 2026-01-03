import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Quest {
  id: string;
  title: string;
  description: string;
  type: "DAILY" | "WEEKLY" | "ACHIEVEMENT";
  target: number;
  progress: number;
  completed: boolean;
  claimed: boolean;
  rewardPoints: number;
  rewardXp: number;
  icon: string;
}

interface QuestStore {
  quests: Quest[];
  lastResetDate: string | null;
  
  // Actions
  updateQuestProgress: (questId: string, progress: number) => void;
  completeQuest: (questId: string) => void;
  claimQuestReward: (questId: string) => { points: number; xp: number } | null;
  resetDailyQuests: () => void;
  resetWeeklyQuests: () => void;
  checkAndResetQuests: () => void;
  
  // Getters
  getQuestsByType: (type: Quest["type"]) => Quest[];
  getUnclaimedQuests: () => Quest[];
  getTotalProgress: () => { daily: number; weekly: number; achievements: number };
}

const DEFAULT_QUESTS: Quest[] = [
  // Daily Quests
  {
    id: "daily-lesson-3",
    title: "Selesaikan 3 Pelajaran",
    description: "Selesaikan 3 pelajaran apa saja hari ini",
    type: "DAILY",
    target: 3,
    progress: 0,
    completed: false,
    claimed: false,
    rewardPoints: 30,
    rewardXp: 50,
    icon: "📚",
  },
  {
    id: "daily-xp-100",
    title: "Kumpulkan 100 XP",
    description: "Kumpulkan total 100 XP hari ini",
    type: "DAILY",
    target: 100,
    progress: 0,
    completed: false,
    claimed: false,
    rewardPoints: 20,
    rewardXp: 30,
    icon: "⭐",
  },
  {
    id: "daily-perfect-1",
    title: "Nilai Sempurna",
    description: "Dapatkan nilai 100% di satu pelajaran",
    type: "DAILY",
    target: 1,
    progress: 0,
    completed: false,
    claimed: false,
    rewardPoints: 40,
    rewardXp: 60,
    icon: "💯",
  },
  // Weekly Quests
  {
    id: "weekly-streak-7",
    title: "Streak 7 Hari",
    description: "Pertahankan streak belajar selama 7 hari",
    type: "WEEKLY",
    target: 7,
    progress: 0,
    completed: false,
    claimed: false,
    rewardPoints: 150,
    rewardXp: 200,
    icon: "🔥",
  },
  {
    id: "weekly-hijaiyah-10",
    title: "Kuasai 10 Huruf",
    description: "Selesaikan 10 huruf hijaiyah minggu ini",
    type: "WEEKLY",
    target: 10,
    progress: 0,
    completed: false,
    claimed: false,
    rewardPoints: 100,
    rewardXp: 150,
    icon: "ا",
  },
  {
    id: "weekly-story-3",
    title: "Tonton 3 Kisah",
    description: "Tonton dan selesaikan 3 kisah nabi",
    type: "WEEKLY",
    target: 3,
    progress: 0,
    completed: false,
    claimed: false,
    rewardPoints: 80,
    rewardXp: 120,
    icon: "📖",
  },
  // Achievements
  {
    id: "achievement-hijaiyah-all",
    title: "Master Hijaiyah",
    description: "Kuasai semua 28 huruf hijaiyah",
    type: "ACHIEVEMENT",
    target: 28,
    progress: 0,
    completed: false,
    claimed: false,
    rewardPoints: 500,
    rewardXp: 1000,
    icon: "🏆",
  },
  {
    id: "achievement-story-all",
    title: "Pecinta Kisah",
    description: "Tonton semua 7 kisah nabi",
    type: "ACHIEVEMENT",
    target: 7,
    progress: 0,
    completed: false,
    claimed: false,
    rewardPoints: 300,
    rewardXp: 600,
    icon: "📺",
  },
  {
    id: "achievement-hadith-all",
    title: "Penghafal Hadist",
    description: "Pelajari semua 8 hadist pilihan",
    type: "ACHIEVEMENT",
    target: 8,
    progress: 0,
    completed: false,
    claimed: false,
    rewardPoints: 400,
    rewardXp: 800,
    icon: "📿",
  },
  {
    id: "achievement-streak-30",
    title: "Pembelajar Setia",
    description: "Pertahankan streak selama 30 hari",
    type: "ACHIEVEMENT",
    target: 30,
    progress: 0,
    completed: false,
    claimed: false,
    rewardPoints: 1000,
    rewardXp: 2000,
    icon: "👑",
  },
];

export const useQuests = create<QuestStore>()(
  persist(
    (set, get) => ({
      quests: DEFAULT_QUESTS,
      lastResetDate: null,

      updateQuestProgress: (questId: string, progress: number) => {
        set((state) => ({
          quests: state.quests.map((quest) => {
            if (quest.id === questId) {
              const newProgress = Math.min(progress, quest.target);
              const completed = newProgress >= quest.target;
              return {
                ...quest,
                progress: newProgress,
                completed,
              };
            }
            return quest;
          }),
        }));
      },

      completeQuest: (questId: string) => {
        set((state) => ({
          quests: state.quests.map((quest) =>
            quest.id === questId
              ? { ...quest, completed: true, progress: quest.target }
              : quest
          ),
        }));
      },

      claimQuestReward: (questId: string) => {
        const quest = get().quests.find((q) => q.id === questId);
        if (!quest || !quest.completed || quest.claimed) {
          return null;
        }

        set((state) => ({
          quests: state.quests.map((q) =>
            q.id === questId ? { ...q, claimed: true } : q
          ),
        }));

        return {
          points: quest.rewardPoints,
          xp: quest.rewardXp,
        };
      },

      resetDailyQuests: () => {
        set((state) => ({
          quests: state.quests.map((quest) =>
            quest.type === "DAILY"
              ? { ...quest, progress: 0, completed: false, claimed: false }
              : quest
          ),
          lastResetDate: new Date().toDateString(),
        }));
      },

      resetWeeklyQuests: () => {
        set((state) => ({
          quests: state.quests.map((quest) =>
            quest.type === "WEEKLY"
              ? { ...quest, progress: 0, completed: false, claimed: false }
              : quest
          ),
        }));
      },

      checkAndResetQuests: () => {
        const { lastResetDate } = get();
        const today = new Date().toDateString();

        if (lastResetDate !== today) {
          get().resetDailyQuests();
        }
      },

      getQuestsByType: (type: Quest["type"]) => {
        return get().quests.filter((quest) => quest.type === type);
      },

      getUnclaimedQuests: () => {
        return get().quests.filter((quest) => quest.completed && !quest.claimed);
      },

      getTotalProgress: () => {
        const quests = get().quests;
        const daily = quests.filter((q) => q.type === "DAILY" && q.completed).length;
        const weekly = quests.filter((q) => q.type === "WEEKLY" && q.completed).length;
        const achievements = quests.filter((q) => q.type === "ACHIEVEMENT" && q.completed).length;
        return { daily, weekly, achievements };
      },
    }),
    {
      name: "quests-storage",
    }
  )
);
