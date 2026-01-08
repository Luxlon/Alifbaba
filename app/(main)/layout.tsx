"use client";

import { Suspense, useEffect } from "react";
import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";
import { DailyLoginModal } from "@/components/daily-login-modal";
import { HeartsModal } from "@/components/hearts-modal";
import { RouteLoader } from "@/components/route-loader";
import { useUserProgress } from "@/store/use-user-progress";
import { useAuth } from "@/components/providers/auth-provider";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const { checkHeartRegen, isInitialized } = useUserProgress();
  const { session } = useAuth();

  // Check heart regeneration every minute
  useEffect(() => {
    if (!session || !isInitialized) return;

    // Initial check
    checkHeartRegen();

    // Set up interval for heart regeneration check
    const interval = setInterval(() => {
      checkHeartRegen();
    }, 60 * 1000); // Check every minute

    return () => clearInterval(interval);
  }, [session, isInitialized, checkHeartRegen]);

  return (
    <>
      <Suspense fallback={null}>
        <RouteLoader />
      </Suspense>
      <DailyLoginModal />
      <HeartsModal />
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] min-h-screen pt-[44px] sm:pt-[50px] lg:pt-0 lg:pb-0">
        <div className="max-w-[1056px] mx-auto pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4 lg:px-6">
          {children}
          {/* Spacer for mobile bottom navbar */}
          <div className="lg:hidden h-[70px]" />
        </div>
      </main>
    </>
  );
};

export default MainLayout;
