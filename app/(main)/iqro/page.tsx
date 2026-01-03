"use client";

import { useState } from "react";
import { IQRO_DATA } from "@/constants";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLessonProgress } from "@/store/use-lesson-progress";
import { Book, ChevronRight, Star, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const IqroPage = () => {
  const { getIqroProgress } = useLessonProgress();
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleCardClick = (iqroId: number) => {
    setLoadingId(iqroId);
    router.push(`/iqro/${iqroId}`);
  };

  const getColorClasses = (color: string, isCompleted: boolean) => {
    const colors: Record<string, { bg: string; border: string; text: string; accent: string }> = {
      emerald: {
        bg: isCompleted ? "bg-emerald-100" : "bg-emerald-50",
        border: isCompleted ? "border-emerald-400" : "border-emerald-200",
        text: "text-emerald-700",
        accent: "bg-emerald-500",
      },
      blue: {
        bg: isCompleted ? "bg-blue-100" : "bg-blue-50",
        border: isCompleted ? "border-blue-400" : "border-blue-200",
        text: "text-blue-700",
        accent: "bg-blue-500",
      },
      purple: {
        bg: isCompleted ? "bg-purple-100" : "bg-purple-50",
        border: isCompleted ? "border-purple-400" : "border-purple-200",
        text: "text-purple-700",
        accent: "bg-purple-500",
      },
      amber: {
        bg: isCompleted ? "bg-amber-100" : "bg-amber-50",
        border: isCompleted ? "border-amber-400" : "border-amber-200",
        text: "text-amber-700",
        accent: "bg-amber-500",
      },
      rose: {
        bg: isCompleted ? "bg-rose-100" : "bg-rose-50",
        border: isCompleted ? "border-rose-400" : "border-rose-200",
        text: "text-rose-700",
        accent: "bg-rose-500",
      },
      cyan: {
        bg: isCompleted ? "bg-cyan-100" : "bg-cyan-50",
        border: isCompleted ? "border-cyan-400" : "border-cyan-200",
        text: "text-cyan-700",
        accent: "bg-cyan-500",
      },
    };
    return colors[color] || colors.emerald;
  };

  return (
    <div className="px-3 sm:px-4 lg:px-6 py-4">
      {/* Header */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
            <Book className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-700">
              Baca Iqro 📖
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Belajar membaca Al-Quran dari dasar
            </p>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white mb-4 sm:mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl sm:text-3xl">📚</span>
          <div>
            <h2 className="font-bold text-lg sm:text-xl">Metode Iqro</h2>
            <p className="text-xs sm:text-sm opacity-90">
              6 jilid pembelajaran membaca Al-Quran
            </p>
          </div>
        </div>
        <p className="text-xs sm:text-sm opacity-80 mt-2">
          Geser halaman seperti membaca buku! 👆
        </p>
      </div>

      {/* Iqro Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {IQRO_DATA.map((iqro) => {
          const progress = getIqroProgress ? getIqroProgress(iqro.id) : null;
          const isCompleted = progress?.completed || false;
          const currentPage = progress?.currentPage || 0;
          const totalPages = progress?.totalPages || 0;
          const progressPercent = totalPages > 0 ? (currentPage / totalPages) * 100 : 0;
          const colors = getColorClasses(iqro.color, isCompleted);
          const isLoading = loadingId === iqro.id;

          return (
            <div 
              key={iqro.id} 
              onClick={() => !isLoading && handleCardClick(iqro.id)}
              className="cursor-pointer"
            >
              <div
                className={`
                  border-2 rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-200 relative
                  hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]
                  ${colors.bg} ${colors.border}
                  ${isLoading ? "opacity-70 pointer-events-none" : ""}
                `}
              >
                {/* Loading Overlay */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-xl z-10">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                  </div>
                )}

                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${colors.accent} rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl`}>
                      {iqro.id}
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg">{iqro.title}</h3>
                      {isCompleted && (
                        <div className="flex items-center gap-1 text-emerald-600">
                          <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="text-xs font-medium">Selesai</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {isLoading ? (
                    <Loader2 className={`h-5 w-5 animate-spin ${colors.text}`} />
                  ) : (
                    <ChevronRight className={`h-5 w-5 ${colors.text}`} />
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">
                  {iqro.description}
                </p>

                {/* Progress */}
                {currentPage > 0 && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Halaman {currentPage}</span>
                      <span className="text-muted-foreground">{Math.round(progressPercent)}%</span>
                    </div>
                    <Progress value={progressPercent} className="h-1.5" />
                  </div>
                )}

                {/* Start/Continue Button */}
                <div className="mt-3">
                  <div className={`w-full py-2 px-3 rounded-lg text-center text-xs sm:text-sm font-medium ${colors.accent} text-white flex items-center justify-center gap-2`}>
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Memuat...
                      </>
                    ) : (
                      <>
                        {currentPage > 0 ? "Lanjutkan" : "Mulai Baca"} →
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tips Section */}
      <div className="mt-6 sm:mt-8 bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
        <h3 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
          <Star className="h-4 w-4 text-amber-500" />
          Tips Belajar
        </h3>
        <ul className="text-xs sm:text-sm text-amber-700 space-y-1">
          <li>📱 Geser kiri/kanan untuk berpindah halaman</li>
          <li>🔒 Kunci layar agar tidak pindah halaman tanpa sengaja</li>
          <li>📖 Baca dengan perlahan dan teliti</li>
        </ul>
      </div>
    </div>
  );
};

export default IqroPage;
