# FighterPlayz Ecosystem

Premium FighterPlayz website built with Lovable/TanStack Start, Vite, React, Tailwind CSS, and Supabase.

## Vercel Deploy

Use these settings:

```txt
Framework Preset: Vite
Install Command: npm install --legacy-peer-deps
Build Command: npm run build
Output Directory: dist/client
```

`vercel.json` already contains those values.

## Required Environment Variables

Add these in Vercel Project Settings:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Use the same Supabase project URL for `SUPABASE_URL` and `VITE_SUPABASE_URL`.
Use the anon/publishable key for both publishable key variables.

## Supabase

Apply all SQL files inside `supabase/migrations`.

The latest migration adds:

- ticket price/currency fields
- announcements
- registered-user reviews
- removal of default testimonials

## Local Development

```bash
npm install --legacy-peer-deps
npm run dev
```

## Production Build

```bash
npm run build
```

## Notes

This repo is now Vite/TanStack only. Old Next.js, Prisma, and PostCSS config files were removed so Vercel does not mis-detect the project or fail on ESM/CommonJS config conflicts.
