import { z } from "zod";
import { pluginSchema, projectSchema } from "@/lib/validators";

export const resourceMap = {
  projects: { model: "project", schema: projectSchema },
  plugins: { model: "plugin", schema: pluginSchema },
  skills: { model: "skill", schema: z.object({ name: z.string(), category: z.string(), level: z.coerce.number(), icon: z.string().optional(), description: z.string(), sortOrder: z.coerce.number().default(0) }) },
  services: { model: "service", schema: z.object({ title: z.string(), slug: z.string(), description: z.string(), features: z.array(z.string()).default([]), icon: z.string().optional(), startingPrice: z.string().optional(), active: z.boolean().default(true) }) },
  testimonials: { model: "testimonial", schema: z.object({ name: z.string(), role: z.string(), message: z.string(), avatar: z.string().optional(), rating: z.coerce.number().default(5), approved: z.boolean().default(false) }) },
  blog: { model: "blogPost", schema: z.object({ title: z.string(), slug: z.string(), excerpt: z.string(), content: z.string(), coverImage: z.string().optional(), tags: z.array(z.string()).default([]), published: z.boolean().default(false) }) },
  settings: { model: "siteSetting", schema: z.object({ key: z.string(), value: z.any() }) }
} as const;

export type ResourceName = keyof typeof resourceMap;
