import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description: "De algemene voorwaarden van deze zaak, kort en in gewone mensentaal.",
};

/*
 * NOOT VOOR KIANO: dit is een degelijke basis in mensentaal, maar laat vóór
 * livegang de modelvoorwaarden van UNIZO of Acerta hier tegenaan leggen
 * (zie briefing, open item 6). Vervang of vul aan waar nodig.
 */

export default function VoorwaardenPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-14">
      <h1 className="text-4xl font-bold">Algemene voorwaarden</h1>
      <p className="mt-2 text-sm text-steel">Laatst bijgewerkt: juli 2026</p>

      <div className="mt-8 space-y-8 leading-relaxed text-ink/90">
        <section>
          <h2 className="text-2xl font-bold">1. Wie</h2>
          <p className="mt-3">
            {site.name}, {site.region}.
            {site.kbo ? ` KBO ${site.kbo}.` : " KBO-nummer in aanvraag."} Kleine
            onderneming onderworpen aan de bijzondere vrijstellingsregeling,
            btw niet toepasselijk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">2. Vaste prijzen, vooraf afgesproken</h2>
          <p className="mt-3">
            Elke opdracht start pas nadat we samen de prijs hebben vastgelegd.
            Duikt er tijdens het werk iets onverwachts op dat de prijs zou
            veranderen, dan stop ik en overleg ik eerst met jou. Jij beslist of
            ik verder ga.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">3. Onderdelen en garantie</h2>
          <p className="mt-3">
            Bij pc-builds bestel jij de onderdelen zelf: de fabrieksgarantie
            staat dan volledig op jouw naam bij de winkel. Op mijn werk zelf
            (montage, herstelling) krijg je 30 dagen nazorg: loopt er in die
            periode iets mis dat aan mijn werk ligt, dan los ik het gratis op.
            Toestellen die nog fabrieksgarantie hebben maak ik niet open; ik
            verwijs je dan door naar de fabrikant.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">4. Jouw data</h2>
          <p className="mt-3">
            Maak zelf een back-up van belangrijke bestanden vóór je een toestel
            binnenbrengt, of vraag me om er samen één te maken. Ik werk
            zorgvuldig, maar bij een herstelling is dataverlies nooit volledig
            uit te sluiten. Voor het omgaan met persoonsgegevens: zie de
            privacyverklaring.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">5. Aansprakelijkheid</h2>
          <p className="mt-3">
            Ik ben verzekerd voor beroepsaansprakelijkheid. Mijn
            aansprakelijkheid is beperkt tot het bedrag van de opdracht, behalve
            bij opzet of grove fout. Voor onrechtstreekse schade (zoals verlies
            van gegevens waarvan geen back-up bestond) ben ik niet
            aansprakelijk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">6. Betalen en annuleren</h2>
          <p className="mt-3">
            Betalen kan cash of via overschrijving/Payconiq na afloop van de
            opdracht, tenzij anders afgesproken. Een afspraak kosteloos
            verzetten of annuleren kan tot 24 uur vooraf. Maandpakketten voor
            zaken zijn maandelijks opzegbaar.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">7. Niet opgehaalde toestellen</h2>
          <p className="mt-3">
            Haal je een toestel na herhaalde verwittiging drie maanden niet op,
            dan mag ik het beschouwen als afgestaan. Uiteraard verwittig ik je
            ruim vooraf voor het zover komt.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">8. Geschillen</h2>
          <p className="mt-3">
            Komen we er samen niet uit (dat zou me verbazen), dan is het
            Belgisch recht van toepassing en zijn de rechtbanken van Leuven
            bevoegd. Als consument kan je ook terecht bij de
            Consumentenombudsdienst (consumentenombudsdienst.be).
          </p>
        </section>
      </div>
    </div>
  );
}
