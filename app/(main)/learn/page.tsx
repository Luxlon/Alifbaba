"use client";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useUserProgress } from "@/store/use-user-progress";
import { useLessonProgress } from "@/store/use-lesson-progress";
import { formatXP, formatPoints } from "@/lib/progress";
import { HIJAIYAH_LETTERS, PROPHET_STORIES, HADITH_LIST } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const LearnPage = () => {
  const { xp, hearts, points, streak, updateStreak } = useUserProgress();
  const { getTotalCompleted, isHijaiyahCompleted, isStoryCompleted, isHadithCompleted } = useLessonProgress();

  // Update streak on page load
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  const completed = getTotalCompleted();
  const hijaiyahProgress = Math.round((completed.hijaiyah / 28) * 100);
  const storyProgress = Math.round((completed.stories / 7) * 100);
  const hadithProgress = Math.round((completed.hadith / 8) * 100);

  // Find next lesson to continue
  const nextHijaiyah = HIJAIYAH_LETTERS.find((letter) => !isHijaiyahCompleted(letter.name));
  const nextStory = PROPHET_STORIES.find((story) => !isStoryCompleted(String(story.id)));
  const nextHadith = HADITH_LIST.find((hadith) => !isHadithCompleted(String(hadith.id)));

  // Determine what to continue based on least completed
  const getContinueSection = () => {
    if (!nextHijaiyah && !nextStory && !nextHadith) {
      return null; // All completed!
    }

    // Prioritize based on least progress
    const progressArray = [
      { type: "hijaiyah", progress: hijaiyahProgress, next: nextHijaiyah },
      { type: "story", progress: storyProgress, next: nextStory },
      { type: "hadith", progress: hadithProgress, next: nextHadith },
    ].filter((p) => p.next);

    progressArray.sort((a, b) => a.progress - b.progress);
    return progressArray[0];
  };

  const continueSection = getContinueSection();

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-4 lg:gap-[48px] px-3 sm:px-4 md:px-6">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <StickyWrapper>
          <div className="bg-emerald-500 text-white p-4 rounded-xl">
            <div className="flex items-center gap-x-2 mb-2">
              <Image src="/points.svg" alt="Points" width={24} height={24} />
              <span className="font-bold">{formatXP(xp)} XP</span>
            </div>
            <div className="flex items-center gap-x-2 mb-2">
              <Image src="/heart.svg" alt="Hearts" width={24} height={24} />
              <span className="font-bold">{hearts} Nyawa</span>
            </div>
            <div className="flex items-center gap-x-2">
              <Image src="/shop/points.svg" alt="Points" width={24} height={24} />
              <span className="font-bold">{formatPoints(points)} Poin</span>
            </div>
          </div>

          {streak > 0 && (
            <div className="bg-amber-500 text-white p-4 rounded-xl">
              <div className="flex items-center gap-x-2">
                <span className="text-2xl">🔥</span>
                <div>
                  <div className="font-bold">{streak} Hari Beruntun</div>
                  <div className="text-sm opacity-90">Pertahankan streak!</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="border-2 rounded-xl p-4 space-y-4">
            <h3 className="font-bold text-lg">Progress Belajar</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Hijaiyah</span>
                <span>{completed.hijaiyah}/28 ({hijaiyahProgress}%)</span>
              </div>
              <Progress value={hijaiyahProgress} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Kisah Nabi</span>
                <span>{completed.stories}/7 ({storyProgress}%)</span>
              </div>
              <Progress value={storyProgress} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Hadist</span>
                <span>{completed.hadith}/8 ({hadithProgress}%)</span>
              </div>
              <Progress value={hadithProgress} className="h-2" />
            </div>
          </div>
        </StickyWrapper>
      </div>
      
      <FeedWrapper>
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-700 mb-1 sm:mb-2">
            Selamat Datang di AlifBaBa! 👋
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Pilih materi yang ingin kamu pelajari hari ini
          </p>
        </div>

        {/* Mobile Stats Bar */}
        <div className="lg:hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-1">
                <span className="text-lg">⭐</span>
                <span className="font-bold text-sm sm:text-base">{formatXP(xp)} XP</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg">❤️</span>
                <span className="font-bold text-sm sm:text-base">{hearts}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg">💎</span>
                <span className="font-bold text-sm sm:text-base">{formatPoints(points)}</span>
              </div>
            </div>
            {streak > 0 && (
              <div className="flex items-center gap-1 bg-amber-500 px-2 py-1 rounded-full">
                <span className="text-base">🔥</span>
                <span className="font-bold text-sm">{streak}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Hijaiyah Card */}
          <Link href="/hijaiyah">
            <div className="border-2 border-emerald-200 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-emerald-50 transition cursor-pointer group active:scale-[0.98]">
              <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-full mb-3 sm:mb-4 group-hover:scale-110 transition">
                <span className="hijaiyah-letter-sm text-emerald-600">ا</span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-emerald-700 mb-1 sm:mb-2">Huruf Hijaiyah</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Pelajari 28 huruf hijaiyah dengan harakat
              </p>
              <div className="mt-3 sm:mt-4">
                <Progress value={hijaiyahProgress} className="h-1.5 sm:h-2" />
                <span className="text-[10px] sm:text-xs text-muted-foreground">{completed.hijaiyah}/28 huruf</span>
              </div>
            </div>
          </Link>

          {/* Kisah Nabi Card */}
          <Link href="/stories">
            <div className="border-2 border-amber-200 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-amber-50 transition cursor-pointer group active:scale-[0.98]">
              <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full mb-3 sm:mb-4 group-hover:scale-110 transition">
                <span className="text-xl sm:text-2xl">📖</span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-amber-700 mb-1 sm:mb-2">Kisah Nabi</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Tonton dan pelajari kisah para nabi
              </p>
              <div className="mt-3 sm:mt-4">
                <Progress value={storyProgress} className="h-1.5 sm:h-2" />
                <span className="text-[10px] sm:text-xs text-muted-foreground">{completed.stories}/7 kisah</span>
              </div>
            </div>
          </Link>

          {/* Hadist Card */}
          <Link href="/hadith">
            <div className="border-2 border-purple-200 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-purple-50 transition cursor-pointer group active:scale-[0.98]">
              <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full mb-3 sm:mb-4 group-hover:scale-110 transition">
                <span className="text-xl sm:text-2xl">📿</span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-purple-700 mb-1 sm:mb-2">Hadist</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Pelajari hadist-hadist pilihan untuk anak
              </p>
              <div className="mt-3 sm:mt-4">
                <Progress value={hadithProgress} className="h-1.5 sm:h-2" />
                <span className="text-[10px] sm:text-xs text-muted-foreground">{completed.hadith}/8 hadist</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Continue Learning Section */}
        <div className="mt-6 sm:mt-8 md:mt-10">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-700 mb-3 sm:mb-4">
            Lanjutkan Belajar
          </h2>
          
          {continueSection ? (
            <>
              {continueSection.type === "hijaiyah" && nextHijaiyah && (
                <Link href={`/hijaiyah/${nextHijaiyah.name}`}>
                  <div className="border-2 border-emerald-200 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:bg-emerald-50 transition cursor-pointer active:scale-[0.99]">
                    <div className="flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 bg-emerald-100 rounded-full flex-shrink-0">
                      <span className="text-xl sm:text-2xl">{nextHijaiyah.letter}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm sm:text-base">Huruf {nextHijaiyah.name} ({nextHijaiyah.letter})</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">Huruf ke-{nextHijaiyah.id} dari 28</p>
                    </div>
                    <Button variant="hijaiyah" className="text-xs sm:text-sm h-8 sm:h-10 px-3 sm:px-4">
                      Lanjut
                    </Button>
                  </div>
                </Link>
              )}
              
              {continueSection.type === "story" && nextStory && (
                <Link href={`/stories/${nextStory.id}`}>
                  <div className="border-2 border-amber-200 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:bg-amber-50 transition cursor-pointer active:scale-[0.99]">
                    <div className="flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 bg-amber-100 rounded-full flex-shrink-0">
                      <span className="text-xl sm:text-2xl">📖</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold">{nextStory.title}</h4>
                      <p className="text-sm text-muted-foreground">Kisah ke-{nextStory.id} dari 7</p>
                    </div>
                    <Button variant="story">
                      Tonton
                    </Button>
                  </div>
                </Link>
              )}
              
              {continueSection.type === "hadith" && nextHadith && (
                <Link href={`/hadith/${nextHadith.id}`}>
                  <div className="border-2 border-purple-200 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:bg-purple-50 transition cursor-pointer active:scale-[0.99]">
                    <div className="flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 bg-purple-100 rounded-full flex-shrink-0">
                      <span className="text-xl sm:text-2xl">📿</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm sm:text-base">{nextHadith.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">Hadist ke-{nextHadith.id} dari 8</p>
                    </div>
                    <Button variant="hadith" className="text-xs sm:text-sm h-8 sm:h-10 px-3 sm:px-4">
                      Pelajari
                    </Button>
                  </div>
                </Link>
              )}
            </>
          ) : (
            <div className="border-2 border-green-200 rounded-lg sm:rounded-xl p-4 sm:p-6 bg-green-50 text-center">
              <div className="text-3xl sm:text-4xl mb-1.5 sm:mb-2">🎉</div>
              <h4 className="font-bold text-green-700 mb-0.5 sm:mb-1 text-sm sm:text-base">Selamat!</h4>
              <p className="text-xs sm:text-sm text-green-600">
                Kamu sudah menyelesaikan semua materi! Terus berlatih untuk mempertahankan ilmu.
              </p>
            </div>
          )}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
