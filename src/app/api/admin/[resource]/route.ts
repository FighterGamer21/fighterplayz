import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resourceMap, type ResourceName } from "@/lib/admin-resources";

function repo(resource: string) {
  const config = resourceMap[resource as ResourceName];
  if (!config) return null;
  return { config, model: (prisma as any)[config.model] };
}

export async function GET(_: Request, { params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  const item = repo(resource);
  if (!item) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  const data = await item.model.findMany({ orderBy: { id: "desc" } }).catch(() => item.model.findMany());
  return NextResponse.json(data);
}

export async function POST(request: Request, { params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  const item = repo(resource);
  if (!item) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  const parsed = item.config.schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const data = await item.model.create({ data: parsed.data });
  return NextResponse.json(data);
}
