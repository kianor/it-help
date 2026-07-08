import type { Metadata } from "next";
import Link from "next/link";
import { ServiceList } from "@/components/ServiceList";
import { CallButton } from "@/components/CtaButtons";
import { isLocale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { p } from "@/i18n/slugs.mjs";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata(params.lang, "prijzen", (d) => d.meta.prijzen);
}

export default function PrijzenPage({ params }: { params: { lang: string } }) {
  const lang = isLocale(params.lang) ? params.lang : "nl";
  const dict = getDict(lang);
  const t = dict.prijzenPage;
  const groups = [
    dict.services.pcBouwen,
    dict.services.herstel,
    dict.services.consoles,
    dict.services.aanHuis,
    dict.services.voorZaken,
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-14">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold">{t.title}</h1>
        <p className="mt-4 text-lg text-ink/80">{t.intro}</p>
      </div>

      <div className="mt-10 space-y-12">
        {groups.map((group) => (
          <section key={group.slug}>
            <h2 className="text-2xl font-bold">{group.title}</h2>
            <div className="mt-4">
              <ServiceList group={group} />
            </div>
          </section>
        ))}
      </div>

      <p className="mt-10 text-sm text-steel">
        {dict.common.travelLabel}: {dict.common.travel}
      </p>

      <section className="pt-12">
        <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-cobalt/5 p-8">
          <div className="flex-1">
            <h2 className="text-xl font-bold">{t.notFoundTitle}</h2>
            <p className="mt-1 text-ink/80">{t.notFoundText}</p>
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
