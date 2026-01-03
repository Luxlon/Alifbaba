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
    <div className="flex flex-col lg:flex-row-reverse gap-4 lg:gap-[48px] px-3 sm:px-4 md:px-6">
      {/* Sidebar - Hidden on mobile, shown on lg */}
      <div className="hidden lg:block">
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
      </div>
      
      <FeedWrapper>
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-700 mb-1 sm:mb-2">
            Kisah Para Nabi 📖
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Tonton video kisah nabi dan ikuti quiz setelahnya untuk mendapatkan XP.
          </p>
        </div>

        {/* Progress Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">{completedCount}/{PROPHET_STORIES.length}</div>
              <div className="text-xs sm:text-sm opacity-90">Kisah selesai</div>
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl">📺</div>
          </div>
          <Progress value={progressPercent} className="h-2 sm:h-3 bg-amber-400" />
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                    border-2 rounded-lg sm:rounded-xl overflow-hidden transition
                    ${isCompleted ? "border-amber-300 bg-amber-50" : "border-slate-200"}
                    ${!isCompleted && isUnlocked ? "border-amber-400 hover:shadow-md active:scale-[0.98]" : ""}
                    ${isLocked ? "opacity-60" : "hover:shadow-md"}
                  `}
                >
                  {/* Thumbnail */}
                  <div className="relative h-28 sm:h-36 md:h-40 bg-amber-100 flex items-center justify-center">
                    {isLocked ? (
                      <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-400" />
                    ) : isCompleted ? (
                      <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-amber-600" />
                    ) : (
                      <PlayCircle className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-amber-600" />
                    )}
                    {isCompleted && (
                      <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-emerald-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold">
                        ✓ Selesai
                      </div>
                    )}
                    {isLocked && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center" />
                    )}
                    <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 bg-black/70 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs">
                      {story.duration}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-3 sm:p-4">
                    <h3 className="font-bold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1">{story.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-1.5 sm:mb-2">
                      {story.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
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
                      <Button variant="story" size="sm" className="text-xs sm:text-sm h-8 sm:h-9">
                        Tonton Sekarang
                      </Button>
                    )}
                    {isCompleted && (
                      <Button variant="storyOutline" size="sm" className="text-xs sm:text-sm h-8 sm:h-9">
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
        <div className="mt-6 sm:mt-8 md:mt-10 bg-amber-50 border-2 border-amber-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
          <h3 className="font-bold text-sm sm:text-base text-amber-700 mb-1.5 sm:mb-2">💡 Cara Belajar</h3>
          <ul className="text-xs sm:text-sm text-amber-600 space-y-0.5 sm:space-y-1">
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
