import { ExamSet, ExamQuestion } from '../types';
import raw from './dumpExams.json';

type RawExam = { id: string; n: number; questions: Omit<ExamQuestion, 'explanationVi'>[] };

const NOTE = 'Đáp án theo bộ đề gốc. Xem tài liệu tham khảo (nếu có) để hiểu rõ hơn.';

const toQuestion = (q: RawExam['questions'][number]): ExamQuestion => ({
  ...q,
  explanation: q.explanation || 'See the AWS documentation for this service.',
  explanationVi: q.explanation ? `${NOTE} ${q.explanation}` : NOTE,
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

const pool = numbered.flatMap((e) => e.questions);

// Deterministic shuffle so the "random" mock exam is stable across reloads.
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

const mixed = (n: number, seed: number): ExamSet => ({
  id: `dump-mixed-${n}`,
  title: `Mock Exam ${n} - Mixed (65 questions, 90 min)`,
  titleVi: `Thi thử tổng hợp số ${n} (65 câu ngẫu nhiên từ ${pool.length} câu - 90 phút)`,
  description: 'Exam-like mock: 65 questions drawn from all practice exams.',
  descriptionVi: 'Đề mô phỏng thi thật: 65 câu trộn từ toàn bộ ngân hàng đề, 90 phút, đạt từ 700/1000.',
  timeLimitMinutes: 90,
  passingScore: 700,
  totalScore: 1000,
  questions: seededShuffle(pool, seed).slice(0, 65),
});

export const DUMP_EXAMS: ExamSet[] = [mixed(1, 11), mixed(2, 22), mixed(3, 33), ...numbered];
