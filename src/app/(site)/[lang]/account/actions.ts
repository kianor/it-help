"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearCustomerCookie, customerEmail } from "@/lib/auth";
import { getDb, getSubscriberByEmail, upsertSubscriber } from "@/lib/db";
import { p } from "@/i18n/slugs.mjs";
import { isLocale } from "@/i18n/config";

export async function logoutCustomerAction(formData: FormData) {
  const langRaw = String(formData.get("lang") || "nl");
  const lang = isLocale(langRaw) ? langRaw : "nl";
  clearCustomerCookie();
  redirect(p(lang, "account"));
}

/** Nieuwsbrief aan/uit voor de ingelogde klant. Ingelogd = geverifieerd adres, dus directe opt-in. */
export async function toggleNewsletterAction(formData: FormData) {
  const email = await customerEmail();
  if (!email) return;
  const langRaw = String(formData.get("lang") || "nl");
  const lang = isLocale(langRaw) ? langRaw : "nl";

  const existing = getSubscriberByEmail(email);
  const isActive = existing && existing.confirmed_at && !existing.unsubscribed_at;
  if (isActive) {
    getDb()
      .prepare("UPDATE subscribers SET unsubscribed_at = datetime('now') WHERE lower(email) = lower(?)")
      .run(email);
  } else {
    upsertSubscriber(email, lang);
    getDb()
      .prepare("UPDATE subscribers SET confirmed_at = coalesce(confirmed_at, datetime('now')), unsubscribed_at = NULL WHERE lower(email) = lower(?)")
      .run(email);
  }
  revalidatePath(p(lang, "account"));
}
