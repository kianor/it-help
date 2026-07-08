import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, upsertSubscriber } from "@/lib/db";
import { mailNewsletterConfirm } from "@/lib/mail";

const schema = z.object({
  email: z.string().trim().email().max(200),
  website: z.string().optional(), // honeypot
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "onbekend";
  if (!rateLimit(`newsletter:${ip}`, 3, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Te veel pogingen." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Ongeldig e-mailadres." }, { status: 400 });
  }
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const sub = upsertSubscriber(parsed.data.email);
  // Dubbele opt-in: pas na klik op de mail-link staat de inschrijving vast.
  if (!sub.confirmed_at) {
    await mailNewsletterConfirm(sub.email, sub.token);
  }

  return NextResponse.json({ ok: true });
}
