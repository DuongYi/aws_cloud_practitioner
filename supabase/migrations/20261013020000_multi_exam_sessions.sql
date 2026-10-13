-- Allow multiple concurrent in-progress exam sessions per user (one per exam_id)
alter table public.exam_sessions drop constraint if exists exam_sessions_pkey;
alter table public.exam_sessions add primary key (user_id, exam_id);
