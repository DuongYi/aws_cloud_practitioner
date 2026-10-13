import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { StudySections } from './components/StudySections';
import { CheatSheetView } from './components/CheatSheetView';
import { ExamSimulator } from './components/ExamSimulator';
import { ExamManager } from './components/ExamManager';
import { SECTIONS_DATA } from './data/sections';
import { 
  getStoredCustomExams, 
  getAllExams, 
  getCompletedLectures, 
  toggleCompletedLecture, 
  getBookmarkedFacts, 
  toggleBookmarkedFact,
  getExamAttempts
} from './utils/storage';
import { motion, useReducedMotion } from 'motion/react';
import { Award, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'study' | 'cheatsheet' | 'exam' | 'manage' | 'history'>(() => {
    const t = new URLSearchParams(window.location.search).get('tab');
    return t === 'cheatsheet' || t === 'exam' || t === 'manage' ? t : 'study';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [langMode, setLangMode] = useState<'bilingual' | 'vi' | 'en'>('bilingual');
  const reduceMotion = useReducedMotion();

  // Persistence state
  const [completedLectures, setCompletedLectures] = useState<string[]>([]);
  const [bookmarkedFacts, setBookmarkedFacts] = useState<string[]>([]);
  const [allExamsList, setAllExamsList] = useState(getAllExams());
  const [examAttempts, setExamAttempts] = useState(getExamAttempts());

  useEffect(() => {
    setCompletedLectures(getCompletedLectures());
    setBookmarkedFacts(getBookmarkedFacts());
    setAllExamsList(getAllExams());
    setExamAttempts(getExamAttempts());
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

  const totalLecturesCount = useMemo(() => {
    return SECTIONS_DATA.reduce((acc, sec) => acc + sec.lectures.length, 0);
  }, []);

  const totalCoreFactsCount = useMemo(() => {
    return SECTIONS_DATA.reduce((acc, sec) => acc + sec.quickExamFacts.length, 0);
  }, []);

  const switchTab = (tab: typeof activeTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="grain flex min-h-[100dvh] flex-col bg-slate-950 font-sans text-slate-100 antialiased selection:bg-orange-500 selection:text-slate-950">
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
      />

      <main id="main" className="mx-auto w-full max-w-[1440px] flex-1 pb-16 relative z-10">
        
        {/* Executive Readiness Dashboard (Displayed on Study & Home view) */}
        {activeTab === 'study' && (
          <ExecutiveDashboard
            sections={SECTIONS_DATA}
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
          {activeTab === 'study' && (
            <StudySections
              sections={SECTIONS_DATA}
              searchQuery={searchQuery}
              langMode={langMode}
              completedLectures={completedLectures}
              onToggleCompleted={handleToggleCompleted}
              bookmarkedFacts={bookmarkedFacts}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {activeTab === 'cheatsheet' && <CheatSheetView />}

          {activeTab === 'exam' && (
            <ExamSimulator 
              exams={allExamsList} 
              langMode={langMode} 
              onFinishAttempt={handleRefreshExams} 
            />
          )}

          {activeTab === 'manage' && (
            <ExamManager
              customExams={getStoredCustomExams()}
              onExamsUpdated={handleRefreshExams}
              onSelectExamToTake={() => switchTab('exam')}
            />
          )}
        </motion.div>
      </main>

      {/* Commercial Grade Footer */}
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
              {SECTIONS_DATA.length} chuyên đề • {totalLecturesCount} bài học • {totalCoreFactsCount} điểm cốt lõi • {allExamsList.length} bộ đề
            </span>
          </div>

        </div>
      </footer>
    </div>
  );
}
