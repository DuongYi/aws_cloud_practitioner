import React from 'react';
import { Check, X, Lightbulb, KeyRound, Info } from 'lucide-react';
import { Explanation } from '../utils/explanations';

interface ExplanationPanelProps {
  data: Explanation;
  /** Labels (A, B...) the user picked, to mark them in the analysis. */
  chosenLabels?: string[];
}

/** Translation, per-option analysis, exam tips and keyword triggers for one question. */
export const ExplanationPanel: React.FC<ExplanationPanelProps> = ({ data, chosenLabels = [] }) => (
  <div className="space-y-5 rounded-2xl border border-white/[0.06] bg-slate-950/70 p-4 text-sm sm:p-5">
    <section>
      <h4 className="text-xs font-medium text-slate-400">Dịch câu hỏi</h4>
      <p className="mt-1.5 leading-relaxed text-slate-100">{data.question_vi}</p>
    </section>

    <section>
      <h4 className="text-xs font-medium text-slate-400">Vì sao chọn đáp án này</h4>
      <p className="mt-1.5 leading-relaxed text-slate-200">{data.explanation_vi}</p>
      {data.answer_note && (
        <p className="mt-3 flex gap-2 rounded-xl border border-orange-500/30 bg-orange-500/[0.06] p-3 text-xs leading-relaxed text-orange-200">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{data.answer_note}</span>
        </p>
      )}
    </section>

    <section>
      <h4 className="text-xs font-medium text-slate-400">Phân tích từng đáp án</h4>
      <ul className="mt-2 space-y-2">
        {data.options.map((o) => {
          const chosen = chosenLabels.includes(o.label);
          return (
            <li
              key={o.label}
              className={`flex gap-3 rounded-xl border p-3 ${
                o.is_correct ? 'border-emerald-500/30 bg-emerald-500/[0.06]' : 'border-white/[0.06] bg-slate-900/60'
              }`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${
                  o.is_correct ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                }`}
                aria-label={o.is_correct ? 'Đáp án đúng' : 'Đáp án sai'}
              >
                {o.is_correct ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <X className="h-3.5 w-3.5" strokeWidth={3} />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-100">
                  <span className="font-mono text-slate-400">{o.label}.</span> {o.text_vi}
                  {chosen && <span className="ml-2 text-xs font-normal text-orange-300">Bạn đã chọn</span>}
                </p>
                <p className="mt-1 leading-relaxed text-slate-300">{o.analysis_vi}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>

    {data.tips.length > 0 && (
      <section>
        <h4 className="flex items-center gap-1.5 text-xs font-medium text-orange-300">
          <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" /> Mẹo làm bài
        </h4>
        <ul className="mt-2 space-y-1.5">
          {data.tips.map((t, i) => (
            <li key={i} className="border-l-2 border-orange-500/60 pl-3 leading-relaxed text-slate-200">{t}</li>
          ))}
        </ul>
      </section>
    )}

    {data.keywords.length > 0 && (
      <section>
        <h4 className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
          <KeyRound className="h-3.5 w-3.5" aria-hidden="true" /> Từ khóa nhận diện
        </h4>
        <ul className="mt-2 flex flex-wrap gap-2">
          {data.keywords.map((k, i) => (
            <li key={i} className="rounded-lg border border-white/[0.08] bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200">
              <span className="text-slate-300">{k.term}</span>
              <span className="mx-1.5 text-slate-500">gợi tới</span>
              <span className="font-semibold text-orange-300">{k.points_to}</span>
            </li>
          ))}
        </ul>
      </section>
    )}

    {data.related_services.length > 0 && (
      <p className="text-xs text-slate-400">
        Dịch vụ liên quan: <span className="text-slate-300">{data.related_services.join(', ')}</span>
      </p>
    )}
  </div>
);
