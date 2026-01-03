"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface YouTubePlayerProps {
  videoId: string;
  title?: string;
  onVideoEnd?: () => void;
  autoplay?: boolean;
}

export const YouTubePlayer = ({
  videoId,
  title,
  onVideoEnd,
  autoplay = false,
}: YouTubePlayerProps) => {
  const [hasStarted, setHasStarted] = useState(false);

  // YouTube embed URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}?${
    autoplay ? "autoplay=1&" : ""
  }enablejsapi=1&rel=0&modestbranding=1`;

  const handlePlay = () => {
    setHasStarted(true);
  };

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
