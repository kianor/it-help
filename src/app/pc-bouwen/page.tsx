import type { Metadata } from "next";
import Link from "next/link";
import { pcBouwen } from "@/config/services";
import { ServiceList } from "@/components/ServiceList";
import { CallButton } from "@/components/CtaButtons";

export const metadata: Metadata = {
  title: "Game-PC laten bouwen in Leuven | vaste prijs vanaf €130",
  description:
    "Custom game-pc laten bouwen in Herent of Leuven. Jij bestelt de onderdelen zelf zonder tussenmarge, ik bouw, test en lever speelklaar af. Vaste prijzen vanaf €130.",
};

const stappen = [
  { title: "Kennismaking", text: "We overlopen je budget, je games en je wensen. Gratis en vrijblijvend." },
  { title: "Onderdelenlijst op maat", text: "Je krijgt een lijst met de beste onderdelen voor jouw budget, met bestellinks." },
  { title: "Jij bestelt zelf", text: "Rechtstreeks bij de winkel. Geen tussenmarge, en de volledige fabrieksgarantie staat op jouw naam." },
  { title: "Ik bouw", text: "Zorgvuldige montage met degelijk kabelmanagement." },
  { title: "Windows en BIOS", text: "Installatie, BIOS/EXPO-instellingen en alle drivers up-to-date." },
  { title: "Stresstest en testrapport", text: "Je pc wordt getest op temperatuur en stabiliteit. Je krijgt het rapport erbij." },
  { title: "30 dagen nazorg", text: "Vraagje of probleempje in de eerste maand? Ik help je gratis verder." },
];

const faq = [
  {
    q: "Waarom bestel ik de onderdelen zelf?",
    a: "Zo betaal je geen tussenmarge en staat de fabrieksgarantie van elk onderdeel op jouw naam bij de winkel. Gaat er binnen de garantie iets stuk, dan regel je dat rechtstreeks, zonder tussenpersoon. Ik help je uiteraard als je niet weet hoe.",
  },
  {
    q: "Wat als een onderdeel kapot aankomt?",
    a: "Dat merk ik tijdens de build of de stresstest. Je stuurt het gewoon terug naar de winkel en ik bouw verder zodra het vervangstuk er is.",
  },
  {
    q: "Hoe lang duurt een build?",
    a: "Zodra alle onderdelen binnen zijn meestal enkele dagen, afhankelijk van mijn agenda. Je krijgt vooraf een duidelijke afspraak.",
  },
  {
    q: "Bouw je ook pc's voor videobewerking of kantoor?",
    a: "Zeker. Het proces is hetzelfde: jouw budget en gebruik bepalen de onderdelenlijst.",
  },
  {
    q: "Kan ik mijn oude pc upgraden in plaats van een nieuwe te kopen?",
    a: "Vaak wel, en dat is meestal goedkoper. Met een upgrade-sessie (€55) kijk ik wat zinvol is. Loont het niet, dan zeg ik dat eerlijk.",
  },
];

export default function PcBouwenPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-14">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold">PC laten bouwen</h1>
        <p className="mt-4 text-lg text-ink/80">
          Droom je van een game-pc maar zie je op tegen het bouwen? Jij kiest je
          budget, ik zoek de beste onderdelen, jij bestelt ze gewoon zelf online.
          Zo betaal je geen tussenmarge en hou je alle garantie bij de winkel.
          Daarna bouw ik alles vakkundig in elkaar, getest en speelklaar. Vanaf
          130 euro.
        </p>
      </div>

      <div className="mt-10">
        <ServiceList group={pcBouwen} />
      </div>

      <section className="pt-16">
        <h2 className="text-2xl font-bold">Zo werkt het, in 7 stappen</h2>
        <ol className="mt-6 space-y-4">
          {stappen.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-xl border border-ink/10 bg-white p-4">
              <span className="font-mono text-sm font-bold text-signal">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-ink/80">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="pt-16">
        <h2 className="text-2xl font-bold">Veelgestelde vragen</h2>
        <div className="mt-6 space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="group rounded-xl border border-ink/10 bg-white p-4">
              <summary className="cursor-pointer list-none font-semibold marker:hidden">
                <span className="mr-2 font-mono text-signal group-open:hidden">+</span>
                <span className="mr-2 hidden font-mono text-signal group-open:inline">−</span>
                {f.q}
              </summary>
              <p className="mt-3 text-ink/80">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="pt-16">
        <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-cobalt/5 p-8">
          <div className="flex-1">
            <h2 className="text-xl font-bold">Klaar om te bouwen?</h2>
            <p className="mt-1 text-ink/80">Vertel me je budget en je favoriete games, dan doe ik een voorstel.</p>
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
