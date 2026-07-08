import Link from "next/link";
import { site } from "@/config/site";

export function Footer() {
  const socials = [
    { label: "Instagram", url: site.socials.instagram },
    { label: "TikTok", url: site.socials.tiktok },
    { label: "YouTube", url: site.socials.youtube },
    { label: "Facebook", url: site.socials.facebook },
  ].filter((s) => s.url);

  return (
    <footer className="mt-20 border-t border-ink/10 bg-white pb-24 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold">{site.name}</p>
          <p className="mt-2 text-sm text-steel">
            {site.region}
            <br />
            {site.openingInfo}
          </p>
          <p className="mt-2 font-mono text-sm">
            <a href={`tel:${site.phone}`} className="hover:text-cobalt">
              {site.phoneDisplay}
            </a>
          </p>
          {socials.length > 0 && (
            <p className="mt-3 flex gap-3 text-sm">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cobalt hover:underline"
                >
                  {s.label}
                </a>
              ))}
            </p>
          )}
        </div>

        <div className="text-sm">
          <p className="label">Diensten</p>
          <ul className="space-y-1.5">
            <li><Link href="/pc-bouwen" className="hover:text-cobalt">PC laten bouwen</Link></li>
            <li><Link href="/herstel" className="hover:text-cobalt">PC & laptop herstel</Link></li>
            <li><Link href="/consoles" className="hover:text-cobalt">Consoles & controllers</Link></li>
            <li><Link href="/voor-zaken" className="hover:text-cobalt">Voor zaken</Link></li>
            <li><Link href="/volg" className="hover:text-cobalt">Volg je herstelling</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="label">Praktisch</p>
          <ul className="space-y-1.5">
            <li><Link href="/prijzen" className="hover:text-cobalt">Alle vaste prijzen</Link></li>
            <li><Link href="/voorwaarden" className="hover:text-cobalt">Algemene voorwaarden</Link></li>
            <li><Link href="/privacy" className="hover:text-cobalt">Privacyverklaring</Link></li>
            {site.googleReviewsUrl && (
              <li>
                <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cobalt">
                  Google-reviews
                </a>
              </li>
            )}
          </ul>
          <p className="mt-4 text-xs text-steel">
            {site.kbo ? `KBO ${site.kbo}` : "KBO-nummer in aanvraag"}
            <br />
            Bijzondere vrijstellingsregeling kleine ondernemingen
          </p>
        </div>
      </div>
    </footer>
  );
}
