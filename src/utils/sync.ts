import { ExamAttempt, ExamSet, ExamSession, PracticeAnswer } from '../types';
import { supabase } from './supabase';

/**
 * Write-through sync. localStorage stays the source of truth for the UI;
 * every change is also pushed to Supabase when a user is signed in.
 * Failures are logged and never block the interface.
 */

const userId = async (): Promise<string | null> => {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id ?? null;
};

const run = async (label: string, fn: () => PromiseLike<{ error: { message: string } | null }>): Promise<boolean> => {
  try {
    const { error } = await fn();
    if (error) {
      console.warn(`[sync] ${label}: ${error.message}`);
      return false;
    }
    return true;
  } catch (e) {
    console.warn(`[sync] ${label} failed`, e);
    return false;
  }
};

export const pushLecture = async (lectureId: string, completed: boolean) => {
  if (!supabase || !(await userId())) return;
  if (completed) {
    await run('lecture', () =>
      supabase!.from('lecture_progress').upsert({ lecture_id: lectureId }, { onConflict: 'user_id,lecture_id', ignoreDuplicates: true })
    );
  } else {
    await run('lecture', () => supabase!.from('lecture_progress').delete().eq('lecture_id', lectureId));
  }
};

export const pushBookmark = async (factKey: string, bookmarked: boolean) => {
  if (!supabase || !(await userId())) return;
  if (bookmarked) {
    await run('bookmark', () =>
      supabase!.from('bookmarked_facts').upsert({ fact_key: factKey }, { onConflict: 'user_id,fact_key', ignoreDuplicates: true })
    );
  } else {
    await run('bookmark', () => supabase!.from('bookmarked_facts').delete().eq('fact_key', factKey));
  }
};

const attemptRow = (a: ExamAttempt) => ({
  client_id: a.id,
  exam_id: a.examId,
  exam_title: a.examTitle,
  score: a.score,
  passed: a.passed,
  total_questions: a.totalQuestions,
  correct_count: a.correctCount,
  time_spent_seconds: Math.max(0, Math.round(a.timeSpentSeconds)),
  domain_scores: a.domainScores,
  user_answers: a.userAnswers,
  flagged_question_ids: a.flaggedQuestionIds,
  question_times: a.questionTimes ?? {},
  time_limit_seconds: a.timeLimitSeconds ?? null,
  attempted_at: a.date,
});

export const pushAttempt = async (attempt: ExamAttempt) => {
  if (!supabase || !(await userId())) return;
  await run('attempt', () =>
    supabase!.from('exam_attempts').upsert(attemptRow(attempt), { onConflict: 'user_id,client_id', ignoreDuplicates: true })
  );
};

export const pushCustomExam = async (exam: ExamSet) => {
  if (!supabase || !(await userId())) return;
  await run('custom exam', () =>
    supabase!.from('custom_exams').upsert({ id: exam.id, exam, updated_at: new Date().toISOString() }, { onConflict: 'user_id,id' })
  );
};

export const removeCustomExam = async (examId: string) => {
  if (!supabase || !(await userId())) return;
  await run('custom exam', () => supabase!.from('custom_exams').delete().eq('id', examId));
};

const practiceRow = (a: PracticeAnswer) => ({
  client_id: a.id,
  question_key: a.key,
  exam_id: a.examId,
  selected: a.selected,
  correct: a.correct,
  seconds: Math.max(0, Math.round(a.seconds)),
  answered_at: a.at,
});

export const pushPracticeAnswer = async (a: PracticeAnswer) => {
  if (!supabase || !(await userId())) return;
  await run('practice answer', () =>
    supabase!.from('practice_answers').upsert(practiceRow(a), { onConflict: 'user_id,client_id', ignoreDuplicates: true })
  );
};

interface LocalSnapshot {
  practice?: PracticeAnswer[];
  lectures: string[];
  bookmarks: string[];
  attempts: ExamAttempt[];
  customExams: ExamSet[];
}

/**
 * Merge local data and the cloud copy (union), upload what the cloud lacks,
 * and return the merged result for the caller to store locally.
 */
export const syncAll = async (local: LocalSnapshot): Promise<LocalSnapshot | null> => {
  if (!supabase || !(await userId())) return null;
  try {
    const [lec, bm, att, ce, pa] = await Promise.all([
      supabase.from('lecture_progress').select('lecture_id'),
      supabase.from('bookmarked_facts').select('fact_key'),
      supabase.from('exam_attempts').select('*').order('attempted_at', { ascending: false }).limit(200),
      supabase.from('custom_exams').select('id, exam'),
      supabase.from('practice_answers').select('client_id, question_key, exam_id, selected, correct, seconds, answered_at').order('answered_at', { ascending: false }).limit(2000),
    ]);
    const firstError = [lec, bm, att, ce, pa].find((r) => r.error)?.error;
    if (firstError) throw new Error(firstError.message);

    const cloudLectures = (lec.data ?? []).map((r) => r.lecture_id as string);
    const cloudBookmarks = (bm.data ?? []).map((r) => r.fact_key as string);
    const cloudAttempts: ExamAttempt[] = (att.data ?? []).map((r) => ({
      id: r.client_id,
      examId: r.exam_id,
      examTitle: r.exam_title,
      date: r.attempted_at,
      score: r.score,
      passed: r.passed,
      totalQuestions: r.total_questions,
      correctCount: r.correct_count,
      timeSpentSeconds: r.time_spent_seconds,
      domainScores: r.domain_scores,
      userAnswers: r.user_answers,
      flaggedQuestionIds: r.flagged_question_ids,
      questionTimes: r.question_times ?? {},
      timeLimitSeconds: r.time_limit_seconds ?? undefined,
    }));
    const cloudExams: ExamSet[] = (ce.data ?? []).map((r) => r.exam as ExamSet);
    const cloudPractice: PracticeAnswer[] = (pa.data ?? []).map((r) => ({
      id: r.client_id,
      key: r.question_key,
      examId: r.exam_id,
      selected: r.selected,
      correct: r.correct,
      seconds: r.seconds,
      at: r.answered_at,
    }));
    const localPractice = local.practice ?? [];
    const practiceIds = new Set(cloudPractice.map((a) => a.id));
    const practice = [...cloudPractice, ...localPractice.filter((a) => !practiceIds.has(a.id))]
      .sort((a, b) => a.at.localeCompare(b.at))
      .slice(-2000);

    const lectures = Array.from(new Set([...cloudLectures, ...local.lectures]));
    const bookmarks = Array.from(new Set([...cloudBookmarks, ...local.bookmarks]));
    const attemptIds = new Set(cloudAttempts.map((a) => a.id));
    const attempts = [...cloudAttempts, ...local.attempts.filter((a) => !attemptIds.has(a.id))].sort(
      (a, b) => b.date.localeCompare(a.date)
    );
    const examIds = new Set(cloudExams.map((e) => e.id));
    const customExams = [...cloudExams, ...local.customExams.filter((e) => !examIds.has(e.id))];

    const missing = <T,>(all: T[], have: T[]) => all.filter((x) => !have.includes(x));
    await Promise.all([
      missing(lectures, cloudLectures).length
        ? run('upload lectures', () =>
            supabase!.from('lecture_progress').upsert(missing(lectures, cloudLectures).map((lecture_id) => ({ lecture_id })), { onConflict: 'user_id,lecture_id', ignoreDuplicates: true }))
        : null,
      missing(bookmarks, cloudBookmarks).length
        ? run('upload bookmarks', () =>
            supabase!.from('bookmarked_facts').upsert(missing(bookmarks, cloudBookmarks).map((fact_key) => ({ fact_key })), { onConflict: 'user_id,fact_key', ignoreDuplicates: true }))
        : null,
      ...local.attempts.filter((a) => !attemptIds.has(a.id)).map((a) => pushAttempt(a)),
      ...local.customExams.filter((e) => !examIds.has(e.id)).map((e) => pushCustomExam(e)),
      ...localPractice.filter((a) => !practiceIds.has(a.id)).map((a) => pushPracticeAnswer(a)),
    ]);

    return { lectures, bookmarks, attempts: attempts.slice(0, 200), customExams, practice };
  } catch (e) {
    console.warn('[sync] syncAll failed', e);
    return null;
  }
};

/** Debounced: one request per burst of answers, tracked per examId. */
const sessionTimers: Record<string, ReturnType<typeof setTimeout>> = {};
/** Resolves to true (stored in cloud), false (cloud write failed) or null (not signed in). */
export const pushSession = (session: ExamSession, immediate = false): Promise<boolean | null> => {
  if (!supabase) return Promise.resolve(null);
  if (sessionTimers[session.examId]) {
    clearTimeout(sessionTimers[session.examId]);
  }
  return new Promise((resolve) => {
    sessionTimers[session.examId] = setTimeout(async () => {
      delete sessionTimers[session.examId];
      if (!(await userId())) return resolve(null);
      resolve(
        await run('session', () =>
          supabase!.from('exam_sessions').upsert(
            { exam_id: session.examId, state: session, updated_at: new Date(session.updatedAt).toISOString() },
            { onConflict: 'user_id,exam_id' }
          )
        )
      );
    }, immediate ? 0 : 1500);
  });
};

export const removeSession = async (examId?: string) => {
  if (!supabase) return;
  if (examId && sessionTimers[examId]) {
    clearTimeout(sessionTimers[examId]);
    delete sessionTimers[examId];
  }
  if (!(await userId())) return;
  const { data } = await supabase.auth.getSession();
  if (!data.session?.user) return;
  await run('session', () => {
    let q = supabase!.from('exam_sessions').delete().eq('user_id', data.session!.user.id);
    if (examId) q = q.eq('exam_id', examId);
    return q;
  });
};

export const fetchSessions = async (): Promise<ExamSession[]> => {
  if (!supabase || !(await userId())) return [];
  const { data, error } = await supabase.from('exam_sessions').select('state');
  if (error || !data) return [];
  return data.map((d) => d.state as ExamSession);
};

/**
 * Two-way merge of the in-progress exams: uploads the local ones the cloud does not have
 * (or that are newer) and returns the merged list. Called on sign-in, so a round started
 * before logging in is kept instead of being lost, and a round started on another device
 * can be continued here.
 */
export const syncSessions = async (local: ExamSession[]): Promise<ExamSession[]> => {
  if (!supabase || !(await userId())) return [];
  const merged = new Map<string, ExamSession>();
  (await fetchSessions()).forEach((s) => s?.examId && merged.set(s.examId, s));

  const toUpload: ExamSession[] = [];
  local.forEach((s) => {
    if (!s?.examId) return;
    const cloud = merged.get(s.examId);
    if (!cloud || s.updatedAt > cloud.updatedAt) {
      merged.set(s.examId, s);
      toUpload.push(s);
    }
  });
  await Promise.all(toUpload.map((s) => pushSession(s, true)));
  return [...merged.values()];
};

export const fetchSession = async (examId?: string): Promise<ExamSession | null> => {
  if (!supabase || !(await userId())) return null;
  let q = supabase.from('exam_sessions').select('state');
  if (examId) {
    q = q.eq('exam_id', examId);
    const { data, error } = await q.maybeSingle();
    if (error || !data) return null;
    return data.state as ExamSession;
  }
  const { data, error } = await q.order('updated_at', { ascending: false }).limit(1).maybeSingle();
  if (error || !data) return null;
  return data.state as ExamSession;
};
