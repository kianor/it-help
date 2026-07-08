import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { insertRequest, rateLimit } from "@/lib/db";
import { mailNewRequestToOwner, mailRequestConfirmation } from "@/lib/mail";

const schema = z.object({
  name: z.string().trim().min(2, "Vul je naam in.").max(100),
  phone: z.string().trim().min(6, "Vul een geldig telefoonnummer in.").max(30),
  email: z.string().trim().email("Vul een geldig e-mailadres in.").max(200).optional().or(z.literal("")),
  service: z.string().trim().min(1).max(100),
  message: z.string().trim().min(5, "Schrijf kort waarover het gaat.").max(3000),
  website: z.string().optional(), // honeypot
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "onbekend";
  if (!rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Te veel aanvragen na elkaar. Bel of app me gerust rechtstreeks." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Kijk je gegevens even na." },
      { status: 400 }
    );
  }

  // Honeypot ingevuld → doe alsof alles ok is, maar bewaar niets.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { name, phone, email, service, message } = parsed.data;
  insertRequest({ name, phone, email: email || undefined, service, message });

  await mailNewRequestToOwner({ name, phone, email: email || undefined, service, message });
  if (email) await mailRequestConfirmation(email, name);

  return NextResponse.json({ ok: true });
}
