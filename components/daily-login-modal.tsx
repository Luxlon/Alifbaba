"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserProgress } from "@/store/use-user-progress";
import { useAuth } from "@/components/providers/auth-provider";
import { Star, Gift, Flame } from "lucide-react";
import Confetti from "react-confetti";

const DAILY_REWARDS = [
  { day: 1, xp: 10, points: 5, icon: "🎁" },
  { day: 2, xp: 15, points: 10, icon: "⭐" },
  { day: 3, xp: 20, points: 15, icon: "🌟" },
  { day: 4, xp: 25, points: 20, icon: "💎" },
  { day: 5, xp: 30, points: 25, icon: "🔥" },
  { day: 6, xp: 40, points: 30, icon: "👑" },
  { day: 7, xp: 100, points: 50, icon: "🏆" },
];

// Key for localStorage to track daily claim
const DAILY_CLAIM_KEY = "alifbaba_daily_claim";

export const DailyLoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });
  const [isClaiming, setIsClaiming] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const { session } = useAuth();
  const { 
    streak, 
    lastLoginDate, 
    isInitialized,
    addXp, 
    addPoints, 
    updateStreak 
  } = useUserProgress();

  // Check if reward was already claimed today
  const wasClaimedToday = useCallback(() => {
    try {
      const lastClaim = localStorage.getItem(DAILY_CLAIM_KEY);
      if (!lastClaim) return false;
      
      const today = new Date().toISOString().split("T")[0];
      return lastClaim === today;
    } catch {
      return false;
    }
  }, []);

  // Mark reward as claimed today
  const markClaimedToday = useCallback(() => {
    try {
      const today = new Date().toISOString().split("T")[0];
      localStorage.setItem(DAILY_CLAIM_KEY, today);
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
    // Set window size for confetti only on client
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }, []);

  useEffect(() => {
    // Only run on client after mount
    if (!isMounted) return;

    // Only check once per session
    if (hasChecked) return;

    // Only check if user is logged in and progress is initialized
    if (!session || !isInitialized) return;

    // Check if reward was already claimed today
    if (wasClaimedToday()) {
      setHasChecked(true);
      return;
    }

    // Check if user should see daily reward (new day)
    const today = new Date().toISOString().split("T")[0];
    if (!lastLoginDate || lastLoginDate !== today) {
      // New day - show reward modal after delay
      setTimeout(() => setIsOpen(true), 500);
    }
    
    setHasChecked(true);
  }, [lastLoginDate, session, isInitialized, hasChecked, wasClaimedToday, isMounted]);

  const getCurrentDayReward = () => {
    // Cycle through 7 days
    const dayIndex = (streak % 7) || 7;
    return DAILY_REWARDS[dayIndex - 1] || DAILY_REWARDS[0];
  };

  const handleClaimReward = async () => {
    if (isClaiming) return;
    
    setIsClaiming(true);
    
    try {
      const reward = getCurrentDayReward();
      
      // Update streak and add rewards
      await updateStreak();
      await addXp(reward.xp);
      await addPoints(reward.points);
      
      // Mark as claimed today
      markClaimedToday();
      
      // Show confetti
      setShowConfetti(true);
      
      // Close modal after animation
      setTimeout(() => {
        setShowConfetti(false);
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Error claiming reward:", error);
    } finally {
      setIsClaiming(false);
    }
  };

  // Handle modal close without claiming
  const handleClose = () => {
    // Mark as "seen" today even if not claimed
    markClaimedToday();
    setIsOpen(false);
  };

  // Don't render if not logged in
  if (!session) return null;

  const reward = getCurrentDayReward();
  const currentDay = (streak % 7) + 1;

  return (
    <>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              🎉 Hadiah Harian
            </DialogTitle>
            <DialogDescription className="text-center">
              Selamat datang kembali! Klaim hadiahmu hari ini.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            {/* Streak Display */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Flame className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold">{streak} Hari Streak</span>
            </div>

            {/* Weekly Progress */}
            <div className="flex justify-center gap-2 mb-8">
              {DAILY_REWARDS.map((day, index) => {
                const isCompleted = index < currentDay - 1;
                const isCurrent = index === currentDay - 1;
                
                return (
                  <div
                    key={day.day}
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-lg
                      ${isCompleted ? "bg-green-100 text-green-600" : ""}
                      ${isCurrent ? "bg-amber-100 border-2 border-amber-500 animate-pulse" : ""}
                      ${!isCompleted && !isCurrent ? "bg-gray-100 text-gray-400" : ""}
                    `}
                  >
                    {isCompleted ? "✓" : day.day}
                  </div>
                );
              })}
            </div>

            {/* Current Reward */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 text-center mb-6">
              <div className="text-6xl mb-4">{reward.icon}</div>
              <h3 className="font-bold text-lg mb-2">Hari ke-{currentDay}</h3>
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-lg">+{reward.xp} XP</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🪙</span>
                  <span className="font-bold text-lg">+{reward.points}</span>
                </div>
              </div>
            </div>

            {/* Claim Button */}
            <Button
              variant="secondary"
              size="lg"
              className="w-full text-lg h-14"
              onClick={handleClaimReward}
              disabled={isClaiming}
            >
              <Gift className="h-5 w-5 mr-2" />
              {isClaiming ? "Mengklaim..." : "Klaim Hadiah"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
