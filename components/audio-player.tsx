"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Gauge } from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string;
  autoPlay?: boolean;
  variant?: "button" | "inline" | "full";
  size?: "sm" | "md" | "lg";
  showSpeedControl?: boolean;
}

export const AudioPlayer = ({
  audioUrl,
  autoPlay = false,
  variant = "button",
  size = "md",
  showSpeedControl = false,
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    // Event listeners
    audio.addEventListener("ended", () => setIsPlaying(false));
    audio.addEventListener("error", () => {
      setHasError(true);
      setIsPlaying(false);
    });

    // Auto play if requested
    if (autoPlay) {
      handlePlay();
    }

    // Cleanup
    return () => {
      audio.pause();
      audio.removeEventListener("ended", () => setIsPlaying(false));
      audio.removeEventListener("error", () => setHasError(true));
    };
  }, [audioUrl, autoPlay]);

  const handlePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        audioRef.current.playbackRate = playbackRate;
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      setHasError(true);
    }
  };

  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
    setShowSpeedMenu(false);
  };

  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
    setShowSpeedMenu(false);
  };

  // Full variant with speed controls
  if (variant === "full") {
    return (
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Main Play Button */}
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <Button
            onClick={handlePlay}
            disabled={hasError}
            size="lg"
            variant="secondary"
            className="rounded-full w-16 h-16 sm:w-20 sm:h-20 text-3xl sm:text-4xl shadow-lg hover:shadow-xl transition-all"
          >
            {hasError ? "❌" : isPlaying ? "⏸️" : "▶️"}
          </Button>
        </div>

        {/* Speed Controls */}
        {showSpeedControl && (
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Gauge className="h-4 w-4" />
              <span className="hidden sm:inline">Kecepatan:</span>
            </div>
            <div className="flex gap-1.5 sm:gap-2">
              <button
                onClick={() => handleSpeedChange(0.25)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg font-medium transition ${
                  playbackRate === 0.25
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                0.25x
              </button>
              <button
                onClick={() => handleSpeedChange(0.5)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg font-medium transition ${
                  playbackRate === 0.5
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                0.5x
              </button>
              <button
                onClick={() => handleSpeedChange(0.75)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg font-medium transition ${
                  playbackRate === 0.75
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                0.75x
              </button>
              <button
                onClick={() => handleSpeedChange(1.0)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg font-medium transition ${
                  playbackRate === 1.0
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Normal
              </button>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            {hasError
              ? "⚠️ Gagal memuat audio"
              : isPlaying
              ? `🔊 Memutar (${playbackRate}x)`
              : "Tekan tombol untuk mendengarkan"}
          </p>
        </div>
      </div>
    );
  }

  // Button variant (round play button)
  if (variant === "button") {
    const sizeClasses = {
      sm: "w-12 h-12 text-2xl",
      md: "w-20 h-20 text-4xl",
      lg: "w-32 h-32 text-6xl",
    };

    return (
      <Button
        onClick={handlePlay}
        disabled={hasError}
        size="lg"
        variant="primaryOutline"
        className={`rounded-full ${sizeClasses[size]} ${
          isPlaying ? "animate-pulse bg-emerald-50" : ""
        }`}
      >
        {hasError ? "❌" : isPlaying ? "🔊" : "🔊"}
      </Button>
    );
  }

  // Inline variant (icon button)
  return (
    <button
      onClick={handlePlay}
      disabled={hasError}
      className={`
        p-2 rounded-full hover:bg-gray-100 transition
        ${isPlaying ? "bg-emerald-100" : ""}
        ${hasError ? "opacity-50 cursor-not-allowed" : ""}
      `}
      title={isPlaying ? "Berhenti" : "Putar"}
    >
      {isPlaying ? (
        <Volume2 className="h-5 w-5 text-emerald-600" />
      ) : (
        <VolumeX className="h-5 w-5 text-gray-600" />
      )}
    </button>
  );
};

// Simple audio player with play/pause
export const SimpleAudioPlayer = ({ audioUrl }: { audioUrl: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleToggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={handleToggle}
      className="text-2xl hover:scale-110 transition"
    >
      {isPlaying ? "⏸️" : "▶️"}
    </button>
  );
};
