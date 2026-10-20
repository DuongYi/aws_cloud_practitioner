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

const cache = new Map<string, Explanation | null>();
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
      const { data, error } = await supabase!
        .from('question_explanations')
        .select('question_id, question_vi, domain, topic, explanation_vi, options, tips, keywords, related_services, answer_note')
        .in('question_id', chunk);
      if (error) {
        console.warn('[explanations]', error.message);
        continue; // leave uncached so a later call can retry
      }
      const found = new Map((data ?? []).map((r) => [r.question_id as string, r as Explanation]));
      chunk.forEach((id) => cache.set(id, found.get(id) ?? null));
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
  const loading = enabled && !!supabase && stringIds.some((id) => !cache.has(id));
  return { get, loading };
};
