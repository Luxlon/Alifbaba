"use client";

import { HADITH_LIST } from "@/constants";
import { useLessonProgress } from "@/store/use-lesson-progress";
import { useUserProgress } from "@/store/use-user-progress";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Lock,
  Star,
  Heart,
  Play,
  Volume2,
} from "lucide-react";

const HadithPage = () => {
  const { hearts, xp, points } = useUserProgress();
  const { isHadithCompleted, getHadithProgress, getTotalCompleted } =
    useLessonProgress();

  const completedCount = getTotalCompleted().hadith;
  const totalHadith = HADITH_LIST.length;
  const progressPercentage = (completedCount / totalHadith) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-16 sm:pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-purple-100 p-1.5 sm:p-2 rounded-lg sm:rounded-xl">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold">Hadist Pilihan</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {completedCount}/{totalHadith} hadist dipelajari
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 fill-red-500" />
                <span className="font-bold text-sm sm:text-base">{hearts}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 fill-amber-500" />
                <span className="font-bold text-sm sm:text-base">{xp}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">Progres Belajar</h2>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex-1">
              <Progress
                value={progressPercentage}
                className="h-3 sm:h-4 bg-purple-400"
              />
            </div>
            <span className="font-bold text-lg sm:text-xl">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <p className="text-purple-100 text-xs sm:text-sm mt-1.5 sm:mt-2">
            {completedCount === totalHadith
              ? "🎉 Semua hadist sudah dipelajari!"
              : `${totalHadith - completedCount} hadist lagi untuk menyelesaikan semua`}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6 flex-wrap">
          <Button variant="hadith" size="sm" className="rounded-full text-xs sm:text-sm h-7 sm:h-8 px-2.5 sm:px-3">
            Semua
          </Button>
          <Button
            variant="hadithOutline"
            size="sm"
            className="rounded-full text-xs sm:text-sm h-7 sm:h-8 px-2.5 sm:px-3"
          >
            Akhlak
          </Button>
          <Button
            variant="hadithOutline"
            size="sm"
            className="rounded-full text-xs sm:text-sm h-7 sm:h-8 px-2.5 sm:px-3"
          >
            Iman
          </Button>
          <Button
            variant="hadithOutline"
            size="sm"
            className="rounded-full text-xs sm:text-sm h-7 sm:h-8 px-2.5 sm:px-3"
          >
            Keluarga
          </Button>
        </div>

        {/* Hadith List */}
        <div className="space-y-3 sm:space-y-4">
          {HADITH_LIST.map((hadith, index) => {
            const isCompleted = isHadithCompleted(String(hadith.id));

            // First hadith is always unlocked, others need previous to be completed
            const previousCompleted =
              index === 0 || isHadithCompleted(String(HADITH_LIST[index - 1].id));
            const isLocked = !previousCompleted;

            return (
              <Link
                key={hadith.id}
                href={isLocked ? "#" : `/hadith/${hadith.id}`}
                className={`block ${isLocked ? "cursor-not-allowed" : ""}`}
              >
                <div
                  className={`
                    relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300
                    ${
                      isCompleted
                        ? "bg-purple-50 border-purple-300"
                        : isLocked
                          ? "bg-gray-50 border-gray-200"
                          : "bg-white border-purple-200 hover:border-purple-400 hover:shadow-lg active:scale-[0.99]"
                    }
                  `}
                >
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    {isCompleted ? (
                      <div className="flex items-center gap-1 sm:gap-2 bg-purple-100 text-purple-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                        <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Selesai</span>
                      </div>
                    ) : isLocked ? (
                      <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    ) : (
                      <div className="flex items-center gap-1 sm:gap-2 bg-purple-100 text-purple-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                        <Play className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Mulai</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex items-start gap-2.5 sm:gap-4">
                    {/* Number Badge */}
                    <div
                      className={`
                        w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-sm sm:text-lg flex-shrink-0
                        ${
                          isCompleted
                            ? "bg-purple-500 text-white"
                            : isLocked
                              ? "bg-gray-200 text-gray-400"
                              : "bg-purple-100 text-purple-600"
                        }
                      `}
                    >
                      {index + 1}
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0 pr-8 sm:pr-16">
                      <h3
                        className={`font-bold text-sm sm:text-lg mb-1 sm:mb-2 ${isLocked ? "text-gray-400" : ""}`}
                      >
                        {hadith.title}
                      </h3>

                      {/* Arabic Text Preview */}
                      <p
                        className={`
                          text-lg sm:text-2xl font-arabic mb-1 sm:mb-2 line-clamp-1
                          ${isLocked ? "text-gray-300" : "text-gray-700"}
                        `}
                        dir="rtl"
                      >
                        {hadith.arabicText}
                      </p>

                      {/* Translation Preview */}
                      <p
                        className={`
                          text-xs sm:text-sm line-clamp-2 italic
                          ${isLocked ? "text-gray-300" : "text-muted-foreground"}
                        `}
                      >
                        "{hadith.translation}"
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-3">
                        <span
                          className={`
                            text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full
                            ${isLocked ? "bg-gray-100 text-gray-400" : "bg-purple-100 text-purple-600"}
                          `}
                        >
                          {hadith.category}
                        </span>
                        <span
                          className={`
                            text-[10px] sm:text-xs flex items-center gap-1
                            ${isLocked ? "text-gray-300" : "text-muted-foreground"}
                          `}
                        >
                          <Volume2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          {hadith.narrator}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-10 bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
          <h3 className="font-bold text-purple-700 mb-2">💡 Tips</h3>
          <p className="text-sm text-purple-600">
            Dengarkan pengucapan hadist dalam bahasa Arab, lalu uji pemahamanmu dengan quiz singkat.
            Hafal hadist untuk mendapatkan XP bonus!
          </p>
        </div>
      </div>

      {/* Continue Button */}
      {completedCount < totalHadith && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <div className="max-w-4xl mx-auto">
            <Link href={`/hadith/${HADITH_LIST[completedCount]?.id || 1}`}>
              <Button variant="hadith" size="lg" className="w-full">
                Lanjut Belajar →
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HadithPage;
