import Link from "next/link";
import { site } from "@/config/site";
import { CallButton } from "@/components/CtaButtons";
import { PriceTag } from "@/components/PriceTag";

const blocks = [
  {
    href: "/pc-bouwen",
    title: "PC laten bouwen",
    text: "Jij kiest je budget, ik zoek de onderdelen, jij bestelt zelf. Geen tussenmarge, alle garantie bij de winkel.",
    price: "vanaf €130",
  },
  {
    href: "/herstel",
    title: "PC & laptop herstel",
    text: "Trage laptop, virus of wifi die hapert? Aan huis of remote, met uitleg in gewone mensentaal.",
    price: "vanaf €25",
  },
  {
    href: "/consoles",
    title: "Consoles & controllers",
    text: "Luide PlayStation, driftende Joy-Con of plakkende controller. Vaak dezelfde dag klaar.",
    price: "vanaf €25",
  },
  {
    href: "/voor-zaken",
    title: "Voor zaken",
    text: "Geen eigen IT'er? Voor een vast bedrag per maand hou ik alles draaiende. Start met een gratis IT-check.",
    price: "gratis IT-check",
  },
];

const steps = [
  {
    title: "Neem contact op",
    text: "Bel, app of gebruik het formulier. Je krijgt vandaag nog antwoord.",
  },
  {
    title: "Vaste prijs vooraf",
    text: "Je weet exact wat het kost vóór ik begin. Geen verrassingen achteraf.",
  },
  {
    title: "Opgelost, met uitleg",
    text: "Ik los het op en leg rustig uit wat er aan de hand was en hoe je het voorkomt.",
  },
];

const why = [
  {
    title: "Vaste prijzen",
    text: "Elke dienst heeft een vaste prijs die vooraf vastligt. Die vind je gewoon op deze site.",
  },
  {
    title: "Uit de buurt",
    text: `Ik woon en werk in ${site.region}. Geen callcenter, geen wachtmuziek.`,
  },
  {
    title: "Mensentaal",
    text: "Je krijgt uitleg waar je iets aan hebt, zonder jargon en zonder verkooppraatje.",
  },
  {
    title: "Eerlijk advies",
    text: "Loont herstellen niet meer? Dan zeg ik dat eerlijk en help ik je kiezen wat wel slim is.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:pt-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Computerhulp uit je eigen buurt.{" "}
            <span className="text-cobalt">Vaste prijzen, geen verrassingen.</span>
          </h1>
          <p className="mt-5 text-lg text-ink/80">
            Game-pc laten bouwen, trage laptop, luide PlayStation of een zaak
            zonder IT&apos;er? Ik los het op en leg uit wat er gebeurd is, in
            gewone mensentaal.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CallButton />
            <Link href="/prijzen" className="btn-secondary">
              Bekijk vaste prijzen
            </Link>
          </div>
        </div>
      </section>

      {/* Vier dienstblokken */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {blocks.map((b, i) => (
            <Link
              key={b.href}
              href={b.href}
              className="group animate-reveal rounded-xl border border-ink/10 bg-white p-6 transition hover:border-cobalt/50 hover:shadow-md"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-bold group-hover:text-cobalt">{b.title}</h2>
                <PriceTag price={b.price} />
              </div>
              <p className="mt-3 text-ink/80">{b.text}</p>
              <p className="mt-4 text-sm font-semibold text-cobalt">
                Meer info →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Hoe het werkt */}
      <section className="mx-auto max-w-6xl px-4 pt-20">
        <h2 className="text-3xl font-bold">Hoe het werkt</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-xl border border-ink/10 bg-white p-6">
              <span className="font-mono text-sm font-bold text-signal">
                stap {i + 1}
              </span>
              <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-ink/80">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Waarom ik */}
      <section className="mx-auto max-w-6xl px-4 pt-20">
        <h2 className="text-3xl font-bold">Waarom bij mij?</h2>
        <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {why.map((w) => (
            <div key={w.title} className="flex gap-4">
              <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
              <div>
                <h3 className="font-bold">{w.title}</h3>
                <p className="mt-1 text-ink/80">{w.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews (placeholder tot Google-reviews binnenlopen) */}
      <section className="mx-auto max-w-6xl px-4 pt-20">
        <div className="rounded-xl border border-dashed border-steel/50 bg-white p-8 text-center">
          <h2 className="text-2xl font-bold">Reviews van klanten</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink/80">
            Ik ben pas gestart, dus de eerste reviews komen eraan. Word jij een
            van mijn eerste klanten? Dan geniet je van de launch-actie én help
            je een lokale starter op weg.
          </p>
        </div>
      </section>

      {/* Afsluitende CTA */}
      <section className="mx-auto max-w-6xl px-4 pt-20">
        <div className="rounded-2xl bg-ink p-8 text-white sm:p-12">
          <h2 className="text-3xl font-bold">Iets kapot, iets traag of grote plannen?</h2>
          <p className="mt-3 max-w-2xl text-white/85">
            Bel of app me en je weet vandaag nog waar je aan toe bent. Actief in{" "}
            {site.region}. {site.travel}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CallButton />
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/70 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-ink"
            >
              Stuur een bericht
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
