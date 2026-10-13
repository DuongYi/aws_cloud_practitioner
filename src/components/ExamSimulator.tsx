import React, { useState, useEffect, useMemo } from 'react';
import { ExamSet, ExamQuestion, ExamAttempt } from '../types';
import { 
  Award, 
  Clock, 
  Flag, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RotateCcw, 
  Play, 
  ArrowLeft, 
  ArrowRight, 
  HelpCircle,
  BarChart3,
  ListFilter,
  Check,
  ChevronRight,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
  Strikethrough,
  X,
  ListOrdered
} from 'lucide-react';
import { saveExamAttempt } from '../utils/storage';
import { ExamPicker } from './ExamPicker';
import { ResultSummary } from './ResultSummary';

interface ExamSimulatorProps {
  exams: ExamSet[];
  onFinishAttempt?: () => void;
  langMode: 'bilingual' | 'vi' | 'en';
}

export const ExamSimulator: React.FC<ExamSimulatorProps> = ({ exams, onFinishAttempt, langMode }) => {
  const [selectedExamId, setSelectedExamId] = useState<string>(exams[0]?.id || '');
  const [isExamActive, setIsExamActive] = useState<boolean>(false);
  const [examMode, setExamMode] = useState<'strict' | 'practice'>('strict');
  
  // Active test state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string | number, number[]>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string | number>>(new Set());
  const [eliminatedOptions, setEliminatedOptions] = useState<Record<string | number, Set<number>>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(90 * 60);
  const [isExamCompleted, setIsExamCompleted] = useState<boolean>(false);
  const [showReviewGrid, setShowReviewGrid] = useState<boolean>(false);
  const [showFinishConfirm, setShowFinishConfirm] = useState<boolean>(false);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [filterResultView, setFilterResultView] = useState<'ALL' | 'WRONG' | 'FLAGGED'>('ALL');
  const [textSize, setTextSize] = useState<'normal' | 'large'>('normal');

  const currentExam = useMemo(() => {
    return exams.find((e) => e.id === selectedExamId) || exams[0];
  }, [exams, selectedExamId]);

  // Timer effect during active strict exam
  useEffect(() => {
    if (!isExamActive || isExamCompleted) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamActive, isExamCompleted]);

  const handleStartExam = () => {
    if (!currentExam) return;
    setIsExamActive(true);
    setIsExamCompleted(false);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setFlaggedQuestions(new Set());
    setEliminatedOptions({});
    setTimeRemainingSeconds(currentExam.timeLimitMinutes * 60);
    setShowReviewGrid(false);
    setShowFinishConfirm(false);
    setShowExitConfirm(false);
  };

  const handleSelectOption = (questionId: string | number, optionIndex: number, isMulti: boolean) => {
    if (isExamCompleted && examMode === 'strict') return;

    setUserAnswers((prev) => {
      const current = prev[questionId] || [];
      if (isMulti) {
        if (current.includes(optionIndex)) {
          return { ...prev, [questionId]: current.filter((idx) => idx !== optionIndex) };
        } else {
          return { ...prev, [questionId]: [...current, optionIndex] };
        }
      } else {
        return { ...prev, [questionId]: [optionIndex] };
      }
    });
  };

  const toggleFlagQuestion = (questionId: string | number) => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  };

  const toggleEliminateOption = (questionId: string | number, optionIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEliminatedOptions((prev) => {
      const currentSet = new Set(prev[questionId] || []);
      if (currentSet.has(optionIndex)) {
        currentSet.delete(optionIndex);
      } else {
        currentSet.add(optionIndex);
      }
      return { ...prev, [questionId]: currentSet };
    });
  };

  const handleFinishExam = () => {
    if (!currentExam) return;

    setIsExamCompleted(true);
    setShowReviewGrid(false);
    setShowFinishConfirm(false);

    // Calculate score
    let correctCount = 0;
    const domainScores: Record<string, { correct: number; total: number }> = {};

    currentExam.questions.forEach((q) => {
      const userSelected = userAnswers[q.id] || [];
      const correct = q.correctAnswers || [];
      
      const isCorrect = 
        userSelected.length === correct.length &&
        userSelected.every((ans) => correct.includes(ans));

      if (isCorrect) correctCount++;

      // Domain tracking
      if (!domainScores[q.domain]) {
        domainScores[q.domain] = { correct: 0, total: 0 };
      }
      domainScores[q.domain].total += 1;
      if (isCorrect) {
        domainScores[q.domain].correct += 1;
      }
    });

    const totalQuestions = currentExam.questions.length;
    const scaledScore = Math.round((correctCount / (totalQuestions || 1)) * 900 + 100);
    const passed = scaledScore >= currentExam.passingScore;
    const timeSpent = (currentExam.timeLimitMinutes * 60) - timeRemainingSeconds;

    const attempt: ExamAttempt = {
      id: `attempt-${Date.now()}`,
      examId: currentExam.id,
      examTitle: currentExam.title,
      date: new Date().toISOString(),
      score: scaledScore,
      passed,
      totalQuestions,
      correctCount,
      timeSpentSeconds: timeSpent,
      domainScores,
      userAnswers,
      flaggedQuestionIds: Array.from(flaggedQuestions)
    };

    saveExamAttempt(attempt);
    if (onFinishAttempt) onFinishAttempt();
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Exam Selection Screen
  if (!isExamActive) {
    return (
      <div className="mx-auto max-w-[1440px]">
        <ExamPicker
          exams={exams}
          selectedExamId={currentExam?.id || ''}
          onSelect={setSelectedExamId}
          examMode={examMode}
          onModeChange={setExamMode}
          onStart={handleStartExam}
        />
      </div>
    );
  }

  // Active Exam View
  const currentQ = currentExam?.questions[currentQuestionIndex];
  const selectedForCurrent = (currentQ && userAnswers[currentQ.id]) || [];
  const isFlagged = currentQ && flaggedQuestions.has(currentQ.id);
  const eliminatedForCurrent = currentQ ? (eliminatedOptions[currentQ.id] || new Set()) : new Set();
  const unansweredCount = currentExam.questions.length - Object.keys(userAnswers).length;
  const isTimeCritical = timeRemainingSeconds < 300; // < 5 mins
  const isTimeWarning = timeRemainingSeconds < 900; // < 15 mins

  // If completed, show Results Screen
  if (isExamCompleted) {
    let correctCount = 0;
    const domainScores: Record<string, { correct: number; total: number }> = {};

    currentExam.questions.forEach((q) => {
      const userSelected = userAnswers[q.id] || [];
      const correct = q.correctAnswers || [];
      const isCorrect = userSelected.length === correct.length && userSelected.every((ans) => correct.includes(ans));
      if (isCorrect) correctCount++;

      if (!domainScores[q.domain]) domainScores[q.domain] = { correct: 0, total: 0 };
      domainScores[q.domain].total += 1;
      if (isCorrect) domainScores[q.domain].correct += 1;
    });

    const totalQuestions = currentExam.questions.length;
    const scaledScore = Math.round((correctCount / (totalQuestions || 1)) * 900 + 100);

    const filteredReviewQuestions = currentExam.questions.filter((q) => {
      const userSelected = userAnswers[q.id] || [];
      const correct = q.correctAnswers || [];
      const isCorrect = userSelected.length === correct.length && userSelected.every((ans) => correct.includes(ans));

      if (filterResultView === 'WRONG') return !isCorrect;
      if (filterResultView === 'FLAGGED') return flaggedQuestions.has(q.id);
      return true;
    });

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
        <ResultSummary
          exam={currentExam}
          score={scaledScore}
          correctCount={correctCount}
          timeSpentSeconds={currentExam.timeLimitMinutes * 60 - timeRemainingSeconds}
          domainScores={domainScores}
          userAnswers={userAnswers}
          flagged={flaggedQuestions}
          onRetry={handleStartExam}
          onPickOther={() => setIsExamActive(false)}
          onJumpToQuestion={(id) => {
            setFilterResultView('ALL');
            requestAnimationFrame(() =>
              document.getElementById(`review-q-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            );
          }}
        />

        {/* Review Answers Filter Bar */}
        <div className="machined-card rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Xem lại câu hỏi:</span>
            <div className="machined-inner flex items-center rounded-xl p-1 text-xs">
              <button
                onClick={() => setFilterResultView('ALL')}
                className={`px-3 py-1.5 rounded-lg transition font-medium ${
                  filterResultView === 'ALL' ? 'bg-orange-500 text-slate-950 font-bold shadow-sm' : 'text-slate-300'
                }`}
              >
                Tất cả ({totalQuestions})
              </button>
              <button
                onClick={() => setFilterResultView('WRONG')}
                className={`px-3 py-1.5 rounded-lg transition font-medium ${
                  filterResultView === 'WRONG' ? 'bg-rose-500 text-white font-bold shadow-sm' : 'text-slate-300'
                }`}
              >
                Câu Sai ({totalQuestions - correctCount})
              </button>
              {flaggedQuestions.size > 0 && (
                <button
                  onClick={() => setFilterResultView('FLAGGED')}
                  className={`px-3 py-1.5 rounded-lg transition font-medium ${
                    filterResultView === 'FLAGGED' ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' : 'text-slate-300'
                  }`}
                >
                  Gắn Cờ ({flaggedQuestions.size})
                </button>
              )}
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400">Hiển thị {filteredReviewQuestions.length} câu</span>
        </div>

        {/* Detailed Questions Review List */}
        <div className="space-y-4">
          {filteredReviewQuestions.map((q) => {
            const userSelected = userAnswers[q.id] || [];
            const correct = q.correctAnswers || [];
            const isCorrect = userSelected.length === correct.length && userSelected.every((ans) => correct.includes(ans));

            return (
              <div 
                key={q.id} 
                id={`review-q-${q.id}`}
                className={`machined-card scroll-mt-24 p-5 sm:p-6 rounded-3xl space-y-4 ${
                  isCorrect ? '' : 'border-rose-500/40 ring-1 ring-rose-500/20'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-xs border-b border-white/[0.06] pb-3">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2.5 py-0.5 rounded-md font-bold ${
                      isCorrect 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {isCorrect ? '✓ Đúng' : '✗ Sai'}
                    </span>
                    <span className="font-mono text-slate-400">Câu hỏi #{q.id}</span>
                  </div>
                  <span className="rounded-md bg-slate-950 px-2 py-0.5 font-mono text-slate-400 text-[11px] border border-white/[0.06]">
                    {q.domain}
                  </span>
                </div>

                <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                  {q.question}
                </p>

                {/* Options List */}
                <div className="space-y-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isChosen = userSelected.includes(optIdx);
                    const isRight = correct.includes(optIdx);

                    let badgeClass = 'bg-slate-900/60 border-white/[0.06] text-slate-300';
                    if (isRight) {
                      badgeClass = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-semibold ring-1 ring-emerald-500/30';
                    } else if (isChosen && !isRight) {
                      badgeClass = 'bg-rose-950/40 border-rose-500/60 text-rose-200 line-through';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-3 ${badgeClass}`}
                      >
                        <span className="font-mono font-bold mt-0.5">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span className="flex-1">{opt}</span>
                        {isRight && <span className="text-xs text-emerald-400 font-bold shrink-0">Đáp án đúng ✓</span>}
                        {isChosen && !isRight && <span className="text-xs text-rose-400 font-bold shrink-0">Bạn chọn ✗</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.06] text-xs sm:text-sm space-y-1.5">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>Giải thích chi tiết:</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    {langMode === 'en' ? q.explanation : q.explanationVi || q.explanation}
                  </p>
                  {langMode === 'bilingual' && q.explanation && q.explanationVi && (
                    <p className="text-xs text-slate-400 italic pt-1 border-t border-white/[0.04]">
                      EN: {q.explanation}
                    </p>
                  )}
                  {q.referenceLecture && (
                    <div className="text-xs text-slate-400 pt-1 font-mono">
                      Tham khảo: {q.referenceSection} &bull; {q.referenceLecture}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Active Test Question Screen
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Official Pearson VUE Test Top Control Bar */}
      <div className="machined-card rounded-2xl p-4 shadow-xl flex items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="text-xs font-semibold text-slate-400 hover:text-white px-2.5 py-1.5 rounded-xl border border-white/[0.08] bg-slate-800/80 hover:bg-slate-700 transition"
          >
            &larr; Thoát
          </button>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-white line-clamp-1 flex items-center gap-1.5">
              <span>{currentExam.title}</span>
            </h2>
            <span className="text-[11px] font-mono text-slate-400">
              Câu {currentQuestionIndex + 1} / {currentExam.questions.length} • {currentQ?.domain}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          {/* Zoom text control */}
          <button
            onClick={() => setTextSize(textSize === 'normal' ? 'large' : 'normal')}
            className="hidden sm:flex items-center justify-center h-8 w-8 rounded-xl border border-white/[0.08] bg-slate-800/80 text-slate-300 hover:text-white"
            title="Đổi kích thước chữ"
          >
            {textSize === 'normal' ? <ZoomIn className="h-3.5 w-3.5" /> : <ZoomOut className="h-3.5 w-3.5" />}
          </button>

          {/* Pearson VUE Countdown Timer */}
          <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border font-mono text-xs font-bold tabular-nums ${
            isTimeCritical 
              ? 'border-rose-500 bg-rose-500/20 text-rose-300 animate-timer-urgent' 
              : isTimeWarning 
                ? 'border-amber-500/50 bg-amber-500/10 text-amber-300' 
                : 'border-white/[0.08] bg-slate-800/90 text-white'
          }`}>
            <Clock className={`w-3.5 h-3.5 ${isTimeCritical ? 'text-rose-400' : 'text-orange-400'}`} />
            <span>{formatTimer(timeRemainingSeconds)}</span>
          </div>

          {/* Review Grid Toggle */}
          <button
            onClick={() => setShowReviewGrid(!showReviewGrid)}
            className="px-3 py-1.5 rounded-xl border border-white/[0.08] bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
          >
            Bảng câu hỏi
          </button>

          {/* Submit Button */}
          <button
            onClick={() => setShowFinishConfirm(true)}
            className="px-4 py-1.5 bg-gradient-to-r from-orange-400 to-amber-500 hover:opacity-95 text-slate-950 font-bold text-xs rounded-xl shadow-md transition"
          >
            Nộp Bài
          </button>
        </div>
      </div>

      {/* Question Review Grid Drawer / Panel */}
      {showReviewGrid && (
        <div className="machined-card rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Bảng Tiến Độ Câu Hỏi ({currentExam.questions.length} câu)
              </h3>
              <p className="text-[11px] text-slate-400">Bấm số câu bất kỳ để nhảy trực tiếp</p>
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Đã làm ({Object.keys(userAnswers).length})
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2.5 h-2.5 rounded bg-amber-400" /> Gắn cờ ({flaggedQuestions.size})
              </span>
              <button
                onClick={() => setShowReviewGrid(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-13 gap-1.5 max-h-64 overflow-y-auto pr-1 no-scrollbar">
            {currentExam.questions.map((q, idx) => {
              const isAnswered = (userAnswers[q.id]?.length || 0) > 0;
              const isFlag = flaggedQuestions.has(q.id);
              const isCurrent = idx === currentQuestionIndex;

              let btnClass = 'bg-slate-800 text-slate-400 border-white/[0.06]';
              if (isAnswered) btnClass = 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold';
              if (isFlag) btnClass = 'bg-amber-950/60 border-amber-500 text-amber-300 font-bold';
              if (isCurrent) btnClass += ' ring-2 ring-orange-400 text-white';

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentQuestionIndex(idx);
                    setShowReviewGrid(false);
                  }}
                  className={`py-2 rounded-xl text-xs font-mono font-bold border transition ${btnClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="machined-card max-w-md w-full rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Xác nhận rời khỏi bài thi?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Bài làm hiện tại sẽ không được lưu nếu bạn thoát bây giờ. Bạn có chắc chắn muốn quay lại danh sách đề thi không?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="rounded-xl border border-white/[0.08] bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  setIsExamActive(false);
                }}
                className="rounded-xl bg-rose-500 px-4 py-2 text-xs font-bold text-white hover:bg-rose-600"
              >
                Xác nhận thoát
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Finish Confirmation Modal */}
      {showFinishConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="machined-card max-w-md w-full rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Xác nhận nộp bài thi?</h3>
            <div className="machined-inner rounded-2xl p-4 text-xs space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Tổng số câu hỏi:</span>
                <span className="font-mono font-bold text-white">{currentExam.questions.length} câu</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Số câu đã trả lời:</span>
                <span className="font-mono font-bold text-emerald-400">{Object.keys(userAnswers).length} câu</span>
              </div>
              {unansweredCount > 0 && (
                <div className="flex justify-between text-rose-400 font-semibold">
                  <span>Số câu chưa trả lời:</span>
                  <span className="font-mono font-bold">{unansweredCount} câu</span>
                </div>
              )}
              {flaggedQuestions.size > 0 && (
                <div className="flex justify-between text-amber-400 font-semibold">
                  <span>Số câu gắn cờ cần xem lại:</span>
                  <span className="font-mono font-bold">{flaggedQuestions.size} câu</span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowFinishConfirm(false)}
                className="rounded-xl border border-white/[0.08] bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Làm tiếp
              </button>
              <button
                onClick={handleFinishExam}
                className="rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 px-5 py-2 text-xs font-bold text-slate-950 shadow-md"
              >
                Nộp bài &amp; Xem kết quả
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Question Canvas */}
      {currentQ && (
        <div className="machined-card rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Question Metadata Header */}
          <div className="flex items-center justify-between gap-2 text-xs border-b border-white/[0.06] pb-4">
            <div className="flex items-center space-x-2.5">
              <span className="px-3 py-1 rounded-full font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                Câu {currentQuestionIndex + 1} / {currentExam.questions.length}
              </span>
              <span className="text-slate-400 text-xs hidden sm:inline">{currentQ.domain}</span>
            </div>

            <button
              onClick={() => toggleFlagQuestion(currentQ.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                isFlagged 
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-sm' 
                  : 'bg-slate-800 text-slate-400 border-white/[0.08] hover:text-white'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-current' : ''}`} />
              <span>{isFlagged ? 'Đã Gắn Cờ' : 'Gắn Cờ Xem Lại'}</span>
            </button>
          </div>

          {/* Question Text */}
          <div>
            <h3 className={`font-bold text-white leading-relaxed ${
              textSize === 'large' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
            }`}>
              {currentQ.question}
            </h3>
            
            {currentQ.isMultipleResponse && (
              <span className="inline-block mt-3 text-xs font-bold px-3 py-1 rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-800">
                (Chọn {currentQ.correctAnswers.length} đáp án đúng)
              </span>
            )}
          </div>

          {/* Options with Strikethrough Elimination Option */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedForCurrent.includes(optIdx);
              const isEliminated = eliminatedForCurrent.has(optIdx);
              const isMulti = currentQ.isMultipleResponse ?? false;

              let optClass = 'bg-slate-900/60 border-white/[0.06] text-slate-200 hover:bg-slate-800/80 hover:border-white/[0.12]';
              if (isSelected) {
                optClass = 'bg-orange-500/15 border-orange-500 text-white font-medium ring-1 ring-orange-500/50 shadow-sm';
              }
              if (isEliminated) {
                optClass = 'opacity-40 line-through bg-slate-950 border-slate-800 text-slate-500';
              }

              // In practice mode, show correct/wrong highlight
              if (examMode === 'practice' && selectedForCurrent.length > 0) {
                const isRight = currentQ.correctAnswers.includes(optIdx);
                if (isRight) {
                  optClass = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold ring-1 ring-emerald-500/40';
                } else if (isSelected && !isRight) {
                  optClass = 'bg-rose-950/40 border-rose-500 text-rose-200';
                }
              }

              return (
                <div
                  key={optIdx}
                  onClick={() => handleSelectOption(currentQ.id, optIdx, isMulti)}
                  className={`w-full group p-4 rounded-2xl border flex items-start gap-3.5 transition cursor-pointer select-none ${optClass}`}
                >
                  {/* Keyboard Key Badge [A] */}
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs mt-0.5 border transition ${
                    isSelected 
                      ? 'bg-orange-500 text-slate-950 border-orange-400' 
                      : 'bg-slate-800 text-slate-400 border-white/[0.06] group-hover:text-white'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </div>

                  {/* Option Text */}
                  <span className={`flex-1 leading-snug ${textSize === 'large' ? 'text-base' : 'text-sm'}`}>
                    {opt}
                  </span>

                  {/* Strike-through toggle button (Pearson VUE elimination tactic) */}
                  <button
                    onClick={(e) => toggleEliminateOption(currentQ.id, optIdx, e)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition opacity-0 group-hover:opacity-100"
                    title={isEliminated ? 'Bỏ gạch loại trừ' : 'Gạch loại trừ đáp án này'}
                  >
                    <Strikethrough className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Instant Drill Explanation (Only in practice mode) */}
          {examMode === 'practice' && selectedForCurrent.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-xs sm:text-sm space-y-1.5 mt-4">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>Giải thích ngay (Chế độ Luyện Tập):</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                {langMode === 'en' ? currentQ.explanation : currentQ.explanationVi || currentQ.explanation}
              </p>
              {langMode === 'bilingual' && currentQ.explanation && currentQ.explanationVi && (
                <p className="text-xs text-slate-400 italic pt-1 border-t border-white/[0.04]">
                  EN: {currentQ.explanation}
                </p>
              )}
            </div>
          )}

          {/* Question Navigation Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 border transition ${
                currentQuestionIndex === 0
                  ? 'opacity-30 cursor-not-allowed bg-slate-900 text-slate-500 border-slate-800'
                  : 'machined-inner text-slate-200 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Câu Trước</span>
            </button>

            <span className="text-xs text-slate-400 font-mono">
              {currentQuestionIndex + 1} / {currentExam.questions.length}
            </span>

            {currentQuestionIndex < currentExam.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex((prev) => Math.min(currentExam.questions.length - 1, prev + 1))}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-400 to-amber-500 text-slate-950 flex items-center space-x-2 shadow-sm transition hover:opacity-95"
              >
                <span>Câu Tiếp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setShowFinishConfirm(true)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center space-x-2 transition shadow-md"
              >
                <span>Nộp Bài Thi</span>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
