import type { Metadata } from "next";
import Link from "next/link";
import { ServiceList } from "@/components/ServiceList";
import { CallButton } from "@/components/CtaButtons";
import { isLocale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { p } from "@/i18n/slugs.mjs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, serviceLd } from "@/lib/structured-data";

export const revalidate = 3600; // uur-refresh; promo-acties revalideren direct

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata(params.lang, "herstel", (d) => d.meta.herstel);
}

export default function HerstelPage({ params }: { params: { lang: string } }) {
  const lang = isLocale(params.lang) ? params.lang : "nl";
  const dict = getDict(lang);
  const t = dict.herstelPage;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-14">
      <JsonLd data={breadcrumbLd(lang, "herstel", dict.nav.herstel)} />
      <JsonLd data={serviceLd(lang, dict.services.herstel, t.title, t.intro, "herstel")} />
      <div className="max-w-3xl" data-reveal>
        <h1 className="text-4xl font-bold">{t.title}</h1>
        <p className="mt-4 text-lg text-ink/80">{t.intro}</p>
      </div>

      <section className="pt-10" data-reveal>
        <h2 className="text-2xl font-bold">{t.repairTitle}</h2>
        <div className="mt-5">
          <ServiceList group={dict.services.herstel} />
        </div>
      </section>

      <section className="pt-14" data-reveal>
        <h2 className="text-2xl font-bold">{t.homeTitle}</h2>
        <p className="mt-2 max-w-2xl text-ink/80">{t.homeIntro}</p>
        <div className="mt-5">
          <ServiceList group={dict.services.aanHuis} />
        </div>
        <p className="mt-3 text-sm text-steel">
          {dict.common.travelLabel}: {dict.common.travel}
        </p>
      </section>

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
