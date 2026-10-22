import React, { useState, useEffect } from 'react';
import { 
  Play, 
  CheckCircle2, 
  XCircle, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  Award,
  Layers,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import type { ExamSet, ExamQuestion } from '../../types';
import { keyboardAudio } from '../../utils/keyboardAudio';

interface VSCodeExamRunnerProps {
  exam: ExamSet;
  allExams: ExamSet[];
  onSelectExam: (examId: string) => void;
  langMode?: 'bilingual' | 'vi' | 'en';
}

export const VSCodeExamRunner: React.FC<VSCodeExamRunnerProps> = ({
  exam,
  allExams,
  onSelectExam,
  langMode = 'bilingual'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number[]>>({});
  const [flagged, setFlagged] = useState<number[]>([]);
  const [checkedAnswers, setCheckedAnswers] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [stealthMode, setStealthMode] = useState(true); // Default to stealth test-code view!
  const [secondsLeft, setSecondsLeft] = useState(exam.timeLimitMinutes * 60);

  const questions = exam.questions;
  const currentQ = questions[currentIndex] || questions[0];

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIdx: number) => {
    keyboardAudio.playKeyClick();
    if (isSubmitted) return;

    setUserAnswers(prev => {
      const existing = prev[currentIndex] || [];
      if (currentQ.isMultipleResponse) {
        if (existing.includes(optIdx)) {
          return { ...prev, [currentIndex]: existing.filter(i => i !== optIdx) };
        } else {
          return { ...prev, [currentIndex]: [...existing, optIdx].sort() };
        }
      } else {
        return { ...prev, [currentIndex]: [optIdx] };
      }
    });
  };

  const toggleFlag = () => {
    keyboardAudio.playKeyClick();
    setFlagged(prev => 
      prev.includes(currentIndex) ? prev.filter(i => i !== currentIndex) : [...prev, currentIndex]
    );
  };

  const toggleCheckAnswer = () => {
    keyboardAudio.playKeyClick();
    setCheckedAnswers(prev => 
      prev.includes(currentIndex) ? prev.filter(i => i !== currentIndex) : [...prev, currentIndex]
    );
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      const ans = userAnswers[idx] || [];
      const correct = q.correctAnswers;
      if (ans.length === correct.length && ans.every(v => correct.includes(v))) {
        correctCount++;
      }
    });
    const scaledScore = Math.round((correctCount / questions.length) * 1000);
    const passed = scaledScore >= exam.passingScore;
    return { correctCount, total: questions.length, scaledScore, passed };
  };

  const isChecked = checkedAnswers.includes(currentIndex) || isSubmitted;
  const currentSelected = userAnswers[currentIndex] || [];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1e1e1e] text-[#cccccc] font-mono select-none overflow-hidden">
      {/* 1. Exam Control Bar (VS Code Toolbar style) */}
      <div className="flex items-center justify-between px-4 h-[38px] bg-[#252526] border-b border-[#2d2d2d] text-[12px]">
        {/* Left: Suite info & selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px]">
            <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
            <span>SUITE:</span>
          </div>

          <select
            value={exam.id}
            onChange={(e) => {
              keyboardAudio.playKeyClick();
              onSelectExam(e.target.value);
              setCurrentIndex(0);
              setUserAnswers({});
              setCheckedAnswers([]);
              setIsSubmitted(false);
            }}
            className="bg-[#1e1e1e] border border-[#3e3e3e] text-white rounded px-2 py-0.5 text-[11px] outline-none font-mono focus:border-[#007acc]"
          >
            {allExams.map(ex => (
              <option key={ex.id} value={ex.id}>
                {ex.title} ({ex.questions.length}Q)
              </option>
            ))}
          </select>

          <span className="hidden md:inline text-[11px] text-[#888888]">
            [{currentQ.domain}]
          </span>
        </div>

        {/* Right: Controls (Timer, Stealth switch, Submit) */}
        <div className="flex items-center gap-2">
          {/* Timer badge */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#1e1e1e] border border-[#3e3e3e] text-amber-300 text-[11px]">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>{formatTime(secondsLeft)}</span>
          </div>

          {/* Toggle Stealth Code Mode vs Clean UI Mode */}
          <button
            onClick={() => {
              keyboardAudio.playKeyClick();
              setStealthMode(!stealthMode);
            }}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] border transition-colors ${
              stealthMode 
                ? 'bg-purple-950/40 text-purple-300 border-purple-700/60' 
                : 'bg-[#2d2d2d] text-[#aaaaaa] border-[#3e3e3e] hover:text-white'
            }`}
            title="Đổi giao diện: Dạng code unit test trá hình hoặc Dạng webview trực quan"
          >
            {stealthMode ? <EyeOff className="w-3 h-3 text-purple-400" /> : <Eye className="w-3 h-3 text-sky-400" />}
            <span className="hidden sm:inline">{stealthMode ? 'Trá hình: Code Test' : 'Giao diện: Trực quan'}</span>
          </button>

          {/* Submit Exam Button */}
          {!isSubmitted ? (
            <button
              onClick={() => {
                keyboardAudio.playKeyClick('enter');
                if (window.confirm("Bạn có chắc chắn muốn nộp bài thi thử này?")) {
                  setIsSubmitted(true);
                }
              }}
              className="bg-[#007acc] hover:bg-[#0062a3] text-white font-medium px-2.5 py-0.5 rounded text-[11px] transition-colors"
            >
              Nộp bài (Submit)
            </button>
          ) : (
            <button
              onClick={() => {
                keyboardAudio.playKeyClick();
                setUserAnswers({});
                setCheckedAnswers([]);
                setIsSubmitted(false);
                setSecondsLeft(exam.timeLimitMinutes * 60);
              }}
              className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-2 py-0.5 rounded text-[11px]"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Thi lại</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Question Navigation Ribbon (1 ... 65) */}
      <div className="flex items-center justify-between px-3 h-[32px] bg-[#1a1a1a] border-b border-[#282828] text-[11px] overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 overflow-x-auto py-1">
          {questions.map((q, idx) => {
            const hasAnswered = !!userAnswers[idx]?.length;
            const isFlag = flagged.includes(idx);
            const isCurrent = idx === currentIndex;
            const isCorrect = isSubmitted && (userAnswers[idx]?.length === q.correctAnswers.length && userAnswers[idx]?.every(v => q.correctAnswers.includes(v)));
            const isWrong = isSubmitted && !isCorrect && hasAnswered;

            return (
              <button
                key={idx}
                onClick={() => {
                  keyboardAudio.playKeyClick();
                  setCurrentIndex(idx);
                }}
                className={`relative min-w-[24px] h-[22px] px-1 rounded flex items-center justify-center font-mono text-[10px] font-bold transition-all ${
                  isCurrent 
                    ? 'ring-1 ring-[#007acc] bg-[#007acc]/30 text-white' 
                    : isSubmitted
                      ? isCorrect ? 'bg-emerald-950/80 text-emerald-400' : isWrong ? 'bg-rose-950/80 text-rose-400' : 'bg-[#2a2a2a] text-[#777777]'
                      : hasAnswered 
                        ? 'bg-[#264f78] text-[#cccccc]' 
                        : 'bg-[#252525] text-[#777777] hover:bg-[#303030] hover:text-[#cccccc]'
                }`}
                title={`Câu ${idx + 1}`}
              >
                {idx + 1}
                {isFlag && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Flag button */}
        <button
          onClick={toggleFlag}
          className={`flex items-center gap-1 px-2 py-0.5 rounded shrink-0 ml-2 transition-colors ${
            flagged.includes(currentIndex) ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-[#888888] hover:text-white'
          }`}
          title="Đánh dấu câu hỏi cần xem lại"
        >
          <Flag className="w-3 h-3 fill-current" />
          <span className="text-[10px]">Flag</span>
        </button>
      </div>

      {/* 3. Main Body: Either Stealth Code View or Web View */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-thin select-text">
        {isSubmitted && (
          <div className="mb-6 p-4 rounded-lg bg-[#252526] border border-[#3e3e3e]">
            {(() => {
              const result = calculateScore();
              return (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                      result.passed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    }`}>
                      {result.passed ? 'PASS' : 'FAIL'}
                    </div>
                    <div>
                      <div className="font-bold text-white text-[15px]">
                        Điểm số: <span className={result.passed ? 'text-emerald-400' : 'text-rose-400'}>{result.scaledScore}</span> / 1000
                        <span className="text-[11px] text-[#888888] font-normal ml-2">(Chuẩn đạt: {exam.passingScore})</span>
                      </div>
                      <div className="text-[12px] text-[#aaaaaa]">
                        Đúng {result.correctCount} / {result.total} câu hỏi ({Math.round((result.correctCount / result.total) * 100)}%)
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#888888]">
                    Bạn có thể bấm trực tiếp vào các số thứ tự câu hỏi ở dải trên để xem lại giải thích chi tiết.
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* VIEW MODE 1: STEALTH CODE / UNIT TEST LOOK */}
        {stealthMode ? (
          <div className="space-y-4 max-w-4xl mx-auto">
            {/* Suite header comment */}
            <div className="text-[#6a9955] leading-relaxed">
              <div>// =========================================================================</div>
              <div>// TEST CASE #{currentIndex + 1} of {questions.length} [{currentQ.domain}]</div>
              <div>// STATUS: {currentSelected.length > 0 ? `Selected [${currentSelected.map(i => String.fromCharCode(65 + i)).join(', ')}]` : 'Unanswered (Click option below)'}</div>
              <div>// =========================================================================</div>
            </div>

            {/* Describe block */}
            <div className="space-y-2">
              <div className="text-[13px]">
                <span className="text-[#569cd6]">describe</span>
                <span className="text-[#d4d4d4]">(</span>
                <span className="text-[#ce9178]">"Question {currentIndex + 1}: {currentQ.domain}"</span>
                <span className="text-[#d4d4d4]">, () =&gt; &#123;</span>
              </div>

              {/* Requirement docstring */}
              <div className="pl-6 border-l border-[#3c3c3c] py-2 text-[#6a9955] text-[13px] leading-relaxed bg-[#222222]/50 rounded-r p-3 my-2">
                <div className="font-semibold text-emerald-400/90 mb-1">/** @requirement */</div>
                <div className="text-[#d4d4d4] font-sans font-medium text-[14px] leading-[22px]">
                  {currentQ.question}
                </div>
                {currentQ.isMultipleResponse && (
                  <div className="text-amber-400 text-[11px] font-mono mt-1">
                    [!] CHỌN NHIỀU ĐÁP ÁN ĐÚNG ({currentQ.correctAnswers.length} options)
                  </div>
                )}
              </div>

              {/* Options as interactive code candidate constant */}
              <div className="pl-6 space-y-1.5 pt-2">
                <div className="text-[#9cdcfe] text-[12px]">// Click candidate to assert answer:</div>
                <div className="space-y-1">
                  {currentQ.options.map((opt, optIdx) => {
                    const optLetter = String.fromCharCode(65 + optIdx);
                    const isSelected = currentSelected.includes(optIdx);
                    const isCorrectAnswer = currentQ.correctAnswers.includes(optIdx);

                    let borderColor = 'border-white/[0.08]';
                    let bgColor = isSelected ? 'bg-[#264f78]/60 text-white' : 'hover:bg-[#2a2d2e] text-[#cccccc]';
                    
                    if (isChecked) {
                      if (isCorrectAnswer) {
                        bgColor = 'bg-emerald-950/70 text-emerald-300 border-emerald-500/50';
                      } else if (isSelected && !isCorrectAnswer) {
                        bgColor = 'bg-rose-950/70 text-rose-300 border-rose-500/50';
                      }
                    }

                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`flex items-start gap-3 p-2.5 rounded border ${borderColor} ${bgColor} cursor-pointer transition-all text-[13px] font-mono`}
                      >
                        <span className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[11px] shrink-0 ${
                          isSelected ? 'bg-[#007acc] text-white' : 'bg-[#333333] text-[#aaaaaa]'
                        }`}>
                          {optLetter}
                        </span>
                        <span className="flex-1 font-sans text-[13.5px] leading-[20px]">
                          {opt}
                        </span>
                        {isChecked && isCorrectAnswer && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        {isChecked && isSelected && !isCorrectAnswer && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="text-[#d4d4d4] pt-2">&#125;);</div>
            </div>

            {/* CodeLens Action Row */}
            <div className="flex items-center gap-3 pt-3 text-[12px] border-t border-[#333333]">
              <button
                onClick={toggleCheckAnswer}
                className="flex items-center gap-1.5 text-[#007acc] hover:text-[#4fc1ff] transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{isChecked ? 'Ẩn giải thích' : '▶ Run Assertion & Check Explanation'}</span>
              </button>
            </div>

            {/* Explanation box disguised as test assertion result */}
            {isChecked && (
              <div className="mt-3 p-4 rounded-md border border-[#3e3e3e] bg-[#1a1a1a] text-[12px] font-mono space-y-2">
                <div className="text-[#4ec9b0] font-bold">
                  // [ASSERTION RESULT] Expected: [{currentQ.correctAnswers.map(i => String.fromCharCode(65 + i)).join(', ')}]
                </div>
                {currentQ.explanationVi && (
                  <div className="text-[#cccccc] font-sans leading-relaxed pt-1">
                    <span className="font-bold text-amber-400 font-mono">[GIẢI THÍCH]: </span>
                    {currentQ.explanationVi}
                  </div>
                )}
                {currentQ.explanation && (
                  <div className="text-[#999999] font-sans leading-relaxed text-[11.5px]">
                    <span className="font-bold text-[#569cd6] font-mono">[ENGLISH]: </span>
                    {currentQ.explanation}
                  </div>
                )}
                {currentQ.referenceLecture && (
                  <div className="text-[#888888] text-[11px] pt-1">
                    // Reference: {currentQ.referenceSection} • {currentQ.referenceLecture}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* VIEW MODE 2: CLEAN VS CODE WEBVIEW */
          <div className="max-w-3xl mx-auto space-y-5">
            <div className="flex items-center justify-between text-xs text-[#888888]">
              <span>Câu hỏi {currentIndex + 1} / {questions.length}</span>
              <span className="rounded bg-[#2a2d2e] px-2 py-0.5 text-[#cccccc] font-medium">
                {currentQ.domain}
              </span>
            </div>

            <h3 className="text-[16px] font-sans font-semibold text-white leading-relaxed">
              {currentQ.question}
            </h3>

            <div className="space-y-2 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = currentSelected.includes(idx);
                const isCorrect = currentQ.correctAnswers.includes(idx);

                let cardStyle = isSelected 
                  ? 'border-[#007acc] bg-[#264f78]/40 text-white' 
                  : 'border-[#333333] bg-[#252526] hover:bg-[#2c2c2d] text-[#cccccc]';

                if (isChecked) {
                  if (isCorrect) {
                    cardStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200';
                  } else if (isSelected && !isCorrect) {
                    cardStyle = 'border-rose-500 bg-rose-950/40 text-rose-200';
                  }
                }

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${cardStyle}`}
                  >
                    <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected ? 'bg-[#007acc] text-white' : 'bg-[#3a3a3a] text-[#aaaaaa]'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm font-sans flex-1 leading-normal">
                      {opt}
                    </span>
                    {isChecked && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                    {isChecked && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={toggleCheckAnswer}
                className="px-3 py-1.5 rounded bg-[#2a2d2e] hover:bg-[#333333] text-xs font-semibold text-[#007acc] hover:text-[#4fc1ff]"
              >
                {isChecked ? 'Ẩn đáp án' : 'Xem đáp án & giải thích'}
              </button>
            </div>

            {isChecked && (
              <div className="p-4 rounded-lg bg-[#252526] border border-[#3e3e3e] space-y-2 text-xs">
                <div className="font-bold text-emerald-400">
                  Đáp án đúng: {currentQ.correctAnswers.map(i => String.fromCharCode(65 + i)).join(', ')}
                </div>
                <p className="text-slate-200 leading-relaxed font-sans">{currentQ.explanationVi}</p>
                <p className="text-slate-400 leading-relaxed font-sans text-[11px]">{currentQ.explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. Bottom Navigation bar (Previous / Next Question) */}
      <div className="flex items-center justify-between px-4 h-[42px] bg-[#252526] border-t border-[#2d2d2d] text-[12px]">
        <button
          onClick={() => {
            keyboardAudio.playKeyClick();
            setCurrentIndex(prev => Math.max(0, prev - 1));
          }}
          disabled={currentIndex === 0}
          className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#2d2d2d] hover:bg-[#383838] disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Câu trước</span>
        </button>

        <span className="text-[#888888] font-mono text-[11px]">
          Câu {currentIndex + 1} / {questions.length}
        </span>

        <button
          onClick={() => {
            keyboardAudio.playKeyClick();
            setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1));
          }}
          disabled={currentIndex === questions.length - 1}
          className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#007acc] hover:bg-[#0062a3] text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <span>Câu tiếp theo</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
