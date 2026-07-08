import type { Metadata } from "next";
import Link from "next/link";
import { herstel, aanHuis } from "@/config/services";
import { ServiceList } from "@/components/ServiceList";
import { CallButton } from "@/components/CtaButtons";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Computerhulp aan huis Herent en Leuven",
  description:
    "PC of laptop herstellen, computerhulp aan huis of remote hulp via schermdeling in Herent en Leuven. Vaste prijzen, uitleg in mensentaal, eerlijk advies.",
};

export default function HerstelPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-14">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold">PC & laptop herstel, ook bij jou thuis</h1>
        <p className="mt-4 text-lg text-ink/80">
          Trage laptop, wifi die hapert of een printer die niet wil luisteren?
          Ik kom langs, los het op en leg rustig uit wat er aan de hand was.
          Loont herstellen niet meer, dan zeg ik dat eerlijk en help ik je
          kiezen wat wel slim is.
        </p>
      </div>

      <section className="pt-10">
        <h2 className="text-2xl font-bold">Herstel & onderhoud</h2>
        <div className="mt-5">
          <ServiceList group={herstel} />
        </div>
      </section>

      <section className="pt-14">
        <h2 className="text-2xl font-bold">Hulp aan huis & extra&apos;s</h2>
        <p className="mt-2 max-w-2xl text-ink/80">
          Liever hulp op afstand? Via veilige schermdeling los ik veel op zonder
          verplaatsing, ideaal voor snelle vragen.
        </p>
        <div className="mt-5">
          <ServiceList group={aanHuis} />
        </div>
        <p className="mt-3 text-sm text-steel">Verplaatsing: {site.travel}</p>
      </section>

      <section className="pt-16">
        <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-cobalt/5 p-8">
          <div className="flex-1">
            <h2 className="text-xl font-bold">Vandaag nog weten waar je aan toe bent?</h2>
            <p className="mt-1 text-ink/80">Bel of app me en beschrijf kort het probleem. Je krijgt meteen een vaste prijs.</p>
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
