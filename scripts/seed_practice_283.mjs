// Usage: node scripts/seed_practice_283.mjs
// Uploads src/data/practice283_explanations.json to Supabase (table question_explanations).
// Needs SUPABASE_URL and SUPABASE_SECRET_KEY in .env.local.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const envFile = join(root, '.env.local');

if (!existsSync(envFile)) {
  console.error('Lỗi: Chưa tìm thấy file .env.local!');
  console.error('Vui lòng tạo file .env.local với nội dung:');
  console.error('SUPABASE_URL="https://your-project.supabase.co"');
  console.error('SUPABASE_SECRET_KEY="your-service-role-secret-key"');
  process.exit(1);
}

const env = Object.fromEntries(
  readFileSync(envFile, 'utf8')
    .split('\n')
    .filter((l) => l.includes('=') && !l.trim().startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, '')];
    })
);

const url = env.SUPABASE_URL;
const key = env.SUPABASE_SECRET_KEY;
if (!url || !key) {
  console.error('Thiếu SUPABASE_URL hoặc SUPABASE_SECRET_KEY trong .env.local');
  process.exit(1);
}

const explanations = JSON.parse(readFileSync(join(root, 'src', 'data', 'practice283_explanations.json'), 'utf8'));

console.log(`Đang chuẩn bị đẩy ${explanations.length} câu hỏi của Practice 283 lên Supabase...`);

const rows = explanations.map((q) => ({
  question_id: q.question_id,
  exam_id: 'practice_283',
  question_vi: q.question_vi,
  domain: q.domain ?? null,
  topic: q.topic ?? null,
  explanation_vi: q.explanation_vi,
  options: q.options,
  tips: q.tips ?? [],
  keywords: q.keywords ?? [],
  related_services: q.related_services ?? [],
  answer_note: q.answer_note ?? null,
  updated_at: new Date().toISOString(),
}));

let uploaded = 0;
for (let i = 0; i < rows.length; i += 50) {
  const batch = rows.slice(i, i + 50);
  let ok = false;
  for (let attempt = 1; attempt <= 4 && !ok; attempt++) {
    try {
      const res = await fetch(`${url}/rest/v1/question_explanations?on_conflict=question_id`, {
        method: 'POST',
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates,return=minimal',
        },
        body: JSON.stringify(batch),
      });
      if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
      ok = true;
      uploaded += batch.length;
      console.log(`Đã đẩy: ${uploaded}/${rows.length} câu...`);
    } catch (e) {
      if (attempt === 4) {
        console.error('Lỗi khi đẩy batch:', e.message);
        throw e;
      }
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
}

console.log(`🎉 Thành công! Đã đẩy trọn vẹn ${uploaded} câu hỏi Practice 283 lên bảng question_explanations trên Supabase.`);
