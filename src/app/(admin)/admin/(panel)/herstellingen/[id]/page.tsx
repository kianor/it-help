import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobById, listJobUpdates, JOB_STATUSES } from "@/lib/db";
import { requestReviewAction, updateJobStatusAction } from "../../../actions";

export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  const date = new Date(iso.replace(" ", "T") + "Z");
  return new Intl.DateTimeFormat("nl-BE", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Brussels",
  }).format(date);
}

export default function AdminJobDetailPage({ params }: { params: { id: string } }) {
  const job = getJobById(Number(params.id));
  if (!job) notFound();
  const updates = listJobUpdates(job.id);
  const currentIdx = JOB_STATUSES.findIndex((s) => s === job.status);
  const nextStatus = JOB_STATUSES[Math.min(currentIdx + 1, JOB_STATUSES.length - 1)];

  return (
    <div className="max-w-3xl">
      <Link href="/admin/herstellingen" className="text-sm text-cobalt hover:underline">← Alle herstellingen</Link>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{job.device} · {job.customer_name}</h1>
          <p className="mt-1 text-sm text-steel">{job.service}{job.price ? ` · ${job.price}` : ""}</p>
          <p className="mt-1 text-sm">
            {job.customer_phone && <a href={`tel:${job.customer_phone}`} className="font-mono text-cobalt hover:underline">{job.customer_phone}</a>}
            {job.customer_phone && job.customer_email && " · "}
            {job.customer_email && <a href={`mailto:${job.customer_email}`} className="text-cobalt hover:underline">{job.customer_email}</a>}
            {!job.customer_email && <span className="text-signal"> Geen e-mail: klant krijgt geen automatische updates.</span>}
          </p>
        </div>
        <div className="rounded-lg border border-ink/10 bg-white px-4 py-2 text-right">
          <p className="label">Volgcode voor de klant</p>
          <p className="font-mono font-bold">{job.code}</p>
          <p className="flex gap-3 text-xs">
            <Link href={`/${job.lang}/volg?code=${job.code}`} className="text-cobalt hover:underline" target="_blank">
              Bekijk als klant →
            </Link>
            <Link href={`/admin/herstellingen/${job.id}/bon`} className="text-cobalt hover:underline" target="_blank">
              Print afgiftebon (QR) →
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-ink/10 bg-white p-5">
        <h2 className="font-bold">Status bijwerken</h2>
        <p className="mt-1 text-xs text-steel">
          De klant krijgt automatisch een mail bij elke update (als er een e-mailadres is).
        </p>
        <form action={updateJobStatusAction} className="mt-4 space-y-4">
          <input type="hidden" name="job_id" value={job.id} />
          <div>
            <label className="label" htmlFor="status">Nieuwe status</label>
            <select className="input" id="status" name="status" defaultValue={nextStatus} required>
              {JOB_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="photo">Foto voor de klant (optioneel, bv. de stofboel)</label>
            <input className="input" id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp" />
          </div>
          <div>
            <label className="label" htmlFor="message">Bericht voor de klant (optioneel)</label>
            <textarea
              className="input min-h-20"
              id="message"
              name="message"
              maxLength={1000}
              placeholder="Bv.: Ventilator was zo goed als dicht geslibd. Alles proper gemaakt, nieuwe koelpasta gezet. Morgen test ik hem nog een avond."
            />
          </div>
          <button type="submit" className="btn-primary">Opslaan en klant verwittigen</button>
        </form>
      </div>

      {job.status === "afgerond" && job.customer_email && (
        <div className="mt-4 rounded-xl border border-signal/40 bg-white p-5">
          <h2 className="font-bold">Review vragen</h2>
          {job.review_requested_at ? (
            <p className="mt-1 text-sm text-steel">Review-verzoek al verstuurd.</p>
          ) : (
            <>
              <p className="mt-1 text-sm text-steel">
                Stuur de klant een vriendelijke mail met de vraag om een Google-review.
              </p>
              <form action={requestReviewAction} className="mt-3">
                <input type="hidden" name="job_id" value={job.id} />
                <button type="submit" className="btn-secondary">Verstuur review-verzoek</button>
              </form>
            </>
          )}
        </div>
      )}

      <div className="mt-8">
        <h2 className="font-bold">Geschiedenis</h2>
        <ul className="mt-3 space-y-2">
          {[...updates].reverse().map((u) => (
            <li key={u.id} className="rounded-lg border border-ink/10 bg-white px-4 py-2.5 text-sm">
              <span className="font-mono text-xs text-steel">{formatDate(u.created_at)}</span>{" "}
              <span className="font-semibold">{u.status}</span>
              {u.message && <p className="mt-0.5 text-ink/80">{u.message}</p>}
              {u.photo_file && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`/api/uploads/${u.photo_file}`} alt="" className="mt-2 max-h-40 rounded-lg border border-ink/10" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
