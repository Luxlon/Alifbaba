"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HIJAIYAH_LETTERS } from "@/constants";
import { useUserProgress } from "@/store/use-user-progress";
import { useLessonProgress } from "@/store/use-lesson-progress";
import { getLessonCompletionMessage } from "@/lib/progress";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Star, Heart, Trophy, Repeat } from "lucide-react";
import Link from "next/link";

const HijaiyahResultPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const name = params?.name as string;
  const score = parseInt(searchParams?.get("score") || "0");

  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  const { xp, hearts, points } = useUserProgress();
  const { getHijaiyahProgress } = useLessonProgress();

  const letter = HIJAIYAH_LETTERS.find((l) => l.name === name);
  const progress = getHijaiyahProgress(name);
  const message = getLessonCompletionMessage(score);

  // Show confetti for good scores
  useEffect(() => {
    if (score >= 80) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [score]);

  if (!letter) {
    return null;
  }

  const isPassed = score >= 80;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Result Icon */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4 animate-bounce">
            {message.emoji}
          </div>
          <h1 className="text-4xl font-bold mb-2">{message.title}</h1>
          <p className="text-xl text-muted-foreground">{message.message}</p>
        </div>

        {/* Score Display */}
        <div className="bg-white rounded-2xl border-2 p-8 mb-6 shadow-lg">
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-emerald-600 mb-2">
              {score}%
            </div>
            <Progress value={score} className="h-4 mb-2" />
            <div className="text-sm text-muted-foreground">
              Skor untuk huruf {letter.name}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
              </div>
              <div className="font-bold text-2xl">{xp}</div>
              <div className="text-sm text-muted-foreground">Total XP</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="h-6 w-6 text-red-500 fill-red-500" />
              </div>
              <div className="font-bold text-2xl">{hearts}</div>
              <div className="text-sm text-muted-foreground">Nyawa</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="h-6 w-6 text-purple-500 fill-purple-500" />
              </div>
              <div className="font-bold text-2xl">{points}</div>
              <div className="text-sm text-muted-foreground">Poin</div>
            </div>
          </div>
        </div>

        {/* Progress Comparison */}
        {progress && progress.attempts > 1 && (
          <div className="bg-emerald-100 rounded-xl p-6 mb-6">
            <h3 className="font-bold mb-2">📊 Perbandingan Progress</h3>
            <div className="flex items-center justify-between text-sm">
              <div>
                <div className="text-muted-foreground">Skor Sebelumnya</div>
                <div className="font-bold text-lg">{progress.score}%</div>
              </div>
              <div className="text-3xl">→</div>
              <div>
                <div className="text-muted-foreground">Skor Sekarang</div>
                <div className="font-bold text-lg text-emerald-600">{score}%</div>
              </div>
            </div>
            {score > progress.score && (
              <div className="mt-2 text-sm font-medium text-emerald-700">
                🎉 Kamu meningkat {score - progress.score}%!
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          {!isPassed && (
            <Button
              onClick={() => router.push(`/hijaiyah/${name}`)}
              size="lg"
              variant="hijaiyah"
              className="w-full text-lg h-14"
            >
              <Repeat className="mr-2 h-5 w-5" />
              Ulangi Pelajaran
            </Button>
          )}

          <Link href="/hijaiyah">
            <Button
              size="lg"
              variant={isPassed ? "hijaiyah" : "primaryOutline"}
              className="w-full text-lg h-14"
            >
              {isPassed ? "Lanjut ke Huruf Selanjutnya" : "Kembali ke Daftar Huruf"}
            </Button>
          </Link>

          <Link href="/learn">
            <Button
              size="lg"
              variant="ghost"
              className="w-full text-lg h-14"
            >
              Kembali ke Beranda
            </Button>
          </Link>
        </div>

        {/* Encouragement Message */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          {isPassed
            ? "Bagus sekali! Terus tingkatkan kemampuanmu! 🌟"
            : "Jangan menyerah! Latihan membuat sempurna! 💪"}
        </div>
      </div>
    </div>
  );
};

export default HijaiyahResultPage;
