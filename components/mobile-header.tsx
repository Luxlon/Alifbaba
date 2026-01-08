"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUserProgress } from "@/store/use-user-progress";
import { useAuth } from "@/components/providers/auth-provider";
import { User, LogOut, BookOpen, Book, Users, ShoppingBag, Home, Trophy } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const navItems = [
  { label: "Belajar", href: "/learn", icon: Home },
  { label: "Hijaiyah", href: "/hijaiyah", icon: BookOpen },
  { label: "Kisah Nabi", href: "/stories", icon: Book },
  { label: "Hadist", href: "/hadith", icon: Book },
  { label: "Iqro", href: "/iqro", icon: BookOpen },
  { label: "Ranking", href: "/leaderboard", icon: Trophy },
  { label: "Toko", href: "/shop", icon: ShoppingBag },
];

export const MobileHeader = () => {
  const { hearts, points } = useUserProgress();
  const { profile, signOut } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {/* Top Header Bar */}
      <nav className="lg:hidden px-3 sm:px-4 h-[44px] sm:h-[50px] flex items-center justify-between bg-emerald-500 border-b fixed top-0 w-full z-50">
        {/* Left side - Logo */}
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

        {/* Right side - Stats & Profile */}
        <div className="flex items-center gap-x-2 sm:gap-x-3">
          {profile && (
            <Link
              href="/account"
              className="flex items-center gap-1 text-white mr-1"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white/20 rounded-full flex items-center justify-center">
                <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </div>
            </Link>
          )}
          <div className="flex items-center gap-x-0.5 sm:gap-x-1 text-white">
            <span className="text-base sm:text-lg">❤️</span>
            <span className="font-semibold text-sm sm:text-base">{isMounted ? hearts : "-"}</span>
          </div>
          <div className="flex items-center gap-x-0.5 sm:gap-x-1 text-white">
            <span className="text-base sm:text-lg">💎</span>
            <span className="font-semibold text-sm sm:text-base">{isMounted ? points : "-"}</span>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 z-50 safe-area-bottom">
        <div className="flex items-center justify-around px-1 py-2 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex flex-col items-center justify-center min-w-[48px] px-1 py-1
                  ${isActive 
                    ? "text-emerald-600" 
                    : "text-slate-600"
                  }
                `}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-emerald-600" : "text-slate-500"}`} />
                <span className={`text-[10px] mt-0.5 truncate ${isActive ? "font-semibold" : ""}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};
