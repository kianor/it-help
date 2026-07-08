import Link from "next/link";
import { listJobs, JOB_STATUSES } from "@/lib/db";
import { createJobAction } from "../../actions";

export const dynamic = "force-dynamic";

export default function AdminJobsPage() {
  const jobs = listJobs();
  const open = jobs.filter((j) => j.status !== "afgerond");
  const done = jobs.filter((j) => j.status === "afgerond");

  return (
    <div>
      <h1 className="text-2xl font-bold">Herstellingen</h1>
      <p className="mt-1 text-sm text-steel">
        Maak voor elk binnengebracht toestel een herstelling aan. De klant
        krijgt automatisch een volgcode en mails bij elke statusupdate.
      </p>

      <details className="mt-6 rounded-xl border border-ink/10 bg-white p-5" open={jobs.length === 0}>
        <summary className="cursor-pointer font-bold text-cobalt">+ Nieuwe herstelling</summary>
        <form action={createJobAction} className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="customer_name">Naam klant *</label>
            <input className="input" id="customer_name" name="customer_name" required maxLength={100} />
          </div>
          <div>
            <label className="label" htmlFor="customer_phone">Telefoon</label>
            <input className="input" id="customer_phone" name="customer_phone" maxLength={30} />
          </div>
          <div>
            <label className="label" htmlFor="customer_email">E-mail (voor automatische updates)</label>
            <input className="input" id="customer_email" name="customer_email" type="email" maxLength={200} />
          </div>
          <div>
            <label className="label" htmlFor="price">Afgesproken prijs</label>
            <input className="input" id="price" name="price" placeholder="€59" maxLength={30} />
          </div>
          <div>
            <label className="label" htmlFor="device">Toestel *</label>
            <input className="input" id="device" name="device" required placeholder="PS4 Slim" maxLength={100} />
          </div>
          <div>
            <label className="label" htmlFor="service">Dienst *</label>
            <input className="input" id="service" name="service" required placeholder="Reiniging + koelpasta" maxLength={200} />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-primary">Aanmaken en volgcode genereren</button>
          </div>
        </form>
      </details>

      <h2 className="mt-8 font-bold">Lopend ({open.length})</h2>
      <JobTable jobs={open} />

      {done.length > 0 && (
        <>
          <h2 className="mt-8 font-bold">Afgerond ({done.length})</h2>
          <JobTable jobs={done} />
        </>
      )}
    </div>
  );
}

function JobTable({ jobs }: { jobs: ReturnType<typeof listJobs> }) {
  if (jobs.length === 0) return <p className="mt-3 text-sm text-steel">Niets hier.</p>;
  const lastIdx = JOB_STATUSES.length - 1;
  return (
    <div className="mt-3 overflow-x-auto rounded-xl border border-ink/10 bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-ink/10 text-xs uppercase text-steel">
            <th className="px-4 py-3">Code</th>
            <th className="px-4 py-3">Klant</th>
            <th className="px-4 py-3">Toestel</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {jobs.map((j) => (
            <tr key={j.id} className="border-b border-ink/5 last:border-0">
              <td className="px-4 py-3 font-mono">{j.code}</td>
              <td className="px-4 py-3">{j.customer_name}</td>
              <td className="px-4 py-3">{j.device}</td>
              <td className="px-4 py-3">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${JOB_STATUSES.indexOf(j.status as (typeof JOB_STATUSES)[number]) === lastIdx ? "bg-ink/10" : "bg-cobalt/10 text-cobalt"}`}>
                  {j.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <Link href={`/admin/herstellingen/${j.id}`} className="font-semibold text-cobalt hover:underline">
                  Open →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
