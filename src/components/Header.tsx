"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/config/site";
import { PhoneIcon } from "./CtaButtons";

const nav = [
  { href: "/pc-bouwen", label: "PC bouwen" },
  { href: "/herstel", label: "Herstel" },
  { href: "/consoles", label: "Consoles" },
  { href: "/voor-zaken", label: "Voor zaken" },
  { href: "/prijzen", label: "Prijzen" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="font-display text-lg font-bold" onClick={() => setOpen(false)}>
          {site.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Hoofdnavigatie">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition hover:text-cobalt ${
                pathname === item.href ? "text-cobalt" : "text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phone}`}
            className="hidden items-center gap-2 rounded-lg bg-signal px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#d95b12] sm:inline-flex"
          >
            <PhoneIcon />
            Bel of app me
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink/15 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            onClick={() => setOpen(!open)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-ink/10 bg-paper px-4 py-3 md:hidden" aria-label="Mobiele navigatie">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-2.5 font-medium ${
                pathname === item.href ? "bg-cobalt/10 text-cobalt" : "text-ink"
              }`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
