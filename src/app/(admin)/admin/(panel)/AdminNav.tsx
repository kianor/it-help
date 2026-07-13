"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Badges = { aanvragen: number; afspraken: number; herstellingen: number };

const ICONS: Record<string, React.ReactNode> = {
  dashboard: <path d="M3 13h8V3H3zm0 8h8v-6H3zm10 0h8V11h-8zm0-18v6h8V3z" />,
  aanvragen: <path d="M4 4h16v12H7l-3 3zM8 9h8M8 12h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  afspraken: <path d="M8 2v3M16 2v3M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  herstellingen: <path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14 13l-3-3z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
  galerij: <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm3 9 3-3 3 3 4-4 3 3M8.5 9.5h.01" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  reviews: <path d="m12 3 2.7 5.6 6.3.8-4.6 4.3 1.2 6.1L12 16.9l-5.6 2.9 1.2-6.1L3 9.4l6.3-.8z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
  nieuwsbrief: <path d="M3 6h18v12H3zm0 1 9 6 9-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
  acties: <path d="m9 14 6-6M9.5 8.5h.01M14.5 13.5h.01M4 12l8-8 8 8-8 8z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
  stats: <path d="M4 20V10m6 10V4m6 16v-7m4 7H2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  instellingen: <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.4-3a7.4 7.4 0 0 0-.1-1l2-1.6-2-3.4-2.4 1a7.4 7.4 0 0 0-1.7-1l-.4-2.6h-4l-.4 2.6a7.4 7.4 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7.4 7.4 0 0 0 1.7 1l.4 2.6h4l.4-2.6a7.4 7.4 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6c.1-.3.1-.7.1-1z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />,
};

export function AdminNav({ badges }: { badges: Badges }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items: { href: string; label: string; icon: string; badge?: number }[] = [
    { href: "/admin", label: "Dashboard", icon: "dashboard" },
    { href: "/admin/aanvragen", label: "Aanvragen", icon: "aanvragen", badge: badges.aanvragen },
    { href: "/admin/afspraken", label: "Afspraken", icon: "afspraken", badge: badges.afspraken },
    { href: "/admin/herstellingen", label: "Herstellingen", icon: "herstellingen", badge: badges.herstellingen },
    { href: "/admin/galerij", label: "Voor/na-galerij", icon: "galerij" },
    { href: "/admin/reviews", label: "Reviews", icon: "reviews" },
    { href: "/admin/nieuwsbrief", label: "Nieuwsbrief", icon: "nieuwsbrief" },
    { href: "/admin/acties", label: "Acties", icon: "acties" },
    { href: "/admin/stats", label: "Statistieken", icon: "stats" },
    { href: "/admin/instellingen", label: "Instellingen", icon: "instellingen" },
  ];

  const totalNew = badges.aanvragen + badges.afspraken;

  return (
    <nav aria-label="Admin-navigatie" className="px-3 pb-3">
      <button
        type="button"
        className="mb-1 flex w-full items-center justify-between rounded-lg border border-ink/15 px-3 py-2 text-sm font-semibold lg:hidden"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        Menu
        <span className="flex items-center gap-2">
          {totalNew > 0 && (
            <span className="rounded-full bg-accent-strong px-2 py-0.5 font-mono text-xs text-white">{totalNew}</span>
          )}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d={open ? "m6 15 6-6 6 6" : "m6 9 6 6 6-6"} />
          </svg>
        </span>
      </button>

      <ul className={`${open ? "block" : "hidden"} space-y-0.5 lg:block`}>
        {items.map((item) => {
          const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-link/10 font-semibold text-link"
                    : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
                }`}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={active ? "text-link" : "text-muted"}>
                  {ICONS[item.icon]}
                </svg>
                <span className="flex-1">{item.label}</span>
                {item.badge ? (
                  <span className="rounded-full bg-accent-strong px-2 py-0.5 font-mono text-xs font-bold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
        <li className="pt-2 lg:hidden">
          <a href="/" className="block rounded-lg px-3 py-2 text-sm text-muted">← Naar de site</a>
        </li>
      </ul>
    </nav>
  );
}
