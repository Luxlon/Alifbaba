import type { Challenge, ChallengeResult } from "@/types/database";
import {
  XP_REWARDS,
  HEARTS_CONFIG,
  POINTS_REWARDS,
} from "@/lib/mock-data";

/**
 * Calculate XP earned from completing a challenge
 */
export const calculateChallengeXP = (
  isCorrect: boolean,
  isFirstTry: boolean
): number => {
  if (!isCorrect) return 0;

  let xp = XP_REWARDS.CHALLENGE_CORRECT;

  if (isFirstTry) {
    xp += XP_REWARDS.FIRST_TRY;
  }

  return xp;
};

/**
 * Calculate XP earned from completing a lesson
 */
export const calculateLessonXP = (
  correctAnswers: number,
  totalChallenges: number,
  isPerfectScore: boolean
): number => {
  let xp = XP_REWARDS.LESSON_COMPLETE;

  // Add XP for each correct answer
  xp += correctAnswers * XP_REWARDS.CHALLENGE_CORRECT;

  // Bonus for perfect score
  if (isPerfectScore && correctAnswers === totalChallenges) {
    xp += XP_REWARDS.PERFECT_SCORE;
  }

  return xp;
};

/**
 * Calculate lesson score (0-100)
 */
export const calculateLessonScore = (
  correctAnswers: number,
  totalChallenges: number
): number => {
  if (totalChallenges === 0) return 0;
  return Math.round((correctAnswers / totalChallenges) * 100);
};

/**
 * Calculate hearts lost from wrong answers
 */
export const calculateHeartsLost = (wrongAnswers: number): number => {
  return wrongAnswers * HEARTS_CONFIG.LOSE_PER_WRONG_ANSWER;
};

/**
 * Check if user can continue lesson (has enough hearts)
 */
export const canContinueLesson = (currentHearts: number): boolean => {
  return currentHearts > 0;
};

/**
 * Calculate points earned from completing a lesson
 */
export const calculateLessonPoints = (
  lessonCompleted: boolean,
  currentStreak: number
): number => {
  if (!lessonCompleted) return 0;

  let points = POINTS_REWARDS.LESSON_COMPLETE;

  // Streak bonus
  points += currentStreak * POINTS_REWARDS.STREAK_BONUS_PER_DAY;

  return points;
};

/**
 * Calculate daily login rewards
 */
export const calculateDailyLoginReward = (
  consecutiveDays: number
): {
  xp: number;
  points: number;
  hearts?: number;
} => {
  const baseXp = 10;
  const basePoints = POINTS_REWARDS.DAILY_LOGIN;

  // Bonus for consecutive days
  const streakMultiplier = Math.min(consecutiveDays, 7); // Max 7x multiplier

  const reward = {
    xp: baseXp * streakMultiplier,
    points: basePoints + streakMultiplier * POINTS_REWARDS.STREAK_BONUS_PER_DAY,
  };

  // Bonus hearts every 7 days
  if (consecutiveDays % 7 === 0 && consecutiveDays > 0) {
    return {
      ...reward,
      hearts: 1,
    };
  }

  return reward;
};

/**
 * Check if lesson should be unlocked based on previous completion
 */
export const shouldUnlockLesson = (
  lessonIndex: number,
  completedLessons: string[]
): boolean => {
  // First lesson is always unlocked
  if (lessonIndex === 0) return true;

  // Check if previous lesson is completed
  // This assumes lessons are in order and use consistent IDs
  return completedLessons.length >= lessonIndex;
};

/**
 * Calculate user level based on total XP
 * Using exponential growth: level = floor(sqrt(xp / 100))
 */
export const calculateUserLevel = (totalXp: number): number => {
  return Math.floor(Math.sqrt(totalXp / 100)) + 1;
};

/**
 * Calculate XP needed for next level
 */
export const getXPForNextLevel = (currentLevel: number): number => {
  return (currentLevel + 1) ** 2 * 100;
};

/**
 * Calculate progress to next level (0-100%)
 */
export const getProgressToNextLevel = (totalXp: number): number => {
  const currentLevel = calculateUserLevel(totalXp);
  const xpForCurrentLevel = (currentLevel - 1) ** 2 * 100;
  const xpForNextLevel = getXPForNextLevel(currentLevel);
  const xpInCurrentLevel = totalXp - xpForCurrentLevel;
  const xpNeededForLevel = xpForNextLevel - xpForCurrentLevel;

  return Math.round((xpInCurrentLevel / xpNeededForLevel) * 100);
};

/**
 * Format XP number with thousands separator
 */
export const formatXP = (xp: number): string => {
  return xp.toLocaleString("id-ID");
};

/**
 * Format points number with thousands separator
 */
export const formatPoints = (points: number): string => {
  return points.toLocaleString("id-ID");
};

/**
 * Check if challenge answer is correct
 */
export const checkChallengeAnswer = (
  challenge: Challenge,
  selectedOptions: string[]
): boolean => {
  // Sort both arrays to compare
  const correctSorted = [...challenge.correctAnswers].sort();
  const selectedSorted = [...selectedOptions].sort();

  // Check if arrays are equal
  return (
    correctSorted.length === selectedSorted.length &&
    correctSorted.every((value, index) => value === selectedSorted[index])
  );
};

/**
 * Get feedback message based on challenge result
 */
export const getChallengeResultMessage = (
  isCorrect: boolean,
  isFirstTry: boolean
): {
  title: string;
  message: string;
  emoji: string;
} => {
  if (isCorrect) {
    if (isFirstTry) {
      return {
        title: "Sempurna!",
        message: "Jawaban benar di percobaan pertama! Bonus XP untukmu!",
        emoji: "🎉",
      };
    }
    return {
      title: "Benar!",
      message: "Jawaban kamu tepat!",
      emoji: "✅",
    };
  }

  return {
    title: "Belum Tepat",
    message: "Coba lagi! Kamu pasti bisa!",
    emoji: "💪",
  };
};

/**
 * Get lesson completion message
 */
export const getLessonCompletionMessage = (
  score: number
): {
  title: string;
  message: string;
  emoji: string;
} => {
  if (score === 100) {
    return {
      title: "Sempurna!",
      message: "Nilai sempurna! Kamu luar biasa!",
      emoji: "🌟",
    };
  }

  if (score >= 80) {
    return {
      title: "Bagus Sekali!",
      message: "Kamu berhasil menyelesaikan pelajaran ini!",
      emoji: "🎊",
    };
  }

  if (score >= 60) {
    return {
      title: "Lumayan!",
      message: "Terus berlatih untuk hasil yang lebih baik!",
      emoji: "👍",
    };
  }

  return {
    title: "Tetap Semangat!",
    message: "Jangan menyerah, coba lagi!",
    emoji: "💪",
  };
};

/**
 * Calculate time until hearts refill (in minutes)
 * Hearts refill 1 per 30 minutes
 */
export const calculateHeartsRefillTime = (
  currentHearts: number,
  lastHeartLostTime: Date
): number => {
  if (currentHearts >= HEARTS_CONFIG.MAX_HEARTS) return 0;

  const now = new Date();
  const minutesSinceLastLoss = Math.floor(
    (now.getTime() - lastHeartLostTime.getTime()) / (1000 * 60)
  );

  const heartsToRefill = HEARTS_CONFIG.MAX_HEARTS - currentHearts;
  const minutesPerHeart = 30;
  const totalMinutesNeeded = heartsToRefill * minutesPerHeart;
  const minutesRemaining = totalMinutesNeeded - minutesSinceLastLoss;

  return Math.max(0, minutesRemaining);
};

/**
 * Format time in minutes to human readable string
 */
export const formatRefillTime = (minutes: number): string => {
  if (minutes === 0) return "Tersedia sekarang";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0) {
    return `${hours} jam ${mins} menit`;
  }

  return `${mins} menit`;
};
