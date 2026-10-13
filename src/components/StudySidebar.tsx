import React, { useEffect, useState, useMemo } from 'react';
import { SectionItem } from '../types';
import { 
  Cloud, 
  Lock, 
  Database, 
  CreditCard, 
  CheckCircle2, 
  Search, 
  BookOpen, 
  ChevronRight,
  Filter
} from 'lucide-react';

interface StudySidebarProps {
  sections: SectionItem[];
  completedLectures: string[];
  onJump: (sectionId: string) => void;
}

const DOMAIN_META: Record<string, { short: string; icon: React.ElementType; color: string; badge: string }> = {
  'Domain 1: Cloud Concepts': { 
    short: 'Domain 1: Cloud Concepts (24%)', 
    icon: Cloud, 
    color: 'text-blue-400',
    badge: '24%'
  },
  'Domain 2: Security and Compliance': { 
    short: 'Domain 2: Security & IAM (30%)', 
    icon: Lock, 
    color: 'text-orange-400',
    badge: '30%'
  },
  'Domain 3: Cloud Technology and Services': { 
    short: 'Domain 3: Core Technology (34%)', 
    icon: Database, 
    color: 'text-emerald-400',
    badge: '34%'
  },
  'Domain 4: Billing, Pricing and Support': { 
    short: 'Domain 4: Billing & Support (12%)', 
    icon: CreditCard, 
    color: 'text-purple-400',
    badge: '12%'
  },
};

/** Sticky commercial table of contents with Domain grouping and progress metrics */
export const StudySidebar: React.FC<StudySidebarProps> = ({ sections, completedLectures, onJump }) => {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');
  const [sidebarQuery, setSidebarQuery] = useState('');

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-90px 0px -65% 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const filteredSections = useMemo(() => {
    if (!sidebarQuery.trim()) return sections;
    const q = sidebarQuery.toLowerCase();
    return sections.filter((s) => 
      s.titleVi.toLowerCase().includes(q) || 
      s.titleEn.toLowerCase().includes(q) ||
      `section-${s.sectionNumber}`.includes(q)
    );
  }, [sections, sidebarQuery]);

  let lastDomain = '';

  return (
    <aside className="hidden lg:block w-[300px] xl:w-[320px] shrink-0">
      <nav
        aria-label="Mục lục chuyên đề"
        className="sticky top-[86px] max-h-[calc(100dvh-108px)] overflow-y-auto no-scrollbar rounded-2xl border border-white/[0.08] bg-slate-900/80 p-3 shadow-lg backdrop-blur-xl"
      >
        {/* Sidebar Header */}
        <div className="border-b border-white/[0.06] pb-3 mb-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 px-1 mb-2">
            <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px] text-slate-400">
              <BookOpen className="h-3.5 w-3.5 text-orange-400" />
              Mục lục chuyên đề ({sections.length})
            </span>
            <span className="font-mono text-[11px] text-orange-400 tabular-nums">
              {completedLectures.length} bài đã học
            </span>
          </div>

          {/* Quick mini-search in sidebar */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Lọc nhanh chuyên đề..."
              value={sidebarQuery}
              onChange={(e) => setSidebarQuery(e.target.value)}
              className="h-7 w-full rounded-lg border border-white/[0.06] bg-slate-950/70 pl-7 pr-2 text-[11px] text-slate-200 placeholder-slate-500 focus:border-orange-500/60 focus:outline-none"
            />
          </div>
        </div>

        {/* Section List grouped by Domain */}
        <ul className="space-y-0.5">
          {filteredSections.map((sec) => {
            const done = sec.lectures.filter((l) => completedLectures.includes(l.id)).length;
            const total = sec.lectures.length || 1;
            const pct = Math.round((done / total) * 100);
            const isCompleted = done === sec.lectures.length && total > 0;
            const active = activeId === sec.id;
            const showDomain = sec.domain !== lastDomain;
            lastDomain = sec.domain;

            const domainMeta = DOMAIN_META[sec.domain] || {
              short: sec.domain,
              icon: BookOpen,
              color: 'text-slate-400',
              badge: ''
            };
            const DomainIcon = domainMeta.icon;

            return (
              <li key={sec.id}>
                {showDomain && (
                  <div className="flex items-center justify-between px-2 pt-4 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-t border-white/[0.04] mt-2 first:mt-0 first:border-t-0">
                    <span className="flex items-center gap-1.5 truncate">
                      <DomainIcon className={`h-3 w-3 ${domainMeta.color}`} />
                      <span>{domainMeta.short}</span>
                    </span>
                  </div>
                )}

                <button
                  onClick={() => onJump(sec.id)}
                  aria-current={active ? 'true' : undefined}
                  className={`group relative flex w-full items-start gap-2.5 rounded-xl px-2.5 py-2 text-left transition-all duration-150 ${
                    active 
                      ? 'bg-slate-800 text-white shadow-sm border border-white/[0.06]' 
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  {/* Glowing active indicator bar */}
                  {active && (
                    <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-gradient-to-b from-orange-400 to-amber-500" />
                  )}

                  {/* Section Number Badge */}
                  <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-bold tabular-nums transition-colors ${
                    isCompleted 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : active 
                        ? 'bg-orange-500 text-slate-950 font-black' 
                        : 'bg-slate-800 text-slate-400 border border-white/[0.05]'
                  }`}>
                    {isCompleted ? '✓' : sec.sectionNumber}
                  </span>

                  {/* Section Title and Mini Progress */}
                  <span className="min-w-0 flex-1">
                    <span className={`block truncate text-xs leading-snug font-medium ${
                      active ? 'text-white font-semibold' : 'text-slate-300'
                    }`}>
                      {sec.titleVi}
                    </span>

                    <span className="mt-1 flex items-center gap-2">
                      <span className="h-1 flex-1 rounded-full bg-slate-800/90 overflow-hidden">
                        <span 
                          className={`block h-full rounded-full transition-all duration-500 ${
                            isCompleted ? 'bg-emerald-500' : 'bg-orange-500'
                          }`}
                          style={{ width: `${pct}%` }} 
                        />
                      </span>
                      <span className="font-mono text-[9px] tabular-nums text-slate-500">
                        {done}/{sec.lectures.length}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
