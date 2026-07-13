import type { Metadata } from "next";
import Link from "next/link";
import { CallButton } from "@/components/CtaButtons";
import { PriceTag } from "@/components/PriceTag";
import { LiteYouTube } from "@/components/LiteYouTube";
import { isLocale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { p, type PageKey } from "@/i18n/slugs.mjs";
import { listReviews, reviewStats, getSetting } from "@/lib/db";
import { site, siteUrl } from "@/config/site";
import { fill } from "@/i18n";

// ISR: statisch geserveerd en elke 5 min ververst; admin-acties op reviews,
// video's en acties revalideren direct (zie admin/actions.ts).
export const revalidate = 300;

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const meta = pageMetadata(params.lang, "", (d) => d.meta.home);
  // De home-titel bevat de merknaam al; niet nog eens via het template toevoegen.
  return { ...meta, title: { absolute: String(meta.title) } };
}

const blockPages: PageKey[] = ["pc-bouwen", "herstel", "consoles", "voor-zaken"];
// PC bouwen en consoles krijgen het gamer-accent (RGB-glow op hover)
const gamerBlocks = new Set([0, 2]);

export default function HomePage({ params }: { params: { lang: string } }) {
  const lang = isLocale(params.lang) ? params.lang : "nl";
  const dict = getDict(lang);
  const t = dict.home;

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:pt-20">
        <div className="max-w-3xl">
          <p className="font-mono text-sm font-bold uppercase tracking-wide text-accent-strong">{t.kicker}</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            {t.heroTitle} <span className="text-cobalt">{t.heroAccent}</span>
          </h1>
          <p className="mt-5 text-lg text-ink/80">{t.heroSub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CallButton label={dict.common.callCta} />
            <Link href={p(lang, "prijzen")} className="btn-secondary">
              {dict.common.viewPrices}
            </Link>
          </div>
        </div>
      </section>

      {/* Vier dienstblokken */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {t.blocks.map((b, i) => (
            <Link
              key={blockPages[i]}
              href={p(lang, blockPages[i])}
              data-track="nav_click"
              data-track-label={blockPages[i]}
              className={`group animate-reveal rounded-xl border border-ink/10 bg-surface p-6 transition hover:-translate-y-0.5 hover:border-cobalt/50 hover:shadow-md ${
                gamerBlocks.has(i) ? "gamer-card" : ""
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-bold group-hover:text-cobalt">{b.title}</h2>
                <PriceTag price={b.price} />
              </div>
              <p className="mt-3 text-ink/80">{b.text}</p>
              <p className="mt-4 text-sm font-semibold text-cobalt">{dict.common.moreInfo}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Hoe het werkt */}
      <section className="mx-auto max-w-6xl px-4 pt-20">
        <h2 className="text-3xl font-bold">{t.howTitle}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {t.steps.map((s, i) => (
            <div key={s.title} className="rounded-xl border border-ink/10 bg-surface p-6">
              <span className="font-mono text-sm font-bold text-accent-strong">
                {t.stepLabel} {i + 1}
              </span>
              <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-ink/80">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Waarom ik */}
      <section className="mx-auto max-w-6xl px-4 pt-20">
        <h2 className="text-3xl font-bold">{t.whyTitle}</h2>
        <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {t.why.map((w) => (
            <div key={w.title} className="flex gap-4">
              <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent-strong" aria-hidden="true" />
              <div>
                <h3 className="font-bold">{w.title}</h3>
                <p className="mt-1 text-ink/80">{w.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews (beheerd in admin, bron Trustpilot/Google) */}
      <ReviewsSection lang={lang} />

      {/* Social: before/after-video's */}
      <SocialSection lang={lang} />

      {/* Afsluitende CTA */}
      <section className="mx-auto max-w-6xl px-4 pt-20">
        <div className="rounded-2xl bg-panel p-8 text-white sm:p-12">
          <h2 className="text-3xl font-bold">{t.ctaTitle}</h2>
          <p className="mt-3 max-w-2xl text-white/85">
            {t.ctaText} {dict.common.travel}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CallButton label={dict.common.callCta} />
            <Link
              href={p(lang, "contact")}
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/70 px-6 py-3 font-semibold text-white transition hover:bg-surface hover:text-ink"
            >
              {dict.common.sendMessage}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="font-mono text-accent" aria-label={`${rating}/5`}>
      {"★".repeat(Math.round(rating))}
      <span className="text-steel/40">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}

function ReviewsSection({ lang }: { lang: "nl" | "en" | "fr" }) {
  const dict = getDict(lang);
  const t = dict.reviewsSection;
  const reviews = listReviews(true).slice(0, 6);
  const stats = reviewStats();

  return (
    <section className="mx-auto max-w-6xl px-4 pt-20">
      <h2 className="text-3xl font-bold">{t.title}</h2>
      {reviews.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-steel/50 bg-surface p-8 text-center">
          <p className="mx-auto max-w-xl text-ink/80">{t.empty}</p>
        </div>
      ) : (
        <>
          <p className="mt-2 text-sm text-steel">
            {fill(t.basedOn, { count: stats.count, avg: stats.avg })}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.id} className="rounded-xl border border-ink/10 bg-surface p-5">
                <Stars rating={r.rating} />
                <blockquote className="mt-2 text-sm text-ink/90">{r.text}</blockquote>
                <figcaption className="mt-3 text-sm font-semibold">
                  {r.author} <span className="font-normal text-steel">{t.via} {r.source}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                name: site.name,
                url: `${siteUrl()}/${lang}`,
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: stats.avg,
                  reviewCount: stats.count,
                  bestRating: 5,
                },
              }),
            }}
          />
        </>
      )}
      {site.trustpilotUrl && (
        <p className="mt-4 flex flex-wrap gap-4 text-sm">
          <a href={site.trustpilotUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-cobalt hover:underline">
            {t.readAll} →
          </a>
          <a href={site.trustpilotUrl} target="_blank" rel="noopener noreferrer" className="text-steel hover:text-cobalt hover:underline">
            {t.write}
          </a>
        </p>
      )}
    </section>
  );
}

function SocialSection({ lang }: { lang: "nl" | "en" | "fr" }) {
  const dict = getDict(lang);
  const t = dict.socialSection;
  const raw = (getSetting("social_videos") || "").split("\n").map((l) => l.trim()).filter(Boolean);
  const socials = [
    { label: "TikTok", url: site.socials.tiktok },
    { label: "Instagram", url: site.socials.instagram },
    { label: "YouTube", url: site.socials.youtube },
  ].filter((s) => s.url);
  if (raw.length === 0 && socials.length === 0) return null;

  const embeds = raw
    .map((url) => {
      const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{6,})/);
      return yt ? { id: yt[1], url } : null;
    })
    .filter(Boolean)
    .slice(0, 3) as { id: string; url: string }[];

  return (
    <section className="mx-auto max-w-6xl px-4 pt-20">
      <h2 className="text-3xl font-bold">{t.title}</h2>
      <p className="mt-2 max-w-2xl text-ink/80">{t.intro}</p>
      {embeds.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {embeds.map((v) => (
            <div key={v.id} className="gamer-card overflow-hidden rounded-xl border border-ink/10 bg-surface">
              <LiteYouTube id={v.id} title={t.title} />
            </div>
          ))}
        </div>
      )}
      {socials.length > 0 && (
        <p className="mt-5 flex flex-wrap gap-4">
          {socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              {s.label}
            </a>
          ))}
        </p>
      )}
    </section>
  );
}
