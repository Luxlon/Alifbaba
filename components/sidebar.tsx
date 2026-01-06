"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SidebarItem } from "./sidebar-item";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { LogOut, User, Loader2 } from "lucide-react";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  const router = useRouter();
  const { user, profile, isLoading, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <>
      {/* Desktop sidebar (visible on lg and up) */}
      <div
        className={cn(
          "hidden lg:flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
          className
        )}
      >
        <Link href="/">
          <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
            <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
            <h1 className="text-2xl font-extrabold text-emerald-600 tracking-wide">
              AlifBaBa
            </h1>
          </div>
        </Link>
        <div className="flex flex-col gap-y-2 flex-1">
          <SidebarItem label="Belajar" href="/learn" iconSrc="/learn.svg" />
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
          <SidebarItem label="Hadist" href="/hadith" iconSrc="/hadith.svg" />
          <SidebarItem label="Iqro" href="/iqro" iconSrc="/iqro.svg" />
          <SidebarItem
            label="Leaderboard"
            href="/leaderboard"
            iconSrc="/leaderboard.svg"
          />
          <SidebarItem label="Quest" href="/quests" iconSrc="/quests.svg" />
          <SidebarItem label="Toko" href="/shop" iconSrc="/shop.svg" />
          <div className="flex-1" />

          {/* User Profile Section */}
          {isLoading ? (
            <div className="flex items-center gap-3 px-4 py-3">
              <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
              <span className="text-sm text-neutral-500">Memuat...</span>
            </div>
          ) : user && profile ? (
            <div className="border-t pt-4 mt-2">
              {/* Profile Link */}
              <Link href="/account">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-emerald-50 transition cursor-pointer group">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition">
                    <User className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-neutral-800 truncate text-sm">
                      {profile.name}
                    </p>
                    <p className="text-xs text-neutral-500 truncate">
                      {profile.role === "teacher" ? "Pengajar" : "Siswa"}
                    </p>
                  </div>
                </div>
              </Link>

              {/* Logout Button */}
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 mt-1"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Keluar
              </Button>
            </div>
          ) : (
            <div className="border-t pt-4 mt-2">
              <Link href="/login">
                <Button variant="secondary" className="w-full">
                  Masuk
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom navbar (visible below lg) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 z-40">
        <div className="max-w-screen-lg mx-auto flex items-center justify-around px-2 py-2">
          <Link
            href="/learn"
            aria-label="Belajar"
            className="flex flex-col items-center text-slate-700 text-xs"
          >
            <Image src="/learn.svg" alt="Belajar" width={24} height={24} />
            <span className="mt-1">Belajar</span>
          </Link>
          <Link
            href="/hijaiyah"
            aria-label="Hijaiyah"
            className="flex flex-col items-center text-slate-700 text-xs"
          >
            <Image src="/hijaiyah.svg" alt="Hijaiyah" width={24} height={24} />
            <span className="mt-1">Hijaiyah</span>
          </Link>
          <Link
            href="/quests"
            aria-label="Quest"
            className="flex flex-col items-center text-slate-700 text-xs"
          >
            <span className="text-xl">🎯</span>
            <span className="mt-1">Quest</span>
          </Link>
          <Link
            href="/leaderboard"
            aria-label="Ranking"
            className="flex flex-col items-center text-slate-700 text-xs"
          >
            <Image
              src="/leaderboard.svg"
              alt="Ranking"
              width={24}
              height={24}
            />
            <span className="mt-1">Ranking</span>
          </Link>
          <Link
            href="/shop"
            aria-label="Toko"
            className="flex flex-col items-center text-slate-700 text-xs"
          >
            <Image src="/shop.svg" alt="Toko" width={24} height={24} />
            <span className="mt-1">Toko</span>
          </Link>
          <Link
            href="/account"
            aria-label="Profil"
            className="flex flex-col items-center text-slate-700 text-xs"
          >
            <span className="text-xl">👤</span>
            <span className="mt-1">Profil</span>
          </Link>
        </div>
      </nav>
    </>
  );
};
