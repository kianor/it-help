import { listRequests } from "@/lib/db";
import { markRequestAction } from "../actions";

export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  const date = new Date(iso.replace(" ", "T") + "Z");
  return new Intl.DateTimeFormat("nl-BE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Brussels",
  }).format(date);
}

export default function AdminRequestsPage() {
  const requests = listRequests();
  const nieuw = requests.filter((r) => r.status === "nieuw");
  const rest = requests.filter((r) => r.status !== "nieuw");

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Aanvragen{" "}
        {nieuw.length > 0 && (
          <span className="ml-1 rounded-full bg-accent-strong px-2.5 py-0.5 text-sm text-white">
            {nieuw.length} nieuw
          </span>
        )}
      </h1>

      {requests.length === 0 && (
        <p className="mt-6 text-steel">Nog geen aanvragen. Ze verschijnen hier zodra iemand het contactformulier invult.</p>
      )}

      <div className="mt-6 space-y-4">
        {[...nieuw, ...rest].map((r) => (
          <div
            key={r.id}
            className={`rounded-xl border bg-surface p-5 ${r.status === "nieuw" ? "border-signal/50" : "border-ink/10 opacity-70"}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-bold">
                  {r.name}{" "}
                  <span className="ml-1 font-mono text-xs font-normal text-steel">{formatDate(r.created_at)}</span>
                </p>
                <p className="mt-0.5 text-sm">
                  <a href={`tel:${r.phone}`} className="font-mono text-cobalt hover:underline">{r.phone}</a>
                  {r.email && (
                    <>
                      {" · "}
                      <a href={`mailto:${r.email}`} className="text-cobalt hover:underline">{r.email}</a>
                    </>
                  )}
                </p>
                <p className="mt-1 text-sm font-semibold text-steel">{r.service}</p>
              </div>
              <form action={markRequestAction}>
                <input type="hidden" name="id" value={r.id} />
                <input type="hidden" name="status" value={r.status === "nieuw" ? "behandeld" : "nieuw"} />
                <button type="submit" className="rounded-lg border border-ink/15 px-3 py-1.5 text-sm hover:border-cobalt hover:text-cobalt">
                  {r.status === "nieuw" ? "Markeer behandeld" : "Zet terug op nieuw"}
                </button>
              </form>
            </div>
            <p className="mt-3 whitespace-pre-wrap rounded-lg bg-paper px-4 py-3 text-sm">{r.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
