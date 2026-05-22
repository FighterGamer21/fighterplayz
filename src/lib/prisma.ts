type PrismaInstance = any;

const globalForPrisma = globalThis as unknown as { prisma?: PrismaInstance };

export async function getPrisma() {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  const prismaModule = await import("@prisma/client");
  const prisma = new prismaModule.PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
  return prisma;
}
