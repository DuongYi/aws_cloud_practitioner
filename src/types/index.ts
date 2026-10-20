export type ExamDomain = 
  | 'Domain 1: Cloud Concepts' 
  | 'Domain 2: Security and Compliance' 
  | 'Domain 3: Cloud Technology and Services' 
  | 'Domain 4: Billing, Pricing and Support';

export interface LectureItem {
  id: string;
  number: number;
  titleEn: string;
  titleVi: string;
  summaryEn: string;
  summaryVi: string;
  keyPointsEn: string[];
  keyPointsVi: string[];
  examTipsEn?: string[];
  examTipsVi?: string[];
  isCore?: boolean;
  duration?: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface SectionItem {
  id: string;
  sectionNumber: number;
  titleEn: string;
  titleVi: string;
  overviewEn: string;
  overviewVi: string;
  domain: ExamDomain;
  weightPercentage: string;
  badge: string;
  quickExamFacts: {
    en: string;
    vi: string;
    isCoreHighlight?: boolean;
  }[];
  lectures: LectureItem[];
}

export interface CheatSheetComparison {
  id: string;
  title: string;
  titleVi: string;
  category: string;
  headers: string[];
  rows: string[][];
  keyNoteVi?: string;
}

export interface KeywordQuickLookup {
  keyword: string;
  keywordVi: string;
  service: string;
  category: string;
  explanationVi: string;
}

export interface ExamQuestion {
  id: string | number;
  question: string;
  options: string[];
  correctAnswers: number[]; // 0-indexed indices
  isMultipleResponse?: boolean;
  domain: ExamDomain;
  explanation: string;
  explanationVi: string;
  referenceSection?: string;
  referenceLecture?: string;
}

export interface ExamSet {
  id: string;
  title: string;
  titleVi?: string;
  description: string;
  descriptionVi?: string;
  timeLimitMinutes: number;
  passingScore: number;
  totalScore: number;
  questions: ExamQuestion[];
  isCustom?: boolean;
  createdAt?: string;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  examTitle: string;
  date: string;
  score: number;
  passed: boolean;
  totalQuestions: number;
  correctCount: number;
  timeSpentSeconds: number;
  domainScores: Record<string, { correct: number; total: number }>;
  userAnswers: Record<string | number, number[]>;
  flaggedQuestionIds: (string | number)[];
  /** Seconds spent on each question (by question id). */
  questionTimes?: Record<string | number, number>;
  /** The exam's time limit, to judge pace afterwards. */
  timeLimitSeconds?: number;
}

/** A half-finished exam, saved so it can be resumed after a tab switch or reload. */
export interface ExamSession {
  examId: string;
  mode: 'strict' | 'practice';
  currentIndex: number;
  answers: Record<string | number, number[]>;
  flagged: (string | number)[];
  eliminated: Record<string | number, number[]>;
  /** Practice mode: questions whose answer the user has already checked. */
  checked?: (string | number)[];
  /** Seconds spent on each question so far. */
  questionTimes?: Record<string | number, number>;
  /** Epoch ms when time runs out. */
  endsAt: number;
  /** Preserved seconds left when exam was paused. */
  remainingSeconds?: number;
  updatedAt: number;
  /** True when the user left the exam on purpose; false means it was interrupted. */
  paused?: boolean;
}

/** One answer checked in practice mode. Kept as a log so progress survives rounds that are never submitted. */
export interface PracticeAnswer {
  /** Unique per answer; also the dedupe key in the cloud table. */
  id: string;
  /** Question key (see questionKey in utils/wrongNotebook). */
  key: string;
  examId: string;
  selected: number[];
  correct: boolean;
  seconds: number;
  at: string;
}
