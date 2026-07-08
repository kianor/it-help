import nl, { type Dict } from "./nl";
import en from "./en";
import fr from "./fr";
import type { Locale } from "./config";

const dicts: Record<Locale, Dict> = { nl, en, fr };

export function getDict(locale: Locale): Dict {
  return dicts[locale] ?? nl;
}

export type { Dict };
export type ServiceGroup = Dict["services"]["pcBouwen"];

/** Vervangt {placeholders} in een vertaalstring. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in values ? String(values[key]) : `{${key}}`
  );
}
