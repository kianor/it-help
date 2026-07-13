import Link from "next/link";
import { site } from "@/config/site";
import type { Dict } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { p } from "@/i18n/slugs.mjs";

export function Footer({ lang, dict }: { lang: Locale; dict: Dict }) {
  const f = dict.footer;
  const socials = [
    { label: "Instagram", url: site.socials.instagram },
    { label: "TikTok", url: site.socials.tiktok },
    { label: "YouTube", url: site.socials.youtube },
    { label: "Facebook", url: site.socials.facebook },
  ].filter((s) => s.url);

  return (
    <footer className="mt-20 border-t border-ink/10 bg-surface pb-24 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold">
            {site.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1 font-mono text-xs text-accent-strong">{site.tagline}</p>
          <p className="mt-2 text-sm text-steel">
            {dict.common.region}
            <br />
            {dict.common.openingInfo}
          </p>
          <p className="mt-2 font-mono text-sm">
            <a href={`tel:${site.phone}`} data-track="footer_click" className="hover:text-cobalt">
              {site.phoneDisplay}
            </a>
          </p>
          {socials.length > 0 && (
            <p className="mt-3 flex gap-3 text-sm">
              {socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="text-cobalt hover:underline">
                  {s.label}
                </a>
              ))}
            </p>
          )}
        </div>

        <div className="text-sm">
          <p className="label">{f.servicesLabel}</p>
          <ul className="space-y-1.5">
            <li><Link href={p(lang, "pc-bouwen")} data-track="footer_click" className="hover:text-cobalt">{f.links.pc}</Link></li>
            <li><Link href={p(lang, "herstel")} data-track="footer_click" className="hover:text-cobalt">{f.links.herstel}</Link></li>
            <li><Link href={p(lang, "consoles")} data-track="footer_click" className="hover:text-cobalt">{f.links.consoles}</Link></li>
            <li><Link href={p(lang, "voor-zaken")} data-track="footer_click" className="hover:text-cobalt">{f.links.zaken}</Link></li>
            <li><Link href={p(lang, "volg")} data-track="footer_click" className="hover:text-cobalt">{f.links.volg}</Link></li>
            <li><Link href={p(lang, "afspraak")} data-track="footer_click" className="hover:text-cobalt">{f.links.afspraak}</Link></li>
            <li><Link href={p(lang, "account")} data-track="footer_click" className="hover:text-cobalt">{dict.nav.account}</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="label">{f.practicalLabel}</p>
          <ul className="space-y-1.5">
            <li><Link href={p(lang, "prijzen")} data-track="footer_click" className="hover:text-cobalt">{f.links.prijzen}</Link></li>
            <li><Link href={p(lang, "voorwaarden")} data-track="footer_click" className="hover:text-cobalt">{f.links.voorwaarden}</Link></li>
            <li><Link href={p(lang, "privacy")} data-track="footer_click" className="hover:text-cobalt">{f.links.privacy}</Link></li>
            {site.googleReviewsUrl && (
              <li>
                <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" data-track="footer_click" className="hover:text-cobalt">
                  {f.links.reviews}
                </a>
              </li>
            )}
          </ul>
          <p className="mt-4 text-xs text-steel">
            {site.kbo ? `${f.kboPrefix} ${site.kbo}` : f.kboPending}
            <br />
            {f.exemption}
          </p>
        </div>
      </div>
    </footer>
  );
}
