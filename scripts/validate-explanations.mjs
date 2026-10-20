// Usage: node scripts/validate-explanations.mjs <dir-with-exam-N.json> [inputDir]
// Checks every explanation file against the questions it was written for.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const [outDir, inDir] = process.argv.slice(2);
const DOMAINS = ['Domain 1: Cloud Concepts', 'Domain 2: Security and Compliance', 'Domain 3: Cloud Technology and Services', 'Domain 4: Billing, Pricing and Support'];
let bad = 0, total = 0, notes = 0;
for (const f of readdirSync(outDir).filter((x) => /^(exam-\d+|old-[\w-]+)\.json$/.test(x))) {
  const out = JSON.parse(readFileSync(join(outDir, f), 'utf8'));
  const input = inDir ? JSON.parse(readFileSync(join(inDir, f), 'utf8')) : null;
  const err = (id, m) => { bad++; console.log(`${f} ${id}: ${m}`); };
  if (input && input.length !== out.length) err('-', `count ${out.length} != ${input.length}`);
  // Padding detector: the same sentence reused across many options means filler, not analysis.
  const seen = new Map();
  out.forEach((q) => q.options?.forEach((o) => (o.analysis_vi || '').split(/(?<=[.!?])\s+/).forEach((sent) => {
    const k = sent.trim();
    if (k.length > 25) seen.set(k, (seen.get(k) || 0) + 1);
  })));
  for (const [sent, n] of seen) if (n >= 3) err('-', `sentence repeated ${n}x (filler?): "${sent.slice(0, 70)}"`);
  out.forEach((q, i) => {
    total++;
    const src = input?.[i];
    if (src && src.id !== q.id) err(q.id, `id mismatch, expected ${src.id}`);
    for (const k of ['question_vi', 'explanation_vi', 'topic']) if (!q[k] || typeof q[k] !== 'string' || q[k].length < 3) err(q.id, `missing ${k}`);
    if (!DOMAINS.includes(q.domain)) err(q.id, `bad domain ${q.domain}`);
    if (!Array.isArray(q.options) || q.options.length < 2) return err(q.id, 'options');
    if (src) {
      if (q.options.length !== src.options.length) err(q.id, 'option count');
      const correct = q.options.filter((o) => o.is_correct).map((o) => o.label).join(',');
      if (correct !== src.correct.join(',')) err(q.id, `correct ${correct} != ${src.correct.join(',')}`);
    }
    q.options.forEach((o, j) => {
      if (o.label !== String.fromCharCode(65 + j)) err(q.id, `label ${o.label}`);
      if (!o.analysis_vi || o.analysis_vi.length < 8) err(q.id, `short analysis ${o.label}`);
    });
    if (/[—–]/.test(JSON.stringify(q))) err(q.id, 'contains em/en dash');
    if (q.answer_note) notes++;
  });
}
console.log(`checked ${total} questions, ${bad} problems, ${notes} answer notes`);
process.exit(bad ? 1 : 0);
