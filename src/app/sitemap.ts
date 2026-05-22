import type { MetadataRoute } from "next";
import { fallbackPlugins, fallbackPosts, fallbackProjects } from "@/lib/fallback-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.fighterplays.com";
  const staticRoutes = ["", "/about", "/projects", "/plugins", "/services", "/blog", "/contact", "/ecosystem"];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() })),
    ...fallbackProjects.map((project) => ({ url: `${base}/projects/${project.slug}`, lastModified: project.updatedAt })),
    ...fallbackPlugins.map((plugin) => ({ url: `${base}/plugins/${plugin.slug}`, lastModified: plugin.updatedAt })),
    ...fallbackPosts.map((post) => ({ url: `${base}/blog/${post.slug}`, lastModified: post.updatedAt }))
  ];
}
