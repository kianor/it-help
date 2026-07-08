import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { locales, htmlLang } from "@/i18n/config";
import { p, type PageKey } from "@/i18n/slugs.mjs";

const pages: (PageKey | "")[] = [
  "",
  "pc-bouwen",
  "herstel",
  "consoles",
  "voor-zaken",
  "prijzen",
  "contact",
  "afspraak",
  "privacy",
  "voorwaarden",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return locales.flatMap((lang) =>
    pages.map((page) => ({
      url: `${base}${p(lang, page)}`,
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [htmlLang[l], `${base}${p(l, page)}`])),
      },
    }))
  );
}
