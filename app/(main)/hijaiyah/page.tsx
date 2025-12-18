"use client";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { HIJAIYAH_LETTERS } from "@/constants";
import { useLessonProgress } from "@/store/use-lesson-progress";
import { Lock, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";

const HijaiyahPage = () => {
  const { getHijaiyahProgress, isHijaiyahCompleted } = useLessonProgress();

  // Calculate overall progress
  const completedCount = HIJAIYAH_LETTERS.filter((letter) =>
    isHijaiyahCompleted(letter.name)
  ).length;
  const overallProgress = Math.round((completedCount / HIJAIYAH_LETTERS.length) * 100);

  return (
    <div className="px-3 sm:px-4 md:px-6 pb-16 sm:pb-20">
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-neutral-700 mb-1 sm:mb-2">
          Huruf Hijaiyah 📚
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Pilih huruf yang ingin kamu pelajari. Setiap huruf memiliki lesson dengan harakat.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <div>
            <div className="text-2xl sm:text-3xl font-bold">{completedCount}/28</div>
            <div className="text-xs sm:text-sm opacity-90">Huruf dikuasai</div>
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl">📖</div>
        </div>
        <Progress value={overallProgress} className="h-2 sm:h-3 bg-emerald-400" />
        <div className="text-right text-xs sm:text-sm mt-1 sm:mt-2 opacity-90">{overallProgress}%</div>
      </div>
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 md:mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-sm sm:text-base text-emerald-700">Progress Kamu</p>
            <p className="text-xs sm:text-sm text-emerald-600">8 dari 28 huruf selesai</p>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-600">28%</div>
        </div>
      </div>

      {/* Hijaiyah Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2 sm:gap-3">
        {HIJAIYAH_LETTERS.map((item, index) => {
          const progress = getHijaiyahProgress(item.name);
          const isCompleted = isHijaiyahCompleted(item.name);
          const isUnlocked = index === 0 || isHijaiyahCompleted(HIJAIYAH_LETTERS[index - 1].name);
          const isLocked = !isUnlocked;

          return (
            <Link 
              key={item.name}
              href={isLocked ? "#" : `/hijaiyah/${item.name}`}
              className={isLocked ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"}
            >
              <div 
                className={`
                  relative border-2 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center transition group
                  ${isCompleted ? "bg-emerald-100 border-emerald-300 hover:bg-emerald-200" : ""}
                  ${!isCompleted && isUnlocked ? "bg-sky-50 border-sky-300 hover:bg-sky-100 ring-2 ring-sky-300 cursor-pointer" : ""}
                  ${isLocked ? "bg-neutral-100 border-neutral-200 opacity-60 cursor-not-allowed" : ""}
                  ${!isLocked ? "hover:scale-105 hover:shadow-md active:scale-95" : ""}
                `}
              >
                {/* Status Icons */}
                {isCompleted && (
                  <div className="absolute -top-1 -right-1">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 fill-emerald-500" />
                  </div>
                )}
                {!isCompleted && isUnlocked && (
                  <div className="absolute -top-1 -right-1">
                    <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500 animate-pulse" />
                  </div>
                )}
                {isLocked && (
                  <div className="absolute -top-1 -right-1">
                    <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-neutral-400" />
                  </div>
                )}

                {/* Letter Display */}
                <span className="hijaiyah-letter-sm block mb-0.5 sm:mb-1">{item.letter}</span>
                <span className="text-[10px] sm:text-xs font-medium text-neutral-600 block">{item.name}</span>
                
                {/* Progress indicator */}
                {progress && (
                  <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-emerald-600 font-bold">
                    {progress.score}%
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Info about Harakat */}
      <div className="mt-6 sm:mt-8 md:mt-10 border-2 rounded-lg sm:rounded-xl p-4 sm:p-6">
        <h2 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Apa yang akan kamu pelajari?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-lg">
            <span className="hijaiyah-letter-sm block">بَ</span>
            <span className="text-xs sm:text-sm font-medium">Fathah</span>
          </div>
          <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-lg">
            <span className="hijaiyah-letter-sm block">بِ</span>
            <span className="text-xs sm:text-sm font-medium">Kasrah</span>
          </div>
          <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-lg">
            <span className="hijaiyah-letter-sm block">بُ</span>
            <span className="text-xs sm:text-sm font-medium">Dhammah</span>
          </div>
          <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-lg">
            <span className="hijaiyah-letter-sm block">بْ</span>
            <span className="text-xs sm:text-sm font-medium">Sukun</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HijaiyahPage;
