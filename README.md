# FighterPlayz Ecosystem

Premium Next.js revamp of `fighterplays.com` for a Minecraft infrastructure developer, plugin studio, web systems builder, and gaming technology ecosystem.

## Features

- Cinematic dark cyber-infrastructure public website
- App Router, TypeScript, Tailwind CSS, Framer Motion
- Prisma ORM with PostgreSQL schema and seed data
- Auth.js credential admin login with hashed passwords
- Admin command center for projects, plugins, skills, services, testimonials, blog posts, messages, settings, uploads, featured toggles, search, and delete
- Zod-validated contact form saved to the database
- Plugin and project detail pages with commands, permissions, config preview, changelog, installation guide, tech stack, and outcomes
- SEO metadata, Open Graph asset, sitemap, robots, 404, error boundary, responsive navigation, toast notifications, lazy-friendly layout

## Setup

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev
npm run prisma:seed
npm run dev
```

## Environment Variables

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
NEXTAUTH_SECRET="knJN2wPQJD37fTlHM0TyD3dib2f_Y5oQgMxZS8Tuc8Q"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@fighterplays.com"
ADMIN_PASSWORD="tn2Lco3zYwJSak2L"
UPLOAD_PROVIDER="local"
BLOB_READ_WRITE_TOKEN=""
EMAIL_HOST=""
EMAIL_USER=""
EMAIL_PASS=""
```

Ready-to-paste examples are included in `.env.local.example` and `.env.vercel.example`.

For Vercel, create a PostgreSQL database through Vercel Storage, Neon, Supabase, Railway, or another hosted PostgreSQL provider, then paste its connection string into `DATABASE_URL`. A local PostgreSQL URL from a PC will not work on Vercel because Vercel cannot connect to `localhost` on your computer.

## Database

The Prisma schema is in `prisma/schema.prisma` and includes `User`, `Project`, `Plugin`, `Skill`, `Experience`, `Service`, `Testimonial`, `BlogPost`, `ContactMessage`, and `SiteSetting`.

Seed data includes Java, Python, HTML, CSS, JavaScript, TypeScript, C++, Minecraft Plugin Development, Paper/Spigot/Pufferfish, Velocity Proxy, Pterodactyl, Docker, PostgreSQL, MySQL, Prisma, Node.js, Next.js, Tailwind CSS, plus OGxDevs, OGxNodes, ArctixMC Systems, KitHub, Minecraft Optimization Systems, Custom Server GUIs, Discord Bot Systems, and the requested plugin concepts.

## Admin Login

Set `ADMIN_EMAIL` and `ADMIN_PASSWORD`, run `npm run prisma:seed`, then visit `/admin/login`.

## Build

```bash
npm run build
npm run start
```

## Deployment

1. Provision PostgreSQL.
2. Set all environment variables in the hosting platform.
3. Run Prisma migrations during deploy.
4. For admin image uploads on Vercel, enable Vercel Blob and set `BLOB_READ_WRITE_TOKEN`.
5. Run the seed command once for the first admin and starter content.
6. Deploy with a Node-compatible Next.js host such as Vercel, Railway, Render, or a VPS.

## Folder Structure

```text
src/app                 App Router pages, API routes, metadata routes
src/components          Public, UI, and admin components
src/components/ui       Shared primitives
src/components/sections Public site sections
src/components/admin    Admin command center components
src/lib                 Auth, Prisma, validators, utilities, fallback data
src/server              Data access helpers
src/prisma              Reserved project Prisma helpers
src/types               Type augmentation
src/hooks               Reserved reusable hooks
src/styles              Global styles
prisma                  Schema and seed script
public                  OG image and uploads
```

## Notes

The public site uses database data when PostgreSQL is available and starter fallback data during early local development. Admin CRUD requires a configured database.
