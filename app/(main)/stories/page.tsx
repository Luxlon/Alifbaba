import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";

// Data video kisah nabi - ANDA BISA MENAMBAHKAN VIDEO BARU DI SINI
// Format: { id, title, prophet, youtubeId, thumbnail, description, duration }
const prophetStories = [
  {
    id: 1,
    title: "Kisah Nabi Adam AS",
    prophet: "Adam AS",
    youtubeId: "dQw4w9WgXcQ", // Ganti dengan YouTube ID yang sebenarnya
    thumbnail: "/stories/adam.jpg",
    description: "Nabi Adam AS adalah manusia pertama yang diciptakan Allah SWT.",
    duration: "10:30",
    completed: true,
  },
  {
    id: 2,
    title: "Kisah Nabi Nuh AS",
    prophet: "Nuh AS",
    youtubeId: "dQw4w9WgXcQ", // Ganti dengan YouTube ID yang sebenarnya
    thumbnail: "/stories/nuh.jpg",
    description: "Kisah Nabi Nuh AS dan bahtera besar yang menyelamatkan umatnya.",
    duration: "12:45",
    completed: true,
  },
  {
    id: 3,
    title: "Kisah Nabi Ibrahim AS",
    prophet: "Ibrahim AS",
    youtubeId: "dQw4w9WgXcQ", // Ganti dengan YouTube ID yang sebenarnya
    thumbnail: "/stories/ibrahim.jpg",
    description: "Nabi Ibrahim AS yang dilempar ke dalam api namun selamat.",
    duration: "15:20",
    completed: false,
  },
  {
    id: 4,
    title: "Kisah Nabi Musa AS",
    prophet: "Musa AS",
    youtubeId: "dQw4w9WgXcQ", // Ganti dengan YouTube ID yang sebenarnya
    thumbnail: "/stories/musa.jpg",
    description: "Kisah Nabi Musa AS membelah lautan dengan tongkatnya.",
    duration: "18:00",
    completed: false,
  },
  {
    id: 5,
    title: "Kisah Nabi Yusuf AS",
    prophet: "Yusuf AS",
    youtubeId: "dQw4w9WgXcQ", // Ganti dengan YouTube ID yang sebenarnya
    thumbnail: "/stories/yusuf.jpg",
    description: "Kisah Nabi Yusuf AS yang sangat tampan dan penuh ujian.",
    duration: "20:15",
    completed: false,
  },
  {
    id: 6,
    title: "Kisah Nabi Isa AS",
    prophet: "Isa AS",
    youtubeId: "dQw4w9WgXcQ", // Ganti dengan YouTube ID yang sebenarnya
    thumbnail: "/stories/isa.jpg",
    description: "Kisah Nabi Isa AS yang lahir tanpa ayah.",
    duration: "14:30",
    completed: false,
  },
  {
    id: 7,
    title: "Kisah Nabi Muhammad SAW",
    prophet: "Muhammad SAW",
    youtubeId: "dQw4w9WgXcQ", // Ganti dengan YouTube ID yang sebenarnya
    thumbnail: "/stories/muhammad.jpg",
    description: "Kisah Nabi Muhammad SAW, nabi terakhir dan penutup para nabi.",
    duration: "25:00",
    completed: false,
  },
];

const StoriesPage = () => {
  const completedCount = prophetStories.filter(s => s.completed).length;
  const progressPercent = Math.round((completedCount / prophetStories.length) * 100);

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <div className="bg-amber-500 text-white p-4 rounded-xl">
          <h3 className="font-bold mb-2">Kisah Nabi</h3>
          <p className="text-sm opacity-90">
            Tonton video kisah para nabi dan jawab quiz untuk mendapatkan XP!
          </p>
        </div>
        
        <div className="border-2 rounded-xl p-4 space-y-4">
          <h3 className="font-bold text-lg">Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Video ditonton</span>
              <span>{completedCount}/{prophetStories.length}</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>
      </StickyWrapper>
      
      <FeedWrapper>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-700 mb-2">
            Kisah Para Nabi 📖
          </h1>
          <p className="text-muted-foreground">
            Tonton video kisah nabi dan ikuti quiz setelahnya untuk mendapatkan XP.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prophetStories.map((story, index) => {
            const isLocked = index > 0 && !prophetStories[index - 1].completed;
            
            return (
              <Link 
                key={story.id}
                href={isLocked ? "#" : `/stories/${story.id}`}
                className={isLocked ? "cursor-not-allowed" : ""}
              >
                <div 
                  className={`
                    border-2 rounded-xl overflow-hidden transition
                    ${story.completed ? "border-amber-300 bg-amber-50" : "border-slate-200"}
                    ${isLocked ? "opacity-60" : "hover:shadow-md"}
                  `}
                >
                  {/* Thumbnail */}
                  <div className="relative h-40 bg-amber-100 flex items-center justify-center">
                    <div className="text-6xl">📖</div>
                    {story.completed && (
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        ✓ Selesai
                      </div>
                    )}
                    {isLocked && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className="text-4xl">🔒</span>
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {story.duration}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{story.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {story.description}
                    </p>
                    {!isLocked && !story.completed && (
                      <Button variant="story" size="sm" className="mt-3">
                        Tonton Sekarang
                      </Button>
                    )}
                    {story.completed && (
                      <Button variant="storyOutline" size="sm" className="mt-3">
                        Tonton Ulang
                      </Button>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-10 bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
          <h3 className="font-bold text-amber-700 mb-2">💡 Tips</h3>
          <p className="text-sm text-amber-600">
            Setelah menonton video, kamu akan mendapat quiz untuk menguji pemahamanmu. 
            Jawab dengan benar untuk mendapatkan XP bonus!
          </p>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default StoriesPage;
