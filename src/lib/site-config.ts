import { site } from "@/config/site";
import { getSetting } from "./db";

/**
 * Zaakgegevens, bewerkbaar via admin → Instellingen. De waarden in
 * src/config/site.ts zijn de defaults; een niet-lege waarde in de
 * settings-tabel wint. Server-only (leest SQLite) — client components
 * krijgen de waarden als props aangereikt.
 */
export type SiteConfig = {
  name: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  region: string;
  address: string;
  kbo: string;
  googleReviewsUrl: string;
  trustpilotUrl: string;
  socials: { instagram: string; tiktok: string; youtube: string; facebook: string };
  /** mails aan Kiano (contactaanvragen, afspraakverzoeken); fallback: env MAIL_TO */
  mailTo: string;
  /** afzender voor klantmails; fallback: env MAIL_FROM */
  mailFrom: string;
};

const or = (key: string, fallback: string) => getSetting(key)?.trim() || fallback;

export function getSite(): SiteConfig {
  return {
    name: site.name,
    tagline: site.tagline,
    phone: or("site_phone", site.phone),
    phoneDisplay: or("site_phone_display", site.phoneDisplay),
    whatsapp: or("site_whatsapp", site.whatsapp),
    email: or("site_email", site.email),
    region: site.region,
    address: site.address,
    kbo: or("site_kbo", site.kbo),
    googleReviewsUrl: or("site_google_reviews", site.googleReviewsUrl),
    trustpilotUrl: or("site_trustpilot", site.trustpilotUrl),
    socials: {
      instagram: or("site_instagram", site.socials.instagram),
      tiktok: or("site_tiktok", site.socials.tiktok),
      youtube: or("site_youtube", site.socials.youtube),
      facebook: or("site_facebook", site.socials.facebook),
    },
    mailTo: or("mail_to", process.env.MAIL_TO || ""),
    mailFrom: or("mail_from", process.env.MAIL_FROM || ""),
  };
}
