import { getDb } from "@/lib/db";
import { site } from "@/config/site";
import { AdminNav } from "./AdminNav";
import { logoutAction } from "../actions";

export const dynamic = "force-dynamic";

/** Admin-shell: zijbalk op desktop, uitklapbaar menu op mobiel, met badges. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const d = getDb();
  const badges = {
    aanvragen: (d.prepare("SELECT count(*) c FROM requests WHERE status = 'nieuw'").get() as { c: number }).c,
    afspraken: (d.prepare("SELECT count(*) c FROM appointments WHERE status = 'aangevraagd'").get() as { c: number }).c,
    herstellingen: (d.prepare("SELECT count(*) c FROM jobs WHERE status != 'afgerond'").get() as { c: number }).c,
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-ink/10 bg-surface lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r">
        <div className="px-5 py-4">
          <p className="font-display text-xl font-bold">
            {site.name}
            <span className="text-accent">.</span>
          </p>
          <p className="font-mono text-[11px] uppercase tracking-wide text-muted">werkbank-beheer</p>
        </div>
        <AdminNav badges={badges} />
        <div className="border-t border-ink/10 px-5 py-4">
          <form action={logoutAction}>
            <button type="submit" className="text-sm text-muted underline transition hover:text-accent-strong">
              Uitloggen
            </button>
          </form>
        </div>
      </aside>
      <div className="min-w-0 px-4 pb-16 pt-6 sm:px-8">{children}</div>
    </div>
  );
}
