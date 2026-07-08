/**
 * Centrale site-configuratie.
 * Alles wat Kiano vóór livegang moet invullen staat hier op één plek.
 */
export const site = {
  // [INVULLEN] Werktitel — vervang door de definitieve bedrijfsnaam.
  name: "De Digitale Werkbank",
  tagline: "Computerhulp uit je eigen buurt. Vaste prijzen, geen verrassingen.",

  // [INVULLEN] Telefoonnummer (internationaal formaat voor tel: en wa.me)
  phone: "+32470000000",
  phoneDisplay: "0470 00 00 00",
  whatsapp: "32470000000", // zonder + voor wa.me

  // [INVULLEN] Zakelijk e-mailadres op eigen domein
  email: "info@voorbeeld.be",

  region: "Herent, Leuven en deelgemeenten",
  address: "Herent",

  // [INVULLEN] KBO-nummer na Acerta-registratie. Leeg = footer toont "in aanvraag".
  kbo: "",

  // [INVULLEN] Link naar Google Business Profile (reviews)
  googleReviewsUrl: "",

  // Social media — leeg laten = niet tonen
  socials: {
    instagram: "",
    tiktok: "",
    youtube: "",
    facebook: "",
  },

  openingInfo: "Bereikbaar op weekdagen 's avonds en op zaterdag",

  // Verplaatsing
  travel: "Gratis binnen 10 km van Herent, daarbuiten €0,40/km.",

  // Reactiebelofte — letterlijk zo, niets sterkers (zie briefing)
  responsePromise:
    "Reactie dezelfde werkdag, eerste hulp op afstand 's avonds, ter plaatse binnen 48 uur.",
} as const;

export function siteUrl(): string {
  return process.env.SITE_URL || "http://localhost:3000";
}
