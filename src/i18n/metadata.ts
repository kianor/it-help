import type { Metadata } from "next";
import { locales, isLocale, htmlLang, type Locale } from "./config";
import { getDict, type Dict } from ".";

/** Bouwt per-pagina metadata met hreflang-alternates voor alle talen. */
export function pageMetadata(
  langParam: string,
  path: string, // bv. "/pc-bouwen", "" voor home
  pick: (dict: Dict) => { title: string; description: string }
): Metadata {
  const lang: Locale = isLocale(langParam) ? langParam : "nl";
  const { title, description } = pick(getDict(lang));
  const languages = Object.fromEntries(
    locales.map((l) => [htmlLang[l], `/${l}${path}`])
  );
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}${path}`,
      languages: { ...languages, "x-default": `/nl${path}` },
    },
  };
}
