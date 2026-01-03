"use client";

import { useEffect } from "react";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useUserProgress } from "@/store/use-user-progress";
import { useLessonProgress } from "@/store/use-lesson-progress";
import { useQuests } from "@/store/use-quests";
import { formatXP, formatPoints } from "@/lib/progress";
import { toast } from "sonner";
import { CheckCircle2, Gift, Star, Trophy, Flame, Target } from "lucide-react";

const QuestsPage = () => {
  const { xp, points, streak, addXp, addPoints } = useUserProgress();
  const { getTotalCompleted } = useLessonProgress();
  const {
    quests,
    checkAndResetQuests,
    updateQuestProgress,
    claimQuestReward,
    getQuestsByType,
    getUnclaimedQuests,
  } = useQuests();

  const completed = getTotalCompleted();

  // Check and reset daily quests on page load
  useEffect(() => {
    checkAndResetQuests();
  }, [checkAndResetQuests]);

  // Update quest progress based on actual progress
  useEffect(() => {
    // Update achievement progress
    updateQuestProgress("achievement-hijaiyah-all", completed.hijaiyah);
    updateQuestProgress("achievement-story-all", completed.stories);
    updateQuestProgress("achievement-hadith-all", completed.hadith);
    updateQuestProgress("achievement-streak-30", streak);

    // Update weekly progress
    updateQuestProgress("weekly-hijaiyah-10", completed.hijaiyah);
    updateQuestProgress("weekly-story-3", completed.stories);
    updateQuestProgress("weekly-streak-7", streak);

    // Update daily progress (using XP as proxy for now)
    updateQuestProgress("daily-xp-100", xp % 100 === 0 && xp > 0 ? 100 : xp % 100);
    updateQuestProgress("daily-lesson-3", completed.total % 3);
  }, [completed, streak, xp, updateQuestProgress]);

  const dailyQuests = getQuestsByType("DAILY");
  const weeklyQuests = getQuestsByType("WEEKLY");
  const achievements = getQuestsByType("ACHIEVEMENT");
  const unclaimedQuests = getUnclaimedQuests();

  const handleClaimReward = (questId: string) => {
    const reward = claimQuestReward(questId);
    if (reward) {
      addXp(reward.xp);
      addPoints(reward.points);
      toast.success("Hadiah Diterima! 🎁", {
        description: `+${reward.xp} XP dan +${reward.points} Poin`,
      });
    }
  };

  const QuestCard = ({
    quest,
    color,
  }: {
    quest: (typeof quests)[0];
    color: string;
  }) => {
    const progressPercent = Math.round((quest.progress / quest.target) * 100);

    return (
      <div
        className={`
          border-2 rounded-lg sm:rounded-xl p-3 sm:p-5 transition-all active:scale-[0.99]
          ${quest.completed && !quest.claimed ? `border-${color}-400 bg-${color}-50` : "border-slate-200"}
          ${quest.claimed ? "opacity-60" : ""}
        `}
      >
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Icon */}
          <div
            className={`
              w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-2xl
              ${quest.completed ? `bg-${color}-100` : "bg-slate-100"}
            `}
          >
            {quest.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-sm sm:text-base truncate">{quest.title}</h3>
              {quest.completed && quest.claimed && (
                <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
              )}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2">
              {quest.description}
            </p>

            {/* Progress */}
            <div className="mb-2 sm:mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span>
                  {quest.progress}/{quest.target}
                </span>
                <span>{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-1.5 sm:h-2" />
            </div>

            {/* Reward */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
                  {quest.rewardXp} XP
                </span>
                <span className="flex items-center gap-1">
                  🪙 {quest.rewardPoints}
                </span>
              </div>

              {quest.completed && !quest.claimed && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleClaimReward(quest.id)}
                  className="animate-pulse h-7 sm:h-8 text-xs sm:text-sm px-2 sm:px-3"
                >
                  <Gift className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Klaim
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-4 sm:gap-6 lg:gap-[48px] px-3 sm:px-4 lg:px-6">
      {/* Mobile Stats Bar */}
      <div className="lg:hidden grid grid-cols-3 gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-3 rounded-lg">
        <div className="text-center">
          <div className="text-xs opacity-80">Daily</div>
          <div className="font-bold text-sm">{dailyQuests.filter((q) => q.completed).length}/{dailyQuests.length}</div>
        </div>
        <div className="text-center border-x border-white/20">
          <div className="text-xs opacity-80">Weekly</div>
          <div className="font-bold text-sm">{weeklyQuests.filter((q) => q.completed).length}/{weeklyQuests.length}</div>
        </div>
        <div className="text-center">
          <div className="text-xs opacity-80">Achieve</div>
          <div className="font-bold text-sm">{achievements.filter((q) => q.completed).length}/{achievements.length}</div>
        </div>
      </div>

      {/* Unclaimed Rewards - Mobile */}
      {unclaimedQuests.length > 0 && (
        <div className="lg:hidden bg-amber-100 border-2 border-amber-300 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Gift className="h-4 w-4 text-amber-600" />
            <span className="font-bold text-amber-800 text-sm">{unclaimedQuests.length} hadiah menunggu!</span>
          </div>
        </div>
      )}

      <StickyWrapper>
        {/* Stats Card */}
        <div className="hidden lg:block bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-xl">
          <h3 className="font-bold mb-3">Statistik Quest</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Daily</span>
              <span>
                {dailyQuests.filter((q) => q.completed).length}/{dailyQuests.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Weekly</span>
              <span>
                {weeklyQuests.filter((q) => q.completed).length}/{weeklyQuests.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Achievements</span>
              <span>
                {achievements.filter((q) => q.completed).length}/{achievements.length}
              </span>
            </div>
          </div>
        </div>

        {/* Unclaimed Rewards */}
        {unclaimedQuests.length > 0 && (
          <div className="hidden lg:block bg-amber-100 border-2 border-amber-300 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-5 w-5 text-amber-600" />
              <h3 className="font-bold text-amber-800">Hadiah Menunggu!</h3>
            </div>
            <p className="text-sm text-amber-700">
              {unclaimedQuests.length} quest belum diklaim
            </p>
          </div>
        )}

        {/* User Stats */}
        <div className="hidden lg:block border-2 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500" />
            <span className="font-bold">{formatXP(xp)} XP</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🪙</span>
            <span className="font-bold">{formatPoints(points)} Poin</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="font-bold">{streak} Hari Streak</span>
          </div>
        </div>
      </StickyWrapper>

      <FeedWrapper>
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-700 mb-1 sm:mb-2">
            Quest & Tantangan 🎯
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Selesaikan quest untuk mendapatkan hadiah!
          </p>
        </div>

        {/* Daily Quests */}
        <section className="mb-6 sm:mb-8 lg:mb-10">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Target className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
            <h2 className="text-lg sm:text-xl font-bold">Quest Harian</h2>
            <span className="text-xs sm:text-sm text-muted-foreground">
              Reset setiap hari
            </span>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {dailyQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} color="blue" />
            ))}
          </div>
        </section>

        {/* Weekly Quests */}
        <section className="mb-6 sm:mb-8 lg:mb-10">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Flame className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
            <h2 className="text-lg sm:text-xl font-bold">Quest Mingguan</h2>
            <span className="text-xs sm:text-sm text-muted-foreground">
              Reset setiap minggu
            </span>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {weeklyQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} color="orange" />
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-6 sm:mb-8 lg:mb-10">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
            <h2 className="text-lg sm:text-xl font-bold">Pencapaian</h2>
            <span className="text-xs sm:text-sm text-muted-foreground">
              Selesaikan untuk hadiah besar!
            </span>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {achievements.map((quest) => (
              <QuestCard key={quest.id} quest={quest} color="amber" />
            ))}
          </div>
        </section>
      </FeedWrapper>
    </div>
  );
};

export default QuestsPage;
