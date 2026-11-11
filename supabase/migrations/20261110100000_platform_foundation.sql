-- Regalien 3.0 foundation. Existing enquiry columns and insert flow are unchanged.
create table if not exists public.projects (
  id text primary key,
  slug text not null unique,
  title text not null,
  description text,
  cover_image text,
  images jsonb not null default '[]'::jsonb,
  specifications jsonb not null default '{}'::jsonb,
  seo_title text,
  seo_description text,
  display_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(), quote text not null,
  display_name text, project_id text references public.projects(id) on delete set null,
  photo_path text, approved boolean not null default false,
  published boolean not null default false, display_order integer not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(), category text not null,
  question text not null, answer text not null, published boolean not null default false,
  display_order integer not null default 0, created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.enquiry_management (
  enquiry_id uuid primary key references public.enquiries(id) on delete cascade,
  status text not null default 'New' check (status in ('New','Contacted','Consultation Scheduled','Converted','Closed')),
  internal_notes text not null default '', updated_at timestamptz not null default now()
);
create table if not exists public.enquiry_notifications (
  id uuid primary key default gen_random_uuid(), enquiry_id uuid not null references public.enquiries(id) on delete cascade,
  kind text not null default 'admin_email', status text not null default 'pending' check (status in ('pending','sent','failed')),
  attempts integer not null default 0, last_error text, sent_at timestamptz,
  created_at timestamptz not null default now(), unique(enquiry_id, kind)
);

alter table public.projects enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.enquiry_management enable row level security;
alter table public.enquiry_notifications enable row level security;

revoke all on public.projects, public.testimonials, public.faqs, public.enquiry_management, public.enquiry_notifications from anon, authenticated;
grant select on public.projects, public.testimonials, public.faqs to anon, authenticated;
grant select, insert, update, delete on public.projects, public.testimonials, public.faqs to authenticated;
grant select, insert, update, delete on public.enquiry_management, public.enquiry_notifications to authenticated;

create policy "Public reads published projects" on public.projects for select to anon, authenticated using (published);
create policy "Public reads published approved testimonials" on public.testimonials for select to anon, authenticated using (published and approved);
create policy "Public reads published FAQs" on public.faqs for select to anon, authenticated using (published);

-- The application enforces its server-side ADMIN_EMAILS allowlist for admin routes.
-- Database writes are intentionally unavailable to ordinary authenticated clients; service operations
-- should be routed through verified server handlers when those management modules are implemented.
create policy "No direct project writes" on public.projects for all to authenticated using (false) with check (false);
create policy "No direct testimonial writes" on public.testimonials for all to authenticated using (false) with check (false);
create policy "No direct FAQ writes" on public.faqs for all to authenticated using (false) with check (false);
create policy "No direct enquiry management access" on public.enquiry_management for all to anon, authenticated using (false) with check (false);
create policy "No direct notification access" on public.enquiry_notifications for all to anon, authenticated using (false) with check (false);

create index if not exists projects_public_order_idx on public.projects (display_order) where published;
create index if not exists testimonials_public_order_idx on public.testimonials (display_order) where published and approved;
create index if not exists faqs_public_order_idx on public.faqs (display_order) where published;

insert into storage.buckets (id, name, public) values ('project-images', 'project-images', true) on conflict (id) do nothing;
drop policy if exists "Public read project images" on storage.objects;
create policy "Public read project images" on storage.objects for select to anon, authenticated using (bucket_id = 'project-images');
-- Upload/delete policy is intentionally deferred until admin database authorization is provisioned.
