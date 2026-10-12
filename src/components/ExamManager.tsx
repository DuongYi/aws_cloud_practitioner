import React, { useState } from 'react';
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
  Code, 
  HelpCircle,
  Copy
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
              Bộ Đề Bổ Sung
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-2">
              Thêm &amp; Quản Lý Các Bộ Đề Thi Bổ Sung
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Bạn có thể dán trực tiếp các bộ đề thi thử bạn có vào đây (hỗ trợ cả định dạng văn bản A/B/C/D thông thường và JSON). 
              Hệ thống sẽ tự động phân tích và tạo bài thi tương tác đầy đủ để bạn luyện tập!
            </p>
          </div>
        </div>
      </div>

      {/* Import / Paste New Exam Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-orange-400" />
            <span>Nhập Bộ Đề Thi Mới</span>
          </h3>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setRawInput(inputMode === 'text' ? SAMPLE_TEXT_TEMPLATE : SAMPLE_JSON_TEMPLATE);
                setExamTitle('Bộ đề thực hành mẫu');
              }}
              className="text-xs text-orange-400 hover:text-orange-300 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/30 transition flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Điền mẫu ví dụ</span>
            </button>
          </div>
        </div>

        {/* Title and Time Limit */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Tên Bộ Đề Thi:</label>
            <input
              type="text"
              placeholder="Ví dụ: Đề thi thử số 3 (Bộ đề 65 câu tuyển chọn)"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              className="w-full bg-slate-800 text-sm text-white px-3.5 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Thời gian làm bài (phút):</label>
            <input
              type="number"
              min={5}
              max={180}
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value) || 90)}
              className="w-full bg-slate-800 text-sm text-white px-3.5 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Text Area for Questions */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Dán nội dung câu hỏi (Text trắc nghiệm A, B, C, D hoặc JSON):</span>
            <span className="text-[11px] text-slate-500">Hỗ trợ nhận diện tự động</span>
          </div>

          <textarea
            rows={8}
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
            className="w-full bg-slate-800 text-sm font-mono text-slate-100 p-3.5 rounded-xl border border-slate-700 focus:outline-none focus:border-orange-500 leading-relaxed placeholder-slate-500"
          />
        </div>

        {/* Error / Success Messages */}
        {parseError && (
          <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs text-rose-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <span>{parseError}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-300 flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          <button
            onClick={handleTestParse}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition"
          >
            Kiểm tra &amp; Xem trước
          </button>
          <button
            onClick={handleSaveExam}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-slate-950 text-xs font-bold rounded-xl shadow transition"
          >
            Lưu Bộ Đề Thi
          </button>
        </div>

        {/* Preview of Parsed Exam */}
        {previewExam && (
          <div className="mt-4 p-4 rounded-xl bg-slate-850 border border-orange-500/40 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-orange-400">
                XEM TRƯỚC: Đã nhận diện thành công {previewExam.questions.length} câu hỏi
              </span>
              <span className="text-slate-400 font-mono">Thời gian: {previewExam.timeLimitMinutes} phút</span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto text-xs pr-1">
              {previewExam.questions.slice(0, 5).map((q, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="font-semibold text-white">
                    Câu {idx + 1}: {q.question}
                  </div>
                  <div className="text-slate-400 mt-1">
                    {q.options.length} lựa chọn &bull; Đáp án đúng: {q.correctAnswers.map((a) => String.fromCharCode(65 + a)).join(', ')}
                  </div>
                </div>
              ))}
              {previewExam.questions.length > 5 && (
                <div className="text-center text-slate-400 py-1">
                  ... và {previewExam.questions.length - 5} câu hỏi khác
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* List of Custom Imported Exams */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white uppercase tracking-wider px-1">
          Các Bộ Đề Bạn Đã Thêm ({customExams.length} bộ đề)
        </h3>

        {customExams.length === 0 ? (
          <div className="text-center py-12 bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 p-4">
            <FileText className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-500" />
            <p className="text-sm font-medium">Bạn chưa nhập bộ đề thi bổ sung nào.</p>
            <p className="text-xs text-slate-500 mt-1">
              Khi bạn gửi các bộ đề mới sau này, hãy dán vào biểu mẫu ở trên để làm bài thi trực tiếp!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customExams.map((exam) => (
              <div
                key={exam.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-950/50 text-cyan-400 border border-cyan-800 font-bold">
                      Tùy chỉnh
                    </span>
                    <span className="text-slate-400 font-mono">
                      {exam.questions.length} câu &bull; {exam.timeLimitMinutes} phút
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white line-clamp-1">
                    {exam.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {exam.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleExportJSON(exam)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                      title="Xuất file JSON"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(exam.id, exam.title)}
                      className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition"
                      title="Xóa bộ đề"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => onSelectExamToTake(exam.id)}
                    className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs rounded-lg flex items-center space-x-1.5 transition"
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
