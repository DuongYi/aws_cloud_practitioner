-- Per-question timing for each attempt (seconds by question id) and the exam's time limit,
-- so pacing statistics can be rebuilt from the cloud copy.
alter table public.exam_attempts
  add column question_times jsonb not null default '{}'::jsonb,
  add column time_limit_seconds integer check (time_limit_seconds is null or time_limit_seconds > 0);
