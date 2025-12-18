import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="max-w-[1200px] mx-auto px-4 pt-12 pb-20">
        {/* Header */}
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">ا</span>
            </div>
            <h1 className="text-2xl font-extrabold text-emerald-600">
              AlifBaBa
            </h1>
          </div>
          {/* <Link href="/learn">
            <Button variant="primary">Mulai Belajar</Button>
          </Link> */}
        </header>

        {/* Hero */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-neutral-800 mb-6 leading-tight">
              Belajar Islam <br />
              <span className="text-emerald-600">Menyenangkan</span> untuk Anak
            </h2>
            <p className="text-lg text-neutral-600 mb-8 max-w-lg">
              Pelajari huruf hijaiyah, kisah para nabi, dan hadist pilihan dengan 
              cara yang interaktif dan menyenangkan. Cocok untuk anak-anak!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/learn">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-8">
                  🚀 Mulai
                </Button>
              </Link>
              {/* <Link href="/hijaiyah">
                <Button size="lg" variant="primaryOutline" className="w-full sm:w-auto text-lg px-8">
                  Lihat Materi
                </Button>
              </Link> */}
            </div>
          </div>
          
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                <span className="text-[150px] lg:text-[200px]">📚</span>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-amber-400 text-white p-4 rounded-2xl shadow-lg animate-bounce">
                <span className="text-3xl">⭐</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-purple-400 text-white p-4 rounded-2xl shadow-lg animate-pulse">
                <span className="text-3xl">🏆</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Hijaiyah */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-emerald-100 hover:border-emerald-300 transition">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-3xl">ا</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-emerald-700">
              28 Huruf Hijaiyah
            </h3>
            <p className="text-neutral-600">
              Pelajari semua huruf hijaiyah dengan harakat lengkap (fathah, kasrah, dhammah, sukun, dan tanwin).
            </p>
          </div>

          {/* Stories */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-amber-100 hover:border-amber-300 transition">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-3xl">📖</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-amber-700">
              Kisah Para Nabi
            </h3>
            <p className="text-neutral-600">
              Tonton video kisah nabi-nabi dengan animasi menarik dan quiz interaktif untuk menguji pemahaman.
            </p>
          </div>

          {/* Hadith */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-100 hover:border-purple-300 transition">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-3xl">📿</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-purple-700">
              Hadist Pilihan
            </h3>
            <p className="text-neutral-600">
              Pelajari hadist-hadist pendek yang mudah dihafal dengan teks Arab, terjemahan, dan audio.
            </p>
          </div>
        </div>

        {/* Gamification Features */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-10 text-white mb-20">
          <h3 className="text-2xl font-bold text-center mb-8">
            ✨ Fitur Gamifikasi yang Menyenangkan
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <span className="text-4xl mb-3 block">⭐</span>
              <h4 className="font-bold mb-1">XP & Level</h4>
              <p className="text-sm opacity-90">Kumpulkan XP dan naik level</p>
            </div>
            <div>
              <span className="text-4xl mb-3 block">🔥</span>
              <h4 className="font-bold mb-1">Streak Harian</h4>
              <p className="text-sm opacity-90">Pertahankan semangat belajar</p>
            </div>
            <div>
              <span className="text-4xl mb-3 block">🎯</span>
              <h4 className="font-bold mb-1">Quest & Tantangan</h4>
              <p className="text-sm opacity-90">Selesaikan quest harian</p>
            </div>
            <div>
              <span className="text-4xl mb-3 block">🏆</span>
              <h4 className="font-bold mb-1">Leaderboard</h4>
              <p className="text-sm opacity-90">Bersaing dengan teman</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">
            Siap untuk Mulai Belajar?
          </h3>
          <p className="text-neutral-600 mb-8 max-w-md mx-auto">
            Bergabung dengan ribuan anak yang sudah belajar dengan AlifBaBa!
          </p>
          <Link href="/learn">
            <Button size="lg" variant="secondary" className="text-xl px-12 py-6">
              Mulai Belajar Sekarang 🚀
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-100 py-8">
        <div className="max-w-[1200px] mx-auto px-4 text-center text-neutral-600">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">ا</span>
            </div>
            <span className="font-bold text-emerald-600">AlifBaBa</span>
          </div>
          <p className="text-sm">
            © 2024 AlifBaBa. Aplikasi belajar Islam untuk anak-anak.
          </p>
        </div>
      </footer>
    </div>
  );
}
