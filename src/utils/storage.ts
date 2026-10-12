import { ExamSet, ExamAttempt } from '../types';
import { DEFAULT_EXAMS } from '../data/defaultExams';

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
  } catch (e) {
    console.error('Failed to save custom exam', e);
  }
};

export const deleteCustomExam = (examId: string): void => {
  try {
    const current = getStoredCustomExams();
    const updated = current.filter((e) => e.id !== examId);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_EXAMS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete custom exam', e);
  }
};

export const getAllExams = (): ExamSet[] => {
  const custom = getStoredCustomExams();
  return [...DEFAULT_EXAMS, ...custom];
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
    return updated;
  } catch (e) {
    return [];
  }
};
