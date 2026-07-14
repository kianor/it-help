import Link from "next/link";
import { p, type PageKey } from "@/i18n/slugs.mjs";
import type { Locale } from "@/i18n/config";

/**
 * Zichtbaar kruimelpad (Home › pagina). Complementeert de BreadcrumbList in
 * JSON-LD: geeft de bezoeker oriëntatie en een terugstap met één klik.
 * Server component; puur presentational.
 */
export function Breadcrumbs({
  lang,
  page,
  label,
  homeLabel,
  ariaLabel,
}: {
  lang: Locale;
  page: PageKey;
  label: string;
  homeLabel: string;
  ariaLabel: string;
}) {
  return (
    <nav aria-label={ariaLabel} className="mb-5">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-steel">
        <li>
          <Link href={p(lang, "")} className="transition hover:text-cobalt">
            {homeLabel}
          </Link>
        </li>
        <li aria-hidden="true" className="text-steel/50">/</li>
        <li>
          <span aria-current="page" className="font-semibold text-ink">{label}</span>
        </li>
      </ol>
    </nav>
  );
}
