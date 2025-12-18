import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";

const LeaderboardPage = () => {
  // Mock data leaderboard
  const leaderboard = [
    { rank: 1, name: "Ahmad", xp: 2500, avatar: "🥇" },
    { rank: 2, name: "Fatimah", xp: 2350, avatar: "🥈" },
    { rank: 3, name: "Umar", xp: 2100, avatar: "🥉" },
    { rank: 4, name: "Aisyah", xp: 1900, avatar: "👤" },
    { rank: 5, name: "Ali", xp: 1750, avatar: "👤" },
    { rank: 6, name: "Khadijah", xp: 1600, avatar: "👤" },
    { rank: 7, name: "Bilal", xp: 1450, avatar: "👤" },
    { rank: 8, name: "Maryam", xp: 1300, avatar: "👤" },
    { rank: 9, name: "Hamzah", xp: 1150, avatar: "👤" },
    { rank: 10, name: "Zainab", xp: 1000, avatar: "👤" },
  ];

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <div className="bg-sky-500 text-white p-4 rounded-xl">
          <h3 className="font-bold mb-2">Peringkat Kamu</h3>
          <p className="text-3xl font-bold">#15</p>
          <p className="text-sm opacity-90 mt-1">800 XP</p>
        </div>
      </StickyWrapper>
      
      <FeedWrapper>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-700 mb-2">
            Leaderboard 🏆
          </h1>
          <p className="text-muted-foreground">
            Lihat peringkat pembelajar terbaik minggu ini
          </p>
        </div>

        <div className="border-2 rounded-xl overflow-hidden">
          {leaderboard.map((user, index) => (
            <div 
              key={user.rank}
              className={`
                flex items-center gap-4 p-4 border-b last:border-b-0
                ${index < 3 ? "bg-amber-50" : ""}
              `}
            >
              <span className="text-2xl w-10 text-center">{user.avatar}</span>
              <span className="font-bold text-lg w-8">{user.rank}</span>
              <span className="flex-1 font-medium">{user.name}</span>
              <span className="text-sky-600 font-bold">{user.xp} XP</span>
            </div>
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LeaderboardPage;
