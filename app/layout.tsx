import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AlifBaBa - Belajar Hijaiyah & Kisah Nabi",
  description: "Aplikasi pembelajaran huruf hijaiyah, kisah nabi, dan hadist untuk anak-anak dengan metode yang menyenangkan",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={font.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
