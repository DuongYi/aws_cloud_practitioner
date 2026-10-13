import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Zap, 
  Award, 
  PlusCircle, 
  Search, 
  Bookmark, 
  X, 
  Flame, 
  CheckCircle2
} from 'lucide-react';

type Tab = 'study' | 'cheatsheet' | 'exam' | 'manage' | 'history';
type Lang = 'bilingual' | 'vi' | 'en';

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  langMode: Lang;
  setLangMode: (mode: Lang) => void;
  completedLecturesCount: number;
  totalLecturesCount: number;
  bookmarkedCount: number;
}

const TABS: { id: Tab; label: string; short: string; badge?: string; icon: React.ElementType }[] = [
  { id: 'study', label: 'Ôn luyện chuyên đề', short: 'Ôn luyện', badge: '20 phần', icon: BookOpen },
  { id: 'cheatsheet', label: 'Bí kíp & Core Facts', short: 'Bí kíp', badge: 'HOT', icon: Zap },
  { id: 'exam', label: 'Thi thử CLF-C02', short: 'Thi thử', badge: '65 câu', icon: Award },
  { id: 'manage', label: 'Kho & Nhập đề', short: 'Đề thi', icon: PlusCircle },
];

const LANGS: { id: Lang; label: string; title: string }[] = [
  { id: 'bilingual', label: 'Song ngữ', title: 'Tiếng Việt và tiếng Anh song song' },
  { id: 'vi', label: 'Tiếng Việt', title: 'Chỉ hiển thị tiếng Việt' },
  { id: 'en', label: 'EN', title: 'Only English' },
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  langMode,
  setLangMode,
  completedLecturesCount,
  totalLecturesCount,
  bookmarkedCount,
}) => {
  const percentComplete = Math.min(100, Math.round((completedLecturesCount / (totalLecturesCount || 1)) * 100));

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-slate-950/90 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-x-3 px-4 py-2.5 sm:px-6 lg:h-[70px] lg:py-0 lg:px-8">
        
        {/* Brand identity - Commercial AWS Enterprise Grade */}
        <div className="flex shrink-0 items-center">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('study');
            }}
            className="group flex items-center gap-2.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            aria-label="CloudPrep Pro AWS CLF-C02 Trang chủ"
          >
            {/* Glowing Brand Icon */}
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 p-0.5 shadow-md shadow-orange-500/20 transition-transform duration-200 group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950 font-mono text-[11px] font-bold text-orange-400">
                <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent font-black tracking-tight">
                  C02
                </span>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-slate-950" title="Pearson VUE Ready">
                <span className="h-1 w-1 rounded-full bg-white" />
              </span>
            </div>

            {/* Brand Text */}
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-extrabold tracking-tight text-white group-hover:text-orange-400 transition-colors">
                  CloudPrep Pro
                </span>
                <span className="inline-flex items-center rounded border border-orange-500/30 bg-orange-500/10 px-1 py-0.2 text-[9px] font-bold text-orange-300">
                  CLF-C02
                </span>
              </div>
              <span className="hidden sm:block text-[10px] text-slate-400">
                Hệ Thống Luyện Thi Pearson VUE
              </span>
            </div>
          </a>
        </div>

        {/* Primary Navigation Bar */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden md:flex items-center shrink-0 mx-2"
        >
          <div className="flex items-center rounded-2xl border border-white/[0.08] bg-slate-900/90 p-1 shadow-inner">
            {TABS.map(({ id, label, short, badge, icon: Icon }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  aria-current={active ? 'page' : undefined}
                  className={`relative flex min-h-[34px] shrink-0 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    active 
                      ? 'text-slate-950 font-bold shadow-sm' 
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <Icon className="relative h-3.5 w-3.5" strokeWidth={active ? 2.5 : 2} aria-hidden="true" />
                  <span className="relative hidden xl:inline">{label}</span>
                  <span className="relative xl:hidden">{short}</span>
                  {badge && (
                    <span className={`relative ml-0.5 rounded px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider ${
                      active ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-orange-400 border border-orange-500/20'
                    }`}>
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Commercial Utility Dock */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          
          {/* Universal Search Input */}
          <div className="relative w-36 sm:w-44 md:w-48 lg:w-44 xl:w-56">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              aria-label="Tìm kiếm nội dung và đề thi"
              placeholder="Tìm dịch vụ, mẹo thi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8.5 w-full rounded-xl border border-white/[0.08] bg-slate-900/90 pl-8 pr-7 text-xs text-slate-100 placeholder-slate-400 transition-all focus:border-orange-500/80 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500/50 [&::-webkit-search-cancel-button]:hidden"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Xóa nội dung tìm kiếm"
                className="absolute right-2 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
            ) : (
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex items-center">
                <span className="kbd-tag text-[8px]">/</span>
              </div>
            )}
          </div>

          {/* Bilingual / Language Control */}
          <div 
            role="group" 
            aria-label="Chế độ ngôn ngữ bài giảng" 
            className="hidden sm:flex items-center rounded-xl border border-white/[0.08] bg-slate-900/90 p-0.5 text-xs shadow-inner"
          >
            {LANGS.map(({ id, label, title }) => (
              <button
                key={id}
                onClick={() => setLangMode(id)}
                aria-pressed={langMode === id}
                title={title}
                className={`h-7 rounded-lg px-2 text-[11px] font-semibold whitespace-nowrap transition-colors ${
                  langMode === id 
                    ? 'bg-slate-800 text-orange-400 shadow-sm border border-white/[0.05]' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Live Readiness Meter Widget */}
          <div 
            className="hidden xl:flex items-center gap-2 rounded-xl border border-white/[0.08] bg-slate-900/70 px-2.5 py-1 cursor-pointer hover:border-slate-700 transition"
            onClick={() => setActiveTab('study')}
            title={`Bạn đã hoàn thành ${completedLecturesCount}/${totalLecturesCount} bài học (${percentComplete}%)`}
          >
            <div className="text-right">
              <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Tiến độ
              </span>
              <span className="block font-mono text-[11px] font-bold text-white tabular-nums">
                {percentComplete}%
              </span>
            </div>
            
            <div className="relative h-6 w-6 flex items-center justify-center">
              <svg className="h-6 w-6 -rotate-90" viewBox="0 0 32 32">
                <circle
                  cx="16"
                  cy="16"
                  r="13"
                  className="stroke-slate-800"
                  strokeWidth="3"
                  fill="none"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="13"
                  className="stroke-orange-500 transition-all duration-700 ease-out"
                  strokeWidth="3"
                  strokeDasharray={81.68}
                  strokeDashoffset={81.68 - (81.68 * percentComplete) / 100}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              {percentComplete === 100 ? (
                <CheckCircle2 className="absolute h-3 w-3 text-emerald-400" />
              ) : (
                <Flame className="absolute h-3 w-3 text-orange-400" />
              )}
            </div>
          </div>

          {/* Bookmarks Quick Pill */}
          {bookmarkedCount > 0 && (
            <button
              onClick={() => setActiveTab('cheatsheet')}
              className="flex items-center gap-1 rounded-xl border border-orange-500/30 bg-orange-500/10 px-2 py-1 text-xs text-orange-300 hover:bg-orange-500/20 transition"
              title={`${bookmarkedCount} ghi chú và kiến thức đã lưu`}
            >
              <Bookmark className="h-3 w-3 fill-current text-orange-400" />
              <span className="font-mono text-xs font-bold tabular-nums">{bookmarkedCount}</span>
            </button>
          )}

        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <nav
        aria-label="Điều hướng trên thiết bị di động"
        className="flex md:hidden border-t border-white/[0.06] bg-slate-950 px-2 py-1 overflow-x-auto no-scrollbar gap-1"
      >
        {TABS.map(({ id, short, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-1 min-w-[70px] items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-semibold whitespace-nowrap ${
                active 
                  ? 'bg-orange-500 text-slate-950 font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="h-3 w-3" />
              <span>{short}</span>
            </button>
          );
        })}
      </nav>

      {/* Progress Bar Underline */}
      <div
        role="progressbar"
        aria-label="Tiến độ học tập tổng thể"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentComplete}
        className="h-[2px] w-full bg-slate-900/60 overflow-hidden"
      >
        <div
          className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400 transition-[width] duration-700 ease-out shadow-sm shadow-orange-500/50"
          style={{ width: `${percentComplete}%` }}
        />
      </div>
    </header>
  );
};
