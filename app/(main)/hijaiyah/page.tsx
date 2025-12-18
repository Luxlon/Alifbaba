import { FeedWrapper } from "@/components/feed-wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const HijaiyahPage = () => {
  // 28 huruf hijaiyah dasar
  const hijaiyahLetters = [
    { letter: "ا", name: "Alif", transliteration: "A" },
    { letter: "ب", name: "Ba", transliteration: "B" },
    { letter: "ت", name: "Ta", transliteration: "T" },
    { letter: "ث", name: "Tsa", transliteration: "Ts" },
    { letter: "ج", name: "Jim", transliteration: "J" },
    { letter: "ح", name: "Ha", transliteration: "H" },
    { letter: "خ", name: "Kha", transliteration: "Kh" },
    { letter: "د", name: "Dal", transliteration: "D" },
    { letter: "ذ", name: "Dzal", transliteration: "Dz" },
    { letter: "ر", name: "Ra", transliteration: "R" },
    { letter: "ز", name: "Zai", transliteration: "Z" },
    { letter: "س", name: "Sin", transliteration: "S" },
    { letter: "ش", name: "Syin", transliteration: "Sy" },
    { letter: "ص", name: "Shad", transliteration: "Sh" },
    { letter: "ض", name: "Dhad", transliteration: "Dh" },
    { letter: "ط", name: "Tha", transliteration: "Th" },
    { letter: "ظ", name: "Zha", transliteration: "Zh" },
    { letter: "ع", name: "Ain", transliteration: "'" },
    { letter: "غ", name: "Ghain", transliteration: "Gh" },
    { letter: "ف", name: "Fa", transliteration: "F" },
    { letter: "ق", name: "Qaf", transliteration: "Q" },
    { letter: "ك", name: "Kaf", transliteration: "K" },
    { letter: "ل", name: "Lam", transliteration: "L" },
    { letter: "م", name: "Mim", transliteration: "M" },
    { letter: "ن", name: "Nun", transliteration: "N" },
    { letter: "و", name: "Wau", transliteration: "W" },
    { letter: "ه", name: "Ha", transliteration: "H" },
    { letter: "ي", name: "Ya", transliteration: "Y" },
  ];

  return (
    <div className="px-6 pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-700 mb-2">
          Huruf Hijaiyah 📚
        </h1>
        <p className="text-muted-foreground">
          Pilih huruf yang ingin kamu pelajari. Setiap huruf memiliki lesson dengan harakat (fathah, kasrah, dhammah, dll).
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-emerald-700">Progress Kamu</p>
            <p className="text-sm text-emerald-600">8 dari 28 huruf selesai</p>
          </div>
          <div className="text-3xl font-bold text-emerald-600">28%</div>
        </div>
      </div>

      {/* Hijaiyah Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3">
        {hijaiyahLetters.map((item, index) => {
          const isCompleted = index < 8; // Mock: first 8 completed
          const isLocked = index > 8; // Mock: after 8 are locked
          const isCurrent = index === 8; // Mock: 9th is current

          return (
            <Link 
              key={item.name}
              href={isLocked ? "#" : `/hijaiyah/${item.name.toLowerCase()}`}
              className={isLocked ? "cursor-not-allowed" : ""}
            >
              <div 
                className={`
                  relative border-2 rounded-xl p-3 text-center transition
                  ${isCompleted ? "bg-emerald-100 border-emerald-300 hover:bg-emerald-200" : ""}
                  ${isCurrent ? "bg-sky-100 border-sky-400 hover:bg-sky-200 ring-2 ring-sky-400 animate-pulse-glow" : ""}
                  ${isLocked ? "bg-neutral-100 border-neutral-200 opacity-60" : ""}
                  ${!isCompleted && !isCurrent && !isLocked ? "hover:bg-slate-50 border-slate-200" : ""}
                `}
              >
                {isCompleted && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
                {isLocked && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-neutral-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🔒</span>
                  </div>
                )}
                <span className="hijaiyah-letter-sm block">{item.letter}</span>
                <span className="text-xs font-medium text-neutral-600">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Info about Harakat */}
      <div className="mt-10 border-2 rounded-xl p-6">
        <h2 className="font-bold text-lg mb-4">Apa yang akan kamu pelajari?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <span className="hijaiyah-letter-sm block">بَ</span>
            <span className="text-sm font-medium">Fathah</span>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <span className="hijaiyah-letter-sm block">بِ</span>
            <span className="text-sm font-medium">Kasrah</span>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <span className="hijaiyah-letter-sm block">بُ</span>
            <span className="text-sm font-medium">Dhammah</span>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <span className="hijaiyah-letter-sm block">بْ</span>
            <span className="text-sm font-medium">Sukun</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HijaiyahPage;
