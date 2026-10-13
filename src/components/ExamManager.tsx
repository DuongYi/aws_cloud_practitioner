import React, { useState, useRef } from 'react';
import { ExamSet } from '../types';
import { parseRawExamInput } from '../utils/examParser';
import { saveCustomExam, deleteCustomExam } from '../utils/storage';
import { 
  PlusCircle, 
  Upload, 
  Trash2, 
  Download, 
  FileText, 
  Check, 
  AlertCircle, 
  Play, 
  Sparkles,
  HelpCircle,
  Copy,
  Layers,
  FileCode,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface ExamManagerProps {
  customExams: ExamSet[];
  onExamsUpdated: () => void;
  onSelectExamToTake: (examId: string) => void;
}

const SAMPLE_TEXT_TEMPLATE = `Câu 1: Dịch vụ nào cho phép lưu trữ và tự động xoay vòng (rotate) mật khẩu cơ sở dữ liệu trên Amazon RDS?
A. AWS Systems Manager Parameter Store
B. AWS Key Management Service (AWS KMS)
C. AWS Secrets Manager
D. AWS Shield
Đáp án: C
Giải thích: AWS Secrets Manager quản lý và tự động xoay vòng mật khẩu CSDL tích hợp với RDS.

Câu 2: Dịch vụ nào sau đây là tường lửa ở tầng 7 (HTTP/HTTPS) bảo vệ ứng dụng web khỏi SQL Injection và XSS?
A. AWS Shield Standard
B. AWS WAF
C. Amazon Inspector
D. AWS Network Firewall
Đáp án: B
Giải thích: AWS WAF lọc lưu lượng web ở tầng ứng dụng (Layer 7) chống SQLi, XSS.

Câu 3: Trong các chiến lược Phục hồi Thảm họa (Disaster Recovery), phương án nào có CHI PHÍ THẤP NHẤT?
A. Multi-Site Active-Active
B. Warm Standby
C. Pilot Light
D. Backup and Restore
Đáp án: D
Giải thích: Backup and Restore là chiến lược rẻ nhất vì chỉ lưu dữ liệu sao lưu cho đến khi có thảm họa.`;

const SAMPLE_JSON_TEMPLATE = `[
  {
    "question": "Dịch vụ nào của AWS cung cấp tính năng phân tích cú pháp và xử lý ngôn ngữ tự nhiên (NLP)?",
    "options": [
      "Amazon Transcribe",
      "Amazon Comprehend",
      "Amazon Rekognition",
      "Amazon Lex"
    ],
    "correctAnswers": [1],
    "domain": "Domain 3: Cloud Technology and Services",
    "explanation": "Amazon Comprehend là dịch vụ Natural Language Processing (NLP) phân tích cảm xúc và thực thể."
  }
]`;

export const ExamManager: React.FC<ExamManagerProps> = ({
  customExams,
  onExamsUpdated,
  onSelectExamToTake
}) => {
  const [examTitle, setExamTitle] = useState('');
  const [timeLimit, setTimeLimit] = useState(90);
  const [rawInput, setRawInput] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'json'>('text');
  const [parseError, setParseError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [previewExam, setPreviewExam] = useState<ExamSet | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTestParse = () => {
    setParseError(null);
    setSuccessMessage(null);

    if (!rawInput.trim()) {
      setParseError('Vui lòng dán nội dung bộ đề thi vào ô bên dưới.');
      return;
    }

    try {
      const parsed = parseRawExamInput(rawInput, examTitle || 'Bộ đề thi mới', timeLimit);
      setPreviewExam(parsed);
    } catch (err: any) {
      setParseError(err.message || 'Lỗi phân tích cú pháp câu hỏi.');
      setPreviewExam(null);
    }
  };

  const handleSaveExam = () => {
    if (!previewExam) {
      handleTestParse();
      return;
    }

    try {
      saveCustomExam(previewExam);
      setSuccessMessage(`Đã lưu thành công bộ đề "${previewExam.title}" với ${previewExam.questions.length} câu hỏi!`);
      setRawInput('');
      setExamTitle('');
      setPreviewExam(null);
      onExamsUpdated();
    } catch (e: any) {
      setParseError('Lỗi khi lưu bộ đề: ' + e.message);
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa bộ đề "${title}"?`)) {
      deleteCustomExam(id);
      onExamsUpdated();
    }
  };

  const handleExportJSON = (exam: ExamSet) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exam, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `${exam.id}.json`);
    dlAnchor.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setRawInput(content);
        if (!examTitle) {
          setExamTitle(file.name.replace(/\.[^/.]+$/, ''));
        }
        setParseError(null);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      
      {/* ================= HERO HEADER ================= */}
      <div className="machined-card rounded-3xl p-6 sm:p-8 lg:p-9 relative overflow-hidden">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 mb-3">
              <PlusCircle className="h-3.5 w-3.5 text-cyan-400" />
              <span>STUDIO NHẬP VÀ QUẢN LÝ ĐỀ THI TÙY BIẾN</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Nhập &amp; Quản Lý Bộ Đề Mở Rộng
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Dễ dàng nạp bất kỳ bộ đề thi thử nào từ bên ngoài (hỗ trợ văn bản tự do A, B, C, D hoặc JSON). 
              Bộ giải mã thông minh sẽ tự động chuẩn hóa thành bài thi Pearson VUE tương tác đầy đủ.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept=".txt,.json" 
              className="hidden" 
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-slate-800/90 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700/80 transition"
            >
              <Upload className="h-4 w-4 text-cyan-400" />
              <span>Tải file TXT / JSON</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= IMPORT FORM STUDIO ================= */}
      <div className="machined-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>Biểu Mẫu Nạp Đề Thi Mới</span>
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setRawInput(inputMode === 'text' ? SAMPLE_TEXT_TEMPLATE : SAMPLE_JSON_TEMPLATE);
                setExamTitle('Đề thực hành mẫu CLF-C02');
              }}
              className="flex items-center gap-1.5 rounded-xl border border-orange-500/30 bg-orange-500/10 px-3.5 py-1.5 text-xs font-semibold text-orange-300 hover:bg-orange-500/20 transition"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Điền mẫu ví dụ nhanh</span>
            </button>
          </div>
        </div>

        {/* Title and Time Limit */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Tên Bộ Đề Thi:</label>
            <input
              type="text"
              placeholder="Ví dụ: Đề thi thử số 3 (Bộ đề 65 câu trắc nghiệm CLF-C02)"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              className="h-10 w-full rounded-xl border border-white/[0.08] bg-slate-950/70 px-3.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-orange-500/80 focus:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Thời gian làm bài (phút):</label>
            <input
              type="number"
              min={5}
              max={180}
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value) || 90)}
              className="h-10 w-full rounded-xl border border-white/[0.08] bg-slate-950/70 px-3.5 text-xs sm:text-sm text-white focus:border-orange-500/80 focus:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
            />
          </div>
        </div>

        {/* Text Area for Questions */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold">Nội dung câu hỏi (Dán văn bản trắc nghiệm A, B, C, D hoặc mảng JSON):</span>
            <span className="text-[11px] text-orange-400 font-mono">Tự động nhận diện cú pháp</span>
          </div>

          <textarea
            rows={9}
            placeholder={`Dán nội dung các câu hỏi của bạn tại đây...
Ví dụ:
Câu 1: Câu hỏi là gì?
A. Lựa chọn 1
B. Lựa chọn 2
C. Lựa chọn 3
D. Lựa chọn 4
Đáp án: A
Giải thích: Vì sao A đúng...`}
            value={rawInput}
            onChange={(e) => {
              setRawInput(e.target.value);
              setParseError(null);
            }}
            className="w-full rounded-2xl border border-white/[0.08] bg-slate-950/80 p-4 font-mono text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-orange-500/80 focus:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-orange-500/40 leading-relaxed"
          />
        </div>

        {/* Error / Success Messages */}
        {parseError && (
          <div className="rounded-2xl border border-rose-500/40 bg-rose-950/30 p-4 text-xs text-rose-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{parseError}</span>
          </div>
        )}

        {successMessage && (
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-xs text-emerald-300 flex items-start gap-2.5">
            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          <button
            onClick={handleTestParse}
            className="rounded-2xl border border-white/[0.08] bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition"
          >
            Kiểm tra &amp; Xem trước
          </button>
          <button
            onClick={handleSaveExam}
            className="rounded-2xl bg-gradient-to-r from-orange-400 to-amber-500 px-6 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:scale-[1.02] transition-all"
          >
            Lưu Vào Ngân Hàng Đề Thi
          </button>
        </div>

        {/* Preview of Parsed Exam */}
        {previewExam && (
          <div className="machined-inner rounded-2xl p-5 border-orange-500/40 space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-white/[0.06] pb-2">
              <span className="font-bold text-orange-400 flex items-center gap-1.5">
                <Check className="h-4 w-4" />
                ĐÃ PHÂN TÍCH THÀNH CÔNG: {previewExam.questions.length} câu hỏi
              </span>
              <span className="font-mono text-slate-400">Thời lượng: {previewExam.timeLimitMinutes} phút</span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto text-xs pr-1 no-scrollbar">
              {previewExam.questions.slice(0, 5).map((q, idx) => (
                <div key={idx} className="rounded-xl border border-white/[0.06] bg-slate-900/90 p-3">
                  <div className="font-semibold text-white">
                    Câu {idx + 1}: {q.question}
                  </div>
                  <div className="text-slate-400 mt-1">
                    {q.options.length} lựa chọn &bull; Đáp án đúng: {q.correctAnswers.map((a) => String.fromCharCode(65 + a)).join(', ')}
                  </div>
                </div>
              ))}
              {previewExam.questions.length > 5 && (
                <div className="text-center text-slate-500 py-1 font-mono">
                  ... và {previewExam.questions.length - 5} câu hỏi khác được nạp
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ================= CUSTOM EXAMS REPOSITORY ================= */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 px-1 flex items-center gap-2">
          <Layers className="h-4 w-4 text-orange-400" />
          <span>Danh Sách Bộ Đề Tùy Biến Của Bạn ({customExams.length} bộ đề)</span>
        </h3>

        {customExams.length === 0 ? (
          <div className="machined-inner rounded-3xl py-14 text-center text-slate-400 p-6">
            <FileText className="w-10 h-10 mx-auto mb-2 text-slate-500 opacity-50" />
            <h4 className="text-sm font-bold text-white">Bạn chưa thêm bộ đề tùy biến nào</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Khi bạn sưu tầm được các bộ đề thi thử mới, hãy dán vào biểu mẫu ở trên để làm bài thi trực tiếp!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customExams.map((exam) => (
              <div
                key={exam.id}
                className="machined-card rounded-3xl p-5 sm:p-6 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="rounded-md border border-cyan-500/30 bg-cyan-950/50 px-2 py-0.5 font-bold text-cyan-400">
                      Tùy chỉnh
                    </span>
                    <span className="font-mono text-slate-400 text-xs">
                      {exam.questions.length} câu • {exam.timeLimitMinutes} phút
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white line-clamp-1">
                    {exam.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {exam.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleExportJSON(exam)}
                      className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                      title="Xuất file JSON"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(exam.id, exam.title)}
                      className="p-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition"
                      title="Xóa bộ đề"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => onSelectExamToTake(exam.id)}
                    className="rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 px-4 py-2 text-xs font-bold text-slate-950 flex items-center space-x-1.5 shadow-sm transition hover:scale-[1.02]"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Làm Bài Thi</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
