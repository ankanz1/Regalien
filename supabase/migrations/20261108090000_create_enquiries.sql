create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  service text,
  message text not null,
  created_at timestamptz not null default now(),
  constraint enquiries_name_length check (char_length(btrim(name)) between 2 and 120 and name ~ '[^[:space:]]'),
  constraint enquiries_name_characters check (name !~ '[[:cntrl:]]'),
  constraint enquiries_phone_format check (phone ~ '^[+]?[1-9][0-9]{6,14}$'),
  constraint enquiries_email_length check (email is null or char_length(email) <= 254),
  constraint enquiries_email_format check (email is null or email ~* '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]{2,}$'),
  constraint enquiries_service_allowed check (
    service is null or service in (
      'Residential Interiors',
      'Commercial Interiors',
      'Space Planning',
      'Interior Execution',
      'Modular Solutions',
      'Something else'
    )
  ),
  constraint enquiries_message_length check (char_length(btrim(message)) between 10 and 3000 and message ~ '[^[:space:]]'),
  constraint enquiries_message_characters check (translate(message, E'\n', '') !~ '[[:cntrl:]]')
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_phone_idx on public.enquiries (phone);

alter table public.enquiries enable row level security;

revoke all privileges on table public.enquiries from public, anon, authenticated;
grant usage on schema public to anon;
grant insert (name, phone, email, service, message) on table public.enquiries to anon;

drop policy if exists "Anonymous users can insert valid enquiries" on public.enquiries;
create policy "Anonymous users can insert valid enquiries"
on public.enquiries
for insert
to anon
with check (
  char_length(btrim(name)) between 2 and 120
  and name ~ '[^[:space:]]'
  and name !~ '[[:cntrl:]]'
  and phone ~ '^[+]?[1-9][0-9]{6,14}$'
  and (email is null or (
    char_length(email) <= 254
    and email ~* '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]{2,}$'
  ))
  and (service is null or service in (
    'Residential Interiors',
    'Commercial Interiors',
    'Space Planning',
    'Interior Execution',
    'Modular Solutions',
    'Something else'
  ))
  and char_length(btrim(message)) between 10 and 3000
  and message ~ '[^[:space:]]'
  and translate(message, E'\n', '') !~ '[[:cntrl:]]'
);
