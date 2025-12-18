"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export const RouteLoader = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Reset loading when route changes complete
    setIsLoading(false);
  }, [pathname, searchParams]);

  // Listen for route change start
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    // Listen to click events on links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      
      if (link && link.href && !link.target && !link.download) {
        const url = new URL(link.href);
        // Only show loader for internal navigation
        if (url.origin === window.location.origin && url.pathname !== pathname) {
          setIsLoading(true);
        }
      }
    };

    document.addEventListener("click", handleClick);
    
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-14 h-14 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-sm font-medium text-gray-600">Memuat...</p>
      </div>
    </div>
  );
};
