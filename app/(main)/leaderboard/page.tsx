"use client";

import { useEffect, useState } from "react";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import { createClient } from "@/lib/supabase/client";
import { formatXP } from "@/lib/progress";
import { RefreshCw, Trophy, Flame, Loader2, Users } from "lucide-react";
import { toast } from "sonner";

interface LeaderboardEntry {
  userId: string;
  name: string;
  xp: number;
  streak: number;
  rank: number;
}

const LeaderboardPage = () => {
  const { session, profile } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<number>(0);
  const [currentUserXp, setCurrentUserXp] = useState<number>(0);
  const [currentUserStreak, setCurrentUserStreak] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLeaderboard = async () => {
    const supabase = createClient();

    try {
      // Fetch top 50 users by XP from user_progress joined with profiles (only students)
      const { data: progressData, error } = await supabase
        .from("user_progress")
        .select(
          `
          user_id,
          xp,
          streak,
          name,
          profiles!user_progress_user_id_fkey (
            username,
            role
          )
        `
        )
        .order("xp", { ascending: false });

      if (error) throw error;

      if (progressData) {
        // Filter only students and take top 50
        const studentData = progressData.filter((item) => {
          const profile = item.profiles as { username: string; role: string } | null;
          return profile?.role === "student";
        }).slice(0, 50);

        const entries: LeaderboardEntry[] = studentData.map((item, index) => {
          // Use profile username if available, fallback to user_progress name
          const profileData = item.profiles as { username: string; role: string } | null;
          return {
            userId: item.user_id,
            name: profileData?.username || item.name || "Pengguna",
            xp: item.xp || 0,
            streak: item.streak || 0,
            rank: index + 1,
          };
        });

        setLeaderboard(entries);

        // Find current user's rank
        if (session) {
          const userEntry = entries.find((e) => e.userId === session.userId);
          if (userEntry) {
            setCurrentUserRank(userEntry.rank);
            setCurrentUserXp(userEntry.xp);
            setCurrentUserStreak(userEntry.streak);
          } else {
            // User not in top 50, fetch their progress separately
            const { data: userProgress } = await supabase
              .from("user_progress")
              .select("xp, streak")
              .eq("user_id", session.userId)
              .single();

            if (userProgress) {
              setCurrentUserXp(userProgress.xp || 0);
              setCurrentUserStreak(userProgress.streak || 0);
              // Calculate approximate rank
              const { count } = await supabase
                .from("user_progress")
                .select("*", { count: "exact", head: true })
                .gt("xp", userProgress.xp || 0);
              setCurrentUserRank((count || 0) + 1);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      toast.error("Gagal memuat leaderboard");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [session]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchLeaderboard();
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-4 sm:gap-6 lg:gap-[48px] px-3 sm:px-4 lg:px-6">
      {/* Mobile Rank Card */}
      <div className="lg:hidden bg-gradient-to-br from-sky-500 to-sky-600 text-white p-3 sm:p-4 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm sm:text-base flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              Peringkat Kamu
            </h3>
            <p className="text-2xl sm:text-3xl font-bold">
              {currentUserRank > 0 ? `#${currentUserRank}` : "-"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs sm:text-sm opacity-90">
              {formatXP(currentUserXp)} XP
            </p>
            {currentUserStreak > 0 && (
              <p className="text-xs sm:text-sm opacity-90 flex items-center justify-end gap-1">
                <Flame className="h-3 w-3" />
                {currentUserStreak} hari
              </p>
            )}
          </div>
        </div>
      </div>

      <StickyWrapper>
        <div className="hidden lg:block bg-gradient-to-br from-sky-500 to-sky-600 text-white p-4 rounded-xl shadow-lg">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Peringkat Kamu
          </h3>
          <p className="text-3xl font-bold">
            {currentUserRank > 0 ? `#${currentUserRank}` : "-"}
          </p>
          <p className="text-sm opacity-90 mt-1">
            {formatXP(currentUserXp)} XP
          </p>
          {currentUserStreak > 0 && (
            <p className="text-sm opacity-90 mt-1 flex items-center gap-1">
              <Flame className="h-4 w-4" />
              {currentUserStreak} hari streak
            </p>
          )}
        </div>
      </StickyWrapper>

      <FeedWrapper>
        <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-700 mb-1 sm:mb-2">
              Leaderboard 🏆
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Peringkat pembelajar terbaik berdasarkan XP
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <p>Memuat leaderboard...</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Users className="h-12 w-12 mb-4 opacity-50" />
            <p className="font-medium">Belum ada data leaderboard</p>
            <p className="text-sm">Mulai belajar untuk masuk ke peringkat!</p>
          </div>
        ) : (
          <div className="border-2 rounded-lg sm:rounded-xl overflow-hidden">
            {leaderboard.map((entry, index) => {
              const isCurrentUser = session && entry.userId === session.userId;
              const medal =
                index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : index === 2
                  ? "🥉"
                  : null;

              return (
                <div
                  key={entry.userId}
                  className={`
                  flex items-center gap-2 sm:gap-4 p-2 sm:p-4 border-b last:border-b-0 transition-colors
                  ${index < 3 ? "bg-amber-50" : "hover:bg-gray-50"}
                  ${
                    isCurrentUser
                      ? "bg-emerald-50 border-l-4 border-l-emerald-500"
                      : ""
                  }
                `}
                >
                  <div className="w-8 sm:w-12 flex items-center justify-center">
                    {medal ? (
                      <span className="text-xl sm:text-2xl">{medal}</span>
                    ) : (
                      <span className="font-bold text-sm sm:text-lg text-neutral-500">
                        {entry.rank}
                      </span>
                    )}
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                    {entry.name.charAt(0).toUpperCase()}
                  </div>
                  <span
                    className={`flex-1 font-medium text-sm sm:text-base truncate ${
                      isCurrentUser ? "text-emerald-600 font-bold" : ""
                    }`}
                  >
                    {entry.name} {isCurrentUser && "(Kamu)"}
                  </span>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <span className="font-bold text-sm sm:text-lg text-amber-600">
                        {formatXP(entry.xp)}
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        XP
                      </span>
                    </div>
                    {entry.streak > 0 && (
                      <div className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                        <Flame className="h-3 w-3 text-orange-500" />
                        {entry.streak} hari
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </FeedWrapper>
    </div>
  );
};

export default LeaderboardPage;
