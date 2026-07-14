import type { Metadata } from "next";
import Link from "next/link";
import { ServiceList } from "@/components/ServiceList";
import { CallButton } from "@/components/CtaButtons";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { listGallery } from "@/lib/db";
import { isLocale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { p } from "@/i18n/slugs.mjs";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/structured-data";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata(params.lang, "consoles", (d) => d.meta.consoles);
}

export const revalidate = 300;

export default function ConsolesPage({ params }: { params: { lang: string } }) {
  const lang = isLocale(params.lang) ? params.lang : "nl";
  const dict = getDict(lang);
  const t = dict.consolesPage;
  const gallery = listGallery();

  return (
    <div className="mx-auto max-w-6xl px-4 pt-14">
      <JsonLd data={breadcrumbLd(lang, "consoles", dict.nav.consoles)} />
      <div className="max-w-3xl" data-reveal>
        <h1 className="text-4xl font-bold">{t.title}</h1>
        <p className="mt-4 text-lg text-ink/80">{t.intro}</p>
      </div>

      <div className="mt-10">
        <ServiceList group={dict.services.consoles} />
      </div>

      {gallery.length > 0 && (
        <section className="pt-16" data-reveal>
          <h2 className="text-2xl font-bold">{t.galleryTitle}</h2>
          <p className="mt-2 max-w-2xl text-ink/80">{t.galleryIntro}</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {gallery.map((item) => (
              <figure key={item.id} className="gamer-card rounded-xl border border-ink/10 bg-surface p-4">
                <BeforeAfterSlider
                  beforeSrc={`/api/uploads/${item.before_file}`}
                  afterSrc={`/api/uploads/${item.after_file}`}
                  beforeLabel={t.before}
                  afterLabel={t.after}
                  sliderLabel={t.sliderLabel}
                  alt={item.title}
                />
                <figcaption className="mt-3 font-semibold">{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="pt-16" data-reveal>
        <div className="rounded-2xl border border-ink/10 bg-surface p-8">
          <h2 className="text-2xl font-bold">{t.parentsTitle}</h2>
          <p className="mt-3 max-w-2xl text-ink/80">{t.parentsText}</p>
          <p className="mt-4">
            <span className="price-tag price-tag--accent">€49</span>
          </p>
        </div>
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
