import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ExplanationFallbackProps {
  loading: boolean;
  failed: boolean;
  /** False when the app has no Supabase keys, so detailed explanations can never load. */
  configured: boolean;
  onRetry: () => void;
  /** Short built-in explanation (older exams) shown when there is nothing detailed to show. */
  legacyText?: string;
}

/** Placeholder while a detailed explanation loads, or an honest message when it could not be loaded. */
export const ExplanationFallback: React.FC<ExplanationFallbackProps> = ({ loading, failed, configured, onRetry, legacyText }) => {
  if (loading) {
    return (
      <div role="status" aria-label="Đang tải giải thích chi tiết" className="space-y-3 rounded-2xl border border-white/[0.06] bg-slate-950/70 p-5">
        <div className="skeleton h-3 w-24" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-5/6" />
        <div className="skeleton h-16 w-full" />
      </div>
    );
  }
  if (failed || !configured) {
    return (
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-orange-500/30 bg-orange-500/[0.06] p-4 text-sm text-orange-100">
        <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="min-w-0 flex-1">
          {configured
            ? 'Không tải được giải thích chi tiết. Kiểm tra kết nối mạng rồi thử lại.'
            : 'Giải thích chi tiết cần kết nối Supabase (chưa cấu hình VITE_SUPABASE_URL và VITE_SUPABASE_PUBLISHABLE_KEY).'}
        </span>
        {configured && (
          <button onClick={onRetry} className="flex h-9 items-center gap-1.5 rounded-lg bg-orange-500 px-3 text-xs font-semibold text-slate-950 hover:bg-orange-400">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Thử lại
          </button>
        )}
      </div>
    );
  }
  if (!legacyText) return null;
  return (
    <div className="space-y-1.5 rounded-2xl border border-white/[0.06] bg-slate-950/70 p-4 text-xs sm:text-sm">
      <div className="flex items-center gap-1.5 font-bold text-amber-400">
        <AlertCircle className="h-4 w-4" aria-hidden="true" />
        <span>Giải thích:</span>
      </div>
      <p className="leading-relaxed text-slate-200">{legacyText}</p>
    </div>
  );
};
