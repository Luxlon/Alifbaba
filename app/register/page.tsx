"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { setSession, type SessionData } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  User,
  ArrowLeft,
  BookOpen,
  Link2,
} from "lucide-react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [teacherCode, setTeacherCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!username || !password || !confirmPassword) {
      toast.error("Mohon isi username dan password");
      return;
    }

    if (username.length < 3) {
      toast.error("Username minimal 3 karakter");
      return;
    }

    if (password.length < 4) {
      toast.error("Password minimal 4 karakter");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Konfirmasi password tidak cocok");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();

      // Check if username already exists
      const { data: existingUser } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username.toLowerCase().trim())
        .single();

      if (existingUser) {
        toast.error("Username sudah digunakan. Pilih yang lain.");
        setIsLoading(false);
        return;
      }

      // Find teacher by referral code (last 4 characters of teacher's ID)
      let teacherId: string | null = null;
      if (teacherCode.trim()) {
        const { data: teachers } = await supabase
          .from("profiles")
          .select("id")
          .eq("role", "teacher");
        
        type TeacherData = { id: string };
        const typedTeachers = teachers as TeacherData[] | null;
        
        if (typedTeachers && typedTeachers.length > 0) {
          const matchedTeacher = typedTeachers.find(
            (t) => t.id.slice(-4).toUpperCase() === teacherCode.trim().toUpperCase()
          );
          if (matchedTeacher) {
            teacherId = matchedTeacher.id;
          } else {
            toast.error("Kode guru tidak ditemukan. Periksa kembali kode yang dimasukkan.");
            setIsLoading(false);
            return;
          }
        }
      }

      // Generate new user ID
      const newUserId = crypto.randomUUID();

      // Insert new profile (password stored directly, suitable for learning app)
      const { error: profileError } = await (supabase
        .from("profiles") as ReturnType<typeof supabase.from>)
        .insert({
          id: newUserId,
          username: username.toLowerCase().trim(),
          password: password,
          email: email || null,
          role: "student",
          teacher_id: teacherId,
          is_active: true,
        });

      if (profileError) {
        console.error("Registration error:", profileError);
        toast.error("Gagal membuat akun. Coba lagi.");
        setIsLoading(false);
        return;
      }

      // Create user_progress entry (without last_active_date so daily reward shows)
      const { error: progressError } = await (supabase
        .from("user_progress") as ReturnType<typeof supabase.from>)
        .insert({
          user_id: newUserId,
          name: username.toLowerCase().trim(),
          hearts: 5,
          xp: 0,
          points: 100,
          streak: 0,
        });

      if (progressError) {
        console.error("Progress error:", progressError);
        // Continue anyway - profile was created
      }

      // Set session
      const sessionData: SessionData = {
        userId: newUserId,
        username: username.toLowerCase().trim(),
        role: "student",
        email: email || null,
      };
      setSession(sessionData);

      // Clear daily claim key so streak modal shows on first login
      try {
        localStorage.removeItem("alifbaba_daily_claim");
      } catch {
        // Ignore localStorage errors
      }

      toast.success(`Selamat datang di AlifBaBa, ${username}! 🎉`);
      
      // Redirect to learn page
      setTimeout(() => {
        window.location.href = "/learn";
      }, 100);
    } catch (err) {
      console.error("Registration error:", err);
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
      <main className="flex-1 flex items-center justify-center px-4 py-6 sm:py-8">
        <div className="w-full max-w-[400px]">
          {/* Logo & Title */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-3xl sm:text-4xl font-bold">
                  ا
                </span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-800 mb-2">
              Daftar AlifBaBa
            </h1>
            <p className="text-sm sm:text-base text-neutral-600">
              Mulai petualangan belajar Islammu! 🌟
            </p>
          </div>

          {/* Info Card */}
          <div className="mb-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <div className="flex items-start gap-3">
              <BookOpen className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-emerald-800">
                  Pendaftaran untuk Siswa
                </p>
                <p className="text-xs text-emerald-600 mt-1">
                  Pengajar didaftarkan oleh admin melalui sistem.
                </p>
              </div>
            </div>
          </div>

          {/* Register Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Username Field */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-neutral-700"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username untuk login"
                  className="w-full pl-10 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition text-base"
                  disabled={isLoading}
                  autoComplete="username"
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
                  placeholder="Minimal 4 karakter"
                  className="w-full pl-10 pr-12 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition text-base"
                  disabled={isLoading}
                  autoComplete="new-password"
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

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-neutral-700"
              >
                Konfirmasi Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password"
                  className="w-full pl-10 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition text-base"
                  disabled={isLoading}
                  autoComplete="new-password"
                />
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-500">Password tidak cocok</p>
              )}
            </div>

            {/* Teacher Code Field (Optional) */}
            <div className="space-y-2">
              <label
                htmlFor="teacherCode"
                className="block text-sm font-medium text-neutral-700"
              >
                Kode Guru (Opsional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Link2 className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="teacherCode"
                  type="text"
                  value={teacherCode}
                  onChange={(e) => setTeacherCode(e.target.value.toUpperCase())}
                  placeholder="Masukkan 4 digit kode guru"
                  maxLength={4}
                  className="w-full pl-10 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition text-base uppercase"
                  disabled={isLoading}
                />
              </div>
              <p className="text-xs text-neutral-500">
                Minta kode guru dari pengajar untuk terhubung dengannya
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant={username.trim() && password.trim() && confirmPassword.trim() && password === confirmPassword ? "primary" : "secondary"}
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
                "Daftar Sekarang"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-sm text-neutral-500">atau</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-neutral-600">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="text-emerald-600 hover:text-emerald-700 font-bold"
              >
                Masuk
              </Link>
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
