import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const getHomeData = createServerFn({ method: "GET" }).handler(async () => {
  const [projects, plugins, services, skills, reviews, announcements] = await Promise.all([
    supabaseAdmin.from("projects").select("*").eq("featured", true).order("sort_order"),
    supabaseAdmin.from("plugins").select("*").eq("featured", true).order("created_at", { ascending: false }).limit(6),
    supabaseAdmin.from("services").select("*").eq("active", true),
    supabaseAdmin.from("skills").select("*").order("sort_order"),
    (supabaseAdmin.from("reviews" as any) as any).select("*").eq("approved", true).order("created_at", { ascending: false }).limit(6),
    (supabaseAdmin.from("announcements" as any) as any).select("*").eq("published", true).order("pinned", { ascending: false }).order("created_at", { ascending: false }).limit(4),
  ]);
  return {
    projects: projects.data ?? [],
    plugins: plugins.data ?? [],
    services: services.data ?? [],
    skills: skills.data ?? [],
    testimonials: reviews.data ?? [],
    announcements: announcements.data ?? [],
  };
});

export const getApprovedReviews = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await (supabaseAdmin.from("reviews" as any) as any)
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return { reviews: data ?? [] };
});

export const getAnnouncementsPublic = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await (supabaseAdmin.from("announcements" as any) as any)
    .select("*")
    .eq("published", true)
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return { announcements: data ?? [] };
});

export const getAllPlugins = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await supabaseAdmin
    .from("plugins")
    .select("*")
    .neq("status", "ARCHIVED")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });
  return { plugins: data ?? [] };
});

export const getPluginBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    const { data: plugin } = await supabaseAdmin
      .from("plugins")
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();
    return { plugin };
  });

export const getProjectsByCategory = createServerFn({ method: "GET" })
  .inputValidator((d: { category?: string }) => d ?? {})
  .handler(async ({ data }) => {
    let q = supabaseAdmin
      .from("projects")
      .select("*")
      .neq("status", "ARCHIVED")
      .order("featured", { ascending: false })
      .order("sort_order");
    if (data?.category) q = q.eq("category", data.category);
    const { data: rows } = await q;
    return { projects: rows ?? [] };
  });

export const getProjectBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    const { data: project } = await supabaseAdmin
      .from("projects")
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();
    return { project };
  });

export const getServicesPublic = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await supabaseAdmin.from("services").select("*").eq("active", true);
  return { services: data ?? [] };
});

export const getAllSlugs = createServerFn({ method: "GET" }).handler(async () => {
  const [plugins, projects] = await Promise.all([
    supabaseAdmin.from("plugins").select("slug").neq("status", "ARCHIVED"),
    supabaseAdmin.from("projects").select("slug,category").neq("status", "ARCHIVED"),
  ]);
  return { plugins: plugins.data ?? [], projects: projects.data ?? [] };
});
