"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  Loader2,
  Maximize2,
  Minimize2,
  RotateCcw
} from "lucide-react";

interface PDFViewerProps {
  file: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  onNumPagesChange: (numPages: number) => void;
  isLocked: boolean;
}

export const PDFViewer = ({
  file,
  currentPage,
  onPageChange,
  onNumPagesChange,
  isLocked,
}: PDFViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfDocRef = useRef<any>(null);
  
  // Touch handling
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const isDragging = useRef(false);

  // Load PDF.js dynamically
  useEffect(() => {
    let isMounted = true;

    const loadPDF = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Dynamic import pdfjs-dist
        const pdfjsLib = await import("pdfjs-dist");
        
        // Set worker from CDN
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
        
        // Load PDF document
        const loadingTask = pdfjsLib.getDocument(file);
        const pdf = await loadingTask.promise;
        
        if (!isMounted) return;

        pdfDocRef.current = pdf;
        setNumPages(pdf.numPages);
        onNumPagesChange(pdf.numPages);
        
        // Render first page
        await renderPage(currentPage);
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading PDF:", err);
        if (isMounted) {
          setError("Gagal memuat PDF. Silakan coba lagi.");
          setIsLoading(false);
        }
      }
    };

    loadPDF();

    return () => {
      isMounted = false;
    };
  }, [file]);

  // Render page function
  const renderPage = useCallback(async (pageNum: number) => {
    if (!pdfDocRef.current || !canvasRef.current || !containerRef.current) return;
    
    try {
      const page = await pdfDocRef.current.getPage(pageNum);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      
      if (!context) return;

      // Get container dimensions
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      
      const viewport = page.getViewport({ scale: 1 });
      
      // Calculate scale to fit container with padding
      const padding = 20;
      const availableWidth = containerWidth - padding * 2;
      const availableHeight = containerHeight - padding * 2;

      const scaleX = availableWidth / viewport.width;
      const scaleY = availableHeight / viewport.height;
      const scale = Math.min(scaleX, scaleY);
      
      const scaledViewport = page.getViewport({ scale });
      
      // Set canvas dimensions with pixel ratio for sharpness
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = scaledViewport.width * pixelRatio;
      canvas.height = scaledViewport.height * pixelRatio;
      canvas.style.width = `${scaledViewport.width}px`;
      canvas.style.height = `${scaledViewport.height}px`;
      
      context.scale(pixelRatio, pixelRatio);
      
      // Render page
      const renderContext = {
        canvasContext: context,
        viewport: scaledViewport,
      };
      
      await page.render(renderContext).promise;
    } catch (err) {
      console.error("Error rendering page:", err);
    }
  }, []);

  // Re-render when page changes
  useEffect(() => {
    if (pdfDocRef.current && !isAnimating && !isLoading) {
      renderPage(currentPage);
    }
  }, [currentPage, renderPage, isAnimating, isLoading]);

  // Re-render on resize
  useEffect(() => {
    const handleResize = () => {
      if (pdfDocRef.current && !isLoading) {
        renderPage(currentPage);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentPage, renderPage, isLoading]);

  // Navigation with animation
  const goToPage = useCallback((direction: "prev" | "next") => {
    if (isLocked || isAnimating) return;
    
    const newPage = direction === "next" ? currentPage + 1 : currentPage - 1;
    if (newPage < 1 || newPage > numPages) return;

    setIsAnimating(true);
    setSlideDirection(direction === "next" ? "left" : "right");
    
    // After animation starts, change page
    setTimeout(() => {
      onPageChange(newPage);
      
      // Reset animation after page renders
      setTimeout(() => {
        setSlideDirection(null);
        setIsAnimating(false);
      }, 50);
    }, 200);
  }, [currentPage, numPages, isLocked, isAnimating, onPageChange]);

  const goToPreviousPage = () => goToPage("prev");
  const goToNextPage = () => goToPage("next");

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isLocked || isAnimating) return;
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isLocked || !isDragging.current || isAnimating) return;
    touchCurrentX.current = e.touches[0].clientX;
    const diff = touchCurrentX.current - touchStartX.current;
    
    // Limit drag
    const maxDrag = 150;
    let limitedDiff = Math.max(-maxDrag, Math.min(maxDrag, diff));
    
    // Add resistance at edges
    if ((diff > 0 && currentPage === 1) || (diff < 0 && currentPage === numPages)) {
      limitedDiff = limitedDiff * 0.3;
    }
    
    setDragOffset(limitedDiff);
  };

  const handleTouchEnd = () => {
    if (isLocked || !isDragging.current || isAnimating) return;
    isDragging.current = false;

    const diff = touchCurrentX.current - touchStartX.current;
    const threshold = 50;

    if (diff > threshold && currentPage > 1) {
      setDragOffset(0);
      goToPreviousPage();
    } else if (diff < -threshold && currentPage < numPages) {
      setDragOffset(0);
      goToNextPage();
    } else {
      // Snap back with animation
      setDragOffset(0);
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.parentElement?.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  // Retry loading
  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    window.location.reload();
  };

  // Get transform style for animation - simple fade effect
  const getTransformStyle = () => {
    if (slideDirection === "left" || slideDirection === "right") {
      return {
        opacity: 0,
        transform: "scale(0.98)",
      };
    }
    return {
      opacity: 1,
      transform: `translateX(${dragOffset}px) scale(1)`,
    };
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden min-h-0">
      {/* PDF Viewer Container */}
      <div 
        ref={containerRef}
        className="flex-1 flex items-center justify-center overflow-hidden relative bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 min-h-0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-20">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-emerald-500 mx-auto mb-4" />
              <p className="text-base text-gray-600 font-medium">Memuat Iqro...</p>
              <p className="text-sm text-gray-400 mt-1">Mohon tunggu sebentar</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-20">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">😕</span>
              </div>
              <p className="text-red-600 font-medium mb-4">{error}</p>
              <Button onClick={handleRetry} variant="secondary" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Coba Lagi
              </Button>
            </div>
          </div>
        )}

        {/* Canvas Container with Animation */}
        {!error && (
          <div 
            className="relative transition-all duration-150 ease-out"
            style={getTransformStyle()}
          >
            {/* Paper shadow effect */}
            <div 
              className="absolute inset-0 bg-black/10 rounded-lg blur-md translate-x-2 translate-y-2"
            />
            
            {/* Canvas for PDF rendering */}
            <canvas 
              ref={canvasRef}
              className="rounded-lg shadow-xl bg-white relative z-10"
              style={{ 
                display: isLoading ? "none" : "block",
                maxWidth: "100%", 
                maxHeight: "100%" 
              }}
            />
          </div>
        )}

        {/* Swipe Indicators (Mobile Only) */}
        {!isLocked && !isLoading && !error && (
          <>
            {currentPage > 1 && (
              <button 
                onClick={goToPreviousPage}
                className="absolute left-0 top-0 bottom-0 w-14 flex items-center justify-start pl-1 lg:hidden z-10"
                aria-label="Halaman sebelumnya"
              >
                <div className="h-24 w-10 bg-gradient-to-r from-black/30 to-transparent rounded-r-full flex items-center justify-center backdrop-blur-sm">
                  <ChevronLeft className="h-6 w-6 text-white drop-shadow-md" />
                </div>
              </button>
            )}
            {currentPage < numPages && (
              <button 
                onClick={goToNextPage}
                className="absolute right-0 top-0 bottom-0 w-14 flex items-center justify-end pr-1 lg:hidden z-10"
                aria-label="Halaman selanjutnya"
              >
                <div className="h-24 w-10 bg-gradient-to-l from-black/30 to-transparent rounded-l-full flex items-center justify-center backdrop-blur-sm">
                  <ChevronRight className="h-6 w-6 text-white drop-shadow-md" />
                </div>
              </button>
            )}
          </>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="shrink-0 bg-white border-t px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {/* Previous Button */}
          <Button
            variant="secondaryOutline"
            size="sm"
            onClick={goToPreviousPage}
            disabled={currentPage <= 1 || isLocked || isAnimating}
            className="h-11 px-4 gap-1"
          >
            {isAnimating && slideDirection === "right" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
            <span className="hidden sm:inline">Sebelumnya</span>
          </Button>

          {/* Page Info & Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">
              <input
                type="number"
                min={1}
                max={numPages}
                value={currentPage}
                onChange={(e) => {
                  const page = parseInt(e.target.value);
                  if (page >= 1 && page <= numPages && !isLocked) {
                    onPageChange(page);
                  }
                }}
                disabled={isLocked || isLoading}
                className="w-8 text-center text-sm font-semibold bg-transparent border-0 focus:outline-none"
              />
              <span className="text-sm text-slate-500 ml-1">/ {numPages || "..."}</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="h-9 w-9 p-0 hidden sm:flex"
              title={isFullscreen ? "Keluar fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Next Button */}
          <Button
            variant="secondaryOutline"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage >= numPages || isLocked || isAnimating}
            className="h-11 px-4 gap-1"
          >
            <span className="hidden sm:inline">Selanjutnya</span>
            {isAnimating && slideDirection === "left" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
