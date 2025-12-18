"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string;
  autoPlay?: boolean;
  variant?: "button" | "inline";
  size?: "sm" | "md" | "lg";
}

export const AudioPlayer = ({
  audioUrl,
  autoPlay = false,
  variant = "button",
  size = "md",
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
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
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      setHasError(true);
    }
  };

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
