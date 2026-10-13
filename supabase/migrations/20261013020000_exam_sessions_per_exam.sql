-- One in-progress session per (user, exam) so several half-finished exams can coexist.
alter table public.exam_sessions drop constraint exam_sessions_pkey;
alter table public.exam_sessions add primary key (user_id, exam_id);
