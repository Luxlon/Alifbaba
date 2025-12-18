import Image from "next/image";
import Link from "next/link";

export const MobileHeader = () => {
  return (
    <nav className="lg:hidden px-6 h-[50px] flex items-center bg-emerald-500 border-b fixed top-0 w-full z-50">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image src="/mascot.svg" height={32} width={32} alt="Mascot" />
          <h1 className="text-xl font-extrabold text-white tracking-wide">
            AlifBaBa
          </h1>
        </div>
      </Link>
    </nav>
  );
};
