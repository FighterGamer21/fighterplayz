import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { SEED_PLUGINS, SEED_PROJECTS, SEED_SERVICES, SEED_SKILLS } from "@/lib/seed-data";

function withIds<T extends { slug?: string; name?: string; title?: string }>(rows: T[]) {
  return rows.map((row, index) => ({
    id: row.slug ?? row.name ?? row.title ?? `seed-${index}`,
    gallery: [],
    ...row,
  }));
}

const fallback = {
  projects: withIds(SEED_PROJECTS),
  plugins: withIds(SEED_PLUGINS),
  services: withIds(SEED_SERVICES),
  skills: withIds(SEED_SKILLS),
  testimonials: [],
  announcements: [],
  reviews: [],
};

async function safe<T>(fn: () => Promise<T>, fallbackValue: T): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error("[public-data] Falling back to local seed content:", error);
    return fallbackValue;
  }
}

function rowsOrFallback<T>(rows: T[] | null | undefined, fallbackRows: T[]) {
  return rows && rows.length > 0 ? rows : fallbackRows;
}

export const getHomeData = createServerFn({ method: "GET" }).handler(async () =>
  safe(async () => {
    const [projects, plugins, services, skills, testimonials] = await Promise.all([
      supabaseAdmin.from("projects").select("*").eq("featured", true).order("sort_order"),
      supabaseAdmin.from("plugins").select("*").eq("featured", true).order("created_at", { ascending: false }).limit(6),
      supabaseAdmin.from("services").select("*").eq("active", true),
      supabaseAdmin.from("skills").select("*").order("sort_order"),
      supabaseAdmin.from("testimonials").select("*").eq("approved", true),
    ]);
    return {
      projects: rowsOrFallback(projects.data, fallback.projects.filter((p: any) => p.featured)),
      plugins: rowsOrFallback(plugins.data, fallback.plugins.filter((p: any) => p.featured && p.status !== "ARCHIVED")),
      services: rowsOrFallback(services.data, fallback.services),
      skills: rowsOrFallback(skills.data, fallback.skills),
      testimonials: testimonials.data ?? [],
    };
  }, fallback),
);

export const getAllPlugins = createServerFn({ method: "GET" }).handler(async () =>
  safe(async () => {
    const { data } = await supabaseAdmin
      .from("plugins")
      .select("*")
      .neq("status", "ARCHIVED")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    return { plugins: rowsOrFallback(data, fallback.plugins.filter((p: any) => p.status !== "ARCHIVED")) };
  }, { plugins: fallback.plugins.filter((p: any) => p.status !== "ARCHIVED") }),
);

export const getPluginBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) =>
    safe(async () => {
      const { data: plugin } = await supabaseAdmin
        .from("plugins")
        .select("*")
        .eq("slug", data.slug)
        .maybeSingle();
      return { plugin: plugin ?? fallback.plugins.find((p: any) => p.slug === data.slug) ?? null };
    }, { plugin: fallback.plugins.find((p: any) => p.slug === data.slug) ?? null }),
  );

export const getProjectsByCategory = createServerFn({ method: "GET" })
  .inputValidator((d: { category?: string }) => d ?? {})
  .handler(async ({ data }) =>
    safe(async () => {
      let q = supabaseAdmin
        .from("projects")
        .select("*")
        .neq("status", "ARCHIVED")
        .order("featured", { ascending: false })
        .order("sort_order");
      if (data?.category) q = q.eq("category", data.category);
      const { data: rows } = await q;
      const seed = data?.category ? fallback.projects.filter((p: any) => p.category === data.category) : fallback.projects;
      return { projects: rowsOrFallback(rows, seed) };
    }, { projects: data?.category ? fallback.projects.filter((p: any) => p.category === data.category) : fallback.projects }),
  );

export const getProjectBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) =>
    safe(async () => {
      const { data: project } = await supabaseAdmin
        .from("projects")
        .select("*")
        .eq("slug", data.slug)
        .maybeSingle();
      return { project: project ?? fallback.projects.find((p: any) => p.slug === data.slug) ?? null };
    }, { project: fallback.projects.find((p: any) => p.slug === data.slug) ?? null }),
  );

export const getServicesPublic = createServerFn({ method: "GET" }).handler(async () =>
  safe(async () => {
    const { data } = await supabaseAdmin.from("services").select("*").eq("active", true);
    return { services: rowsOrFallback(data, fallback.services) };
  }, { services: fallback.services }),
);

export const getAllSlugs = createServerFn({ method: "GET" }).handler(async () =>
  safe(async () => {
    const [plugins, projects] = await Promise.all([
      supabaseAdmin.from("plugins").select("slug").neq("status", "ARCHIVED"),
      supabaseAdmin.from("projects").select("slug,category").neq("status", "ARCHIVED"),
    ]);
    return {
      plugins: rowsOrFallback(plugins.data, fallback.plugins.filter((p: any) => p.status !== "ARCHIVED").map((p: any) => ({ slug: p.slug }))),
      projects: rowsOrFallback(projects.data, fallback.projects.map((p: any) => ({ slug: p.slug, category: p.category }))),
    };
  }, {
    plugins: fallback.plugins.filter((p: any) => p.status !== "ARCHIVED").map((p: any) => ({ slug: p.slug })),
    projects: fallback.projects.map((p: any) => ({ slug: p.slug, category: p.category })),
  }),
);

export const getAnnouncementsPublic = createServerFn({ method: "GET" }).handler(async () =>
  safe(async () => {
    const { data } = await (supabaseAdmin as any)
      .from("announcements")
      .select("*")
      .eq("published", true)
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false });
    return { announcements: data ?? [] };
  }, { announcements: [] }),
);

export const getApprovedReviews = createServerFn({ method: "GET" }).handler(async () =>
  safe(async () => {
    const { data } = await (supabaseAdmin as any)
      .from("reviews")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false });
    return { reviews: data ?? [] };
  }, { reviews: [] }),
);
