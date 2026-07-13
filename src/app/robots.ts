import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";

const disallow = ["/admin", "/api", "/*/volg", "/*/track", "/*/suivi", "/*/nieuwsbrief", "/*/account", "/*/compte"];

// AI-crawlers expliciet toelaten zodat de zaak vindbaar is in ChatGPT,
// Claude, Perplexity en co (GEO: generative engine optimization).
const aiBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...aiBots.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
