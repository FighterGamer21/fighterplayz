import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    app: "FighterPlayz Ecosystem",
    runtime: "vercel-ready"
  });
}
