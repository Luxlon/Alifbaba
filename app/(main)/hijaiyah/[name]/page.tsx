"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { HIJAIYAH_LETTERS, HARAKAT } from "@/constants";
import { MOCK_ALIF_CHALLENGES } from "@/lib/mock-data";
import { useUserProgress } from "@/store/use-user-progress";
import { useLessonProgress } from "@/store/use-lesson-progress";
import { checkChallengeAnswer, calculateChallengeXP, calculateLessonScore } from "@/lib/progress";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChallengeCard, ChallengeResult } from "@/components/challenge-card";
import { AudioPlayer } from "@/components/audio-player";
import { X, Heart, Star } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const HijaiyahLessonPage = () => {
  const params = useParams();
  const router = useRouter();
  const name = params?.name as string;

  // Find the letter
  const letter = HIJAIYAH_LETTERS.find((l) => l.name === name);

  // State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [attempts, setAttempts] = useState<Record<number, number>>({});

  // Stores
  const { hearts, xp, removeHearts, addXp, addPoints } = useUserProgress();
  const { getHijaiyahProgress, completeHijaiyahLesson } = useLessonProgress();

  // Get progress for this letter
  const progress = getHijaiyahProgress(name);

  // Mock challenges (in real app, this would come from database)
  const challenges = MOCK_ALIF_CHALLENGES;
  const currentChallenge = challenges[currentChallengeIndex];
  const progressPercentage = ((currentChallengeIndex + 1) / challenges.length) * 100;

  // Redirect if letter not found
  useEffect(() => {
    if (!letter) {
      router.push("/hijaiyah");
    }
  }, [letter, router]);

  if (!letter) return null;

  // Handle close (exit modal)
  const handleClose = () => {
    router.push("/hijaiyah");
  };

  // Handle start lesson
  const handleStartLesson = () => {
    setShowIntro(false);
  };

  // Handle option selection
  const handleSelectOption = (optionId: string) => {
    if (isChecking || showResult) return;

    const isMultiSelect = currentChallenge.type === "SELECT_ALL";

    if (isMultiSelect) {
      // Toggle for multi-select
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(prev => prev.filter(id => id !== optionId));
      } else {
        setSelectedOptions(prev => [...prev, optionId]);
      }
    } else {
      // Single select
      setSelectedOptions([optionId]);
    }
  };

  // Handle check answer
  const handleCheckAnswer = () => {
    if (selectedOptions.length === 0) return;

    setIsChecking(true);

    // Check if answer is correct
    const correct = checkChallengeAnswer(currentChallenge, selectedOptions);
    setIsCorrect(correct);

    // Track attempts for this challenge
    const currentAttempts = attempts[currentChallengeIndex] || 0;
    setAttempts(prev => ({
      ...prev,
      [currentChallengeIndex]: currentAttempts + 1,
    }));

    // Update score
    if (correct) {
      setCorrectAnswersCount(prev => prev + 1);
      
      // Calculate and add XP
      const isFirstTry = currentAttempts === 0;
      const xpEarned = calculateChallengeXP(correct, isFirstTry);
      addXp(xpEarned);

      if (isFirstTry) {
        toast.success(`+${xpEarned} XP`, {
          description: "Bonus XP untuk percobaan pertama!",
        });
      }
    } else {
      // Wrong answer - lose heart
      if (hearts > 0) {
        removeHearts(1);
        toast.error("Jawaban belum tepat", {
          description: "Kamu kehilangan 1 nyawa. Coba lagi!",
        });
      }
    }

    // Show result
    setShowResult(true);
    setIsChecking(false);
  };

  // Handle continue to next challenge
  const handleContinue = () => {
    setShowResult(false);
    setSelectedOptions([]);

    // Check if this was the last challenge
    if (currentChallengeIndex >= challenges.length - 1) {
      // Lesson complete!
      handleLessonComplete();
    } else {
      // Move to next challenge
      setCurrentChallengeIndex(prev => prev + 1);
    }
  };

  // Handle lesson completion
  const handleLessonComplete = () => {
    const score = calculateLessonScore(correctAnswersCount, challenges.length);
    const harakatMastered = HARAKAT.slice(0, 3).map((h) => h.id); // Mock: mastered first 3 harakat

    // Save progress
    completeHijaiyahLesson(name, letter.name, score, harakatMastered);

    // Add bonus points
    addPoints(20);

    // Navigate to result page
    router.push(`/hijaiyah/${name}/result?score=${score}`);
  };

  // Intro Screen
  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/hijaiyah">
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

          {/* Letter Display */}
          <div className="text-center mb-8">
            <div className="hijaiyah-letter text-[120px] mb-4">
              {letter.letter}
            </div>
            <h1 className="text-4xl font-bold mb-2">{letter.name}</h1>
            <p className="text-xl text-muted-foreground mb-4">
              {letter.transliteration}
            </p>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Pelajari cara membaca huruf {letter.name} dengan berbagai harakat
            </p>
          </div>

          {/* Harakat Examples */}
          <div className="bg-white rounded-xl border-2 p-6 mb-8">
            <h3 className="font-bold text-lg mb-4">Cara Membaca dengan Harakat</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {HARAKAT.slice(0, 6).map((h) => (
                <div
                  key={h.id}
                  className="border rounded-lg p-4 text-center hover:bg-emerald-50 transition"
                >
                  <div className="hijaiyah-letter-sm mb-2">
                    {letter.letter}
                    {h.symbol}
                  </div>
                  <div className="font-bold text-sm">{h.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {h.sound}
                  </div>
                  {letter.audioFile && (
                    <div className="mt-2 flex justify-center">
                      <AudioPlayer
                        audioUrl={letter.audioFile}
                        variant="inline"
                        size="sm"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Progress Info */}
          {progress && (
            <div className="bg-emerald-100 rounded-xl p-4 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold">Progress Sebelumnya</div>
                  <div className="text-sm text-muted-foreground">
                    Skor terbaik: {progress.score}% • {progress.attempts} percobaan
                  </div>
                </div>
                <div className="text-3xl font-bold text-emerald-600">
                  {progress.score}%
                </div>
              </div>
            </div>
          )}

          {/* Start Button */}
          <Button
            onClick={handleStartLesson}
            size="lg"
            variant="hijaiyah"
            className="w-full text-lg h-14"
          >
            {progress ? "Mulai Lagi" : "Mulai Belajar"}
          </Button>
        </div>
      </div>
    );
  }

  // Lesson Screen (Quiz)
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-5 w-5" />
          </Button>
          <div className="flex-1 mx-4">
            <Progress value={progressPercentage} className="h-3" />
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
            <span className="font-bold">{hearts}</span>
          </div>
        </div>

        {/* Challenge Content */}
        <div className="p-8">
          <ChallengeCard
            challenge={currentChallenge}
            selectedOptions={selectedOptions}
            onSelectOption={handleSelectOption}
            disabled={isChecking || showResult}
          />

          {/* Submit Button */}
          {!showResult && (
            <div className="max-w-2xl mx-auto mt-8">
              <Button
                onClick={handleCheckAnswer}
                disabled={selectedOptions.length === 0 || isChecking}
                size="lg"
                variant="hijaiyah"
                className="w-full text-lg h-14"
              >
                {isChecking ? "Memeriksa..." : "Cek Jawaban"}
              </Button>
            </div>
          )}

          {/* Result Feedback */}
          {showResult && (
            <ChallengeResult
              isCorrect={isCorrect}
              correctAnswers={
                !isCorrect
                  ? currentChallenge.options.filter(opt =>
                      currentChallenge.correctAnswers.includes(opt.id)
                    )
                  : undefined
              }
              onContinue={handleContinue}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HijaiyahLessonPage;
