import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata(params.lang, "/voorwaarden", (d) => d.meta.voorwaarden);
}

/*
 * NOOT VOOR KIANO: degelijke basis in mensentaal, maar laat vóór livegang de
 * modelvoorwaarden van UNIZO of Acerta hier tegenaan leggen (briefing, open
 * item 6). De teksten staan in src/i18n/nl.ts, en.ts en fr.ts.
 */

export default function VoorwaardenPage({ params }: { params: { lang: string } }) {
  const lang = isLocale(params.lang) ? params.lang : "nl";
  const t = getDict(lang).voorwaarden;

  return (
    <div className="mx-auto max-w-3xl px-4 pt-14">
      <h1 className="text-4xl font-bold">{t.title}</h1>
      <p className="mt-2 text-sm text-steel">{t.updated}</p>

      <div className="mt-8 space-y-8 leading-relaxed text-ink/90">
        {t.sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-2xl font-bold">{s.h}</h2>
            {s.ps.map((p) => (
              <p key={p.slice(0, 40)} className="mt-3">{p}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
