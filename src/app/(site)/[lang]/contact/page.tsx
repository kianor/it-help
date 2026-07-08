import type { Metadata } from "next";
import { site } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";
import { NewsletterForm } from "@/components/NewsletterForm";
import { CallButton, WhatsAppButton } from "@/components/CtaButtons";
import { isLocale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata(params.lang, "/contact", (d) => d.meta.contact);
}

export default function ContactPage({ params }: { params: { lang: string } }) {
  const lang = isLocale(params.lang) ? params.lang : "nl";
  const dict = getDict(lang);
  const t = dict.contactPage;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-14">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold">{t.title}</h1>
        <p className="mt-4 text-lg text-ink/80">{t.intro}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <CallButton label={dict.common.callCta} />
          <WhatsAppButton label={dict.common.whatsappCta} />
        </div>
        <p className="mt-3 font-mono text-sm text-steel">
          {site.phoneDisplay} · {dict.common.openingInfo.toLowerCase()}
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ContactForm
            lang={lang}
            labels={t.form}
            serviceOptions={t.serviceOptions}
            privacyHref={`/${lang}/privacy`}
          />
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-ink/10 bg-white p-6">
            <p className="label">{t.aside.regionLabel}</p>
            <p className="font-semibold">{dict.common.region}</p>
            <p className="mt-2 text-sm text-ink/80">{dict.common.travel}</p>
          </div>
          <div className="rounded-xl border border-ink/10 bg-white p-6">
            <p className="label">{t.aside.expectLabel}</p>
            <p className="text-sm text-ink/80">{dict.common.responsePromise}</p>
          </div>
          <div className="rounded-xl border border-ink/10 bg-white p-6">
            <p className="label">{t.aside.newsletterLabel}</p>
            <p className="mb-3 text-sm text-ink/80">{t.aside.newsletterText}</p>
            <NewsletterForm lang={lang} labels={dict.newsletter} />
          </div>
        </aside>
      </div>
    </div>
  );
}
