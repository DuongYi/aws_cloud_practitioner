import { ExamSet, ExamQuestion } from '../types';
import rawQuestions from './practice283.json';

export const PRACTICE_283_EXAM: ExamSet = {
  id: 'practice_283',
  title: 'Practice 283: Bộ Đề Chuẩn 283 Câu Hỏi PDF Thực Chiến (Có Giải Thích)',
  titleVi: 'Practice 283: Đề Luyện Tập 283 Câu Chuẩn PDF (Kèm Giải Thích)',
  description: 'Complete 283-question exam dump extracted directly from exam_pdf/pdf_exam.pdf with verified correct answers, domain classification, and bilingual explanations.',
  descriptionVi: 'Bộ đề thi 283 câu hỏi thực chiến trích xuất đầy đủ từ file PDF pdf_exam trong thư mục exam_pdf. Có đáp án chuẩn xác 100%, phân loại đầy đủ 4 Domain và giải thích chi tiết, hỗ trợ chế độ tập luyện (Practice Mode) kiểm tra đáp án tức thì.',
  timeLimitMinutes: 283, // ~1 minute per question for realistic pacing
  passingScore: 700,
  totalScore: 1000,
  questions: rawQuestions as ExamQuestion[],
};
