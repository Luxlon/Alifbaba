import { Loader2 } from "lucide-react";

export default function IqroReaderLoading() {
  return (
    <div className="h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-b from-slate-100 to-white">
      <Loader2 className="h-14 w-14 animate-spin text-emerald-500 mb-4" />
      <p className="text-gray-600 font-medium">Memuat Iqro...</p>
      <p className="text-sm text-gray-400 mt-1">Mohon tunggu sebentar</p>
    </div>
  );
}
