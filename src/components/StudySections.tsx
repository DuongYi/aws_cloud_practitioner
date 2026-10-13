import React, { useState, useMemo, useEffect } from 'react';
import { StudySidebar } from './StudySidebar';
import { SectionItem, LectureItem } from '../types';
import { 
  BookOpen, 
  Check, 
  Bookmark, 
  ChevronDown, 
  ChevronUp,
  Search, 
  Flame, 
  Sparkles, 
  Table as TableIcon,
  Maximize2, 
  Minimize2,
  CheckCircle2,
  Columns,
  List,
  Target,
  Copy,
  CheckCheck,
  Award
} from 'lucide-react';

interface StudySectionsProps {
  sections: SectionItem[];
  searchQuery: string;
  langMode: 'bilingual' | 'vi' | 'en';
  completedLectures: string[];
  onToggleCompleted: (lectureId: string) => void;
  bookmarkedFacts: string[];
  onToggleBookmark: (factKey: string) => void;
}

export const StudySections: React.FC<StudySectionsProps> = ({
  sections,
  searchQuery,
  langMode,
  completedLectures,
  onToggleCompleted,
  bookmarkedFacts,
  onToggleBookmark
}) => {
  // Display layout mode: 'accordion' vs 'split'
  const [layoutMode, setLayoutMode] = useState<'accordion' | 'split'>('accordion');

  // Filter state
  const [filterType, setFilterType] = useState<'all' | 'core' | 'uncompleted' | 'completed'>('all');
  const [localSearch, setLocalSearch] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Expanded state for sections: Section 4-15 open by default
  const [expandedSectionIds, setExpandedSectionIds] = useState<Record<string, boolean>>({
    'section-4': true,
    'section-5': true,
    'section-6': true,
    'section-7': true,
    'section-8': true,
    'section-9': true,
    'section-10': true,
    'section-11': true,
    'section-12': true,
    'section-13': true,
    'section-14': true,
    'section-15': true,
    'section-16': true,
    'section-17': true,
    'section-18': true,
    'section-19': true,
    'section-20': true,
    'section-21': true,
    'section-22': true,
    'section-23': true
  });

  // Expanded state for individual lectures: Core lectures open by default
  const [expandedLectureIds, setExpandedLectureIds] = useState<Record<string, boolean>>({
    'lec-14': true,
    'lec-17': true,
    'lec-35': true,
    'lec-47': true,
    'lec-50': true,
    'lec-58': true,
    'lec-64': true,
    'lec-69': true,
    'lec-74': true,
    'lec-88': true,
    'lec-95': true,
    'lec-108': true,
    'lec-122': true,
    'lec-133': true,
    'lec-145': true
  });

  // Selected lecture for split view mode
  const allLectures = useMemo(() => {
    return sections.flatMap((s) => s.lectures.map((l) => ({ ...l, section: s })));
  }, [sections]);

  const [selectedLectureId, setSelectedLectureId] = useState<string>(
    allLectures[0]?.id || 'lec-14'
  );

  const activeSearch = (localSearch || searchQuery).trim().toLowerCase();

  // Filtered sections and lectures based on search and filters
  const processedSections = useMemo(() => {
    return sections.map((sec) => {
      const matchingLectures = sec.lectures.filter((lec) => {
        // Filter by type
        if (filterType === 'core' && !lec.isCore) return false;
        if (filterType === 'uncompleted' && completedLectures.includes(lec.id)) return false;
        if (filterType === 'completed' && !completedLectures.includes(lec.id)) return false;

        // Filter by search query
        if (activeSearch) {
          const matchTitleVi = lec.titleVi.toLowerCase().includes(activeSearch);
          const matchTitleEn = lec.titleEn.toLowerCase().includes(activeSearch);
          const matchSumVi = lec.summaryVi.toLowerCase().includes(activeSearch);
          const matchSumEn = lec.summaryEn.toLowerCase().includes(activeSearch);
          const matchKpVi = lec.keyPointsVi.some((kp) => kp.toLowerCase().includes(activeSearch));
          const matchKpEn = lec.keyPointsEn.some((kp) => kp.toLowerCase().includes(activeSearch));
          const matchSec = sec.titleVi.toLowerCase().includes(activeSearch) || sec.titleEn.toLowerCase().includes(activeSearch);

          return matchTitleVi || matchTitleEn || matchSumVi || matchSumEn || matchKpVi || matchKpEn || matchSec;
        }

        return true;
      });

      return {
        ...sec,
        filteredLectures: matchingLectures,
        hasMatches: matchingLectures.length > 0 || (activeSearch && (sec.titleVi.toLowerCase().includes(activeSearch) || sec.titleEn.toLowerCase().includes(activeSearch)))
      };
    }).filter((sec) => sec.filteredLectures.length > 0 || !activeSearch);
  }, [sections, filterType, activeSearch, completedLectures]);

  const handleExpandAll = () => {
    const allSecs: Record<string, boolean> = {};
    const allLecs: Record<string, boolean> = {};
    sections.forEach((sec) => {
      allSecs[sec.id] = true;
      sec.lectures.forEach((lec) => {
        allLecs[lec.id] = true;
      });
    });
    setExpandedSectionIds(allSecs);
    setExpandedLectureIds(allLecs);
  };

  const handleCollapseAll = () => {
    setExpandedSectionIds({});
    setExpandedLectureIds({});
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSectionIds((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const expandAllInSection = (sec: SectionItem) => {
    setExpandedSectionIds((prev) => ({ ...prev, [sec.id]: true }));
    setExpandedLectureIds((prev) => {
      const next = { ...prev };
      sec.lectures.forEach((l) => {
        next[l.id] = true;
      });
      return next;
    });
  };

  const collapseAllInSection = (sec: SectionItem) => {
    setExpandedLectureIds((prev) => {
      const next = { ...prev };
      sec.lectures.forEach((l) => {
        next[l.id] = false;
      });
      return next;
    });
  };

  const toggleLectureExpand = (lectureId: string) => {
    setExpandedLectureIds((prev) => ({
      ...prev,
      [lectureId]: !prev[lectureId]
    }));
  };

  const scrollToSection = (secId: string) => {
    setExpandedSectionIds((prev) => ({ ...prev, [secId]: true }));
    const el = document.getElementById(secId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  // Statistics
  const totalLecturesCount = allLectures.length;
  const completedCount = completedLectures.length;
  const progressPercent = Math.round((completedCount / (totalLecturesCount || 1)) * 100);

  // Selected lecture data for split view
  const currentLectureData = useMemo(() => {
    for (const sec of sections) {
      const found = sec.lectures.find((l) => l.id === selectedLectureId);
      if (found) return { lecture: found, section: sec };
    }
    return { lecture: sections[0]?.lectures[0], section: sections[0] };
  }, [sections, selectedLectureId]);

  const { lecture: currentLecture, section: currentSection } = currentLectureData;

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-4 space-y-6">
      
      {/* ================= TOP TOOLBAR & CONTROLS ================= */}
      <div className="machined-card rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        
        {/* Row 1: Header summary & View switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 text-orange-400 border border-orange-500/30 font-bold shadow-inner">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Kho Chuyên Đề &amp; Bài Giảng Song Ngữ
                </h2>
                <span className="rounded-md border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 font-mono text-[11px] font-bold text-orange-300">
                  {sections.length} Chuyên đề • {totalLecturesCount} Bài học
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Chương trình chuẩn hóa CLF-C02 theo từng Domain, tích hợp Core Facts, mẹo bẫy thi và kiến thức cốt lõi.
              </p>
            </div>
          </div>

          {/* Right controls: Progress + Layout Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Progress pill */}
            <div className="machined-inner flex items-center gap-3 rounded-2xl px-3.5 py-2">
              <div className="text-right">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Tiến độ bài học</span>
                <span className="block font-mono text-xs font-bold text-white tabular-nums">
                  {completedCount}/{totalLecturesCount} ({progressPercent}%)
                </span>
              </div>
              <div className="h-2 w-14 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Layout switch buttons */}
            <div className="machined-inner flex items-center p-1 rounded-2xl">
              <button
                onClick={() => setLayoutMode('accordion')}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                  layoutMode === 'accordion'
                    ? 'bg-gradient-to-r from-orange-400 to-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
                title="Mở rộng trực tiếp từng bài học"
              >
                <List className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Mở rộng trực tiếp</span>
                <span className="sm:hidden">Accordion</span>
              </button>

              <button
                onClick={() => setLayoutMode('split')}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                  layoutMode === 'split'
                    ? 'bg-gradient-to-r from-orange-400 to-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
                title="Chế độ đọc chia 2 cột tập trung"
              >
                <Columns className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Chia 2 cột</span>
                <span className="sm:hidden">2 cột</span>
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Search, Filters & Bulk Buttons */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Quick Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm nhanh bài giảng (IAM, Policy, MFA, SQS, EC2, S3...)"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="h-9 w-full rounded-xl border border-white/[0.08] bg-slate-950/70 pl-9 pr-8 text-xs text-slate-100 placeholder-slate-400 transition-all focus:border-orange-500/80 focus:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
            />
            {localSearch && (
              <button
                onClick={() => setLocalSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`rounded-xl px-3 py-1.5 font-medium transition ${
                filterType === 'all'
                  ? 'border border-orange-500/40 bg-orange-500/20 text-orange-300 font-bold'
                  : 'border border-white/[0.06] bg-slate-800/60 text-slate-400 hover:text-white'
              }`}
            >
              Tất cả bài ({totalLecturesCount})
            </button>
            <button
              onClick={() => setFilterType('core')}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-medium transition ${
                filterType === 'core'
                  ? 'border border-amber-500/50 bg-amber-500/20 text-amber-300 font-bold'
                  : 'border border-white/[0.06] bg-slate-800/60 text-slate-400 hover:text-amber-300'
              }`}
            >
              <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              Chỉ bài Core
            </button>
            <button
              onClick={() => setFilterType('uncompleted')}
              className={`rounded-xl px-3 py-1.5 font-medium transition ${
                filterType === 'uncompleted'
                  ? 'border border-slate-600 bg-slate-700 text-white font-bold'
                  : 'border border-white/[0.06] bg-slate-800/60 text-slate-400 hover:text-white'
              }`}
            >
              Chưa học ({totalLecturesCount - completedCount})
            </button>
            <button
              onClick={() => setFilterType('completed')}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-medium transition ${
                filterType === 'completed'
                  ? 'border border-emerald-500/50 bg-emerald-500/20 text-emerald-300 font-bold'
                  : 'border border-white/[0.06] bg-slate-800/60 text-slate-400 hover:text-emerald-300'
              }`}
            >
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              Đã học ({completedCount})
            </button>
          </div>

          {/* Bulk Expand / Collapse Buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleExpandAll}
              className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-700/80 transition"
              title="Mở rộng tất cả các chuyên đề và bài học"
            >
              <Maximize2 className="h-3.5 w-3.5 text-orange-400" />
              <span>Mở rộng tất cả</span>
            </button>

            <button
              onClick={handleCollapseAll}
              className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-700/80 transition"
              title="Thu gọn toàn bộ"
            >
              <Minimize2 className="h-3.5 w-3.5 text-slate-400" />
              <span>Thu gọn</span>
            </button>
          </div>

        </div>

      </div>

      {/* ================= PRIMARY ACCORDION VIEW ================= */}
      {layoutMode === 'accordion' && (
        <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
          <StudySidebar sections={processedSections} completedLectures={completedLectures} onJump={scrollToSection} />
          
          <div className="space-y-6 min-w-0">
            {processedSections.map((sec) => {
              const isSecOpen = expandedSectionIds[sec.id] ?? false;
              const completedCountInSec = sec.lectures.filter((l) => completedLectures.includes(l.id)).length;
              const secProgress = Math.round((completedCountInSec / (sec.lectures.length || 1)) * 100);
              const coreCountInSec = sec.lectures.filter((l) => l.isCore).length;

              return (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="machined-card scroll-mt-24 rounded-3xl overflow-hidden transition-all duration-200"
                >
                  {/* Section Header Card */}
                  <div className="p-5 sm:p-6 border-b border-white/[0.06] bg-slate-900/60">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      
                      {/* Left: Section Identity */}
                      <div 
                        className="flex items-start gap-3.5 cursor-pointer select-none" 
                        onClick={() => toggleSection(sec.id)}
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 text-orange-400 font-mono text-sm font-bold border border-orange-500/30 shadow-inner">
                          #{sec.sectionNumber}
                        </div>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-orange-400 transition-colors">
                              Section {sec.sectionNumber}: {sec.titleVi}
                            </h3>
                            <span className="text-xs text-slate-400 font-medium">
                              ({sec.titleEn})
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="rounded-md border border-white/[0.08] bg-slate-950/70 px-2.5 py-0.5 font-mono text-[11px] text-slate-300">
                              {sec.domain} • {sec.weightPercentage}
                            </span>
                            <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-300">
                              {coreCountInSec} bài Core 🔥
                            </span>
                            <span className="font-mono text-slate-400 text-[11px] tabular-nums">
                              {completedCountInSec}/{sec.lectures.length} bài đã học ({secProgress}%)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Section Actions */}
                      <div className="flex items-center gap-2.5 self-end lg:self-center">
                        {/* Mini progress bar */}
                        <div className="hidden sm:block w-28 bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-amber-400 h-full rounded-full transition-all duration-300"
                            style={{ width: `${secProgress}%` }}
                          />
                        </div>

                        {/* Bulk buttons for section */}
                        {isSecOpen && (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => expandAllInSection(sec)}
                              className="rounded-xl border border-white/[0.08] bg-slate-800/80 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-700/80 transition"
                              title="Mở rộng toàn bộ bài trong phần này"
                            >
                              Mở hết
                            </button>
                            <button
                              onClick={() => collapseAllInSection(sec)}
                              className="rounded-xl border border-white/[0.08] bg-slate-800/80 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-700/80 transition"
                              title="Thu gọn toàn bộ bài trong phần này"
                            >
                              Thu gọn
                            </button>
                          </div>
                        )}

                        {/* Toggle section button */}
                        <button
                          onClick={() => toggleSection(sec.id)}
                          className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold border transition ${
                            isSecOpen
                              ? 'border-orange-500/40 bg-orange-500/15 text-orange-300'
                              : 'border-white/[0.08] bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {isSecOpen ? (
                            <>
                              <ChevronUp className="h-3.5 w-3.5 text-orange-400" />
                              <span className="hidden sm:inline">Đóng chuyên đề</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-3.5 w-3.5" />
                              <span>Mở ({sec.lectures.length} bài)</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Section Body */}
                  {isSecOpen && (
                    <div className="p-5 sm:p-6 space-y-6 bg-slate-950/30">
                      
                      {/* Section Overview & Gold Exam Facts */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        {/* Overview Box */}
                        <div className="md:col-span-5 machined-inner rounded-2xl p-4 space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-400">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Tổng quan chuyên đề</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                            {sec.overviewVi}
                          </p>
                          {langMode !== 'vi' && (
                            <p className="text-[11px] text-slate-400 italic pt-1 border-t border-white/[0.04]">
                              EN: {sec.overviewEn}
                            </p>
                          )}
                        </div>

                        {/* Gold Exam Facts Box */}
                        <div className="md:col-span-7 machined-inner rounded-2xl p-4 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
                              <Flame className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                              <span>Điểm chốt thi then chốt (Exam Facts)</span>
                            </div>
                            <span className="text-[10px] text-amber-400/80 font-mono">High Yield</span>
                          </div>

                          <div className="space-y-2">
                            {sec.quickExamFacts.slice(0, 3).map((fact, fIdx) => (
                              <div 
                                key={fIdx} 
                                className="group relative flex items-start gap-2.5 rounded-xl border border-amber-500/20 bg-amber-950/20 p-2.5 transition hover:border-amber-500/40 hover:bg-amber-950/30"
                              >
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 font-mono text-[10px] font-bold text-amber-300 mt-0.5">
                                  {fIdx + 1}
                                </span>
                                <div className="flex-1">
                                  <span className="text-xs font-medium text-slate-100 leading-relaxed">
                                    {fact.vi}
                                  </span>
                                  {langMode !== 'vi' && (
                                    <span className="block text-[10px] text-slate-400 italic mt-0.5">
                                      EN: {fact.en}
                                    </span>
                                  )}
                                </div>
                                <button
                                  onClick={() => handleCopyText(fact.vi, `fact-${sec.id}-${fIdx}`)}
                                  className="text-slate-500 opacity-0 group-hover:opacity-100 hover:text-amber-300 transition-all p-1"
                                  title="Sao chép mẹo thi"
                                >
                                  {copiedKey === `fact-${sec.id}-${fIdx}` ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                                  ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                  )}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Inline Expandable Lectures List */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 pb-1">
                          <span>Danh sách bài giảng ({sec.filteredLectures.length} bài)</span>
                          <span className="text-[11px] text-slate-500">Bấm bài giảng để xem chi tiết tóm tắt &amp; bảng dữ liệu</span>
                        </div>

                        {sec.filteredLectures.length === 0 ? (
                          <div className="machined-inner rounded-2xl p-6 text-center text-xs text-slate-400">
                            Không tìm thấy bài giảng nào phù hợp với bộ lọc hiện tại.
                          </div>
                        ) : (
                          sec.filteredLectures.map((lec) => {
                            const isLecOpen = expandedLectureIds[lec.id] ?? false;
                            const isDone = completedLectures.includes(lec.id);
                            const isBookmarked = bookmarkedFacts.includes(lec.id);

                            return (
                              <div
                                key={lec.id}
                                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                                  isLecOpen
                                    ? 'bg-slate-900 border-orange-500/50 shadow-lg ring-1 ring-orange-500/20'
                                    : 'bg-slate-900/60 border-white/[0.06] hover:border-white/[0.12] hover:bg-slate-900/90'
                                }`}
                              >
                                {/* Lecture Header Bar */}
                                <div
                                  onClick={() => toggleLectureExpand(lec.id)}
                                  className="p-3.5 sm:p-4 cursor-pointer flex items-start sm:items-center justify-between gap-3 select-none"
                                >
                                  <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                                    {/* Completion Checkbox */}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onToggleCompleted(lec.id);
                                      }}
                                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all mt-0.5 sm:mt-0 ${
                                        isDone
                                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm font-bold'
                                          : 'border-slate-700 bg-slate-800/80 text-transparent hover:border-slate-500 hover:bg-slate-800'
                                      }`}
                                      title={isDone ? 'Đánh dấu chưa học' : 'Đánh dấu đã hiểu bài'}
                                    >
                                      <Check className={`h-3.5 w-3.5 stroke-[3] ${isDone ? 'text-slate-950' : ''}`} />
                                    </button>

                                    {/* Titles */}
                                    <div className="min-w-0 flex-1">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-800 text-orange-400 border border-white/[0.06]">
                                          Bài {lec.number}
                                        </span>

                                        <h4 className={`text-xs sm:text-sm font-bold transition-colors ${
                                          isDone ? 'line-through text-slate-400' : 'text-white'
                                        }`}>
                                          {lec.titleVi}
                                        </h4>

                                        {lec.isCore && (
                                          <span className="flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                                            <Flame className="h-2.5 w-2.5 fill-amber-400" /> Core Exam
                                          </span>
                                        )}
                                      </div>

                                      <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 line-clamp-1">
                                        {lec.titleEn}
                                      </p>

                                      {!isLecOpen && (
                                        <p className="text-[11px] text-slate-400/80 mt-1 line-clamp-1 italic">
                                          &bull; {lec.summaryVi}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  {/* Right Controls */}
                                  <div className="flex items-center gap-2 shrink-0">
                                    {/* Bookmark */}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onToggleBookmark(lec.id);
                                      }}
                                      className={`p-1.5 rounded-lg text-xs transition ${
                                        isBookmarked
                                          ? 'text-amber-400 bg-amber-500/15 border border-amber-500/30'
                                          : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                                      }`}
                                      title="Lưu vào danh sách ôn tập"
                                    >
                                      <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                                    </button>

                                    {/* Chevron */}
                                    <div className={`p-1.5 rounded-lg transition ${
                                      isLecOpen 
                                        ? 'bg-orange-500 text-slate-950 font-bold' 
                                        : 'text-slate-400 bg-slate-800'
                                    }`}>
                                      {isLecOpen ? (
                                        <ChevronUp className="h-3.5 w-3.5 stroke-[2.5]" />
                                      ) : (
                                        <ChevronDown className="h-3.5 w-3.5" />
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* Expanded Lecture Content */}
                                {isLecOpen && (
                                  <div className="border-t border-white/[0.06] bg-slate-950/70 p-4 sm:p-6 space-y-4">
                                    
                                    {/* Summary */}
                                    <div className="space-y-1.5">
                                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                                        <BookOpen className="h-3.5 w-3.5" />
                                        <span>1. Tóm tắt nội dung bài học</span>
                                      </div>
                                      <div className="machined-inner rounded-xl p-3.5 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-1">
                                        <p className="font-medium text-slate-100">
                                          {lec.summaryVi}
                                        </p>
                                        {langMode !== 'vi' && (
                                          <p className="text-xs text-slate-400 italic pt-1 border-t border-white/[0.04]">
                                            EN: {lec.summaryEn}
                                          </p>
                                        )}
                                      </div>
                                    </div>

                                    {/* Key Points */}
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400">
                                        <Flame className="h-3.5 w-3.5 fill-orange-400" />
                                        <span>2. Điểm kiến thức trọng tâm cần nhớ</span>
                                      </div>
                                      <div className="grid grid-cols-1 gap-2">
                                        {lec.keyPointsVi.map((pt, pIdx) => (
                                          <div
                                            key={pIdx}
                                            className="machined-inner rounded-xl p-3 flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
                                          >
                                            <span className="h-2 w-2 rounded-full bg-orange-400 mt-2 shrink-0" />
                                            <div className="flex-1 leading-relaxed">
                                              <span className="font-medium text-slate-100">{pt}</span>
                                              {langMode !== 'vi' && lec.keyPointsEn[pIdx] && (
                                                <span className="block text-xs text-slate-400 mt-0.5 italic">
                                                  EN: {lec.keyPointsEn[pIdx]}
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Table (if any) */}
                                    {lec.table && (
                                      <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                                          <TableIcon className="h-3.5 w-3.5" />
                                          <span>3. Bảng tra cứu &amp; Cấu trúc thành phần</span>
                                        </div>
                                        <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-slate-900">
                                          <table className="w-full text-xs text-left">
                                            <thead className="bg-slate-850 text-slate-200 font-semibold border-b border-white/[0.06]">
                                              <tr>
                                                {lec.table.headers.map((h, hIdx) => (
                                                  <th key={hIdx} className="px-3.5 py-2.5">
                                                    {h}
                                                  </th>
                                                ))}
                                              </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/[0.04] text-slate-200">
                                              {lec.table.rows.map((row, rIdx) => (
                                                <tr key={rIdx} className="hover:bg-slate-800/40">
                                                  {row.map((cell, cIdx) => (
                                                    <td key={cIdx} className="px-3.5 py-2.5 font-mono text-[11px] sm:text-xs">
                                                      {cell}
                                                    </td>
                                                  ))}
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    )}

                                    {/* Action Bar */}
                                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] text-xs">
                                      <button
                                        onClick={() => onToggleCompleted(lec.id)}
                                        className={`flex items-center gap-1.5 rounded-xl px-4 py-2 font-bold transition ${
                                          isDone
                                            ? 'border border-emerald-500/40 bg-emerald-500/20 text-emerald-300'
                                            : 'bg-orange-500 text-slate-950 hover:bg-orange-400 shadow-sm'
                                        }`}
                                      >
                                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                                        <span>{isDone ? 'Đã hiểu bài này' : 'Đánh dấu đã hiểu bài'}</span>
                                      </button>

                                      <button
                                        onClick={() => toggleLectureExpand(lec.id)}
                                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                                      >
                                        <span>Thu gọn</span>
                                        <ChevronUp className="h-3.5 w-3.5" />
                                      </button>
                                    </div>

                                  </div>
                                )}

                              </div>
                            );
                          })
                        )}
                      </div>

                    </div>
                  )}

                </section>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= OPTIONAL 2-COLUMN VIEW ================= */}
      {layoutMode === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Navigation Tree */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 machined-card rounded-3xl p-4 shadow-xl flex flex-col max-h-[calc(100vh-120px)] overflow-hidden">
            <div className="text-xs font-bold text-white mb-2 pb-2 border-b border-white/[0.06] flex items-center justify-between">
              <span>Danh mục bài học</span>
              <span className="font-mono text-orange-400">{completedCount}/{totalLecturesCount} đã học</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 no-scrollbar">
              {processedSections.map((sec) => (
                <div key={sec.id} className="machined-inner rounded-xl overflow-hidden">
                  <div
                    onClick={() => toggleSection(sec.id)}
                    className="p-2.5 cursor-pointer flex items-center justify-between text-xs font-semibold text-white bg-slate-900/80"
                  >
                    <span>Sec {sec.sectionNumber}: {sec.titleVi}</span>
                    <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                  </div>

                  {expandedSectionIds[sec.id] && (
                    <div className="p-1 space-y-1">
                      {sec.lectures.map((l) => (
                        <div
                          key={l.id}
                          onClick={() => setSelectedLectureId(l.id)}
                          className={`p-2 rounded-lg text-xs cursor-pointer flex items-center justify-between transition ${
                            selectedLectureId === l.id
                              ? 'bg-orange-500/20 text-orange-300 font-bold border border-orange-500/40'
                              : 'text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="line-clamp-1">{l.number}. {l.titleVi}</span>
                          {completedLectures.includes(l.id) && (
                            <Check className="h-3 w-3 text-emerald-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>

          {/* Right Reader */}
          <main className="lg:col-span-8 machined-card rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            {currentLecture && currentSection && (
              <>
                <div className="space-y-3 border-b border-white/[0.06] pb-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 font-mono text-xs font-bold text-orange-300">
                      Bài {currentLecture.number} • Section {currentSection.sectionNumber}
                    </span>
                    <button
                      onClick={() => onToggleCompleted(currentLecture.id)}
                      className="rounded-xl bg-orange-500 px-4 py-1.5 text-xs font-bold text-slate-950 shadow-sm"
                    >
                      {completedLectures.includes(currentLecture.id) ? 'Đã hoàn thành ✓' : 'Đánh dấu đã học'}
                    </button>
                  </div>
                  <h2 className="text-2xl font-bold text-white">{currentLecture.titleVi}</h2>
                  <p className="text-xs text-slate-400">{currentLecture.titleEn}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Tóm tắt bài học</h3>
                  <div className="machined-inner rounded-2xl p-4 text-sm text-slate-200">
                    {currentLecture.summaryVi}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400">Kiến thức cốt lõi</h3>
                  <div className="space-y-2">
                    {currentLecture.keyPointsVi.map((pt, idx) => (
                      <div key={idx} className="machined-inner rounded-xl p-3 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-orange-400 mt-2 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      )}

    </div>
  );
};
