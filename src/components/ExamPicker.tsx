import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  Clock, 
  Play, 
  Search, 
  Check, 
  ListChecks, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  HelpCircle,
  Flame,
  ArrowRight
} from 'lucide-react';
import { ExamSet, ExamAttempt, ExamSession } from '../types';
import { getExamAttempts } from '../utils/storage';

type Category = 'all' | 'notebook' | 'mixed' | 'practice' | 'core' | 'custom';
type Status = 'any' | 'new' | 'passed' | 'failed';

const CATEGORY_LABEL: Record<Category, string> = {
  all: 'Tất cả bộ đề',
  notebook: 'Sổ tay câu sai',
  mixed: 'Đề thi tổng hợp 65 câu',
  practice: 'Luyện tập theo số',
  core: 'Đề biên soạn trọng tâm',
  custom: 'Đề tùy chỉnh của bạn',
};

const STATUS_LABEL: Record<Status, string> = {
  any: 'Mọi trạng thái',
  new: 'Chưa làm',
  passed: 'Đã đạt (≥ 700đ)',
  failed: 'Chưa đạt (< 700đ)',
};

const cleanTitle = (e: ExamSet) => (e.titleVi || e.title).replace(/\s*\([^)]*\)\s*$/, '');

const categoryOf = (e: ExamSet): Exclude<Category, 'all'> => {
  if (e.id === 'wrong-notebook') return 'notebook';
  if (e.isCustom) return 'custom';
  if (e.id.startsWith('dump-mixed')) return 'mixed';
  if (e.id.startsWith('dump-exam')) return 'practice';
  return 'core';
};

interface ExamPickerProps {
  exams: ExamSet[];
  selectedExamId: string;
  onSelect: (id: string) => void;
  examMode: 'strict' | 'practice';
  onModeChange: (mode: 'strict' | 'practice') => void;
  onStart: () => void;
  savedSessions?: Record<string, ExamSession>;
  resume?: { session: ExamSession; exam: ExamSet } | null;
  onResume?: (examId?: string) => void;
  /** Per exam: distinct questions answered so far and how many were right the last time. */
  coverage?: Record<string, { seen: number; correct: number }>;
  onDiscardResume?: (examId?: string) => void;
}

export const ExamPicker: React.FC<ExamPickerProps> = ({
  exams,
  selectedExamId,
  onSelect,
  examMode,
  onModeChange,
  onStart,
  savedSessions,
  resume,
  onResume,
  coverage,
  onDiscardResume,
}) => {
  const reduce = useReducedMotion();
  const [category, setCategory] = useState<Category>('all');
  const [status, setStatus] = useState<Status>('any');
  const [query, setQuery] = useState('');

  const attempts: ExamAttempt[] = useMemo(() => getExamAttempts(), []);

  const inProgressList = useMemo(() => {
    if (savedSessions) {
      return Object.values(savedSessions)
        .map((s) => {
          const ex = exams.find((e) => e.id === s.examId);
          return ex ? { session: s, exam: ex } : null;
        })
        .filter((item): item is { session: ExamSession; exam: ExamSet } => item !== null)
        .sort((a, b) => b.session.updatedAt - a.session.updatedAt);
    }
    return resume ? [resume] : [];
  }, [savedSessions, exams, resume]);
  
  const statsByExam = useMemo(() => {
    const map: Record<string, { best: number; count: number; lastDate: string }> = {};
    attempts.forEach((a) => {
      const cur = map[a.examId];
      map[a.examId] = { 
        best: Math.max(cur?.best ?? 0, a.score), 
        count: (cur?.count ?? 0) + 1,
        lastDate: a.date 
      };
    });
    return map;
  }, [attempts]);

  const counts = useMemo(() => {
    const c: Record<Category, number> = { all: exams.length, notebook: 0, mixed: 0, practice: 0, core: 0, custom: 0 };
    exams.forEach((e) => (c[categoryOf(e)] += 1));
    return c;
  }, [exams]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return exams.filter((e) => {
      if (category !== 'all' && categoryOf(e) !== category) return false;
      const s = statsByExam[e.id];
      if (status === 'new' && s) return false;
      if (status === 'passed' && !(s && s.best >= e.passingScore)) return false;
      if (status === 'failed' && !(s && s.best < e.passingScore)) return false;
      if (q && !`${e.title} ${e.titleVi ?? ''} ${e.description ?? ''}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [exams, category, status, query, statsByExam]);

  const selected = exams.find((e) => e.id === selectedExamId);
  const totalQuestions = exams.reduce((n, e) => n + e.questions.length, 0);
  const doneCount = Object.keys(statsByExam).length;
  const highestScore = attempts.length ? Math.max(...attempts.map((a) => a.score)) : null;

  return (
    <div className="px-4 pb-36 pt-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* ================= IN-PROGRESS SESSIONS BANNER / CARDS ================= */}
      {inProgressList.length === 1 && (() => {
        const item = inProgressList[0];
        const answeredCount = Object.values(item.session.answers).filter((a) => a.length > 0).length;
        const minsLeft = item.session.remainingSeconds != null
          ? Math.max(1, Math.ceil(item.session.remainingSeconds / 60))
          : Math.max(1, Math.ceil((item.session.endsAt - Date.now()) / 60000));

        return (
          <section aria-label="Bài đang làm dở" className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-orange-500/40 bg-orange-500/[0.07] px-5 py-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-orange-400 animate-ping" />
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">Bài thi đang làm dở</p>
              </div>
              <p className="mt-0.5 truncate text-base font-semibold text-slate-50">{cleanTitle(item.exam)}</p>
              <p className="mt-1 text-sm text-slate-300">
                Đang dừng tại câu <strong className="text-white">{(item.session.currentIndex ?? 0) + 1}</strong> • Đã trả lời{' '}
                <span className="font-mono tabular-nums text-orange-300 font-bold">
                  {answeredCount}/{item.exam.questions.length}
                </span>{' '}
                câu
                {item.session.mode === 'strict' ? (
                  <>
                    {' '}• Còn lại{' '}
                    <span className="font-mono tabular-nums text-orange-300 font-bold">{minsLeft}</span> phút
                  </>
                ) : (
                  ' • Chế độ luyện tập'
                )}
              </p>
            </div>
            <button
              onClick={() => onDiscardResume?.(item.exam.id)}
              className="h-10 rounded-lg px-4 text-sm font-medium text-slate-300 hover:text-white transition"
            >
              Bỏ bài này
            </button>
            <button
              onClick={() => onResume?.(item.exam.id)}
              className="flex h-10 items-center gap-2 rounded-xl bg-orange-500 px-5 text-sm font-semibold text-slate-950 hover:bg-orange-400 transition shadow-lg shadow-orange-500/20"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              Tiếp tục làm bài
            </button>
          </section>
        );
      })()}

      {inProgressList.length > 1 && (
        <section aria-label="Các bài đang làm dở" className="rounded-3xl border border-orange-500/40 bg-orange-500/[0.05] p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-orange-400 animate-ping" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-orange-300">
                Bạn có {inProgressList.length} bài thi đang làm dở
              </h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">Tiến độ được lưu độc lập từng bài thi</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {inProgressList.map((item) => {
              const answeredCount = Object.values(item.session.answers).filter((a) => a.length > 0).length;
              const minsLeft = item.session.remainingSeconds != null
                ? Math.max(1, Math.ceil(item.session.remainingSeconds / 60))
                : Math.max(1, Math.ceil((item.session.endsAt - Date.now()) / 60000));

              return (
                <div
                  key={item.exam.id}
                  className="machined-card rounded-2xl p-4 flex flex-col justify-between space-y-3 border-orange-500/30 hover:border-orange-500/60 transition"
                >
                  <div>
                    <h3 className="text-sm font-bold text-white line-clamp-1">{cleanTitle(item.exam)}</h3>
                    <p className="mt-1 text-xs text-slate-300">
                      Câu <strong className="text-white font-mono">{(item.session.currentIndex ?? 0) + 1}</strong> • Đã làm{' '}
                      <span className="font-mono text-orange-300 font-bold">{answeredCount}/{item.exam.questions.length}</span>
                      {item.session.mode === 'strict' && ` • Còn ${minsLeft}p`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
                    <button
                      onClick={() => onDiscardResume?.(item.exam.id)}
                      className="px-2 py-1 text-xs text-slate-400 hover:text-rose-300 transition"
                    >
                      Bỏ bài
                    </button>
                    <button
                      onClick={() => onResume?.(item.exam.id)}
                      className="ml-auto flex items-center gap-1.5 rounded-xl bg-orange-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-orange-400 transition"
                    >
                      <Play className="h-3 w-3 fill-current" />
                      Tiếp tục
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ================= HERO INTRO SECTION ================= */}
      <section className="machined-card rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
        {/* Ambient Glow Orb */}
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-300 mb-3">
              <Award className="h-3.5 w-3.5 text-orange-400" />
              <span>HỆ THỐNG MÔ PHÒNG PHÒNG THI CHUẨN PEARSON VUE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.08] tracking-tight text-white">
              Luyện Thi Thử <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                Chính Xác Như Thi Thật
              </span>
            </h1>

            <p className="mt-4 max-w-[54ch] text-sm sm:text-base leading-relaxed text-slate-300">
              Ngân hàng đề tuyển chọn gồm <strong className="text-white font-semibold">{totalQuestions.toLocaleString('vi-VN')} câu hỏi</strong> trong <strong className="text-white font-semibold">{exams.length} bộ đề</strong>. 
              Các bộ đề tổng hợp 65 câu mô phỏng 100% thời gian (90 phút), cấu trúc phân bổ 4 Domain và thang điểm chuẩn 100 - 1000.
            </p>

            {/* KPI Metrics */}
            <dl className="mt-8 grid grid-cols-3 gap-4 sm:gap-6 border-t border-white/[0.08] pt-6">
              <div className="machined-inner rounded-2xl p-3.5 text-left">
                <dt className="text-[11px] font-semibold text-slate-400">Đã hoàn thành</dt>
                <dd className="mt-1 font-mono text-2xl font-bold tabular-nums text-white">
                  {doneCount}<span className="text-slate-500 text-sm font-normal">/{exams.length}</span>
                </dd>
              </div>

              <div className="machined-inner rounded-2xl p-3.5 text-left">
                <dt className="text-[11px] font-semibold text-slate-400">Lượt thi thử</dt>
                <dd className="mt-1 font-mono text-2xl font-bold tabular-nums text-white">
                  {attempts.length}
                </dd>
              </div>

              <div className="machined-inner rounded-2xl p-3.5 text-left">
                <dt className="text-[11px] font-semibold text-slate-400">Điểm kỷ lục</dt>
                <dd className="mt-1 font-mono text-2xl font-bold tabular-nums text-orange-400">
                  {highestScore !== null ? `${highestScore}đ` : '—'}
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Hero Illustration */}
          <div className="relative group">
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl bg-slate-900/80">
              <img
                src="/illustrations/cloud-hero.svg"
                alt="Minh họa hệ thống điện toán đám mây AWS"
                width={640}
                height={420}
                className="w-full h-auto object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating exam card badge */}
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/[0.1] bg-slate-950/90 backdrop-blur-xl p-3.5 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    ✓
                  </span>
                  <div>
                    <span className="block text-xs font-bold text-white">Chuẩn Kiến Thức AWS CLF-C02 2026</span>
                    <span className="block text-[11px] text-slate-400">Cập nhật dịch vụ mới nhất &amp; mẹo bẫy thi</span>
                  </div>
                </div>
                <span className="rounded-md bg-orange-500/20 px-2 py-0.5 font-mono text-[11px] font-bold text-orange-300">
                  700/1000 PASS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FILTER AND SEARCH BAR ================= */}
      <section aria-label="Bộ lọc đề thi" className="machined-card rounded-2xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Category Pills */}
          <div role="group" aria-label="Loại đề thi" className="flex flex-wrap gap-1.5">
            {(Object.keys(CATEGORY_LABEL) as Category[])
              .filter((k) => counts[k] > 0)
              .map((k) => (
                <button
                  key={k}
                  onClick={() => setCategory(k)}
                  aria-pressed={category === k}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                    category === k
                      ? 'bg-gradient-to-r from-orange-400 to-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'border border-white/[0.06] bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                >
                  <span>{CATEGORY_LABEL[k]}</span>
                  <span className={`font-mono text-[10px] rounded px-1.5 py-0.2 ${
                    category === k ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-900 text-slate-400'
                  }`}>
                    {counts[k]}
                  </span>
                </button>
              ))}
          </div>

          {/* Right Tools: Status Dropdown & Search Input */}
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto ml-auto">
            <select
              aria-label="Lọc theo trạng thái"
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              className="h-9 rounded-xl border border-white/[0.08] bg-slate-900/90 px-3 text-xs text-slate-200 focus:border-orange-500 focus:outline-none"
            >
              {(Object.keys(STATUS_LABEL) as Status[]).map((k) => (
                <option key={k} value={k}>{STATUS_LABEL[k]}</option>
              ))}
            </select>

            <div className="relative flex-1 sm:w-60">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                type="search"
                aria-label="Tìm bộ đề"
                placeholder="Tìm tên bộ đề, mô tả..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-9 w-full rounded-xl border border-white/[0.08] bg-slate-900/90 pl-8 pr-3 text-xs text-slate-100 placeholder-slate-400 focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ================= EXAM CARDS GRID ================= */}
      {visible.length === 0 ? (
        <div className="machined-inner rounded-3xl p-16 text-center border-dashed border-slate-700">
          <ListChecks className="mx-auto h-10 w-10 text-slate-500" aria-hidden="true" />
          <h3 className="mt-3 text-base font-bold text-white">Không có bộ đề nào khớp bộ lọc</h3>
          <p className="text-xs text-slate-400 mt-1">Thử chọn danh mục khác hoặc xóa từ khóa tìm kiếm.</p>
          <button
            onClick={() => { setCategory('all'); setStatus('any'); setQuery(''); }}
            className="mt-4 rounded-xl border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-xs font-semibold text-orange-400 hover:bg-orange-500/20 transition"
          >
            Khôi phục bộ lọc mặc định
          </button>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((ex, i) => {
            const s = statsByExam[ex.id];
            const isSel = ex.id === selectedExamId;
            const pausedSession = savedSessions ? savedSessions[ex.id] : (resume?.exam.id === ex.id ? resume.session : null);
            const isPaused = !!pausedSession;
            const passed = s && s.best >= ex.passingScore;
            const pct = s ? Math.max(0, Math.min(100, ((s.best - 100) / 900) * 100)) : 0;
            const passPct = ((ex.passingScore - 100) / 900) * 100;
            const cat = categoryOf(ex);

            return (
              <motion.li
                key={ex.id}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(i, 9) * 0.03, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <button
                  onClick={() => onSelect(ex.id)}
                  aria-pressed={isSel}
                  className={`group relative flex h-full w-full flex-col rounded-3xl p-5 sm:p-6 text-left transition-all duration-200 cursor-pointer ${
                    isSel
                      ? 'border-2 border-orange-500 bg-slate-900 shadow-xl ring-2 ring-orange-500/20 shadow-orange-500/10'
                      : isPaused
                      ? 'border border-orange-500/40 bg-slate-900/80 shadow-lg shadow-orange-500/5 hover:border-orange-500/60 hover:bg-slate-900'
                      : 'machined-card hover:border-orange-500/40 hover:bg-slate-900/90'
                  }`}
                >
                  {/* Top Bar: Category pill, in-progress badge & Selected Tick */}
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="rounded-md border border-white/[0.08] bg-slate-950/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {CATEGORY_LABEL[cat]}
                      </span>
                      {isPaused && pausedSession && (
                        <span className="flex items-center gap-1.5 rounded-full border border-orange-500/50 bg-orange-500/20 px-2 py-0.5 text-[10px] font-bold text-orange-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                          Đang làm dở ({Object.values(pausedSession.answers).filter((a) => a.length > 0).length}/{ex.questions.length})
                        </span>
                      )}
                    </div>

                    {isSel ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-500 text-slate-950 font-black shadow-md shadow-orange-500/30">
                        <Check className="h-4 w-4 stroke-[3]" aria-label="Đang chọn" />
                      </span>
                    ) : (
                      <span className="h-6 w-6 rounded-lg border border-white/[0.08] group-hover:border-slate-500 transition-colors" />
                    )}
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-base sm:text-lg font-bold leading-snug tracking-tight text-white group-hover:text-orange-400 transition-colors">
                    {cleanTitle(ex)}
                  </h3>

                  <p className="mt-1.5 line-clamp-2 text-xs text-slate-400 leading-relaxed">
                    {ex.descriptionVi || ex.description}
                  </p>

                  {/* Card Bottom: Metadata and Exam Score Gauge */}
                  <div className="mt-auto pt-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/[0.06] pt-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-slate-200 tabular-nums">
                          {ex.questions.length} câu
                        </span>
                        {examMode === 'practice' ? (
                          <span className="text-slate-400">Không tính giờ</span>
                        ) : (
                          <span className="flex items-center gap-1 font-mono tabular-nums text-slate-400">
                            <Clock className="h-3 w-3 text-orange-400" aria-hidden="true" />
                            {ex.timeLimitMinutes} phút
                          </span>
                        )}
                      </div>

                      {/* Status indicator */}
                      <div>
                        {s ? (
                          <span className={`font-mono text-xs font-bold tabular-nums ${passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {s.best}đ • {passed ? 'ĐẠT ✓' : 'CHƯA ĐẠT'}
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-500 font-medium">Chưa làm</span>
                        )}
                      </div>
                    </div>

                    {/* Progress score bar */}
                    <div className="relative h-1.5 rounded-full bg-slate-800/90 overflow-hidden" aria-hidden="true">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          passed ? 'bg-emerald-500' : s ? 'bg-rose-500' : 'bg-slate-700'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                      {/* Pass Mark indicator at 700 */}
                      <span 
                        className="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-sm" 
                        style={{ left: `${passPct}%` }} 
                        title={`Mốc đỗ: ${ex.passingScore} điểm`}
                      />
                    </div>

                    {ex.id !== 'wrong-notebook' && coverage?.[ex.id] && coverage[ex.id].seen > 0 && (
                      <p className="text-[11px] leading-relaxed text-slate-400">
                        Đã làm <span className="font-mono tabular-nums text-slate-200">{coverage[ex.id].seen}/{ex.questions.length}</span> câu,
                        đúng <span className="font-mono tabular-nums text-emerald-400">{coverage[ex.id].correct}</span> ở lần gần nhất
                      </p>
                    )}
                  </div>
                </button>
              </motion.li>
            );
          })}
        </ul>
      )}

      {/* ================= FIXED COMMERCIAL START DOCK ================= */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/[0.1] bg-slate-950/90 backdrop-blur-2xl shadow-2xl" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 sm:px-6 lg:px-8">
          
          {/* Selected Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">Bộ đề đã chọn:</span>
              <span className="rounded bg-slate-800 px-1.5 py-0.2 font-mono text-[10px] text-slate-300">
                {selected?.questions.length ?? 0} câu
              </span>
            </div>
            <p className="truncate text-sm sm:text-base font-bold text-white">
              {selected ? cleanTitle(selected) : 'Vui lòng bấm chọn một bộ đề trong danh sách'}
            </p>
          </div>

          {/* Mode Selector */}
          <div 
            role="group" 
            aria-label="Chế độ làm bài" 
            className="machined-inner flex items-center rounded-2xl p-1 text-xs"
          >
            {([
              ['strict', 'Thi Thật (Pearson VUE)', 'Bấm giờ chuẩn, ẩn đáp án đến khi nộp bài'],
              ['practice', 'Luyện Tập (Giải Thích Ngay)', 'Không tính giờ. Xem đúng/sai và giải thích chi tiết ngay sau mỗi câu'],
            ] as const).map(([id, label, hint]) => (
              <button
                key={id}
                onClick={() => onModeChange(id)}
                aria-pressed={examMode === id}
                title={hint}
                className={`rounded-xl px-3.5 py-2 font-semibold transition ${
                  examMode === id 
                    ? 'bg-slate-800 text-orange-400 shadow-sm border border-white/[0.08]' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Start / Resume CTA Button */}
          {(() => {
            const selectedSession = savedSessions ? (selected ? savedSessions[selected.id] : null) : (resume?.exam.id === selected?.id ? resume?.session ?? null : null);
            if (selectedSession && selected) {
              const answeredCount = Object.values(selectedSession.answers).filter((a) => a.length > 0).length;
              return (
                <div className="flex items-center gap-2">
                  <button
                    onClick={onStart}
                    className="hidden sm:inline-flex h-11 items-center gap-1.5 rounded-2xl border border-white/10 px-4 text-xs font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition"
                    title="Bỏ tiến độ dở và thi lại bộ đề này từ đầu"
                  >
                    Làm lại từ đầu
                  </button>
                  <button
                    onClick={() => onResume?.(selected.id)}
                    className="flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-500 px-7 text-sm font-bold text-slate-950 shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] hover:shadow-orange-500/35 active:scale-[0.98]"
                  >
                    <Play className="h-4 w-4 fill-current ml-0.5" aria-hidden="true" />
                    <span>Tiếp Tục Làm Bài ({answeredCount}/{selected.questions.length} câu)</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              );
            }
            return (
              <button
                onClick={onStart}
                disabled={!selected}
                className="flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-500 px-7 text-sm font-bold text-slate-950 shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] hover:shadow-orange-500/35 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
              >
                <Play className="h-4 w-4 fill-current ml-0.5" aria-hidden="true" />
                <span>Bắt Đầu Làm Bài</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            );
          })()}

        </div>
      </div>

    </div>
  );
};
