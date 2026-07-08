import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
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
  return routes.map((route) => ({
    url: `${base}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
