import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SectionItem, LectureItem, ExamDomain } from '../types';
import { 
  BookOpen, 
  Check, 
  Bookmark, 
  ChevronDown, 
  ChevronRight, 
  ChevronUp,
  Search, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Server, 
  Coins, 
  ArrowLeft, 
  ArrowRight,
  ListTree,
  Table as TableIcon,
  HelpCircle,
  Clock,
  Maximize2,
  Minimize2,
  Filter,
  CheckCheck,
  Eye,
  Columns,
  List,
  Globe,
  Network,
  Activity,
  Bot,
  Rocket
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
  // Display layout mode: 'accordion' (Default - inline expandable list) vs 'split' (2-column reader)
  const [layoutMode, setLayoutMode] = useState<'accordion' | 'split'>('accordion');

  // Filter state
  const [filterType, setFilterType] = useState<'all' | 'core' | 'uncompleted' | 'completed'>('all');
  const [localSearch, setLocalSearch] = useState('');

  // Expanded state for sections: Section 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 open by default
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
    'lec-59': true,
    'lec-64': true,
    'lec-65': true,
    'lec-67': true,
    'lec-69': true,
    'lec-72': true,
    'lec-74': true,
    'lec-78': true,
    'lec-82': true,
    'lec-84': true,
    'lec-88': true,
    'lec-91': true,
    'lec-93': true,
    'lec-94': true,
    'lec-95': true,
    'lec-98': true,
    'lec-100': true,
    'lec-108': true,
    'lec-110': true,
    'lec-111': true,
    'lec-113': true,
    'lec-115': true,
    'lec-116': true,
    'lec-119': true,
    'lec-120': true,
    'lec-122': true,
    'lec-123': true,
    'lec-125': true,
    'lec-127': true,
    'lec-128': true,
    'lec-130': true,
    'lec-131': true,
    'lec-132': true,
    'lec-133': true,
    'lec-134': true,
    'lec-135': true,
    'lec-137': true,
    'lec-139': true,
    'lec-140': true,
    'lec-141': true,
    'lec-142': true,
    'lec-143': true,
    'lec-144': true,
    'lec-145': true,
    'lec-146': true,
    'lec-147': true,
    'lec-148': true,
    'lec-149': true,
    'lec-150': true,
    'lec-151': true,
    'lec-152': true,
    'lec-153': true,
    'lec-154': true,
    'lec-155': true,
    'lec-156': true,
    'lec-157': true,
    'lec-158': true,
    'lec-159': true,
    'lec-160': true,
    'lec-161': true,
    'lec-162': true,
    'lec-163': true,
    'lec-164': true,
    'lec-165': true,
    'lec-166': true,
    'lec-167': true,
    'lec-168': true,
    'lec-169': true,
    'lec-170': true,
    'lec-171': true,
    'lec-172': true,
    'lec-173': true,
    'lec-174': true,
    'lec-175': true,
    'lec-176': true,
    'lec-177': true,
    'lec-178': true,
    'lec-179': true,
    'lec-180': true,
    'lec-181': true,
    'lec-182': true,
    'lec-183': true,
    'lec-184': true,
    'lec-185': true,
    'lec-186': true,
    'lec-187': true,
    'lec-188': true,
    'lec-189': true,
    'lec-190': true,
    'lec-191': true,
    'lec-192': true,
    'lec-193': true,
    'lec-194': true,
    'lec-195': true,
    'lec-196': true,
    'lec-197': true,
    'lec-198': true,
    'lec-199': true,
    'lec-200': true,
    'lec-201': true,
    'lec-202': true,
    'lec-203': true,
    'lec-204': true,
    'lec-205': true,
    'lec-206': true,
    'lec-207': true,
    'lec-208': true,
    'lec-209': true,
    'lec-210': true,
    'lec-211': true,
    'lec-212': true,
    'lec-213': true,
    'lec-214': true,
    'lec-215': true,
    'lec-216': true,
    'lec-217': true,
    'lec-218': true,
    'lec-219': true,
    'lec-220': true,
    'lec-221': true,
    'lec-222': true,
    'lec-223': true,
    'lec-224': true,
    'lec-225': true,
    'lec-226': true,
    'lec-227': true,
    'lec-228': true,
    'lec-229': true,
    'lec-230': true,
    'lec-231': true,
    'lec-232': true,
    'lec-233': true,
    'lec-234': true,
    'lec-235': true,
    'lec-236': true,
    'lec-237': true,
    'lec-238': true,
    'lec-239': true,
    'lec-240': true,
    'lec-241': true,
    'lec-242': true,
    'lec-243': true,
    'lec-244': true,
    'lec-245': true,
    'lec-246': true,
    'lec-247': true,
    'lec-248': true,
    'lec-249': true,
    'lec-250': true,
    'lec-251': true,
    'lec-252': true,
    'lec-253': true,
    'lec-254': true,
    'lec-255': true,
    'lec-256': true,
    'lec-257': true,
    'lec-258': true,
    'lec-259': true,
    'lec-260': true,
    'lec-261': true,
    'lec-262': true,
    'lec-263': true,
    'lec-264': true,
    'lec-265': true,
    'lec-266': true,
    'lec-267': true,
    'lec-268': true,
    'lec-269': true,
    'lec-270': true,
    'lec-271': true,
    'lec-272': true,
    'lec-273': true,
    'lec-274': true,
    'lec-275': true,
    'lec-276': true,
    'lec-277': true
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
      let matchingLectures = sec.lectures.filter((lec) => {
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

  // Expand all sections & lectures
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

  // Collapse all
  const handleCollapseAll = () => {
    setExpandedSectionIds({});
    setExpandedLectureIds({});
  };

  // Toggle specific section
  const toggleSection = (sectionId: string) => {
    setExpandedSectionIds((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Expand all lectures in a specific section
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

  // Collapse all lectures in a specific section
  const collapseAllInSection = (sec: SectionItem) => {
    setExpandedLectureIds((prev) => {
      const next = { ...prev };
      sec.lectures.forEach((l) => {
        next[l.id] = false;
      });
      return next;
    });
  };

  // Toggle specific lecture expansion
  const toggleLectureExpand = (lectureId: string) => {
    setExpandedLectureIds((prev) => ({
      ...prev,
      [lectureId]: !prev[lectureId]
    }));
  };

  // Scroll to section
  const scrollToSection = (secId: string) => {
    setExpandedSectionIds((prev) => ({ ...prev, [secId]: true }));
    const el = document.getElementById(secId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

  const currentIndexInAll = useMemo(() => {
    return allLectures.findIndex((l) => l.id === selectedLectureId);
  }, [allLectures, selectedLectureId]);

  return (
    <div className="max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 py-4 space-y-5">
      
      {/* ================= TOP TOOLBAR & QUICK ACTIONS ================= */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        
        {/* Row 1: Header title, progress, & Layout Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </span>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <span>Chuyên Đề Ôn Luyện CLF-C02</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 font-mono font-medium">
                    {sections.length} Chuyên đề • {totalLecturesCount} Bài học
                  </span>
                </h1>
                <p className="text-xs text-slate-400">
                  Hiển thị dạng mở rộng trực tiếp từng bài học theo danh sách các phần, dễ dàng ôn tập theo tiến độ.
                </p>
              </div>
            </div>
          </div>

          {/* Right controls: Progress + View Mode Toggle */}
          <div className="flex items-center gap-3">
            {/* Progress status */}
            <div className="bg-slate-850 px-3.5 py-1.5 rounded-xl border border-slate-800 flex items-center gap-2.5">
              <div className="text-right">
                <div className="text-[11px] text-slate-400">Tiến độ bài học</div>
                <div className="text-xs font-bold text-white font-mono">
                  {completedCount}/{totalLecturesCount} ({progressPercent}%)
                </div>
              </div>
              <div className="w-12 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Layout switch buttons */}
            <div className="bg-slate-850 p-1 rounded-xl border border-slate-800 flex items-center">
              <button
                onClick={() => setLayoutMode('accordion')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                  layoutMode === 'accordion'
                    ? 'bg-orange-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title="Hiển thị từng bài theo dạng mở rộng trực tiếp ngay trong danh sách"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mở rộng trực tiếp</span>
                <span className="sm:hidden">Accordion</span>
              </button>

              <button
                onClick={() => setLayoutMode('split')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                  layoutMode === 'split'
                    ? 'bg-orange-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title="Hiển thị dạng chia 2 cột: Danh sách bên trái, đọc bên phải"
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Chia 2 cột</span>
                <span className="sm:hidden">2 cột</span>
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Search, Filters & Bulk Expand/Collapse Buttons */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm nhanh bài giảng (IAM, Policy, MFA, SQS, EC2...)"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-slate-800 text-xs sm:text-sm text-white pl-9 pr-8 py-2 rounded-xl border border-slate-700/80 focus:outline-none focus:border-orange-500 placeholder-slate-400 transition"
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

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1.5 rounded-lg transition font-medium ${
                filterType === 'all'
                  ? 'bg-slate-700 text-white font-bold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              Tất cả bài
            </button>
            <button
              onClick={() => setFilterType('core')}
              className={`px-2.5 py-1.5 rounded-lg transition font-medium flex items-center gap-1 ${
                filterType === 'core'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-amber-300'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              Chỉ bài Core
            </button>
            <button
              onClick={() => setFilterType('uncompleted')}
              className={`px-2.5 py-1.5 rounded-lg transition font-medium ${
                filterType === 'uncompleted'
                  ? 'bg-slate-700 text-white font-bold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              Chưa học
            </button>
            <button
              onClick={() => setFilterType('completed')}
              className={`px-2.5 py-1.5 rounded-lg transition font-medium flex items-center gap-1 ${
                filterType === 'completed'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-emerald-300'
              }`}
            >
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              Đã học
            </button>
          </div>

          {/* Bulk Expand / Collapse Buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleExpandAll}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white text-xs font-medium border border-slate-700/80 flex items-center gap-1.5 transition"
              title="Mở rộng tất cả các chuyên đề và bài học"
            >
              <Maximize2 className="w-3.5 h-3.5 text-orange-400" />
              <span>Mở rộng tất cả</span>
            </button>

            <button
              onClick={handleCollapseAll}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white text-xs font-medium border border-slate-700/80 flex items-center gap-1.5 transition"
              title="Thu gọn toàn bộ"
            >
              <Minimize2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Thu gọn</span>
            </button>
          </div>

        </div>

        {/* Row 3: Quick Jump Pills to Sections */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-slate-800/80">
          <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap flex items-center gap-1 pr-1">
            <ListTree className="w-3 h-3 text-orange-400" /> Nhảy nhanh:
          </span>
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-800/90 hover:bg-orange-500/20 hover:text-orange-300 text-slate-300 border border-slate-700/60 whitespace-nowrap transition"
            >
              Sec {sec.sectionNumber} ({sec.titleEn.split(' ')[0]})
            </button>
          ))}
        </div>

      </div>

      {/* ================= SECTION 4 TO 23 HIGHLIGHT NOTICE ================= */}
      <div className="bg-gradient-to-r from-blue-950/80 via-indigo-950/70 to-purple-950/70 border border-blue-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md shadow-blue-500/30">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex flex-wrap items-center gap-2">
              <span>Section 22 &amp; 23: Chiến Lược Phòng Thi CLF-C02 &amp; Lộ Trình Chứng Chỉ AWS Đã Hoàn Tất 100%!</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[11px] border border-blue-400/30">
                Toàn bộ 23 Section (277 bài giảng) đầy đủ song ngữ
              </span>
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Chúc mừng bạn! Khóa học đã được hoàn thiện trọn vẹn từ Section 1 đến Section 23 (Bài 268-274: Kỹ năng nhận diện distractor, giải 6 câu mẫu chuẩn AWS, mẹo phòng thi multiple-choice vs multiple-response, đăng ký Pearson VUE, xin thêm 30 phút ESL và voucher 50%; Bài 275-277: 16 lộ trình chứng chỉ AWS theo từng vai trò nghề nghiệp: Solutions Architect, DevOps, Security, Data &amp; AI).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0 flex-wrap">
          <button
            onClick={() => scrollToSection('section-19')}
            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold whitespace-nowrap transition"
          >
            <span>Sec 19</span>
          </button>
          <button
            onClick={() => scrollToSection('section-20')}
            className="px-2 py-1 rounded-lg bg-amber-950/70 hover:bg-amber-900 border border-amber-500/40 text-amber-300 text-xs font-semibold whitespace-nowrap transition"
          >
            <span>Sec 20</span>
          </button>
          <button
            onClick={() => scrollToSection('section-21')}
            className="px-2 py-1 rounded-lg bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-semibold whitespace-nowrap transition"
          >
            <span>Sec 21</span>
          </button>
          <button
            onClick={() => scrollToSection('section-22')}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold whitespace-nowrap flex items-center gap-1 shadow-md shadow-blue-600/30 transition"
          >
            <span>Xem Sec 22</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollToSection('section-23')}
            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold whitespace-nowrap flex items-center gap-1 shadow-md shadow-purple-600/30 transition"
          >
            <span>Xem Sec 23</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT: ACCORDION VIEW (PRIMARY) ================= */}
      {layoutMode === 'accordion' && (
        <div className="space-y-6">
          {processedSections.map((sec) => {
            const isSecOpen = expandedSectionIds[sec.id] ?? false;
            const completedCountInSec = sec.lectures.filter((l) => completedLectures.includes(l.id)).length;
            const secProgress = Math.round((completedCountInSec / (sec.lectures.length || 1)) * 100);
            const coreCountInSec = sec.lectures.filter((l) => l.isCore).length;

            return (
              <section
                key={sec.id}
                id={sec.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl transition-all duration-200"
              >
                {/* Section Header Card */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    {/* Left: Title & Meta */}
                    <div className="flex items-start gap-3 cursor-pointer select-none" onClick={() => toggleSection(sec.id)}>
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-orange-400 flex items-center justify-center font-bold font-mono text-sm flex-shrink-0 mt-0.5">
                        #{sec.sectionNumber}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-base sm:text-lg font-bold text-white hover:text-orange-400 transition">
                            Section {sec.sectionNumber}: {sec.titleVi}
                          </h2>
                          <span className="text-xs text-slate-400 font-medium">
                            ({sec.titleEn})
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/80 font-mono">
                            {sec.domain} ({sec.weightPercentage})
                          </span>
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-medium">
                            {coreCountInSec} bài Core 🔥
                          </span>
                          <span className="text-slate-400 font-mono">
                            {completedCountInSec}/{sec.lectures.length} bài đã học ({secProgress}%)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Section Actions */}
                    <div className="flex items-center gap-2 self-end lg:self-center">
                      {/* Section Progress bar */}
                      <div className="w-24 sm:w-32 bg-slate-800 h-2 rounded-full overflow-hidden hidden sm:block">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-amber-400 h-full rounded-full transition-all duration-300"
                          style={{ width: `${secProgress}%` }}
                        />
                      </div>

                      {/* Expand / Collapse all in this section */}
                      {isSecOpen && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => expandAllInSection(sec)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs border border-slate-700 transition"
                            title="Mở rộng toàn bộ bài trong phần này"
                          >
                            Mở hết
                          </button>
                          <button
                            onClick={() => collapseAllInSection(sec)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs border border-slate-700 transition"
                            title="Thu gọn toàn bộ bài trong phần này"
                          >
                            Thu gọn
                          </button>
                        </div>
                      )}

                      {/* Main Section Toggle Button */}
                      <button
                        onClick={() => toggleSection(sec.id)}
                        className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition ${
                          isSecOpen
                            ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                        }`}
                      >
                        {isSecOpen ? (
                          <>
                            <ChevronUp className="w-4 h-4 text-orange-400" />
                            <span className="hidden sm:inline">Đóng</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            <span className="hidden sm:inline">Mở ({sec.lectures.length} bài)</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>

                {/* Section Content (When Section Accordion is Expanded) */}
                {isSecOpen && (
                  <div className="p-4 sm:p-6 space-y-5 bg-slate-950/40">
                    
                    {/* Section Summary & Quick Exam Facts */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-850/60 border border-slate-800 rounded-xl p-4">
                      {/* Overview */}
                      <div className="md:col-span-5 space-y-1.5 border-b md:border-b-0 md:border-r border-slate-800 pb-3 md:pb-0 md:pr-4">
                        <div className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Tổng quan chuyên đề</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {sec.overviewVi}
                        </p>
                        {langMode !== 'vi' && (
                          <p className="text-[11px] text-slate-400 italic">
                            EN: {sec.overviewEn}
                          </p>
                        )}
                      </div>

                      {/* Quick Exam Facts */}
                      <div className="md:col-span-7 space-y-2">
                        <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 fill-amber-400" />
                          <span>Điểm chốt thi then chốt (Exam Facts)</span>
                        </div>
                        <div className="space-y-1.5">
                          {sec.quickExamFacts.slice(0, 3).map((fact, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                              <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                                {fIdx + 1}
                              </span>
                              <div className="flex-1">
                                <span className="font-medium text-slate-200">{fact.vi}</span>
                                {langMode !== 'vi' && (
                                  <span className="block text-[10px] text-slate-400 italic">EN: {fact.en}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* ================= INLINE EXPANDABLE LECTURES ACCORDION LIST ================= */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 pb-1">
                        <span>Danh sách bài giảng ({sec.filteredLectures.length} bài)</span>
                        <span className="text-[11px]">Bấm vào bài giảng để mở rộng hoặc thu gọn</span>
                      </div>

                      {sec.filteredLectures.length === 0 ? (
                        <div className="p-6 text-center text-xs text-slate-400 bg-slate-900 rounded-xl border border-slate-800">
                          Không tìm thấy bài giảng nào phù hợp với bộ lọc.
                        </div>
                      ) : (
                        sec.filteredLectures.map((lec) => {
                          const isLecOpen = expandedLectureIds[lec.id] ?? false;
                          const isDone = completedLectures.includes(lec.id);

                          return (
                            <div
                              key={lec.id}
                              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                                isLecOpen
                                  ? 'bg-slate-900 border-orange-500/50 shadow-lg ring-1 ring-orange-500/20'
                                  : 'bg-slate-850/90 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                              }`}
                            >
                              {/* Lecture Header Accordion Row */}
                              <div
                                onClick={() => toggleLectureExpand(lec.id)}
                                className="p-3.5 sm:p-4 cursor-pointer flex items-start sm:items-center justify-between gap-3 select-none"
                              >
                                <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                                  {/* Completed Checkbox */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onToggleCompleted(lec.id);
                                    }}
                                    className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0 transition border ${
                                      isDone
                                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                                        : 'border-slate-700 hover:border-slate-500 bg-slate-800 text-transparent'
                                    }`}
                                    title={isDone ? 'Đánh dấu chưa học' : 'Đánh dấu đã học'}
                                  >
                                    <Check className={`w-3.5 h-3.5 stroke-[3] ${isDone ? 'text-slate-950' : ''}`} />
                                  </button>

                                  {/* Lecture Titles */}
                                  <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-orange-400 border border-slate-700">
                                        Bài {lec.number}
                                      </span>

                                      <h3 className={`text-xs sm:text-sm font-bold text-white transition ${isDone ? 'line-through text-slate-400' : ''}`}>
                                        {lec.titleVi}
                                      </h3>

                                      {lec.isCore && (
                                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold flex items-center gap-1">
                                          <Flame className="w-2.5 h-2.5 fill-amber-400" /> Core Exam
                                        </span>
                                      )}
                                    </div>

                                    {/* Subtitle EN */}
                                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 line-clamp-1">
                                      {lec.titleEn}
                                    </p>

                                    {/* Preview snippet when collapsed */}
                                    {!isLecOpen && (
                                      <p className="text-[11px] text-slate-400/90 mt-1 line-clamp-1 italic">
                                        &bull; {lec.summaryVi}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* Right action buttons */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  {/* Bookmark toggle */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onToggleBookmark(lec.id);
                                    }}
                                    className={`p-1.5 rounded-lg text-xs transition ${
                                      bookmarkedFacts.includes(lec.id)
                                        ? 'text-amber-400 bg-amber-500/10'
                                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                                    }`}
                                    title="Lưu bài học"
                                  >
                                    <Bookmark className="w-4 h-4" />
                                  </button>

                                  {/* Expand/Collapse Chevron Indicator */}
                                  <div className={`p-1.5 rounded-lg transition ${
                                    isLecOpen ? 'bg-orange-500 text-slate-950 font-bold' : 'text-slate-400 bg-slate-800'
                                  }`}>
                                    {isLecOpen ? (
                                      <ChevronUp className="w-4 h-4 stroke-[2.5]" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4" />
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* ================= INLINE EXPANDED CONTENT ================= */}
                              {isLecOpen && (
                                <div className="px-4 pb-5 pt-2 sm:px-6 space-y-4 border-t border-slate-800 bg-slate-950/60">
                                  
                                  {/* 1. Tóm tắt bài học (Summary) */}
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                                      <BookOpen className="w-3.5 h-3.5" />
                                      <span>1. Tóm tắt nội dung bài học</span>
                                    </div>
                                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-1.5">
                                      <p className="font-medium text-slate-100">
                                        {lec.summaryVi}
                                      </p>
                                      {langMode !== 'vi' && (
                                        <p className="text-xs text-slate-400 italic pt-1 border-t border-slate-800/80">
                                          EN: {lec.summaryEn}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  {/* 2. Điểm kiến thức cốt lõi (Key Points) */}
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
                                      <Flame className="w-3.5 h-3.5 fill-orange-400" />
                                      <span>2. Điểm kiến thức trọng tâm cần nhớ</span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2">
                                      {lec.keyPointsVi.map((pt, pIdx) => (
                                        <div
                                          key={pIdx}
                                          className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
                                        >
                                          <span className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
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

                                  {/* 3. Bảng dữ liệu / cấu trúc (nếu có) */}
                                  {lec.table && (
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                                        <TableIcon className="w-3.5 h-3.5" />
                                        <span>3. Bảng tra cứu / Cấu trúc thành phần</span>
                                      </div>
                                      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
                                        <table className="w-full text-xs text-left">
                                          <thead className="bg-slate-850 text-slate-300 font-semibold border-b border-slate-800">
                                            <tr>
                                              {lec.table.headers.map((h, hIdx) => (
                                                <th key={hIdx} className="px-3.5 py-2.5">
                                                  {h}
                                                </th>
                                              ))}
                                            </tr>
                                          </thead>
                                          <tbody className="divide-y divide-slate-800/80 text-slate-200">
                                            {lec.table.rows.map((row, rIdx) => (
                                              <tr key={rIdx} className="hover:bg-slate-850/50">
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

                                  {/* Action bar inside expanded lecture */}
                                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 text-xs">
                                    <button
                                      onClick={() => onToggleCompleted(lec.id)}
                                      className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition ${
                                        isDone
                                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                          : 'bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold shadow'
                                      }`}
                                    >
                                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                                      <span>{isDone ? 'Đã hoàn thành' : 'Đánh dấu đã hiểu bài'}</span>
                                    </button>

                                    <button
                                      onClick={() => toggleLectureExpand(lec.id)}
                                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                                    >
                                      <span>Thu gọn bài</span>
                                      <ChevronUp className="w-3.5 h-3.5" />
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
      )}

      {/* ================= OPTIONAL 2-COLUMN VIEW (FOR DEDICATED FOCUSED READING) ================= */}
      {layoutMode === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left sidebar tree */}
          <aside className="lg:col-span-4 lg:sticky lg:top-20 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col max-h-[calc(100vh-100px)] overflow-hidden">
            <div className="text-xs font-bold text-white mb-2 pb-2 border-b border-slate-800 flex items-center justify-between">
              <span>Danh mục bài học</span>
              <span className="font-mono text-orange-400">{completedCount}/{totalLecturesCount} đã học</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 no-scrollbar">
              {processedSections.map((sec) => (
                <div key={sec.id} className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-850/40">
                  <div
                    onClick={() => toggleSection(sec.id)}
                    className="p-2.5 cursor-pointer flex items-center justify-between bg-slate-850 text-xs font-semibold text-white"
                  >
                    <span>Section {sec.sectionNumber}: {sec.titleVi}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
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
                            <Check className="w-3 h-3 text-emerald-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>

          {/* Right reader */}
          <main className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-8 shadow-xl space-y-6">
            {currentLecture && currentSection && (
              <>
                <div className="space-y-3 border-b border-slate-800 pb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-300">
                      Bài {currentLecture.number} &bull; Section {currentSection.sectionNumber}
                    </span>
                    <button
                      onClick={() => onToggleCompleted(currentLecture.id)}
                      className="px-3 py-1.5 rounded-xl bg-orange-500 text-slate-950 font-bold text-xs"
                    >
                      {completedLectures.includes(currentLecture.id) ? 'Đã hoàn thành ✓' : 'Đánh dấu đã học'}
                    </button>
                  </div>
                  <h2 className="text-xl font-bold text-white">{currentLecture.titleVi}</h2>
                  <p className="text-xs text-slate-400">{currentLecture.titleEn}</p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-amber-400">Tóm tắt bài học</h3>
                  <p className="text-sm text-slate-200 bg-slate-850 p-4 rounded-xl border border-slate-800">
                    {currentLecture.summaryVi}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-orange-400">Kiến thức cốt lõi</h3>
                  <div className="space-y-2">
                    {currentLecture.keyPointsVi.map((pt, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-850 border border-slate-800 text-xs sm:text-sm text-slate-200 flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
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
