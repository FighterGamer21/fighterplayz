import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { fallbackPlugins, fallbackPosts, fallbackProjects, fallbackServices, fallbackSkills, fallbackTestimonials } from "../src/lib/fallback-data";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@fighterplays.com";
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name: "FighterPlayz Admin",
      email,
      passwordHash: await bcrypt.hash(password, 12),
      role: "ADMIN"
    }
  });

  for (const skill of fallbackSkills) {
    await prisma.skill.upsert({ where: { id: skill.id }, update: skill, create: skill });
  }
  for (const service of fallbackServices) {
    await prisma.service.upsert({ where: { slug: service.slug }, update: service, create: service });
  }
  for (const project of fallbackProjects) {
    await prisma.project.upsert({ where: { slug: project.slug }, update: project as any, create: project as any });
  }
  for (const plugin of fallbackPlugins) {
    await prisma.plugin.upsert({ where: { slug: plugin.slug }, update: plugin as any, create: plugin as any });
  }
  for (const testimonial of fallbackTestimonials) {
    await prisma.testimonial.upsert({ where: { id: testimonial.id }, update: testimonial, create: testimonial });
  }
  for (const post of fallbackPosts) {
    await prisma.blogPost.upsert({ where: { slug: post.slug }, update: post, create: post });
  }
  await prisma.siteSetting.upsert({
    where: { key: "brand" },
    update: { value: { name: "FighterPlayz", handle: "@fightergamerofficial1", domain: "https://www.fighterplays.com" } },
    create: { key: "brand", value: { name: "FighterPlayz", handle: "@fightergamerofficial1", domain: "https://www.fighterplays.com" } }
  });
}

main().finally(async () => prisma.$disconnect());
