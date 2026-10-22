import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  FileText, 
  Code2, 
  Search,
  ExternalLink
} from 'lucide-react';
import { SECTIONS_DATA } from '../../data/sections';
import { keyboardAudio } from '../../utils/keyboardAudio';

interface VSCodeLectureViewerProps {
  initialSectionId?: string;
  initialLectureId?: string;
  langMode?: 'bilingual' | 'vi' | 'en';
}

export const VSCodeLectureViewer: React.FC<VSCodeLectureViewerProps> = ({
  initialSectionId,
  initialLectureId,
  langMode = 'bilingual'
}) => {
  const [selectedSectionIdx, setSelectedSectionIdx] = useState(0);
  const [selectedLectureIdx, setSelectedLectureIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'preview' | 'stealth'>('preview');

  const currentSection = SECTIONS_DATA[selectedSectionIdx] || SECTIONS_DATA[0];
  const currentLecture = currentSection.lectures[selectedLectureIdx] || currentSection.lectures[0];

  const handleNext = () => {
    keyboardAudio.playKeyClick();
    if (selectedLectureIdx < currentSection.lectures.length - 1) {
      setSelectedLectureIdx(selectedLectureIdx + 1);
    } else if (selectedSectionIdx < SECTIONS_DATA.length - 1) {
      setSelectedSectionIdx(selectedSectionIdx + 1);
      setSelectedLectureIdx(0);
    }
  };

  const handlePrev = () => {
    keyboardAudio.playKeyClick();
    if (selectedLectureIdx > 0) {
      setSelectedLectureIdx(selectedLectureIdx - 1);
    } else if (selectedSectionIdx > 0) {
      setSelectedSectionIdx(selectedSectionIdx - 1);
      setSelectedLectureIdx(SECTIONS_DATA[selectedSectionIdx - 1].lectures.length - 1);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1e1e1e] text-[#cccccc] font-sans select-none overflow-hidden">
      {/* 1. Header Toolbar */}
      <div className="flex items-center justify-between px-4 h-[38px] bg-[#252526] border-b border-[#2d2d2d] text-[12px] font-mono">
        <div className="flex items-center gap-2 overflow-x-auto">
          <BookOpen className="w-3.5 h-3.5 text-[#007acc] shrink-0" />
          
          {/* Section dropdown */}
          <select
            value={selectedSectionIdx}
            onChange={(e) => {
              keyboardAudio.playKeyClick();
              setSelectedSectionIdx(Number(e.target.value));
              setSelectedLectureIdx(0);
            }}
            className="bg-[#1e1e1e] border border-[#3e3e3e] text-white rounded px-2 py-0.5 text-[11px] outline-none max-w-[200px] truncate"
          >
            {SECTIONS_DATA.map((sec, idx) => (
              <option key={sec.id} value={idx}>
                Chuyên đề {sec.sectionNumber}: {sec.titleVi || sec.titleEn}
              </option>
            ))}
          </select>

          {/* Lecture dropdown */}
          <select
            value={selectedLectureIdx}
            onChange={(e) => {
              keyboardAudio.playKeyClick();
              setSelectedLectureIdx(Number(e.target.value));
            }}
            className="bg-[#1e1e1e] border border-[#3e3e3e] text-white rounded px-2 py-0.5 text-[11px] outline-none max-w-[240px] truncate"
          >
            {currentSection.lectures.map((lec, idx) => (
              <option key={lec.id} value={idx}>
                Bài {lec.number}: {lec.titleVi || lec.titleEn}
              </option>
            ))}
          </select>
        </div>

        {/* View Mode Toggle: Markdown Preview vs Stealth Code Doc */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              keyboardAudio.playKeyClick();
              setViewMode(viewMode === 'preview' ? 'stealth' : 'preview');
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2d2d2d] hover:bg-[#383838] border border-[#3e3e3e] text-[11px] transition-colors"
            title="Đổi định dạng xem: Markdown Preview hoặc Source Code"
          >
            {viewMode === 'preview' ? (
              <>
                <Code2 className="w-3 h-3 text-purple-400" />
                <span className="hidden sm:inline">Dạng Code (Stealth)</span>
              </>
            ) : (
              <>
                <FileText className="w-3 h-3 text-sky-400" />
                <span className="hidden sm:inline">Dạng Markdown</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 select-text scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-6">
          {viewMode === 'stealth' ? (
            /* STEALTH CODE FORMAT */
            <div className="font-mono text-[12px] leading-[21px] space-y-4">
              <div className="text-[#6a9955]">
                <div>// =========================================================================</div>
                <div>// ARCHITECTURE MODULE: {currentSection.titleEn.toUpperCase()}</div>
                <div>// LECTURE {currentLecture.number}: {currentLecture.titleEn.toUpperCase()}</div>
                <div>// DOMAIN: {currentSection.domain}</div>
                <div>// =========================================================================</div>
              </div>

              <div>
                <span className="text-[#569cd6]">export interface</span>{' '}
                <span className="text-[#4ec9b0]">LectureArchitectureGuide</span> &#123;
              </div>

              <div className="pl-6 text-[#9cdcfe]">
                <div>id: <span className="text-[#ce9178]">"{currentLecture.id}"</span>;</div>
                <div>number: <span className="text-[#b5cea8]">{currentLecture.number}</span>;</div>
                <div>domain: <span className="text-[#ce9178]">"{currentSection.domain}"</span>;</div>
              </div>

              <div>&#125;</div>

              <div className="p-4 bg-[#222222] border-l-2 border-[#007acc] rounded-r space-y-2">
                <div className="text-emerald-400 font-bold">// TÓM TẮT KIẾN THỨC CỐT LÕI (OVERVIEW):</div>
                <p className="text-[#d4d4d4] font-sans text-[13.5px] leading-relaxed">
                  {currentLecture.summaryVi || currentLecture.summaryEn}
                </p>
                {currentLecture.summaryEn && currentLecture.summaryVi && (
                  <p className="text-[#888888] font-sans text-[12px] leading-relaxed italic">
                    {currentLecture.summaryEn}
                  </p>
                )}
              </div>

              {/* Key points */}
              <div className="space-y-2">
                <div className="text-[#dcdcaa] font-bold">// TRỌNG TÂM CẦN NHỚ (KEY TAKEAWAYS):</div>
                <div className="pl-4 space-y-1.5 font-sans text-[13px] text-[#cccccc]">
                  {(currentLecture.keyPointsVi || currentLecture.keyPointsEn || []).map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-[#007acc] font-mono shrink-0">[{idx + 1}]</span>
                      <span className="leading-relaxed">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exam tips */}
              {((currentLecture.examTipsVi && currentLecture.examTipsVi.length > 0) || (currentLecture.examTipsEn && currentLecture.examTipsEn.length > 0)) && (
                <div className="p-3.5 bg-amber-950/20 border border-amber-500/30 rounded space-y-1.5">
                  <div className="text-amber-400 font-bold font-mono text-[11px] flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>// MẸO THI CLF-C02 (EXAM TIPS):</span>
                  </div>
                  <div className="space-y-1 font-sans text-[12.5px] text-amber-200/90 leading-relaxed pl-2">
                    {(currentLecture.examTipsVi || currentLecture.examTipsEn || []).map((tip, idx) => (
                      <div key={idx}>• {tip}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* MARKDOWN PREVIEW FORMAT */
            <div className="space-y-6">
              {/* Header badge */}
              <div className="space-y-2 border-b border-[#333333] pb-4">
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-[#007acc]/20 text-[#007acc] font-mono font-semibold">
                    Chuyên đề {currentSection.sectionNumber}
                  </span>
                  <span className="text-[#888888]">
                    Bài {currentLecture.number}
                  </span>
                  <span className="text-[#666666]">•</span>
                  <span className="text-[#888888]">{currentSection.domain}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {currentLecture.titleVi || currentLecture.titleEn}
                </h1>
                {currentLecture.titleEn && currentLecture.titleVi && (
                  <p className="text-sm text-[#888888] font-mono">
                    {currentLecture.titleEn}
                  </p>
                )}
              </div>

              {/* Summary card */}
              <div className="p-4 rounded-xl bg-[#252526] border border-[#3e3e3e] space-y-2">
                <div className="text-xs font-bold text-[#007acc] uppercase tracking-wider">
                  Tổng quan bài học
                </div>
                <p className="text-sm text-[#cccccc] leading-relaxed">
                  {currentLecture.summaryVi || currentLecture.summaryEn}
                </p>
                {currentLecture.summaryEn && currentLecture.summaryVi && (
                  <p className="text-xs text-[#888888] leading-relaxed italic pt-1 border-t border-[#333333]">
                    {currentLecture.summaryEn}
                  </p>
                )}
              </div>

              {/* Key points */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Điểm cốt lõi cần nhớ</span>
                </h3>
                <div className="space-y-2">
                  {(currentLecture.keyPointsVi || currentLecture.keyPointsEn || []).map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#252526] border border-white/[0.04]">
                      <span className="w-5 h-5 rounded-full bg-[#333333] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm text-[#cccccc] leading-relaxed">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exam tips box */}
              {((currentLecture.examTipsVi && currentLecture.examTipsVi.length > 0) || (currentLecture.examTipsEn && currentLecture.examTipsEn.length > 0)) && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4" />
                    <span>Mẹo thi thực chiến (Exam Tips)</span>
                  </div>
                  <div className="space-y-1.5 pl-6 text-xs text-amber-200/90 leading-relaxed">
                    {(currentLecture.examTipsVi || currentLecture.examTipsEn || []).map((tip, idx) => (
                      <div key={idx}>• {tip}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comparison table if present */}
              {currentLecture.table && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-[#aaaaaa] uppercase tracking-wider">
                    Bảng so sánh chi tiết
                  </h4>
                  <div className="overflow-x-auto rounded-lg border border-[#3e3e3e]">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#2d2d2d] border-b border-[#3e3e3e]">
                          {currentLecture.table.headers.map((h, i) => (
                            <th key={i} className="p-2.5 font-bold text-white">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#333333]">
                        {currentLecture.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-[#252526]">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-2.5 text-[#cccccc]">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. Bottom Next / Prev controls */}
      <div className="flex items-center justify-between px-4 h-[42px] bg-[#252526] border-t border-[#2d2d2d] text-[12px] font-mono">
        <button
          onClick={handlePrev}
          disabled={selectedSectionIdx === 0 && selectedLectureIdx === 0}
          className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#2d2d2d] hover:bg-[#383838] disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Bài trước</span>
        </button>

        <span className="text-[#888888] text-[11px]">
          Chuyên đề {currentSection.sectionNumber} • Bài {currentLecture.number} / {currentSection.lectures.length}
        </span>

        <button
          onClick={handleNext}
          disabled={selectedSectionIdx === SECTIONS_DATA.length - 1 && selectedLectureIdx === currentSection.lectures.length - 1}
          className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#007acc] hover:bg-[#0062a3] text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <span>Bài tiếp theo</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
