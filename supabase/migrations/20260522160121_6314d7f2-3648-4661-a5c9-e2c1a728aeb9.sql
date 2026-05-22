
-- ============ ENUMS ============
create type public.app_role as enum ('admin', 'editor');
create type public.content_status as enum ('CONCEPT', 'ACTIVE', 'MAINTAINED', 'ARCHIVED');
create type public.message_status as enum ('NEW', 'REVIEWED', 'REPLIED', 'CLOSED');

-- ============ USER ROLES ============
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users can view their own roles"
  on public.user_roles for select
  to authenticated
  using (user_id = auth.uid());

create policy "Admins can manage roles"
  on public.user_roles for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ============ UPDATED_AT TRIGGER ============
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

-- ============ PROJECTS ============
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short_description text not null,
  full_description text not null,
  category text not null,
  status public.content_status not null default 'ACTIVE',
  image text,
  gallery text[] not null default '{}',
  tech_stack text[] not null default '{}',
  live_url text,
  github_url text,
  featured boolean not null default false,
  sort_order int not null default 0,
  problem_solved text,
  features text[] not null default '{}',
  development_notes text,
  outcome text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.projects enable row level security;
create trigger projects_updated before update on public.projects for each row execute function public.set_updated_at();

create policy "Public can read active projects" on public.projects for select
  using (status <> 'ARCHIVED');
create policy "Admins manage projects" on public.projects for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ============ PLUGINS ============
create table public.plugins (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  tagline text not null,
  description text not null,
  version text not null,
  supported_versions text[] not null default '{}',
  plugin_type text not null,
  price_type text not null default 'Free',
  price numeric(10,2),
  download_url text,
  spigot_url text,
  github_url text,
  docs_url text,
  image text,
  gallery text[] not null default '{}',
  features text[] not null default '{}',
  commands jsonb not null default '[]'::jsonb,
  permissions jsonb not null default '[]'::jsonb,
  dependencies text[] not null default '{}',
  config_example text,
  changelog jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  status public.content_status not null default 'ACTIVE',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.plugins enable row level security;
create trigger plugins_updated before update on public.plugins for each row execute function public.set_updated_at();

create policy "Public can read non-archived plugins" on public.plugins for select
  using (status <> 'ARCHIVED');
create policy "Admins manage plugins" on public.plugins for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ============ SKILLS ============
create table public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  level int not null,
  icon text,
  description text not null,
  sort_order int not null default 0
);
alter table public.skills enable row level security;
create policy "Public can read skills" on public.skills for select using (true);
create policy "Admins manage skills" on public.skills for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ============ EXPERIENCES ============
create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organization text not null,
  type text not null,
  description text not null,
  start_date date not null,
  end_date date,
  currently_working boolean not null default false,
  logo text
);
alter table public.experiences enable row level security;
create policy "Public can read experiences" on public.experiences for select using (true);
create policy "Admins manage experiences" on public.experiences for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ============ SERVICES ============
create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  features text[] not null default '{}',
  icon text,
  starting_price text,
  active boolean not null default true
);
alter table public.services enable row level security;
create policy "Public can read active services" on public.services for select using (active);
create policy "Admins manage services" on public.services for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ============ TESTIMONIALS ============
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  message text not null,
  avatar text,
  rating int not null default 5,
  approved boolean not null default false
);
alter table public.testimonials enable row level security;
create policy "Public can read approved testimonials" on public.testimonials for select using (approved);
create policy "Admins manage testimonials" on public.testimonials for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ============ BLOG POSTS ============
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  cover_image text,
  tags text[] not null default '{}',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.blog_posts enable row level security;
create trigger blog_posts_updated before update on public.blog_posts for each row execute function public.set_updated_at();
create policy "Public can read published posts" on public.blog_posts for select using (published);
create policy "Admins manage posts" on public.blog_posts for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ============ CONTACT MESSAGES ============
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  discord text,
  subject text not null,
  project_type text,
  budget_range text,
  message text not null,
  status public.message_status not null default 'NEW',
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
create policy "Anyone can submit a message" on public.contact_messages for insert
  to anon, authenticated with check (true);
create policy "Admins can read messages" on public.contact_messages for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update messages" on public.contact_messages for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete messages" on public.contact_messages for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- ============ SITE SETTINGS ============
create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null
);
alter table public.site_settings enable row level security;
create policy "Public can read settings" on public.site_settings for select using (true);
create policy "Admins manage settings" on public.site_settings for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ============ STORAGE BUCKET ============
insert into storage.buckets (id, name, public) values ('uploads', 'uploads', true)
on conflict (id) do nothing;
create policy "Public can read uploads" on storage.objects for select using (bucket_id = 'uploads');
create policy "Admins can upload" on storage.objects for insert to authenticated
  with check (bucket_id = 'uploads' and public.has_role(auth.uid(), 'admin'));
create policy "Admins can update uploads" on storage.objects for update to authenticated
  using (bucket_id = 'uploads' and public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete uploads" on storage.objects for delete to authenticated
  using (bucket_id = 'uploads' and public.has_role(auth.uid(), 'admin'));
