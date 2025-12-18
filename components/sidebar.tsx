"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <>
      {/* Desktop sidebar (visible on lg and up) */}
      <div className={cn(
        "hidden lg:flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className,
      )}>
        <Link href="/">
          <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
            <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
            <h1 className="text-2xl font-extrabold text-emerald-600 tracking-wide">
              AlifBaBa
            </h1>
          </div>
        </Link>
        <div className="flex flex-col gap-y-2 flex-1">
          <SidebarItem
            label="Belajar"
            href="/learn"
            iconSrc="/learn.svg"
          />
          <SidebarItem
            label="Hijaiyah"
            href="/hijaiyah"
            iconSrc="/hijaiyah.svg"
          />
          <SidebarItem
            label="Kisah Nabi"
            href="/stories"
            iconSrc="/stories.svg"
          />
          <SidebarItem
            label="Hadist"
            href="/hadith"
            iconSrc="/hadith.svg"
          />
          <SidebarItem
            label="Leaderboard"
            href="/leaderboard"
            iconSrc="/leaderboard.svg"
          />
          <SidebarItem
            label="Quest"
            href="/quests"
            iconSrc="/quests.svg"
          />
          <SidebarItem
            label="Toko"
            href="/shop"
            iconSrc="/shop.svg"
          />
          <div className="flex-1" />
          <SidebarItem
            label="Profil"
            href="/account"
            iconSrc="/profile.svg"
          />
        </div>
      </div>

      {/* Mobile bottom navbar (visible below lg) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 z-40">
        <div className="max-w-screen-lg mx-auto flex items-center justify-around px-2 py-2">
          <Link href="/learn" aria-label="Belajar" className="flex flex-col items-center text-slate-700 text-xs">
            <Image src="/learn.svg" alt="Belajar" width={24} height={24} />
            <span className="mt-1">Belajar</span>
          </Link>
          <Link href="/hijaiyah" aria-label="Hijaiyah" className="flex flex-col items-center text-slate-700 text-xs">
            <Image src="/hijaiyah.svg" alt="Hijaiyah" width={24} height={24} />
            <span className="mt-1">Hijaiyah</span>
          </Link>
          <Link href="/quests" aria-label="Quest" className="flex flex-col items-center text-slate-700 text-xs">
            <span className="text-xl">🎯</span>
            <span className="mt-1">Quest</span>
          </Link>
          <Link href="/leaderboard" aria-label="Ranking" className="flex flex-col items-center text-slate-700 text-xs">
            <Image src="/leaderboard.svg" alt="Ranking" width={24} height={24} />
            <span className="mt-1">Ranking</span>
          </Link>
          <Link href="/shop" aria-label="Toko" className="flex flex-col items-center text-slate-700 text-xs">
            <Image src="/shop.svg" alt="Toko" width={24} height={24} />
            <span className="mt-1">Toko</span>
          </Link>
          <Link href="/account" aria-label="Profil" className="flex flex-col items-center text-slate-700 text-xs">
            <span className="text-xl">👤</span>
            <span className="mt-1">Profil</span>
          </Link>
        </div>
      </nav>
    </>
  );
};
