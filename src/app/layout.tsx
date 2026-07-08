import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCallBar } from "@/components/StickyCallBar";
import { PromoBanner } from "@/components/PromoBanner";
import { site, siteUrl } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${site.name} | Computerhulp, PC builds & console care in Herent en Leuven`,
    template: `%s | ${site.name}`,
  },
  description:
    "Game-pc laten bouwen, laptop herstellen, console reinigen of IT-hulp voor je zaak. Vaste prijzen vooraf, uitleg in mensentaal, iemand uit de buurt. Herent en Leuven.",
  openGraph: {
    type: "website",
    locale: "nl_BE",
    siteName: site.name,
  },
};

function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description:
      "Lokale IT-service: custom pc builds, pc- en laptopherstel, console care en IT-support voor kleine ondernemingen. Vaste prijzen vooraf.",
    url: siteUrl(),
    telephone: site.phone,
    email: site.email,
    areaServed: ["Herent", "Leuven"],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address,
      addressRegion: "Vlaams-Brabant",
      addressCountry: "BE",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "18:00",
        closes: "21:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "€25 - €199",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl-BE">
      <body>
        <a
          href="#inhoud"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2"
        >
          Ga naar inhoud
        </a>
        <PromoBanner />
        <Header />
        <main id="inhoud">{children}</main>
        <Footer />
        <StickyCallBar />
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
