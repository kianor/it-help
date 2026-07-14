import type { Metadata } from "next";
import { locales, isLocale, htmlLang, type Locale } from "./config";
import { getDict, type Dict } from ".";
import { p, type PageKey } from "./slugs.mjs";
import { site, siteUrl } from "@/config/site";

/**
 * Bouwt per-pagina metadata met hreflang-alternates (vertaalde slugs) én
 * volledige Open Graph + Twitter Card-velden. De OG/Twitter-afbeelding komt
 * uit de file-convention (opengraph-image.tsx op [lang]-niveau) en wordt
 * automatisch overgeërfd; hier zetten we de per-pagina titel/omschrijving/URL.
 */
export function pageMetadata(
  langParam: string,
  page: PageKey | "",
  pick: (dict: Dict) => { title: string; description: string }
): Metadata {
  const lang: Locale = isLocale(langParam) ? langParam : "nl";
  const { title, description } = pick(getDict(lang));
  const languages = Object.fromEntries(locales.map((l) => [htmlLang[l], p(l, page)]));
  const ogLocale = lang === "nl" ? "nl_BE" : lang === "fr" ? "fr_BE" : "en_US";
  return {
    title,
    description,
    alternates: {
      canonical: p(lang, page),
      languages: { ...languages, "x-default": p("nl", page) },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: `${siteUrl()}${p(lang, page)}`,
      siteName: site.name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
