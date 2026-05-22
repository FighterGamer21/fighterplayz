import { createRequire } from "node:module";

type PrismaInstance = any;

const globalForPrisma = globalThis as unknown as { prisma?: PrismaInstance };
const require = createRequire(import.meta.url);
const { PrismaClient } = require("@prisma/client");

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
