import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid contact request" }, { status: 400 });
  const message = await prisma.contactMessage.create({ data: parsed.data });
  return NextResponse.json({ ok: true, id: message.id });
}
