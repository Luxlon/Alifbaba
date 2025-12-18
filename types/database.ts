// Database Type Definitions for Alifbaba
// Mock data structures for user progress, lessons, and gamification

export interface UserProgress {
  userId: string;
  name: string;
  imageUrl: string;
  hearts: number;
  maxHearts: number;
  xp: number;
  points: number; // Currency for shop
  streak: number; // Days of continuous learning
  lastLoginDate: string;
  createdAt: string;
}

export interface HijaiyahProgress {
  id: string;
  userId: string;
  letterId: string; // Reference to HIJAIYAH_LETTERS constant
  letterName: string; // e.g., "alif", "ba"
  completed: boolean;
  score: number; // 0-100
  attempts: number;
  lastAttemptDate: string;
  harakatMastered: string[]; // ["fathah", "kasrah", "dhammah", etc.]
}

export interface StoryProgress {
  id: string;
  userId: string;
  storyId: string; // Reference to PROPHET_STORIES constant
  storyTitle: string;
  completed: boolean;
  videoWatched: boolean;
  quizScore: number; // 0-100
  quizAttempts: number;
  lastAttemptDate: string;
}

export interface HadithProgress {
  id: string;
  userId: string;
  hadithId: string; // Reference to HADITH_LIST constant
  hadithTitle: string;
  completed: boolean;
  audioPlayed: boolean;
  quizScore: number; // 0-100
  quizAttempts: number;
  memorized: boolean; // Did they complete memorization quiz?
  lastAttemptDate: string;
}

export interface IqroProgress {
  id: number;
  userId: string;
  iqroId: number; // Reference to IQRO_DATA constant (1-6)
  currentPage: number;
  totalPages: number;
  completed: boolean;
  lastReadDate: string;
}

export interface Challenge {
  id: string;
  lessonId: string; // Can be hijaiyah letter, story, or hadith ID
  type: "SELECT" | "LISTENING" | "SELECT_ALL" | "FILL_IN_BLANK";
  question: string;
  audioUrl?: string; // For LISTENING type
  options: ChallengeOption[];
  correctAnswers: string[]; // IDs of correct options (can be multiple for SELECT_ALL)
  order: number; // Challenge sequence in lesson
}

export interface ChallengeOption {
  id: string;
  text: string;
  audioUrl?: string;
  imageUrl?: string;
  isCorrect: boolean;
}

export interface ChallengeResult {
  challengeId: string;
  userId: string;
  isCorrect: boolean;
  selectedOptions: string[];
  heartsLost: number;
  xpGained: number;
  attemptDate: string;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number; // Cost in points
  type: "HEARTS_REFILL" | "DOUBLE_XP" | "FREEZE_STREAK" | "COSMETIC";
  iconUrl: string;
  value?: number; // For hearts refill (how many hearts)
  duration?: number; // For boosts (how many minutes)
  owned?: boolean; // For cosmetics
}

export interface UserInventory {
  id: string;
  userId: string;
  itemId: string;
  purchaseDate: string;
  expiresAt?: string; // For time-limited boosts
  active: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  imageUrl: string;
  xp: number;
  streak: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  rewardPoints: number;
  rewardXp: number;
  type: "DAILY" | "WEEKLY" | "ACHIEVEMENT";
  target: number; // e.g., complete 5 lessons
  progress: number; // current progress
  completed: boolean;
  iconUrl: string;
}

export interface DailyLoginReward {
  day: number;
  xp: number;
  points: number;
  hearts?: number;
  claimed: boolean;
}

// Lesson metadata
export interface Lesson {
  id: string;
  moduleType: "HIJAIYAH" | "STORY" | "HADITH";
  moduleId: string; // Reference to specific letter, story, or hadith
  title: string;
  description: string;
  challenges: Challenge[];
  xpReward: number;
  pointsReward: number;
  order: number;
  unlocked: boolean;
}

// User stats for profile
export interface UserStats {
  userId: string;
  totalLessonsCompleted: number;
  totalHijaiyahMastered: number;
  totalStoriesCompleted: number;
  totalHadithMemorized: number;
  totalXpEarned: number;
  totalPointsEarned: number;
  totalPointsSpent: number;
  longestStreak: number;
  currentStreak: number;
  joinDate: string;
}
