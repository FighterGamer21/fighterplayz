"use server";

import { contactSchema } from "@/lib/validators";

export async function createContactMessage(input: unknown) {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid contact request" };
  const { prisma } = await import("@/lib/prisma");
  const message = await prisma.contactMessage.create({ data: parsed.data });
  return { ok: true, id: message.id };
}
