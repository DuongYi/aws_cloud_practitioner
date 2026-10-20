-- Detailed Vietnamese explanations for every imported practice question.
-- Static, public content: anyone can read, only the service role can write.
create table public.question_explanations (
  question_id text primary key,
  exam_id text not null,
  question_vi text not null,
  domain text,
  topic text,
  explanation_vi text not null,
  options jsonb not null,
  tips jsonb not null default '[]'::jsonb,
  keywords jsonb not null default '[]'::jsonb,
  related_services jsonb not null default '[]'::jsonb,
  answer_note text,
  updated_at timestamptz not null default now()
);
create index question_explanations_exam_idx on public.question_explanations (exam_id);

alter table public.question_explanations enable row level security;

create policy "explanations are public" on public.question_explanations
  for select to anon, authenticated using (true);

revoke all on public.question_explanations from anon, authenticated;
grant select on public.question_explanations to anon, authenticated;
