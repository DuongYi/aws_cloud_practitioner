import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { StudySections } from './components/StudySections';
import { ExamSimulator } from './components/ExamSimulator';
import type { SectionItem } from './types';
import { supabase } from './utils/supabase';
import { useRoute, navigate, buildPath, Tab } from './utils/router';
import { syncAll } from './utils/sync';
import { 
  getExamSession,
  applySyncedData,
  getStoredCustomExams, 
  getAllExams, 
  loadDumpExams,
  getCompletedLectures, 
  toggleCompletedLecture, 
  getBookmarkedFacts, 
  toggleBookmarkedFact,
  getExamAttempts,
  getPracticeLog
} from './utils/storage';
import { motion, useReducedMotion } from 'motion/react';
import { InstallPrompt } from './components/InstallPrompt';
import { collectWrong, buildNotebookExam } from './utils/wrongNotebook';
import { Award, ShieldCheck, Heart, Sparkles } from 'lucide-react';

const CheatSheetView = lazy(() => import('./components/CheatSheetView').then((m) => ({ default: m.CheatSheetView })));
const ExamManager = lazy(() => import('./components/ExamManager').then((m) => ({ default: m.ExamManager })));

const ProgressDashboard = lazy(() => import('./components/ProgressDashboard').then((m) => ({ default: m.ProgressDashboard })));
const WrongReview = lazy(() => import('./components/WrongReview').then((m) => ({ default: m.WrongReview })));

const PageSkeleton = () => (
  <div className="space-y-4 px-4 py-8 sm:px-6 lg:px-8" role="status" aria-label="Đang tải">
    <div className="skeleton h-40 w-full" />
    <div className="skeleton h-24 w-2/3" />
    <div className="skeleton h-64 w-full" />
  </div>
);

export default function App() {
  // Large static content is loaded after the shell renders
  const [sections, setSections] = useState<SectionItem[]>([]);
  const [examsReady, setExamsReady] = useState(false);

  const route = useRoute();
  const activeTab = route.tab;

  // Old ?tab=exam links keep working
  useEffect(() => {
    const legacy = new URLSearchParams(window.location.search).get('tab');
    if (legacy === 'study' || legacy === 'cheatsheet' || legacy === 'exam' || legacy === 'manage') {
      navigate(buildPath(legacy), { replace: true });
    }
  }, []);
  const [examMounted, setExamMounted] = useState<boolean>(() => !!getExamSession() || route.tab === 'exam');
  const [searchQuery, setSearchQuery] = useState('');
  const [langMode, setLangMode] = useState<'bilingual' | 'vi' | 'en'>('bilingual');
  const reduceMotion = useReducedMotion();

  // Persistence state
  const [completedLectures, setCompletedLectures] = useState<string[]>([]);
  const [bookmarkedFacts, setBookmarkedFacts] = useState<string[]>([]);
  const [allExamsList, setAllExamsList] = useState(getAllExams());
  const [examAttempts, setExamAttempts] = useState(getExamAttempts());
  const [practiceLog, setPracticeLog] = useState(getPracticeLog());

  useEffect(() => {
    setCompletedLectures(getCompletedLectures());
    setBookmarkedFacts(getBookmarkedFacts());
    setAllExamsList(getAllExams());
    setExamAttempts(getExamAttempts());
    setPracticeLog(getPracticeLog());
  }, []);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === '1') {
        switchTab('study');
      } else if (e.key === '2') {
        switchTab('cheatsheet');
      } else if (e.key === '3') {
        switchTab('exam');
      } else if (e.key === '4') {
        switchTab('review');
      } else if (e.key === '5') {
        switchTab('progress');
      } else if (e.key === '6') {
        switchTab('manage');
      } else if (e.key === '/') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
        searchInput?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [accountEmail, setAccountEmail] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  // Bumped after every finished cloud sync so views holding their own copy (the exam simulator's
  // in-progress rounds) re-read it instead of keeping what was on this device before signing in.
  const [syncVersion, setSyncVersion] = useState(0);

  useEffect(() => {
    if (!supabase) return;
    let syncedUser: string | null = null;
    let running = false;

    const snapshot = () => ({
      lectures: getCompletedLectures(),
      bookmarks: getBookmarkedFacts(),
      attempts: getExamAttempts(),
      practice: getPracticeLog(),
      customExams: getStoredCustomExams(),
    });

    const runSync = async (userId: string | null, email: string | null) => {
      setAccountEmail(email);
      if (!userId) {
        syncedUser = null;
        setSyncVersion((n) => n + 1);
        return;
      }
      // supabase-js emits SIGNED_IN again whenever the browser tab regains focus.
      // Only sync once per user, otherwise stale results overwrite fresh edits.
      if (syncedUser === userId || running) return;
      running = true;
      setSyncing(true);
      try {
        for (let attempt = 0; attempt < 3; attempt++) {
          const before = JSON.stringify(snapshot());
          const merged = await syncAll(snapshot());
          if (!merged) break;
          // The user edited while the request was in flight: merge again instead of overwriting.
          if (JSON.stringify(snapshot()) !== before) continue;
          applySyncedData(merged);
          setCompletedLectures(merged.lectures);
          setBookmarkedFacts(merged.bookmarks);
          setAllExamsList(getAllExams());
          setExamAttempts(getExamAttempts());
          setPracticeLog(getPracticeLog());
          setSyncVersion((n) => n + 1);
          syncedUser = userId;
          break;
        }
      } finally {
        running = false;
        setSyncing(false);
      }
    };

    supabase.auth.getSession().then(({ data }) => runSync(data.session?.user.id ?? null, data.session?.user.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        void runSync(session?.user.id ?? null, session?.user.email ?? null);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // navigate() alone (e.g. the links from the progress and review screens) must also mount the simulator
  useEffect(() => {
    if (route.tab === 'exam') setExamMounted(true);
  }, [route.tab]);

  useEffect(() => {
    import('./data/sections').then((m) => setSections(m.SECTIONS_DATA));
    loadDumpExams().then(() => {
      setAllExamsList(getAllExams());
      setExamsReady(true);
    });
  }, []);

  const handleToggleCompleted = (lectureId: string) => {
    const updated = toggleCompletedLecture(lectureId);
    setCompletedLectures(updated);
  };

  const handleToggleBookmark = (factKey: string) => {
    const updated = toggleBookmarkedFact(factKey);
    setBookmarkedFacts(updated);
  };

  const handleRefreshExams = () => {
    setAllExamsList(getAllExams());
    setExamAttempts(getExamAttempts());
  };

  // The wrong-answer notebook is built from attempt history and shown as one more exam
  const wrongEntries = useMemo(() => collectWrong(allExamsList, examAttempts, practiceLog), [allExamsList, examAttempts, practiceLog]);
  const examsWithNotebook = useMemo(() => {
    const nb = buildNotebookExam(wrongEntries);
    return nb ? [nb, ...allExamsList] : allExamsList;
  }, [wrongEntries, allExamsList]);

  const totalLecturesCount = useMemo(() => {
    return sections.reduce((acc, sec) => acc + sec.lectures.length, 0);
  }, [sections]);

  const totalCoreFactsCount = useMemo(() => {
    return sections.reduce((acc, sec) => acc + sec.quickExamFacts.length, 0);
  }, [sections]);

  const switchTab = (tab: Tab | 'history') => {
    const target: Tab = tab === 'history' ? 'study' : tab;
    if (target === 'exam') setExamMounted(true);
    navigate(buildPath(target));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="grain flex min-h-[100dvh] flex-col bg-slate-950 font-sans text-slate-100 antialiased selection:bg-orange-500 selection:text-slate-950 overflow-x-clip">
      <div className="ambient-mesh" aria-hidden="true" />
      <a href="#main" className="skip-link">Bỏ qua tới nội dung chính</a>

      {/* Global Commercial Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={switchTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        langMode={langMode}
        setLangMode={setLangMode}
        completedLecturesCount={completedLectures.length}
        totalLecturesCount={totalLecturesCount}
        bookmarkedCount={bookmarkedFacts.length}
        accountEmail={accountEmail}
        syncing={syncing}
      />

      <main id="main" className="mx-auto w-full max-w-[1440px] flex-1 pb-16 relative z-10">
        
        {/* Executive Readiness Dashboard (Displayed on Study & Home view) */}
        {activeTab === 'study' && sections.length > 0 && (
          <ExecutiveDashboard
            sections={sections}
            completedLectures={completedLectures}
            examAttempts={examAttempts}
            onNavigateTab={switchTab}
          />
        )}

        <motion.div
          key={activeTab}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeTab === 'study' && sections.length === 0 && <PageSkeleton />}

          {activeTab === 'study' && sections.length > 0 && (
            <StudySections
              sections={sections}
              searchQuery={searchQuery}
              langMode={langMode}
              completedLectures={completedLectures}
              onToggleCompleted={handleToggleCompleted}
              bookmarkedFacts={bookmarkedFacts}
              onToggleBookmark={handleToggleBookmark}
              routeLectureId={route.tab === 'study' ? route.id : undefined}
              onSelectLecture={(id, replace) => navigate(buildPath('study', id), { replace })}
            />
          )}

          {activeTab === 'cheatsheet' && (
            <Suspense fallback={<PageSkeleton />}>
              <CheatSheetView />
            </Suspense>
          )}

          {activeTab === 'review' && (
            <Suspense fallback={<PageSkeleton />}>
              <WrongReview
                exams={allExamsList}
                attempts={examAttempts}
                practice={practiceLog}
                langMode={langMode}
                syncing={syncing}
                accountEmail={accountEmail}
              />
            </Suspense>
          )}

          {activeTab === 'progress' && (
            <Suspense fallback={<PageSkeleton />}>
              <ProgressDashboard
                attempts={examAttempts}
                practice={practiceLog}
                exams={allExamsList}
                sections={sections}
                completedLectures={completedLectures}
                wrongCount={wrongEntries.length}
              />
            </Suspense>
          )}

          {activeTab === 'manage' && (
            <Suspense fallback={<PageSkeleton />}>
              <ExamManager
                customExams={getStoredCustomExams()}
                onExamsUpdated={handleRefreshExams}
                onSelectExamToTake={() => switchTab('exam')}
              />
            </Suspense>
          )}
        </motion.div>

        {/* Kept mounted once opened so an exam in progress keeps its answers and timer while browsing other tabs */}
        {examMounted && (
          <div hidden={activeTab !== 'exam'}>
            {!examsReady && activeTab === 'exam' && <PageSkeleton />}
            {examsReady && <ExamSimulator
              exams={examsWithNotebook}
              langMode={langMode}
              onFinishAttempt={handleRefreshExams}
              onPracticeRecorded={() => setPracticeLog(getPracticeLog())}
              attempts={examAttempts}
              practice={practiceLog}
              syncNonce={syncVersion}
              active={route.tab === 'exam'}
              routeExamId={route.tab === 'exam' ? route.id : undefined}
              onSelectExam={(id, replace) => navigate(buildPath('exam', id), { replace })}
            />}
          </div>
        )}
      </main>

      {/* Commercial Grade Footer */}
      {activeTab !== 'exam' && <InstallPrompt />}

      <footer className="border-t border-white/[0.08] bg-slate-950 px-4 py-10 text-xs text-slate-400 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 md:flex-row md:items-center">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">
                CloudPrep Pro™ • AWS Certified Cloud Practitioner (CLF-C02)
              </span>
              <span className="rounded-md border border-white/[0.08] bg-slate-900 px-2 py-0.5 font-mono text-[10px] text-orange-400">
                2026 Commercial Edition
              </span>
            </div>
            <p className="text-[11px] text-slate-500 max-w-xl">
              Nền tảng ôn luyện và thi thử độc lập mô phỏng theo chuẩn Pearson VUE. AWS và logo AWS là thương hiệu thuộc sở hữu của Amazon.com, Inc.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-mono tabular-nums text-slate-400">
            <span className="rounded-xl border border-white/[0.06] bg-slate-900/90 px-3 py-1.5 text-slate-300">
              {sections.length} chuyên đề • {totalLecturesCount} bài học • {totalCoreFactsCount} điểm cốt lõi • {allExamsList.length} bộ đề
            </span>
          </div>

        </div>
      </footer>
    </div>
  );
}
