"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";
import {
  addJobUpdate,
  createJob,
  deleteGalleryItem,
  deletePromo,
  deleteReview,
  getAppointment,
  getJobById,
  insertGalleryItem,
  insertReview,
  listConfirmedSubscribers,
  logCampaign,
  markReviewRequested,
  rateLimit,
  savePromo,
  setAppointmentStatus,
  setRequestStatus,
  setSetting,
  toggleReview,
  UPLOADS_DIR,
} from "@/lib/db";
import {
  checkAdminPassword,
  clearSessionCookie,
  isAdmin,
  setSessionCookie,
} from "@/lib/auth";
import {
  mailAppointmentConfirmed,
  mailCampaign,
  mailJobCreated,
  mailJobStatusUpdate,
  mailReviewRequest,
} from "@/lib/mail";
import { siteUrl } from "@/config/site";
import { locales } from "@/i18n/config";
import { p as pagePath } from "@/i18n/slugs.mjs";

/** Revalideert een publieke pagina in alle talen (ISR-cache verversen). */
function revalidatePublic(page: "" | "consoles") {
  for (const lang of locales) revalidatePath(pagePath(lang, page));
}

/** De actie-balk staat op elke pagina: bij promo-wijzigingen alles verversen. */
const PUBLIC_PAGES = ["", "pc-bouwen", "herstel", "consoles", "voor-zaken", "prijzen", "contact", "privacy", "voorwaarden"] as const;
function revalidateAllPublic() {
  for (const lang of locales) {
    for (const page of PUBLIC_PAGES) revalidatePath(pagePath(lang, page as never));
  }
}

async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

// ---------- login / logout ----------
export async function loginAction(
  _prev: { error: string } | undefined,
  formData: FormData
): Promise<{ error: string } | undefined> {
  const password = String(formData.get("password") || "");
  if (!rateLimit("admin-login", 10, 15 * 60 * 1000)) {
    return { error: "Te veel pogingen. Probeer over een kwartier opnieuw." };
  }
  if (!process.env.ADMIN_PASSWORD) {
    return {
      error:
        "ADMIN_PASSWORD is niet ingesteld op de server. Zet die in .env en herstart.",
    };
  }
  if (!checkAdminPassword(password)) {
    return { error: "Verkeerd wachtwoord." };
  }
  await setSessionCookie();
  redirect("/admin");
}

export async function logoutAction() {
  clearSessionCookie();
  redirect("/admin/login");
}

// ---------- aanvragen ----------
export async function markRequestAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status") || "behandeld");
  if (id) setRequestStatus(id, status);
  revalidatePath("/admin");
}

// ---------- herstellingen ----------
export async function createJobAction(formData: FormData) {
  await requireAdmin();
  const customer_name = String(formData.get("customer_name") || "").trim();
  const device = String(formData.get("device") || "").trim();
  const service = String(formData.get("service") || "").trim();
  if (!customer_name || !device || !service) return;

  const langRaw = String(formData.get("lang") || "nl");
  const job = createJob({
    customer_name,
    customer_email: String(formData.get("customer_email") || "").trim() || undefined,
    customer_phone: String(formData.get("customer_phone") || "").trim() || undefined,
    device,
    service,
    price: String(formData.get("price") || "").trim() || undefined,
    lang: ["nl", "en", "fr"].includes(langRaw) ? langRaw : "nl",
  });

  if (job.customer_email) {
    await mailJobCreated({
      customer_email: job.customer_email,
      customer_name: job.customer_name,
      device: job.device,
      service: job.service,
      code: job.code,
      price: job.price,
      lang: job.lang,
    });
  }
  revalidatePath("/admin/herstellingen");
  redirect(`/admin/herstellingen/${job.id}`);
}

export async function updateJobStatusAction(formData: FormData) {
  await requireAdmin();
  const jobId = Number(formData.get("job_id"));
  const status = String(formData.get("status") || "").trim();
  const message = String(formData.get("message") || "").trim();
  if (!jobId || !status) return;

  const photo = formData.get("photo");
  let photoFile: string | undefined;
  if (photo instanceof File && photo.size > 0) {
    photoFile = (await saveUpload(photo)) || undefined;
  }

  addJobUpdate(jobId, status, message || undefined, photoFile);

  const job = getJobById(jobId);
  if (job?.customer_email) {
    await mailJobStatusUpdate({
      customer_email: job.customer_email,
      customer_name: job.customer_name,
      device: job.device,
      code: job.code,
      status,
      message: message || undefined,
      lang: job.lang,
    });
  }
  revalidatePath(`/admin/herstellingen/${jobId}`);
  revalidatePath("/admin/herstellingen");
}

export async function requestReviewAction(formData: FormData) {
  await requireAdmin();
  const jobId = Number(formData.get("job_id"));
  const job = jobId ? getJobById(jobId) : undefined;
  if (!job?.customer_email) return;
  await mailReviewRequest({
    customer_email: job.customer_email,
    customer_name: job.customer_name,
    device: job.device,
    lang: job.lang,
  });
  markReviewRequested(job.id);
  revalidatePath(`/admin/herstellingen/${job.id}`);
}

// ---------- galerij ----------
const IMG_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};
const MAX_IMG_BYTES = 8 * 1024 * 1024;

/**
 * Foto's van telefoons zijn vaak 4-12 MB; op de site is dat pure ballast.
 * Elke upload wordt daarom geschaald naar max 1600px en als WebP (~80%)
 * bewaard: doorgaans 90-98% kleiner zonder zichtbaar verlies.
 */
async function saveUpload(file: File): Promise<string | null> {
  if (!IMG_TYPES[file.type] || file.size === 0 || file.size > MAX_IMG_BYTES) return null;
  const name = `${crypto.randomBytes(12).toString("hex")}.webp`;
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  try {
    const optimized = await sharp(Buffer.from(await file.arrayBuffer()))
      .rotate() // EXIF-oriëntatie toepassen
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
    fs.writeFileSync(path.join(UPLOADS_DIR, name), optimized);
    return name;
  } catch {
    return null; // corrupt bestand: stil weigeren
  }
}

export async function addGalleryAction(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") || "").trim();
  const before = formData.get("before");
  const after = formData.get("after");
  if (!title || !(before instanceof File) || !(after instanceof File)) return;

  const beforeFile = await saveUpload(before);
  const afterFile = await saveUpload(after);
  if (!beforeFile || !afterFile) return;

  insertGalleryItem(title, beforeFile, afterFile);
  revalidatePath("/admin/galerij");
  revalidatePublic("consoles");
}

export async function deleteGalleryAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (!id) return;
  const item = deleteGalleryItem(id);
  for (const f of [item?.before_file, item?.after_file]) {
    if (!f) continue;
    const p = path.join(UPLOADS_DIR, path.basename(f));
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }
  revalidatePath("/admin/galerij");
  revalidatePublic("consoles");
}


// ---------- reviews ----------
export async function addReviewAction(formData: FormData) {
  await requireAdmin();
  const author = String(formData.get("author") || "").trim();
  const text = String(formData.get("text") || "").trim();
  const rating = Number(formData.get("rating")) || 5;
  const source = String(formData.get("source") || "Trustpilot").trim();
  if (!author || !text) return;
  insertReview({ author, rating, text, source });
  revalidatePath("/admin/reviews");
  revalidatePublic("");
}

export async function toggleReviewAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (id) toggleReview(id);
  revalidatePath("/admin/reviews");
  revalidatePublic("");
}

export async function deleteReviewAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (id) deleteReview(id);
  revalidatePath("/admin/reviews");
  revalidatePublic("");
}

// ---------- afspraken ----------
export async function setAppointmentStatusAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status") || "");
  if (!id || !["aangevraagd", "bevestigd", "geannuleerd"].includes(status)) return;
  setAppointmentStatus(id, status);
  const appointment = getAppointment(id);
  if (status === "bevestigd" && appointment?.email) {
    await mailAppointmentConfirmed({
      email: appointment.email,
      name: appointment.name,
      slot_start: appointment.slot_start,
      service: appointment.service,
      lang: appointment.lang,
    });
  }
  revalidatePath("/admin/afspraken");
}

export async function saveAvailabilityAction(formData: FormData) {
  await requireAdmin();
  const keys = [
    "appt_slot_minutes", "appt_lead_hours", "appt_horizon_days", "appt_blocked",
    "appt_hours_mon", "appt_hours_tue", "appt_hours_wed", "appt_hours_thu",
    "appt_hours_fri", "appt_hours_sat", "appt_hours_sun",
  ];
  for (const key of keys) {
    const value = formData.get(key);
    if (value !== null) setSetting(key, String(value).trim());
  }
  revalidatePath("/admin/afspraken");
}

// ---------- acties (promo's) ----------
export async function savePromoAction2(formData: FormData) {
  await requireAdmin();
  const totalRaw = String(formData.get("total") || "").trim();
  savePromo({
    id: Number(formData.get("id")) || undefined,
    text_nl: String(formData.get("text_nl") || "").trim(),
    text_en: String(formData.get("text_en") || "").trim(),
    text_fr: String(formData.get("text_fr") || "").trim(),
    active: formData.get("active") === "on",
    total: totalRaw === "" ? null : Math.max(0, Number(totalRaw) || 0),
    used: Math.max(0, Number(formData.get("used")) || 0),
  });
  revalidatePath("/admin/acties");
  revalidateAllPublic();
}

export async function deletePromoAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (id) deletePromo(id);
  revalidatePath("/admin/acties");
  revalidateAllPublic();
}

// ---------- instellingen: video's ----------
export async function saveVideosAction(formData: FormData) {
  await requireAdmin();
  setSetting("social_videos", String(formData.get("social_videos") || "").trim());
  revalidatePath("/admin/instellingen");
  revalidatePublic("");
}

// ---------- nieuwsbrief versturen ----------
export async function sendCampaignAction(
  _prev: { done?: number; error?: string } | undefined,
  formData: FormData
): Promise<{ done?: number; error?: string }> {
  await requireAdmin();
  const subject = String(formData.get("subject") || "").trim();
  const bodyText = String(formData.get("body") || "").trim();
  const langFilter = String(formData.get("lang_filter") || "all");
  if (!subject || !bodyText) return { error: "Vul onderwerp en tekst in." };
  if (!process.env.RESEND_API_KEY) {
    return { error: "RESEND_API_KEY ontbreekt: er kunnen geen mails uit." };
  }

  const subscribers = listConfirmedSubscribers(langFilter);
  if (subscribers.length === 0) return { error: "Geen bevestigde inschrijvingen voor deze selectie." };

  let sent = 0;
  for (const sub of subscribers) {
    const unsubscribeUrl = `${siteUrl()}/${sub.lang}/nieuwsbrief/uitschrijven?token=${sub.token}`;
    await mailCampaign(sub.email, subject, bodyText, unsubscribeUrl, sub.lang);
    sent++;
  }
  logCampaign(subject, bodyText, langFilter, sent);
  revalidatePath("/admin/nieuwsbrief");
  return { done: sent };
}
