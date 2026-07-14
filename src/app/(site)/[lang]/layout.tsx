import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../../globals.css";
import { fontClasses } from "../../fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCallBar } from "@/components/StickyCallBar";
import { PromoBanner } from "@/components/PromoBanner";
import { KonamiEgg } from "@/components/KonamiEgg";
import { site, siteUrl } from "@/config/site";
import { getSite } from "@/lib/site-config";
import { locales, isLocale, htmlLang } from "@/i18n/config";
import { getDict } from "@/i18n";
import { p } from "@/i18n/slugs.mjs";
import { HitBeacon } from "@/components/HitBeacon";
import { AnalyticsListener } from "@/components/AnalyticsListener";
import { Ga4Consent } from "@/components/Ga4Consent";
import { RevealObserver } from "@/components/RevealObserver";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessLd, webSiteLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : "nl";
  const dict = getDict(lang);
  const ogLocale = lang === "nl" ? "nl_BE" : lang === "fr" ? "fr_BE" : "en_US";
  return {
    metadataBase: new URL(siteUrl()),
    title: {
      default: dict.meta.home.title,
      template: `%s | ${site.name}`,
    },
    description: dict.meta.home.description,
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: `${siteUrl()}/${lang}`,
      siteName: site.name,
      title: dict.meta.home.title,
      description: dict.meta.home.description,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.home.title,
      description: dict.meta.home.description,
    },
  };
}

/** Zet de game-modus-klasse vóór hydration zodat er geen flits is. */
const gameModeScript = `document.documentElement.classList.add('js');try{if(localStorage.getItem('ritsit-game')==='1')document.documentElement.classList.add('game')}catch(e){}`;

export default function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const dict = getDict(lang);

  return (
    <html lang={htmlLang[lang]} className={fontClasses}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: gameModeScript }} />
        <a
          href="#inhoud"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2"
        >
          {dict.common.skipToContent}
        </a>
        <PromoBanner lang={lang} label={dict.promo.label} template={dict.promo.template} one={dict.promo.one} many={dict.promo.many} contactHref={p(lang, "contact")} />
        <Header
          lang={lang}
          nav={dict.nav}
          callCta={dict.common.callCta}
          gameMode={dict.common.gameMode}
          menuOpen={dict.common.menuOpen}
          menuClose={dict.common.menuClose}
          volgLabel={dict.footer.links.volg}
          phone={getSite().phone}
        />
        <main id="inhoud">{children}</main>
        <Footer lang={lang} dict={dict} />
        <StickyCallBar callMe={dict.common.callMe} />
        <KonamiEgg title={dict.konami.title} text={dict.konami.text} close={dict.konami.close} />
        <JsonLd data={localBusinessLd(lang)} />
        <JsonLd data={webSiteLd(lang)} />
        <HitBeacon lang={lang} />
        <AnalyticsListener />
        <RevealObserver />
        <Ga4Consent text={dict.consent.text} accept={dict.consent.accept} decline={dict.consent.decline} />
      </body>
    </html>
  );
}
