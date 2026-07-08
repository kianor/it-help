import type { Metadata } from "next";
import Link from "next/link";
import { ServiceList } from "@/components/ServiceList";
import { CallButton } from "@/components/CtaButtons";
import { isLocale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { p } from "@/i18n/slugs.mjs";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata(params.lang, "voor-zaken", (d) => d.meta.zaken);
}

export default function VoorZakenPage({ params }: { params: { lang: string } }) {
  const lang = isLocale(params.lang) ? params.lang : "nl";
  const dict = getDict(lang);
  const t = dict.zakenPage;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-14">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold">{t.title}</h1>
        <p className="mt-4 text-lg text-ink/80">{t.intro}</p>
      </div>

      {/* Hoofd-CTA: gratis IT-check */}
      <section className="pt-10">
        <div className="rounded-2xl bg-ink p-8 text-white sm:p-10">
          <p className="font-mono text-sm font-bold text-signal">{t.checkKicker}</p>
          <h2 className="mt-2 text-3xl font-bold">{t.checkTitle}</h2>
          <p className="mt-3 max-w-2xl text-white/85">{t.checkText}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={p(lang, "contact")} className="btn-primary">
              {t.checkCta}
            </Link>
            <CallButton
              label={dict.common.callCta}
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/70 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-ink"
            />
          </div>
        </div>
      </section>

      <section className="pt-14">
        <h2 className="text-2xl font-bold">{t.packagesTitle}</h2>
        <div className="mt-5">
          <ServiceList group={dict.services.voorZaken} />
        </div>
      </section>

      <section className="pt-10">
        <div className="rounded-xl border-l-4 border-cobalt bg-white p-6">
          <p className="label">{t.promiseLabel}</p>
          <p className="text-lg font-semibold">{dict.common.responsePromise}</p>
        </div>
      </section>
    </div>
  );
}
