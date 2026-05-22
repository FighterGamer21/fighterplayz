import { fallbackPlugins, fallbackPosts, fallbackProjects, fallbackServices, fallbackSkills, fallbackTestimonials } from "@/lib/fallback-data";

const hasDatabase = Boolean(process.env.DATABASE_URL) && !process.env.DATABASE_URL.includes("localhost");

async function safe<T>(query: Promise<T>, fallback: unknown): Promise<any> {
  try {
    return await query;
  } catch {
    return fallback;
  }
}

export const getFeaturedPlugins = () =>
  hasDatabase ? import("@/lib/prisma").then(({ prisma }) => safe(prisma.plugin.findMany({ where: { featured: true }, orderBy: { createdAt: "desc" }, take: 6 }), fallbackPlugins.filter((p) => p.featured))) : fallbackPlugins.filter((p) => p.featured);

export const getPlugins = () => hasDatabase ? import("@/lib/prisma").then(({ prisma }) => safe(prisma.plugin.findMany({ orderBy: { createdAt: "desc" } }), fallbackPlugins)) : fallbackPlugins;
export const getPluginBySlug = (slug: string) => hasDatabase ? import("@/lib/prisma").then(({ prisma }) => safe(prisma.plugin.findUnique({ where: { slug } }), fallbackPlugins.find((p) => p.slug === slug) ?? null)) : fallbackPlugins.find((p) => p.slug === slug) ?? null;

export const getFeaturedProjects = () =>
  hasDatabase ? import("@/lib/prisma").then(({ prisma }) => safe(prisma.project.findMany({ where: { featured: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }), fallbackProjects.filter((p) => p.featured))) : fallbackProjects.filter((p) => p.featured);

export const getProjects = () => hasDatabase ? import("@/lib/prisma").then(({ prisma }) => safe(prisma.project.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }), fallbackProjects)) : fallbackProjects;
export const getProjectBySlug = (slug: string) => hasDatabase ? import("@/lib/prisma").then(({ prisma }) => safe(prisma.project.findUnique({ where: { slug } }), fallbackProjects.find((p) => p.slug === slug) ?? null)) : fallbackProjects.find((p) => p.slug === slug) ?? null;
export const getSkills = () => hasDatabase ? import("@/lib/prisma").then(({ prisma }) => safe(prisma.skill.findMany({ orderBy: { sortOrder: "asc" } }), fallbackSkills)) : fallbackSkills;
export const getServices = () => hasDatabase ? import("@/lib/prisma").then(({ prisma }) => safe(prisma.service.findMany({ where: { active: true } }), fallbackServices)) : fallbackServices;
export const getTestimonials = () => hasDatabase ? import("@/lib/prisma").then(({ prisma }) => safe(prisma.testimonial.findMany({ where: { approved: true } }), fallbackTestimonials)) : fallbackTestimonials;
export const getPosts = () => hasDatabase ? import("@/lib/prisma").then(({ prisma }) => safe(prisma.blogPost.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } }), fallbackPosts)) : fallbackPosts;
export const getPostBySlug = (slug: string) => hasDatabase ? import("@/lib/prisma").then(({ prisma }) => safe(prisma.blogPost.findUnique({ where: { slug } }), fallbackPosts.find((p) => p.slug === slug) ?? null)) : fallbackPosts.find((p) => p.slug === slug) ?? null;

export async function getDashboardCounts() {
  if (!hasDatabase) {
    return { projects: fallbackProjects.length, plugins: fallbackPlugins.length, skills: fallbackSkills.length, services: fallbackServices.length, messages: 0, posts: fallbackPosts.length };
  }
  const { prisma } = await import("@/lib/prisma");
  return safe(
    Promise.all([
      prisma.project.count(),
      prisma.plugin.count(),
      prisma.skill.count(),
      prisma.service.count(),
      prisma.contactMessage.count({ where: { status: "NEW" } }),
      prisma.blogPost.count()
    ]).then(([projects, plugins, skills, services, messages, posts]) => ({ projects, plugins, skills, services, messages, posts })),
    { projects: fallbackProjects.length, plugins: fallbackPlugins.length, skills: fallbackSkills.length, services: fallbackServices.length, messages: 0, posts: fallbackPosts.length }
  );
}
