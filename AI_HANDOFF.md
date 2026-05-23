# FighterPlayz — AI Handoff

This document is for the next AI/dev assistant continuing work on this project.
Read it before editing.

## Stack

- **Vite 7** + **TanStack Start v1** (NOT Next.js — do NOT add Next/Prisma/PostCSS).
- **React 19**, **TypeScript strict**.
- **TailwindCSS v4** via `@tailwindcss/vite` — tokens live in `src/styles.css`.
- **Supabase** for DB + auth (via Lovable Cloud, but speak in code with the standard `@supabase/supabase-js` client).
- **Framer Motion** for animations.
- **TanStack Query** for data fetching (canonical loader + `useSuspenseQuery` pattern).

## Folder structure

```
src/
  routes/                   File-based routing (TanStack Router)
    __root.tsx              Root layout shell
    index.tsx               Home
    {about,ecosystem,plugins,projects,servers,websites,services,hire,tickets,contact}.tsx
    plugins.$slug.tsx       Plugin detail
    projects.$slug.tsx      Project detail
    announcements.tsx       Public updates feed
    reviews.tsx             Public reviews (auth-gated submission)
    admin.{...}.tsx         Admin panel (auth-gated via AdminShell)
    sitemap[.]xml.ts        Generated sitemap
  components/
    site/                   Public site components (Navbar, Footer, HireDialog, ...)
    admin/                  AdminShell + reusable CrudPanel
    ui/                     shadcn components
  lib/
    public-data.functions.ts    Public read server fns (use supabaseAdmin, scoped)
    submit.functions.ts         Contact + Hire ticket + Review submission
    admin.functions.ts          Admin-gated CRUD + ticket management
    seed-data.ts                Reference seed content
  integrations/supabase/
    client.ts                   Browser client (AUTO-GENERATED — never edit)
    client.server.ts            Admin/service-role client (AUTO-GENERATED)
    auth-middleware.ts          requireSupabaseAuth (AUTO-GENERATED)
    auth-attacher.ts            Attaches bearer token to serverFn calls
    types.ts                    AUTO-GENERATED Supabase types
supabase/
  migrations/                   SQL migrations (timestamped, do not edit historical)
  config.toml                   Supabase project config (do not edit project_id)
```

## Important routes

| Path | Purpose |
|---|---|
| `/` | Home — hero, featured projects/plugins, services, pinned announcements, reviews |
| `/plugins` `/plugins/$slug` | Plugin showcase |
| `/projects` `/projects/$slug` | Project showcase |
| `/servers` `/websites` | Filtered project views by category |
| `/services` | Services list |
| `/hire` | Hire form (also embedded as HireDialog with currency converter) |
| `/tickets` | Public ticket lookup + reply chat using ticket ID and email |
| `/contact` | Contact form |
| `/announcements` | Public site updates |
| `/reviews` | Approved user reviews + auth-gated submission form |
| `/admin/login` | Admin email/password login |
| `/admin` | Dashboard stats |
| `/admin/tickets` `/admin/messages` | Inbox |
| `/admin/{plugins,projects,services,skills,testimonials,blog,announcements,reviews}` | CRUD |
| `/sitemap.xml` `/robots.txt` | SEO |

## Supabase tables

- `plugins`, `projects`, `services`, `skills`, `blog_posts`, `experiences`, `testimonials` (legacy/admin-only), `site_settings`
- `hire_tickets` — auto ticket_id `FP-REQ-####`. Columns:
  `id, ticket_id, name, email, discord, project_type, service_slug, service_price_inr, display_currency, converted_amount, budget_range, timeline, details, reference_link, priority, status, admin_notes, created_at, updated_at`
- `ticket_messages` — per-ticket chat messages. Public users reply through ticket ID + email; admins reply from `/admin/tickets`.
- `contact_messages`
- `announcements` — `title, body, type, published, pinned, created_at, updated_at`
- `reviews` — `user_id, name, role, message, rating(1-5), approved, created_at, updated_at`
- `user_roles` — RBAC. Admin email `fightergamerofficial1@gmail.com` is auto-granted `admin` on first login by `bootstrapAdminRole`.

### RLS summary

- Public read: published announcements, approved reviews, active services, non-archived plugins/projects, approved testimonials.
- Anonymous insert: `contact_messages`, `hire_tickets`.
- Authenticated insert (self-scoped): `reviews` (user_id = auth.uid()).
- Admin (`has_role(auth.uid(),'admin')`): full manage on all admin tables.

## Env vars

Use ONLY these names (do not rename):

```
SUPABASE_URL
SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_PROJECT_ID
```

Optional server-only (never put in client code):
`SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_DB_URL`, `LOVABLE_API_KEY`.

## How tickets work

1. User fills the form in `HireDialog` (or `/hire`).
2. They pick a service + display currency; the dialog converts the INR price to the chosen currency (estimate only).
3. `submitHireTicket` (serverFn, anonymous) calls `create_hire_ticket` RPC. The DB generates `ticket_id = FP-REQ-XXXX`.
4. User sees a toast with the ticket id.
5. User can open `/tickets`, enter ticket ID + email, and reply in the ticket thread.
6. Admin sees, replies, and updates status at `/admin/tickets`. Both sides auto-refresh every few seconds.

Statuses: `NEW | REVIEWING | ACCEPTED | IN_PROGRESS | COMPLETED | REJECTED`.

## How reviews work

1. Only signed-in users can submit (RLS enforces `user_id = auth.uid()`).
2. The `/reviews` page shows inline email/password sign-in/sign-up if unauthenticated.
3. New reviews insert with `approved=false`.
4. Admin approves/deletes at `/admin/reviews`.
5. Public site only shows `approved=true` reviews.

## How announcements work

1. Admin creates/edits at `/admin/announcements`.
2. Fields: `title, body, type, published, pinned`.
3. Public page `/announcements` shows all `published=true`, pinned first.
4. Home page shows up to 3 pinned/published announcements.

## Vercel deploy

`vercel.json` is already in the repo:

```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install --legacy-peer-deps",
  "framework": "vite",
  "outputDirectory": "dist/client"
}
```

In the Vercel project settings:
- Framework Preset: **Vite**
- Install Command: `npm install --legacy-peer-deps`
- Build Command: `npm run build`
- Output Directory: `dist/client`
- Environment Variables (Production + Preview): set all five env vars listed above.

## Commands

```
npm install --legacy-peer-deps
npm run dev         # local dev
npm run build       # production build (outputs dist/client + dist/server)
npm run preview     # preview built output
npm run lint
```

## Do NOT do

- Do not convert this project to Next.js or Remix.
- Do not add Prisma or any ORM — use Supabase client directly.
- Do not edit `src/integrations/supabase/{client,client.server,auth-middleware,auth-attacher,types}.ts` — they are auto-generated.
- Do not edit `src/routeTree.gen.ts` — the TanStack Router plugin regenerates it.
- Do not edit historical migration files under `supabase/migrations/` — create a new timestamped file.
- Do not add a PostCSS config; Tailwind v4 is wired via `@tailwindcss/vite`.
- Do not put service-role keys in client code or `VITE_*` vars.
- Do not store admin status on the `profiles`/`users` table — use `user_roles` (security definer `has_role()`).

## How to safely continue

- Add new server logic as `createServerFn` in a `*.functions.ts` file (NOT Supabase Edge Functions).
- Add new admin tables to `ALLOWED_TABLES` in `src/lib/admin.functions.ts` and add a route under `src/routes/admin.<name>.tsx` reusing `CrudPanel`.
- For new public pages, create a route file and add a link in `src/components/site/Navbar.tsx`.
- Always write a new migration (`supabase/migrations/<timestamp>_<name>.sql`) for schema changes, and let the types regenerate.
- Run `npm run build` locally to validate before pushing.
