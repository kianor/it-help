import type { Metadata } from "next";
import Link from "next/link";
import { confirmSubscriber } from "@/lib/db";

export const metadata: Metadata = {
  title: "Inschrijving bevestigen",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default function BevestigPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token || "";
  const ok = token ? confirmSubscriber(token) : false;

  return (
    <div className="mx-auto max-w-2xl px-4 pt-14 text-center">
      {ok ? (
        <>
          <h1 className="text-4xl font-bold">Je bent ingeschreven!</h1>
          <p className="mt-4 text-lg text-ink/80">
            Bedankt. Je krijgt af en toe een mail met tips en acties, hooguit
            één per maand. Uitschrijven kan altijd met één klik.
          </p>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold">Deze link werkt niet meer</h1>
          <p className="mt-4 text-lg text-ink/80">
            Misschien ben je al ingeschreven, of is de link verlopen. Schrijf je
            gerust opnieuw in via de contactpagina.
          </p>
        </>
      )}
      <Link href="/" className="btn-secondary mt-8">Naar de homepagina</Link>
    </div>
  );
}
