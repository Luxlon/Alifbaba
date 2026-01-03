"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { IQRO_DATA } from "@/constants";
import { Button } from "@/components/ui/button";
import { useLessonProgress } from "@/store/use-lesson-progress";
import { 
  X, 
  Lock, 
  Unlock, 
  Loader2
} from "lucide-react";
import { toast } from "sonner";

// Dynamic import for PDF viewer (disable SSR)
const PDFViewer = dynamic(
  () => import("@/components/pdf-viewer").then((mod) => mod.PDFViewer),
  { 
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Memuat PDF viewer...</p>
        </div>
      </div>
    )
  }
);

const IqroReaderPage = () => {
  const params = useParams();
  const router = useRouter();
  const iqroId = Number(params?.id);

  // Find the iqro data
  const iqro = IQRO_DATA.find((i) => i.id === iqroId);

  // State
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLocked, setIsLocked] = useState(false);

  // Store
  const { updateIqroProgress, getIqroProgress } = useLessonProgress();

  // Load saved progress
  useEffect(() => {
    if (getIqroProgress) {
      const saved = getIqroProgress(iqroId);
      if (saved?.currentPage) {
        setCurrentPage(saved.currentPage);
      }
    }
  }, [iqroId, getIqroProgress]);

  // Save progress
  useEffect(() => {
    if (numPages > 0 && updateIqroProgress) {
      updateIqroProgress(iqroId, currentPage, numPages, currentPage >= numPages);
    }
  }, [currentPage, numPages, iqroId, updateIqroProgress]);

  // Redirect if iqro not found
  useEffect(() => {
    if (!iqro) {
      router.push("/iqro");
    }
  }, [iqro, router]);

  if (!iqro) return null;

  // Toggle lock
  const toggleLock = () => {
    setIsLocked(!isLocked);
    toast.success(isLocked ? "Layar dibuka 🔓" : "Layar dikunci 🔒", {
      description: isLocked ? "Kamu bisa geser halaman" : "Halaman tidak bisa digeser",
    });
  };

  // Handle close
  const handleClose = () => {
    router.push("/iqro");
  };

  return (
    <div className="h-[100dvh] bg-gradient-to-b from-slate-100 to-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="shrink-0 z-50 bg-white/95 backdrop-blur-sm border-b px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {/* Close Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClose}
            className="h-8 w-8 sm:h-9 sm:w-9 p-0"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>

          {/* Title & Page Info */}
          <div className="text-center flex-1 px-2">
            <h1 className="font-bold text-sm sm:text-base">{iqro.title}</h1>
            <p className="text-xs text-muted-foreground">
              Halaman {currentPage} dari {numPages || "..."}
            </p>
          </div>

          {/* Lock Button */}
          <Button
            variant={isLocked ? "default" : "ghost"}
            size="sm"
            onClick={toggleLock}
            className={`h-8 w-8 sm:h-9 sm:w-9 p-0 ${isLocked ? "bg-red-500 hover:bg-red-600" : ""}`}
          >
            {isLocked ? (
              <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            ) : (
              <Unlock className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mt-2">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${numPages > 0 ? (currentPage / numPages) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lock Indicator Overlay */}
      {isLocked && (
        <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
          <div className="absolute top-20 right-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg">
            <Lock className="h-3 w-3" />
            Terkunci
          </div>
        </div>
      )}

      {/* PDF Viewer Component - fills remaining space */}
      <PDFViewer
        file={iqro.file}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onNumPagesChange={setNumPages}
        isLocked={isLocked}
      />
    </div>
  );
};

export default IqroReaderPage;
