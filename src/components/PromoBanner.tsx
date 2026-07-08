"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Promo = { active: boolean; left: number; total: number };

/**
 * Launch-actie-balk (-50% in ruil voor een Google-review). Haalt de teller
 * client-side op zodat de pagina's statisch en snel blijven maar de stand
 * altijd klopt.
 */
export function PromoBanner({
  lang,
  label,
  template,
  one,
  many,
}: {
  lang: string;
  label: string;
  template: string;
  one: string;
  many: string;
}) {
  const [promo, setPromo] = useState<Promo | null>(null);

  useEffect(() => {
    fetch("/api/promo", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then(setPromo)
      .catch(() => setPromo(null));
  }, []);

  if (!promo?.active) return null;

  const text = template
    .replace("{total}", String(promo.total))
    .replace("{left}", String(promo.left))
    .replace("{slots}", promo.left === 1 ? one : many);

  return (
    <Link
      href={`/${lang}/contact`}
      className="block bg-ink px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-cobalt"
    >
      <span className="font-mono font-bold text-signal">{label}</span> {text}
    </Link>
  );
}
