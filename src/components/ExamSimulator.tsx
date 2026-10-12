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
  ChevronRight
} from 'lucide-react';
import { saveExamAttempt } from '../utils/storage';

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
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(90 * 60);
  const [isExamCompleted, setIsExamCompleted] = useState<boolean>(false);
  const [showReviewGrid, setShowReviewGrid] = useState<boolean>(false);
  const [filterResultView, setFilterResultView] = useState<'ALL' | 'WRONG' | 'FLAGGED'>('ALL');

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
    setTimeRemainingSeconds(currentExam.timeLimitMinutes * 60);
    setShowReviewGrid(false);
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

  const handleFinishExam = () => {
    if (!currentExam) return;

    setIsExamCompleted(true);
    setShowReviewGrid(false);

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
    const scaledScore = Math.round((correctCount / (totalQuestions || 1)) * 900 + 100); // 100 - 1000 scale
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 uppercase tracking-wider">
              Exam Simulator CLF-C02
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-3">
              Mô Phỏng Kỳ Thi AWS Cloud Practitioner
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Luyện tập với cấu trúc đề chuẩn 65 câu hỏi, giới hạn 90 phút, thang điểm 100 - 1000, điểm chuẩn đạt từ 700/1000.
              Hỗ trợ cả chế độ phòng thi nghiêm ngặt và chế độ luyện tập xem đáp án giải thích tức thì.
            </p>
          </div>
        </div>

        {/* Exam Selection List */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider px-1">
            Chọn Bộ Đề Thi Để Bắt Đầu ({exams.length} bộ đề sẵn có)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exams.map((ex) => (
              <div
                key={ex.id}
                onClick={() => setSelectedExamId(ex.id)}
                className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                  selectedExamId === ex.id
                    ? 'bg-slate-800 border-orange-500 shadow-xl ring-2 ring-orange-500/30'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {ex.questions.length} câu hỏi
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{ex.timeLimitMinutes} phút</span>
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white tracking-tight">
                    {ex.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {ex.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-semibold">Điểm đạt: {ex.passingScore}/1000</span>
                  <span className="text-orange-400 font-bold flex items-center gap-1">
                    {selectedExamId === ex.id ? 'Đang chọn' : 'Bấm để chọn'} &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mode Configuration Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
          <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
            Cấu Hình Chế Độ Làm Bài
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setExamMode('strict')}
              className={`p-4 rounded-xl border text-left transition ${
                examMode === 'strict'
                  ? 'bg-orange-500/10 border-orange-500 text-white'
                  : 'bg-slate-850 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-white">Chế Độ Thi Thật (Strict Exam)</span>
                {examMode === 'strict' && <Check className="w-4 h-4 text-orange-400" />}
              </div>
              <p className="text-xs text-slate-400">
                Có đồng hồ đếm ngược. Ẩn toàn bộ đáp án và giải thích cho đến khi nộp bài để đánh giá đúng năng lực.
              </p>
            </button>

            <button
              onClick={() => setExamMode('practice')}
              className={`p-4 rounded-xl border text-left transition ${
                examMode === 'practice'
                  ? 'bg-orange-500/10 border-orange-500 text-white'
                  : 'bg-slate-850 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-white">Chế Độ Ôn Luyện (Practice Mode)</span>
                {examMode === 'practice' && <Check className="w-4 h-4 text-orange-400" />}
              </div>
              <p className="text-xs text-slate-400">
                Làm đến đâu xem ngay đáp án đúng và giải thích chi tiết đến đó để ghi nhớ kiến thức nhanh nhất.
              </p>
            </button>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={handleStartExam}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold text-base rounded-xl shadow-lg shadow-orange-500/25 flex items-center space-x-2 transition transform active:scale-95"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>BẮT ĐẦU LÀM BÀI NGAY</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Exam View
  const currentQ = currentExam?.questions[currentQuestionIndex];
  const selectedForCurrent = (currentQ && userAnswers[currentQ.id]) || [];
  const isFlagged = currentQ && flaggedQuestions.has(currentQ.id);

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
    const passed = scaledScore >= currentExam.passingScore;

    const filteredReviewQuestions = currentExam.questions.filter((q) => {
      const userSelected = userAnswers[q.id] || [];
      const correct = q.correctAnswers || [];
      const isCorrect = userSelected.length === correct.length && userSelected.every((ans) => correct.includes(ans));

      if (filterResultView === 'WRONG') return !isCorrect;
      if (filterResultView === 'FLAGGED') return flaggedQuestions.has(q.id);
      return true;
    });

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Score Card Result */}
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl relative overflow-hidden ${
          passed 
            ? 'bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/50' 
            : 'bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-900 border-rose-500/50'
        }`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3 border uppercase tracking-wider"
                style={{
                  backgroundColor: passed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)',
                  borderColor: passed ? 'rgba(16, 185, 129, 0.4)' : 'rgba(244, 63, 94, 0.4)',
                  color: passed ? '#34d399' : '#fb7185'
                }}
              >
                {passed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                <span>{passed ? 'KẾT QUẢ: ĐẠT (PASSED)' : 'KẾT QUẢ: CHƯA ĐẠT (FAILED)'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {scaledScore} <span className="text-lg font-normal text-slate-400">/ 1000 điểm</span>
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Bạn đã trả lời đúng <strong className="text-white">{correctCount}</strong> / {totalQuestions} câu hỏi 
                ({Math.round((correctCount / totalQuestions) * 100)}%). Điểm đạt yêu cầu là {currentExam.passingScore}/1000.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleStartExam}
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-sm rounded-xl transition flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Thi Lại Đề Này</span>
              </button>
              <button
                onClick={() => setIsExamActive(false)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl border border-slate-700 transition"
              >
                Chọn Đề Khác
              </button>
            </div>
          </div>

          {/* Domain Breakdown */}
          <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(domainScores).map(([dom, sc]) => {
              const domPercent = Math.round((sc.correct / (sc.total || 1)) * 100);
              return (
                <div key={dom} className="bg-slate-850/80 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 line-clamp-1 mb-1 font-medium">{dom}</div>
                  <div className="flex items-center justify-between text-sm font-bold text-white mb-1.5">
                    <span>{sc.correct}/{sc.total} câu</span>
                    <span className={domPercent >= 70 ? 'text-emerald-400' : 'text-rose-400'}>{domPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${domPercent >= 70 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                      style={{ width: `${domPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Review Answers Filter Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Xem lại câu hỏi:</span>
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
              <button
                onClick={() => setFilterResultView('ALL')}
                className={`px-3 py-1 rounded-md transition ${filterResultView === 'ALL' ? 'bg-orange-500 text-slate-950 font-bold' : 'text-slate-300'}`}
              >
                Tất cả ({totalQuestions})
              </button>
              <button
                onClick={() => setFilterResultView('WRONG')}
                className={`px-3 py-1 rounded-md transition ${filterResultView === 'WRONG' ? 'bg-rose-500 text-white font-bold' : 'text-slate-300'}`}
              >
                Câu Sai ({totalQuestions - correctCount})
              </button>
              {flaggedQuestions.size > 0 && (
                <button
                  onClick={() => setFilterResultView('FLAGGED')}
                  className={`px-3 py-1 rounded-md transition ${filterResultView === 'FLAGGED' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'}`}
                >
                  Gắn Cờ ({flaggedQuestions.size})
                </button>
              )}
            </div>
          </div>
          <span className="text-xs text-slate-400">Hiển thị {filteredReviewQuestions.length} câu</span>
        </div>

        {/* Detailed Questions Review List */}
        <div className="space-y-4">
          {filteredReviewQuestions.map((q, idx) => {
            const userSelected = userAnswers[q.id] || [];
            const correct = q.correctAnswers || [];
            const isCorrect = userSelected.length === correct.length && userSelected.every((ans) => correct.includes(ans));

            return (
              <div 
                key={q.id} 
                className={`p-5 rounded-2xl border bg-slate-900 shadow-md space-y-3 ${
                  isCorrect ? 'border-slate-800' : 'border-rose-500/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      isCorrect ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {isCorrect ? '✓ Đúng' : '✗ Sai'}
                    </span>
                    <span className="font-mono text-slate-400">Câu hỏi #{q.id}</span>
                  </div>
                  <span className="text-slate-400">{q.domain}</span>
                </div>

                <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                  {q.question}
                </p>

                {/* Options List */}
                <div className="space-y-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isChosen = userSelected.includes(optIdx);
                    const isRight = correct.includes(optIdx);

                    let badgeClass = 'bg-slate-850 border-slate-800 text-slate-300';
                    if (isRight) {
                      badgeClass = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (isChosen && !isRight) {
                      badgeClass = 'bg-rose-950/40 border-rose-500 text-rose-200 line-through';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-3 ${badgeClass}`}
                      >
                        <span className="font-mono font-bold mt-0.5">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span className="flex-1">{opt}</span>
                        {isRight && <span className="text-xs text-emerald-400 font-bold flex-shrink-0">Đáp án đúng</span>}
                        {isChosen && !isRight && <span className="text-xs text-rose-400 font-bold flex-shrink-0">Bạn chọn</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="p-3.5 rounded-xl bg-slate-850 border border-slate-800 text-xs sm:text-sm space-y-1">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>Giải thích chi tiết:</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    {langMode === 'en' ? q.explanation : q.explanationVi || q.explanation}
                  </p>
                  {langMode === 'bilingual' && q.explanation && q.explanationVi && (
                    <p className="text-xs text-slate-400 italic pt-1">
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
      {/* Top Test Control Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              if (confirm('Bạn có chắc chắn muốn thoát bài thi hiện tại không?')) {
                setIsExamActive(false);
              }
            }}
            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 border border-slate-700"
          >
            &larr; Thoát
          </button>
          <div>
            <h3 className="text-sm font-bold text-white line-clamp-1">{currentExam.title}</h3>
            <span className="text-xs text-slate-400">
              Câu {currentQuestionIndex + 1} / {currentExam.questions.length}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Timer */}
          <div className="flex items-center space-x-1.5 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700 text-xs font-mono font-bold text-amber-400">
            <Clock className="w-4 h-4 text-orange-400" />
            <span>{formatTimer(timeRemainingSeconds)}</span>
          </div>

          {/* Review Grid Toggle */}
          <button
            onClick={() => setShowReviewGrid(!showReviewGrid)}
            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition"
          >
            Bảng câu hỏi
          </button>

          {/* Finish Button */}
          <button
            onClick={() => {
              if (confirm('Bạn có chắc chắn muốn nộp bài thi ngay bây giờ?')) {
                handleFinishExam();
              }
            }}
            className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs rounded-lg transition"
          >
            Nộp Bài
          </button>
        </div>
      </div>

      {/* Review Grid Modal / Panel */}
      {showReviewGrid && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Bảng Tiến Độ Câu Hỏi
            </h4>
            <div className="flex items-center space-x-4 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Đã làm ({Object.keys(userAnswers).length})
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2.5 h-2.5 rounded bg-amber-500" /> Gắn cờ ({flaggedQuestions.size})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-13 gap-1.5">
            {currentExam.questions.map((q, idx) => {
              const isAnswered = (userAnswers[q.id]?.length || 0) > 0;
              const isFlag = flaggedQuestions.has(q.id);
              const isCurrent = idx === currentQuestionIndex;

              let btnClass = 'bg-slate-800 text-slate-400 border-slate-700';
              if (isAnswered) btnClass = 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold';
              if (isFlag) btnClass = 'bg-amber-950/60 border-amber-500 text-amber-300 font-bold';
              if (isCurrent) btnClass += ' ring-2 ring-orange-500 text-white';

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentQuestionIndex(idx);
                    setShowReviewGrid(false);
                  }}
                  className={`py-1.5 rounded text-xs border transition ${btnClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Question Card */}
      {currentQ && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          {/* Question Metadata */}
          <div className="flex items-center justify-between gap-2 text-xs border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                Câu {currentQuestionIndex + 1} / {currentExam.questions.length}
              </span>
              <span className="text-slate-400">{currentQ.domain}</span>
            </div>

            <button
              onClick={() => toggleFlagQuestion(currentQ.id)}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                isFlagged 
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/50' 
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-current' : ''}`} />
              <span>{isFlagged ? 'Đã Gắn Cờ' : 'Gắn Cờ Xem Lại'}</span>
            </button>
          </div>

          {/* Question Body */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {currentQ.question}
            </h3>
            {currentQ.isMultipleResponse && (
              <span className="inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800">
                (Chọn {currentQ.correctAnswers.length} đáp án đúng)
              </span>
            )}
          </div>

          {/* Options */}
          <div className="space-y-2.5 pt-2">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedForCurrent.includes(optIdx);
              const isMulti = currentQ.isMultipleResponse ?? false;

              let optClass = 'bg-slate-850/70 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700';
              if (isSelected) {
                optClass = 'bg-orange-500/10 border-orange-500 text-white font-medium ring-1 ring-orange-500/50';
              }

              // In practice mode, show correct/wrong highlight
              if (examMode === 'practice' && selectedForCurrent.length > 0) {
                const isRight = currentQ.correctAnswers.includes(optIdx);
                if (isRight) {
                  optClass = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold';
                } else if (isSelected && !isRight) {
                  optClass = 'bg-rose-950/40 border-rose-500 text-rose-200';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(currentQ.id, optIdx, isMulti)}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm flex items-start gap-3 transition cursor-pointer ${optClass}`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center font-mono font-bold text-xs mt-0.5 border ${
                    isSelected ? 'bg-orange-500 text-slate-950 border-orange-400' : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <span className="flex-1 leading-snug">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Instant Practice Explanation */}
          {examMode === 'practice' && selectedForCurrent.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/80 text-xs sm:text-sm space-y-1.5 mt-4">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>Giải thích (Chế độ Ôn Luyện):</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                {langMode === 'en' ? currentQ.explanation : currentQ.explanationVi || currentQ.explanation}
              </p>
              {langMode === 'bilingual' && currentQ.explanation && currentQ.explanationVi && (
                <p className="text-xs text-slate-400 italic pt-1">
                  EN: {currentQ.explanation}
                </p>
              )}
            </div>
          )}

          {/* Question Navigation Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border transition ${
                currentQuestionIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-500 border-slate-800'
                  : 'bg-slate-800 text-slate-200 hover:text-white border-slate-700'
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
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold flex items-center space-x-1.5 transition"
              >
                <span>Câu Tiếp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  if (confirm('Bạn đã đến câu cuối cùng. Bạn có muốn nộp bài thi ngay?')) {
                    handleFinishExam();
                  }
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-slate-950 flex items-center space-x-1.5 transition"
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
