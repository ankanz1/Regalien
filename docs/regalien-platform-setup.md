# Regalien platform setup

This repository is prepared for a staged platform rollout. Admin authentication uses Supabase Auth with `@supabase/ssr` cookie sessions and PostgreSQL-backed roles. Existing public enquiry submission and public portfolio routes remain unchanged.

## Supabase

1. Set `NEXT_PUBLIC_SUPABASE_URL` to the project URL and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the anon/publishable key in `.env.local`. These values may be used by browser code and are not secrets.
2. Do not set or expose `SUPABASE_SERVICE_ROLE_KEY` in browser code. The SSR auth clients use only the publishable key.
4. In Supabase Auth, disable public sign-up. Create administrator accounts manually in the Supabase dashboard and enable email recovery.
5. Configure the Supabase recovery email template and allow the development/deployed origin to redirect to `/admin/reset-password`.

## SSR sessions

The browser client in `lib/supabase-browser.ts` uses `createBrowserClient`. Server components and route handlers use `createServerClient` through `lib/supabase-server-auth.ts`. `middleware.ts` runs on `/admin/*` and `/api/admin/*`, calls `auth.getUser()` to refresh/verify the session, and propagates refreshed cookies to both the request and response. Server authorization calls `auth.getUser()` again; it does not trust middleware or client state as the only security boundary. Public login and recovery routes are excluded from auth redirects. Logout calls Supabase `signOut()` and clears the managed auth cookies.

## Migrations and first admin

Apply migrations in timestamp order using the Supabase CLI (`supabase db push`) or the SQL editor. The admin authorization migration is `supabase/migrations/20261111120000_database_admin_roles.sql`. Review its SQL and confirm it completes before provisioning. It creates `admin_roles`, enables and forces RLS, denies client access to that table, and exposes `public.is_admin()` only to authenticated users. The function is `SECURITY DEFINER`, owned by `postgres`, uses an empty `search_path`, and checks `auth.uid()` against the role table. The application calls `auth.getUser()` and then `is_admin()`; neither email nor user metadata supplies the role.

To provision the first admin, an owner creates the user through Supabase Dashboard → Authentication → Users (or a trusted invitation flow). Disable public signups. Copy the actual UUID shown for that Auth user, then run this SQL in the project's SQL editor as the database owner, replacing the placeholder with that UUID:

```sql
insert into public.admin_roles (user_id, role)
values ('REPLACE-WITH-AUTH-USER-UUID'::uuid, 'admin')
on conflict (user_id) do update set role = excluded.role;
```

Verify while signed in as the provisioned account: `select public.is_admin();` returns `true` through an authenticated Supabase SQL/API session. As an unprovisioned authenticated user it returns `false`. Do not run this provisioning statement with a guessed UUID, from client code, or as part of public registration. To revoke access, the database owner deletes that user's row from `public.admin_roles`.

## Session and authorization verification

1. Start with `pnpm dev` and configure working Supabase credentials.
2. Sign in at `/admin/login`, reload `/admin`, and navigate away and back. The session should remain available through Supabase-managed cookies.
3. Wait until the access token is near expiry, navigate to an admin route, then verify the response contains refreshed Supabase auth cookies and the server route remains authenticated. Supabase refresh behavior requires a real project session to verify.
4. Sign out and verify the Supabase auth cookies are cleared and `/admin` redirects to login.
5. Sign in using a valid Supabase user without an `admin_roles` row; server access to the overview must be denied. Then provision that user and verify access is allowed without changing the JWT metadata.

The application never uses a service-role key in browser code. Direct authenticated content writes are authorized by `is_admin()` RLS policies. Future admin API handlers must still call `requireAdmin()` independently.

## RLS verification

No local Supabase CLI or `psql` is installed in the current development environment, so database policies have not been executed here. In an isolated local Supabase project, run `supabase start`, `supabase db reset`, then `supabase test db`. Create test Auth users for anonymous, non-admin, and admin cases, and verify with their authenticated JWTs that: anon can insert a valid enquiry but cannot select; non-admin cannot select enquiries or mutate protected tables or `admin_roles`; admin can select enquiries and write protected content; `is_admin()` returns true only for the provisioned Auth UUID. Do not use the service-role key for these assertions because it bypasses RLS.

For a live project, first apply migrations in a staging project and execute the same matrix using anon and authenticated user sessions. Confirm the enquiry form still submits a valid test enquiry to staging only. Remove test rows/users afterward. Never run these checks against production customer records. Rollback should be performed by a reviewed forward migration: revoke admin-role assignments first, then remove policies/function/table only after dependent routes are disabled. Avoid manually dropping only the helper function while policies depend on it.

## Existing content

The current `lib/projects.ts` manifest remains the source for the existing portfolio and project pages. It keeps original `public/` asset paths and ordering. The new `projects` table is the future content-management target; no destructive conversion or asset copying is performed by the migration.

## Project management setup

Apply `supabase/migrations/20261112100000_project_storage_policies.sql` after the admin role migration. It configures the public `project-images` bucket for JPG, PNG, WebP, and AVIF images up to 12 MiB and allows writes/deletes only when `public.is_admin()` returns true. Keep this bucket public because published project images are public assets; never upload private client files there.

After migrations and admin provisioning, sign in and use **Import legacy portfolio** on `/admin/projects` (or send `POST /api/admin/projects/import-manifest`). The route independently checks admin authorization and inserts missing manifest projects and image references while keeping paths under `public/` unchanged. Existing records are skipped; reruns do not overwrite admin edits. This import does not copy, rename, or delete assets. Public pages use the legacy manifest until the server-only variable `PROJECTS_DATABASE_ENABLED=true` is set. Enable it only after reviewing the import; then RLS-published database rows are the sole source, and an empty database displays an empty state.

Admin project API handlers verify `requireAdmin()` and use the SSR authenticated client, so PostgreSQL RLS remains authoritative. The Storage bucket also enforces its own admin check. The browser file picker is limited to supported image MIME types and 12 MiB; bucket policies constrain object size and extension. Storage client uploads do not currently expose byte-level progress, and removing an image from an editor gallery removes its reference only; orphan cleanup and deletion confirmation for storage objects remain follow-up work.

To manually verify project RLS in staging, sign in as admin and create/update a draft through `/api/admin/projects`; confirm the anonymous client cannot see it, then publish and confirm public `select` returns it. Sign in as an authenticated non-admin and confirm the same write is denied. Upload a supported image as admin and confirm an authenticated non-admin cannot upload/delete objects in `project-images`.

## Later integrations

Email delivery and Google Calendar are not connected in this code yet. Before enabling them, configure a server-side email provider key and sender identity, then Google OAuth client ID, client secret, redirect URI, and calendar authorization. Store refresh tokens only in a server-side secret store or encrypted server-only database field. Do not use a browser bundle for provider secrets. Booking endpoints must be configured with transactional slot reservation and reconciliation before taking live bookings.

## Local development

```sh
pnpm install
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
```

`supabase test db` is the database/RLS test command when Supabase CLI and pgTAP tests are available. The checks above are not claimed as passed until executed against PostgreSQL with real anon/authenticated roles.
