import Link from "next/link";
import { getDb, listPromos, reviewStats, statsOverview } from "@/lib/db";
import { getSite } from "@/lib/site-config";

export const dynamic = "force-dynamic";

/** Dashboard: alles wat aandacht vraagt in één oogopslag. */
export default function AdminDashboardPage() {
  const d = getDb();
  const count = (sql: string) => (d.prepare(sql).get() as { c: number }).c;

  const nieuweAanvragen = count("SELECT count(*) c FROM requests WHERE status = 'nieuw'");
  const teBevestigen = count("SELECT count(*) c FROM appointments WHERE status = 'aangevraagd'");
  const lopend = count("SELECT count(*) c FROM jobs WHERE status != 'afgerond'");
  const klaarVoorOphaling = count("SELECT count(*) c FROM jobs WHERE status = 'klaar voor ophaling'");
  const abonnees = count("SELECT count(*) c FROM subscribers WHERE confirmed_at IS NOT NULL AND unsubscribed_at IS NULL");
  const { totals } = statsOverview(7);
  const reviews = reviewStats();
  const promo = listPromos().find((p) => p.active === 1);

  const vandaag = new Date().toISOString().slice(0, 10);
  const afsprakenVandaag = d
    .prepare("SELECT count(*) c FROM appointments WHERE status = 'bevestigd' AND slot_start LIKE ?")
    .get(`${vandaag}%`) as { c: number };

  const recenteAanvragen = d
    .prepare("SELECT name, service, created_at FROM requests ORDER BY created_at DESC LIMIT 5")
    .all() as { name: string; service: string; created_at: string }[];
  const komendeAfspraken = d
    .prepare("SELECT slot_start, name, service, status FROM appointments WHERE status != 'geannuleerd' AND slot_start >= ? ORDER BY slot_start ASC LIMIT 5")
    .all(vandaag) as { slot_start: string; name: string; service: string; status: string }[];

  const cfg = getSite();
  const setupTodos = [
    { done: Boolean(cfg.phone !== "+32470000000" && cfg.phone), label: "Telefoonnummer instellen", href: "/admin/instellingen" },
    { done: cfg.email !== "info@ritsit.be", label: "E-mailadres instellen", href: "/admin/instellingen" },
    { done: Boolean(cfg.kbo), label: "KBO-nummer invullen (verplicht vóór livegang)", href: "/admin/instellingen" },
    { done: Boolean(process.env.RESEND_API_KEY), label: "Resend API-key in .env (anders gaan er geen mails uit)", href: "/admin/instellingen" },
    { done: Boolean(cfg.googleReviewsUrl || cfg.trustpilotUrl), label: "Review-link (Google/Trustpilot) instellen", href: "/admin/instellingen" },
    { done: Boolean(cfg.socials.instagram || cfg.socials.tiktok || cfg.socials.youtube), label: "Social media-links instellen", href: "/admin/instellingen" },
  ];
  const openTodos = setupTodos.filter((t) => !t.done);

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Alles wat aandacht vraagt, in één oogopslag.</p>

      {/* Actie nodig */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard href="/admin/aanvragen" label="Nieuwe aanvragen" value={nieuweAanvragen} urgent={nieuweAanvragen > 0} />
        <StatCard href="/admin/afspraken" label="Afspraken te bevestigen" value={teBevestigen} urgent={teBevestigen > 0} />
        <StatCard href="/admin/afspraken" label="Afspraken vandaag" value={afsprakenVandaag.c} />
        <StatCard href="/admin/herstellingen" label="Lopende herstellingen" value={lopend} sub={klaarVoorOphaling > 0 ? `${klaarVoorOphaling} klaar voor ophaling` : undefined} />
      </div>

      {/* Zaak in cijfers */}
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <StatCard href="/admin/stats" label="Bezoekers (7 dagen)" value={totals.uniques} sub={`${totals.views} weergaven`} />
        <StatCard href="/admin/reviews" label="Reviews" value={reviews.count} sub={reviews.count > 0 ? `gemiddeld ${reviews.avg}/5` : undefined} />
        <StatCard href="/admin/nieuwsbrief" label="Nieuwsbrief-abonnees" value={abonnees} />
      </div>

      {promo && (
        <Link href="/admin/acties" className="mt-4 block rounded-xl border border-accent/40 bg-accent/5 px-5 py-3 text-sm transition hover:border-accent">
          <span className="font-mono font-bold text-accent-strong">Actieve actie:</span>{" "}
          {promo.text_nl}
          {promo.total != null && (
            <span className="font-mono text-muted"> · {promo.used}/{promo.total} gebruikt</span>
          )}
        </Link>
      )}

      {/* Setup-checklist zolang er iets openstaat */}
      {openTodos.length > 0 && (
        <div className="mt-6 rounded-xl border border-ink/10 bg-surface p-5">
          <h2 className="font-bold">Nog in te stellen ({openTodos.length})</h2>
          <ul className="mt-3 space-y-2">
            {openTodos.map((t) => (
              <li key={t.label}>
                <Link href={t.href} className="flex items-center gap-2 text-sm text-foreground/85 hover:text-link">
                  <span className="inline-block h-4 w-4 shrink-0 rounded border-2 border-muted/60" aria-hidden="true" />
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-ink/10 bg-surface p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Recente aanvragen</h2>
            <Link href="/admin/aanvragen" className="text-sm text-link hover:underline">Alle →</Link>
          </div>
          {recenteAanvragen.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Nog geen aanvragen.</p>
          ) : (
            <ul className="mt-3 divide-y divide-ink/5">
              {recenteAanvragen.map((r, i) => (
                <li key={i} className="flex items-baseline justify-between gap-3 py-2 text-sm">
                  <span className="font-semibold">{r.name}</span>
                  <span className="flex-1 truncate text-muted">{r.service}</span>
                  <span className="font-mono text-xs text-muted">{r.created_at.slice(5, 16)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-ink/10 bg-surface p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Komende afspraken</h2>
            <Link href="/admin/afspraken" className="text-sm text-link hover:underline">Alle →</Link>
          </div>
          {komendeAfspraken.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Niets gepland.</p>
          ) : (
            <ul className="mt-3 divide-y divide-ink/5">
              {komendeAfspraken.map((a, i) => (
                <li key={i} className="flex items-baseline justify-between gap-3 py-2 text-sm">
                  <span className="font-mono font-bold">{a.slot_start.slice(5)}</span>
                  <span className="flex-1 truncate">{a.name} · <span className="text-muted">{a.service}</span></span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${a.status === "bevestigd" ? "bg-link/10 text-link" : "bg-accent-strong/10 text-accent-strong"}`}>
                    {a.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  href,
  label,
  value,
  sub,
  urgent = false,
}: {
  href: string;
  label: string;
  value: number;
  sub?: string;
  urgent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-xl border bg-surface p-4 transition hover:-translate-y-0.5 hover:shadow-md ${
        urgent ? "border-accent-strong/50" : "border-ink/10"
      }`}
    >
      <p className="label !mb-0">{label}</p>
      <p className={`mt-1 font-mono text-3xl font-bold ${urgent ? "text-accent-strong" : ""}`}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-muted">{sub}</p>}
    </Link>
  );
}
