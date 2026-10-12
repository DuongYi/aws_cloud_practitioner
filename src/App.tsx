import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
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
  toggleBookmarkedFact 
} from './utils/storage';
import { 
  Cloud, 
  BookOpen, 
  Zap, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Check, 
  Flame 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'study' | 'cheatsheet' | 'exam' | 'manage' | 'history'>('study');
  const [searchQuery, setSearchQuery] = useState('');
  const [langMode, setLangMode] = useState<'bilingual' | 'vi' | 'en'>('bilingual');

  // Persistence state
  const [completedLectures, setCompletedLectures] = useState<string[]>([]);
  const [bookmarkedFacts, setBookmarkedFacts] = useState<string[]>([]);
  const [allExamsList, setAllExamsList] = useState(getAllExams());

  useEffect(() => {
    setCompletedLectures(getCompletedLectures());
    setBookmarkedFacts(getBookmarkedFacts());
    setAllExamsList(getAllExams());
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
  };

  const totalLecturesCount = useMemo(() => {
    return SECTIONS_DATA.reduce((acc, sec) => acc + sec.lectures.length, 0);
  }, []);

  const totalCoreFactsCount = useMemo(() => {
    return SECTIONS_DATA.reduce((acc, sec) => acc + sec.quickExamFacts.length, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-slate-950">
      {/* App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        langMode={langMode}
        setLangMode={setLangMode}
        completedLecturesCount={completedLectures.length}
        totalLecturesCount={totalLecturesCount}
        bookmarkedCount={bookmarkedFacts.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
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

        {activeTab === 'cheatsheet' && (
          <CheatSheetView />
        )}

        {activeTab === 'exam' && (
          <ExamSimulator
            exams={allExamsList}
            langMode={langMode}
            onFinishAttempt={() => {
              // Refresh exam stats
            }}
          />
        )}

        {activeTab === 'manage' && (
          <ExamManager
            customExams={getStoredCustomExams()}
            onExamsUpdated={handleRefreshExams}
            onSelectExamToTake={(examId) => {
              setActiveTab('exam');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-8 px-4 sm:px-6 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
              <Cloud className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-200">
              AWS Certified Cloud Practitioner (CLF-C02) Study Portal
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <span>{SECTIONS_DATA.length} Chuyên đề</span>
            <span>&bull;</span>
            <span>{totalLecturesCount} Bài giảng chi tiết</span>
            <span>&bull;</span>
            <span>{totalCoreFactsCount} Điểm cốt lõi hay ra thi</span>
            <span>&bull;</span>
            <span>Hệ thống mô phỏng thi 65 câu</span>
          </div>

          <p className="text-slate-400">
            Tổng hợp kiến thức chính xác theo chuẩn giáo trình CLF-C02 mới nhất.
          </p>
        </div>
      </footer>
    </div>
  );
}
