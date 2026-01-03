import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-y-6 px-4">
      <div className="relative">
        <Image
          src="/mascot_sad.svg"
          height={200}
          width={200}
          alt="Mascot Sad"
        />
      </div>
      
      <div className="text-center space-y-2">
        <h1 className="text-6xl font-bold text-slate-800">404</h1>
        <h2 className="text-2xl font-bold text-slate-700">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-slate-500 max-w-md">
          Maaf, halaman yang kamu cari tidak ada. Yuk kembali belajar!
        </p>
      </div>
      
      <div className="flex gap-x-4">
        <Button asChild variant="primary">
          <Link href="/learn">
            Kembali Belajar
          </Link>
        </Button>
        <Button asChild variant="primaryOutline">
          <Link href="/">
            Ke Beranda
          </Link>
        </Button>
      </div>
    </div>
  );
}
