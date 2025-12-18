import { Loader2 } from "lucide-react";

export default function IqroLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[50vh]">
      <Loader2 className="h-12 w-12 animate-spin text-emerald-500 mb-4" />
      <p className="text-muted-foreground text-sm">Memuat Iqro...</p>
    </div>
  );
}
