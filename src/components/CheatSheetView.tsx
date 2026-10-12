import React, { useState, useMemo } from 'react';
import { COMPARISONS_DATA, KEYWORDS_LOOKUP } from '../data/cheatSheet';
import { 
  Zap, 
  Search, 
  ArrowRight, 
  Sparkles, 
  Table, 
  ShieldAlert, 
  Check, 
  Flame, 
  HelpCircle,
  Copy
} from 'lucide-react';

export const CheatSheetView: React.FC = () => {
  const [keywordSearch, setKeywordSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'keywords' | 'comparisons'>('keywords');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filteredKeywords = useMemo(() => {
    if (!keywordSearch.trim()) return KEYWORDS_LOOKUP;
    const q = keywordSearch.toLowerCase();
    return KEYWORDS_LOOKUP.filter((item) =>
      item.keyword.toLowerCase().includes(q) ||
      item.keywordVi.toLowerCase().includes(q) ||
      item.service.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.explanationVi.toLowerCase().includes(q)
    );
  }, [keywordSearch]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-2">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>SIÊU TÓM TẮT &amp; BẢNG TRA CỨU NHANH</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Bí Kíp Phân Biệt &amp; Nhận Diện Dịch Vụ AWS
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Tổng hợp các từ khóa "vàng" và các bảng so sánh kinh điển giải quyết 80% câu hỏi trong kỳ thi AWS Cloud Practitioner CLF-C02.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('keywords')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 ${
                activeTab === 'keywords'
                  ? 'bg-orange-500 text-slate-950 shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Thấy Từ Khóa &rarr; Chọn Dịch Vụ</span>
            </button>
            <button
              onClick={() => setActiveTab('comparisons')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 ${
                activeTab === 'comparisons'
                  ? 'bg-orange-500 text-slate-950 shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Bảng So Sánh Kinh Điển</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Keyword Fast Matcher */}
      {activeTab === 'keywords' && (
        <div className="space-y-4">
          {/* Keyword Search Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Gõ từ khóa trong đề thi (ví dụ: MongoDB, Decouple, Audit API, Hadoop, 5G, PII, Single-digit ms)..."
                value={keywordSearch}
                onChange={(e) => setKeywordSearch(e.target.value)}
                className="w-full bg-slate-800 text-sm text-white pl-9 pr-4 py-2.5 rounded-lg border border-slate-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 placeholder-slate-400 transition"
              />
              {keywordSearch && (
                <button
                  onClick={() => setKeywordSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Xóa tìm kiếm
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-1.5 mt-2 text-xs text-slate-400">
              <span className="font-medium text-slate-500">Gợi ý tìm nhanh:</span>
              {['Hadoop', 'Decouple', 'MongoDB', 'Audit API', 'PII', 'Single-digit ms', '5G', 'TAM', 'Lift and shift'].map((kw) => (
                <button
                  key={kw}
                  onClick={() => setKeywordSearch(kw)}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>

          {/* Keyword Match Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredKeywords.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 hover:border-orange-500/50 rounded-xl p-4 shadow-sm transition hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {item.category}
                    </span>
                    <button
                      onClick={() => copyToClipboard(item.service, `kw-${idx}`)}
                      className="text-slate-500 hover:text-slate-300 transition"
                      title="Sao chép tên dịch vụ"
                    >
                      {copiedKey === `kw-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="bg-amber-950/20 border border-amber-500/20 p-2 rounded-lg mb-2.5">
                    <div className="text-xs font-bold text-amber-300 line-clamp-1">
                      {item.keyword}
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5">
                      VI: {item.keywordVi}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <ArrowRight className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    <span className="text-base font-bold text-white group-hover:text-orange-400 transition">
                      {item.service}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-850 p-2.5 rounded-lg border border-slate-800/80">
                    {item.explanationVi}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredKeywords.length === 0 && (
            <div className="text-center py-12 bg-slate-900 rounded-2xl border border-slate-800 text-slate-400">
              <HelpCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium">Không tìm thấy từ khóa nào khớp với "{keywordSearch}".</p>
              <p className="text-xs text-slate-500 mt-1">Thử tìm theo tên dịch vụ như SQS, DynamoDB, Macie, Transit Gateway...</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Classic Comparisons */}
      {activeTab === 'comparisons' && (
        <div className="space-y-6">
          {COMPARISONS_DATA.map((comp) => (
            <div
              key={comp.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                    {comp.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {comp.titleVi}
                  </h3>
                  <p className="text-xs text-slate-400">{comp.title}</p>
                </div>

                {comp.keyNoteVi && (
                  <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 max-w-md">
                    <Sparkles className="w-4 h-4 flex-shrink-0 text-amber-400" />
                    <span>{comp.keyNoteVi}</span>
                  </div>
                )}
              </div>

              {/* Table rendering */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-800/80 border-b border-slate-700 text-slate-200">
                      {comp.headers.map((h, i) => (
                        <th key={i} className="py-2.5 px-3 font-semibold whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {comp.rows.map((row, rIdx) => (
                      <tr 
                        key={rIdx} 
                        className={rIdx % 2 === 0 ? 'bg-slate-900/50 hover:bg-slate-800/50' : 'bg-slate-850/40 hover:bg-slate-800/50'}
                      >
                        {row.map((cell, cIdx) => (
                          <td 
                            key={cIdx} 
                            className={`py-2.5 px-3 ${cIdx === 0 ? 'font-medium text-orange-300' : 'text-slate-300'}`}
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
