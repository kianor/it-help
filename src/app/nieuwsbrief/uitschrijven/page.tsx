import type { Metadata } from "next";
import Link from "next/link";
import { unsubscribe } from "@/lib/db";

export const metadata: Metadata = {
  title: "Uitschrijven",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default function UitschrijvenPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token || "";
  const ok = token ? unsubscribe(token) : false;

  return (
    <div className="mx-auto max-w-2xl px-4 pt-14 text-center">
      <h1 className="text-4xl font-bold">
        {ok ? "Je bent uitgeschreven" : "Deze link werkt niet"}
      </h1>
      <p className="mt-4 text-lg text-ink/80">
        {ok
          ? "Je krijgt geen mails meer van mij. Bedankt dat je erbij was."
          : "De link is niet geldig. Mail me gerust, dan schrijf ik je handmatig uit."}
      </p>
      <Link href="/" className="btn-secondary mt-8">Naar de homepagina</Link>
    </div>
  );
}
