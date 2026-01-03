"use client";

import { Suspense } from "react";
import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";
import { DailyLoginModal } from "@/components/daily-login-modal";
import { RouteLoader } from "@/components/route-loader";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Suspense fallback={null}>
        <RouteLoader />
      </Suspense>
      <DailyLoginModal />
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full pt-[44px] sm:pt-[50px] lg:pt-0 pb-16 sm:pb-20 lg:pb-0">
        <div className="max-w-[1056px] mx-auto pt-3 sm:pt-4 md:pt-6 h-full">
          {children}
        </div>
      </main>
    </>
  );
};

export default MainLayout;
