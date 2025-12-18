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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-xl">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Hadist Pilihan</h1>
                <p className="text-sm text-muted-foreground">
                  {completedCount}/{totalHadith} hadist dipelajari
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                <span className="font-bold">{hearts}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                <span className="font-bold">{xp}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white mb-8">
          <h2 className="text-lg font-semibold mb-2">Progres Belajar</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Progress
                value={progressPercentage}
                className="h-4 bg-purple-400"
              />
            </div>
            <span className="font-bold text-xl">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <p className="text-purple-100 text-sm mt-2">
            {completedCount === totalHadith
              ? "🎉 Semua hadist sudah dipelajari!"
              : `${totalHadith - completedCount} hadist lagi untuk menyelesaikan semua`}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <Button variant="hadith" size="sm" className="rounded-full">
            Semua
          </Button>
          <Button
            variant="hadithOutline"
            size="sm"
            className="rounded-full"
          >
            Akhlak
          </Button>
          <Button
            variant="hadithOutline"
            size="sm"
            className="rounded-full"
          >
            Iman
          </Button>
          <Button
            variant="hadithOutline"
            size="sm"
            className="rounded-full"
          >
            Keluarga
          </Button>
        </div>

        {/* Hadith List */}
        <div className="space-y-4">
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
                    relative p-6 rounded-2xl border-2 transition-all duration-300
                    ${
                      isCompleted
                        ? "bg-purple-50 border-purple-300"
                        : isLocked
                          ? "bg-gray-50 border-gray-200"
                          : "bg-white border-purple-200 hover:border-purple-400 hover:shadow-lg"
                    }
                  `}
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {isCompleted ? (
                      <div className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                        <CheckCircle2 className="h-4 w-4" />
                        Selesai
                      </div>
                    ) : isLocked ? (
                      <Lock className="h-5 w-5 text-gray-400" />
                    ) : (
                      <div className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                        <Play className="h-4 w-4" />
                        Mulai
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex items-start gap-4">
                    {/* Number Badge */}
                    <div
                      className={`
                        w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0
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
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-bold text-lg mb-2 ${isLocked ? "text-gray-400" : ""}`}
                      >
                        {hadith.title}
                      </h3>

                      {/* Arabic Text Preview */}
                      <p
                        className={`
                          text-2xl font-arabic mb-2 line-clamp-1
                          ${isLocked ? "text-gray-300" : "text-gray-700"}
                        `}
                        dir="rtl"
                      >
                        {hadith.arabicText}
                      </p>

                      {/* Translation Preview */}
                      <p
                        className={`
                          text-sm line-clamp-2 italic
                          ${isLocked ? "text-gray-300" : "text-muted-foreground"}
                        `}
                      >
                        "{hadith.translation}"
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 mt-3">
                        <span
                          className={`
                            text-xs px-2 py-1 rounded-full
                            ${isLocked ? "bg-gray-100 text-gray-400" : "bg-purple-100 text-purple-600"}
                          `}
                        >
                          {hadith.category}
                        </span>
                        <span
                          className={`
                            text-xs flex items-center gap-1
                            ${isLocked ? "text-gray-300" : "text-muted-foreground"}
                          `}
                        >
                          <Volume2 className="h-3 w-3" />
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
