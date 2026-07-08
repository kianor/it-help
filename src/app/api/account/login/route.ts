import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createLoginToken, rateLimit } from "@/lib/db";
import { mailMagicLink } from "@/lib/mail";
import { siteUrl } from "@/config/site";

const schema = z.object({
  email: z.string().trim().email().max(200),
  lang: z.enum(["nl", "en", "fr"]).optional(),
  website: z.string().optional(), // honeypot
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "onbekend";
  if (!rateLimit(`login:${ip}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json({ error: "Te veel pogingen." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Ongeldig e-mailadres." }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const lang = parsed.data.lang || "nl";
  const token = createLoginToken(parsed.data.email);
  const url = `${siteUrl()}/api/account/verify?token=${token}&lang=${lang}`;
  await mailMagicLink(parsed.data.email, url, lang);

  // Altijd ok teruggeven: zo valt niet af te leiden welke adressen bestaan.
  return NextResponse.json({ ok: true });
}
