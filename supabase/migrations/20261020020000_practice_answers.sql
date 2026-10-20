-- Append-only log of answers checked in practice mode, so progress counts even when the round is never submitted.
create table public.practice_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  client_id text not null,
  question_key text not null,
  exam_id text not null,
  selected jsonb not null default '[]'::jsonb,
  correct boolean not null,
  seconds integer not null default 0 check (seconds >= 0),
  answered_at timestamptz not null default now(),
  unique (user_id, client_id)
);
create index practice_answers_user_time_idx on public.practice_answers (user_id, answered_at desc);
create index practice_answers_user_question_idx on public.practice_answers (user_id, question_key);

alter table public.practice_answers enable row level security;
create policy "own rows select" on public.practice_answers for select to authenticated using ((select auth.uid()) = user_id);
create policy "own rows insert" on public.practice_answers for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "own rows delete" on public.practice_answers for delete to authenticated using ((select auth.uid()) = user_id);

revoke all on public.practice_answers from anon;
grant select, insert, delete on public.practice_answers to authenticated;
