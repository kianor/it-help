import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { locales, htmlLang } from "@/i18n/config";
import { p, type PageKey } from "@/i18n/slugs.mjs";

/**
 * Prioriteit en werkelijke wijzigingsfrequentie per paginatype:
 * - home (1.0, weekly): acties, reviews en video's wisselen regelmatig
 * - diensten-hubs en prijzen (0.8, monthly): aanbod en tarieven
 * - conversiepagina's contact/afspraak (0.8): contact wijzigt zelden
 *   (yearly), afspraak toont het aanbod dus monthly
 * - juridisch (0.3, yearly): vrijwel statisch, laag crawl-belang
 *
 * Bewust NIET in de sitemap (noindex): /volg, /account, /nieuwsbrief —
 * die staan ook uitgesloten in robots.ts en per-pagina metadata.
 */
type Entry = { page: PageKey | ""; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" };

const entries: Entry[] = [
  { page: "", priority: 1.0, changeFrequency: "weekly" },
  { page: "pc-bouwen", priority: 0.8, changeFrequency: "monthly" },
  { page: "herstel", priority: 0.8, changeFrequency: "monthly" },
  { page: "consoles", priority: 0.8, changeFrequency: "monthly" },
  { page: "voor-zaken", priority: 0.8, changeFrequency: "monthly" },
  { page: "prijzen", priority: 0.8, changeFrequency: "monthly" },
  { page: "afspraak", priority: 0.8, changeFrequency: "monthly" },
  { page: "contact", priority: 0.8, changeFrequency: "yearly" },
  { page: "privacy", priority: 0.3, changeFrequency: "yearly" },
  { page: "voorwaarden", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const lastModified = new Date(); // buildmoment: inhoud wijzigt alleen bij deploys of admin-revalidatie
  return locales.flatMap((lang) =>
    entries.map(({ page, priority, changeFrequency }) => ({
      url: `${base}${p(lang, page)}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [htmlLang[l], `${base}${p(l, page)}`])),
          "x-default": `${base}${p("nl", page)}`,
        },
      },
    }))
  );
}
