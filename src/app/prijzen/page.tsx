import type { Metadata } from "next";
import Link from "next/link";
import { allGroups } from "@/config/services";
import { ServiceList } from "@/components/ServiceList";
import { site } from "@/config/site";
import { CallButton } from "@/components/CtaButtons";

export const metadata: Metadata = {
  title: "Alle vaste prijzen op één pagina",
  description:
    "De volledige prijslijst: pc builds, herstel, consoles, hulp aan huis en pakketten voor zaken. Vaste prijzen vooraf, geen verrassingen. Herent en Leuven.",
};

export default function PrijzenPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-14">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold">Alle prijzen, gewoon op tafel</h1>
        <p className="mt-4 text-lg text-ink/80">
          Vaste prijzen, vooraf gekend. Twijfel je welke dienst je nodig hebt?
          Bel of app me, dan zeg ik eerlijk wat het wordt, en wat níet nodig is.
        </p>
      </div>

      <div className="mt-10 space-y-12">
        {allGroups.map((group) => (
          <section key={group.slug}>
            <h2 className="text-2xl font-bold">{group.title}</h2>
            <div className="mt-4">
              <ServiceList group={group} />
            </div>
          </section>
        ))}
      </div>

      <p className="mt-10 text-sm text-steel">Verplaatsing: {site.travel}</p>

      <section className="pt-12">
        <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-cobalt/5 p-8">
          <div className="flex-1">
            <h2 className="text-xl font-bold">Staat jouw probleem er niet tussen?</h2>
            <p className="mt-1 text-ink/80">Vraag het gewoon. Kan ik het niet, dan verwijs ik je eerlijk door.</p>
          </div>
          <div className="flex gap-3">
            <CallButton />
            <Link href="/contact" className="btn-secondary">Stuur een bericht</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
