export type PageKey =
  | "pc-bouwen"
  | "herstel"
  | "consoles"
  | "voor-zaken"
  | "prijzen"
  | "contact"
  | "volg"
  | "privacy"
  | "voorwaarden"
  | "afspraak"
  | "account";

export const PAGE_SLUGS: Record<PageKey, Record<"nl" | "en" | "fr", string>>;
export function p(lang: string, page?: PageKey | ""): string;
export function slugRewrites(): { source: string; destination: string }[];
export function slugRedirects(): { source: string; destination: string; permanent: boolean }[];
