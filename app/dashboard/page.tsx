"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Download,
  Search,
  RefreshCw,
  LogOut,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  FileText,
  Star,
  Flame,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

// Extend jsPDF type for autoTable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: unknown) => jsPDF;
  }
}

interface StudentData {
  student_id: string;
  student_name: string;
  student_email: string;
  total_xp: number;
  current_streak: number;
  hijaiyah_completed: number;
  hijaiyah_avg_score: number;
  stories_completed: number;
  stories_avg_score: number;
  hadith_completed: number;
  hadith_avg_score: number;
  iqro_completed: number;
  last_active: string | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const { session, profile, isLoading: authLoading, signOut } = useAuth();
  const [students, setStudents] = useState<StudentData[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<keyof StudentData>("total_xp");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [showExportMenu, setShowExportMenu] = useState(false);

  const supabase = createClient();

  // Fetch students data
  const fetchStudents = async () => {
    if (!session) return;

    setIsLoading(true);
    try {
      // Get students linked to this teacher
      const { data: studentProfiles, error: profileError } = await supabase
        .from("profiles")
        .select("id, username, email")
        .eq("teacher_id", session.userId)
        .eq("role", "student");

      if (profileError) throw profileError;

      // Type assertion for profile data
      type ProfileRow = { id: string; username: string; email: string };
      const profiles = (studentProfiles || []) as ProfileRow[];

      if (profiles.length === 0) {
        setStudents([]);
        setFilteredStudents([]);
        setIsLoading(false);
        return;
      }

      // Get progress for each student
      const studentIds = profiles.map((s) => s.id);

      // Fetch user progress
      const { data: progressData } = await supabase
        .from("user_progress")
        .select("*")
        .in("user_id", studentIds);

      // Type assertion for progress data
      type ProgressRow = {
        user_id: string;
        xp: number;
        streak: number;
        last_login_date: string | null;
      };
      const progress = (progressData || []) as ProgressRow[];

      // Fetch hijaiyah progress
      const { data: hijaiyahData } = await supabase
        .from("hijaiyah_progress")
        .select("user_id, completed, score")
        .in("user_id", studentIds);

      type HijaiyahRow = { user_id: string; completed: boolean; score: number };
      const hijaiyah = (hijaiyahData || []) as HijaiyahRow[];

      // Fetch story progress
      const { data: storyData } = await supabase
        .from("story_progress")
        .select("user_id, completed, quiz_score")
        .in("user_id", studentIds);

      type StoryRow = {
        user_id: string;
        completed: boolean;
        quiz_score: number;
      };
      const stories = (storyData || []) as StoryRow[];

      // Fetch hadith progress
      const { data: hadithData } = await supabase
        .from("hadith_progress")
        .select("user_id, completed, quiz_score")
        .in("user_id", studentIds);

      type HadithRow = {
        user_id: string;
        completed: boolean;
        quiz_score: number;
      };
      const hadiths = (hadithData || []) as HadithRow[];

      // Fetch iqro progress
      const { data: iqroData } = await supabase
        .from("iqro_progress")
        .select("user_id, completed")
        .in("user_id", studentIds);

      type IqroRow = { user_id: string; completed: boolean };
      const iqros = (iqroData || []) as IqroRow[];

      // Aggregate data per student
      const aggregatedStudents: StudentData[] = profiles.map((student) => {
        const studentProgress = progress.find((p) => p.user_id === student.id);

        const studentHijaiyah = hijaiyah.filter(
          (h) => h.user_id === student.id
        );
        const hijaiyahCompleted = studentHijaiyah.filter(
          (h) => h.completed
        ).length;
        const hijaiyahAvgScore =
          studentHijaiyah.length > 0
            ? studentHijaiyah.reduce((sum, h) => sum + (h.score || 0), 0) /
              studentHijaiyah.length
            : 0;

        const studentStories = stories.filter((s) => s.user_id === student.id);
        const storiesCompleted = studentStories.filter(
          (s) => s.completed
        ).length;
        const storiesAvgScore =
          studentStories.length > 0
            ? studentStories.reduce((sum, s) => sum + (s.quiz_score || 0), 0) /
              studentStories.length
            : 0;

        const studentHadith = hadiths.filter((h) => h.user_id === student.id);
        const hadithCompleted = studentHadith.filter((h) => h.completed).length;
        const hadithAvgScore =
          studentHadith.length > 0
            ? studentHadith.reduce((sum, h) => sum + (h.quiz_score || 0), 0) /
              studentHadith.length
            : 0;

        const studentIqro = iqros.filter((i) => i.user_id === student.id);
        const iqroCompleted = studentIqro.filter((i) => i.completed).length;

        return {
          student_id: student.id,
          student_name: student.username,
          student_email: student.email,
          total_xp: studentProgress?.xp || 0,
          current_streak: studentProgress?.streak || 0,
          hijaiyah_completed: hijaiyahCompleted,
          hijaiyah_avg_score: Math.round(hijaiyahAvgScore),
          stories_completed: storiesCompleted,
          stories_avg_score: Math.round(storiesAvgScore),
          hadith_completed: hadithCompleted,
          hadith_avg_score: Math.round(hadithAvgScore),
          iqro_completed: iqroCompleted,
          last_active: studentProgress?.last_login_date || null,
        };
      });

      setStudents(aggregatedStudents);
      setFilteredStudents(aggregatedStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Gagal memuat data siswa");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && session && profile?.role === "teacher") {
      fetchStudents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, session, profile]);

  // Filter and sort students
  useEffect(() => {
    let filtered = [...students];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.student_name.toLowerCase().includes(query) ||
          s.student_email.toLowerCase().includes(query)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      const aNum = Number(aVal) || 0;
      const bNum = Number(bVal) || 0;
      return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
    });

    setFilteredStudents(filtered);
  }, [students, searchQuery, sortField, sortDirection]);

  // Export to Excel
  const exportToExcel = () => {
    const exportData = filteredStudents.map((s) => ({
      "Nama Siswa": s.student_name,
      Email: s.student_email,
      "Total XP": s.total_xp,
      "Streak (Hari)": s.current_streak,
      "Hijaiyah Selesai": `${s.hijaiyah_completed}/29`,
      "Nilai Rata-rata Hijaiyah": `${s.hijaiyah_avg_score}%`,
      "Kisah Nabi Selesai": `${s.stories_completed}/7`,
      "Nilai Rata-rata Kisah": `${s.stories_avg_score}%`,
      "Hadist Selesai": `${s.hadith_completed}/20`,
      "Nilai Rata-rata Hadist": `${s.hadith_avg_score}%`,
      "Iqro Selesai": `${s.iqro_completed}/6`,
      "Terakhir Aktif": s.last_active
        ? new Date(s.last_active).toLocaleDateString("id-ID")
        : "-",
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Progress Siswa");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(
      data,
      `Progress_Siswa_${new Date().toISOString().split("T")[0]}.xlsx`
    );
    toast.success("File Excel berhasil diunduh!");
    setShowExportMenu(false);
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Laporan Progress Siswa AlifBaBa", 14, 22);

    // Date
    doc.setFontSize(11);
    doc.text(`Tanggal: ${new Date().toLocaleDateString("id-ID")}`, 14, 30);
    doc.text(`Pengajar: ${profile?.username}`, 14, 36);
    doc.text(`Jumlah Siswa: ${filteredStudents.length}`, 14, 42);

    // Table
    const tableData = filteredStudents.map((s) => [
      s.student_name,
      s.total_xp.toString(),
      `${s.hijaiyah_completed}/29`,
      `${s.hijaiyah_avg_score}%`,
      `${s.stories_completed}/7`,
      `${s.hadith_completed}/20`,
      s.last_active ? new Date(s.last_active).toLocaleDateString("id-ID") : "-",
    ]);

    doc.autoTable({
      startY: 50,
      head: [
        [
          "Nama",
          "XP",
          "Hijaiyah",
          "Nilai",
          "Kisah",
          "Hadist",
          "Terakhir Aktif",
        ],
      ],
      body: tableData,
      theme: "striped",
      styles: { fontSize: 9 },
      headStyles: { fillColor: [16, 185, 129] }, // emerald-500
    });

    doc.save(`Progress_Siswa_${new Date().toISOString().split("T")[0]}.pdf`);
    toast.success("File PDF berhasil diunduh!");
    setShowExportMenu(false);
  };

  // Handle sort
  const handleSort = (field: keyof StudentData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Loading state - simple spinner
  if (authLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  // Profile not loaded - show error
  if (!profile && session) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center gap-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Gagal Memuat Profil
          </h2>
          <p className="text-slate-600 mb-4">
            Terjadi masalah saat memuat profil Anda. Silakan coba lagi.
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={() => signOut()}>Logout</Button>
          </div>
        </div>
      </div>
    );
  }

  // Not authorized - redirect
  if (!session || profile?.role !== "teacher") {
    router.push("/learn");
    return null;
  }

  // Stats calculations
  const totalStudents = students.length;
  const averageXP =
    totalStudents > 0
      ? Math.round(
          students.reduce((sum, s) => sum + s.total_xp, 0) / totalStudents
        )
      : 0;
  const activeToday = students.filter(
    (s) =>
      s.last_active &&
      new Date(s.last_active).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">ا</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-emerald-600">AlifBaBa</h1>
                <p className="text-xs text-neutral-500">Dashboard Pengajar</p>
              </div>
            </Link>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="font-medium text-neutral-800">{profile?.username}</p>
                <p className="text-xs text-neutral-500">Pengajar</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Keluar</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800">
            Assalamualaikum, {profile?.username}! 👋
          </h2>
          <p className="text-neutral-600 mt-1">
            Pantau progress belajar siswa-siswamu di sini.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl p-4 sm:p-6 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-neutral-800">
                  {totalStudents}
                </p>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Total Siswa
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Star className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-neutral-800">
                  {averageXP}
                </p>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Rata-rata XP
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-neutral-800">
                  {activeToday}
                </p>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Aktif Hari Ini
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-neutral-800">
                  {students.length > 0
                    ? Math.round(
                        students.reduce(
                          (sum, s) => sum + s.hijaiyah_completed,
                          0
                        ) / students.length
                      )
                    : 0}
                </p>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Avg. Hijaiyah
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Students Table Section */}
        <div className="bg-white rounded-xl border shadow-sm">
          {/* Table Header */}
          <div className="p-4 sm:p-6 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-emerald-600" />
                Daftar Siswa
              </h3>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Search */}
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Cari siswa..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500"
                  />
                </div>

                {/* Refresh */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={fetchStudents}
                  disabled={isLoading}
                  className="hidden sm:flex"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                  />
                </Button>

                {/* Export */}
                <div className="relative">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className="whitespace-nowrap"
                  >
                    <Download className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Export</span>
                  </Button>

                  {showExportMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                      <button
                        onClick={exportToExcel}
                        className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-neutral-50 rounded-t-lg"
                      >
                        <FileSpreadsheet className="h-4 w-4 text-green-600" />
                        Export ke Excel
                      </button>
                      <button
                        onClick={exportToPDF}
                        className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-neutral-50 rounded-b-lg"
                      >
                        <FileText className="h-4 w-4 text-red-600" />
                        Export ke PDF
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Table Content */}
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-emerald-500 border-t-transparent mx-auto mb-4" />
              <p className="text-neutral-500">Memuat data siswa...</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
              <h4 className="font-medium text-neutral-600 mb-2">
                {searchQuery ? "Siswa tidak ditemukan" : "Belum ada siswa"}
              </h4>
              <p className="text-sm text-neutral-500">
                {searchQuery
                  ? "Coba kata kunci lain"
                  : "Bagikan kode guru kamu agar siswa bisa bergabung"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50">
                  <tr>
                    <th
                      className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider cursor-pointer hover:bg-neutral-100"
                      onClick={() => handleSort("student_name")}
                    >
                      <span className="flex items-center gap-1">
                        Siswa
                        {sortField === "student_name" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : (
                            <ChevronDown className="h-3 w-3" />
                          ))}
                      </span>
                    </th>
                    <th
                      className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider cursor-pointer hover:bg-neutral-100"
                      onClick={() => handleSort("total_xp")}
                    >
                      <span className="flex items-center gap-1">
                        XP
                        {sortField === "total_xp" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : (
                            <ChevronDown className="h-3 w-3" />
                          ))}
                      </span>
                    </th>
                    <th className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Hijaiyah
                    </th>
                    <th className="hidden lg:table-cell px-4 sm:px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Kisah Nabi
                    </th>
                    <th className="hidden lg:table-cell px-4 sm:px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Hadist
                    </th>
                    <th
                      className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider cursor-pointer hover:bg-neutral-100"
                      onClick={() => handleSort("current_streak")}
                    >
                      <span className="flex items-center gap-1">
                        Streak
                        {sortField === "current_streak" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : (
                            <ChevronDown className="h-3 w-3" />
                          ))}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredStudents.map((student) => (
                    <tr
                      key={student.student_id}
                      className="hover:bg-neutral-50"
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-emerald-700 font-bold text-sm sm:text-base">
                              {student.student_name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-neutral-800 truncate text-sm sm:text-base">
                              {student.student_name}
                            </p>
                            <p className="text-xs text-neutral-500 truncate hidden sm:block">
                              {student.student_email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-500" />
                          <span className="font-semibold text-sm">
                            {student.total_xp}
                          </span>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-4 sm:px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {student.hijaiyah_completed}/29
                            </span>
                            <span className="text-xs text-neutral-500">
                              ({student.hijaiyah_avg_score}%)
                            </span>
                          </div>
                          <Progress
                            value={(student.hijaiyah_completed / 29) * 100}
                            className="h-1.5 w-24"
                          />
                        </div>
                      </td>
                      <td className="hidden lg:table-cell px-4 sm:px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {student.stories_completed}/7
                            </span>
                            <span className="text-xs text-neutral-500">
                              ({student.stories_avg_score}%)
                            </span>
                          </div>
                          <Progress
                            value={(student.stories_completed / 7) * 100}
                            className="h-1.5 w-24"
                          />
                        </div>
                      </td>
                      <td className="hidden lg:table-cell px-4 sm:px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {student.hadith_completed}/20
                            </span>
                            <span className="text-xs text-neutral-500">
                              ({student.hadith_avg_score}%)
                            </span>
                          </div>
                          <Progress
                            value={(student.hadith_completed / 20) * 100}
                            className="h-1.5 w-24"
                          />
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <span className="font-semibold text-sm">
                            {student.current_streak}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Teacher Code Section */}
        {profile && (
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-6 text-white">
            <h4 className="font-bold text-lg mb-2">🔗 Kode Pengajar</h4>
            <p className="text-sm opacity-90 mb-4">
              Bagikan kode ini ke siswa agar mereka terhubung dengan akun kamu saat mendaftar
            </p>
            <div className="flex items-center gap-3">
              <code className="bg-white/20 px-4 py-2 rounded-lg font-mono text-lg">
                {session?.userId.slice(-4).toUpperCase()}
              </code>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={() => {
                  navigator.clipboard.writeText(
                    session?.userId.slice(-4).toUpperCase() || ""
                  );
                  toast.success("Kode berhasil disalin!");
                }}
              >
                Salin
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
