import type { MetadataRoute } from "next";
import { getPlugins, getPosts, getProjects } from "@/server/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.fighterplays.com";
  const [projects, plugins, posts] = await Promise.all([getProjects(), getPlugins(), getPosts()]);
  const staticRoutes = ["", "/about", "/projects", "/plugins", "/services", "/blog", "/contact", "/ecosystem"];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() })),
    ...projects.map((project) => ({ url: `${base}/projects/${project.slug}`, lastModified: project.updatedAt })),
    ...plugins.map((plugin) => ({ url: `${base}/plugins/${plugin.slug}`, lastModified: plugin.updatedAt })),
    ...posts.map((post) => ({ url: `${base}/blog/${post.slug}`, lastModified: post.updatedAt }))
  ];
}
