import { notFound } from "next/navigation";
import QRCode from "qrcode";
import { getJobById } from "@/lib/db";
import { site, siteUrl } from "@/config/site";
import { p } from "@/i18n/slugs.mjs";
import { PrintButton } from "./PrintButton";

export const dynamic = "force-dynamic";

/**
 * Printbare afgiftebon met QR-code: klant scant en ziet meteen de status.
 * Openen → Ctrl+P. Past twee keer op een A4.
 */
export default async function BonPage({ params }: { params: { id: string } }) {
  const job = getJobById(Number(params.id));
  if (!job) notFound();

  const url = `${siteUrl()}${p(job.lang, "volg")}?code=${encodeURIComponent(job.code)}`;
  const qr = await QRCode.toDataURL(url, { width: 240, margin: 1, color: { dark: "#16324F" } });

  return (
    <div className="mx-auto max-w-md p-6 print:p-0">
      <div className="rounded-2xl border-2 border-ink p-6 print:rounded-none print:border">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-display text-2xl font-bold">
              {site.name}
              <span className="text-accent">.</span>
            </p>
            <p className="font-mono text-xs text-steel">{site.tagline}</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qr} alt={`QR-code: ${url}`} width={110} height={110} />
        </div>

        <div className="mt-4 space-y-1 text-sm">
          <p><strong>Klant:</strong> {job.customer_name}</p>
          <p><strong>Toestel:</strong> {job.device}</p>
          <p><strong>Dienst:</strong> {job.service}</p>
          {job.price && <p><strong>Afgesproken prijs:</strong> {job.price}</p>}
        </div>

        <div className="mt-4 rounded-lg bg-paper p-3 text-center print:border print:border-ink/20">
          <p className="text-xs uppercase tracking-wide text-steel">Volg je herstelling</p>
          <p className="font-mono text-2xl font-bold">{job.code}</p>
          <p className="mt-1 text-xs text-steel">Scan de QR-code of surf naar {siteUrl().replace(/^https?:\/\//, "")}</p>
        </div>

        <p className="mt-4 text-center font-mono text-xs text-steel">
          {site.phoneDisplay} · {site.email}
        </p>
      </div>

      <PrintButton />
    </div>
  );
}
