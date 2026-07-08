import { Resend } from "resend";
import { site, siteUrl } from "@/config/site";

/**
 * Alle mails lopen via Resend, in de taal van de klant (nl/en/fr).
 * Zonder RESEND_API_KEY doet de site gewoon verder maar wordt de mail
 * alleen gelogd; zo breekt er nooit iets.
 */

type MailLang = "nl" | "en" | "fr";

function asLang(value: string | null | undefined): MailLang {
  return value === "en" || value === "fr" ? value : "nl";
}

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

function layout(body: string, footer: string): string {
  return `<!doctype html><html><body style="margin:0;background:#FAFAF7;font-family:Arial,Helvetica,sans-serif;color:#16324F;">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
    <div style="font-size:20px;font-weight:bold;margin-bottom:24px;">${site.name}<span style="color:#F26B1D;">.</span></div>
    <div style="background:#ffffff;border:1px solid #e3e6ea;border-radius:12px;padding:28px;line-height:1.6;font-size:15px;">
      ${body}
    </div>
    <div style="color:#8A94A6;font-size:12px;margin-top:20px;line-height:1.5;">
      ${site.name} · ${site.region}<br>
      ${footer}
    </div>
  </div>
</body></html>`;
}

const btn = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:#F26B1D;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:bold;margin:12px 0;">${label}</a>`;

const footers: Record<MailLang, string> = {
  nl: `Vragen? Bel of app ${site.phoneDisplay} of mail ${site.email}.`,
  en: `Questions? Call or WhatsApp ${site.phoneDisplay} or email ${site.email}.`,
  fr: `Des questions ? Appelez ou envoyez un WhatsApp au ${site.phoneDisplay} ou un mail à ${site.email}.`,
};

// ---------- mails naar Kiano (altijd Nederlands) ----------
export async function mailNewRequestToOwner(r: {
  name: string;
  phone: string;
  email?: string;
  service: string;
  message: string;
  lang?: string;
}) {
  const to = process.env.MAIL_TO;
  if (!to) return;
  await send(
    to,
    `Nieuwe aanvraag: ${r.service} — ${r.name}`,
    layout(
      `
      <h2 style="margin-top:0;">Nieuwe aanvraag via de site</h2>
      <p><strong>Naam:</strong> ${esc(r.name)}<br>
      <strong>Telefoon:</strong> ${esc(r.phone)}<br>
      <strong>E-mail:</strong> ${esc(r.email || "niet opgegeven")}<br>
      <strong>Dienst:</strong> ${esc(r.service)}<br>
      <strong>Taal van de klant:</strong> ${asLang(r.lang).toUpperCase()}</p>
      <p style="white-space:pre-wrap;border-left:3px solid #2450A8;padding-left:12px;">${esc(r.message)}</p>
      <p>Beloofd op de site: vandaag nog terugbellen of appen.</p>
      `,
      footers.nl
    )
  );
}

// ---------- bevestiging contactaanvraag ----------
export async function mailRequestConfirmation(email: string, name: string, lang?: string) {
  const l = asLang(lang);
  const t = {
    nl: {
      subject: "Goed ontvangen. Ik bel of app je vandaag nog terug.",
      body: `<h2 style="margin-top:0;">Dag ${esc(name)},</h2>
        <p>Je aanvraag is goed aangekomen. Ik bel of app je vandaag nog terug om alles af te spreken: wat er moet gebeuren en wat de vaste prijs wordt. Geen verrassingen.</p>
        <p>Dringend? Bel of app me gerust op <strong>${site.phoneDisplay}</strong>.</p>
        <p>Tot zo,<br>Kiano</p>`,
    },
    en: {
      subject: "Got it. I'll call or WhatsApp you back today.",
      body: `<h2 style="margin-top:0;">Hi ${esc(name)},</h2>
        <p>Your request arrived safely. I'll call or WhatsApp you back today to agree on everything: what needs to happen and what the fixed price will be. No surprises.</p>
        <p>Urgent? Feel free to call or WhatsApp me on <strong>${site.phoneDisplay}</strong>.</p>
        <p>Talk soon,<br>Kiano</p>`,
    },
    fr: {
      subject: "Bien reçu. Je vous rappelle ou vous écris aujourd'hui encore.",
      body: `<h2 style="margin-top:0;">Bonjour ${esc(name)},</h2>
        <p>Votre demande est bien arrivée. Je vous rappelle ou vous envoie un WhatsApp aujourd'hui encore pour tout convenir : ce qu'il faut faire et le prix fixe. Pas de surprises.</p>
        <p>C'est urgent ? Appelez-moi ou envoyez un WhatsApp au <strong>${site.phoneDisplay}</strong>.</p>
        <p>À tout de suite,<br>Kiano</p>`,
    },
  }[l];
  await send(email, t.subject, layout(t.body, footers[l]));
}

// ---------- herstelling aangemaakt (volgcode) ----------
export async function mailJobCreated(job: {
  customer_email: string;
  customer_name: string;
  device: string;
  service: string;
  code: string;
  price?: string | null;
  lang?: string;
}) {
  const l = asLang(job.lang);
  const url = `${siteUrl()}/${l}/volg?code=${encodeURIComponent(job.code)}`;
  const priceLine = {
    nl: job.price ? ` Afgesproken prijs: <strong>${esc(job.price)}</strong>. Daar blijft het bij.` : "",
    en: job.price ? ` Agreed price: <strong>${esc(job.price)}</strong>. That's what it stays.` : "",
    fr: job.price ? ` Prix convenu : <strong>${esc(job.price)}</strong>. On s'y tient.` : "",
  }[l];
  const t = {
    nl: {
      subject: `Je ${job.device} is bij mij binnen — volg de status online`,
      body: `<h2 style="margin-top:0;">Dag ${esc(job.customer_name)},</h2>
        <p>Je <strong>${esc(job.device)}</strong> is goed bij mij aangekomen voor: ${esc(job.service)}.${priceLine}</p>
        <p>Volg live hoe het ervoor staat met je volgcode <strong style="font-family:monospace;">${esc(job.code)}</strong>:</p>
        ${btn(url, "Volg je herstelling")}
        <p>Bij elke stap krijg je automatisch een mailtje.</p>
        <p>Groeten,<br>Kiano</p>`,
    },
    en: {
      subject: `Your ${job.device} is in — track its status online`,
      body: `<h2 style="margin-top:0;">Hi ${esc(job.customer_name)},</h2>
        <p>Your <strong>${esc(job.device)}</strong> arrived safely for: ${esc(job.service)}.${priceLine}</p>
        <p>Follow its progress live with your tracking code <strong style="font-family:monospace;">${esc(job.code)}</strong>:</p>
        ${btn(url, "Track your repair")}
        <p>You'll automatically get an email at every step.</p>
        <p>Best,<br>Kiano</p>`,
    },
    fr: {
      subject: `Votre ${job.device} est bien arrivé — suivez son état en ligne`,
      body: `<h2 style="margin-top:0;">Bonjour ${esc(job.customer_name)},</h2>
        <p>Votre <strong>${esc(job.device)}</strong> est bien arrivé pour : ${esc(job.service)}.${priceLine}</p>
        <p>Suivez l'avancement en direct avec votre code de suivi <strong style="font-family:monospace;">${esc(job.code)}</strong> :</p>
        ${btn(url, "Suivre votre réparation")}
        <p>Vous recevez automatiquement un mail à chaque étape.</p>
        <p>Cordialement,<br>Kiano</p>`,
    },
  }[l];
  await send(job.customer_email, t.subject, layout(t.body, footers[l]));
}

// ---------- statusupdate ----------
const statusLabels: Record<MailLang, Record<string, string>> = {
  nl: {
    ontvangen: "Ontvangen",
    "diagnose bezig": "Diagnose bezig",
    "wacht op onderdelen": "Wacht op onderdelen",
    "in herstel": "In herstel",
    "klaar voor ophaling": "Klaar voor ophaling",
    afgerond: "Afgerond",
  },
  en: {
    ontvangen: "Received",
    "diagnose bezig": "Diagnosis in progress",
    "wacht op onderdelen": "Waiting for parts",
    "in herstel": "Being repaired",
    "klaar voor ophaling": "Ready for pickup",
    afgerond: "Completed",
  },
  fr: {
    ontvangen: "Reçu",
    "diagnose bezig": "Diagnostic en cours",
    "wacht op onderdelen": "En attente de pièces",
    "in herstel": "En réparation",
    "klaar voor ophaling": "Prêt à récupérer",
    afgerond: "Terminé",
  },
};

export async function mailJobStatusUpdate(job: {
  customer_email: string;
  customer_name: string;
  device: string;
  code: string;
  status: string;
  message?: string | null;
  lang?: string;
}) {
  const l = asLang(job.lang);
  const url = `${siteUrl()}/${l}/volg?code=${encodeURIComponent(job.code)}`;
  const status = statusLabels[l][job.status] ?? job.status;
  const note = job.message
    ? `<p style="white-space:pre-wrap;border-left:3px solid #2450A8;padding-left:12px;">${esc(job.message)}</p>`
    : "";
  const t = {
    nl: {
      subject: `Update over je ${job.device}: ${status}`,
      body: `<h2 style="margin-top:0;">Dag ${esc(job.customer_name)},</h2>
        <p>Nieuwe status voor je <strong>${esc(job.device)}</strong>: <strong>${esc(status)}</strong>.</p>
        ${note}${btn(url, "Bekijk de volledige status")}
        <p>Groeten,<br>Kiano</p>`,
    },
    en: {
      subject: `Update on your ${job.device}: ${status}`,
      body: `<h2 style="margin-top:0;">Hi ${esc(job.customer_name)},</h2>
        <p>New status for your <strong>${esc(job.device)}</strong>: <strong>${esc(status)}</strong>.</p>
        ${note}${btn(url, "See the full status")}
        <p>Best,<br>Kiano</p>`,
    },
    fr: {
      subject: `Mise à jour de votre ${job.device} : ${status}`,
      body: `<h2 style="margin-top:0;">Bonjour ${esc(job.customer_name)},</h2>
        <p>Nouveau statut pour votre <strong>${esc(job.device)}</strong> : <strong>${esc(status)}</strong>.</p>
        ${note}${btn(url, "Voir le statut complet")}
        <p>Cordialement,<br>Kiano</p>`,
    },
  }[l];
  await send(job.customer_email, t.subject, layout(t.body, footers[l]));
}

// ---------- review-verzoek ----------
export async function mailReviewRequest(job: {
  customer_email: string;
  customer_name: string;
  device: string;
  lang?: string;
}) {
  const l = asLang(job.lang);
  const reviewUrl = site.googleReviewsUrl || siteUrl();
  const t = {
    nl: {
      subject: "Alles nog in orde met je toestel?",
      body: `<h2 style="margin-top:0;">Dag ${esc(job.customer_name)},</h2>
        <p>Hopelijk draait je ${esc(job.device)} weer zoals het hoort. Loopt er toch nog iets mis, laat het me zeker weten, dan kijk ik er gratis naar.</p>
        <p>Ben je tevreden? Een korte Google-review helpt mijn kleine zaak enorm vooruit. Het duurt maar een minuutje:</p>
        ${btn(reviewUrl, "Schrijf een review")}
        <p>Bedankt!<br>Kiano</p>`,
    },
    en: {
      subject: "Everything still working as it should?",
      body: `<h2 style="margin-top:0;">Hi ${esc(job.customer_name)},</h2>
        <p>Hopefully your ${esc(job.device)} is running the way it should again. If anything is still off, do let me know and I'll take a look for free.</p>
        <p>Happy with the result? A short Google review helps my small business enormously. It only takes a minute:</p>
        ${btn(reviewUrl, "Write a review")}
        <p>Thanks!<br>Kiano</p>`,
    },
    fr: {
      subject: "Tout fonctionne encore comme il faut ?",
      body: `<h2 style="margin-top:0;">Bonjour ${esc(job.customer_name)},</h2>
        <p>J'espère que votre ${esc(job.device)} tourne à nouveau comme il faut. Si quelque chose ne va pas, dites-le-moi et j'y jette un œil gratuitement.</p>
        <p>Vous êtes satisfait ? Un court avis Google aide énormément ma petite entreprise. Ça ne prend qu'une minute :</p>
        ${btn(reviewUrl, "Écrire un avis")}
        <p>Merci !<br>Kiano</p>`,
    },
  }[l];
  await send(job.customer_email, t.subject, layout(t.body, footers[l]));
}

// ---------- nieuwsbrief (dubbele opt-in) ----------
export async function mailNewsletterConfirm(email: string, token: string, lang?: string) {
  const l = asLang(lang);
  const url = `${siteUrl()}/${l}/nieuwsbrief/bevestig?token=${token}`;
  const t = {
    nl: {
      subject: "Bevestig je inschrijving",
      body: `<h2 style="margin-top:0;">Nog één klik</h2>
        <p>Je vroeg om af en toe tips en nieuws te ontvangen van ${site.name}. Klik hieronder om dat te bevestigen. Deed jij dit niet? Dan mag je deze mail gewoon negeren.</p>
        ${btn(url, "Ja, schrijf me in")}
        <p>Uitschrijven kan altijd met één klik onderaan elke mail.</p>`,
    },
    en: {
      subject: "Confirm your subscription",
      body: `<h2 style="margin-top:0;">One more click</h2>
        <p>You asked to receive occasional tips and news from ${site.name}. Click below to confirm. Wasn't you? Then simply ignore this email.</p>
        ${btn(url, "Yes, sign me up")}
        <p>You can unsubscribe anytime with one click at the bottom of every email.</p>`,
    },
    fr: {
      subject: "Confirmez votre inscription",
      body: `<h2 style="margin-top:0;">Encore un clic</h2>
        <p>Vous avez demandé à recevoir de temps en temps des conseils et des nouvelles de ${site.name}. Cliquez ci-dessous pour confirmer. Ce n'était pas vous ? Ignorez simplement ce mail.</p>
        ${btn(url, "Oui, inscrivez-moi")}
        <p>Désinscription à tout moment en un clic au bas de chaque mail.</p>`,
    },
  }[l];
  await send(email, t.subject, layout(t.body, footers[l]));
}

function esc(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
