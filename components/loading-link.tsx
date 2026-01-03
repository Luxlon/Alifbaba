"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";

interface LoadingLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const LoadingLink = ({ 
  href, 
  children, 
  className = "",
  onClick 
}: LoadingLinkProps) => {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (pathname !== href) {
      setIsNavigating(true);
      startTransition(() => {
        // This will naturally complete when navigation finishes
      });
    }
    onClick?.();
  };

  // Reset when pathname changes
  if (isNavigating && pathname === href) {
    setIsNavigating(false);
  }

  return (
    <Link 
      href={href} 
      className={`relative ${className}`}
      onClick={handleClick}
    >
      {isNavigating && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-lg z-10">
          <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
        </div>
      )}
      {children}
    </Link>
  );
};
