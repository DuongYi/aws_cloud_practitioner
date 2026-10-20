import React, { useMemo, useState } from 'react';
import { CheckCircle2, ChevronDown, NotebookPen, Play, Search, XCircle } from 'lucide-react';
import { ExamAttempt, ExamSet, PracticeAnswer } from '../types';
import { collectReviewEntries, NOTEBOOK_ID, ReviewEntry } from '../utils/wrongNotebook';
import { useExplanations } from '../utils/explanations';
import { ExplanationPanel } from './ExplanationPanel';
import { ExplanationFallback } from './ExplanationFallback';
import { buildPath, navigate } from '../utils/router';

interface WrongReviewProps {
  exams: ExamSet[];
  attempts: ExamAttempt[];
  practice: PracticeAnswer[];
  langMode: 'bilingual' | 'vi' | 'en';
  /** True while the first cloud sync after sign-in is running. */
  syncing?: boolean;
  accountEmail?: string | null;
}

type Filter = 'wrong' | 'all' | 'correct';
type Sort = 'recent' | 'most-wrong';

const FILTER_LABEL: Record<Filter, string> = {
  wrong: 'Câu đang làm sai',
  all: 'Tất cả câu đã làm',
  correct: 'Câu đã làm đúng',
};

const DOMAIN_SHORT: Record<string, string> = {
  'Domain 1: Cloud Concepts': 'Domain 1 • Khái niệm Cloud',
  'Domain 2: Security and Compliance': 'Domain 2 • Bảo mật và Tuân thủ',
  'Domain 3: Cloud Technology and Services': 'Domain 3 • Công nghệ và Dịch vụ',
  'Domain 4: Billing, Pricing and Support': 'Domain 4 • Chi phí và Hỗ trợ',
};

const PAGE = 15;

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: '2-digit' });

const letters = (idx: number[]) => idx.map((i) => String.fromCharCode(65 + i)).join(', ');

/** One reviewed question: outcome, the options with your pick marked, and the detailed explanation. */
const ReviewCard: React.FC<{
  entry: ReviewEntry;
  open: boolean;
  onToggle: () => void;
  explanations: ReturnType<typeof useExplanations>;
  langMode: 'bilingual' | 'vi' | 'en';
}> = ({ entry, open, onToggle, explanations, langMode }) => {
  const q = entry.question;
  const correct = q.correctAnswers || [];
  const data = explanations.get(entry.key);

  return (
    <li
      className={`machined-card overflow-hidden rounded-3xl ${
        entry.right ? '' : 'border-rose-500/40 ring-1 ring-rose-500/20'
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start gap-3 p-4 text-left sm:p-5"
      >
        <span className="mt-0.5 shrink-0">
          {entry.right ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-400" aria-hidden="true" />
          ) : (
            <XCircle className="h-5 w-5 text-rose-400" aria-hidden="true" />
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px]">
            <span className={`font-bold ${entry.right ? 'text-emerald-400' : 'text-rose-400'}`}>
              {entry.right ? 'Đã làm đúng' : 'Đang làm sai'}
            </span>
            <span className="rounded-md border border-white/[0.06] bg-slate-950 px-2 py-0.5 font-mono text-slate-400">
              {DOMAIN_SHORT[q.domain] ?? q.domain}
            </span>
            {entry.timesWrong > 0 && (
              <span className="font-mono text-amber-400">Sai {entry.timesWrong}/{entry.timesAnswered} lần</span>
            )}
            <span className="font-mono text-slate-500">{fmtDate(entry.at)}</span>
          </span>

          <span className={`mt-1.5 block text-sm font-semibold leading-relaxed text-white ${open ? '' : 'line-clamp-2'}`}>
            {q.question}
          </span>

          {!open && (
            <span className="mt-1.5 block text-xs text-slate-400">
              Bạn chọn <span className="font-mono text-slate-200">{entry.selected.length ? letters(entry.selected) : '—'}</span>
              {' • '}Đáp án đúng <span className="font-mono text-emerald-400">{letters(correct)}</span>
            </span>
          )}
        </span>

        <ChevronDown
          className={`mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="space-y-4 border-t border-white/[0.06] p-4 sm:p-5">
          <ul className="space-y-2">
            {q.options.map((opt, i) => {
              const isChosen = entry.selected.includes(i);
              const isRight = correct.includes(i);
              let cls = 'bg-slate-900/60 border-white/[0.06] text-slate-300';
              if (isRight) cls = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-semibold ring-1 ring-emerald-500/30';
              else if (isChosen) cls = 'bg-rose-950/40 border-rose-500/60 text-rose-200 line-through';

              return (
                <li key={i} className={`flex items-start gap-3 rounded-xl border p-3.5 text-xs sm:text-sm ${cls}`}>
                  <span className="mt-0.5 font-mono font-bold">{String.fromCharCode(65 + i)}.</span>
                  <span className="flex-1">{opt}</span>
                  {isRight && <span className="shrink-0 text-xs font-bold text-emerald-400">Đáp án đúng ✓</span>}
                  {isChosen && !isRight && <span className="shrink-0 text-xs font-bold text-rose-400">Bạn chọn ✗</span>}
                </li>
              );
            })}
          </ul>

          {data ? (
            <ExplanationPanel data={data} chosenLabels={entry.selected.map((i) => String.fromCharCode(65 + i))} />
          ) : (
            <ExplanationFallback
              loading={explanations.loading}
              failed={explanations.isFailed(entry.key)}
              configured={explanations.configured}
              onRetry={explanations.retry}
              legacyText={(langMode === 'en' ? q.explanation : q.explanationVi || q.explanation) || undefined}
            />
          )}
        </div>
      )}
    </li>
  );
};

/**
 * Review screen for the questions already answered: what was picked, what was right and why.
 * Defaults to the ones currently answered wrong, which is the set the wrong-answer notebook drills.
 */
export const WrongReview: React.FC<WrongReviewProps> = ({ exams, attempts, practice, langMode, syncing, accountEmail }) => {
  const [filter, setFilter] = useState<Filter>('wrong');
  const [domain, setDomain] = useState<string>('all');
  const [sort, setSort] = useState<Sort>('recent');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(PAGE);
  const [open, setOpen] = useState<Set<string>>(new Set());

  const entries = useMemo(() => collectReviewEntries(exams, attempts, practice), [exams, attempts, practice]);
  const wrongCount = entries.filter((e) => !e.right).length;

  const domains = useMemo(() => {
    const set = new Set(entries.map((e) => e.question.domain));
    return [...set].sort();
  }, [entries]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = entries.filter((e) => {
      if (filter === 'wrong' && e.right) return false;
      if (filter === 'correct' && !e.right) return false;
      if (domain !== 'all' && e.question.domain !== domain) return false;
      if (q && !`${e.question.question} ${e.question.options.join(' ')}`.toLowerCase().includes(q)) return false;
      return true;
    });
    return sort === 'most-wrong'
      ? [...list].sort((a, b) => b.timesWrong - a.timesWrong || b.at.localeCompare(a.at))
      : list;
  }, [entries, filter, domain, query, sort]);

  const shown = visible.slice(0, limit);
  // Only the expanded cards need a detailed explanation, so nothing is fetched until a card is opened.
  const explanations = useExplanations(
    shown.filter((e) => open.has(e.key)).map((e) => e.key),
    open.size > 0
  );

  const toggle = (key: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const changeFilter = (f: Filter) => {
    setFilter(f);
    setLimit(PAGE);
  };

  return (
    <div className="space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">Xem lại câu đã làm</h2>
        <p className="max-w-[70ch] text-sm leading-relaxed text-slate-300">
          Toàn bộ câu bạn đã trả lời (cả khi thi thử và khi luyện tập), kèm đáp án bạn chọn, đáp án đúng và giải thích chi tiết.
          Một câu rời khỏi danh sách "đang làm sai" ngay khi bạn trả lời đúng nó ở lần gần nhất.
        </p>

        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="machined-inner rounded-2xl p-3.5">
            <dt className="text-[11px] font-semibold text-slate-400">Đã làm</dt>
            <dd className="mt-1 font-mono text-2xl font-bold tabular-nums text-white">{entries.length}</dd>
          </div>
          <div className="machined-inner rounded-2xl p-3.5">
            <dt className="text-[11px] font-semibold text-slate-400">Đang làm sai</dt>
            <dd className="mt-1 font-mono text-2xl font-bold tabular-nums text-rose-400">{wrongCount}</dd>
          </div>
          <div className="machined-inner rounded-2xl p-3.5">
            <dt className="text-[11px] font-semibold text-slate-400">Đã làm đúng</dt>
            <dd className="mt-1 font-mono text-2xl font-bold tabular-nums text-emerald-400">{entries.length - wrongCount}</dd>
          </div>
          <div className="machined-inner rounded-2xl p-3.5">
            <dt className="text-[11px] font-semibold text-slate-400">Tỉ lệ đúng</dt>
            <dd className="mt-1 font-mono text-2xl font-bold tabular-nums text-white">
              {entries.length ? Math.round(((entries.length - wrongCount) / entries.length) * 100) : 0}%
            </dd>
          </div>
        </dl>

        {wrongCount > 0 && (
          <button
            onClick={() => navigate(buildPath('exam', NOTEBOOK_ID))}
            className="flex w-full items-center gap-3 rounded-2xl border border-orange-500/40 bg-orange-500/[0.08] p-4 text-left transition hover:bg-orange-500/[0.14] sm:w-auto"
          >
            <NotebookPen className="h-5 w-5 shrink-0 text-orange-300" aria-hidden="true" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-slate-50">Luyện lại các câu sai</span>
              <span className="block text-xs text-slate-300">
                Làm lại <span className="font-mono tabular-nums">{Math.min(wrongCount, 50)}</span> câu trong sổ tay câu sai
              </span>
            </span>
            <Play className="h-4 w-4 shrink-0 fill-current text-orange-300" aria-hidden="true" />
          </button>
        )}
      </header>

      {/* Filters */}
      <section aria-label="Bộ lọc câu hỏi" className="machined-card space-y-3 rounded-2xl p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div role="group" aria-label="Trạng thái câu hỏi" className="machined-inner flex items-center rounded-xl p-1 text-xs">
            {(Object.keys(FILTER_LABEL) as Filter[]).map((k) => (
              <button
                key={k}
                onClick={() => changeFilter(k)}
                aria-pressed={filter === k}
                className={`rounded-lg px-3 py-1.5 font-semibold transition ${
                  filter === k ? 'bg-orange-500 text-slate-950' : 'text-slate-300 hover:text-white'
                }`}
              >
                {FILTER_LABEL[k]}
              </button>
            ))}
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2.5">
            <select
              aria-label="Lọc theo Domain"
              value={domain}
              onChange={(e) => { setDomain(e.target.value); setLimit(PAGE); }}
              className="h-9 rounded-xl border border-white/[0.08] bg-slate-900/90 px-3 text-xs text-slate-200 focus:border-orange-500 focus:outline-none"
            >
              <option value="all">Mọi Domain</option>
              {domains.map((d) => (
                <option key={d} value={d}>{DOMAIN_SHORT[d] ?? d}</option>
              ))}
            </select>

            <select
              aria-label="Sắp xếp"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-9 rounded-xl border border-white/[0.08] bg-slate-900/90 px-3 text-xs text-slate-200 focus:border-orange-500 focus:outline-none"
            >
              <option value="recent">Mới làm gần nhất</option>
              <option value="most-wrong">Sai nhiều lần nhất</option>
            </select>

            <div className="relative w-full sm:w-56">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                type="search"
                aria-label="Tìm trong câu hỏi"
                placeholder="Tìm trong câu hỏi..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setLimit(PAGE); }}
                className="h-9 w-full rounded-xl border border-white/[0.08] bg-slate-900/90 pl-8 pr-3 text-xs text-slate-100 placeholder-slate-400 focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400">
          Hiển thị <span className="font-mono tabular-nums text-slate-200">{shown.length}</span>/{visible.length} câu
        </p>
      </section>

      {entries.length === 0 ? (
        <div className="machined-inner rounded-3xl border-dashed border-slate-700 p-12 text-center">
          <NotebookPen className="mx-auto h-10 w-10 text-slate-500" aria-hidden="true" />
          <h3 className="mt-3 text-base font-bold text-white">
            {syncing ? 'Đang tải dữ liệu từ tài khoản...' : 'Chưa có câu nào được ghi lại'}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">
            {syncing
              ? 'Các câu bạn đã làm trên thiết bị khác sẽ hiện ra ngay khi đồng bộ xong.'
              : accountEmail
                ? 'Hãy làm một bộ đề ở tab Thi thử. Mỗi câu bạn trả lời sẽ được lưu vào tài khoản và hiện ở đây.'
                : 'Hãy làm một bộ đề ở tab Thi thử. Đăng nhập để tiến độ được lưu vào tài khoản và xem lại trên mọi thiết bị.'}
          </p>
        </div>
      ) : visible.length === 0 ? (
        <div className="machined-inner rounded-3xl border-dashed border-slate-700 p-12 text-center">
          <h3 className="text-base font-bold text-white">Không có câu nào khớp bộ lọc</h3>
          <button
            onClick={() => { changeFilter('all'); setDomain('all'); setQuery(''); }}
            className="mt-4 rounded-xl border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-xs font-semibold text-orange-400 hover:bg-orange-500/20"
          >
            Xóa bộ lọc
          </button>
        </div>
      ) : (
        <>
          <ul className="space-y-3">
            {shown.map((e) => (
              <ReviewCard
                key={e.key}
                entry={e}
                open={open.has(e.key)}
                onToggle={() => toggle(e.key)}
                explanations={explanations}
                langMode={langMode}
              />
            ))}
          </ul>

          {visible.length > shown.length && (
            <button
              onClick={() => setLimit((n) => n + PAGE)}
              className="mx-auto flex h-11 items-center rounded-2xl border border-white/[0.08] bg-slate-900/80 px-6 text-sm font-semibold text-slate-200 hover:bg-slate-800"
            >
              Xem thêm {Math.min(PAGE, visible.length - shown.length)} câu
            </button>
          )}
        </>
      )}
    </div>
  );
};
