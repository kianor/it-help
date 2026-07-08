import { Resend } from "resend";
import { site, siteUrl } from "@/config/site";

/**
 * Alle mails lopen via Resend. Zonder RESEND_API_KEY doet de site gewoon
 * verder maar wordt de mail alleen gelogd; zo breekt er nooit iets.
 */

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

async function send(to: string, subject: string, html: string) {
  const resend = getResend();
  const from = process.env.MAIL_FROM || `${site.name} <onboarding@resend.dev>`;
  if (!resend) {
    console.log(`[mail] RESEND_API_KEY ontbreekt — mail niet verstuurd: "${subject}" naar ${to}`);
    return;
  }
  try {
    await resend.emails.send({ from, to, subject, html });
  } catch (err) {
    // Mail mag nooit een klantactie doen mislukken.
    console.error("[mail] versturen mislukt:", err);
  }
}

function layout(body: string): string {
  return `<!doctype html><html lang="nl"><body style="margin:0;background:#FAFAF7;font-family:Arial,Helvetica,sans-serif;color:#16324F;">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
    <div style="font-size:20px;font-weight:bold;margin-bottom:24px;">${site.name}</div>
    <div style="background:#ffffff;border:1px solid #e3e6ea;border-radius:12px;padding:28px;line-height:1.6;font-size:15px;">
      ${body}
    </div>
    <div style="color:#8A94A6;font-size:12px;margin-top:20px;line-height:1.5;">
      ${site.name} · ${site.region}<br>
      Vragen? Bel of app ${site.phoneDisplay} of mail ${site.email}.
    </div>
  </div>
</body></html>`;
}

const btn = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:#F26B1D;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:bold;margin:12px 0;">${label}</a>`;

// ---------- mails naar Kiano ----------
export async function mailNewRequestToOwner(r: {
  name: string;
  phone: string;
  email?: string;
  service: string;
  message: string;
}) {
  const to = process.env.MAIL_TO;
  if (!to) return;
  await send(
    to,
    `Nieuwe aanvraag: ${r.service} — ${r.name}`,
    layout(`
      <h2 style="margin-top:0;">Nieuwe aanvraag via de site</h2>
      <p><strong>Naam:</strong> ${esc(r.name)}<br>
      <strong>Telefoon:</strong> ${esc(r.phone)}<br>
      <strong>E-mail:</strong> ${esc(r.email || "niet opgegeven")}<br>
      <strong>Dienst:</strong> ${esc(r.service)}</p>
      <p style="white-space:pre-wrap;border-left:3px solid #2450A8;padding-left:12px;">${esc(r.message)}</p>
      <p>Beloofd op de site: vandaag nog terugbellen of appen.</p>
    `)
  );
}

// ---------- mails naar klant ----------
export async function mailRequestConfirmation(email: string, name: string) {
  await send(
    email,
    "Goed ontvangen. Ik bel of app je vandaag nog terug.",
    layout(`
      <h2 style="margin-top:0;">Dag ${esc(name)},</h2>
      <p>Je aanvraag is goed aangekomen. Ik bel of app je vandaag nog terug om alles af te spreken: wat er moet gebeuren en wat de vaste prijs wordt. Geen verrassingen.</p>
      <p>Dringend? Bel of app me gerust op <strong>${site.phoneDisplay}</strong>.</p>
      <p>Tot zo,<br>Kiano</p>
    `)
  );
}

export async function mailJobCreated(job: {
  customer_email: string;
  customer_name: string;
  device: string;
  service: string;
  code: string;
  price?: string | null;
}) {
  const url = `${siteUrl()}/volg?code=${encodeURIComponent(job.code)}`;
  await send(
    job.customer_email,
    `Je ${job.device} is bij mij binnen — volg de status online`,
    layout(`
      <h2 style="margin-top:0;">Dag ${esc(job.customer_name)},</h2>
      <p>Je <strong>${esc(job.device)}</strong> is goed bij mij aangekomen voor: ${esc(job.service)}.${job.price ? ` Afgesproken prijs: <strong>${esc(job.price)}</strong>. Daar blijft het bij.` : ""}</p>
      <p>Volg live hoe het ervoor staat met je volgcode <strong style="font-family:monospace;">${esc(job.code)}</strong>:</p>
      ${btn(url, "Volg je herstelling")}
      <p>Bij elke stap krijg je automatisch een mailtje.</p>
      <p>Groeten,<br>Kiano</p>
    `)
  );
}

export async function mailJobStatusUpdate(job: {
  customer_email: string;
  customer_name: string;
  device: string;
  code: string;
  status: string;
  message?: string | null;
}) {
  const url = `${siteUrl()}/volg?code=${encodeURIComponent(job.code)}`;
  await send(
    job.customer_email,
    `Update over je ${job.device}: ${job.status}`,
    layout(`
      <h2 style="margin-top:0;">Dag ${esc(job.customer_name)},</h2>
      <p>Nieuwe status voor je <strong>${esc(job.device)}</strong>: <strong>${esc(job.status)}</strong>.</p>
      ${job.message ? `<p style="white-space:pre-wrap;border-left:3px solid #2450A8;padding-left:12px;">${esc(job.message)}</p>` : ""}
      ${btn(url, "Bekijk de volledige status")}
      <p>Groeten,<br>Kiano</p>
    `)
  );
}

export async function mailReviewRequest(job: {
  customer_email: string;
  customer_name: string;
  device: string;
}) {
  const reviewUrl = site.googleReviewsUrl || siteUrl();
  await send(
    job.customer_email,
    "Alles nog in orde met je toestel?",
    layout(`
      <h2 style="margin-top:0;">Dag ${esc(job.customer_name)},</h2>
      <p>Hopelijk draait je ${esc(job.device)} weer zoals het hoort. Loopt er toch nog iets mis, laat het me zeker weten, dan kijk ik er gratis naar.</p>
      <p>Ben je tevreden? Een korte Google-review helpt mijn kleine zaak enorm vooruit. Het duurt maar een minuutje:</p>
      ${btn(reviewUrl, "Schrijf een review")}
      <p>Bedankt!<br>Kiano</p>
    `)
  );
}

// ---------- nieuwsbrief ----------
export async function mailNewsletterConfirm(email: string, token: string) {
  const url = `${siteUrl()}/nieuwsbrief/bevestig?token=${token}`;
  await send(
    email,
    "Bevestig je inschrijving",
    layout(`
      <h2 style="margin-top:0;">Nog één klik</h2>
      <p>Je vroeg om af en toe tips en nieuws te ontvangen van ${site.name}. Klik hieronder om dat te bevestigen. Deed jij dit niet? Dan mag je deze mail gewoon negeren.</p>
      ${btn(url, "Ja, schrijf me in")}
      <p>Uitschrijven kan altijd met één klik onderaan elke mail.</p>
    `)
  );
}

function esc(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
