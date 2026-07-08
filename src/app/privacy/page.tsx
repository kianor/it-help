import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description: "Hoe deze site met je gegevens omgaat, uitgelegd in gewone mensentaal. Geen cookies voor reclame, geen doorverkoop van gegevens.",
};

export default function PrivacyPage() {
  return (
    <div className="prose-custom mx-auto max-w-3xl px-4 pt-14">
      <h1 className="text-4xl font-bold">Privacyverklaring</h1>
      <p className="mt-2 text-sm text-steel">Laatst bijgewerkt: juli 2026</p>

      <div className="mt-8 space-y-8 leading-relaxed text-ink/90">
        <section>
          <h2 className="text-2xl font-bold">In het kort</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>Ik vraag alleen gegevens die nodig zijn om je te helpen.</li>
            <li>Ik verkoop of deel je gegevens nooit voor reclame.</li>
            <li>Deze site gebruikt geen reclame- of trackingcookies. Daarom zie je ook geen cookiebanner.</li>
            <li>Je mag altijd vragen welke gegevens ik van je heb, en vragen om ze aan te passen of te wissen.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Wie ben ik?</h2>
          <p className="mt-3">
            {site.name}, {site.region}.
            {site.kbo ? ` KBO ${site.kbo}.` : " KBO-nummer in aanvraag."} Je
            bereikt me via {site.phoneDisplay} of {site.email}. Ik ben de
            verwerkingsverantwoordelijke voor de gegevens op deze site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Welke gegevens verzamel ik, en waarom?</h2>
          <div className="mt-3 space-y-4">
            <p>
              <strong>Contactformulier:</strong> je naam, telefoonnummer,
              eventueel je e-mailadres en je bericht. Die heb ik nodig om je
              terug te bellen of te mailen en je te helpen. Rechtsgrond: de
              stappen die nodig zijn om tot een overeenkomst te komen.
            </p>
            <p>
              <strong>Herstellingen:</strong> je naam, contactgegevens en
              gegevens over je toestel, plus een volgcode waarmee je de status
              kan opvolgen. Rechtsgrond: uitvoering van de overeenkomst.
            </p>
            <p>
              <strong>Nieuwsbrief:</strong> alleen je e-mailadres, en alleen als
              je je inschrijving zelf bevestigt via de mail die je krijgt
              (dubbele opt-in). Rechtsgrond: jouw toestemming. Uitschrijven kan
              altijd met één klik onderaan elke mail.
            </p>
            <p>
              <strong>E-mails:</strong> bevestigingen en statusupdates verstuur
              ik via Resend (Resend Inc.), een e-maildienst. Je e-mailadres
              passeert daarbij langs hun servers, uitsluitend om de mail te
              bezorgen.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Wat doe ik niet?</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>Geen reclamecookies of tracking van je surfgedrag.</li>
            <li>Geen doorverkoop of delen van gegevens met derden voor marketing.</li>
            <li>Geen profielen of geautomatiseerde beslissingen.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Gegevens op je toestel zelf</h2>
          <p className="mt-3">
            Herstel ik je pc, laptop of console, dan blijf ik van je bestanden
            af, behalve als het voor de herstelling nodig is en we dat vooraf
            afspreken (bijvoorbeeld bij een data-overzet). Wil je een toestel
            verkoopklaar laten maken, dan wis ik het veilig en definitief.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Hoe lang bewaar ik je gegevens?</h2>
          <p className="mt-3">
            Aanvragen en herstelgegevens bewaar ik zo lang als nodig voor de
            opdracht en de wettelijke verplichtingen (zoals facturatie), daarna
            wis ik ze. Nieuwsbriefgegevens bewaar ik tot je je uitschrijft.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Jouw rechten</h2>
          <p className="mt-3">
            Je mag altijd vragen om je gegevens in te kijken, te verbeteren, te
            wissen of over te dragen, en je mag bezwaar maken tegen het gebruik
            ervan. Eén mailtje naar {site.email} of een belletje volstaat. Ben
            je niet tevreden met hoe ik daarmee omga, dan kan je terecht bij de
            Gegevensbeschermingsautoriteit (gegevensbeschermingsautoriteit.be).
          </p>
        </section>
      </div>
    </div>
  );
}
