"use client";

import { Suspense } from "react";
import LoginPage from "./page";

export default function LoginLayout() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-amber-50 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-emerald-200 rounded-2xl" />
            <div className="h-6 w-48 bg-neutral-200 rounded" />
          </div>
        </div>
      }
    >
      <LoginPage />
    </Suspense>
  );
}
