"use client"

import Image from "next/image";
import Link from "next/link";
import { useUserProgress } from "@/store/use-user-progress";

export const MobileHeader = () => {
  const { hearts, points } = useUserProgress();

  return (
    <nav className="lg:hidden px-4 h-[50px] flex items-center justify-between bg-emerald-500 border-b fixed top-0 w-full z-50">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image src="/mascot.svg" height={32} width={32} alt="Mascot" />
          <h1 className="text-xl font-extrabold text-white tracking-wide">
            AlifBaBa
          </h1>
        </div>
      </Link>
      
      <div className="flex items-center gap-x-3">
        <div className="flex items-center gap-x-1 text-white">
          <span className="text-lg">❤️</span>
          <span className="font-semibold">{hearts}</span>
        </div>
        <div className="flex items-center gap-x-1 text-white">
          <span className="text-lg">💎</span>
          <span className="font-semibold">{points}</span>
        </div>
      </div>
    </nav>
  );
};
