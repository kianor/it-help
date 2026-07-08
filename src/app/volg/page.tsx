import type { Metadata } from "next";
import { getJobByCode, listJobUpdates, JOB_STATUSES } from "@/lib/db";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Volg je herstelling",
  description:
    "Volg live de status van je herstelling met je volgcode. Bij elke stap krijg je automatisch een mailtje.",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  // SQLite bewaart UTC ("YYYY-MM-DD HH:MM:SS")
  const date = new Date(iso.replace(" ", "T") + "Z");
  return new Intl.DateTimeFormat("nl-BE", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Brussels",
  }).format(date);
}

export default function VolgPage({
  searchParams,
}: {
  searchParams: { code?: string };
}) {
  const code = (searchParams.code || "").trim();
  const job = code ? getJobByCode(code) : undefined;
  const updates = job ? listJobUpdates(job.id) : [];
  const currentIndex = job
    ? JOB_STATUSES.findIndex((s) => s === job.status)
    : -1;

  return (
    <div className="mx-auto max-w-2xl px-4 pt-14">
      <h1 className="text-4xl font-bold">Volg je herstelling</h1>
      <p className="mt-4 text-ink/80">
        Vul de volgcode in die je van mij kreeg (die staat ook in je mails). Zo
        zie je precies hoe het met je toestel staat.
      </p>

      <form method="get" className="mt-6 flex flex-col gap-2 sm:flex-row">
        <label htmlFor="code" className="sr-only">Volgcode</label>
        <input
          id="code"
          name="code"
          className="input font-mono sm:max-w-xs"
          placeholder="WB-XXXXXXXX"
          defaultValue={code}
          required
        />
        <button type="submit" className="btn-primary">Zoek op</button>
      </form>

      {code && !job && (
        <p className="mt-6 rounded-lg bg-signal/10 px-4 py-3 font-medium text-signal" role="alert">
          Geen herstelling gevonden met die code. Kijk de code even na, of bel
          of app me op {site.phoneDisplay}.
        </p>
      )}

      {job && (
        <div className="mt-8 rounded-xl border border-ink/10 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="label">Toestel</p>
              <p className="text-lg font-bold">{job.device}</p>
              <p className="text-sm text-steel">{job.service}</p>
            </div>
            <div className="text-right">
              <p className="label">Volgcode</p>
              <p className="font-mono font-bold">{job.code}</p>
              {job.price && (
                <p className="mt-1 font-mono text-sm">
                  Afgesproken prijs: <strong>{job.price}</strong>
                </p>
              )}
            </div>
          </div>

          {/* Statusbalk */}
          <ol className="mt-8 space-y-0">
            {JOB_STATUSES.map((status, i) => {
              const done = i <= currentIndex;
              const isCurrent = i === currentIndex;
              return (
                <li key={status} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < JOB_STATUSES.length - 1 && (
                    <span
                      className={`absolute left-[9px] top-6 h-full w-0.5 ${done && i < currentIndex ? "bg-cobalt" : "bg-steel/30"}`}
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`relative z-10 mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 ${
                      done
                        ? "border-cobalt bg-cobalt"
                        : "border-steel/40 bg-white"
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`font-medium ${isCurrent ? "font-bold text-cobalt" : done ? "text-ink" : "text-steel"}`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                    {isCurrent && " ← nu"}
                  </span>
                </li>
              );
            })}
          </ol>

          {/* Updates */}
          <div className="mt-8 border-t border-ink/10 pt-6">
            <p className="label">Updates</p>
            <ul className="space-y-3">
              {[...updates].reverse().map((u) => (
                <li key={u.id} className="text-sm">
                  <span className="font-mono text-xs text-steel">{formatDate(u.created_at)}</span>
                  <p className="font-semibold">{u.status.charAt(0).toUpperCase() + u.status.slice(1)}</p>
                  {u.message && <p className="text-ink/80">{u.message}</p>}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 rounded-lg bg-cobalt/5 px-4 py-3 text-sm">
            Vragen over je herstelling? Bel of app me op{" "}
            <a href={`tel:${site.phone}`} className="font-semibold underline">{site.phoneDisplay}</a>.
          </p>
        </div>
      )}
    </div>
  );
}
