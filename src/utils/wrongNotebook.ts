import { ExamAttempt, ExamQuestion, ExamSet, PracticeAnswer } from '../types';

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

export interface AnswerEvent {
  key: string;
  question: ExamQuestion;
  right: boolean;
  at: string;
  /** Seconds spent, when known. */
  seconds: number;
  examId: string;
}

/** Every recorded answer in time order: from submitted exams and from practice answers checked on the spot. */
export const buildAnswerEvents = (exams: ExamSet[], attempts: ExamAttempt[], practice: PracticeAnswer[] = []): AnswerEvent[] => {
  const { byKey, resolve } = buildResolver(exams);
  const events: AnswerEvent[] = [];

  // A practice answer is also part of the round's submitted attempt. Skip that second copy so
  // one mistake is not counted twice (same question, same outcome, submitted within 12 hours).
  const practiceByKey = new Map<string, PracticeAnswer[]>();
  practice.forEach((p) => practiceByKey.set(p.key, [...(practiceByKey.get(p.key) ?? []), p]));
  const duplicatesPractice = (key: string, right: boolean, attemptAt: string) =>
    (practiceByKey.get(key) ?? []).some((p) => {
      const gap = new Date(attemptAt).getTime() - new Date(p.at).getTime();
      return p.correct === right && gap >= 0 && gap <= 12 * 3600 * 1000;
    });

  attempts.forEach((att) => {
    Object.entries(att.userAnswers || {}).forEach(([rawId, selected]) => {
      if (!selected || selected.length === 0) return; // skipped questions say nothing about knowledge
      const q = resolve(att.examId, rawId);
      if (!q) return;
      const right = isRight(selected, q.correctAnswers || []);
      if (duplicatesPractice(String(q.id), right, att.date)) return;
      events.push({
        key: String(q.id),
        question: q,
        right,
        at: att.date,
        seconds: att.questionTimes?.[rawId] ?? 0,
        examId: att.examId,
      });
    });
  });

  practice.forEach((p) => {
    const q = byKey.get(p.key);
    if (q) events.push({ key: p.key, question: q, right: p.correct, at: p.at, seconds: p.seconds, examId: p.examId });
  });

  return events.sort((a, b) => a.at.localeCompare(b.at));
};

/**
 * Questions whose most recent answer was wrong. Answering one correctly later (in any exam,
 * including the notebook itself) removes it, so the notebook shrinks as you learn.
 */
export const collectWrong = (exams: ExamSet[], attempts: ExamAttempt[], practice: PracticeAnswer[] = []): WrongEntry[] => {
  const state = new Map<string, { wrong: boolean; times: number; lastWrongAt: string; question: ExamQuestion }>();
  buildAnswerEvents(exams, attempts, practice).forEach((e) => {
    const prev = state.get(e.key) ?? { wrong: false, times: 0, lastWrongAt: '', question: e.question };
    state.set(e.key, {
      question: e.question,
      wrong: !e.right,
      times: prev.times + (e.right ? 0 : 1),
      lastWrongAt: e.right ? prev.lastWrongAt : e.at,
    });
  });

  return [...state.entries()]
    .filter(([, v]) => v.wrong)
    .map(([key, v]) => ({ key, question: v.question, timesWrong: v.times, lastWrongAt: v.lastWrongAt }))
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
