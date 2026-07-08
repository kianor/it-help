import type { Metadata } from "next";
import { site } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";
import { NewsletterForm } from "@/components/NewsletterForm";
import { CallButton, WhatsAppButton } from "@/components/CtaButtons";

export const metadata: Metadata = {
  title: "Contact | bel, app of stuur een bericht",
  description:
    "Neem contact op voor computerhulp, pc builds of console-herstel in Herent en Leuven. Bel, stuur een WhatsApp of gebruik het formulier. Reactie dezelfde werkdag.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-14">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold">Neem contact op</h1>
        <p className="mt-4 text-lg text-ink/80">
          Bellen of appen is het snelst, zeker &apos;s avonds. Een bericht via
          het formulier kan ook: je hoort vandaag nog van me.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <CallButton />
          <WhatsAppButton />
        </div>
        <p className="mt-3 font-mono text-sm text-steel">{site.phoneDisplay} · {site.openingInfo.toLowerCase()}</p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-ink/10 bg-white p-6">
            <p className="label">Werkgebied</p>
            <p className="font-semibold">{site.region}</p>
            <p className="mt-2 text-sm text-ink/80">{site.travel}</p>
          </div>
          <div className="rounded-xl border border-ink/10 bg-white p-6">
            <p className="label">Wat je mag verwachten</p>
            <p className="text-sm text-ink/80">{site.responsePromise}</p>
          </div>
          <div className="rounded-xl border border-ink/10 bg-white p-6">
            <p className="label">Af en toe een slimme tip?</p>
            <p className="mb-3 text-sm text-ink/80">
              Geen spam, hooguit één mail per maand met tips en acties.
              Uitschrijven kan altijd met één klik.
            </p>
            <NewsletterForm />
          </div>
        </aside>
      </div>
    </div>
  );
}
