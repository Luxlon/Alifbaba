"use client";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { useUserProgress } from "@/store/use-user-progress";
import { MOCK_LEADERBOARD } from "@/lib/mock-data";
import { formatXP } from "@/lib/progress";

const LeaderboardPage = () => {
  const { xp, name, imageUrl, streak } = useUserProgress();

  // Update leaderboard with current user data
  const leaderboard = MOCK_LEADERBOARD.map(entry => {
    if (entry.userId === "demo-user") {
      return {
        ...entry,
        name,
        imageUrl,
        xp,
        streak,
      };
    }
    return entry;
  }).sort((a, b) => b.xp - a.xp)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

  const currentUserRank = leaderboard.find(e => e.userId === "demo-user")?.rank || 0;

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-4 sm:gap-6 lg:gap-[48px] px-3 sm:px-4 lg:px-6">
      {/* Mobile Rank Card */}
      <div className="lg:hidden bg-sky-500 text-white p-3 sm:p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm sm:text-base">Peringkat Kamu</h3>
            <p className="text-2xl sm:text-3xl font-bold">#{currentUserRank}</p>
          </div>
          <div className="text-right">
            <p className="text-xs sm:text-sm opacity-90">{formatXP(xp)} XP</p>
            {streak > 0 && (
              <p className="text-xs sm:text-sm opacity-90">🔥 {streak} hari</p>
            )}
          </div>
        </div>
      </div>

      <StickyWrapper>
        <div className="hidden lg:block bg-sky-500 text-white p-4 rounded-xl">
          <h3 className="font-bold mb-2">Peringkat Kamu</h3>
          <p className="text-3xl font-bold">#{currentUserRank}</p>
          <p className="text-sm opacity-90 mt-1">{formatXP(xp)} XP</p>
          {streak > 0 && (
            <p className="text-sm opacity-90 mt-1">🔥 {streak} hari streak</p>
          )}
        </div>
      </StickyWrapper>
      
      <FeedWrapper>
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-700 mb-1 sm:mb-2">
            Leaderboard 🏆
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Lihat peringkat pembelajar terbaik minggu ini
          </p>
        </div>

        <div className="border-2 rounded-lg sm:rounded-xl overflow-hidden">
          {leaderboard.map((user, index) => {
            const isCurrentUser = user.userId === "demo-user";
            const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "👤";
            
            return (
              <div 
                key={user.userId}
                className={`
                  flex items-center gap-2 sm:gap-4 p-2 sm:p-4 border-b last:border-b-0
                  ${index < 3 ? "bg-amber-50" : ""}
                  ${isCurrentUser ? "bg-emerald-50 border-2 border-emerald-500" : ""}
                `}
              >
                <span className="text-lg sm:text-2xl w-6 sm:w-10 text-center">{medal}</span>
                <span className="font-bold text-sm sm:text-lg w-6 sm:w-8">{user.rank}</span>
                <span className={`flex-1 font-medium text-sm sm:text-base truncate ${isCurrentUser ? "text-emerald-600 font-bold" : ""}`}>
                  {user.name} {isCurrentUser && "(Kamu)"}
                </span>
                <div className="text-right">
                  <span className="font-bold text-sm sm:text-lg text-amber-600">{formatXP(user.xp)}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground ml-1">XP</span>
                  {user.streak > 0 && (
                    <div className="text-xs text-muted-foreground">🔥 {user.streak} hari</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LeaderboardPage;
