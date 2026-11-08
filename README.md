# Regalien Website

Regalien Infrastructure Pvt. Ltd. website built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion and Supabase.

## Customer enquiries: Supabase setup

The contact form posts to `/api/enquiries`. The server uses only the Supabase project URL and public anon/publishable key. The `enquiries` table has Row Level Security enabled and grants the `anon` role column-level `INSERT` access only. Anonymous `SELECT`, `UPDATE` and `DELETE` access is revoked and there are no corresponding RLS policies. The service-role key is not used by this application.

### 1. Create or select the Supabase project

Create a Supabase project and copy its project URL and publishable key from the project API settings. Use the publishable/anon key only; never put a service-role or secret key in a browser bundle or the application environment for this endpoint.

### 2. Configure local environment

Copy `.env.example` to `.env.local` and set:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-publishable-key
```

`.env.local` is excluded from Git. Restart the development server after changing environment values.

### 3. Apply the database migration

In the Supabase Dashboard, open **SQL Editor**, create a new query, paste the contents of `supabase/migrations/20261108090000_create_enquiries.sql`, and run it. This creates the constrained `public.enquiries` table, indexes and insert-only RLS policy.

If using the Supabase CLI in an already linked project, apply migrations with `supabase db push` instead. Do not create a public read policy or grant anonymous read access to enquiries.

### 4. Run locally

Install dependencies and start Next.js:

```bash
pnpm install
pnpm dev
```

Open `/contact`, complete the enquiry form and submit it. A success message appears only when the API confirms the insert. The API returns generic database-unavailable errors and does not log submitted personal information.

### 5. Configure production

Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the production host’s environment settings for the production environment, then redeploy. Apply the SQL migration to the Supabase project before accepting live enquiries. The anon/publishable key is designed for client-visible use; table security comes from the grants and RLS policy, not from keeping that key secret.

## Enquiry endpoint behavior

- `POST /api/enquiries` accepts JSON only, validates and normalizes fields on the server, and inserts through the anon role.
- Invalid fields return `422`; malformed requests return `400`; unsupported content types return `415`; oversized bodies return `413`; unavailable database configuration or insert failures return a generic `503`.
- Other HTTP methods are not exported and receive Next.js `405 Method Not Allowed` responses.
- The form includes client-side validation, accessible field errors, a honeypot, pending/success/error states and duplicate-submit protection. Client validation is not trusted by the API.

## Google Search Console readiness

The production sitemap is available at [https://regalien.in/sitemap.xml](https://regalien.in/sitemap.xml), and `/robots.txt` advertises that sitemap while excluding the enquiry API from crawling. The site is prepared for Search Console submission; verification and indexing have not been performed by this project.

1. Add `regalien.in` as a **Domain property** in Google Search Console and verify ownership by adding the TXT record Google provides to the domain's DNS. DNS access and verification are external setup steps.
2. In Search Console, submit `https://regalien.in/sitemap.xml` under **Sitemaps**.
3. Use **URL inspection** for the homepage and each public route (`/about`, `/services`, `/projects`, `/contact`), review Google's live URL check, then use **Request indexing** where offered. A request does not guarantee indexing.
4. Before submission, confirm the legal company name, complete address, phone numbers, official social profiles, proposed service category wording, and that project photography is verified before it is published as company work.
# Regalien
# Regalien
