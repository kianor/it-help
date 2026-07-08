"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Promo = { active: boolean; left: number; total: number };

/**
 * Launch-actie-balk. Haalt de teller client-side op zodat de pagina's zelf
 * statisch en snel blijven maar de stand altijd klopt.
 */
export function PromoBanner() {
  const [promo, setPromo] = useState<Promo | null>(null);

  useEffect(() => {
    fetch("/api/promo", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then(setPromo)
      .catch(() => setPromo(null));
  }, []);

  if (!promo?.active) return null;

  return (
    <Link
      href="/contact"
      className="block bg-ink px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-cobalt"
    >
      <span className="font-mono font-bold text-signal">Launch-actie:</span>{" "}
      -50% voor mijn eerste {promo.total} klanten. Nog{" "}
      <span className="font-mono font-bold">{promo.left}</span>{" "}
      {promo.left === 1 ? "plek" : "plekken"} vrij →
    </Link>
  );
}
