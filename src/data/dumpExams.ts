import { ExamSet, ExamQuestion } from '../types';
import raw from './dumpExams.json';

type RawExam = { id: string; n: number; questions: Omit<ExamQuestion, 'explanationVi'>[] };

const toQuestion = (q: RawExam['questions'][number]): ExamQuestion => ({
  ...q,
  // The detailed Vietnamese explanation is loaded from Supabase; only the source link is kept here.
  explanation: q.explanation ? `Tài liệu tham khảo: ${q.explanation}` : '',
  explanationVi: q.explanation ? `Tài liệu tham khảo: ${q.explanation}` : '',
});

const exams = raw as unknown as RawExam[];

const numbered: ExamSet[] = exams.map((e) => ({
  id: e.id,
  title: `Practice Exam ${e.n} (${e.questions.length} questions)`,
  titleVi: `Đề luyện tập số ${e.n} (${e.questions.length} câu)`,
  description: `Practice exam ${e.n} imported from the question dump.`,
  descriptionVi: `Đề luyện tập số ${e.n}, ${e.questions.length} câu, đạt từ 700/1000.`,
  timeLimitMinutes: Math.round(e.questions.length * 1.4),
  passingScore: 700,
  totalScore: 1000,
  questions: e.questions.map(toQuestion),
}));

// Real CLF-C02 weights: 24% / 30% / 34% / 12%. Largest-remainder split of 65 questions.
const BLUEPRINT: { domain: ExamQuestion['domain']; count: number }[] = [
  { domain: 'Domain 1: Cloud Concepts', count: 16 },
  { domain: 'Domain 2: Security and Compliance', count: 19 },
  { domain: 'Domain 3: Cloud Technology and Services', count: 22 },
  { domain: 'Domain 4: Billing, Pricing and Support', count: 8 },
];
const MOCK_COUNT = 3;

// Several questions appear in more than one practice exam: keep one copy of each.
const normalize = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const seen = new Set<string>();
const pool = numbered
  .flatMap((e) => e.questions)
  .filter((q) => {
    const k = normalize(q.question);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

// Deterministic shuffle so the mock exams are stable across reloads.
const seededShuffle = <T,>(items: T[], seed: number): T[] => {
  const a = [...items];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) % 4294967296;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const byDomain = new Map(BLUEPRINT.map((b) => [b.domain, seededShuffle(pool.filter((q) => q.domain === b.domain), 7)]));

// Mock exam n takes its own slice of every domain, so the three mock exams do not share questions.
const mixed = (n: number): ExamSet => {
  const questions = BLUEPRINT.flatMap((b) => (byDomain.get(b.domain) ?? []).slice((n - 1) * b.count, n * b.count));
  return {
    id: `dump-mixed-${n}`,
    title: `Mock Exam ${n} - Real blueprint (65 questions, 90 min)`,
    titleVi: `Thi thử tổng hợp số ${n} (65 câu theo tỉ lệ đề thật - 90 phút)`,
    description: 'Exam-like mock: 65 questions in the real CLF-C02 domain proportions.',
    descriptionVi: 'Mô phỏng kỳ thi thật: 65 câu đúng tỉ lệ Domain 24% / 30% / 34% / 12%, 90 phút, đạt từ 700/1000. Mỗi đề dùng bộ câu riêng.',
    timeLimitMinutes: 90,
    passingScore: 700,
    totalScore: 1000,
    // Interleave domains so the order does not give the topic away
    questions: seededShuffle(questions, 100 + n),
  };
};

export const DUMP_EXAMS: ExamSet[] = [...Array.from({ length: MOCK_COUNT }, (_, i) => mixed(i + 1)), ...numbered];
