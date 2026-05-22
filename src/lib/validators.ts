import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  discord: z.string().max(80).optional().or(z.literal("")),
  subject: z.string().min(4).max(140),
  projectType: z.string().max(80).optional().or(z.literal("")),
  budgetRange: z.string().max(80).optional().or(z.literal("")),
  message: z.string().min(20).max(4000)
});

export const projectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  shortDescription: z.string().min(8),
  fullDescription: z.string().min(20),
  category: z.string().min(2),
  status: z.enum(["CONCEPT", "ACTIVE", "MAINTAINED", "ARCHIVED"]).default("ACTIVE"),
  image: z.string().optional().or(z.literal("")),
  gallery: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  sortOrder: z.coerce.number().default(0),
  problemSolved: z.string().optional(),
  features: z.array(z.string()).default([]),
  developmentNotes: z.string().optional(),
  outcome: z.string().optional()
});

export const pluginSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  tagline: z.string().min(4),
  description: z.string().min(20),
  version: z.string().min(1),
  supportedVersions: z.array(z.string()).default([]),
  pluginType: z.string().min(2),
  priceType: z.string().default("Free"),
  price: z.coerce.number().optional().nullable(),
  downloadUrl: z.string().url().optional().or(z.literal("")),
  spigotUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  docsUrl: z.string().url().optional().or(z.literal("")),
  image: z.string().optional().or(z.literal("")),
  gallery: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  commands: z.array(z.record(z.string())).default([]),
  permissions: z.array(z.record(z.string())).default([]),
  dependencies: z.array(z.string()).default([]),
  configExample: z.string().optional(),
  changelog: z.array(z.record(z.string())).default([]),
  featured: z.boolean().default(false),
  status: z.enum(["CONCEPT", "ACTIVE", "MAINTAINED", "ARCHIVED"]).default("ACTIVE")
});

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});
