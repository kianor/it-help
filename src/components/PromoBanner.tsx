import Link from "next/link";
import { getActivePromo } from "@/lib/db";
import { PromoDismiss } from "./PromoDismiss";

/**
 * Actie-balk, server-side gerenderd: geen client-fetch, dus geen layout
 * shift bij het eerste bezoek en geen hydration-mismatch. Statische
 * pagina's exporteren `revalidate` en de acties in het admin-paneel
 * revalideren alle publieke pagina's direct, dus de teller blijft kloppen.
 */
export function PromoBanner({
  lang,
  label,
  template,
  one,
  many,
  contactHref,
}: {
  lang: "nl" | "en" | "fr";
  label: string;
  template: string;
  one: string;
  many: string;
  contactHref: string;
}) {
  const promo = getActivePromo();
  if (!promo) return null;

  const text = { nl: promo.text_nl, en: promo.text_en, fr: promo.text_fr }[lang] ?? promo.text_nl;
  const counter =
    promo.total != null && promo.left != null
      ? " " +
        template
          .replace("{left}", String(promo.left))
          .replace("{slots}", promo.left === 1 ? one : many)
      : " →";

  return (
    <div className="relative bg-panel text-white" data-promo-banner>
      <Link
        href={contactHref}
        data-track="promo_banner_click"
        className="block px-10 py-2.5 text-center text-sm font-medium transition hover:brightness-125"
      >
        <span className="font-mono font-bold text-accent-soft">{label}</span> {text}
        {counter}
      </Link>
      <PromoDismiss />
    </div>
  );
}
