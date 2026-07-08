export const locales = ["nl", "en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "nl";

export const localeNames: Record<Locale, string> = {
  nl: "Nederlands",
  en: "English",
  fr: "Français",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** HTML lang-attribuut per taal */
export const htmlLang: Record<Locale, string> = {
  nl: "nl-BE",
  en: "en",
  fr: "fr-BE",
};
