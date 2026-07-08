"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import {
  addJobUpdate,
  createJob,
  deleteGalleryItem,
  getJobById,
  insertGalleryItem,
  markReviewRequested,
  rateLimit,
  setRequestStatus,
  setSetting,
  UPLOADS_DIR,
} from "@/lib/db";
import {
  checkAdminPassword,
  clearSessionCookie,
  isAdmin,
  setSessionCookie,
} from "@/lib/auth";
import {
  mailJobCreated,
  mailJobStatusUpdate,
  mailReviewRequest,
} from "@/lib/mail";

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

  addJobUpdate(jobId, status, message || undefined);

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

async function saveUpload(file: File): Promise<string | null> {
  const ext = IMG_TYPES[file.type];
  if (!ext || file.size === 0 || file.size > MAX_IMG_BYTES) return null;
  const name = `${crypto.randomBytes(12).toString("hex")}${ext}`;
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  const buf = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(UPLOADS_DIR, name), buf);
  return name;
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
  revalidatePath("/consoles");
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
  revalidatePath("/consoles");
}

// ---------- instellingen ----------
export async function savePromoAction(formData: FormData) {
  await requireAdmin();
  const active = formData.get("active") === "on";
  const total = Math.max(0, Number(formData.get("total")) || 0);
  const used = Math.max(0, Number(formData.get("used")) || 0);
  setSetting("promo_active", active ? "1" : "0");
  setSetting("promo_total", String(total));
  setSetting("promo_used", String(used));
  revalidatePath("/admin/instellingen");
}
