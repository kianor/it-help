"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/config/site";
import { locales, type Locale } from "@/i18n/config";
import { p, PAGE_SLUGS } from "@/i18n/slugs.mjs";
import { PhoneIcon } from "./CtaButtons";
import { GameModeToggle } from "./GameModeToggle";

type NavLabels = { pc: string; herstel: string; consoles: string; zaken: string; prijzen: string; contact: string; afspraak: string; account: string };

export function Header({
  lang,
  nav,
  callCta,
  gameMode,
  menuOpen,
  menuClose,
}: {
  lang: Locale;
  nav: NavLabels;
  callCta: string;
  gameMode: string;
  menuOpen: string;
  menuClose: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = [
    { href: p(lang, "pc-bouwen"), label: nav.pc },
    { href: p(lang, "herstel"), label: nav.herstel },
    { href: p(lang, "consoles"), label: nav.consoles },
    { href: p(lang, "voor-zaken"), label: nav.zaken },
    { href: p(lang, "prijzen"), label: nav.prijzen },
    { href: p(lang, "afspraak"), label: nav.afspraak },
    { href: p(lang, "contact"), label: nav.contact },
  ];

  // Zelfde pagina in een andere taal (met vertaalde slug waar die bestaat)
  function switchHref(to: Locale) {
    const rest = pathname.replace(/^\/(nl|en|fr)(?=\/|$)/, "");
    const currentSlug = rest.split("/")[1];
    if (currentSlug) {
      for (const [page, slugs] of Object.entries(PAGE_SLUGS)) {
        if ((slugs as Record<string, string>)[lang] === currentSlug) {
          return p(to, page as never);
        }
      }
    }
    return `/${to}${rest}`;
  }
  function onSwitch(to: Locale) {
    document.cookie = `lang=${to};path=/;max-age=31536000;samesite=lax`;
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href={`/${lang}`} className="font-display text-lg font-bold" onClick={() => setOpen(false)}>
          {site.name}
          <span className="text-signal">.</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Navigatie">
          {items.map((item) => (
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
          <div className="hidden items-center gap-0.5 rounded-lg border border-ink/10 p-0.5 font-mono text-xs sm:flex" role="group" aria-label="Taal / Language / Langue">
            {locales.map((l) => (
              <Link
                key={l}
                href={switchHref(l)}
                onClick={() => onSwitch(l)}
                aria-current={l === lang ? "true" : undefined}
                className={`rounded-md px-2 py-1 font-bold uppercase transition ${
                  l === lang ? "bg-ink text-paper" : "text-steel hover:text-ink"
                }`}
              >
                {l}
              </Link>
            ))}
          </div>
          <Link
            href={p(lang, "account")}
            title={nav.account}
            className="hidden h-10 w-10 items-center justify-center rounded-lg border border-ink/15 text-steel transition hover:text-ink sm:inline-flex"
          >
            <span className="sr-only">{nav.account}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
          <GameModeToggle label={gameMode} />
          <a
            href={`tel:${site.phone}`}
            className="hidden items-center gap-2 rounded-lg bg-signal px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#d95b12] md:inline-flex"
          >
            <PhoneIcon />
            {callCta}
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink/15 lg:hidden"
            aria-expanded={open}
            aria-label={open ? menuClose : menuOpen}
            onClick={() => setOpen(!open)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-ink/10 bg-paper px-4 py-3 lg:hidden" aria-label="Menu">
          {items.map((item) => (
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
          <div className="mt-2 flex gap-1 border-t border-ink/10 px-3 pt-3 font-mono text-xs">
            {locales.map((l) => (
              <Link
                key={l}
                href={switchHref(l)}
                onClick={() => onSwitch(l)}
                className={`rounded-md px-2.5 py-1.5 font-bold uppercase ${
                  l === lang ? "bg-ink text-paper" : "text-steel"
                }`}
              >
                {l}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
