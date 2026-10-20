import { ExamAttempt, ExamSet, PracticeAnswer } from '../types';
import { buildResolver, buildAnswerEvents } from './wrongNotebook';

export interface DomainProgress {
  domain: string;
  poolSize: number; // distinct questions available in this domain
  seen: number; // distinct questions answered at least once
  correct: number; // of the seen ones, how many were right the last time
  avgSeconds: number; // average time per question (0 when no timing data yet)
}

export interface ProgressSummary {
  attempts: number;
  passedAttempts: number;
  bestScore: number;
  lastScore: number | null;
  answered: number; // distinct questions answered
  accuracy: number; // 0..1 over latest answers
  domains: DomainProgress[];
}

export const DOMAINS = [
  'Domain 1: Cloud Concepts',
  'Domain 2: Security and Compliance',
  'Domain 3: Cloud Technology and Services',
  'Domain 4: Billing, Pricing and Support',
] as const;

/** Learning progress derived from the answer history: only the latest answer to each question counts. */
export const analyzeProgress = (exams: ExamSet[], attempts: ExamAttempt[], practice: PracticeAnswer[] = []): ProgressSummary => {
  const { byKey } = buildResolver(exams);
  const latest = new Map<string, boolean>();
  const timing = new Map<string, { sec: number; n: number }>();

  buildAnswerEvents(exams, attempts, practice).forEach((e) => {
    latest.set(e.key, e.right);
    if (e.seconds > 0) {
      const t = timing.get(e.question.domain) ?? { sec: 0, n: 0 };
      timing.set(e.question.domain, { sec: t.sec + e.seconds, n: t.n + 1 });
    }
  });

  const domains: DomainProgress[] = DOMAINS.map((domain) => {
    const pool = [...byKey.values()].filter((q) => q.domain === domain);
    const poolKeys = new Set(pool.map((q) => String(q.id)));
    let seen = 0;
    let correct = 0;
    latest.forEach((right, key) => {
      if (poolKeys.has(key)) {
        seen += 1;
        if (right) correct += 1;
      }
    });
    const t = timing.get(domain);
    return { domain, poolSize: poolKeys.size, seen, correct, avgSeconds: t && t.n ? t.sec / t.n : 0 };
  });

  const sorted = [...attempts].sort((a, b) => a.date.localeCompare(b.date));
  const answered = [...latest.keys()].length;
  const correctAll = [...latest.values()].filter(Boolean).length;
  return {
    attempts: attempts.length,
    passedAttempts: attempts.filter((a) => a.passed).length,
    bestScore: attempts.reduce((m, a) => Math.max(m, a.score), 0),
    lastScore: sorted.length ? sorted[sorted.length - 1].score : null,
    answered,
    accuracy: answered ? correctAll / answered : 0,
    domains,
  };
};

/** How much of each exam has been answered, and how many of those answers were right the last time. */
export const examCoverage = (exams: ExamSet[], attempts: ExamAttempt[], practice: PracticeAnswer[] = []): Record<string, { seen: number; correct: number }> => {
  const latest = new Map<string, boolean>();
  buildAnswerEvents(exams, attempts, practice).forEach((e) => latest.set(e.key, e.right));
  const out: Record<string, { seen: number; correct: number }> = {};
  exams.forEach((exam) => {
    let seen = 0;
    let correct = 0;
    exam.questions.forEach((q) => {
      const key = typeof q.id === 'number' ? `${exam.id}:${q.id}` : String(q.id);
      if (latest.has(key)) {
        seen += 1;
        if (latest.get(key)) correct += 1;
      }
    });
    out[exam.id] = { seen, correct };
  });
  return out;
};
