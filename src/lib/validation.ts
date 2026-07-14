/**
 * Gedeelde client-side veldvalidatie voor de formulieren (contact, afspraak,
 * nieuwsbrief). Spiegelt exact de server-side Zod-regels in de bijhorende
 * /api-routes, zodat client en server nooit uiteenlopen.
 */
export type Field = "name" | "phone" | "email" | "service" | "message";

/** Foutmeldingen per veld — komt uit i18n (contactPage.form.errors). */
export type FieldErrorLabels = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const isValidEmail = (v: string) => emailRe.test(v.trim());

/**
 * Geeft de foutmelding voor één veld, of "" als het in orde is.
 * `emailRequired`/`messageRequired` verschillen per formulier: contact heeft
 * e-mail optioneel en bericht verplicht; het afspraakformulier vraagt e-mail
 * verplicht (UI) maar bericht optioneel.
 */
export function fieldError(
  field: Field,
  value: string,
  labels: FieldErrorLabels,
  cfg: { emailRequired?: boolean; messageRequired?: boolean } = {}
): string {
  const v = value.trim();
  switch (field) {
    case "name":
      return v.length < 2 ? labels.name : "";
    case "phone":
      return v.length < 6 ? labels.phone : "";
    case "email":
      if (!v) return cfg.emailRequired ? labels.email : "";
      return isValidEmail(v) ? "" : labels.email;
    case "service":
      return v.length < 1 ? labels.service : "";
    case "message":
      return cfg.messageRequired && v.length < 5 ? labels.message : "";
  }
}
