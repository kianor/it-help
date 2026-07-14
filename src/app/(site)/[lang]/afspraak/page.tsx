import type { Metadata } from "next";
import { AppointmentPicker } from "@/components/AppointmentPicker";
import { availableSlots } from "@/lib/appointments";
import { getSite } from "@/lib/site-config";
import { isLocale, htmlLang } from "@/i18n/config";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/structured-data";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata(params.lang, "afspraak", (d) => d.meta.afspraak);
}

export const dynamic = "force-dynamic";

export default function AfspraakPage({ params }: { params: { lang: string } }) {
  const lang = isLocale(params.lang) ? params.lang : "nl";
  const dict = getDict(lang);
  const t = dict.afspraakPage;
  const days = availableSlots();

  return (
    <div className="mx-auto max-w-6xl px-4 pt-14">
      <JsonLd data={breadcrumbLd(lang, "afspraak", dict.nav.afspraak)} />
      <div className="max-w-3xl" data-reveal>
        <h1 className="text-4xl font-bold">{t.title}</h1>
        <p className="mt-4 text-lg text-ink/80">{t.intro}</p>
      </div>
      <div className="mt-10">
        <AppointmentPicker
          lang={lang}
          days={days}
          labels={t}
          form={dict.contactPage.form}
          serviceOptions={dict.contactPage.serviceOptions}
          htmlLang={htmlLang[lang]}
          callCta={dict.common.callCta}
          phone={getSite().phone}
        />
      </div>
    </div>
  );
}
