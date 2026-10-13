import React, { useState, useMemo } from 'react';
import { COMPARISONS_DATA, KEYWORDS_LOOKUP } from '../data/cheatSheet';
import { 
  Zap, 
  Search, 
  ArrowRight, 
  Sparkles, 
  Table, 
  Check, 
  Flame, 
  HelpCircle,
  Copy,
  Layers,
  Filter
} from 'lucide-react';

const CATEGORY_MAP: Record<string, string[]> = {
  'Tất cả': [],
  'Security & IAM': ['security', 'iam', 'encryption', 'compliance', 'governance', 'identity'],
  'Databases & Storage': ['database', 'storage'],
  'Compute & Network': ['compute', 'networking', 'edge', 'hybrid'],
  'Analytics & AI': ['analytics', 'machine learning', 'ai'],
  'Billing & Support': ['billing', 'support', 'cost'],
  'Architecture & Migration': ['architecture', 'migration', 'framework', 'resilience', 'strategy'],
  'Integration': ['application integration']
};

export const CheatSheetView: React.FC = () => {
  const [keywordSearch, setKeywordSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'keywords' | 'comparisons'>('keywords');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filteredKeywords = useMemo(() => {
    let list = KEYWORDS_LOOKUP;
    if (selectedCategory !== 'Tất cả') {
      const matchWords = CATEGORY_MAP[selectedCategory] || [];
      list = list.filter((item) => {
        const cat = item.category.toLowerCase();
        return matchWords.some((w) => cat.includes(w));
      });
    }
    if (keywordSearch.trim()) {
      const q = keywordSearch.toLowerCase();
      list = list.filter((item) =>
        item.keyword.toLowerCase().includes(q) ||
        item.keywordVi.toLowerCase().includes(q) ||
        item.service.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.explanationVi.toLowerCase().includes(q)
      );
    }
    return list;
  }, [keywordSearch, selectedCategory]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* ================= HERO BANNER ================= */}
      <div className="machined-card rounded-3xl p-6 sm:p-8 lg:p-9 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 mb-3">
              <Zap className="h-3.5 w-3.5 fill-current text-amber-400" />
              <span>SIÊU TÓM TẮT &amp; MA TRẬN NHẬN DIỆN DỊCH VỤ AWS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Bí Kíp Nhận Diện Từ Khóa &amp; Bảng So Sánh
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Tổng hợp 100+ từ khóa "bẫy vàng" và các bảng đối chiếu kinh điển giúp xử lý nhanh và chính xác hơn 80% câu hỏi trong kỳ thi AWS Cloud Practitioner CLF-C02.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="machined-inner flex items-center p-1 rounded-2xl shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('keywords')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === 'keywords'
                  ? 'bg-gradient-to-r from-orange-400 to-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Flame className="h-3.5 w-3.5" />
              <span>Thấy Từ Khóa &rarr; Chọn Dịch Vụ</span>
            </button>
            <button
              onClick={() => setActiveTab('comparisons')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === 'comparisons'
                  ? 'bg-gradient-to-r from-orange-400 to-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Table className="h-3.5 w-3.5" />
              <span>Bảng So Sánh Kinh Điển</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= TAB 1: KEYWORD FAST MATCHER ================= */}
      {activeTab === 'keywords' && (
        <div className="space-y-6">
          
          {/* Keyword Search & Category Filter Bar */}
          <div className="machined-card rounded-2xl p-5 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Gõ từ khóa trong câu hỏi (ví dụ: MongoDB, Decouple, Audit API, Hadoop, 5G, PII, Single-digit ms, TAM)..."
                value={keywordSearch}
                onChange={(e) => setKeywordSearch(e.target.value)}
                className="h-11 w-full rounded-xl border border-white/[0.08] bg-slate-950/70 pl-10 pr-9 text-xs sm:text-sm text-slate-100 placeholder-slate-400 transition focus:border-orange-500/80 focus:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
              />
              {keywordSearch && (
                <button
                  onClick={() => setKeywordSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Keyword Recommendations */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-semibold text-slate-400 flex items-center gap-1 pr-1">
                <Sparkles className="h-3 w-3 text-orange-400" /> Từ khóa phổ biến:
              </span>
              {['Hadoop', 'Decouple', 'MongoDB', 'Audit API', 'PII', 'Single-digit ms', '5G', 'TAM', 'Lift and shift', 'Warm Standby', 'SQL Injection'].map((kw) => (
                <button
                  key={kw}
                  onClick={() => setKeywordSearch(kw)}
                  className="rounded-lg border border-white/[0.06] bg-slate-800/80 px-2.5 py-1 text-[11px] text-slate-300 hover:border-orange-500/40 hover:text-white transition"
                >
                  {kw}
                </button>
              ))}
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-white/[0.06] pt-3">
              <span className="text-[11px] font-semibold text-slate-400 shrink-0 pr-1 flex items-center gap-1">
                <Filter className="h-3 w-3 text-slate-500" /> Nhóm:
              </span>
              {Object.keys(CATEGORY_MAP).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-3 py-1 text-xs font-semibold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'border border-orange-500/50 bg-orange-500/20 text-orange-300 font-bold'
                      : 'border border-white/[0.06] bg-slate-800/60 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Keyword Match Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredKeywords.map((item, idx) => (
              <div
                key={idx}
                className="machined-card group rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:border-orange-500/50 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="rounded-md border border-white/[0.06] bg-slate-950/80 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <button
                      onClick={() => copyToClipboard(item.service, `kw-${idx}`)}
                      className="text-slate-500 hover:text-slate-300 transition p-1"
                      title="Sao chép tên dịch vụ"
                    >
                      {copiedKey === `kw-${idx}` ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Gold Keyword Banner */}
                  <div className="rounded-xl border border-amber-500/30 bg-amber-950/25 p-3 mb-3">
                    <div className="text-xs font-bold text-amber-300 line-clamp-1">
                      {item.keyword}
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5">
                      VI: {item.keywordVi}
                    </div>
                  </div>

                  {/* Service Match Result */}
                  <div className="flex items-center space-x-2 mb-3">
                    <ArrowRight className="h-4 w-4 text-orange-400 shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                      {item.service}
                    </span>
                  </div>

                  {/* Detailed explanation */}
                  <p className="machined-inner text-xs text-slate-300 leading-relaxed p-3 rounded-xl">
                    {item.explanationVi}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredKeywords.length === 0 && (
            <div className="machined-inner text-center py-16 rounded-3xl">
              <HelpCircle className="h-10 w-10 mx-auto text-slate-500 opacity-60" />
              <h3 className="mt-3 text-base font-bold text-white">Không tìm thấy từ khóa nào</h3>
              <p className="text-xs text-slate-400 mt-1">
                Thử tìm theo tên dịch vụ như SQS, DynamoDB, Macie, Transit Gateway, Shield...
              </p>
              <button
                onClick={() => { setKeywordSearch(''); setSelectedCategory('Tất cả'); }}
                className="mt-4 rounded-xl border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-xs font-semibold text-orange-400 hover:bg-orange-500/20 transition"
              >
                Xóa tìm kiếm &amp; bộ lọc
              </button>
            </div>
          )}

        </div>
      )}

      {/* ================= TAB 2: CLASSIC COMPARISONS ================= */}
      {activeTab === 'comparisons' && (
        <div className="space-y-6">
          {COMPARISONS_DATA.map((comp) => (
            <div
              key={comp.id}
              className="machined-card rounded-3xl p-5 sm:p-7 overflow-hidden space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400 font-mono">
                    {comp.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {comp.titleVi}
                  </h3>
                  <p className="text-xs text-slate-400">{comp.title}</p>
                </div>

                {comp.keyNoteVi && (
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs text-amber-300 flex items-center gap-2 max-w-md">
                    <Sparkles className="h-4 w-4 shrink-0 text-amber-400" />
                    <span className="font-medium">{comp.keyNoteVi}</span>
                  </div>
                )}
              </div>

              {/* Polished Matrix Table */}
              <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-slate-900/90">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-850/90 border-b border-white/[0.08] text-slate-200">
                      {comp.headers.map((h, i) => (
                        <th key={i} className="py-3 px-4 font-bold whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {comp.rows.map((row, rIdx) => (
                      <tr 
                        key={rIdx} 
                        className={rIdx % 2 === 0 ? 'bg-slate-900/60 hover:bg-slate-800/60' : 'bg-slate-850/40 hover:bg-slate-800/60'}
                      >
                        {row.map((cell, cIdx) => (
                          <td 
                            key={cIdx} 
                            className={`py-3 px-4 ${cIdx === 0 ? 'font-bold text-orange-300' : 'text-slate-300'}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
