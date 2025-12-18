"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { HADITH_LIST } from "@/constants";
import { useUserProgress } from "@/store/use-user-progress";
import { useLessonProgress } from "@/store/use-lesson-progress";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  X,
  Heart,
  Star,
  Volume2,
  Pause,
  Play,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

type Phase = "intro" | "listening" | "quiz" | "result";

// Quiz questions for hadith
const generateQuizQuestions = (hadith: (typeof HADITH_LIST)[0]) => {
  // Generate simple understanding questions
  return [
    {
      question: `Hadist "${hadith.title}" diriwayatkan oleh?`,
      options: [
        "HR. Bukhari",
        "HR. Muslim",
        hadith.narrator,
        "HR. Abu Dawud",
      ].filter((v, i, a) => a.indexOf(v) === i).slice(0, 4),
      correctAnswer: hadith.narrator,
    },
    {
      question: `Apa kategori dari hadist ini?`,
      options: ["Akhlak", "Iman", "Keluarga", "Ibadah"],
      correctAnswer: hadith.category,
    },
  ];
};

const HadithDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const hadithId = params?.id as string;

  // Find the hadith
  const hadith = HADITH_LIST.find((h) => String(h.id) === hadithId);

  // State
  const [phase, setPhase] = useState<Phase>("intro");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [listenedCount, setListenedCount] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  // Audio ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stores
  const { hearts, xp, removeHearts, addXp, addPoints } = useUserProgress();
  const { completeHadithLesson } = useLessonProgress();

  // Redirect if hadith not found
  useEffect(() => {
    if (!hadith) {
      router.push("/hadith");
    }
  }, [hadith, router]);

  if (!hadith) return null;

  const quizQuestions = generateQuizQuestions(hadith);
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const quizProgress =
    ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  // Audio handlers
  const handlePlayPause = () => {
    if (!audioRef.current) {
      // Create audio element if it doesn't exist
      audioRef.current = new Audio(hadith.audioFile);

      audioRef.current.addEventListener("timeupdate", () => {
        if (audioRef.current) {
          const progress =
            (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setAudioProgress(progress);
        }
      });

      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        setListenedCount((prev) => prev + 1);
        setAudioProgress(0);
        toast.success("Audio selesai!", {
          description: "Dengarkan lagi atau lanjut ke quiz.",
        });
      });

      audioRef.current.addEventListener("error", () => {
        // Fallback for demo - simulate audio playback
        simulateAudioPlayback();
      });
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        // Fallback for demo
        simulateAudioPlayback();
      });
      setIsPlaying(true);
    }
  };

  // Simulate audio playback for demo
  const simulateAudioPlayback = () => {
    setIsPlaying(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setAudioProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsPlaying(false);
        setListenedCount((prev) => prev + 1);
        setAudioProgress(0);
        toast.success("Audio selesai!", {
          description: "Dengarkan lagi atau lanjut ke quiz.",
        });
      }
    }, 100);
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setAudioProgress(0);
    }
  };

  // Quiz handlers
  const handleSelectAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setCorrectAnswersCount((prev) => prev + 1);
      addXp(10);
      toast.success("+10 XP", {
        description: "Jawaban benar!",
      });
    } else {
      if (hearts > 0) {
        removeHearts(1);
        toast.error("Jawaban kurang tepat", {
          description: "Kamu kehilangan 1 nyawa.",
        });
      }
    }

    setShowResult(true);
  };

  const handleContinue = () => {
    setShowResult(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex >= quizQuestions.length - 1) {
      // Quiz complete
      const score = Math.round(
        (correctAnswersCount / quizQuestions.length) * 100
      );
      handleLessonComplete(score);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Handle lesson completion
  const handleLessonComplete = (score: number) => {
    completeHadithLesson(hadithId, hadith.title, score, true, false);
    addPoints(20);
    addXp(40);
    setPhase("result");
  };

  // Handle close
  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    router.push("/hadith");
  };

  // Intro Phase
  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/hadith">
              <Button variant="ghost" size="sm">
                <X className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                <span className="font-bold">{hearts}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                <span className="font-bold">{xp} XP</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📿</div>
            <h1 className="text-3xl font-bold mb-2">{hadith.title}</h1>
            <p className="text-muted-foreground">{hadith.narrator}</p>
          </div>

          {/* Hadith Card */}
          <div className="bg-white rounded-2xl border-2 p-8 mb-8 shadow-lg">
            {/* Arabic Text */}
            <div className="bg-purple-50 rounded-xl p-6 mb-6 text-center">
              <p
                className="text-3xl font-arabic leading-loose text-gray-800"
                dir="rtl"
              >
                {hadith.arabicText}
              </p>
            </div>

            {/* Translation */}
            <p className="text-lg text-center text-muted-foreground italic">
              "{hadith.translation}"
            </p>

            {/* Category Badge */}
            <div className="flex justify-center mt-6">
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                {hadith.category}
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-purple-100 rounded-xl p-4 mb-8 text-center">
            <p className="text-sm text-purple-800">
              👂 Dengarkan pengucapan hadist, lalu jawab quiz untuk mendapat XP!
            </p>
          </div>

          {/* Start Button */}
          <Button
            variant="hadith"
            size="lg"
            className="w-full text-lg h-14"
            onClick={() => setPhase("listening")}
          >
            Mulai Belajar →
          </Button>
        </div>
      </div>
    );
  }

  // Listening Phase
  if (phase === "listening") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-5 w-5" />
            </Button>
            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                Dengarkan {listenedCount > 0 ? `(${listenedCount}x)` : ""}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500 fill-red-500" />
              <span className="font-bold">{hearts}</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">{hadith.title}</h2>
            <p className="text-muted-foreground">{hadith.narrator}</p>
          </div>

          {/* Hadith Card */}
          <div className="bg-white rounded-2xl border-2 p-8 mb-8 shadow-lg">
            {/* Arabic Text */}
            <div className="bg-purple-50 rounded-xl p-6 mb-6 text-center">
              <p
                className="text-3xl font-arabic leading-loose text-gray-800"
                dir="rtl"
              >
                {hadith.arabicText}
              </p>
            </div>

            {/* Translation */}
            <p className="text-lg text-center text-muted-foreground italic">
              "{hadith.translation}"
            </p>
          </div>

          {/* Audio Player */}
          <div className="bg-white rounded-2xl border-2 p-6 mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRestart}
                disabled={!isPlaying && audioProgress === 0}
              >
                <RotateCcw className="h-5 w-5" />
              </Button>

              <button
                onClick={handlePlayPause}
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center transition-all
                  ${isPlaying ? "bg-purple-100 text-purple-600" : "bg-purple-500 text-white"}
                `}
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8 ml-1" />
                )}
              </button>

              <div className="w-10"></div>
            </div>

            {/* Progress Bar */}
            <Progress value={audioProgress} className="h-2" />

            <p className="text-center text-sm text-muted-foreground mt-2">
              {isPlaying
                ? "Sedang memutar..."
                : listenedCount > 0
                  ? "Tekan untuk putar ulang"
                  : "Tekan untuk memutar"}
            </p>
          </div>

          {/* Continue Button */}
          <Button
            variant="hadith"
            size="lg"
            className="w-full text-lg h-14"
            onClick={() => setPhase("quiz")}
            disabled={listenedCount === 0}
          >
            {listenedCount === 0
              ? "Dengarkan hadist terlebih dahulu"
              : "Lanjut ke Quiz →"}
          </Button>
        </div>
      </div>
    );
  }

  // Quiz Phase
  if (phase === "quiz" && currentQuestion) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-5 w-5" />
            </Button>
            <div className="flex-1 mx-4">
              <Progress value={quizProgress} className="h-3" />
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500 fill-red-500" />
              <span className="font-bold">{hearts}</span>
            </div>
          </div>

          {/* Quiz Content */}
          <div className="p-8">
            <div className="max-w-2xl mx-auto">
              {/* Question */}
              <h2 className="text-2xl font-bold mb-8 text-center">
                {currentQuestion.question}
              </h2>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  let optionStyle =
                    "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50";

                  if (showResult) {
                    if (option === currentQuestion.correctAnswer) {
                      optionStyle = "border-emerald-500 bg-emerald-50";
                    } else if (isSelected && !isCorrect) {
                      optionStyle = "border-red-500 bg-red-50";
                    }
                  } else if (isSelected) {
                    optionStyle = "border-purple-500 bg-purple-50 shadow-md";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectAnswer(option)}
                      disabled={showResult}
                      className={`
                        w-full p-6 rounded-xl border-2 text-left transition-all
                        ${optionStyle}
                        ${showResult ? "cursor-default" : ""}
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`
                            w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold
                            ${
                              isSelected
                                ? "border-purple-500 bg-purple-500 text-white"
                                : "border-gray-300 text-gray-400"
                            }
                            ${
                              showResult &&
                              option === currentQuestion.correctAnswer
                                ? "border-emerald-500 bg-emerald-500 text-white"
                                : ""
                            }
                            ${
                              showResult && isSelected && !isCorrect
                                ? "border-red-500 bg-red-500 text-white"
                                : ""
                            }
                          `}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>

                        <span className="text-lg font-medium flex-1">
                          {option}
                        </span>

                        {showResult &&
                          option === currentQuestion.correctAnswer && (
                            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                          )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Submit Button */}
              {!showResult ? (
                <Button
                  onClick={handleCheckAnswer}
                  disabled={selectedAnswer === null}
                  size="lg"
                  variant="hadith"
                  className="w-full text-lg h-14"
                >
                  Cek Jawaban
                </Button>
              ) : (
                <Button
                  onClick={handleContinue}
                  size="lg"
                  variant={isCorrect ? "hadith" : "danger"}
                  className="w-full text-lg h-14"
                >
                  Lanjut
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Result Phase
  if (phase === "result") {
    const score = Math.round(
      (correctAnswersCount / quizQuestions.length) * 100
    );
    const isPassed = score >= 50;

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Result Icon */}
          <div className="text-center mb-8">
            <div className="text-8xl mb-4 animate-bounce">
              {isPassed ? "🎉" : "💪"}
            </div>
            <h1 className="text-4xl font-bold mb-2">
              {isPassed ? "Hebat!" : "Tetap Semangat!"}
            </h1>
            <p className="text-xl text-muted-foreground">
              {isPassed
                ? `Kamu berhasil mempelajari hadist "${hadith.title}"!`
                : "Coba lagi untuk hasil yang lebih baik!"}
            </p>
          </div>

          {/* Score Display */}
          <div className="bg-white rounded-2xl border-2 p-8 mb-6 shadow-lg">
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-purple-600 mb-2">
                {score}%
              </div>
              <Progress value={score} className="h-4 mb-2" />
              <div className="text-sm text-muted-foreground">
                {correctAnswersCount}/{quizQuestions.length} jawaban benar
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
                </div>
                <div className="font-bold text-2xl">
                  +{40 + correctAnswersCount * 10}
                </div>
                <div className="text-sm text-muted-foreground">XP</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">🪙</span>
                </div>
                <div className="font-bold text-2xl">+20</div>
                <div className="text-sm text-muted-foreground">Poin</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">📿</span>
                </div>
                <div className="font-bold text-2xl">1</div>
                <div className="text-sm text-muted-foreground">Hadist</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link href="/hadith">
              <Button
                size="lg"
                variant="hadith"
                className="w-full text-lg h-14"
              >
                Lanjut ke Hadist Berikutnya
              </Button>
            </Link>

            <Link href={`/hadith/${hadithId}`}>
              <Button
                size="lg"
                variant="hadithOutline"
                className="w-full text-lg h-14"
              >
                Pelajari Ulang
              </Button>
            </Link>

            <Link href="/learn">
              <Button size="lg" variant="ghost" className="w-full text-lg h-14">
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default HadithDetailPage;
