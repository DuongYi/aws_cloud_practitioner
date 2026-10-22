import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  NotebookPen, 
  ChevronDown, 
  Check, 
  Laptop,
  MoreHorizontal
} from 'lucide-react';

type Tab = 'study' | 'cheatsheet' | 'exam' | 'review' | 'progress' | 'manage' | 'history' | 'vscode';
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

// Primary core tabs always visible
const PRIMARY_TABS: { id: Tab; label: string; short: string; icon: React.ElementType }[] = [
  { id: 'study', label: 'Ôn chuyên đề', short: 'Ôn luyện', icon: BookOpen },
  { id: 'cheatsheet', label: 'Bí kíp & Facts', short: 'Bí kíp', icon: Zap },
  { id: 'exam', label: 'Thi thử CLF-C02', short: 'Thi thử', icon: Award },
];

// Secondary utility tabs grouped in the smart "More / Công cụ" menu on standard viewports
const SECONDARY_TABS: { id: Tab; label: string; short: string; icon: React.ElementType; desc: string }[] = [
  { id: 'review', label: 'Xem lại câu sai', short: 'Câu sai', icon: NotebookPen, desc: 'Sổ tay câu hỏi trả lời chưa đúng' },
  { id: 'progress', label: 'Tiến độ & Thống kê', short: 'Tiến độ', icon: TrendingUp, desc: 'Biểu đồ kỹ năng 4 Domain và lịch sử' },
  { id: 'manage', label: 'Kho & Nhập đề', short: 'Kho đề', icon: PlusCircle, desc: 'Quản lý và nhập thêm đề thi tuỳ biến' },
];

const ALL_TABS = [...PRIMARY_TABS, ...SECONDARY_TABS];

const LANGS: { id: Lang; label: string; short: string; title: string }[] = [
  { id: 'bilingual', label: 'Song ngữ (VI - EN)', short: 'Song ngữ', title: 'Tiếng Việt và tiếng Anh song song' },
  { id: 'vi', label: 'Tiếng Việt', short: 'Tiếng Việt', title: 'Chỉ hiển thị tiếng Việt' },
  { id: 'en', label: 'English Only', short: 'English', title: 'Only English' },
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
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const toolsMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close menus on click outside or escape
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(e.target as Node)) {
        setToolsMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLangMenuOpen(false);
        setToolsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  // Keyboard shortcut '/' and 'Cmd+K' / 'Ctrl+K' to trigger search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setMobileSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check if active tab is in secondary tools
  const activeSecondaryTab = SECONDARY_TABS.find(t => t.id === activeTab);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-slate-950/90 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-x-2.5 px-3 sm:px-6 lg:h-[62px] py-2 lg:py-0 lg:px-8">
        
        {/* 1. Brand identity - Streamlined & Minimalist */}
        <div className="flex shrink-0 items-center">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('study');
            }}
            className="group flex items-center gap-2 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            aria-label="CloudPrep Pro AWS CLF-C02 Trang chủ"
          >
            {/* Logo Badge */}
            <div className="relative flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 p-0.5 shadow-md shadow-orange-500/20 transition-transform duration-200 group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950 font-mono text-[11px] font-black">
                <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent tracking-tight">
                  C02
                </span>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-slate-950" />
            </div>

            {/* Brand Title */}
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] sm:text-[14px] font-extrabold tracking-tight text-white group-hover:text-orange-400 transition-colors whitespace-nowrap">
                CloudPrep
              </span>
              <span className="hidden sm:inline-flex items-center rounded border border-orange-500/30 bg-orange-500/10 px-1 py-0.2 text-[9px] font-bold text-orange-300">
                PRO
              </span>
            </div>
          </a>
        </div>

        {/* 2. Smart Navigation Tabs (Compact & Breathable) */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden lg:flex items-center shrink-0 mx-2"
        >
          <div className="flex items-center rounded-2xl border border-white/[0.08] bg-slate-900/80 p-1 shadow-inner gap-0.5">
            {/* Primary Core Tabs */}
            {PRIMARY_TABS.map(({ id, label, short, icon: Icon }) => {
              const active = activeTab === id;
              const isExam = id === 'exam';
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  aria-current={active ? 'page' : undefined}
                  className={`relative flex h-[32px] shrink-0 items-center gap-1.5 rounded-xl px-3 text-[12px] font-semibold whitespace-nowrap transition-all duration-200 ${
                    active 
                      ? 'text-slate-950 font-bold shadow-sm' 
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="smart-nav-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <Icon className="relative h-3.5 w-3.5" strokeWidth={active ? 2.5 : 2} aria-hidden="true" />
                  <span className="relative">{label}</span>
                  {isExam && !active && (
                    <span className="relative flex h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
                  )}
                </button>
              );
            })}

            {/* Smart Secondary Tools Dropdown ("Công cụ" / Sub-tabs) */}
            <div className="relative" ref={toolsMenuRef}>
              <button
                onClick={() => setToolsMenuOpen(!toolsMenuOpen)}
                className={`relative flex h-[32px] shrink-0 items-center gap-1.5 rounded-xl px-2.5 text-[12px] font-semibold transition-all duration-200 ${
                  activeSecondaryTab 
                    ? 'text-orange-300 bg-orange-500/15 border border-orange-500/30' 
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`}
                title="Các công cụ ôn tập bổ trợ"
              >
                {activeSecondaryTab ? (
                  <>
                    <activeSecondaryTab.icon className="h-3.5 w-3.5 text-orange-400" />
                    <span>{activeSecondaryTab.short}</span>
                  </>
                ) : (
                  <>
                    <MoreHorizontal className="h-3.5 w-3.5 text-slate-400" />
                    <span>Công cụ</span>
                  </>
                )}
                <ChevronDown className={`h-3 w-3 transition-transform ${toolsMenuOpen ? 'rotate-180 text-orange-400' : 'text-slate-400'}`} />
              </button>

              {/* Tools Popover Dropdown */}
              <AnimatePresence>
                {toolsMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-10 z-50 w-56 rounded-2xl border border-slate-800 bg-slate-900/95 p-1.5 shadow-2xl backdrop-blur-xl"
                  >
                    <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Công cụ học & theo dõi
                    </div>
                    {SECONDARY_TABS.map(({ id, label, icon: Icon, desc }) => {
                      const isActive = activeTab === id;
                      return (
                        <button
                          key={id}
                          onClick={() => {
                            setActiveTab(id);
                            setToolsMenuOpen(false);
                          }}
                          className={`flex w-full items-start gap-2.5 rounded-xl px-2.5 py-2 text-left transition ${
                            isActive 
                              ? 'bg-orange-500/15 text-orange-300 font-bold border border-orange-500/30' 
                              : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                          }`}
                        >
                          <Icon className={`h-4 w-4 shrink-0 mt-0.5 ${isActive ? 'text-orange-400' : 'text-slate-400'}`} />
                          <div className="overflow-hidden">
                            <div className="text-xs font-semibold">{label}</div>
                            <div className="text-[10.5px] text-slate-400 font-normal truncate">{desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>

        {/* 3. Smart Utility Dock (Compact, Clean & Well-Spaced) */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          
          {/* Smart Desktop Search (Expandable & Low-Profile) */}
          <div className="hidden lg:block relative">
            <div className="relative flex items-center">
              <Search
                className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                ref={searchInputRef}
                id="global-search-input"
                type="search"
                aria-label="Tìm kiếm nội dung và đề thi"
                placeholder="Tìm dịch vụ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 w-28 xl:w-36 rounded-xl border border-white/[0.08] bg-slate-900/80 pl-7 pr-6 text-xs text-slate-100 placeholder-slate-400 transition-all focus:w-48 focus:border-orange-500/80 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500/50 [&::-webkit-search-cancel-button]:hidden"
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
                  <span className="font-mono text-[9px] text-slate-500 bg-slate-800/80 px-1 py-0.2 rounded border border-white/[0.04]">⌘K</span>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search Button (< lg) */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className={`lg:hidden flex h-8 w-8 items-center justify-center rounded-xl border transition ${
              mobileSearchOpen || searchQuery
                ? 'border-orange-500/60 bg-orange-500/15 text-orange-300'
                : 'border-white/[0.08] bg-slate-900/80 text-slate-300 hover:text-white'
            }`}
            aria-label="Tìm kiếm"
          >
            <Search className="h-3.5 w-3.5" />
          </button>

          {/* Smart Language Selector Dropdown (Saves ~100px vs old segmented control) */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex h-8 items-center gap-1 rounded-xl border border-white/[0.08] bg-slate-900/80 px-2 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition"
              title="Thay đổi ngôn ngữ bài giảng (Song ngữ / VI / EN)"
              aria-label="Ngôn ngữ bài giảng"
            >
              <Globe className="h-3.5 w-3.5 text-orange-400 shrink-0" />
              <span className="font-mono text-[10px] uppercase text-orange-300">
                {langMode === 'bilingual' ? 'VI-EN' : langMode.toUpperCase()}
              </span>
              <ChevronDown className={`h-2.5 w-2.5 text-slate-400 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 top-9.5 z-50 w-44 rounded-xl border border-slate-700 bg-slate-900 p-1.5 shadow-2xl backdrop-blur-xl">
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

          {/* Smart VS Code Simulator Button (Discreet & Compact) */}
          <button
            onClick={() => setActiveTab('vscode')}
            className="flex h-8 items-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 px-2 sm:px-2.5 text-xs font-semibold text-sky-300 hover:bg-sky-500/20 hover:border-sky-500/50 transition-all shadow-xs group"
            title="Bật Chế độ Giả lập VS Code (Fake làm việc & học bài) - Phím tắt F2 hoặc Alt+V"
          >
            <Laptop className="h-3.5 w-3.5 text-sky-400 group-hover:rotate-6 transition-transform" />
            <span className="hidden sm:inline font-mono text-[11px]">VS Code</span>
            <span className="font-mono text-[9px] text-sky-300/80 bg-sky-950/80 px-1 py-0.2 rounded border border-sky-800/50">F2</span>
          </button>

          {/* Bookmarks Counter (Only if > 0) */}
          {bookmarkedCount > 0 && (
            <button
              onClick={() => setActiveTab('cheatsheet')}
              className="flex h-8 items-center gap-1 rounded-xl border border-amber-500/30 bg-amber-500/10 px-2 text-xs text-amber-300 hover:bg-amber-500/20 transition"
              title={`${bookmarkedCount} ghi chú và kiến thức đã lưu`}
            >
              <Bookmark className="h-3 w-3 fill-current text-amber-400" />
              <span className="font-mono text-[11px] font-bold tabular-nums">{bookmarkedCount}</span>
            </button>
          )}

          {/* Account Authentication & Sync Menu */}
          <AccountMenu email={accountEmail} syncing={syncing} />

          {/* Micro Readiness Gauge (Only on wide screens) */}
          <button
            onClick={() => setActiveTab('progress')}
            className="hidden xl:flex items-center gap-1.5 rounded-xl border border-white/[0.06] bg-slate-900/60 px-2 py-1 hover:border-slate-700 transition"
            title={`Tiến độ hoàn thành: ${completedLecturesCount}/${totalLecturesCount} bài học (${percentComplete}%)`}
          >
            <Flame className={`h-3.5 w-3.5 ${percentComplete === 100 ? 'text-emerald-400' : 'text-orange-400'}`} />
            <span className="font-mono text-[11px] font-bold text-slate-200 tabular-nums">
              {percentComplete}%
            </span>
          </button>

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
              className="h-8.5 w-full rounded-xl border border-white/[0.08] bg-slate-950 pl-8 pr-7 text-xs text-slate-100 placeholder-slate-400 focus:border-orange-500 focus:outline-none"
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
        className="grid grid-cols-6 lg:hidden border-t border-white/[0.06] bg-slate-950 px-1 py-1 gap-0.5"
      >
        {ALL_TABS.map(({ id, short, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center justify-center py-1.5 rounded-lg text-xs font-semibold transition ${
                active 
                  ? 'bg-orange-500/15 text-orange-400 font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={active ? 2.5 : 2} />
              <span className="truncate text-[10px] mt-0.5">{short}</span>
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
