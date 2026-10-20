import React, { useMemo } from 'react';
import { ArrowRight, BookOpen, NotebookPen, Play, TrendingUp } from 'lucide-react';
import { ExamAttempt, ExamSet, SectionItem } from '../types';
import { analyzeProgress } from '../utils/progress';
import { buildPath, navigate } from '../utils/router';

interface ProgressDashboardProps {
  attempts: ExamAttempt[];
  exams: ExamSet[];
  sections: SectionItem[];
  completedLectures: string[];
  wrongCount: number;
}

const PASS_SCORE = 700;
const PASS_RATIO = 0.7;
const DOMAIN_SHORT: Record<string, string> = {
  'Domain 1: Cloud Concepts': 'Khái niệm Cloud (24%)',
  'Domain 2: Security and Compliance': 'Bảo mật và Tuân thủ (30%)',
  'Domain 3: Cloud Technology and Services': 'Công nghệ và Dịch vụ (34%)',
  'Domain 4: Billing, Pricing and Support': 'Chi phí và Hỗ trợ (12%)',
};
const mmss = (sec: number) => {
  const r = Math.round(sec);
  return `${Math.floor(r / 60)}:${String(r % 60).padStart(2, '0')}`;
};
const fmtDate = (iso: string) => new Date(iso).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });

/** Score trend as an SVG line with the 700 pass mark. */
const ScoreTrend: React.FC<{ points: { score: number; date: string }[] }> = ({ points }) => {
  const W = 960, H = 240, L = 48, R = 20, T = 16, B = 30;
  const y = (v: number) => T + (1 - (v - 100) / 900) * (H - T - B);
  const x = (i: number) => (points.length === 1 ? (L + W - R) / 2 : L + (i / (points.length - 1)) * (W - L - R));
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)} ${y(p.score).toFixed(1)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-h-64" preserveAspectRatio="xMidYMid meet" role="img" aria-label={`Điểm qua ${points.length} lần thi gần nhất, mốc đạt ${PASS_SCORE}`}>
      {[100, 400, 700, 1000].map((v) => (
        <g key={v}>
          <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke={v === PASS_SCORE ? 'var(--color-orange-400)' : 'var(--color-slate-800)'} strokeDasharray={v === PASS_SCORE ? '5 5' : undefined} />
          <text x={L - 8} y={y(v) + 4} textAnchor="end" fontSize="12" fill={v === PASS_SCORE ? 'var(--color-orange-300)' : 'var(--color-slate-400)'}>{v}</text>
        </g>
      ))}
      {points.length > 1 && <path d={path} fill="none" stroke="var(--color-slate-300)" strokeWidth="2" strokeLinejoin="round" />}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(p.score)} r="5" fill={p.score >= PASS_SCORE ? 'var(--color-emerald-500)' : 'var(--color-rose-500)'} stroke="var(--color-slate-950)" strokeWidth="2">
            <title>{`${fmtDate(p.date)}: ${p.score} điểm`}</title>
          </circle>
        </g>
      ))}
      {points.length > 1 ? (
        <>
          <text x={L} y={H - 8} fontSize="12" fill="var(--color-slate-400)">{fmtDate(points[0].date)}</text>
          <text x={W - R} y={H - 8} fontSize="12" textAnchor="end" fill="var(--color-slate-400)">{fmtDate(points[points.length - 1].date)}</text>
        </>
      ) : (
        <text x={x(0)} y={H - 8} fontSize="12" textAnchor="middle" fill="var(--color-slate-400)">{fmtDate(points[0].date)}</text>
      )}
    </svg>
  );
};

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ attempts, exams, sections, completedLectures, wrongCount }) => {
  const summary = useMemo(() => analyzeProgress(exams, attempts), [exams, attempts]);
  const trend = useMemo(() => [...attempts].sort((a, b) => a.date.localeCompare(b.date)).slice(-20), [attempts]);
  const recent = useMemo(() => [...attempts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8), [attempts]);

  // Domains below 70% (with enough answers to mean something), weakest first
  const weak = summary.domains
    .filter((d) => d.seen >= 5 && d.correct / d.seen < PASS_RATIO)
    .sort((a, b) => a.correct / a.seen - b.correct / b.seen);
  const untouched = summary.domains.filter((d) => d.seen < 5);

  const recommendedSections = (domain: string) =>
    sections
      .filter((s) => s.domain === domain)
      .map((s) => {
        const done = s.lectures.filter((l) => completedLectures.includes(l.id)).length;
        return { section: s, done, total: s.lectures.length, next: s.lectures.find((l) => !completedLectures.includes(l.id)) };
      })
      .filter((r) => r.next)
      .sort((a, b) => a.done / a.total - b.done / b.total)
      .slice(0, 3);

  if (attempts.length === 0) {
    return (
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-slate-700 px-6 py-16 text-center">
          <TrendingUp className="mx-auto h-9 w-9 text-slate-500" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-semibold text-slate-50">Chưa có dữ liệu tiến độ</h2>
          <p className="mx-auto mt-2 max-w-[44ch] text-sm leading-relaxed text-slate-400">
            Làm một đề thi thử, bảng này sẽ hiển thị điểm qua các lần thi, độ thành thạo từng Domain và gợi ý bài cần ôn.
          </p>
          <button
            onClick={() => navigate(buildPath('exam'))}
            className="mx-auto mt-6 flex h-11 items-center gap-2 rounded-xl bg-orange-500 px-6 text-sm font-semibold text-slate-950 hover:bg-orange-400"
          >
            <Play className="h-4 w-4 fill-current" aria-hidden="true" /> Làm đề đầu tiên
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <header>
        <h2 className="text-3xl font-semibold tracking-tighter text-slate-50 sm:text-4xl">Tiến độ ôn thi</h2>
        <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-slate-400">
          Tính từ {summary.attempts} lượt thi đã lưu. Với mỗi câu hỏi, chỉ lần trả lời gần nhất được tính.
        </p>
      </header>

      <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        {[
          ['Lượt thi', String(summary.attempts)],
          ['Điểm gần nhất', summary.lastScore !== null ? String(summary.lastScore) : '-'],
          ['Điểm cao nhất', String(summary.bestScore)],
          ['Lượt đạt', `${summary.passedAttempts}/${summary.attempts}`],
          ['Câu đã làm', String(summary.answered)],
          ['Chính xác', `${Math.round(summary.accuracy * 100)}%`],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs text-slate-400">{label}</dt>
            <dd className="mt-1 font-mono text-2xl tabular-nums text-slate-50">{value}</dd>
          </div>
        ))}
      </dl>

      <section aria-label="Điểm theo thời gian" className="machined-card rounded-3xl p-6 sm:p-8">
        <h3 className="text-base font-semibold text-slate-50">Điểm qua các lần thi</h3>
        <p className="mt-1 text-xs text-slate-400">Xanh: đạt (từ {PASS_SCORE}), đỏ: chưa đạt. Hiển thị tối đa 20 lượt gần nhất.</p>
        <div className="mt-4"><ScoreTrend points={trend.map((a) => ({ score: a.score, date: a.date }))} /></div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        {/* Domain mastery */}
        <section aria-label="Độ thành thạo theo Domain" className="machined-card rounded-3xl p-6 sm:p-8">
          <h3 className="text-base font-semibold text-slate-50">Thành thạo theo Domain</h3>
          <p className="mt-1 text-xs text-slate-400">Tỉ lệ đúng ở lần trả lời gần nhất. Vạch đứng là mốc 70%.</p>
          <ul className="mt-5 space-y-6">
            {summary.domains.map((d) => {
              const acc = d.seen ? d.correct / d.seen : 0;
              const ok = acc >= PASS_RATIO;
              return (
                <li key={d.domain}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-slate-200">{DOMAIN_SHORT[d.domain] ?? d.domain}</span>
                    <span className={`font-mono tabular-nums ${d.seen === 0 ? 'text-slate-500' : ok ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {d.seen === 0 ? 'chưa làm' : `${Math.round(acc * 100)}%`}
                    </span>
                  </div>
                  <div className="relative mt-2 h-3 rounded-md bg-slate-800">
                    <div className={`h-3 rounded-md ${ok ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${acc * 100}%` }} />
                    <span className="absolute -top-1.5 h-6 w-px bg-slate-300" style={{ left: `${PASS_RATIO * 100}%` }} aria-hidden="true" />
                  </div>
                  <p className="mt-1.5 flex flex-wrap gap-x-4 text-[11px] text-slate-400">
                    <span>Đã làm <span className="font-mono tabular-nums">{d.seen}/{d.poolSize}</span> câu</span>
                    {d.avgSeconds > 0 && <span>TB <span className="font-mono tabular-nums">{mmss(d.avgSeconds)}</span> mỗi câu</span>}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        {/* What to do next */}
        <section aria-label="Gợi ý ôn tập" className="space-y-5">
          <h3 className="text-base font-semibold text-slate-50">Nên làm tiếp</h3>

          {wrongCount > 0 && (
            <button
              onClick={() => navigate(buildPath('exam', 'wrong-notebook'))}
              className="flex w-full items-center gap-4 rounded-2xl border border-orange-500/40 bg-orange-500/[0.07] p-4 text-left hover:bg-orange-500/[0.12]"
            >
              <NotebookPen className="h-5 w-5 shrink-0 text-orange-300" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-slate-50">Luyện sổ tay câu sai</span>
                <span className="block text-xs text-slate-300"><span className="font-mono tabular-nums">{wrongCount}</span> câu bạn đang làm sai, trả lời đúng thì câu rời khỏi sổ tay</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-orange-300" aria-hidden="true" />
            </button>
          )}

          {weak.length === 0 && untouched.length < summary.domains.length && (
            <p className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-4 text-sm leading-relaxed text-emerald-100">
              Các Domain bạn đã luyện đều từ 70% trở lên. Hãy làm thêm đề tổng hợp 65 câu để kiểm tra trong điều kiện thi thật.
            </p>
          )}

          {weak.map((d) => (
            <div key={d.domain} className="rounded-2xl border border-white/[0.06] bg-slate-900/60 p-4">
              <p className="text-sm font-semibold text-rose-300">
                {DOMAIN_SHORT[d.domain] ?? d.domain}: <span className="font-mono tabular-nums">{Math.round((d.correct / d.seen) * 100)}%</span>
              </p>
              <p className="mt-1 text-xs text-slate-400">Chuyên đề nên ôn trước (ít bài đã học nhất):</p>
              <ul className="mt-2 space-y-1.5">
                {recommendedSections(d.domain).map(({ section, done, total, next }) => (
                  <li key={section.id}>
                    <button
                      onClick={() => navigate(buildPath('study', next!.id))}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-slate-800"
                    >
                      <BookOpen className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                      <span className="min-w-0 flex-1 truncate text-sm text-slate-200">{section.titleVi}</span>
                      <span className="font-mono text-xs tabular-nums text-slate-400">{done}/{total}</span>
                    </button>
                  </li>
                ))}
                {sections.length === 0 && <li className="text-xs text-slate-500">Đang tải danh sách chuyên đề...</li>}
              </ul>
            </div>
          ))}

          {untouched.length > 0 && (
            <p className="text-xs leading-relaxed text-slate-400">
              Chưa đủ dữ liệu (dưới 5 câu) cho: {untouched.map((d) => DOMAIN_SHORT[d.domain] ?? d.domain).join(', ')}.
            </p>
          )}
        </section>
      </div>

      {/* Recent attempts */}
      <section aria-label="Lịch sử làm bài">
        <h3 className="text-base font-semibold text-slate-50">Lịch sử gần đây</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="text-xs text-slate-400">
              <tr>
                <th className="py-2 pr-4 font-medium">Ngày</th>
                <th className="py-2 pr-4 font-medium">Đề</th>
                <th className="py-2 pr-4 text-right font-medium">Điểm</th>
                <th className="py-2 pr-4 text-right font-medium">Đúng</th>
                <th className="py-2 text-right font-medium">Thời gian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {recent.map((a) => (
                <tr key={a.id}>
                  <td className="py-2.5 pr-4 font-mono text-xs tabular-nums text-slate-400">{fmtDate(a.date)}</td>
                  <td className="max-w-[26ch] truncate py-2.5 pr-4 text-slate-200">{a.examTitle.replace(/\s*\([^)]*\)\s*$/, '')}</td>
                  <td className={`py-2.5 pr-4 text-right font-mono tabular-nums ${a.passed ? 'text-emerald-400' : 'text-rose-400'}`}>{a.score}</td>
                  <td className="py-2.5 pr-4 text-right font-mono tabular-nums text-slate-300">{a.correctCount}/{a.totalQuestions}</td>
                  <td className="py-2.5 text-right font-mono tabular-nums text-slate-400">{mmss(a.timeSpentSeconds)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
