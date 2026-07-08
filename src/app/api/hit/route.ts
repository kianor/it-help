import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { recordHit } from "@/lib/db";
import { getAuthSecret } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * Bezoekersteller. Unieke bezoekers worden geteld via een hash van
 * ip + user-agent + een dagelijks wisselende salt: niet herleidbaar tot een
 * persoon en na een dag onbruikbaar (zelfde aanpak als Plausible/Umami).
 */
export async function POST(req: NextRequest) {
  let body: { path?: string; lang?: string; ref?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: true });
  }
  const path = typeof body.path === "string" ? body.path : "";
  if (!path.startsWith("/") || path.startsWith("/admin") || path.startsWith("/api")) {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "onbekend";
  const ua = req.headers.get("user-agent") || "";
  const day = new Date().toISOString().slice(0, 10);
  const salt = Buffer.from(getAuthSecret()).toString("hex");
  const visitor = crypto.createHash("sha256").update(`${day}|${salt}|${ip}|${ua}`).digest("hex").slice(0, 16);
  const device = /mobile|android|iphone|ipad/i.test(ua) ? "mobiel" : "desktop";

  let ref = "";
  try {
    if (body.ref) {
      const url = new URL(body.ref);
      // Interne navigatie niet als verwijzer tellen
      if (url.host !== req.nextUrl.host) ref = url.host;
    }
  } catch {}

  recordHit({ path, lang: typeof body.lang === "string" ? body.lang.slice(0, 5) : undefined, ref, device, visitor });
  return NextResponse.json({ ok: true });
}
