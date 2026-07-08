import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { locales, htmlLang } from "@/i18n/config";

const routes = [
  "",
  "/pc-bouwen",
  "/herstel",
  "/consoles",
  "/voor-zaken",
  "/prijzen",
  "/contact",
  "/privacy",
  "/voorwaarden",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return locales.flatMap((lang) =>
    routes.map((route) => ({
      url: `${base}/${lang}${route}`,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [htmlLang[l], `${base}/${l}${route}`])
        ),
      },
    }))
  );
}
