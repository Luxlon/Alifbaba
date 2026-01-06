import { Loader2, Shield } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mx-auto mb-2" />
        <p className="text-sm text-slate-500">Memuat Admin Panel...</p>
      </div>
    </div>
  );
}
