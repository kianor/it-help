"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Promo = {
  active: boolean;
  left: number | null;
  total: number | null;
  texts?: { nl: string; en: string; fr: string };
};

/**
 * Actie-balk. De actieve actie komt uit het admin-paneel (Acties) en wordt
 * client-side opgehaald zodat de pagina's zelf statisch en snel blijven.
 */
export function PromoBanner({
  lang,
  label,
  template,
  one,
  many,
  contactHref,
}: {
  lang: string;
  label: string;
  template: string;
  one: string;
  many: string;
  contactHref: string;
}) {
  const [promo, setPromo] = useState<Promo | null>(null);

  useEffect(() => {
    fetch("/api/promo", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then(setPromo)
      .catch(() => setPromo(null));
  }, []);

  if (!promo?.active || !promo.texts) return null;

  const text = promo.texts[lang as "nl" | "en" | "fr"] ?? promo.texts.nl;
  const counter =
    promo.total != null && promo.left != null
      ? " " +
        template
          .replace("{left}", String(promo.left))
          .replace("{slots}", promo.left === 1 ? one : many)
      : " →";

  return (
    <Link
      href={contactHref}
      className="block bg-ink px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-cobalt"
    >
      <span className="font-mono font-bold text-signal">{label}</span> {text}
      {counter}
    </Link>
  );
}
