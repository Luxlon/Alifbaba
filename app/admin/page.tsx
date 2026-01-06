"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/providers/auth-provider";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Icons
import {
  Users,
  GraduationCap,
  BookOpen,
  Shield,
  Plus,
  Pencil,
  Trash2,
  Download,
  RefreshCw,
  Loader2,
  Search,
  Eye,
  CheckCircle,
  AlertCircle,
  UserPlus,
  LogOut,
  MoreHorizontal,
  FileSpreadsheet,
  FileText,
  ChevronDown,
} from "lucide-react";

type TabType = "users" | "teachers" | "students" | "progress";

interface UserData {
  id: string;
  username: string;
  name: string;
  email: string | null;
  role: string;
  teacher_id: string | null;
  teacher_name?: string;
  is_active: boolean;
  created_at: string;
}

interface ProgressData {
  id: string;
  user_id: string;
  student_name?: string;
  xp: number;
  hearts: number;
  points: number;
  streak: number;
  hijaiyah_completed: number;
  stories_completed: number;
  hadith_completed: number;
  iqro_completed: number;
}

export default function AdminPage() {
  const router = useRouter();
  const { user, profile, isLoading: authLoading, signOut } = useAuth();

  const [activeTab, setActiveTab] = useState<TabType>("users");
  const [users, setUsers] = useState<UserData[]>([]);
  const [teachers, setTeachers] = useState<UserData[]>([]);
  const [progress, setProgress] = useState<ProgressData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  // Operation loading states
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "student" as "student" | "teacher" | "superadmin",
    teacher_id: "",
    is_active: true,
  });

  const supabase = createClient();

  // Fetch all data
  const fetchData = useCallback(
    async (showRefreshToast = false) => {
      if (!profile || profile.role !== "superadmin") return;

      if (showRefreshToast) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      try {
        // Fetch all users
        const { data: usersData, error: usersError } = await supabase
          .from("profiles")
          .select("*")
          .order("role")
          .order("name");

        if (usersError) throw usersError;

        type UserRow = {
          id: string;
          username: string;
          name: string;
          email: string | null;
          role: string;
          teacher_id: string | null;
          is_active: boolean;
          created_at: string;
        };
        const typedUsers = (usersData || []) as UserRow[];

        // Map teacher names
        const usersWithTeacher = typedUsers.map((u) => {
          const teacher = typedUsers.find((t) => t.id === u.teacher_id);
          return { ...u, teacher_name: teacher?.name || null };
        }) as UserData[];

        setUsers(usersWithTeacher);
        setTeachers(usersWithTeacher.filter((u) => u.role === "teacher"));

        // Fetch progress
        const { data: progressData } = await supabase
          .from("user_progress")
          .select("*");

        type ProgressRow = {
          id: string;
          user_id: string;
          xp: number;
          hearts: number;
          points: number;
          streak: number;
        };
        const typedProgress = (progressData || []) as ProgressRow[];

        const progressPromises = typedProgress.map(async (p) => {
          const student = usersWithTeacher.find((u) => u.id === p.user_id);
          const [hijaiyah, stories, hadith, iqro] = await Promise.all([
            supabase
              .from("hijaiyah_progress")
              .select("id", { count: "exact" })
              .eq("user_id", p.user_id)
              .eq("completed", true),
            supabase
              .from("story_progress")
              .select("id", { count: "exact" })
              .eq("user_id", p.user_id)
              .eq("completed", true),
            supabase
              .from("hadith_progress")
              .select("id", { count: "exact" })
              .eq("user_id", p.user_id)
              .eq("completed", true),
            supabase
              .from("iqro_progress")
              .select("id", { count: "exact" })
              .eq("user_id", p.user_id)
              .eq("completed", true),
          ]);

          return {
            ...p,
            student_name: student?.name || "Unknown",
            hijaiyah_completed: hijaiyah.count || 0,
            stories_completed: stories.count || 0,
            hadith_completed: hadith.count || 0,
            iqro_completed: iqro.count || 0,
          };
        });

        const progressWithDetails = await Promise.all(progressPromises);
        setProgress(progressWithDetails as ProgressData[]);

        if (showRefreshToast) {
          toast.success("Data berhasil diperbarui");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Gagal memuat data");
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [profile, supabase]
  );

  // Check authorization
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Fetch data when profile is ready
  useEffect(() => {
    if (profile?.role === "superadmin") {
      fetchData();
    }
  }, [profile, fetchData]);

  // Create user
  const handleCreateUser = async () => {
    if (!formData.email || !formData.name || !formData.password) {
      toast.error("Email, nama, dan password wajib diisi");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password minimal 6 karakter");
      return;
    }

    setIsCreating(true);

    try {
      const username = formData.email.split("@")[0].toLowerCase();
      const { data: currentSession } = await supabase.auth.getSession();

      const { data, error } = await supabase.auth.signUp({
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        options: {
          data: {
            username: username,
            name: formData.name,
            role: formData.role,
          },
        },
      });

      if (error) throw error;

      if (data.user && formData.teacher_id && formData.role === "student") {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        await (supabase as any)
          .from("profiles")
          .update({ teacher_id: formData.teacher_id })
          .eq("id", data.user.id);
        /* eslint-enable @typescript-eslint/no-explicit-any */
      }

      // Restore admin session
      if (currentSession?.session) {
        await supabase.auth.setSession({
          access_token: currentSession.session.access_token,
          refresh_token: currentSession.session.refresh_token,
        });
      }

      toast.success(`User ${formData.name} berhasil dibuat!`);
      setShowCreateModal(false);
      resetForm();
      await fetchData();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Gagal membuat user";
      if (errorMessage.includes("already registered")) {
        toast.error("Email sudah terdaftar");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsCreating(false);
    }
  };

  // Update user
  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    setIsUpdating(true);

    try {
      const updateData: Record<string, unknown> = {
        name: formData.name,
        is_active: formData.is_active,
      };

      if (formData.role === "student" && formData.teacher_id) {
        updateData.teacher_id = formData.teacher_id;
      } else if (formData.role !== "student") {
        updateData.teacher_id = null;
      }

      /* eslint-disable @typescript-eslint/no-explicit-any */
      const { error } = await (supabase as any)
        .from("profiles")
        .update(updateData)
        .eq("id", selectedUser.id);
      /* eslint-enable @typescript-eslint/no-explicit-any */

      if (error) throw error;

      toast.success(`User ${formData.name} berhasil diperbarui!`);
      setShowEditModal(false);
      setSelectedUser(null);
      resetForm();
      await fetchData();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Gagal memperbarui user";
      toast.error(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete user
  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    setIsDeleting(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", selectedUser.id);

      if (error) throw error;

      toast.success(`User ${selectedUser.name} berhasil dihapus!`);
      setShowDeleteModal(false);
      setSelectedUser(null);
      await fetchData();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Gagal menghapus user";
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      username: "",
      name: "",
      email: "",
      password: "",
      role: "student",
      teacher_id: "",
      is_active: true,
    });
  };

  const openEditModal = (user: UserData) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      name: user.name,
      email: user.email || "",
      password: "",
      role: user.role as "student" | "teacher" | "superadmin",
      teacher_id: user.teacher_id || "",
      is_active: user.is_active,
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (user: UserData) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Export functions
  const exportToExcel = () => {
    const dataToExport = activeTab === "progress" ? progress : users;
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, activeTab);
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(
      blob,
      `alifbaba_${activeTab}_${new Date().toISOString().split("T")[0]}.xlsx`
    );
    toast.success("Data berhasil diexport ke Excel");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(
      `AlifBaBa - Data ${
        activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
      }`,
      14,
      22
    );
    doc.setFontSize(10);
    doc.text(`Tanggal: ${new Date().toLocaleDateString("id-ID")}`, 14, 30);

    const dataToExport = activeTab === "progress" ? progress : users;
    const columns =
      activeTab === "progress"
        ? [
            "Nama",
            "XP",
            "Hearts",
            "Streak",
            "Hijaiyah",
            "Stories",
            "Hadith",
            "Iqro",
          ]
        : ["Username", "Nama", "Role", "Guru", "Status"];

    const rows = dataToExport.map((item) => {
      if (activeTab === "progress") {
        const p = item as ProgressData;
        return [
          p.student_name || "",
          p.xp?.toString() || "0",
          p.hearts?.toString() || "0",
          p.streak?.toString() || "0",
          p.hijaiyah_completed?.toString() || "0",
          p.stories_completed?.toString() || "0",
          p.hadith_completed?.toString() || "0",
          p.iqro_completed?.toString() || "0",
        ];
      }
      const u = item as UserData;
      return [
        u.username,
        u.name,
        u.role,
        u.teacher_name || "-",
        u.is_active ? "Aktif" : "Nonaktif",
      ];
    });

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 40,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [16, 185, 129] },
    });

    doc.save(
      `alifbaba_${activeTab}_${new Date().toISOString().split("T")[0]}.pdf`
    );
    toast.success("Data berhasil diexport ke PDF");
  };

  // Filter data
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStudents = users
    .filter((u) => u.role === "student")
    .filter(
      (u) =>
        u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.username?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const filteredProgress = progress.filter((p) =>
    p.student_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 gap-4">
        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="font-medium">Memverifikasi akses...</span>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 gap-4">
        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Silakan Login
          </h2>
          <p className="text-slate-600 mb-4">
            Anda perlu login untuk mengakses halaman ini.
          </p>
          <Button onClick={() => router.push("/login")}>Login</Button>
        </div>
      </div>
    );
  }

  // Not authorized (wait for profile to load, show loading while waiting)
  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 gap-4">
        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="font-medium">Memuat profil...</span>
        </div>
      </div>
    );
  }

  // Not superadmin
  if (profile.role !== "superadmin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 gap-4">
        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Akses Ditolak
          </h2>
          <p className="text-slate-600 mb-4">
            Hanya superadmin yang dapat mengakses halaman ini.
          </p>
          <Button onClick={() => router.push("/learn")}>Kembali</Button>
        </div>
      </div>
    );
  }

  const getCurrentData = () => {
    switch (activeTab) {
      case "teachers":
        return filteredTeachers;
      case "students":
        return filteredStudents;
      case "progress":
        return filteredProgress;
      default:
        return filteredUsers;
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-800">
                    Admin Panel
                  </h1>
                  <p className="text-xs text-slate-500">
                    {profile?.name} • {profile?.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => fetchData(true)}
                      disabled={isRefreshing}
                    >
                      <RefreshCw
                        className={`h-4 w-4 ${
                          isRefreshing ? "animate-spin" : ""
                        }`}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Refresh Data</TooltipContent>
                </Tooltip>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Keluar
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">
                      {users.length}
                    </p>
                    <p className="text-xs text-slate-500">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">
                      {teachers.length}
                    </p>
                    <p className="text-xs text-slate-500">Pengajar</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">
                      {users.filter((u) => u.role === "student").length}
                    </p>
                    <p className="text-xs text-slate-500">Siswa</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">
                      {users.filter((u) => u.role === "superadmin").length}
                    </p>
                    <p className="text-xs text-slate-500">Admin</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Card>
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as TabType)}
            >
              <div className="p-4 pb-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <TabsList className="grid grid-cols-4 w-full sm:w-auto">
                    <TabsTrigger value="users" className="gap-1.5">
                      <Users className="h-4 w-4" />
                      <span className="hidden sm:inline">Users</span>
                    </TabsTrigger>
                    <TabsTrigger value="teachers" className="gap-1.5">
                      <GraduationCap className="h-4 w-4" />
                      <span className="hidden sm:inline">Pengajar</span>
                    </TabsTrigger>
                    <TabsTrigger value="students" className="gap-1.5">
                      <BookOpen className="h-4 w-4" />
                      <span className="hidden sm:inline">Siswa</span>
                    </TabsTrigger>
                    <TabsTrigger value="progress" className="gap-1.5">
                      <Eye className="h-4 w-4" />
                      <span className="hidden sm:inline">Progress</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <div className="p-4">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Cari nama, username, atau email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => fetchData(true)}
                          disabled={isRefreshing}
                        >
                          <RefreshCw
                            className={`h-4 w-4 ${
                              isRefreshing ? "animate-spin" : ""
                            }`}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Refresh Tabel</TooltipContent>
                    </Tooltip>

                    {activeTab !== "progress" && (
                      <Button
                        onClick={() => {
                          resetForm();
                          setShowCreateModal(true);
                        }}
                      >
                        <UserPlus className="h-4 w-4 mr-1.5" />
                        Tambah User
                      </Button>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-1.5" />
                          Export
                          <ChevronDown className="h-4 w-4 ml-1.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={exportToExcel}>
                          <FileSpreadsheet className="h-4 w-4 mr-2 text-emerald-600" />
                          Export ke Excel
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={exportToPDF}>
                          <FileText className="h-4 w-4 mr-2 text-red-600" />
                          Export ke PDF
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Tables */}
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
                    <p className="text-sm text-muted-foreground">
                      Memuat data...
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Users, Teachers, Students Table */}
                    <TabsContent value="users" className="m-0">
                      <UsersTable
                        users={filteredUsers}
                        onEdit={openEditModal}
                        onDelete={openDeleteModal}
                      />
                    </TabsContent>
                    <TabsContent value="teachers" className="m-0">
                      <UsersTable
                        users={filteredTeachers}
                        onEdit={openEditModal}
                        onDelete={openDeleteModal}
                      />
                    </TabsContent>
                    <TabsContent value="students" className="m-0">
                      <UsersTable
                        users={filteredStudents}
                        onEdit={openEditModal}
                        onDelete={openDeleteModal}
                      />
                    </TabsContent>
                    <TabsContent value="progress" className="m-0">
                      <ProgressTable progress={filteredProgress} />
                    </TabsContent>
                  </>
                )}

                {/* Footer */}
                <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                  Menampilkan {getCurrentData().length} data
                </div>
              </div>
            </Tabs>
          </Card>
        </main>

        {/* Create Modal */}
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-emerald-600" />
                Tambah User Baru
              </DialogTitle>
              <DialogDescription>
                Isi form berikut untuk menambah user baru ke sistem.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(v) =>
                    setFormData({
                      ...formData,
                      role: v as "student" | "teacher" | "superadmin",
                    })
                  }
                  disabled={isCreating}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">👦 Siswa</SelectItem>
                    <SelectItem value="teacher">👨‍🏫 Pengajar</SelectItem>
                    <SelectItem value="superadmin">👑 Superadmin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="email@gmail.com"
                  disabled={isCreating}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Nama lengkap"
                  disabled={isCreating}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Minimal 6 karakter"
                  disabled={isCreating}
                />
              </div>
              {formData.role === "student" && (
                <div className="space-y-2">
                  <Label htmlFor="teacher">Assign ke Guru</Label>
                  <Select
                    value={formData.teacher_id}
                    onValueChange={(v) =>
                      setFormData({ ...formData, teacher_id: v })
                    }
                    disabled={isCreating}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih guru (opsional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tidak ada</SelectItem>
                      {teachers.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(false)}
                disabled={isCreating}
              >
                Batal
              </Button>
              <Button onClick={handleCreateUser} disabled={isCreating}>
                {isCreating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-1.5" />
                    Simpan
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Pencil className="h-5 w-5 text-blue-600" />
                Edit User
              </DialogTitle>
              <DialogDescription>
                Edit informasi user di bawah ini.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  value={formData.email}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nama Lengkap</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={isUpdating}
                />
              </div>
              {formData.role === "student" && (
                <div className="space-y-2">
                  <Label htmlFor="edit-teacher">Assign ke Guru</Label>
                  <Select
                    value={formData.teacher_id}
                    onValueChange={(v) =>
                      setFormData({ ...formData, teacher_id: v })
                    }
                    disabled={isUpdating}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih guru" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tidak ada</SelectItem>
                      {teachers.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) =>
                    setFormData({ ...formData, is_active: e.target.checked })
                  }
                  className="w-5 h-5 rounded"
                  disabled={isUpdating}
                />
                <Label htmlFor="is_active" className="cursor-pointer">
                  User aktif
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowEditModal(false)}
                disabled={isUpdating}
              >
                Batal
              </Button>
              <Button onClick={handleUpdateUser} disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1.5" />
                    Simpan
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Modal */}
        <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-red-600" />
                Hapus User?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus{" "}
                <strong>{selectedUser?.name}</strong>?
                <br />
                <span className="text-red-500 text-xs">
                  ⚠️ Semua data progress akan ikut terhapus.
                </span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteUser}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Menghapus...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-1.5" />
                    Hapus
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
}

// Users Table Component
function UsersTable({
  users,
  onEdit,
  onDelete,
}: {
  users: UserData[];
  onEdit: (user: UserData) => void;
  onDelete: (user: UserData) => void;
}) {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <Users className="h-12 w-12 text-muted-foreground/50" />
        <p className="text-muted-foreground">Tidak ada user ditemukan</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Guru</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center w-[80px]">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      u.role === "superadmin"
                        ? "bg-slate-700"
                        : u.role === "teacher"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                  >
                    {u.name?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="font-medium">{u.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {u.email || `@${u.username}`}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    u.role === "superadmin"
                      ? "default"
                      : u.role === "teacher"
                      ? "secondary"
                      : "outline"
                  }
                  className={
                    u.role === "superadmin"
                      ? "bg-slate-800"
                      : u.role === "teacher"
                      ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                      : "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                  }
                >
                  {u.role === "superadmin"
                    ? "Admin"
                    : u.role === "teacher"
                    ? "Pengajar"
                    : "Siswa"}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {u.teacher_name || "-"}
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  variant={u.is_active ? "default" : "destructive"}
                  className={
                    u.is_active
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : ""
                  }
                >
                  {u.is_active ? "Aktif" : "Nonaktif"}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(u)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    {u.role !== "superadmin" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onDelete(u)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Hapus
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Progress Table Component
function ProgressTable({ progress }: { progress: ProgressData[] }) {
  if (progress.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <Eye className="h-12 w-12 text-muted-foreground/50" />
        <p className="text-muted-foreground">Tidak ada data progress</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead className="text-center">XP</TableHead>
            <TableHead className="text-center">Hearts</TableHead>
            <TableHead className="text-center">Streak</TableHead>
            <TableHead className="text-center">Hijaiyah</TableHead>
            <TableHead className="text-center">Stories</TableHead>
            <TableHead className="text-center">Hadith</TableHead>
            <TableHead className="text-center">Iqro</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {progress.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">{p.student_name}</TableCell>
              <TableCell className="text-center">
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-700"
                >
                  {p.xp} XP
                </Badge>
              </TableCell>
              <TableCell className="text-center">{p.hearts}/5 ❤️</TableCell>
              <TableCell className="text-center">{p.streak} 🔥</TableCell>
              <TableCell className="text-center">
                {p.hijaiyah_completed}/28
              </TableCell>
              <TableCell className="text-center">
                {p.stories_completed}/7
              </TableCell>
              <TableCell className="text-center">
                {p.hadith_completed}/20
              </TableCell>
              <TableCell className="text-center">
                {p.iqro_completed}/6
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
