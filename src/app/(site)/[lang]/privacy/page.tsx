import type { Metadata } from "next";
import { site } from "@/config/site";
import { isLocale } from "@/i18n/config";
import { getDict, fill } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata(params.lang, "privacy", (d) => d.meta.privacy);
}

export default function PrivacyPage({ params }: { params: { lang: string } }) {
  const lang = isLocale(params.lang) ? params.lang : "nl";
  const t = getDict(lang).privacy;
  const values = { phone: site.phoneDisplay, email: site.email };

  return (
    <div className="mx-auto max-w-3xl px-4 pt-14">
      <h1 className="text-4xl font-bold">{t.title}</h1>
      <p className="mt-2 text-sm text-steel">{t.updated}</p>

      <div className="mt-8 space-y-8 leading-relaxed text-ink/90">
        {t.sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-2xl font-bold">{s.h}</h2>
            {s.ps.map((p) => (
              <p key={p.slice(0, 40)} className="mt-3">{fill(p, values)}</p>
            ))}
            {s.list && (
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                {s.list.map((item) => (
                  <li key={item.slice(0, 40)}>{fill(item, values)}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
