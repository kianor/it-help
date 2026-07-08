import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAppointment, rateLimit } from "@/lib/db";
import { isValidSlot } from "@/lib/appointments";
import { mailAppointmentRequested, mailAppointmentToOwner } from "@/lib/mail";

const schema = z.object({
  slot: z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/),
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  service: z.string().trim().min(1).max(100),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  website: z.string().optional(), // honeypot
  lang: z.enum(["nl", "en", "fr"]).optional(),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "onbekend";
  if (!rateLimit(`afspraak:${ip}`, 3, 10 * 60 * 1000)) {
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
    return NextResponse.json({ error: "Kijk je gegevens even na." }, { status: 400 });
  }
  if (parsed.data.website) return NextResponse.json({ ok: true });

  // Slot moet uit het actuele schema komen én nog vrij zijn
  if (!isValidSlot(parsed.data.slot)) {
    return NextResponse.json({ error: "slot" }, { status: 409 });
  }

  const { slot, name, phone, email, service, message, lang } = parsed.data;
  const appointment = createAppointment({
    slot_start: slot,
    name,
    phone,
    email: email || undefined,
    service,
    message: message || undefined,
    lang,
  });

  await mailAppointmentToOwner(appointment);
  if (appointment.email) {
    await mailAppointmentRequested({
      email: appointment.email,
      name: appointment.name,
      slot_start: appointment.slot_start,
      service: appointment.service,
      lang: appointment.lang,
    });
  }

  return NextResponse.json({ ok: true });
}
