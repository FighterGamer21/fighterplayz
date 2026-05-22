import { prisma } from "@/lib/prisma";
import { fallbackPlugins, fallbackPosts, fallbackProjects, fallbackServices, fallbackSkills, fallbackTestimonials } from "@/lib/fallback-data";

async function safe<T>(query: Promise<T>, fallback: unknown): Promise<any> {
  try {
    return await query;
  } catch {
    return fallback;
  }
}

export const getFeaturedPlugins = () =>
  safe(prisma.plugin.findMany({ where: { featured: true }, orderBy: { createdAt: "desc" }, take: 6 }), fallbackPlugins.filter((p) => p.featured));

export const getPlugins = () => safe(prisma.plugin.findMany({ orderBy: { createdAt: "desc" } }), fallbackPlugins);
export const getPluginBySlug = (slug: string) => safe(prisma.plugin.findUnique({ where: { slug } }), fallbackPlugins.find((p) => p.slug === slug) ?? null);

export const getFeaturedProjects = () =>
  safe(prisma.project.findMany({ where: { featured: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }), fallbackProjects.filter((p) => p.featured));

export const getProjects = () => safe(prisma.project.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }), fallbackProjects);
export const getProjectBySlug = (slug: string) => safe(prisma.project.findUnique({ where: { slug } }), fallbackProjects.find((p) => p.slug === slug) ?? null);
export const getSkills = () => safe(prisma.skill.findMany({ orderBy: { sortOrder: "asc" } }), fallbackSkills);
export const getServices = () => safe(prisma.service.findMany({ where: { active: true } }), fallbackServices);
export const getTestimonials = () => safe(prisma.testimonial.findMany({ where: { approved: true } }), fallbackTestimonials);
export const getPosts = () => safe(prisma.blogPost.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } }), fallbackPosts);
export const getPostBySlug = (slug: string) => safe(prisma.blogPost.findUnique({ where: { slug } }), fallbackPosts.find((p) => p.slug === slug) ?? null);

export async function getDashboardCounts() {
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
