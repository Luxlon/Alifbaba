"use client";

import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Spinner = ({ size = "md", className }: SpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-emerald-500 border-t-transparent",
        sizeClasses[size],
        className
      )}
    />
  );
};

interface PageLoaderProps {
  message?: string;
}

export const PageLoader = ({ message = "Memuat..." }: PageLoaderProps) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
      <Spinner size="lg" />
      <p className="text-neutral-500 text-sm animate-pulse">{message}</p>
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="border-2 rounded-xl p-4 sm:p-6 animate-pulse">
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-neutral-200 rounded-full mb-3 sm:mb-4" />
      <div className="h-5 bg-neutral-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-neutral-200 rounded w-full mb-3" />
      <div className="h-2 bg-neutral-200 rounded w-full" />
    </div>
  );
};

export const SkeletonList = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 animate-pulse">
          <div className="w-10 h-10 bg-neutral-200 rounded-full flex-shrink-0" />
          <div className="flex-1">
            <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-neutral-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const SkeletonText = ({ lines = 3 }: { lines?: number }) => {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-neutral-200 rounded"
          style={{ width: `${100 - i * 15}%` }}
        />
      ))}
    </div>
  );
};

export const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center animate-pulse">
          <span className="text-white text-4xl font-bold">ا</span>
        </div>
        <Spinner size="md" />
        <p className="text-neutral-500 text-sm">Memuat AlifBaBa...</p>
      </div>
    </div>
  );
};
