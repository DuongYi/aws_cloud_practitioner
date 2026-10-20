// Usage: node scripts/seed-explanations.mjs
// Uploads data/explanations/exam-*.json to Supabase (table question_explanations).
// Needs SUPABASE_URL and SUPABASE_SECRET_KEY in .env.local. The secret key stays on this machine; never put it in a VITE_ variable.
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const env = Object.fromEntries(
  readFileSync(join(root, '.env.local'), 'utf8')
    .split('\n')
    .filter((l) => l.includes('=') && !l.trim().startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, '')];
    })
);
const url = env.SUPABASE_URL;
const key = env.SUPABASE_SECRET_KEY;
if (!url || !key) throw new Error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY in .env.local');

const dir = join(root, 'data', 'explanations');
const files = readdirSync(dir).filter((f) => /^(exam-\d+|old-[\w-]+)\.json$/.test(f)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

let total = 0;
for (const f of files) {
  const examId = f.startsWith('old-') ? f.slice(4, -5) : `dump-exam-${f.match(/\d+/)[0]}`;
  const rows = JSON.parse(readFileSync(join(dir, f), 'utf8')).map((q) => ({
    question_id: q.id,
    exam_id: examId,
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
  for (let i = 0; i < rows.length; i += 50) {
    const batch = rows.slice(i, i + 50);
    let ok = false;
    for (let attempt = 1; attempt <= 4 && !ok; attempt++) {
      try {
        const res = await fetch(`${url}/rest/v1/question_explanations?on_conflict=question_id`, {
          method: 'POST',
          headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=minimal' },
          body: JSON.stringify(batch),
        });
        if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
        ok = true;
      } catch (e) {
        if (attempt === 4) throw e;
        await new Promise((r) => setTimeout(r, 1500 * attempt));
      }
    }
  }
  total += rows.length;
  console.log(`${f}: ${rows.length} rows`);
}
console.log(`Done. ${total} explanations uploaded.`);
