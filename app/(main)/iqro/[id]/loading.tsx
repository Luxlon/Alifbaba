import { Spinner } from "@/components/ui/loader";

export default function IqroReaderLoading() {
  return (
    <div className="h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-b from-slate-100 to-white">
      {/* Book icon skeleton */}
      <div className="relative mb-6">
        <div className="w-20 h-24 bg-emerald-100 rounded-lg animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner size="md" />
        </div>
      </div>

      <p className="text-gray-600 font-medium">Memuat Iqro...</p>
      <p className="text-sm text-gray-400 mt-1">Mohon tunggu sebentar</p>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-neutral-200 rounded-full mt-4 overflow-hidden">
        <div className="h-full bg-emerald-500 rounded-full animate-[loading_1.5s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
