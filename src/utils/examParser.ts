import { ExamQuestion, ExamDomain, ExamSet } from '../types';

export const parseRawExamInput = (rawText: string, title: string, timeLimit = 90): ExamSet => {
  const trimmed = rawText.trim();
  
  // Try 1: JSON format
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        const questions: ExamQuestion[] = parsed.map((item, idx) => ({
          id: item.id || idx + 1,
          question: item.question || item.title || `Câu hỏi ${idx + 1}`,
          options: item.options || item.choices || [],
          correctAnswers: Array.isArray(item.correctAnswers) 
            ? item.correctAnswers 
            : typeof item.answer === 'number' 
              ? [item.answer]
              : typeof item.correct === 'number'
                ? [item.correct]
                : typeof item.answer === 'string'
                  ? [parseLetterToIndex(item.answer)]
                  : [0],
          isMultipleResponse: item.isMultipleResponse || (Array.isArray(item.correctAnswers) && item.correctAnswers.length > 1),
          domain: validateDomain(item.domain),
          explanation: item.explanation || item.explain || '',
          explanationVi: item.explanationVi || item.explainVi || item.explanation || ''
        }));

        return {
          id: `custom-exam-${Date.now()}`,
          title: title || `Bộ đề tùy chỉnh (${questions.length} câu)`,
          description: `Đề thi tùy chỉnh được nhập từ dữ liệu JSON với ${questions.length} câu hỏi.`,
          timeLimitMinutes: timeLimit,
          passingScore: 700,
          totalScore: 1000,
          questions,
          isCustom: true,
          createdAt: new Date().toISOString()
        };
      } else if (parsed.questions && Array.isArray(parsed.questions)) {
        return {
          id: `custom-exam-${Date.now()}`,
          title: parsed.title || title || 'Bộ đề tùy chỉnh',
          description: parsed.description || 'Bộ đề tùy chỉnh do người dùng nhập',
          timeLimitMinutes: parsed.timeLimitMinutes || timeLimit,
          passingScore: parsed.passingScore || 700,
          totalScore: parsed.totalScore || 1000,
          questions: parsed.questions.map((q: any, idx: number) => ({
            id: q.id || idx + 1,
            question: q.question,
            options: q.options || [],
            correctAnswers: Array.isArray(q.correctAnswers) ? q.correctAnswers : [typeof q.answer === 'number' ? q.answer : parseLetterToIndex(q.answer)],
            isMultipleResponse: q.isMultipleResponse || false,
            domain: validateDomain(q.domain),
            explanation: q.explanation || '',
            explanationVi: q.explanationVi || q.explanation || ''
          })),
          isCustom: true,
          createdAt: new Date().toISOString()
        };
      }
    } catch (e) {
      console.warn('JSON parsing failed, falling back to text regex parser', e);
    }
  }

  // Try 2: Plain text parser (Question blocks)
  const blocks = trimmed.split(/(?:^|\n)(?=(?:Câu\s*\d+[\.:]|Question\s*\d+[\.:]|\d+[\.:\)]\s+))/i);
  const questions: ExamQuestion[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i].trim();
    if (!block) continue;

    // Lines analysis
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length < 2) continue;

    let questionText = lines[0].replace(/^(?:Câu\s*\d+[\.:]|Question\s*\d+[\.:]|\d+[\.:\)]\s*)/i, '').trim();
    const options: string[] = [];
    const correctAnswers: number[] = [];
    let explanation = '';

    for (let j = 1; j < lines.length; j++) {
      const line = lines[j];
      const optMatch = line.match(/^([A-Ea-e])[\.\)\:\-]\s*(.*)$/);
      const ansMatch = line.match(/^(?:Đáp án|Answer|Key|Correct)[\s\:\-]+([A-Ea-e\d,\s]+)/i);
      const expMatch = line.match(/^(?:Giải thích|Explanation|Note)[\s\:\-]+(.*)$/i);

      if (ansMatch) {
        const letters = ansMatch[1].split(/[\s,]+/);
        letters.forEach((letStr) => {
          const idx = parseLetterToIndex(letStr);
          if (idx >= 0 && !correctAnswers.includes(idx)) {
            correctAnswers.push(idx);
          }
        });
      } else if (expMatch) {
        explanation = expMatch[1];
        // append subsequent lines to explanation
        for (let k = j + 1; k < lines.length; k++) {
          explanation += ' ' + lines[k];
        }
        break;
      } else if (optMatch) {
        options.push(optMatch[2]);
      } else {
        // Line continuation
        if (options.length === 0) {
          questionText += ' ' + line;
        } else if (options.length > 0) {
          options[options.length - 1] += ' ' + line;
        }
      }
    }

    if (options.length >= 2) {
      questions.push({
        id: questions.length + 1,
        question: questionText,
        options,
        correctAnswers: correctAnswers.length > 0 ? correctAnswers : [0],
        isMultipleResponse: correctAnswers.length > 1,
        domain: 'Domain 3: Cloud Technology and Services',
        explanation: explanation || 'Đáp án chính xác dựa trên tài liệu AWS Certified Cloud Practitioner.',
        explanationVi: explanation || 'Đáp án chính xác dựa trên tài liệu AWS Certified Cloud Practitioner.'
      });
    }
  }

  if (questions.length === 0) {
    throw new Error('Không thể phân tích câu hỏi từ nội dung vừa nhập. Hãy kiểm tra lại định dạng JSON hoặc văn bản trắc nghiệm A, B, C, D.');
  }

  return {
    id: `custom-exam-${Date.now()}`,
    title: title || `Bộ đề tùy chỉnh (${questions.length} câu)`,
    description: `Bộ đề tự tạo từ nội dung đã nhập với ${questions.length} câu hỏi.`,
    timeLimitMinutes: timeLimit,
    passingScore: 700,
    totalScore: 1000,
    questions,
    isCustom: true,
    createdAt: new Date().toISOString()
  };
};

function parseLetterToIndex(char: string | undefined): number {
  if (!char) return 0;
  const upper = char.trim().toUpperCase();
  if (upper === 'A' || upper === '1') return 0;
  if (upper === 'B' || upper === '2') return 1;
  if (upper === 'C' || upper === '3') return 2;
  if (upper === 'D' || upper === '4') return 3;
  if (upper === 'E' || upper === '5') return 4;
  return 0;
}

function validateDomain(dom: any): ExamDomain {
  if (dom && typeof dom === 'string') {
    if (dom.includes('Security') || dom.includes('Compliance') || dom.includes('Domain 2')) return 'Domain 2: Security and Compliance';
    if (dom.includes('Billing') || dom.includes('Pricing') || dom.includes('Domain 4')) return 'Domain 4: Billing, Pricing and Support';
    if (dom.includes('Concepts') || dom.includes('Domain 1')) return 'Domain 1: Cloud Concepts';
  }
  return 'Domain 3: Cloud Technology and Services';
}
