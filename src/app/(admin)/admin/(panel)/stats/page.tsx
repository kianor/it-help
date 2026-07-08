import { statsOverview } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function AdminStatsPage() {
  const { perDay, topPages, topRefs, langs, devices, totals } = statsOverview(30);
  const maxViews = Math.max(1, ...perDay.map((d) => d.views));

  return (
    <div>
      <h1 className="text-2xl font-bold">Statistieken · laatste 30 dagen</h1>
      <p className="mt-1 text-sm text-steel">
        Privacyvriendelijk geteld: geen cookies, unieke bezoekers via een dagelijks
        wisselende hash. Daarom is er ook geen cookiebanner nodig.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-ink/10 bg-white p-5">
          <p className="label">Paginaweergaven</p>
          <p className="font-mono text-3xl font-bold">{totals.views}</p>
        </div>
        <div className="rounded-xl border border-ink/10 bg-white p-5">
          <p className="label">Unieke bezoekers</p>
          <p className="font-mono text-3xl font-bold">{totals.uniques}</p>
        </div>
      </div>

      {/* Per dag */}
      <div className="mt-6 rounded-xl border border-ink/10 bg-white p-5">
        <p className="label">Per dag (donker = weergaven, oranje = uniek)</p>
        {perDay.length === 0 ? (
          <p className="text-sm text-steel">Nog geen bezoeken geregistreerd.</p>
        ) : (
          <div className="mt-2 flex h-40 items-end gap-1">
            {perDay.map((d) => (
              <div key={d.day} className="group relative flex flex-1 flex-col items-center justify-end gap-px" title={`${d.day}: ${d.views} weergaven, ${d.uniques} uniek`}>
                <div className="w-full rounded-t bg-ink/70" style={{ height: `${(d.views / maxViews) * 100}%`, minHeight: 2 }} />
                <div className="w-full bg-signal" style={{ height: `${(d.uniques / maxViews) * 100}%`, minHeight: 1 }} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <StatTable title="Populairste pagina's" rows={topPages.map((r) => [r.path, r.views])} />
        <StatTable title="Verwijzers (waar bezoekers vandaan komen)" rows={topRefs.map((r) => [r.ref, r.views])} empty="Nog geen externe verwijzers. Tip: zet de site-link in je TikTok/Instagram-bio." />
        <StatTable title="Taal" rows={langs.map((r) => [r.lang || "?", r.views])} />
        <StatTable title="Toestel" rows={devices.map((r) => [r.device, r.views])} />
      </div>
    </div>
  );
}

function StatTable({ title, rows, empty }: { title: string; rows: [string, number][]; empty?: string }) {
  const max = Math.max(1, ...rows.map(([, n]) => n));
  return (
    <div className="rounded-xl border border-ink/10 bg-white p-5">
      <p className="label">{title}</p>
      {rows.length === 0 ? (
        <p className="text-sm text-steel">{empty || "Nog geen gegevens."}</p>
      ) : (
        <ul className="mt-2 space-y-1.5">
          {rows.map(([label, n]) => (
            <li key={label} className="flex items-center gap-2 text-sm">
              <span className="w-40 truncate font-mono text-xs" title={label}>{label}</span>
              <span className="h-3 rounded bg-cobalt/60" style={{ width: `${(n / max) * 55}%`, minWidth: 3 }} />
              <span className="font-mono text-xs text-steel">{n}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
