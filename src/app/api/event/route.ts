import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { z } from "zod";
import { recordEvent } from "@/lib/db";
import { getAuthSecret } from "@/lib/auth";
import { EVENT_NAMES } from "@/lib/events";

export const dynamic = "force-dynamic";

// Cookievrije event-registratie (zelfde privacy-aanpak als /api/hit).
// Alleen events uit de whitelist worden aanvaard; zie docs/TRACKING.md.

const schema = z.object({
  name: z.enum(EVENT_NAMES),
  label: z.string().max(100).optional(),
  value: z.number().int().min(0).max(1_000_000).optional(),
  path: z.string().max(200).optional(),
  lang: z.string().max(5).optional(),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: true });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: true });
  if (parsed.data.path?.startsWith("/admin")) return NextResponse.json({ ok: true });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "onbekend";
  const ua = req.headers.get("user-agent") || "";
  const day = new Date().toISOString().slice(0, 10);
  const salt = Buffer.from(getAuthSecret()).toString("hex");
  const visitor = crypto.createHash("sha256").update(`${day}|${salt}|${ip}|${ua}`).digest("hex").slice(0, 16);

  recordEvent({ ...parsed.data, visitor });
  return NextResponse.json({ ok: true });
}
