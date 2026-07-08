/**
 * Vertaalde URL-slugs per pagina. De mappen onder (site)/[lang] blijven de
 * Nederlandse namen; next.config.mjs herschrijft de vertaalde URL's daarheen
 * en stuurt de onvertaalde varianten door (SEO-canoniek per taal).
 * Dit bestand is .mjs zodat next.config.mjs het ook kan importeren.
 */
export const PAGE_SLUGS = {
  "pc-bouwen": { nl: "pc-bouwen", en: "pc-builds", fr: "pc-sur-mesure" },
  herstel: { nl: "herstel", en: "repairs", fr: "reparations" },
  consoles: { nl: "consoles", en: "consoles", fr: "consoles" },
  "voor-zaken": { nl: "voor-zaken", en: "for-business", fr: "entreprises" },
  prijzen: { nl: "prijzen", en: "prices", fr: "prix" },
  contact: { nl: "contact", en: "contact", fr: "contact" },
  volg: { nl: "volg", en: "track", fr: "suivi" },
  privacy: { nl: "privacy", en: "privacy", fr: "confidentialite" },
  voorwaarden: { nl: "voorwaarden", en: "terms", fr: "conditions" },
  afspraak: { nl: "afspraak", en: "appointment", fr: "rendez-vous" },
  account: { nl: "account", en: "account", fr: "compte" },
};

/** Publiek pad voor een pagina in een taal, bv. p("en", "pc-bouwen") → "/en/pc-builds" */
export function p(lang, page) {
  if (!page) return `/${lang}`;
  const entry = PAGE_SLUGS[page];
  return `/${lang}/${entry ? entry[lang] : page}`;
}

/** Rewrites: vertaalde URL → interne (Nederlandse) mapnaam */
export function slugRewrites() {
  const rules = [];
  for (const [dir, langs] of Object.entries(PAGE_SLUGS)) {
    for (const [lang, slug] of Object.entries(langs)) {
      if (slug !== dir) {
        rules.push({ source: `/${lang}/${slug}`, destination: `/${lang}/${dir}` });
      }
    }
  }
  return rules;
}

/** Redirects: interne mapnaam onder verkeerde taal → vertaalde URL */
export function slugRedirects() {
  const rules = [];
  for (const [dir, langs] of Object.entries(PAGE_SLUGS)) {
    for (const [lang, slug] of Object.entries(langs)) {
      if (slug !== dir) {
        rules.push({ source: `/${lang}/${dir}`, destination: `/${lang}/${slug}`, permanent: true });
      }
    }
  }
  return rules;
}
