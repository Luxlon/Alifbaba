"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Lock, ArrowLeft, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/learn";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Mohon isi email dan password");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();

      // Login with email directly
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password,
      });

      if (error) {
        console.error("Login error:", error);
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Email atau password salah");
        } else if (error.message.includes("Email not confirmed")) {
          toast.error("Email belum dikonfirmasi");
        } else {
          toast.error(error.message);
        }
        setIsLoading(false);
        return;
      }

      if (data.user) {
        // Get user profile to determine redirect
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("role, name")
          .eq("id", data.user.id)
          .single();

        if (profileError) {
          console.error("Profile error:", profileError);
          toast.success("Login berhasil! 👋");
          router.push(redirectTo);
          router.refresh();
          return;
        }

        const profile = profileData as { role: string; name: string } | null;
        toast.success(
          `Selamat datang kembali, ${profile?.name || "Pengguna"}! 👋`
        );

        // Redirect based on role
        if (profile?.role === "superadmin") {
          router.push("/admin");
        } else if (profile?.role === "teacher") {
          router.push("/dashboard");
        } else {
          router.push(redirectTo);
        }
        router.refresh();
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Terjadi kesalahan. Coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-amber-50 flex flex-col">
      {/* Header */}
      <header className="p-4 sm:p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm font-medium">Kembali</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-[400px]">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-3xl sm:text-4xl font-bold">
                  ا
                </span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-800 mb-2">
              Masuk ke AlifBaBa
            </h1>
            <p className="text-sm sm:text-base text-neutral-600">
              Lanjutkan perjalanan belajarmu! 📚
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@gmail.com"
                  className="w-full pl-10 pr-4 py-3 sm:py-3.5 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition text-base"
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-700"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full pl-10 pr-12 py-3 sm:py-3.5 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition text-base"
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="w-full text-base sm:text-lg h-12 sm:h-14 mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Masuk"
              )}
            </Button>
          </form>

          {/* Demo Accounts Info */}
          <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <p className="text-sm font-medium text-emerald-800 mb-2">
              Akun Demo:
            </p>
            <div className="text-xs text-emerald-700 space-y-1">
              <p>
                👑 Admin: <span className="font-mono">admin@gmail.com</span> /
                admin123
              </p>
              <p>
                👨‍🏫 Guru: <span className="font-mono">guru1@gmail.com</span> /
                guru123
              </p>
              <p>
                👦 Siswa: <span className="font-mono">siswa1@gmail.com</span> /
                siswa123
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-sm text-neutral-500">atau</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-neutral-600">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="text-emerald-600 hover:text-emerald-700 font-bold"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <p className="text-xs text-neutral-500 text-center">
              Hubungi pengajar atau admin jika kamu lupa password atau mengalami
              masalah saat login.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center">
        <p className="text-xs text-neutral-500">
          © 2024 AlifBaBa. Aplikasi belajar Islam untuk anak-anak.
        </p>
      </footer>
    </div>
  );
}
