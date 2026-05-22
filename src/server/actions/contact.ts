"use server";

import { contactSchema } from "@/lib/validators";

export async function createContactMessage(input: unknown) {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid contact request" };
  const { getPrisma } = await import("@/lib/prisma");
  const prisma = await getPrisma();
  const message = await prisma.contactMessage.create({ data: parsed.data });
  return { ok: true, id: message.id };
}
