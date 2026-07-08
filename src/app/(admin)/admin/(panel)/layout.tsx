import type { Metadata } from "next";
import Link from "next/link";
import { logoutAction } from "../actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const nav = [
  { href: "/admin", label: "Aanvragen" },
  { href: "/admin/herstellingen", label: "Herstellingen" },
  { href: "/admin/galerij", label: "Voor/na-galerij" },
  { href: "/admin/nieuwsbrief", label: "Nieuwsbrief" },
  { href: "/admin/instellingen", label: "Instellingen" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-4">
        <nav className="flex flex-wrap gap-1" aria-label="Admin-navigatie">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-cobalt/10 hover:text-cobalt"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logoutAction}>
          <button type="submit" className="text-sm text-steel underline hover:text-signal">
            Uitloggen
          </button>
        </form>
      </div>
      <div className="pb-16 pt-6">{children}</div>
    </div>
  );
}
