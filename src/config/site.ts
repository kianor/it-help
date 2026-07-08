/**
 * Centrale site-configuratie.
 * Alles wat Kiano vóór livegang moet invullen staat hier op één plek.
 */
export const site = {
  name: "RitsIT",
  tagline: "Ritsvlug hersteld.",

  // [INVULLEN] Telefoonnummer (internationaal formaat voor tel: en wa.me)
  phone: "+32470000000",
  phoneDisplay: "0470 00 00 00",
  whatsapp: "32470000000", // zonder + voor wa.me

  // [INVULLEN] Zakelijk e-mailadres op eigen domein
  email: "info@ritsit.be",

  region: "Herent, Leuven en deelgemeenten",
  address: "Herent",

  // [INVULLEN] KBO-nummer na Acerta-registratie. Leeg = footer toont "in aanvraag".
  kbo: "",

  // [INVULLEN] Link naar Google Business Profile (reviews)
  googleReviewsUrl: "",

  // [INVULLEN] Link naar de Trustpilot-pagina (reviews verzamelen + tonen)
  trustpilotUrl: "",

  // Social media — leeg laten = niet tonen
  socials: {
    instagram: "",
    tiktok: "",
    youtube: "",
    facebook: "",
  },
} as const;

export function siteUrl(): string {
  return process.env.SITE_URL || "http://localhost:3000";
}
