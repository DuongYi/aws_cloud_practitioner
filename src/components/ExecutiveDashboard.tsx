import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  BookOpen, 
  Zap, 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Flame,
  ArrowRight,
  Database,
  Lock,
  Cloud,
  CreditCard,
  Target
} from 'lucide-react';
import { SectionItem, ExamAttempt } from '../types';

interface ExecutiveDashboardProps {
  sections: SectionItem[];
  completedLectures: string[];
  examAttempts: ExamAttempt[];
  onNavigateTab: (tab: 'study' | 'cheatsheet' | 'exam' | 'manage') => void;
  onSelectSection?: (sectionId: string) => void;
}

const DOMAIN_CONFIG: Record<string, { weight: number; title: string; icon: React.ElementType; color: string; desc: string }> = {
  'Domain 1: Cloud Concepts': {
    weight: 24,
    title: 'Khái niệm Đám mây',
    icon: Cloud,
    color: 'from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/30',
    desc: 'Lợi ích cloud, mô hình triển khai, Well-Architected Framework'
  },
  'Domain 2: Security and Compliance': {
    weight: 30,
    title: 'Bảo mật & Tuân thủ',
    icon: Lock,
    color: 'from-orange-500/20 to-amber-600/10 text-orange-400 border-orange-500/30',
    desc: 'Shared Responsibility, IAM, KMS, Shield, WAF, Compliance'
  },
  'Domain 3: Cloud Technology and Services': {
    weight: 34,
    title: 'Công nghệ & Dịch vụ cốt lõi',
    icon: Database,
    color: 'from-emerald-500/20 to-teal-600/10 text-emerald-400 border-emerald-500/30',
    desc: 'EC2, S3, RDS, DynamoDB, VPC, Route 53, CloudFront, Lambda'
  },
  'Domain 4: Billing, Pricing and Support': {
    weight: 12,
    title: 'Chi phí, Định giá & Hỗ trợ',
    icon: CreditCard,
    color: 'from-purple-500/20 to-indigo-600/10 text-purple-400 border-purple-500/30',
    desc: 'Cost Explorer, Budgets, Pricing Models, Support Plans'
  }
};

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  sections,
  completedLectures,
  examAttempts,
  onNavigateTab,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Calculate lecture completion stats per domain
  const domainStats = useMemo(() => {
    const stats: Record<string, { total: number; done: number; percentage: number }> = {
      'Domain 1: Cloud Concepts': { total: 0, done: 0, percentage: 0 },
      'Domain 2: Security and Compliance': { total: 0, done: 0, percentage: 0 },
      'Domain 3: Cloud Technology and Services': { total: 0, done: 0, percentage: 0 },
      'Domain 4: Billing, Pricing and Support': { total: 0, done: 0, percentage: 0 }
    };

    sections.forEach((sec) => {
      if (!stats[sec.domain]) {
        stats[sec.domain] = { total: 0, done: 0, percentage: 0 };
      }
      sec.lectures.forEach((lec) => {
        stats[sec.domain].total += 1;
        if (completedLectures.includes(lec.id)) {
          stats[sec.domain].done += 1;
        }
      });
    });

    Object.keys(stats).forEach((k) => {
      const item = stats[k];
      item.percentage = item.total ? Math.round((item.done / item.total) * 100) : 0;
    });

    return stats;
  }, [sections, completedLectures]);

  // Overall Readiness Score (0-100) combining lectures read + mock exams taken
  const readinessScore = useMemo(() => {
    const totalLecs = sections.reduce((acc, s) => acc + s.lectures.length, 0) || 1;
    const lectureProgress = (completedLectures.length / totalLecs) * 60; // 60% weight from lessons

    let examProgress = 0;
    if (examAttempts.length > 0) {
      const bestScore = Math.max(...examAttempts.map((a) => a.score));
      // Best score mapped to 40% weight (pass mark is 700/1000)
      examProgress = Math.min(40, (bestScore / 1000) * 40);
    }

    return Math.min(100, Math.round(lectureProgress + examProgress));
  }, [sections, completedLectures, examAttempts]);

  const bestExamScore = useMemo(() => {
    if (!examAttempts.length) return null;
    return Math.max(...examAttempts.map((a) => a.score));
  }, [examAttempts]);

  const readinessStatus = useMemo(() => {
    if (readinessScore >= 80) return { label: 'Sẵn Sàng Xuất Sắc', color: 'text-emerald-400', desc: 'Đủ điều kiện đỗ cao kỳ thi AWS CLF-C02' };
    if (readinessScore >= 50) return { label: 'Tiến Độ Tốt', color: 'text-orange-400', desc: 'Nên luyện thêm 2-3 đề thi thử 65 câu' };
    return { label: 'Giai Đoạn Khởi Động', color: 'text-amber-400', desc: 'Bắt đầu học các chuyên đề Domain 2 & 3 trước' };
  }, [readinessScore]);

  return (
    <div className="relative mx-auto mb-8 px-4 sm:px-6 lg:px-8 pt-6">
      <div className="machined-card rounded-3xl p-6 sm:p-7 relative overflow-hidden">
        
        {/* Subtle Ambient Light Orb */}
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

        {/* Dashboard Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-300 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-orange-400" />
              <span>TRUNG TÂM CHỈ HUY LUYỆN THI • AWS CLF-C02 2026</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Bảng Đánh Giá Năng Lực &amp; Chỉ Số Sẵn Sàng
            </h1>
            
            <p className="mt-1 text-sm text-slate-300 max-w-2xl leading-relaxed">
              Theo dõi tiến độ nắm vững 4 nhóm kiến thức chính xác theo chuẩn Pearson VUE. 
              Mục tiêu vượt qua 700/1000 điểm ngay lần thi đầu tiên.
            </p>
          </div>

          {/* Quick Metrics Capsule */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Exam Readiness Metric Box */}
            <div className="machined-inner flex items-center gap-3.5 rounded-2xl px-4 py-2.5">
              <div className="relative flex h-12 w-12 items-center justify-center">
                <svg className="h-12 w-12 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="stroke-slate-800"
                    strokeWidth="3.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="stroke-orange-500 transition-all duration-1000 ease-out"
                    strokeWidth="3.5"
                    strokeDasharray={`${readinessScore}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-mono text-xs font-bold text-white tabular-nums">
                  {readinessScore}%
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Chỉ Số Sẵn Sàng
                </span>
                <span className={`block text-xs font-bold ${readinessStatus.color}`}>
                  {readinessStatus.label}
                </span>
                <span className="block text-[10px] text-slate-400">
                  {readinessStatus.desc}
                </span>
              </div>
            </div>

            {/* Collapse / Expand Toggle */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 transition"
              title={isCollapsed ? 'Mở rộng chi tiết' : 'Thu gọn bảng điều khiển'}
              aria-label="Thu gọn hoặc mở rộng bảng điều khiển"
            >
              {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Expandable Content Area */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 pt-6"
            >
              {/* 4 AWS CLF-C02 Domains Cards Grid */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Target className="h-3.5 w-3.5 text-orange-400" />
                    Trọng số &amp; Độ thành thạo 4 nhóm câu hỏi (Exam Blueprint)
                  </span>
                  <span className="text-xs text-slate-500">Mốc đạt chuẩn: &gt;70% mỗi domain</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {Object.entries(DOMAIN_CONFIG).map(([domainKey, cfg]) => {
                    const stat = domainStats[domainKey] || { total: 0, done: 0, percentage: 0 };
                    const Icon = cfg.icon;

                    return (
                      <div
                        key={domainKey}
                        className="machined-inner group rounded-2xl p-4 transition-all duration-200 hover:border-orange-500/40 relative flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                              <span className={`p-1.5 rounded-lg border bg-gradient-to-br ${cfg.color}`}>
                                <Icon className="h-3.5 w-3.5" />
                              </span>
                              <span className="truncate max-w-[130px]" title={cfg.title}>{cfg.title}</span>
                            </span>
                            <span className="rounded-md border border-white/[0.08] bg-slate-900/90 px-2 py-0.5 font-mono text-[11px] font-bold text-orange-300 tabular-nums">
                              {cfg.weight}% Đề
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-400 leading-snug line-clamp-2 mb-3">
                            {cfg.desc}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                            <span>Đã học {stat.done}/{stat.total} bài</span>
                            <span className="font-mono font-bold text-white tabular-nums">{stat.percentage}%</span>
                          </div>
                          
                          <div className="h-1.5 w-full rounded-full bg-slate-800/80 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-700 ease-out"
                              style={{ width: `${stat.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Action Navigation Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 border-t border-white/[0.06]">
                
                {/* Action 1: Thi Thử Ngay */}
                <button
                  onClick={() => onNavigateTab('exam')}
                  className="group flex items-center justify-between rounded-2xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent p-4 text-left transition-all duration-200 hover:border-orange-500/60 hover:bg-orange-500/15"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-slate-950 font-bold shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                      <Play className="h-4 w-4 fill-current ml-0.5" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                        Mô Phỏng Thi Pearson VUE
                      </span>
                      <span className="block text-xs text-slate-400">
                        65 câu • 90 phút • Đạt từ 700/1000
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-orange-400 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Action 2: Tra Cứu Từ Khóa Bí Kíp */}
                <button
                  onClick={() => onNavigateTab('cheatsheet')}
                  className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-slate-900/60 p-4 text-left transition-all duration-200 hover:border-amber-500/40 hover:bg-slate-800/60"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 group-hover:scale-105 transition-transform">
                      <Zap className="h-4 w-4 fill-current" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        Bí Kíp &amp; Keyword Matrix
                      </span>
                      <span className="block text-xs text-slate-400">
                        Thấy từ khóa &rarr; Chọn ngay đáp án
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Action 3: Tiếp Tục Học Bài Mới */}
                <button
                  onClick={() => onNavigateTab('study')}
                  className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-slate-900/60 p-4 text-left transition-all duration-200 hover:border-blue-500/40 hover:bg-slate-800/60"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 group-hover:scale-105 transition-transform">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                        20 Chuyên Đề Song Ngữ
                      </span>
                      <span className="block text-xs text-slate-400">
                        {completedLectures.length} bài hoàn thành • Đầy đủ mẹo thi
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
