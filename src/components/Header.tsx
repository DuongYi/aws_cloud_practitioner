import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { AccountMenu } from './AccountMenu';
import { 
  BookOpen, 
  TrendingUp,
  Zap, 
  Award, 
  PlusCircle, 
  Search, 
  Bookmark, 
  X, 
  Flame, 
  CheckCircle2,
  Globe,
  ChevronDown,
  Check
} from 'lucide-react';

type Tab = 'study' | 'cheatsheet' | 'exam' | 'progress' | 'manage' | 'history';
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
  accountEmail: string | null;
  syncing: boolean;
}

const TABS: { id: Tab; label: string; short: string; icon: React.ElementType }[] = [
  { id: 'study', label: 'Ôn luyện chuyên đề', short: 'Ôn luyện', icon: BookOpen },
  { id: 'cheatsheet', label: 'Bí kíp & Core Facts', short: 'Bí kíp', icon: Zap },
  { id: 'exam', label: 'Thi thử CLF-C02', short: 'Thi thử', icon: Award },
  { id: 'progress', label: 'Tiến độ & Thống kê', short: 'Tiến độ', icon: TrendingUp },
  { id: 'manage', label: 'Kho & Nhập đề', short: 'Kho đề', icon: PlusCircle },
];

const LANGS: { id: Lang; label: string; short: string; title: string }[] = [
  { id: 'bilingual', label: 'Song ngữ', short: 'Song ngữ', title: 'Tiếng Việt và tiếng Anh song song' },
  { id: 'vi', label: 'Tiếng Việt', short: 'VI', title: 'Chỉ hiển thị tiếng Việt' },
  { id: 'en', label: 'English', short: 'EN', title: 'Only English' },
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
  accountEmail,
  syncing,
}) => {
  const percentComplete = Math.min(100, Math.round((completedLecturesCount / (totalLecturesCount || 1)) * 100));

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Close language popup on click outside or escape
  useEffect(() => {
    if (!langMenuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLangMenuOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [langMenuOpen]);

  // Keyboard shortcut '/' to trigger search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setMobileSearchOpen(true);
        setTimeout(() => {
          const input = document.getElementById('global-search-input') as HTMLInputElement;
          if (input) input.focus();
        }, 50);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-slate-950/90 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-x-3 px-3 sm:px-6 lg:h-[66px] py-2 lg:py-0 lg:px-8">
        
        {/* 1. Brand identity - Streamlined & Compact */}
        <div className="flex shrink-0 items-center">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('study');
            }}
            className="group flex items-center gap-2 sm:gap-2.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            aria-label="CloudPrep Pro AWS CLF-C02 Trang chủ"
          >
            {/* Logo Badge */}
            <div className="relative flex h-8.5 w-8.5 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 p-0.5 shadow-md shadow-orange-500/20 transition-transform duration-200 group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950 font-mono text-[11px] font-bold text-orange-400">
                <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent font-black tracking-tight">
                  C02
                </span>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-slate-950" title="Pearson VUE Ready">
                <span className="h-1 w-1 rounded-full bg-white" />
              </span>
            </div>

            {/* Brand Title */}
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] sm:text-[14px] font-extrabold tracking-tight text-white group-hover:text-orange-400 transition-colors whitespace-nowrap">
                CloudPrep Pro
              </span>
              <span className="inline-flex items-center rounded border border-orange-500/30 bg-orange-500/10 px-1 py-0.2 text-[9px] font-bold text-orange-300">
                CLF-C02
              </span>
            </div>
          </a>
        </div>

        {/* 2. Desktop Navigation Bar (Visible on lg: 1024px and up) */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden lg:flex items-center shrink-0 mx-2"
        >
          <div className="flex items-center rounded-2xl border border-white/[0.08] bg-slate-900/90 p-1 shadow-inner">
            {TABS.map(({ id, label, short, icon: Icon }) => {
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
                  <span className="relative hidden 2xl:inline">{label}</span>
                  <span className="relative 2xl:hidden">{short}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* 3. Utility Dock (Responsive, Compact & Clean) */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          
          {/* Desktop Search Input (>= lg: 1024px) */}
          <div className="hidden lg:block relative w-36 xl:w-48">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="global-search-input"
              type="search"
              aria-label="Tìm kiếm nội dung và đề thi"
              placeholder="Tìm dịch vụ, mẹo..."
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
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden xl:flex items-center">
                <span className="kbd-tag text-[8px]">/</span>
              </div>
            )}
          </div>

          {/* Mobile/Tablet Search Trigger Button (< lg) */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className={`lg:hidden flex h-8.5 w-8.5 items-center justify-center rounded-xl border transition ${
              mobileSearchOpen || searchQuery
                ? 'border-orange-500/60 bg-orange-500/15 text-orange-300'
                : 'border-white/[0.08] bg-slate-900/90 text-slate-300 hover:text-white'
            }`}
            aria-label="Tìm kiếm"
            title="Tìm kiếm bài giảng và đề thi"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Language Selector: Compact segmented on xl, dropdown on smaller screens */}
          {/* Segmented Control on >= xl */}
          <div 
            role="group" 
            aria-label="Chế độ ngôn ngữ bài giảng" 
            className="hidden xl:flex items-center rounded-xl border border-white/[0.08] bg-slate-900/90 p-0.5 text-xs shadow-inner"
          >
            {LANGS.map(({ id, short, title }) => (
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
                {short}
              </button>
            ))}
          </div>

          {/* Compact Dropdown on < xl */}
          <div className="relative xl:hidden" ref={langMenuRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex h-8.5 items-center gap-1 rounded-xl border border-white/[0.08] bg-slate-900/90 px-2 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition"
              title="Thay đổi ngôn ngữ bài giảng"
              aria-label="Ngôn ngữ bài giảng"
            >
              <Globe className="h-3.5 w-3.5 text-orange-400" />
              <span className="font-mono text-[10px] uppercase text-orange-300">
                {langMode === 'bilingual' ? 'Song ngữ' : langMode.toUpperCase()}
              </span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 top-10 z-50 w-36 rounded-xl border border-slate-700 bg-slate-900 p-1.5 shadow-2xl">
                {LANGS.map(({ id, label, short }) => (
                  <button
                    key={id}
                    onClick={() => {
                      setLangMode(id);
                      setLangMenuOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                      langMode === id
                        ? 'bg-orange-500/15 text-orange-300 font-bold'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{label}</span>
                    {langMode === id && <Check className="h-3.5 w-3.5 text-orange-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bookmarks Quick Pill (if > 0) */}
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

          {/* Account Authentication & Sync Menu */}
          <AccountMenu email={accountEmail} syncing={syncing} />

          {/* Live Readiness Meter Widget (Only on wide 2xl: >= 1536px displays) */}
          <div 
            className="hidden 2xl:flex items-center gap-2 rounded-xl border border-white/[0.08] bg-slate-900/70 px-2.5 py-1 cursor-pointer hover:border-slate-700 transition"
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

        </div>
      </div>

      {/* Mobile/Tablet Expandable Search Drawer (< lg) */}
      {mobileSearchOpen && (
        <div className="lg:hidden border-t border-white/[0.06] bg-slate-900/95 px-4 py-2.5 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              id="global-search-input-mobile"
              type="search"
              autoFocus
              placeholder="Tìm dịch vụ (S3, EC2, IAM...), câu hỏi thi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full rounded-xl border border-white/[0.08] bg-slate-950 pl-8 pr-7 text-xs text-slate-100 placeholder-slate-400 focus:border-orange-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                aria-label="Xóa tìm kiếm"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={() => setMobileSearchOpen(false)}
            className="text-xs text-slate-300 hover:text-white px-2 py-1 font-semibold"
          >
            Đóng
          </button>
        </div>
      )}

      {/* Mobile & Tablet Sub-Navigation Bar (< lg: 1024px) */}
      <nav
        aria-label="Điều hướng phụ"
        className="grid grid-cols-5 lg:hidden border-t border-white/[0.06] bg-slate-950 px-2 py-1.5 gap-1"
      >
        {TABS.map(({ id, short, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-semibold transition ${
                active 
                  ? 'bg-gradient-to-r from-orange-400 to-amber-500 text-slate-950 font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={active ? 2.5 : 2} />
              <span className="truncate text-[11px] font-semibold">{short}</span>
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
