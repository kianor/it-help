import { listAppointments, getSetting } from "@/lib/db";
import { saveAvailabilityAction, setAppointmentStatusAction } from "../../actions";

export const dynamic = "force-dynamic";

const DAYS: [string, string][] = [
  ["appt_hours_mon", "Maandag"],
  ["appt_hours_tue", "Dinsdag"],
  ["appt_hours_wed", "Woensdag"],
  ["appt_hours_thu", "Donderdag"],
  ["appt_hours_fri", "Vrijdag"],
  ["appt_hours_sat", "Zaterdag"],
  ["appt_hours_sun", "Zondag"],
];

export default function AdminAppointmentsPage() {
  const appointments = listAppointments();
  const open = appointments.filter((a) => a.status === "aangevraagd");
  const rest = appointments.filter((a) => a.status !== "aangevraagd");

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold">
        Afspraken{" "}
        {open.length > 0 && (
          <span className="ml-1 rounded-full bg-signal px-2.5 py-0.5 text-sm text-white">
            {open.length} nieuw
          </span>
        )}
      </h1>
      <p className="mt-1 text-sm text-steel">
        Bevestig een afspraakverzoek en de klant krijgt automatisch een mail. Het slot wordt
        meteen geblokkeerd voor anderen zodra het is aangevraagd.
      </p>

      <div className="mt-6 space-y-3">
        {[...open, ...rest].map((a) => (
          <div key={a.id} className={`rounded-xl border bg-white p-4 ${a.status === "aangevraagd" ? "border-signal/50" : "border-ink/10"} ${a.status === "geannuleerd" ? "opacity-50" : ""}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono font-bold">{a.slot_start}</p>
                <p className="text-sm">
                  {a.name} ·{" "}
                  <a href={`tel:${a.phone}`} className="font-mono text-cobalt hover:underline">{a.phone}</a>
                  {a.email && <> · <a href={`mailto:${a.email}`} className="text-cobalt hover:underline">{a.email}</a></>}
                  <span className="ml-1 font-mono text-xs uppercase text-steel">[{a.lang}]</span>
                </p>
                <p className="text-sm text-steel">{a.service}</p>
                {a.message && <p className="mt-1 text-sm text-ink/80">{a.message}</p>}
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${a.status === "bevestigd" ? "bg-cobalt/10 text-cobalt" : a.status === "geannuleerd" ? "bg-ink/10 text-steel" : "bg-signal/10 text-signal"}`}>
                  {a.status}
                </span>
                {a.status !== "bevestigd" && (
                  <form action={setAppointmentStatusAction}>
                    <input type="hidden" name="id" value={a.id} />
                    <input type="hidden" name="status" value="bevestigd" />
                    <button type="submit" className="rounded-lg bg-signal px-3 py-1.5 text-sm font-semibold text-white">
                      Bevestig
                    </button>
                  </form>
                )}
                {a.status !== "geannuleerd" && (
                  <form action={setAppointmentStatusAction}>
                    <input type="hidden" name="id" value={a.id} />
                    <input type="hidden" name="status" value="geannuleerd" />
                    <button type="submit" className="rounded-lg border border-ink/15 px-3 py-1.5 text-sm hover:border-signal hover:text-signal">
                      Annuleer
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        ))}
        {appointments.length === 0 && <p className="text-sm text-steel">Nog geen afspraken.</p>}
      </div>

      <details className="mt-10 rounded-xl border border-ink/10 bg-white p-5">
        <summary className="cursor-pointer font-bold text-cobalt">Beschikbaarheid instellen</summary>
        <form action={saveAvailabilityAction} className="mt-4 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {DAYS.map(([key, label]) => (
              <div key={key}>
                <label className="label" htmlFor={key}>{label} (leeg = gesloten)</label>
                <input className="input font-mono" id={key} name={key} placeholder="18:00-21:00" defaultValue={getSetting(key) || ""} />
              </div>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="label" htmlFor="appt_slot_minutes">Duur per slot (min)</label>
              <input className="input font-mono" id="appt_slot_minutes" name="appt_slot_minutes" type="number" min={15} defaultValue={getSetting("appt_slot_minutes") || "60"} />
            </div>
            <div>
              <label className="label" htmlFor="appt_lead_hours">Min. vooraf (uren)</label>
              <input className="input font-mono" id="appt_lead_hours" name="appt_lead_hours" type="number" min={0} defaultValue={getSetting("appt_lead_hours") || "24"} />
            </div>
            <div>
              <label className="label" htmlFor="appt_horizon_days">Boekbaar tot (dagen)</label>
              <input className="input font-mono" id="appt_horizon_days" name="appt_horizon_days" type="number" min={1} defaultValue={getSetting("appt_horizon_days") || "21"} />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="appt_blocked">Geblokkeerde dagen (JJJJ-MM-DD, met komma&apos;s)</label>
            <input className="input font-mono" id="appt_blocked" name="appt_blocked" placeholder="2026-07-21, 2026-08-15" defaultValue={getSetting("appt_blocked") || ""} />
          </div>
          <button type="submit" className="btn-primary">Opslaan</button>
        </form>
      </details>
    </div>
  );
}
