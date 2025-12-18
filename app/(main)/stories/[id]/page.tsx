"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PROPHET_STORIES } from "@/constants";
import { useUserProgress } from "@/store/use-user-progress";
import { useLessonProgress } from "@/store/use-lesson-progress";
import { YouTubePlayer } from "@/components/youtube-player";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, Heart, Star, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

type Phase = "video" | "quiz" | "result";

const StoryDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const storyId = params?.id as string;

  // Find the story
  const story = PROPHET_STORIES.find((s) => String(s.id) === storyId);

  // State
  const [phase, setPhase] = useState<Phase>("video");
  const [videoWatched, setVideoWatched] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  // Stores
  const { hearts, xp, removeHearts, addXp, addPoints } = useUserProgress();
  const { completeStoryLesson, getStoryProgress } = useLessonProgress();

  // Get progress
  const progress = getStoryProgress(storyId);

  // Redirect if story not found
  useEffect(() => {
    if (!story) {
      router.push("/stories");
    }
  }, [story, router]);

  if (!story) return null;

  const questions = story.quizQuestions;
  const currentQuestion = questions[currentQuestionIndex];
  const hasQuiz = questions.length > 0;
  const quizProgress = hasQuiz
    ? ((currentQuestionIndex + 1) / questions.length) * 100
    : 0;

  // Handle video end
  const handleVideoEnd = () => {
    setVideoWatched(true);
  };

  // Handle skip video (for demo/testing)
  const handleSkipVideo = () => {
    setVideoWatched(true);
    if (hasQuiz) {
      setPhase("quiz");
    } else {
      handleLessonComplete(100);
    }
  };

  // Handle answer selection
  const handleSelectAnswer = (index: number) => {
    if (isChecking || showResult) return;
    setSelectedAnswer(index);
  };

  // Handle check answer
  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;

    setIsChecking(true);

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
    setIsChecking(false);
  };

  // Handle continue to next question
  const handleContinue = () => {
    setShowResult(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex >= questions.length - 1) {
      // Quiz complete
      const score = Math.round((correctAnswersCount / questions.length) * 100);
      handleLessonComplete(score);
    } else {
      // Next question
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Handle lesson completion
  const handleLessonComplete = (score: number) => {
    completeStoryLesson(storyId, story.title, score, true);
    addPoints(25);
    addXp(50);
    setPhase("result");
  };

  // Handle close
  const handleClose = () => {
    router.push("/stories");
  };

  // Video Phase
  if (phase === "video") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <Link href="/stories">
              <Button variant="ghost" size="sm">
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 fill-red-500" />
                <span className="font-bold text-sm sm:text-base">{hearts}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 fill-amber-500" />
                <span className="font-bold text-sm sm:text-base">{xp} XP</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{story.title}</h1>
            <p className="text-sm sm:text-base text-muted-foreground">{story.description}</p>
          </div>

          {/* Video Player */}
          <YouTubePlayer
            videoId={story.youtubeId}
            title={story.title}
            onVideoEnd={handleVideoEnd}
          />

          {/* Action Button - Always show */}
          {hasQuiz && (
            <div className="mt-4 sm:mt-6 md:mt-8 flex justify-center">
              <Button 
                variant="story" 
                size="lg"
                onClick={() => setPhase("quiz")}
                className="text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
              >
                🎯 Lanjut ke Quiz
              </Button>
            </div>
          )}

          {/* Info - Only show before video watched */}
          {!videoWatched && (
            <div className="mt-4 sm:mt-6 md:mt-8 bg-amber-100 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
              <p className="text-xs sm:text-sm text-amber-800">
                {hasQuiz
                  ? `📝 Tonton video, lalu jawab ${questions.length} pertanyaan untuk mendapat XP!`
                  : "📺 Tonton video sampai selesai untuk menyelesaikan kisah ini!"}
              </p>
            </div>
          )}
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
          <div className="flex items-center justify-between p-2 sm:p-3 md:p-4 border-b">
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <div className="flex-1 mx-2 sm:mx-4">
              <Progress value={quizProgress} className="h-2 sm:h-3" />
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 fill-red-500" />
              <span className="font-bold text-sm sm:text-base">{hearts}</span>
            </div>
          </div>

          {/* Quiz Content */}
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
              {/* Question */}
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">
                {currentQuestion.question}
              </h2>

              {/* Options */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 md:mb-8">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  let optionStyle = "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50";

                  if (showResult) {
                    if (index === currentQuestion.correctAnswer) {
                      optionStyle = "border-emerald-500 bg-emerald-50";
                    } else if (isSelected && !isCorrect) {
                      optionStyle = "border-red-500 bg-red-50";
                    }
                  } else if (isSelected) {
                    optionStyle = "border-amber-500 bg-amber-50 shadow-md";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectAnswer(index)}
                      disabled={showResult}
                      className={`
                        w-full p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border-2 text-left transition-all active:scale-[0.98]
                        ${optionStyle}
                        ${showResult ? "cursor-default" : ""}
                      `}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                        {/* Selection Indicator */}
                        <div
                          className={`
                            w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs sm:text-sm md:text-base flex-shrink-0
                            ${
                              isSelected
                                ? "border-amber-500 bg-amber-500 text-white"
                                : "border-gray-300 text-gray-400"
                            }
                            ${
                              showResult && index === currentQuestion.correctAnswer
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

                        {/* Option Text */}
                        <span className="text-sm sm:text-base md:text-lg font-medium flex-1">
                          {option}
                        </span>

                        {/* Result Icon */}
                        {showResult && index === currentQuestion.correctAnswer && (
                          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 flex-shrink-0" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0" />
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
                  disabled={selectedAnswer === null || isChecking}
                  size="lg"
                  variant="story"
                  className="w-full text-base sm:text-lg h-12 sm:h-14"
                >
                  {isChecking ? "Memeriksa..." : "Cek Jawaban"}
                </Button>
              ) : (
                <Button
                  onClick={handleContinue}
                  size="lg"
                  variant={isCorrect ? "story" : "danger"}
                  className="w-full text-base sm:text-lg h-12 sm:h-14"
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
    const score = hasQuiz
      ? Math.round((correctAnswersCount / questions.length) * 100)
      : 100;
    const isPassed = score >= 60;

    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
          {/* Result Icon */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <div className="text-5xl sm:text-6xl md:text-8xl mb-2 sm:mb-4 animate-bounce">
              {isPassed ? "🎉" : "💪"}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
              {isPassed ? "Selesai!" : "Tetap Semangat!"}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
              {isPassed
                ? `Kamu berhasil menyelesaikan ${story.title}!`
                : "Coba lagi untuk hasil yang lebih baik!"}
            </p>
          </div>

          {/* Score Display */}
          <div className="bg-white rounded-xl sm:rounded-2xl border-2 p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 shadow-lg">
            <div className="text-center mb-4 sm:mb-6">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-amber-600 mb-1 sm:mb-2">
                {score}%
              </div>
              <Progress value={score} className="h-3 sm:h-4 mb-1 sm:mb-2" />
              <div className="text-xs sm:text-sm text-muted-foreground">
                {hasQuiz
                  ? `${correctAnswersCount}/${questions.length} jawaban benar`
                  : "Video selesai ditonton"}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-amber-500 fill-amber-500" />
                </div>
                <div className="font-bold text-lg sm:text-xl md:text-2xl">+{hasQuiz ? 50 + correctAnswersCount * 10 : 50}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">XP</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <span className="text-lg sm:text-xl md:text-2xl">🪙</span>
                </div>
                <div className="font-bold text-lg sm:text-xl md:text-2xl">+25</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Poin</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <span className="text-lg sm:text-xl md:text-2xl">📖</span>
                </div>
                <div className="font-bold text-lg sm:text-xl md:text-2xl">1</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Kisah</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 sm:space-y-3">
            <Link href="/stories">
              <Button size="lg" variant="story" className="w-full text-base sm:text-lg h-12 sm:h-14">
                Lanjut ke Kisah Berikutnya
              </Button>
            </Link>

            <Link href={`/stories/${storyId}`}>
              <Button
                size="lg"
                variant="storyOutline"
                className="w-full text-base sm:text-lg h-12 sm:h-14"
              >
                Tonton Ulang
              </Button>
            </Link>

            <Link href="/learn">
              <Button size="lg" variant="ghost" className="w-full text-base sm:text-lg h-12 sm:h-14">
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

export default StoryDetailPage;
