"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { HIJAIYAH_LETTERS, HARAKAT } from "@/constants";
import { MOCK_ALIF_CHALLENGES } from "@/lib/mock-data";
import { useUserProgress } from "@/store/use-user-progress";
import { useLessonProgress } from "@/store/use-lesson-progress";
import { checkChallengeAnswer, calculateChallengeXP, calculateLessonScore } from "@/lib/progress";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChallengeCard, ChallengeResult } from "@/components/challenge-card";
import { AudioPlayer } from "@/components/audio-player";
import { X, Heart, Star, Volume2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const HijaiyahLessonPage = () => {
  const params = useParams();
  const router = useRouter();
  const name = params?.name as string;

  // Find the letter
  const letter = HIJAIYAH_LETTERS.find((l) => l.name === name);

  // Audio refs
  const mainAudioRef = useRef<HTMLAudioElement | null>(null);
  const harakatAudioRef = useRef<HTMLAudioElement | null>(null);

  // State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [attempts, setAttempts] = useState<Record<number, number>>({});
  const [isPlayingMain, setIsPlayingMain] = useState(false);
  const [playingHarakatId, setPlayingHarakatId] = useState<string | null>(null);

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

  // Play main letter audio
  const playMainAudio = () => {
    if (!letter.audioFile) return;
    
    // Stop any playing audio
    if (mainAudioRef.current) {
      mainAudioRef.current.pause();
      mainAudioRef.current.currentTime = 0;
    }
    if (harakatAudioRef.current) {
      harakatAudioRef.current.pause();
      harakatAudioRef.current.currentTime = 0;
    }
    setPlayingHarakatId(null);

    // Create and play new audio
    mainAudioRef.current = new Audio(letter.audioFile);
    mainAudioRef.current.onplay = () => setIsPlayingMain(true);
    mainAudioRef.current.onended = () => setIsPlayingMain(false);
    mainAudioRef.current.onerror = () => {
      setIsPlayingMain(false);
      toast.error("Audio tidak dapat diputar");
    };
    mainAudioRef.current.play().catch(() => {
      toast.error("Audio tidak tersedia");
    });
  };

  // Play harakat audio based on harakat type
  const playHarakatAudio = (harakatId: string) => {
    // Get the correct audio file based on harakat type
    let audioFile: string | undefined;
    
    if (harakatId === "fathah" || harakatId === "tanwin_fathah") {
      audioFile = letter.audioFathah;
    } else if (harakatId === "kasrah" || harakatId === "tanwin_kasrah") {
      audioFile = letter.audioKasrah;
    } else if (harakatId === "dhammah" || harakatId === "tanwin_dhammah") {
      audioFile = letter.audioDhammah;
    } else {
      // For sukun and tasydid, use main audio
      audioFile = letter.audioFile;
    }

    if (!audioFile) {
      toast.error("Audio tidak tersedia");
      return;
    }

    // Stop any playing audio
    if (mainAudioRef.current) {
      mainAudioRef.current.pause();
      mainAudioRef.current.currentTime = 0;
    }
    if (harakatAudioRef.current) {
      harakatAudioRef.current.pause();
      harakatAudioRef.current.currentTime = 0;
    }
    setIsPlayingMain(false);

    // Play the harakat-specific audio
    harakatAudioRef.current = new Audio(audioFile);
    harakatAudioRef.current.onplay = () => setPlayingHarakatId(harakatId);
    harakatAudioRef.current.onended = () => setPlayingHarakatId(null);
    harakatAudioRef.current.onerror = () => {
      setPlayingHarakatId(null);
      toast.error("Audio tidak dapat diputar");
    };
    harakatAudioRef.current.play().catch(() => {
      toast.error("Audio tidak tersedia");
    });
  };

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
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
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

          {/* Letter Display with Audio Button */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            {/* Clickable Letter Container */}
            <button
              onClick={playMainAudio}
              className={`group relative inline-block cursor-pointer transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-200 rounded-2xl sm:rounded-3xl p-3 sm:p-4 ${
                isPlayingMain ? "bg-emerald-100 scale-105" : "hover:bg-emerald-50"
              }`}
              title="Klik untuk mendengarkan pelafalan"
            >
              <div className="hijaiyah-letter mb-1 sm:mb-2">
                {letter.letter}
              </div>
              
              {/* Speaker Icon & CTA Indicator */}
              <div className={`flex items-center justify-center gap-1.5 sm:gap-2 ${
                isPlayingMain ? "text-emerald-600" : "text-emerald-500 group-hover:text-emerald-600"
              }`}>
                <Volume2 className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${isPlayingMain ? "animate-pulse" : ""}`} />
                <span className="text-xs sm:text-sm font-medium">
                  {isPlayingMain ? "Memutar..." : "Tekan untuk dengar"}
                </span>
              </div>

              {/* Pulse Animation Ring when playing */}
              {isPlayingMain && (
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-4 border-emerald-400 animate-ping opacity-30" />
              )}
            </button>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 mt-3 sm:mt-4">{letter.name}</h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-2 sm:mb-4">
              {letter.transliteration}
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 max-w-2xl mx-auto px-2">
              Pelajari cara membaca huruf {letter.name} dengan berbagai harakat
            </p>
          </div>

          {/* Harakat Examples with Interactive Audio */}
          <div className="bg-white rounded-lg sm:rounded-xl border-2 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8">
            <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-4">Cara Membaca dengan Harakat</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
              👆 Tekan setiap kotak untuk mendengarkan pelafalannya
            </p>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              {HARAKAT.map((h) => {
                const isPlaying = playingHarakatId === h.id;
                return (
                  <button
                    key={h.id}
                    onClick={() => playHarakatAudio(h.id)}
                    className={`border-2 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-200 touch-target ${
                      isPlaying
                        ? "border-emerald-500 bg-emerald-50 scale-105 shadow-lg"
                        : "border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-md active:scale-95"
                    }`}
                    title={`Tekan untuk mendengarkan ${letter.name} ${h.name}`}
                  >
                    <div className={`hijaiyah-letter-sm mb-1 sm:mb-2 transition-transform ${
                      isPlaying ? "scale-110" : ""
                    }`}>
                      {letter.letter}
                      {h.symbol}
                    </div>
                    <div className="font-bold text-xs sm:text-sm">{h.name}</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-1 sm:mb-2">
                      {h.sound}
                    </div>
                    
                    {/* Speaker Icon Indicator */}
                    <div className={`flex items-center justify-center gap-1 text-[10px] sm:text-xs ${
                      isPlaying ? "text-emerald-600" : "text-gray-400"
                    }`}>
                      <Volume2 className={`h-3 w-3 sm:h-4 sm:w-4 ${isPlaying ? "animate-pulse" : ""}`} />
                      <span>{isPlaying ? "Memutar" : "Tekan"}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress Info */}
          {progress && (
            <div className="bg-emerald-100 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 md:mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm sm:text-base">Progress Sebelumnya</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Skor terbaik: {progress.score}% • {progress.attempts} percobaan
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-600">
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
            className="w-full text-base sm:text-lg h-12 sm:h-14"
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
        <div className="flex items-center justify-between p-2 sm:p-3 md:p-4 border-b">
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <div className="flex-1 mx-2 sm:mx-4">
            <Progress value={progressPercentage} className="h-2 sm:h-3" />
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 fill-red-500" />
            <span className="font-bold text-sm sm:text-base">{hearts}</span>
          </div>
        </div>

        {/* Challenge Content */}
        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
          <ChallengeCard
            challenge={currentChallenge}
            selectedOptions={selectedOptions}
            onSelectOption={handleSelectOption}
            disabled={isChecking || showResult}
          />

          {/* Submit Button */}
          {!showResult && (
            <div className="max-w-2xl mx-auto mt-4 sm:mt-6 md:mt-8">
              <Button
                onClick={handleCheckAnswer}
                disabled={selectedOptions.length === 0 || isChecking}
                size="lg"
                variant="hijaiyah"
                className="w-full text-base sm:text-lg h-12 sm:h-14"
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
