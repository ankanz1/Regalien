insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('project-images', 'project-images', true, 12582912, array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update set public = true, file_size_limit = 12582912, allowed_mime_types = excluded.allowed_mime_types;
drop policy if exists "Public read project images" on storage.objects;
create policy "Public read project images" on storage.objects for select to anon, authenticated using (bucket_id = 'project-images');
drop policy if exists "Admins upload project images" on storage.objects;
create policy "Admins upload project images" on storage.objects for insert to authenticated
with check (bucket_id = 'project-images' and (select public.is_admin()) and lower(storage.extension(name)) in ('jpg','jpeg','png','webp','avif'));
drop policy if exists "Admins update project images" on storage.objects;
create policy "Admins update project images" on storage.objects for update to authenticated
using (bucket_id = 'project-images' and (select public.is_admin()))
with check (bucket_id = 'project-images' and (select public.is_admin()) and lower(storage.extension(name)) in ('jpg','jpeg','png','webp','avif'));
drop policy if exists "Admins delete project images" on storage.objects;
create policy "Admins delete project images" on storage.objects for delete to authenticated using (bucket_id = 'project-images' and (select public.is_admin()));
