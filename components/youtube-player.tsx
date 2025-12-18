"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward } from "lucide-react";

interface YouTubePlayerProps {
  videoId: string;
  title?: string;
  onVideoEnd?: () => void;
  onVideoProgress?: (progress: number) => void;
  autoplay?: boolean;
}

export const YouTubePlayer = ({
  videoId,
  title,
  onVideoEnd,
  onVideoProgress,
  autoplay = false,
}: YouTubePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  // YouTube embed URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}?${
    autoplay ? "autoplay=1&" : ""
  }enablejsapi=1&rel=0&modestbranding=1`;

  const handlePlay = () => {
    setIsPlaying(true);
    setHasStarted(true);
  };

  // Simulate video progress (real implementation would use YouTube API)
  useEffect(() => {
    if (isPlaying && progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = Math.min(prev + 1, 100);
          onVideoProgress?.(newProgress);
          if (newProgress >= 100) {
            onVideoEnd?.();
            setIsPlaying(false);
          }
          return newProgress;
        });
      }, 300); // Fast for demo, adjust for real video

      return () => clearInterval(interval);
    }
  }, [isPlaying, progress, onVideoEnd, onVideoProgress]);

  return (
    <div className="w-full">
      {/* Video Title */}
      {title && (
        <h2 className="text-xl font-bold mb-4">{title}</h2>
      )}

      {/* Video Container */}
      <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
        {!hasStarted ? (
          // Thumbnail with play button
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer group"
            onClick={handlePlay}
          >
            {/* YouTube Thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title || "Video thumbnail"}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                // Fallback to hqdefault if maxresdefault doesn't exist
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            
            {/* Play Button */}
            <div className="relative z-10 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition shadow-lg">
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </div>
          </div>
        ) : (
          // Embedded YouTube Player
          <iframe
            src={embedUrl}
            title={title || "YouTube video"}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* Progress Bar (simulated) */}
      {hasStarted && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Simple embed without custom controls
interface SimpleYouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
}

export const SimpleYouTubeEmbed = ({
  videoId,
  title,
  className = "",
}: SimpleYouTubeEmbedProps) => {
  return (
    <div className={`relative aspect-video rounded-xl overflow-hidden ${className}`}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title || "YouTube video"}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
