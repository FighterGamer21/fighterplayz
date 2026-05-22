import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid contact request" }, { status: 400 });
  const { getPrisma } = await import("@/lib/prisma");
  const prisma = await getPrisma();
  const message = await prisma.contactMessage.create({ data: parsed.data });
  return NextResponse.json({ ok: true, id: message.id });
}
