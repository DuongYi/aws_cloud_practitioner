import React from 'react';
import { 
  BookOpen, 
  Zap, 
  Award, 
  PlusCircle, 
  Search, 
  Cloud, 
  CheckCircle2, 
  Bookmark,
  Languages
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'study' | 'cheatsheet' | 'exam' | 'manage' | 'history';
  setActiveTab: (tab: 'study' | 'cheatsheet' | 'exam' | 'manage' | 'history') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  langMode: 'bilingual' | 'vi' | 'en';
  setLangMode: (mode: 'bilingual' | 'vi' | 'en') => void;
  completedLecturesCount: number;
  totalLecturesCount: number;
  bookmarkedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  langMode,
  setLangMode,
  completedLecturesCount,
  totalLecturesCount,
  bookmarkedCount
}) => {
  const percentComplete = Math.round((completedLecturesCount / (totalLecturesCount || 1)) * 100);

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-xl">
      {/* Top Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Logo & Certification Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Cloud className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  AWS CLF-C02
                </span>
                <span className="text-xs text-slate-400 font-medium">Foundational</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                AWS Cloud Practitioner Ôn Luyện &amp; Thi Thử
              </h1>
            </div>
          </div>

          {/* Quick Metrics & Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiến thức, dịch vụ, mẹo thi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/90 text-sm text-slate-100 pl-9 pr-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder-slate-400 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Language Toggle */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
              <button
                onClick={() => setLangMode('bilingual')}
                className={`px-2 py-1 rounded transition ${
                  langMode === 'bilingual' ? 'bg-orange-500 text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
                title="Song ngữ Anh - Việt"
              >
                Song ngữ
              </button>
              <button
                onClick={() => setLangMode('vi')}
                className={`px-2 py-1 rounded transition ${
                  langMode === 'vi' ? 'bg-orange-500 text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
                title="Tiếng Việt"
              >
                Tiếng Việt
              </button>
              <button
                onClick={() => setLangMode('en')}
                className={`px-2 py-1 rounded transition ${
                  langMode === 'en' ? 'bg-orange-500 text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Progress Badge */}
            <div className="hidden lg:flex items-center space-x-2 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-300">Tiến độ:</span>
              <span className="font-semibold text-emerald-400">{percentComplete}%</span>
            </div>
            {bookmarkedCount > 0 && (
              <div className="hidden lg:flex items-center space-x-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 text-xs text-amber-400">
                <Bookmark className="w-3.5 h-3.5 fill-current" />
                <span>{bookmarkedCount}</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-2 mt-3 pt-2 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('study')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'study'
                ? 'bg-orange-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Ôn Luyện Theo Phần</span>
          </button>

          <button
            onClick={() => setActiveTab('cheatsheet')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'cheatsheet'
                ? 'bg-orange-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Siêu Tóm Tắt &amp; Core Facts</span>
          </button>

          <button
            onClick={() => setActiveTab('exam')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'exam'
                ? 'bg-orange-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Award className="w-4 h-4 text-orange-400" />
            <span>Thi Thử CLF-C02</span>
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${
              activeTab === 'manage'
                ? 'bg-orange-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-cyan-400" />
            <span>Thêm &amp; Quản Lý Đề Thi</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
