"use client";

import Image from "next/image";
import Link from "next/link";
import { useUserProgress } from "@/store/use-user-progress";
import { useAuth } from "@/components/providers/auth-provider";
import { User } from "lucide-react";

export const MobileHeader = () => {
  const { hearts, points } = useUserProgress();
  const { profile } = useAuth();

  return (
    <nav className="lg:hidden px-3 sm:px-4 h-[44px] sm:h-[50px] flex items-center justify-between bg-emerald-500 border-b fixed top-0 w-full z-50">
      <Link href="/">
        <div className="flex items-center gap-x-1.5 sm:gap-x-2">
          <Image
            src="/mascot.svg"
            height={28}
            width={28}
            alt="Mascot"
            className="sm:h-8 sm:w-8"
          />
          <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-wide">
            AlifBaBa
          </h1>
        </div>
      </Link>

      <div className="flex items-center gap-x-2 sm:gap-x-3">
        {profile && (
          <Link
            href="/account"
            className="flex items-center gap-1 text-white mr-1"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white/20 rounded-full flex items-center justify-center">
              <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
            <span className="font-medium text-xs sm:text-sm max-w-[60px] truncate hidden xs:block">
              {profile.name.split(" ")[0]}
            </span>
          </Link>
        )}
        <div className="flex items-center gap-x-0.5 sm:gap-x-1 text-white">
          <span className="text-base sm:text-lg">❤️</span>
          <span className="font-semibold text-sm sm:text-base">{hearts}</span>
        </div>
        <div className="flex items-center gap-x-0.5 sm:gap-x-1 text-white">
          <span className="text-base sm:text-lg">💎</span>
          <span className="font-semibold text-sm sm:text-base">{points}</span>
        </div>
      </div>
    </nav>
  );
};
