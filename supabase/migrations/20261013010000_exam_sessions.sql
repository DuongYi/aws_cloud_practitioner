-- One in-progress exam per user: answers, position and deadline, so a half-finished attempt survives tab switches and reloads.
create table public.exam_sessions (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  exam_id text not null,
  state jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.exam_sessions enable row level security;

create policy "own rows select" on public.exam_sessions for select to authenticated using ((select auth.uid()) = user_id);
create policy "own rows insert" on public.exam_sessions for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "own rows update" on public.exam_sessions for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "own rows delete" on public.exam_sessions for delete to authenticated using ((select auth.uid()) = user_id);

revoke all on public.exam_sessions from anon;
grant select, insert, update, delete on public.exam_sessions to authenticated;
