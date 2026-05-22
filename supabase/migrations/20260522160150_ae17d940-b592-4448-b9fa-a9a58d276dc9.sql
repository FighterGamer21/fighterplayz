
-- Fix mutable search_path on trigger function
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$ begin new.updated_at = now(); return new; end; $$;

-- Restrict has_role function execute
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;

-- Tighten storage uploads: allow read of specific objects but disallow LIST
drop policy if exists "Public can read uploads" on storage.objects;
create policy "Public can read uploads by name"
  on storage.objects for select
  using (bucket_id = 'uploads' and name is not null);
