import { ExamAttempt, ExamQuestion, ExamSet } from '../types';

export const NOTEBOOK_ID = 'wrong-notebook';

/** Same key the explanation table uses: numeric ids repeat across older exams, so they are namespaced. */
export const questionKey = (examId: string, qid: string | number): string =>
  typeof qid === 'number' ? `${examId}:${qid}` : String(qid);

export interface WrongEntry {
  key: string;
  question: ExamQuestion;
  timesWrong: number;
  lastWrongAt: string;
}

const isRight = (selected: number[], correct: number[]) =>
  selected.length === correct.length && selected.every((a) => correct.includes(a));

/** Finds the question an attempt's answer key refers to (older exams use numeric ids, the notebook uses namespaced keys). */
export const buildResolver = (exams: ExamSet[]) => {
  const real = exams.filter((e) => e.id !== NOTEBOOK_ID);
  const byKey = new Map<string, ExamQuestion>();
  const perExam = new Map<string, Map<string, ExamQuestion>>();
  real.forEach((e) => {
    const m = new Map<string, ExamQuestion>();
    e.questions.forEach((q) => {
      const key = questionKey(e.id, q.id);
      const asKeyed = typeof q.id === 'number' ? { ...q, id: key } : q;
      byKey.set(key, asKeyed);
      m.set(String(q.id), asKeyed);
    });
    perExam.set(e.id, m);
  });
  const resolve = (examId: string, rawId: string): ExamQuestion | undefined =>
    examId === NOTEBOOK_ID ? byKey.get(rawId) : perExam.get(examId)?.get(rawId);
  return { byKey, resolve };
};

/**
 * Questions whose most recent answer was wrong. Answering one correctly later (in any exam,
 * including the notebook itself) removes it, so the notebook shrinks as you learn.
 */
export const collectWrong = (exams: ExamSet[], attempts: ExamAttempt[]): WrongEntry[] => {
  const { byKey, resolve } = buildResolver(exams);

  const state = new Map<string, { wrong: boolean; times: number; lastWrongAt: string }>();
  [...attempts]
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach((att) => {
      Object.entries(att.userAnswers || {}).forEach(([rawId, selected]) => {
        if (!selected || selected.length === 0) return; // skipped questions say nothing about knowledge
        const q = resolve(att.examId, rawId);
        if (!q) return;
        const key = String(q.id);
        const right = isRight(selected, q.correctAnswers || []);
        const prev = state.get(key) ?? { wrong: false, times: 0, lastWrongAt: '' };
        state.set(key, {
          wrong: !right,
          times: prev.times + (right ? 0 : 1),
          lastWrongAt: right ? prev.lastWrongAt : att.date,
        });
      });
    });

  return [...state.entries()]
    .filter(([, v]) => v.wrong)
    .map(([key, v]) => ({ key, question: byKey.get(key)!, timesWrong: v.times, lastWrongAt: v.lastWrongAt }))
    .filter((e) => !!e.question)
    // most repeated mistakes first, then most recent
    .sort((a, b) => b.timesWrong - a.timesWrong || b.lastWrongAt.localeCompare(a.lastWrongAt));
};

/** A practice set built from the wrong answers (at most 50 per round). */
export const buildNotebookExam = (entries: WrongEntry[]): ExamSet | null => {
  if (entries.length === 0) return null;
  const questions = entries.slice(0, 50).map((e) => e.question);
  return {
    id: NOTEBOOK_ID,
    title: `Sổ tay câu sai (${entries.length} câu)`,
    titleVi: `Sổ tay câu sai (${entries.length} câu)`,
    description: 'Questions you answered incorrectly most recently.',
    descriptionVi: `${entries.length} câu bạn trả lời sai ở lần làm gần nhất${entries.length > 50 ? ' (mỗi lượt luyện 50 câu, ưu tiên câu sai nhiều lần)' : ''}. Trả lời đúng một câu thì nó rời khỏi sổ tay.`,
    timeLimitMinutes: Math.max(10, questions.length * 2),
    passingScore: 700,
    totalScore: 1000,
    questions,
  };
};
