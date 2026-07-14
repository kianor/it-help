import { ImageResponse } from "next/og";
import { getDict } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { site } from "@/config/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Statisch per taal gegenereerd (één keer, bij build) — geen runtime-kost.
export function generateStaticParams() {
  return [{ lang: "nl" }, { lang: "en" }, { lang: "fr" }];
}

/**
 * Merk-OG-afbeelding voor social shares én AI-previews. Inktblauw werkblad
 * met signaal-oranje accent, de merknaam, de belofte per taal en de regio.
 * Bewust zonder externe font-fetch: gebruikt de ingebouwde standaardfont.
 */
export default function OgImage({ params }: { params: { lang: string } }) {
  const lang = isLocale(params.lang) ? params.lang : "nl";
  const dict = getDict(lang);
  const promise = dict.home.heroAccent; // bv. "Vaste prijzen, geen verrassingen."

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #16324F 0%, #0B1020 100%)",
          padding: "72px 80px",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        {/* decoratieve oranje gloed */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "rgba(230,97,16,0.28)",
            filter: "blur(40px)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 9999,
              background: "#E66110",
            }}
          />
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: 2, color: "#FFA064" }}>
            {site.name.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>{site.tagline}</div>
          <div style={{ fontSize: 44, fontWeight: 600, color: "#FFA064", lineHeight: 1.15 }}>
            {promise}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, color: "#9AA6BC" }}>
          <span>Herent · Leuven</span>
          <span style={{ color: "#546478" }}>—</span>
          <span>ritsit.be</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
