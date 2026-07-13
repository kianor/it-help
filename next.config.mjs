import { slugRewrites, slugRedirects } from "./src/i18n/slugs.mjs";

/** @type {import('next').NextConfig} */

// GA4 is opt-in: de CSP laat Google-domeinen alleen toe als er een
// measurement-ID geconfigureerd is (NEXT_PUBLIC_GA4_ID in .env bij build).
const ga = process.env.NEXT_PUBLIC_GA4_ID
  ? {
      script: " https://www.googletagmanager.com",
      connect: " https://*.google-analytics.com https://www.googletagmanager.com",
      img: " https://*.google-analytics.com",
    }
  : { script: "", connect: "", img: "" };

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${ga.script}`,
      "style-src 'self' 'unsafe-inline'",
      `img-src 'self' data: blob: https://i.ytimg.com${ga.img}`,
      "font-src 'self'",
      `connect-src 'self'${ga.connect}`,
      // Alleen video-embeds van deze spelers zijn toegelaten
      "frame-src https://www.youtube-nocookie.com https://www.tiktok.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async rewrites() {
    return slugRewrites();
  },
  async redirects() {
    return slugRedirects();
  },
};

export default nextConfig;
