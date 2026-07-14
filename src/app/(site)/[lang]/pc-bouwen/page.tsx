import type { Metadata } from "next";
import Link from "next/link";
import { ServiceList } from "@/components/ServiceList";
import { CallButton } from "@/components/CtaButtons";
import { isLocale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { p } from "@/i18n/slugs.mjs";
import { PcCalculator } from "@/components/PcCalculator";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, serviceLd } from "@/lib/structured-data";

export const revalidate = 3600; // uur-refresh; promo-acties revalideren direct

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata(params.lang, "pc-bouwen", (d) => d.meta.pc);
}

export default function PcBouwenPage({ params }: { params: { lang: string } }) {
  const lang = isLocale(params.lang) ? params.lang : "nl";
  const dict = getDict(lang);
  const t = dict.pcPage;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-14">
      <div className="max-w-3xl" data-reveal>
        <h1 className="text-4xl font-bold">{t.title}</h1>
        <p className="mt-4 text-lg text-ink/80">{t.intro}</p>
      </div>

      <div className="mt-10">
        <ServiceList group={dict.services.pcBouwen} />
      </div>

      <section className="pt-16" data-reveal>
        <PcCalculator labels={dict.calculator} contactHref={p(lang, "contact")} />
      </section>

      <section className="pt-16" data-reveal>
        <h2 className="text-2xl font-bold">{t.stepsTitle}</h2>
        <ol className="mt-6 space-y-4">
          {t.steps.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-xl border border-ink/10 bg-surface p-4">
              <span className="font-mono text-sm font-bold text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-ink/80">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="pt-16" data-reveal>
        <h2 className="text-2xl font-bold">{t.faqTitle}</h2>
        <div className="mt-6 space-y-3">
          {t.faq.map((f) => (
            <details key={f.q} className="group rounded-xl border border-ink/10 bg-surface p-4">
              <summary className="cursor-pointer list-none font-semibold marker:hidden">
                <span className="mr-2 font-mono text-accent-strong group-open:hidden">+</span>
                <span className="mr-2 hidden font-mono text-accent-strong group-open:inline">−</span>
                {f.q}
              </summary>
              <p className="mt-3 text-ink/80">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: t.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <JsonLd data={breadcrumbLd(lang, "pc-bouwen", dict.nav.pc)} />
      <JsonLd data={serviceLd(lang, dict.services.pcBouwen, t.title, t.intro, "pc-bouwen")} />

      <section className="pt-16" data-reveal>
        <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-cobalt/5 p-8">
          <div className="flex-1">
            <h2 className="text-xl font-bold">{t.ctaTitle}</h2>
            <p className="mt-1 text-ink/80">{t.ctaText}</p>
          </div>
          <div className="flex gap-3">
            <CallButton label={dict.common.callCta} />
            <Link href={p(lang, "contact")} className="btn-secondary">{dict.common.sendMessage}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
