/**
 * Centrale bouwers voor schema.org / JSON-LD.
 *
 * Eén bron van waarheid voor gestructureerde data. Alle entiteiten delen een
 * stabiel `@id` zodat zoekmachines én generatieve engines (ChatGPT, Claude,
 * Perplexity, Gemini) de LocalBusiness, WebSite en losse ratings als één
 * entiteit in hun knowledge graph samenvoegen in plaats van als losse,
 * concurrerende nodes. Dat is de kern van GEO/entity-optimalisatie.
 *
 * Server-only (leest zaakgegevens uit SQLite via getSite).
 */
import { site, siteUrl } from "@/config/site";
import { getSite } from "@/lib/site-config";
import { getDict } from "@/i18n";
import { htmlLang, type Locale } from "@/i18n/config";
import { p, type PageKey } from "@/i18n/slugs.mjs";

/** Stabiele knooppunt-id's; alle nodes verwijzen hiernaar via @id. */
export const businessId = () => `${siteUrl()}/#business`;
export const websiteId = () => `${siteUrl()}/#website`;

/** Coördinaten van de thuisbasis (Herent, Vlaams-Brabant). */
const GEO = { latitude: 50.9067, longitude: 4.6708 } as const;

/** Absolute URL van de per-taal OG-afbeelding (dient ook als LocalBusiness-image). */
const ogImage = (lang: Locale) => `${siteUrl()}/${lang}/opengraph-image`;

/** Alle ingevulde externe profielen → sameAs (entity-verankering, EEAT). */
function sameAs(): string[] {
  const cfg = getSite();
  return [
    cfg.socials.instagram,
    cfg.socials.tiktok,
    cfg.socials.youtube,
    cfg.socials.facebook,
    cfg.googleReviewsUrl,
    cfg.trustpilotUrl,
  ].filter((u): u is string => Boolean(u && u.trim()));
}

/** "€130", "vanaf €69", "€45/u" → 130 / 69 / 45; "gratis IT-check" → null. */
function parsePrice(raw: string): number | null {
  const m = raw.replace(/\s/g, "").match(/(\d+(?:[.,]\d+)?)/);
  return m ? Number(m[1].replace(",", ".")) : null;
}

/** Diensten uit de i18n-woordenlijst → OfferCatalog (machine-readable prijslijst). */
function offerCatalog(lang: Locale) {
  const dict = getDict(lang);
  const groups = Object.values(dict.services) as {
    title: string;
    services: { name: string; price: string; note?: string }[];
  }[];
  const itemListElement = groups.flatMap((group) =>
    group.services.map((s) => {
      const value = parsePrice(s.price);
      const offer: Record<string, unknown> = {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          category: group.title,
          ...(s.note ? { description: s.note } : {}),
          provider: { "@id": businessId() },
          areaServed: ["Herent", "Leuven"],
        },
      };
      if (value !== null) {
        offer.priceSpecification = {
          "@type": "PriceSpecification",
          price: value,
          priceCurrency: "EUR",
        };
      }
      return offer;
    })
  );
  return {
    "@type": "OfferCatalog",
    name: dict.nav.prijzen,
    itemListElement,
  };
}

/**
 * Verrijkte LocalBusiness — het hart van de structured data.
 * Bevat NAP, geo, openingsuren, sameAs, prijsklasse en een volledige
 * OfferCatalog met vaste prijzen (de signatuur van de zaak).
 */
export function localBusinessLd(lang: Locale) {
  const dict = getDict(lang);
  const cfg = getSite();
  const links = sameAs();
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId(),
    name: site.name,
    alternateName: `${site.name} — ${site.tagline}`,
    slogan: site.tagline,
    description: dict.meta.home.description,
    url: `${siteUrl()}/${lang}`,
    image: ogImage(lang),
    logo: `${siteUrl()}/icon.svg`,
    telephone: cfg.phone,
    email: cfg.email,
    ...(cfg.kbo ? { vatID: cfg.kbo, taxID: cfg.kbo } : {}),
    priceRange: "€25 – €199",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Bancontact, Payconiq, Overschrijving",
    areaServed: ["Herent", "Leuven"].map((name) => ({ "@type": "City", name })),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address,
      addressRegion: "Vlaams-Brabant",
      addressCountry: "BE",
    },
    geo: { "@type": "GeoCoordinates", ...GEO },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "18:00",
        closes: "21:30",
      },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "18:00" },
    ],
    hasOfferCatalog: offerCatalog(lang),
    ...(links.length ? { sameAs: links } : {}),
    inLanguage: htmlLang[lang],
  };
}

/** WebSite-node — verankert het domein en verwijst naar de uitgever (business). */
export function webSiteLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(),
    url: `${siteUrl()}/${lang}`,
    name: site.name,
    inLanguage: htmlLang[lang],
    publisher: { "@id": businessId() },
  };
}

/** Rating gekoppeld aan de bestaande business-entiteit (geen duplicaat-node). */
export function ratingLd(lang: Locale, avg: number, count: number) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId(),
    name: site.name,
    url: `${siteUrl()}/${lang}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg,
      reviewCount: count,
      bestRating: 5,
    },
  };
}

/**
 * BreadcrumbList voor een subpagina: Home › <label>.
 * Zichtbare breadcrumbs zijn er niet, maar de rich result en de context voor
 * crawlers/AI wél — die begrijpen zo de plaats van de pagina in de site.
 */
export function breadcrumbLd(lang: Locale, page: PageKey, label: string) {
  const base = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: site.name, item: `${base}${p(lang, "")}` },
      { "@type": "ListItem", position: 2, name: label, item: `${base}${p(lang, page)}` },
    ],
  };
}
