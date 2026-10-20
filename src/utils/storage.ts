import { ExamSet, ExamAttempt, ExamSession } from '../types';
import { DEFAULT_EXAMS } from '../data/defaultExams';
import { pushSession, removeSession, pushAttempt, pushBookmark, pushCustomExam, pushLecture, removeCustomExam } from './sync';

const STORAGE_KEYS = {
  CUSTOM_EXAMS: 'aws_ccp_custom_exams',
  EXAM_HISTORY: 'aws_ccp_exam_history',
  COMPLETED_LECTURES: 'aws_ccp_completed_lectures',
  BOOKMARKED_FACTS: 'aws_ccp_bookmarked_facts',
  LANGUAGE_PREF: 'aws_ccp_lang_pref'
};

export const getStoredCustomExams = (): ExamSet[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_EXAMS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load custom exams', e);
    return [];
  }
};

export const saveCustomExam = (exam: ExamSet): void => {
  try {
    const current = getStoredCustomExams();
    const updated = [exam, ...current.filter((e) => e.id !== exam.id)];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_EXAMS, JSON.stringify(updated));
    void pushCustomExam(exam);
  } catch (e) {
    console.error('Failed to save custom exam', e);
  }
};

export const deleteCustomExam = (examId: string): void => {
  try {
    const current = getStoredCustomExams();
    const updated = current.filter((e) => e.id !== examId);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_EXAMS, JSON.stringify(updated));
    void removeCustomExam(examId);
  } catch (e) {
    console.error('Failed to delete custom exam', e);
  }
};

// The imported question bank is large, so it is fetched on demand instead of being bundled into the first load.
let dumpExams: ExamSet[] = [];
export const loadDumpExams = async (): Promise<void> => {
  if (dumpExams.length === 0) dumpExams = (await import('../data/dumpExams')).DUMP_EXAMS;
};

export const getAllExams = (): ExamSet[] => {
  const custom = getStoredCustomExams();
  return [...DEFAULT_EXAMS, ...dumpExams, ...custom];
};

export const getExamAttempts = (): ExamAttempt[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXAM_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load exam attempts', e);
    return [];
  }
};

export const saveExamAttempt = (attempt: ExamAttempt): void => {
  try {
    const current = getExamAttempts();
    const updated = [attempt, ...current].slice(0, 50); // keep last 50
    localStorage.setItem(STORAGE_KEYS.EXAM_HISTORY, JSON.stringify(updated));
    void pushAttempt(attempt);
  } catch (e) {
    console.error('Failed to save exam attempt', e);
  }
};

export const getCompletedLectures = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED_LECTURES);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const toggleCompletedLecture = (lectureId: string): string[] => {
  try {
    const current = getCompletedLectures();
    const exists = current.includes(lectureId);
    const updated = exists ? current.filter((id) => id !== lectureId) : [...current, lectureId];
    localStorage.setItem(STORAGE_KEYS.COMPLETED_LECTURES, JSON.stringify(updated));
    void pushLecture(lectureId, !exists);
    return updated;
  } catch (e) {
    return [];
  }
};

export const getBookmarkedFacts = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKED_FACTS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const toggleBookmarkedFact = (factKey: string): string[] => {
  try {
    const current = getBookmarkedFacts();
    const exists = current.includes(factKey);
    const updated = exists ? current.filter((id) => id !== factKey) : [...current, factKey];
    localStorage.setItem(STORAGE_KEYS.BOOKMARKED_FACTS, JSON.stringify(updated));
    void pushBookmark(factKey, !exists);
    return updated;
  } catch (e) {
    return [];
  }
};

/** Replace local copies with the merged result of a cloud sync. */
export const applySyncedData = (d: { lectures: string[]; bookmarks: string[]; attempts: ExamAttempt[]; customExams: ExamSet[] }): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_LECTURES, JSON.stringify(d.lectures));
    localStorage.setItem(STORAGE_KEYS.BOOKMARKED_FACTS, JSON.stringify(d.bookmarks));
    localStorage.setItem(STORAGE_KEYS.EXAM_HISTORY, JSON.stringify(d.attempts));
    localStorage.setItem(STORAGE_KEYS.CUSTOM_EXAMS, JSON.stringify(d.customExams));
  } catch (e) {
    console.error('Failed to apply synced data', e);
  }
};

const SESSIONS_KEY = 'aws_ccp_exam_sessions';
const LEGACY_SESSION_KEY = 'aws_ccp_exam_session';

/** Returns all active/paused exam sessions keyed by examId */
export const getAllExamSessions = (): Record<string, ExamSession> => {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    const map: Record<string, ExamSession> = raw ? JSON.parse(raw) : {};

    // Auto-migrate legacy single session if present
    const legacyRaw = localStorage.getItem(LEGACY_SESSION_KEY);
    if (legacyRaw) {
      try {
        const legacy: ExamSession = JSON.parse(legacyRaw);
        if (legacy?.examId && (!map[legacy.examId] || legacy.updatedAt > map[legacy.examId].updatedAt)) {
          map[legacy.examId] = legacy;
          localStorage.setItem(SESSIONS_KEY, JSON.stringify(map));
        }
      } catch { /* ignore */ }
    }
    return map;
  } catch {
    return {};
  }
};

/**
 * Returns an exam session:
 * - If examId is provided: returns session for that specific exam.
 * - If examId is omitted: returns the most recently updated session.
 */
export const getExamSession = (examId?: string): ExamSession | null => {
  const map = getAllExamSessions();
  if (examId) {
    return map[examId] || null;
  }
  const sessions = Object.values(map);
  if (sessions.length === 0) return null;
  sessions.sort((a, b) => b.updatedAt - a.updatedAt);
  return sessions[0];
};

/**
 * Saves/updates an exam session (keyed by session.examId) without clearing other exams' progress.
 */
export const saveExamSession = (session: ExamSession, immediate = false): Promise<boolean | null> => {
  try {
    const map = getAllExamSessions();
    map[session.examId] = session;
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(map));
    // Keep legacy single key synced with latest session for backwards-compatibility
    localStorage.setItem(LEGACY_SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    console.error('Failed to save exam session', e);
  }
  return pushSession(session, immediate);
};

/**
 * Clears an exam session:
 * - If examId is specified: deletes only that exam's progress.
 * - If examId is omitted: clears all sessions.
 */
export const clearExamSession = (examId?: string): void => {
  try {
    if (examId) {
      const map = getAllExamSessions();
      delete map[examId];
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(map));
      const remaining = Object.values(map).sort((a, b) => b.updatedAt - a.updatedAt);
      if (remaining.length > 0) {
        localStorage.setItem(LEGACY_SESSION_KEY, JSON.stringify(remaining[0]));
      } else {
        localStorage.removeItem(LEGACY_SESSION_KEY);
      }
      void removeSession(examId);
    } else {
      localStorage.removeItem(SESSIONS_KEY);
      localStorage.removeItem(LEGACY_SESSION_KEY);
      void removeSession();
    }
  } catch { /* ignore */ }
};

/** Store sessions fetched from cloud when they are newer than local ones */
export const adoptCloudSessions = (cloudSessions: ExamSession[]): Record<string, ExamSession> => {
  const localMap = getAllExamSessions();
  let modified = false;
  for (const cloud of cloudSessions) {
    if (!cloud?.examId) continue;
    const local = localMap[cloud.examId];
    if (!local || cloud.updatedAt > local.updatedAt) {
      localMap[cloud.examId] = cloud;
      modified = true;
    }
  }
  if (modified) {
    try { localStorage.setItem(SESSIONS_KEY, JSON.stringify(localMap)); } catch { /* ignore */ }
  }
  return localMap;
};

export const adoptCloudSession = (cloud: ExamSession | null): ExamSession | null => {
  if (!cloud?.examId) return getExamSession();
  adoptCloudSessions([cloud]);
  return getExamSession(cloud.examId);
};
