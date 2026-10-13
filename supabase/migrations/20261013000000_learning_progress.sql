-- Learning progress for the CLF-C02 study portal.
-- Every table is owned by one auth user and is only reachable by that user.

create table public.lecture_progress (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  lecture_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, lecture_id)
);

create table public.bookmarked_facts (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  fact_key text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, fact_key)
);

create table public.exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  client_id text not null,
  exam_id text not null,
  exam_title text not null,
  score integer not null check (score between 0 and 1000),
  passed boolean not null,
  total_questions integer not null check (total_questions > 0),
  correct_count integer not null check (correct_count >= 0),
  time_spent_seconds integer not null default 0 check (time_spent_seconds >= 0),
  domain_scores jsonb not null default '{}'::jsonb,
  user_answers jsonb not null default '{}'::jsonb,
  flagged_question_ids jsonb not null default '[]'::jsonb,
  attempted_at timestamptz not null default now(),
  unique (user_id, client_id)
);
create index exam_attempts_user_time_idx on public.exam_attempts (user_id, attempted_at desc);
create index exam_attempts_user_exam_idx on public.exam_attempts (user_id, exam_id);

create table public.custom_exams (
  id text not null,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  exam jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

-- Row level security: owner only, authenticated role only.
alter table public.lecture_progress enable row level security;
alter table public.bookmarked_facts enable row level security;
alter table public.exam_attempts enable row level security;
alter table public.custom_exams enable row level security;

create policy "own rows select" on public.lecture_progress for select to authenticated using ((select auth.uid()) = user_id);
create policy "own rows insert" on public.lecture_progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "own rows delete" on public.lecture_progress for delete to authenticated using ((select auth.uid()) = user_id);

create policy "own rows select" on public.bookmarked_facts for select to authenticated using ((select auth.uid()) = user_id);
create policy "own rows insert" on public.bookmarked_facts for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "own rows delete" on public.bookmarked_facts for delete to authenticated using ((select auth.uid()) = user_id);

create policy "own rows select" on public.exam_attempts for select to authenticated using ((select auth.uid()) = user_id);
create policy "own rows insert" on public.exam_attempts for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "own rows delete" on public.exam_attempts for delete to authenticated using ((select auth.uid()) = user_id);

create policy "own rows select" on public.custom_exams for select to authenticated using ((select auth.uid()) = user_id);
create policy "own rows insert" on public.custom_exams for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "own rows update" on public.custom_exams for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "own rows delete" on public.custom_exams for delete to authenticated using ((select auth.uid()) = user_id);

-- Explicit grants: signed-in users only, never anon.
revoke all on public.lecture_progress, public.bookmarked_facts, public.exam_attempts, public.custom_exams from anon;
grant select, insert, delete on public.lecture_progress, public.bookmarked_facts, public.exam_attempts to authenticated;
grant select, insert, update, delete on public.custom_exams to authenticated;
