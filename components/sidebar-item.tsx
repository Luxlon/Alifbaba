"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

type Props = {
  label: string;
  iconSrc: string;
  href: string;
};

export const SidebarItem = ({
  label,
  iconSrc,
  href,
}: Props) => {
  const pathName = usePathname();
  const active = pathName === href || pathName?.startsWith(`${href}/`);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = () => {
    if (!active) {
      setIsNavigating(true);
    }
  };

  // Reset when pathname matches href
  if (isNavigating && active) {
    setIsNavigating(false);
  }

  return (
    <Button
      variant={active ? "sidebarOutline" : "sidebar"}
      className="justify-start h-[52px] relative"
      asChild
    >
      <Link href={href} onClick={handleClick}>
        {isNavigating ? (
          <Loader2 className="h-8 w-8 mr-5 animate-spin text-emerald-500" />
        ) : (
          <Image 
            src={iconSrc}
            alt={label}
            className="mr-5"
            height={32}
            width={32}
          />
        )}
        {label}
      </Link>
    </Button>
  );
};
