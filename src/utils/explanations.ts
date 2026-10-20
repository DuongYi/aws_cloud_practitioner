import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export interface ExplanationOption {
  label: string;
  text_vi: string;
  is_correct: boolean;
  analysis_vi: string;
}

export interface Explanation {
  question_id: string;
  question_vi: string;
  domain: string | null;
  topic: string | null;
  explanation_vi: string;
  options: ExplanationOption[];
  tips: string[];
  keywords: { term: string; points_to: string }[];
  related_services: string[];
  answer_note: string | null;
}

const STORE_KEY = 'aws_ccp_explanations_v1';
const STORE_LIMIT = 300; // most recent entries kept on the device (keeps localStorage small)

const cache = new Map<string, Explanation | null>();
const failedIds = new Set<string>();

// Explanations already seen are kept on the device: instant next time, and readable when the network drops.
try {
  const saved = JSON.parse(localStorage.getItem(STORE_KEY) || '[]') as Explanation[];
  saved.forEach((e) => cache.set(e.question_id, e));
} catch { /* storage unavailable or corrupt: start empty */ }

let persistTimer: ReturnType<typeof setTimeout> | undefined;
const persist = () => {
  clearTimeout(persistTimer);
  persistTimer = setTimeout(() => {
    try {
      const entries = [...cache.values()].filter((e): e is Explanation => !!e).slice(-STORE_LIMIT);
      localStorage.setItem(STORE_KEY, JSON.stringify(entries));
    } catch { /* quota exceeded: skip */ }
  }, 800);
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const inflight = new Map<string, Promise<void>>();

/** Fetches missing explanations in chunks and stores them (null = confirmed absent). */
const load = (ids: string[]): Promise<void> => {
  const missing = ids.filter((id) => !cache.has(id));
  if (!supabase || missing.length === 0) return Promise.resolve();
  const key = missing.join('|');
  const existing = inflight.get(key);
  if (existing) return existing;

  const p = (async () => {
    for (let i = 0; i < missing.length; i += 60) {
      const chunk = missing.slice(i, i + 60);
      // A flaky connection is common on phones: try up to 3 times before reporting a failure.
      let data: unknown[] | null = null;
      let error: { message: string } | null = null;
      for (let attempt = 1; attempt <= 3; attempt++) {
        const r = await supabase!
          .from('question_explanations')
          .select('question_id, question_vi, domain, topic, explanation_vi, options, tips, keywords, related_services, answer_note')
          .in('question_id', chunk)
          .then((res) => res, (e) => ({ data: null, error: { message: String(e) } }));
        data = r.data as unknown[] | null;
        error = r.error;
        if (!error) break;
        await sleep(600 * attempt);
      }
      if (error) {
        console.warn('[explanations]', error.message);
        chunk.forEach((id) => failedIds.add(id)); // left uncached so retry() can try again
        continue;
      }
      const found = new Map(((data ?? []) as Explanation[]).map((r) => [r.question_id, r]));
      chunk.forEach((id) => { failedIds.delete(id); cache.set(id, found.get(id) ?? null); });
      persist();
    }
  })().finally(() => inflight.delete(key));
  inflight.set(key, p);
  return p;
};

/** Detailed explanations for the given question ids, loaded from Supabase on demand. */
export const useExplanations = (ids: (string | number)[], enabled = true) => {
  const [, bump] = useState(0);
  const stringIds = ids.map(String);
  const sig = stringIds.join('|');

  useEffect(() => {
    if (!enabled || !supabase) return;
    let alive = true;
    load(stringIds).then(() => alive && bump((n) => n + 1));
    return () => { alive = false; };
  }, [sig, enabled]);

  const get = (id: string | number) => cache.get(String(id)) ?? null;
  const isFailed = (id: string | number) => failedIds.has(String(id)) && !cache.has(String(id));
  const loading = enabled && !!supabase && stringIds.some((id) => !cache.has(id) && !failedIds.has(id));
  const retry = () => {
    stringIds.forEach((id) => failedIds.delete(id));
    load(stringIds).then(() => bump((n) => n + 1));
    bump((n) => n + 1);
  };
  return { get, loading, isFailed, retry, configured: !!supabase };
};
