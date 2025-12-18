"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserProgress } from "@/store/use-user-progress";
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

export const DailyLoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  const { 
    streak, 
    lastLoginDate, 
    addXp, 
    addPoints, 
    updateStreak 
  } = useUserProgress();

  useEffect(() => {
    // Set window size for confetti
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Check if user should see daily reward
    const today = new Date().toDateString();
    if (lastLoginDate !== today) {
      // New day - show reward modal
      setTimeout(() => setIsOpen(true), 500);
    }
  }, [lastLoginDate]);

  const getCurrentDayReward = () => {
    // Cycle through 7 days
    const dayIndex = (streak % 7) || 7;
    return DAILY_REWARDS[dayIndex - 1] || DAILY_REWARDS[0];
  };

  const handleClaimReward = () => {
    const reward = getCurrentDayReward();
    
    // Update streak and add rewards
    updateStreak();
    addXp(reward.xp);
    addPoints(reward.points);
    
    // Show confetti
    setShowConfetti(true);
    
    // Close modal after animation
    setTimeout(() => {
      setShowConfetti(false);
      setIsOpen(false);
    }, 2000);
  };

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
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            >
              <Gift className="h-5 w-5 mr-2" />
              Klaim Hadiah
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
