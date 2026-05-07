
create table public.admissions (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  parent_name text not null,
  email text not null,
  phone text not null,
  dob date,
  class_for text not null,
  address text,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
alter table public.admissions enable row level security;
create policy "Anyone can submit admission" on public.admissions for insert with check (true);
create policy "Authenticated can read admissions" on public.admissions for select to authenticated using (true);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
create policy "Anyone can submit contact" on public.contact_messages for insert with check (true);
create policy "Authenticated can read contacts" on public.contact_messages for select to authenticated using (true);

create table public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  category text not null default 'general',
  pinned boolean not null default false,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
alter table public.notices enable row level security;
create policy "Notices are public" on public.notices for select using (true);
create policy "Authenticated can manage notices" on public.notices for all to authenticated using (true) with check (true);

insert into public.notices (title, body, category, pinned) values
('Admissions Open 2026-27', 'Online registration is now open for Nursery to Class XII. Limited seats available.', 'admissions', true),
('Annual Day Celebration', 'Join us for our grand Annual Day on December 14, 2026 at the school auditorium.', 'event', false),
('CBSE Class XII Toppers 2025', 'Congratulations to our Class XII students for outstanding CBSE Board results.', 'achievement', true),
('Parent-Teacher Meeting', 'PTM scheduled for the second Saturday of every month from 9:00 AM to 12:00 PM.', 'general', false);
