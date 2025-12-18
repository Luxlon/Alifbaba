import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";

const LearnPage = () => {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <div className="bg-emerald-500 text-white p-4 rounded-xl">
          <div className="flex items-center gap-x-2 mb-2">
            <Image src="/points.svg" alt="Points" width={24} height={24} />
            <span className="font-bold">100 XP</span>
          </div>
          <div className="flex items-center gap-x-2">
            <Image src="/heart.svg" alt="Hearts" width={24} height={24} />
            <span className="font-bold">5 Nyawa</span>
          </div>
        </div>
        
        <div className="border-2 rounded-xl p-4 space-y-4">
          <h3 className="font-bold text-lg">Progress Belajar</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Hijaiyah</span>
              <span>28%</span>
            </div>
            <Progress value={28} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Kisah Nabi</span>
              <span>10%</span>
            </div>
            <Progress value={10} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Hadist</span>
              <span>5%</span>
            </div>
            <Progress value={5} className="h-2" />
          </div>
        </div>
      </StickyWrapper>
      
      <FeedWrapper>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-700 mb-2">
            Selamat Datang di AlifBaBa! 👋
          </h1>
          <p className="text-muted-foreground">
            Pilih materi yang ingin kamu pelajari hari ini
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Hijaiyah Card */}
          <Link href="/hijaiyah">
            <div className="border-2 border-emerald-200 rounded-xl p-6 hover:bg-emerald-50 transition cursor-pointer group">
              <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4 group-hover:scale-110 transition">
                <span className="hijaiyah-letter-sm text-emerald-600">ا</span>
              </div>
              <h3 className="font-bold text-lg text-emerald-700 mb-2">Huruf Hijaiyah</h3>
              <p className="text-sm text-muted-foreground">
                Pelajari 28 huruf hijaiyah dengan harakat
              </p>
              <div className="mt-4">
                <Progress value={28} className="h-2" />
                <span className="text-xs text-muted-foreground">8/28 huruf</span>
              </div>
            </div>
          </Link>

          {/* Kisah Nabi Card */}
          <Link href="/stories">
            <div className="border-2 border-amber-200 rounded-xl p-6 hover:bg-amber-50 transition cursor-pointer group">
              <div className="flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4 group-hover:scale-110 transition">
                <Image src="/stories.svg" alt="Kisah Nabi" width={32} height={32} />
              </div>
              <h3 className="font-bold text-lg text-amber-700 mb-2">Kisah Nabi</h3>
              <p className="text-sm text-muted-foreground">
                Tonton dan pelajari kisah para nabi
              </p>
              <div className="mt-4">
                <Progress value={10} className="h-2" />
                <span className="text-xs text-muted-foreground">2/20 kisah</span>
              </div>
            </div>
          </Link>

          {/* Hadist Card */}
          <Link href="/hadith">
            <div className="border-2 border-purple-200 rounded-xl p-6 hover:bg-purple-50 transition cursor-pointer group">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4 group-hover:scale-110 transition">
                <Image src="/hadith.svg" alt="Hadist" width={32} height={32} />
              </div>
              <h3 className="font-bold text-lg text-purple-700 mb-2">Hadist</h3>
              <p className="text-sm text-muted-foreground">
                Pelajari hadist-hadist pilihan untuk anak
              </p>
              <div className="mt-4">
                <Progress value={5} className="h-2" />
                <span className="text-xs text-muted-foreground">1/20 hadist</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Continue Learning Section */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-neutral-700 mb-4">
            Lanjutkan Belajar
          </h2>
          <div className="border-2 rounded-xl p-4 flex items-center gap-4 hover:bg-slate-50 transition cursor-pointer">
            <div className="flex items-center justify-center w-14 h-14 bg-emerald-100 rounded-full">
              <span className="hijaiyah-letter-sm text-emerald-600">ب</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold">Huruf Ba (ب)</h4>
              <p className="text-sm text-muted-foreground">Lesson 2 - Hijaiyah Dasar</p>
            </div>
            <Button variant="secondary">
              Lanjut
            </Button>
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
