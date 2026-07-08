import type { Metadata } from "next";
import Link from "next/link";
import { voorZaken } from "@/config/services";
import { ServiceList } from "@/components/ServiceList";
import { site } from "@/config/site";
import { CallButton } from "@/components/CtaButtons";

export const metadata: Metadata = {
  title: "IT-support voor kleine ondernemingen Leuven",
  description:
    "IT-support voor kappers, garages, praktijken en andere kleine zaken in Herent en Leuven. Vast maandbedrag, gratis IT-check, reactie dezelfde werkdag.",
};

export default function VoorZakenPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-14">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold">IT voor je zaak, zonder eigen IT&apos;er</h1>
        <p className="mt-4 text-lg text-ink/80">
          Geen eigen IT&apos;er maar wel computers, een kassa en mail die gewoon
          moeten werken? Voor een vast bedrag per maand hou ik alles up-to-date,
          controleer ik je back-ups en ben ik je eerste hulplijn.
        </p>
      </div>

      {/* Hoofd-CTA: gratis IT-check */}
      <section className="pt-10">
        <div className="rounded-2xl bg-ink p-8 text-white sm:p-10">
          <p className="font-mono text-sm font-bold text-signal">gratis en vrijblijvend</p>
          <h2 className="mt-2 text-3xl font-bold">De gratis IT-check</h2>
          <p className="mt-3 max-w-2xl text-white/85">
            In een half uur ter plaatse weet je waar je zaak risico loopt:
            back-ups, beveiliging, updates en netwerk. Je krijgt een rapport op
            één A4, in mensentaal. Daarna beslis jij zelf wat je ermee doet,
            zonder verplichting.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Vraag de gratis IT-check aan
            </Link>
            <CallButton className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/70 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-ink" />
          </div>
        </div>
      </section>

      <section className="pt-14">
        <h2 className="text-2xl font-bold">Pakketten en tarieven</h2>
        <div className="mt-5">
          <ServiceList group={voorZaken} />
        </div>
      </section>

      <section className="pt-10">
        <div className="rounded-xl border-l-4 border-cobalt bg-white p-6">
          <p className="label">Mijn reactiebelofte</p>
          <p className="text-lg font-semibold">{site.responsePromise}</p>
        </div>
      </section>
    </div>
  );
}
