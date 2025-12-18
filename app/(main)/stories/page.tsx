"use client";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PROPHET_STORIES } from "@/constants";
import { useLessonProgress } from "@/store/use-lesson-progress";
import { useUserProgress } from "@/store/use-user-progress";
import { Lock, CheckCircle2, PlayCircle } from "lucide-react";
import Link from "next/link";

const StoriesPage = () => {
  const { getStoryProgress, isStoryCompleted } = useLessonProgress();
  const { xp, hearts } = useUserProgress();

  // Calculate overall progress
  const completedCount = PROPHET_STORIES.filter((story) =>
    isStoryCompleted(String(story.id))
  ).length;
  const progressPercent = Math.round((completedCount / PROPHET_STORIES.length) * 100);

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <div className="bg-amber-500 text-white p-4 rounded-xl">
          <div className="flex items-center gap-x-2 mb-2">
            <span className="text-2xl">⭐</span>
            <span className="font-bold">{xp} XP</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-2xl">❤️</span>
            <span className="font-bold">{hearts} Nyawa</span>
          </div>
        </div>
        
        <div className="border-2 rounded-xl p-4 space-y-4">
          <h3 className="font-bold text-lg">Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Video ditonton</span>
              <span>{completedCount}/{PROPHET_STORIES.length}</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>

        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
          <h3 className="font-bold mb-2">💡 Tips</h3>
          <p className="text-sm text-muted-foreground">
            Tonton video sampai selesai, lalu jawab quiz untuk mendapat XP!
          </p>
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

        {/* Progress Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold">{completedCount}/{PROPHET_STORIES.length}</div>
              <div className="text-sm opacity-90">Kisah selesai</div>
            </div>
            <div className="text-5xl">📺</div>
          </div>
          <Progress value={progressPercent} className="h-3 bg-amber-400" />
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROPHET_STORIES.map((story, index) => {
            const progress = getStoryProgress(String(story.id));
            const isCompleted = isStoryCompleted(String(story.id));
            const isUnlocked = index === 0 || isStoryCompleted(String(PROPHET_STORIES[index - 1].id));
            const isLocked = !isUnlocked;
            
            return (
              <Link 
                key={story.id}
                href={isLocked ? "#" : `/stories/${story.id}`}
                className={isLocked ? "cursor-not-allowed" : ""}
              >
                <div 
                  className={`
                    border-2 rounded-xl overflow-hidden transition
                    ${isCompleted ? "border-amber-300 bg-amber-50" : "border-slate-200"}
                    ${!isCompleted && isUnlocked ? "border-amber-400 hover:shadow-md" : ""}
                    ${isLocked ? "opacity-60" : "hover:shadow-md"}
                  `}
                >
                  {/* Thumbnail */}
                  <div className="relative h-40 bg-amber-100 flex items-center justify-center">
                    {isLocked ? (
                      <Lock className="w-12 h-12 text-neutral-400" />
                    ) : isCompleted ? (
                      <CheckCircle2 className="w-16 h-16 text-amber-600" />
                    ) : (
                      <PlayCircle className="w-16 h-16 text-amber-600" />
                    )}
                    {isCompleted && (
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        ✓ Selesai
                      </div>
                    )}
                    {isLocked && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center" />
                    )}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {story.duration}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{story.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {story.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      {story.quizQuestions.length > 0 && (
                        <span>📝 {story.quizQuestions.length} Quiz</span>
                      )}
                      {progress && (
                        <span className="text-amber-600 font-medium">
                          Skor: {progress.quizScore}%
                        </span>
                      )}
                    </div>
                    {!isLocked && !isCompleted && (
                      <Button variant="story" size="sm">
                        Tonton Sekarang
                      </Button>
                    )}
                    {isCompleted && (
                      <Button variant="storyOutline" size="sm">
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
          <h3 className="font-bold text-amber-700 mb-2">💡 Cara Belajar</h3>
          <ul className="text-sm text-amber-600 space-y-1">
            <li>1. Tonton video kisah nabi sampai selesai</li>
            <li>2. Jawab quiz untuk menguji pemahaman</li>
            <li>3. Dapatkan XP dan buka kisah selanjutnya!</li>
          </ul>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default StoriesPage;
