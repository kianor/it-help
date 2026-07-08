import type { Metadata } from "next";
import Link from "next/link";
import { CallButton } from "@/components/CtaButtons";
import { PriceTag } from "@/components/PriceTag";
import { isLocale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const meta = pageMetadata(params.lang, "", (d) => d.meta.home);
  // De home-titel bevat de merknaam al; niet nog eens via het template toevoegen.
  return { ...meta, title: { absolute: String(meta.title) } };
}

const blockHrefs = ["/pc-bouwen", "/herstel", "/consoles", "/voor-zaken"];
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
          <p className="font-mono text-sm font-bold uppercase tracking-wide text-signal">{t.kicker}</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            {t.heroTitle} <span className="text-cobalt">{t.heroAccent}</span>
          </h1>
          <p className="mt-5 text-lg text-ink/80">{t.heroSub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CallButton label={dict.common.callCta} />
            <Link href={`/${lang}/prijzen`} className="btn-secondary">
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
              key={blockHrefs[i]}
              href={`/${lang}${blockHrefs[i]}`}
              className={`group animate-reveal rounded-xl border border-ink/10 bg-white p-6 transition hover:-translate-y-0.5 hover:border-cobalt/50 hover:shadow-md ${
                gamerBlocks.has(i) ? "gamer-card" : ""
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
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
            <div key={s.title} className="rounded-xl border border-ink/10 bg-white p-6">
              <span className="font-mono text-sm font-bold text-signal">
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
              <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
              <div>
                <h3 className="font-bold">{w.title}</h3>
                <p className="mt-1 text-ink/80">{w.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews + launch-actie */}
      <section className="mx-auto max-w-6xl px-4 pt-20">
        <div className="rounded-xl border border-dashed border-steel/50 bg-white p-8 text-center">
          <h2 className="text-2xl font-bold">{t.reviewsTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink/80">{t.reviewsText}</p>
        </div>
      </section>

      {/* Afsluitende CTA */}
      <section className="mx-auto max-w-6xl px-4 pt-20">
        <div className="rounded-2xl bg-ink p-8 text-white sm:p-12">
          <h2 className="text-3xl font-bold">{t.ctaTitle}</h2>
          <p className="mt-3 max-w-2xl text-white/85">
            {t.ctaText} {dict.common.travel}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CallButton label={dict.common.callCta} />
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/70 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-ink"
            >
              {dict.common.sendMessage}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
