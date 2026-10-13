import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  RotateCcw, 
  ArrowLeft, 
  Award, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  BookOpen,
  Printer,
  Share2,
  Check
} from 'lucide-react';
import { ExamSet } from '../types';

interface ResultSummaryProps {
  exam: ExamSet;
  score: number;
  correctCount: number;
  timeSpentSeconds: number;
  domainScores: Record<string, { correct: number; total: number }>;
  userAnswers: Record<string | number, number[]>;
  flagged: Set<string | number>;
  onRetry: () => void;
  onPickOther: () => void;
  onJumpToQuestion: (id: string | number) => void;
}

const PASS_RATIO = 0.7;

const fmtTime = (s: number) => {
  const mins = Math.floor(s / 60);
  const secs = String(s % 60).padStart(2, '0');
  return `${mins} phút ${secs} giây`;
};

/** Half-circle official gauge for the 100-1000 Pearson VUE scaled score */
const ScoreGauge: React.FC<{ score: number; passing: number; passed: boolean }> = ({ score, passing, passed }) => {
  const reduce = useReducedMotion();
  const R = 100;
  const C = Math.PI * R;
  const frac = (v: number) => Math.max(0, Math.min(1, (v - 100) / 900));
  const passAngle = Math.PI * (1 - frac(passing));
  const mx = 130 + Math.cos(passAngle) * R;
  const my = 130 - Math.sin(passAngle) * R;
  const mx2 = 130 + Math.cos(passAngle) * (R + 14);
  const my2 = 130 - Math.sin(passAngle) * (R + 14);

  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      <svg viewBox="0 0 260 145" className="w-full" role="img" aria-label={`Điểm thi ${score} trên 1000, điểm đạt ${passing}`}>
        {/* Background track */}
        <path 
          d="M20 130A100 100 0 0 1 240 130" 
          fill="none" 
          stroke="var(--color-slate-800)" 
          strokeWidth="16" 
          strokeLinecap="round" 
        />

        {/* Animated score arc */}
        <motion.path
          d="M20 130A100 100 0 0 1 240 130"
          fill="none"
          stroke={passed ? 'var(--color-emerald-500)' : 'var(--color-rose-500)'}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: reduce ? C * (1 - frac(score)) : C }}
          animate={{ strokeDashoffset: C * (1 - frac(score)) }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Passing threshold needle marker */}
        <line x1={mx} y1={my} x2={mx2} y2={my2} stroke="var(--color-amber-400)" strokeWidth="3" />
      </svg>

      <div className="absolute inset-x-0 bottom-0 text-center">
        <div className="font-mono text-5xl sm:text-6xl font-black tabular-nums tracking-tight text-white">
          {score}
        </div>
        <div className="text-xs font-semibold text-slate-400 mt-0.5">
          Thang điểm 100 – 1000 (Đạt từ {passing})
        </div>
      </div>
    </div>
  );
};

export const ResultSummary: React.FC<ResultSummaryProps> = ({
  exam,
  score,
  correctCount,
  timeSpentSeconds,
  domainScores,
  userAnswers,
  flagged,
  onRetry,
  onPickOther,
  onJumpToQuestion,
}) => {
  const reduce = useReducedMotion();
  const passed = score >= exam.passingScore;
  const total = exam.questions.length;
  
  const rows = Object.entries(domainScores)
    .map(([name, v]) => ({ name, ...v, pct: v.total ? v.correct / v.total : 0 }))
    .sort((a, b) => a.pct - b.pct);
    
  const weakest = rows.find((r) => r.pct < PASS_RATIO);

  return (
    <section aria-label="Báo cáo kết quả bài thi" className="machined-card rounded-3xl p-6 sm:p-8 lg:p-10 space-y-10 relative overflow-hidden">
      {/* Ambient glow based on pass/fail */}
      <div className={`absolute -right-20 -top-20 h-96 w-96 rounded-full blur-3xl pointer-events-none opacity-20 ${
        passed ? 'bg-emerald-500' : 'bg-rose-500'
      }`} />

      {/* Top Banner: Pearson VUE Official Score Report Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-slate-900/80 px-3 py-1 text-xs font-semibold text-slate-300 mb-2">
            <Award className="h-3.5 w-3.5 text-orange-400" />
            <span>OFFICIAL SCORE REPORT • AWS CERTIFIED CLOUD PRACTITIONER (CLF-C02)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {exam.titleVi || exam.title}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Báo cáo đánh giá năng lực chi tiết theo tiêu chuẩn kỳ thi chính thức của Amazon Web Services.
          </p>
        </div>

        {/* Pass/Fail Status Seal */}
        <div className={`flex items-center gap-2.5 rounded-2xl border px-4 py-2.5 ${
          passed 
            ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300' 
            : 'border-rose-500/40 bg-rose-500/15 text-rose-300'
        }`}>
          {passed ? (
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
          ) : (
            <XCircle className="h-6 w-6 text-rose-400" />
          )}
          <div>
            <span className="block font-black text-sm uppercase tracking-wider">
              {passed ? 'PASS • ĐÃ ĐẠT CHUẨN' : 'DID NOT PASS • CHƯA ĐẠT'}
            </span>
            <span className="block text-[11px] opacity-80">
              {passed ? 'Chúc mừng bạn đủ điều kiện đỗ kỳ thi thật!' : 'Khuyến nghị ôn lại các Domain yếu trước khi thi.'}
            </span>
          </div>
        </div>
      </div>

      {/* Score and Core Metrics Grid */}
      <div className="grid gap-10 lg:grid-cols-[340px_1fr] lg:items-center relative z-10">
        {/* Score Gauge Card */}
        <div className="machined-inner rounded-3xl p-6 text-center space-y-4">
          <ScoreGauge score={score} passing={exam.passingScore} passed={passed} />
          
          <div className="pt-2">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
              passed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
            }`}>
              {passed ? 'ĐẠT ĐIỂM CHUẨN AWS' : 'CẦN LUYỆN TẬP THÊM'}
            </span>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="space-y-6">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="machined-inner rounded-2xl p-4">
              <dt className="text-[11px] font-semibold text-slate-400">Số câu đúng</dt>
              <dd className="mt-1 font-mono text-2xl font-bold tabular-nums text-white">
                {correctCount}<span className="text-slate-500 text-sm font-normal">/{total}</span>
              </dd>
            </div>

            <div className="machined-inner rounded-2xl p-4">
              <dt className="text-[11px] font-semibold text-slate-400">Tỉ lệ chính xác</dt>
              <dd className="mt-1 font-mono text-2xl font-bold tabular-nums text-white">
                {Math.round((correctCount / (total || 1)) * 100)}%
              </dd>
            </div>

            <div className="machined-inner rounded-2xl p-4">
              <dt className="text-[11px] font-semibold text-slate-400">Thời gian làm bài</dt>
              <dd className="mt-1 font-mono text-sm font-bold text-slate-200">
                {fmtTime(Math.max(0, timeSpentSeconds))}
              </dd>
            </div>

            <div className="machined-inner rounded-2xl p-4">
              <dt className="text-[11px] font-semibold text-slate-400">Câu đã gắn cờ</dt>
              <dd className="mt-1 font-mono text-2xl font-bold tabular-nums text-amber-400">
                {flagged.size}
              </dd>
            </div>
          </dl>

          {/* Remedial Guidance Note */}
          {weakest ? (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-4 text-xs sm:text-sm text-slate-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-rose-400">
                <AlertCircle className="h-4 w-4" />
                <span>Khuyến nghị cải thiện trọng tâm:</span>
              </div>
              <p className="leading-relaxed">
                Nhóm kiến thức cần củng cố nhất: <strong className="text-white font-semibold">{weakest.name}</strong> với tỉ lệ đạt{' '}
                <span className="font-mono font-bold text-rose-300">{Math.round(weakest.pct * 100)}%</span> (dưới mốc an toàn 70%). 
                Hãy bấm lọc "Câu Sai" ở dưới để xem lại giải thích và học lại các bài giảng tương ứng.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-xs sm:text-sm text-slate-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-emerald-400">
                <Sparkles className="h-4 w-4" />
                <span>Năng lực đồng đều xuất sắc:</span>
              </div>
              <p className="leading-relaxed">
                Bạn đạt trên 70% ở tất cả 4 Domain của kỳ thi CLF-C02. Bạn hoàn toàn sẵn sàng đăng ký thi thật tại Pearson VUE!
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onRetry}
              className="flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-500 px-6 text-xs sm:text-sm font-bold text-slate-950 shadow-md shadow-orange-500/20 hover:scale-[1.02] transition-all"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>Thi Lại Đề Này</span>
            </button>

            <button
              onClick={onPickOther}
              className="flex h-11 items-center gap-2 rounded-2xl border border-white/[0.08] bg-slate-800/80 px-6 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-700/80 transition"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Chọn Đề Thi Khác</span>
            </button>
          </div>
        </div>
      </div>

      {/* Domain Performance & Question Map */}
      <div className="grid gap-8 lg:grid-cols-2 pt-6 border-t border-white/[0.08] relative z-10">
        
        {/* Domain Competency Table */}
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-400" />
              <span>Đánh Giá Năng Lực Theo 4 Domain AWS</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Vạch mốc chuẩn đạt yêu cầu là 70%.</p>
          </div>

          <ul className="space-y-4">
            {rows.map((r, i) => {
              const ok = r.pct >= PASS_RATIO;
              return (
                <li key={r.name} className="machined-inner rounded-2xl p-4 space-y-2">
                  <div className="flex items-baseline justify-between gap-4 text-xs sm:text-sm">
                    <span className="font-medium text-slate-200">{r.name}</span>
                    <span className="font-mono tabular-nums text-slate-300 font-bold">
                      {r.correct}/{r.total} ({Math.round(r.pct * 100)}%){' '}
                      <span className={ok ? 'text-emerald-400' : 'text-rose-400'}>
                        {ok ? '• ĐẠT' : '• CẦN ÔN'}
                      </span>
                    </span>
                  </div>

                  <div className="relative h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${ok ? 'bg-emerald-500' : 'bg-rose-500'}`}
                      initial={reduce ? false : { width: 0 }}
                      animate={{ width: `${r.pct * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <span className="absolute top-0 bottom-0 w-0.5 bg-amber-400" style={{ left: `${PASS_RATIO * 100}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Question Map */}
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="h-4 w-4 text-orange-400" />
              <span>Bản Đồ Câu Hỏi (Bấm để nhảy tới câu)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Màu xanh: Đúng • Màu đỏ: Sai • Màu xám: Bỏ qua.</p>
          </div>

          <div className="machined-inner rounded-2xl p-4">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(2.4rem,1fr))] gap-1.5 max-h-72 overflow-y-auto pr-1 no-scrollbar">
              {exam.questions.map((q, i) => {
                const sel = userAnswers[q.id] || [];
                const right = sel.length === q.correctAnswers.length && sel.every((a) => q.correctAnswers.includes(a));
                const skipped = sel.length === 0;

                return (
                  <button
                    key={q.id}
                    onClick={() => onJumpToQuestion(q.id)}
                    aria-label={`Câu ${i + 1}: ${right ? 'đúng' : skipped ? 'bỏ trống' : 'sai'}`}
                    className={`relative h-9 rounded-lg border font-mono text-xs font-bold tabular-nums transition hover:scale-105 ${
                      right
                        ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300'
                        : skipped
                          ? 'border-slate-700 bg-slate-800 text-slate-400'
                          : 'border-rose-500/40 bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {i + 1}
                    {flagged.has(q.id) && (
                      <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-amber-400 shadow" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400 pt-3 border-t border-white/[0.04]">
              <span className="flex items-center gap-1.5"><i className="h-3 w-3 rounded bg-emerald-500/40" />Đúng ({correctCount})</span>
              <span className="flex items-center gap-1.5"><i className="h-3 w-3 rounded bg-rose-500/40" />Sai ({total - correctCount})</span>
              <span className="flex items-center gap-1.5"><i className="h-3 w-3 rounded bg-slate-700" />Bỏ trống</span>
              <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-amber-400" />Gắn cờ</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
