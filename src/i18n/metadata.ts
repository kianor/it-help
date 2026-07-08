import type { Metadata } from "next";
import { locales, isLocale, htmlLang, type Locale } from "./config";
import { getDict, type Dict } from ".";
import { p, type PageKey } from "./slugs.mjs";

/** Bouwt per-pagina metadata met hreflang-alternates (vertaalde slugs). */
export function pageMetadata(
  langParam: string,
  page: PageKey | "",
  pick: (dict: Dict) => { title: string; description: string }
): Metadata {
  const lang: Locale = isLocale(langParam) ? langParam : "nl";
  const { title, description } = pick(getDict(lang));
  const languages = Object.fromEntries(locales.map((l) => [htmlLang[l], p(l, page)]));
  return {
    title,
    description,
    alternates: {
      canonical: p(lang, page),
      languages: { ...languages, "x-default": p("nl", page) },
    },
  };
}
