import type {
  Challenge,
  ShopItem,
  Quest,
  LeaderboardEntry,
} from "@/types/database";

// Mock Challenges for Hijaiyah Letter "Alif"
export const MOCK_ALIF_CHALLENGES: Challenge[] = [
  {
    id: "alif-ch-1",
    lessonId: "alif",
    type: "LISTENING",
    question: "Dengarkan audio dan pilih huruf yang sesuai",
    audioUrl: "/audio/hijaiyah/alif.mp3",
    options: [
      {
        id: "opt-1",
        text: "ا",
        audioUrl: "/audio/hijaiyah/alif.mp3",
        isCorrect: true,
      },
      {
        id: "opt-2",
        text: "ب",
        audioUrl: "/audio/hijaiyah/ba.mp3",
        isCorrect: false,
      },
      {
        id: "opt-3",
        text: "ت",
        audioUrl: "/audio/hijaiyah/ta.mp3",
        isCorrect: false,
      },
    ],
    correctAnswers: ["opt-1"],
    order: 1,
  },
  {
    id: "alif-ch-2",
    lessonId: "alif",
    type: "SELECT",
    question: "Pilih cara membaca huruf Alif dengan harakat Fathah (َ)",
    options: [
      {
        id: "opt-1",
        text: "a (seperti 'makan')",
        isCorrect: true,
      },
      {
        id: "opt-2",
        text: "i (seperti 'ini')",
        isCorrect: false,
      },
      {
        id: "opt-3",
        text: "u (seperti 'untuk')",
        isCorrect: false,
      },
    ],
    correctAnswers: ["opt-1"],
    order: 2,
  },
  {
    id: "alif-ch-3",
    lessonId: "alif",
    type: "SELECT_ALL",
    question: "Pilih SEMUA harakat yang bisa digunakan pada huruf Alif",
    options: [
      {
        id: "opt-1",
        text: "Fathah (َ)",
        isCorrect: true,
      },
      {
        id: "opt-2",
        text: "Kasrah (ِ)",
        isCorrect: true,
      },
      {
        id: "opt-3",
        text: "Dhammah (ُ)",
        isCorrect: true,
      },
      {
        id: "opt-4",
        text: "Sukun (ْ)",
        isCorrect: true,
      },
    ],
    correctAnswers: ["opt-1", "opt-2", "opt-3", "opt-4"],
    order: 3,
  },
];

// Mock Challenges for Story "Nabi Adam"
export const MOCK_ADAM_CHALLENGES: Challenge[] = [
  {
    id: "adam-ch-1",
    lessonId: "adam",
    type: "SELECT",
    question: "Siapa manusia pertama yang diciptakan Allah?",
    options: [
      {
        id: "opt-1",
        text: "Nabi Adam",
        isCorrect: true,
      },
      {
        id: "opt-2",
        text: "Nabi Nuh",
        isCorrect: false,
      },
      {
        id: "opt-3",
        text: "Nabi Ibrahim",
        isCorrect: false,
      },
    ],
    correctAnswers: ["opt-1"],
    order: 1,
  },
  {
    id: "adam-ch-2",
    lessonId: "adam",
    type: "SELECT",
    question: "Dimana Nabi Adam tinggal sebelum turun ke bumi?",
    options: [
      {
        id: "opt-1",
        text: "Surga",
        isCorrect: true,
      },
      {
        id: "opt-2",
        text: "Gunung",
        isCorrect: false,
      },
      {
        id: "opt-3",
        text: "Laut",
        isCorrect: false,
      },
    ],
    correctAnswers: ["opt-1"],
    order: 2,
  },
  {
    id: "adam-ch-3",
    lessonId: "adam",
    type: "SELECT",
    question: "Siapa istri Nabi Adam?",
    options: [
      {
        id: "opt-1",
        text: "Hawa",
        isCorrect: true,
      },
      {
        id: "opt-2",
        text: "Sarah",
        isCorrect: false,
      },
      {
        id: "opt-3",
        text: "Maryam",
        isCorrect: false,
      },
    ],
    correctAnswers: ["opt-1"],
    order: 3,
  },
];

// Mock Shop Items
export const MOCK_SHOP_ITEMS: ShopItem[] = [
  {
    id: "hearts-refill-1",
    name: "Isi Ulang Hati",
    description: "Isi ulang semua hati Anda untuk melanjutkan belajar",
    price: 50,
    type: "HEARTS_REFILL",
    iconUrl: "/shop/hearts.svg",
    value: 5,
  },
  {
    id: "double-xp-30",
    name: "XP Ganda 30 Menit",
    description: "Dapatkan XP 2x lipat selama 30 menit",
    price: 100,
    type: "DOUBLE_XP",
    iconUrl: "/shop/boost.svg",
    duration: 30,
  },
  {
    id: "freeze-streak",
    name: "Bekukan Streak",
    description: "Lindungi streak Anda selama 1 hari jika tidak belajar",
    price: 150,
    type: "FREEZE_STREAK",
    iconUrl: "/shop/freeze.svg",
    duration: 1440, // 24 hours in minutes
  },
  {
    id: "mascot-blue",
    name: "Maskot Biru",
    description: "Ubah warna maskot menjadi biru",
    price: 200,
    type: "COSMETIC",
    iconUrl: "/shop/mascot-blue.svg",
  },
  {
    id: "mascot-green",
    name: "Maskot Hijau",
    description: "Ubah warna maskot menjadi hijau",
    price: 200,
    type: "COSMETIC",
    iconUrl: "/shop/mascot-green.svg",
  },
];

// Mock Quests (Daily & Achievements)
export const MOCK_QUESTS: Quest[] = [
  {
    id: "daily-1",
    title: "Selesaikan 3 Pelajaran",
    description: "Selesaikan 3 pelajaran hari ini",
    rewardPoints: 50,
    rewardXp: 20,
    type: "DAILY",
    target: 3,
    progress: 0,
    completed: false,
    iconUrl: "/quests/daily-lesson.svg",
  },
  {
    id: "daily-2",
    title: "Dapatkan 100 XP",
    description: "Kumpulkan 100 XP hari ini",
    rewardPoints: 30,
    rewardXp: 10,
    type: "DAILY",
    target: 100,
    progress: 0,
    completed: false,
    iconUrl: "/quests/daily-xp.svg",
  },
  {
    id: "weekly-1",
    title: "Pertahankan Streak 7 Hari",
    description: "Belajar setiap hari selama 1 minggu",
    rewardPoints: 200,
    rewardXp: 100,
    type: "WEEKLY",
    target: 7,
    progress: 0,
    completed: false,
    iconUrl: "/quests/weekly-streak.svg",
  },
  {
    id: "achievement-1",
    title: "Kuasai Semua Huruf Hijaiyah",
    description: "Selesaikan 28 huruf hijaiyah dengan sempurna",
    rewardPoints: 500,
    rewardXp: 300,
    type: "ACHIEVEMENT",
    target: 28,
    progress: 0,
    completed: false,
    iconUrl: "/quests/achievement-hijaiyah.svg",
  },
  {
    id: "achievement-2",
    title: "Hafal 10 Hadist",
    description: "Hafalkan 10 hadist pilihan",
    rewardPoints: 400,
    rewardXp: 250,
    type: "ACHIEVEMENT",
    target: 10,
    progress: 0,
    completed: false,
    iconUrl: "/quests/achievement-hadith.svg",
  },
];

// Mock Leaderboard
export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: "user-1",
    name: "Ahmad Faiz",
    imageUrl: "/profile/avatar-1.svg",
    xp: 2450,
    streak: 15,
  },
  {
    rank: 2,
    userId: "user-2",
    name: "Siti Aisyah",
    imageUrl: "/profile/avatar-2.svg",
    xp: 2100,
    streak: 12,
  },
  {
    rank: 3,
    userId: "user-3",
    name: "Muhammad Rizki",
    imageUrl: "/profile/avatar-3.svg",
    xp: 1850,
    streak: 10,
  },
  {
    rank: 4,
    userId: "demo-user",
    name: "Pelajar Alifbaba",
    imageUrl: "/profile/default-avatar.svg",
    xp: 0,
    streak: 0,
  },
  {
    rank: 5,
    userId: "user-5",
    name: "Fatimah Zahra",
    imageUrl: "/profile/avatar-4.svg",
    xp: 1200,
    streak: 8,
  },
];

// XP Rewards Configuration
export const XP_REWARDS = {
  CHALLENGE_CORRECT: 10, // XP for each correct answer
  LESSON_COMPLETE: 50, // Bonus XP for completing a lesson
  PERFECT_SCORE: 100, // Extra bonus for 100% score
  FIRST_TRY: 20, // Bonus for getting it right first try
  STORY_VIDEO_WATCHED: 30, // XP for watching story video
  HADITH_AUDIO_PLAYED: 30, // XP for listening to hadith
};

// Hearts Configuration
export const HEARTS_CONFIG = {
  MAX_HEARTS: 5,
  LOSE_PER_WRONG_ANSWER: 1,
  REFILL_COST: 50, // Points cost to refill all hearts
  PRACTICE_MODE_ENABLED: true, // If true, lessons can be practiced without losing hearts
};

// Points Rewards Configuration
export const POINTS_REWARDS = {
  LESSON_COMPLETE: 20,
  DAILY_LOGIN: 10,
  STREAK_BONUS_PER_DAY: 5, // Additional points per streak day
  QUEST_DAILY: 50,
  QUEST_WEEKLY: 200,
  QUEST_ACHIEVEMENT: 500,
};
