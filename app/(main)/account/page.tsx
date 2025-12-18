"use client";

import { useState } from "react";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useUserProgress } from "@/store/use-user-progress";
import { useLessonProgress } from "@/store/use-lesson-progress";
import { useQuests } from "@/store/use-quests";
import { formatXP, formatPoints } from "@/lib/progress";
import { toast } from "sonner";
import {
  User,
  Star,
  Heart,
  Flame,
  Trophy,
  BookOpen,
  Settings,
  LogOut,
  Edit2,
  Check,
  X,
} from "lucide-react";

const AccountPage = () => {
  const {
    name,
    imageUrl,
    xp,
    points,
    hearts,
    maxHearts,
    streak,
    createdAt,
    setUserData,
  } = useUserProgress();
  
  const { getTotalCompleted } = useLessonProgress();
  const { getTotalProgress } = useQuests();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const completed = getTotalCompleted();
  const questProgress = getTotalProgress();

  // Calculate level based on XP
  const getLevel = () => {
    if (xp < 100) return 1;
    if (xp < 300) return 2;
    if (xp < 600) return 3;
    if (xp < 1000) return 4;
    if (xp < 1500) return 5;
    if (xp < 2500) return 6;
    if (xp < 4000) return 7;
    if (xp < 6000) return 8;
    if (xp < 9000) return 9;
    return 10;
  };

  const getXpForNextLevel = () => {
    const levels = [0, 100, 300, 600, 1000, 1500, 2500, 4000, 6000, 9000, 15000];
    const level = getLevel();
    return levels[level] || 15000;
  };

  const getXpForCurrentLevel = () => {
    const levels = [0, 100, 300, 600, 1000, 1500, 2500, 4000, 6000, 9000, 15000];
    const level = getLevel();
    return levels[level - 1] || 0;
  };

  const level = getLevel();
  const xpForNext = getXpForNextLevel();
  const xpForCurrent = getXpForCurrentLevel();
  const levelProgress = ((xp - xpForCurrent) / (xpForNext - xpForCurrent)) * 100;

  const handleSaveName = () => {
    if (editedName.trim()) {
      setUserData({ name: editedName.trim() });
      setIsEditing(false);
      toast.success("Nama berhasil diubah!");
    }
  };

  const handleCancelEdit = () => {
    setEditedName(name);
    setIsEditing(false);
  };

  // Calculate days since joined
  const daysSinceJoined = Math.floor(
    (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-4 sm:gap-6 lg:gap-[48px] px-3 sm:px-4 lg:px-6">
      {/* Mobile Quick Stats Bar */}
      <div className="lg:hidden grid grid-cols-4 gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-lg text-white text-center">
        <div>
          <Star className="h-4 w-4 mx-auto text-amber-300" />
          <div className="font-bold text-xs">{formatXP(xp)}</div>
        </div>
        <div>
          <span className="text-sm">🪙</span>
          <div className="font-bold text-xs">{formatPoints(points)}</div>
        </div>
        <div>
          <Flame className="h-4 w-4 mx-auto text-orange-300" />
          <div className="font-bold text-xs">{streak}</div>
        </div>
        <div>
          <Heart className="h-4 w-4 mx-auto text-red-300" />
          <div className="font-bold text-xs">{hearts}/{maxHearts}</div>
        </div>
      </div>

      <StickyWrapper>
        {/* Quick Stats */}
        <div className="hidden lg:block border-2 rounded-xl p-4 space-y-4">
          <h3 className="font-bold text-lg">Statistik Cepat</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 text-amber-500" />
                Total XP
              </span>
              <span className="font-bold">{formatXP(xp)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm">
                <span>🪙</span>
                Poin
              </span>
              <span className="font-bold">{formatPoints(points)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm">
                <Flame className="h-4 w-4 text-orange-500" />
                Streak
              </span>
              <span className="font-bold">{streak} hari</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm">
                <Heart className="h-4 w-4 text-red-500" />
                Nyawa
              </span>
              <span className="font-bold">{hearts}/{maxHearts}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="hidden lg:block space-y-2">
          <Button variant="ghost" className="w-full justify-start" disabled>
            <Settings className="h-4 w-4 mr-2" />
            Pengaturan
          </Button>
          <Button variant="ghost" className="w-full justify-start text-red-500" disabled>
            <LogOut className="h-4 w-4 mr-2" />
            Keluar
          </Button>
        </div>
      </StickyWrapper>

      <FeedWrapper>
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white mb-4 sm:mb-6 lg:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
            {/* Avatar */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-emerald-500" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="bg-white/20 border border-white/40 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-white placeholder-white/60 text-lg sm:text-xl font-bold w-full max-w-[200px]"
                    placeholder="Nama kamu"
                    autoFocus
                  />
                  <Button size="icon" variant="ghost" onClick={handleSaveName} className="h-8 w-8">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={handleCancelEdit} className="h-8 w-8">
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold truncate">{name}</h1>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              )}

              <div className="text-xs sm:text-sm opacity-90">
                <span>📅 Bergabung {daysSinceJoined} hari lalu</span>
              </div>
            </div>

            {/* Level Badge */}
            <div className="text-center hidden sm:block">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                <span className="text-xl sm:text-2xl font-bold">{level}</span>
              </div>
              <span className="text-xs sm:text-sm">Level</span>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mt-4 sm:mt-6">
            <div className="flex justify-between text-xs sm:text-sm mb-1 sm:mb-2">
              <span>Level {level}</span>
              <span>{formatXP(xp)} / {formatXP(xpForNext)} XP</span>
            </div>
            <Progress value={levelProgress} className="h-2 sm:h-3 bg-white/20" />
          </div>
        </div>

        {/* Learning Progress */}
        <section className="mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
            Progress Belajar
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {/* Hijaiyah */}
            <div className="border-2 border-emerald-200 rounded-lg sm:rounded-xl p-3 sm:p-5 bg-emerald-50">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <span className="text-2xl sm:text-3xl">ا</span>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm sm:text-base">Hijaiyah</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {completed.hijaiyah}/28 huruf
                  </p>
                </div>
              </div>
              <Progress
                value={(completed.hijaiyah / 28) * 100}
                className="h-1.5 sm:h-2"
              />
            </div>

            {/* Stories */}
            <div className="border-2 border-amber-200 rounded-lg sm:rounded-xl p-3 sm:p-5 bg-amber-50">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <span className="text-2xl sm:text-3xl">📖</span>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm sm:text-base">Kisah Nabi</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {completed.stories}/7 kisah
                  </p>
                </div>
              </div>
              <Progress
                value={(completed.stories / 7) * 100}
                className="h-1.5 sm:h-2"
              />
            </div>

            {/* Hadith */}
            <div className="border-2 border-purple-200 rounded-lg sm:rounded-xl p-3 sm:p-5 bg-purple-50">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <span className="text-2xl sm:text-3xl">📿</span>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm sm:text-base">Hadist</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {completed.hadith}/8 hadist
                  </p>
                </div>
              </div>
              <Progress
                value={(completed.hadith / 8) * 100}
                className="h-1.5 sm:h-2"
              />
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
            Pencapaian
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {/* First Lesson */}
            <div
              className={`border-2 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center ${
                completed.total > 0
                  ? "border-amber-300 bg-amber-50"
                  : "border-gray-200 opacity-50"
              }`}
            >
              <span className="text-2xl sm:text-4xl mb-1 sm:mb-2 block">🌟</span>
              <h4 className="font-bold text-xs sm:text-sm">Pemula</h4>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                Selesaikan 1 pelajaran
              </p>
            </div>

            {/* Streak 7 */}
            <div
              className={`border-2 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center ${
                streak >= 7
                  ? "border-orange-300 bg-orange-50"
                  : "border-gray-200 opacity-50"
              }`}
            >
              <span className="text-2xl sm:text-4xl mb-1 sm:mb-2 block">🔥</span>
              <h4 className="font-bold text-xs sm:text-sm">Semangat!</h4>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                Streak 7 hari
              </p>
            </div>

            {/* Master Hijaiyah */}
            <div
              className={`border-2 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center ${
                completed.hijaiyah >= 28
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-gray-200 opacity-50"
              }`}
            >
              <span className="text-2xl sm:text-4xl mb-1 sm:mb-2 block">🏆</span>
              <h4 className="font-bold text-xs sm:text-sm">Master</h4>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                Kuasai 28 huruf
              </p>
            </div>

            {/* Complete All */}
            <div
              className={`border-2 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center ${
                completed.hijaiyah >= 28 &&
                completed.stories >= 7 &&
                completed.hadith >= 8
                  ? "border-purple-300 bg-purple-50"
                  : "border-gray-200 opacity-50"
              }`}
            >
              <span className="text-2xl sm:text-4xl mb-1 sm:mb-2 block">👑</span>
              <h4 className="font-bold text-xs sm:text-sm">Legend</h4>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                Selesaikan semua
              </p>
            </div>
          </div>
        </section>

        {/* Quest Stats */}
        <section>
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">📊 Statistik Quest</h2>
          <div className="border-2 rounded-lg sm:rounded-xl p-4 sm:p-6">
            <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-500">
                  {questProgress.daily}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Daily</p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-orange-500">
                  {questProgress.weekly}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Weekly</p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-amber-500">
                  {questProgress.achievements}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Achieve</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Actions */}
        <div className="lg:hidden mt-6 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-sm" disabled>
            <Settings className="h-4 w-4 mr-2" />
            Pengaturan
          </Button>
          <Button variant="ghost" className="w-full justify-start text-red-500 text-sm" disabled>
            <LogOut className="h-4 w-4 mr-2" />
            Keluar
          </Button>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default AccountPage;
