create table if not exists public.admin_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);
alter table public.admin_roles enable row level security;
alter table public.admin_roles force row level security;
revoke all on public.admin_roles from public, anon, authenticated;
drop policy if exists "Deny client access to admin roles" on public.admin_roles;
create policy "Deny client access to admin roles" on public.admin_roles for all to anon, authenticated using (false) with check (false);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.admin_roles ar where ar.user_id = (select auth.uid()) and ar.role = 'admin'); $$;
alter function public.is_admin() owner to postgres;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

drop policy if exists "No direct project writes" on public.projects;
drop policy if exists "Admin reads all projects" on public.projects;
drop policy if exists "Admin manages projects" on public.projects;
create policy "Admin reads all projects" on public.projects for select to authenticated using ((select public.is_admin()));
create policy "Admin manages projects" on public.projects for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
drop policy if exists "No direct testimonial writes" on public.testimonials;
drop policy if exists "Admin reads all testimonials" on public.testimonials;
drop policy if exists "Admin manages testimonials" on public.testimonials;
create policy "Admin reads all testimonials" on public.testimonials for select to authenticated using ((select public.is_admin()));
create policy "Admin manages testimonials" on public.testimonials for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
drop policy if exists "No direct FAQ writes" on public.faqs;
drop policy if exists "Admin reads all FAQs" on public.faqs;
drop policy if exists "Admin manages FAQs" on public.faqs;
create policy "Admin reads all FAQs" on public.faqs for select to authenticated using ((select public.is_admin()));
create policy "Admin manages FAQs" on public.faqs for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

grant select, update, delete on public.enquiries to authenticated;
drop policy if exists "Admins read enquiries" on public.enquiries;
drop policy if exists "Admins update enquiries" on public.enquiries;
drop policy if exists "Admins delete enquiries" on public.enquiries;
create policy "Admins read enquiries" on public.enquiries for select to authenticated using ((select public.is_admin()));
create policy "Admins update enquiries" on public.enquiries for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "Admins delete enquiries" on public.enquiries for delete to authenticated using ((select public.is_admin()));

drop policy if exists "No direct enquiry management access" on public.enquiry_management;
drop policy if exists "Admins manage enquiry metadata" on public.enquiry_management;
create policy "Admins manage enquiry metadata" on public.enquiry_management for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
drop policy if exists "No direct notification access" on public.enquiry_notifications;
drop policy if exists "Admins manage enquiry notifications" on public.enquiry_notifications;
create policy "Admins manage enquiry notifications" on public.enquiry_notifications for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
