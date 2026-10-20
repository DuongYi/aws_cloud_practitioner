import React, { useMemo } from 'react';
import { Clock, Gauge } from 'lucide-react';
import { ExamSet } from '../types';

interface TimeStatsProps {
  exam: ExamSet;
  questionTimes: Record<string | number, number>;
  userAnswers: Record<string | number, number[]>;
  timeLimitSeconds: number;
  onJumpToQuestion: (id: string | number) => void;
}

const isRight = (selected: number[], correct: number[]) =>
  selected.length === correct.length && selected.every((a) => correct.includes(a));

const mmss = (sec: number) => {
  const r = Math.round(sec);
  return `${Math.floor(r / 60)}:${String(r % 60).padStart(2, '0')}`;
};
const DOMAIN_SHORT: Record<string, string> = {
  'Domain 1: Cloud Concepts': 'Khái niệm Cloud',
  'Domain 2: Security and Compliance': 'Bảo mật & Tuân thủ',
  'Domain 3: Cloud Technology and Services': 'Công nghệ & Dịch vụ',
  'Domain 4: Billing, Pricing and Support': 'Chi phí & Hỗ trợ',
};

/** Time spent per question, per Domain, and how it compares with an even split of the time limit. */
export const TimeStats: React.FC<TimeStatsProps> = ({ exam, questionTimes, userAnswers, timeLimitSeconds, onJumpToQuestion }) => {
  const data = useMemo(() => {
    const n = exam.questions.length;
    const target = Math.max(1, Math.round(timeLimitSeconds / n));
    const rows = exam.questions.map((q, i) => {
      const t = questionTimes[q.id] || 0;
      const sel = userAnswers[q.id] || [];
      const state: 'right' | 'wrong' | 'skipped' = sel.length === 0 ? 'skipped' : isRight(sel, q.correctAnswers || []) ? 'right' : 'wrong';
      return { id: q.id, no: i + 1, t, state, domain: q.domain, text: q.question };
    });
    const total = rows.reduce((a, r) => a + r.t, 0);
    const visited = rows.filter((r) => r.t > 0);
    const avg = visited.length ? total / visited.length : 0;
    const over = rows.filter((r) => r.t > target * 1.5);
    const max = Math.max(target * 2, ...rows.map((r) => r.t), 1);

    const byDomain = new Map<string, { n: number; timed: number; t: number }>();
    rows.forEach((r) => {
      const d = byDomain.get(r.domain) || { n: 0, timed: 0, t: 0 };
      d.n += 1; d.t += r.t;
      if (r.t > 0) d.timed += 1;
      byDomain.set(r.domain, d);
    });
    const avgOf = (state: string) => {
      const sub = rows.filter((r) => r.state === state && r.t > 0);
      return sub.length ? sub.reduce((a, r) => a + r.t, 0) / sub.length : 0;
    };
    return {
      n, target, rows, total, avg, over, max,
      byDomain: [...byDomain.entries()].map(([domain, v]) => ({ domain, ...v, avg: v.timed ? v.t / v.timed : 0 })),
      slowest: [...rows].sort((a, b) => b.t - a.t).slice(0, 5).filter((r) => r.t > 0),
      avgRight: avgOf('right'),
      avgWrong: avgOf('wrong'),
    };
  }, [exam, questionTimes, userAnswers, timeLimitSeconds]);

  if (data.total === 0) return null;

  const firstPass = Math.round((timeLimitSeconds * 0.65) / data.n);
  const insights: string[] = [];
  if (data.over.length > 0) {
    const share = Math.round((data.over.reduce((a, r) => a + r.t, 0) / data.total) * 100);
    insights.push(`${data.over.length} câu vượt 1,5 lần mục tiêu đã chiếm ${share}% tổng thời gian làm bài.`);
  }
  if (data.avgWrong > 0 && data.avgRight > 0) {
    insights.push(
      data.avgWrong > data.avgRight * 1.3
        ? `Câu sai tốn trung bình ${mmss(data.avgWrong)}, nhiều hơn câu đúng (${mmss(data.avgRight)}): thường là dấu hiệu bạn đang phân vân giữa hai đáp án. Hãy học kỹ các câu này.`
        : `Câu sai tốn ${mmss(data.avgWrong)} và câu đúng ${mmss(data.avgRight)}: thời gian suy nghĩ không phải vấn đề chính, vấn đề nằm ở kiến thức.`
    );
  }
  if (data.total < timeLimitSeconds * 0.5) insights.push('Bạn dùng chưa tới một nửa thời gian. Còn dư thời gian thì nên đọc kỹ từng đáp án nhiễu và soát lại câu gắn cờ.');

  return (
    <section aria-label="Thống kê thời gian" className="machined-card space-y-8 rounded-3xl p-6 sm:p-8">
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-50">
          <Clock className="h-5 w-5 text-orange-400" aria-hidden="true" /> Thống kê thời gian
        </h3>
        <p className="mt-1 text-sm text-slate-400">Mục tiêu mỗi câu là {mmss(data.target)} (chia đều {Math.round(timeLimitSeconds / 60)} phút cho {data.n} câu).</p>
      </div>

      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div><dt className="text-xs text-slate-400">Tổng thời gian</dt><dd className="mt-1 font-mono text-2xl tabular-nums text-slate-50">{mmss(data.total)}</dd></div>
        <div><dt className="text-xs text-slate-400">Trung bình mỗi câu</dt><dd className="mt-1 font-mono text-2xl tabular-nums text-slate-50">{mmss(data.avg)}</dd></div>
        <div><dt className="text-xs text-slate-400">Mục tiêu mỗi câu</dt><dd className="mt-1 font-mono text-2xl tabular-nums text-slate-50">{mmss(data.target)}</dd></div>
        <div><dt className="text-xs text-slate-400">Câu vượt mục tiêu</dt><dd className="mt-1 font-mono text-2xl tabular-nums text-orange-300">{data.rows.filter((r) => r.t > data.target).length}<span className="text-slate-500">/{data.n}</span></dd></div>
      </dl>

      {/* Per-question bars */}
      <div>
        <p className="text-sm font-medium text-slate-200">Thời gian từng câu</p>
        <p className="mt-0.5 text-xs text-slate-400">Xanh: đúng, đỏ: sai, xám: bỏ trống. Vạch cam là mục tiêu. Bấm một cột để xem câu đó.</p>
        <div className="relative mt-4 flex h-32 items-end gap-[2px]" role="img" aria-label="Biểu đồ thời gian từng câu">
          <div className="pointer-events-none absolute inset-x-0 border-t border-dashed border-orange-400/70" style={{ bottom: `${(data.target / data.max) * 100}%` }} />
          {data.rows.map((r) => (
            <button
              key={String(r.id)}
              onClick={() => onJumpToQuestion(r.id)}
              title={`Câu ${r.no}: ${mmss(r.t)}`}
              aria-label={`Câu ${r.no}, ${mmss(r.t)}`}
              className={`min-w-[3px] flex-1 rounded-t-sm ${r.state === 'right' ? 'bg-emerald-500/70 hover:bg-emerald-400' : r.state === 'wrong' ? 'bg-rose-500/70 hover:bg-rose-400' : 'bg-slate-600 hover:bg-slate-500'}`}
              style={{ height: `${Math.max(2, (r.t / data.max) * 100)}%` }}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* By domain */}
        <div>
          <p className="text-sm font-medium text-slate-200">Theo Domain</p>
          <ul className="mt-3 space-y-4">
            {data.byDomain.map((d) => {
              const timeShare = Math.round((d.t / data.total) * 100);
              const qShare = Math.round((d.n / data.n) * 100);
              return (
                <li key={d.domain}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-slate-200">{DOMAIN_SHORT[d.domain] ?? d.domain}</span>
                    <span className="font-mono text-xs tabular-nums text-slate-400">{d.n} câu, TB {d.timed ? mmss(d.avg) : '-'}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="w-16 shrink-0">Thời gian</span>
                    <div className="h-2 flex-1 rounded bg-slate-800"><div className="h-2 rounded bg-orange-500" style={{ width: `${timeShare}%` }} /></div>
                    <span className="w-9 text-right font-mono tabular-nums">{timeShare}%</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="w-16 shrink-0">Số câu</span>
                    <div className="h-2 flex-1 rounded bg-slate-800"><div className="h-2 rounded bg-slate-500" style={{ width: `${qShare}%` }} /></div>
                    <span className="w-9 text-right font-mono tabular-nums">{qShare}%</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Slowest */}
        <div>
          <p className="text-sm font-medium text-slate-200">Câu tốn nhiều thời gian nhất</p>
          <ul className="mt-3 space-y-2">
            {data.slowest.map((r) => (
              <li key={String(r.id)}>
                <button onClick={() => onJumpToQuestion(r.id)} className="flex w-full items-start gap-3 rounded-xl border border-white/[0.06] bg-slate-900/60 p-3 text-left hover:border-white/[0.14]">
                  <span className="w-11 shrink-0 font-mono text-sm tabular-nums text-orange-300">{mmss(r.t)}</span>
                  <span className="min-w-0 flex-1 text-xs leading-relaxed text-slate-300 line-clamp-2">Câu {r.no}: {r.text}</span>
                  <span className={`shrink-0 text-xs font-medium ${r.state === 'right' ? 'text-emerald-400' : r.state === 'wrong' ? 'text-rose-400' : 'text-slate-400'}`}>
                    {r.state === 'right' ? 'Đúng' : r.state === 'wrong' ? 'Sai' : 'Bỏ trống'}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {insights.length > 0 && (
        <ul className="space-y-2 border-t border-white/[0.06] pt-6 text-sm leading-relaxed text-slate-300">
          {insights.map((t, i) => <li key={i} className="border-l-2 border-orange-500/60 pl-3">{t}</li>)}
        </ul>
      )}

      {/* Recommended allocation */}
      <div className="rounded-2xl border border-white/[0.06] bg-slate-950/60 p-5">
        <p className="flex items-center gap-2 text-sm font-medium text-slate-100"><Gauge className="h-4 w-4 text-orange-400" aria-hidden="true" /> Cách chia thời gian gợi ý cho đề này</p>
        <div className="mt-3 flex h-3 overflow-hidden rounded-full" aria-hidden="true">
          <div className="bg-orange-500" style={{ width: '65%' }} />
          <div className="bg-amber-300" style={{ width: '25%' }} />
          <div className="bg-slate-400" style={{ width: '10%' }} />
        </div>
        <ul className="mt-3 grid gap-2 text-xs text-slate-300 sm:grid-cols-3">
          <li><span className="font-semibold text-orange-300">Lượt 1, 65%:</span> ~{Math.round(timeLimitSeconds * 0.65 / 60)} phút, khoảng {firstPass} giây mỗi câu. Trả lời hết, gặp câu khó thì gắn cờ và đi tiếp.</li>
          <li><span className="font-semibold text-amber-300">Câu gắn cờ, 25%:</span> ~{Math.round(timeLimitSeconds * 0.25 / 60)} phút quay lại các câu đã gắn cờ.</li>
          <li><span className="font-semibold text-slate-200">Soát lại, 10%:</span> ~{Math.round(timeLimitSeconds * 0.1 / 60)} phút cuối kiểm tra câu bỏ trống và câu chọn nhiều đáp án.</li>
        </ul>
      </div>
    </section>
  );
};
