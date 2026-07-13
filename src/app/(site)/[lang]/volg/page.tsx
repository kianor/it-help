import type { Metadata } from "next";
import { getJobByCode, listJobUpdates, JOB_STATUSES } from "@/lib/db";
import { site } from "@/config/site";
import { isLocale, htmlLang } from "@/i18n/config";
import { getDict, fill } from "@/i18n";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : "nl";
  const dict = getDict(lang);
  return { title: dict.meta.volg.title, description: dict.meta.volg.description, robots: { index: false } };
}

export const dynamic = "force-dynamic";

function formatDate(iso: string, locale: string): string {
  // SQLite bewaart UTC ("YYYY-MM-DD HH:MM:SS")
  const date = new Date(iso.replace(" ", "T") + "Z");
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Brussels",
  }).format(date);
}

export default function VolgPage({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams: { code?: string };
}) {
  const lang = isLocale(params.lang) ? params.lang : "nl";
  const dict = getDict(lang);
  const t = dict.volgPage;

  const code = (searchParams.code || "").trim();
  const job = code ? getJobByCode(code) : undefined;
  const updates = job ? listJobUpdates(job.id) : [];
  const currentIndex = job ? JOB_STATUSES.findIndex((s) => s === job.status) : -1;
  const statusLabel = (status: string) => t.statuses[status] ?? status;

  return (
    <div className="mx-auto max-w-2xl px-4 pt-14">
      <h1 className="text-4xl font-bold">{t.title}</h1>
      <p className="mt-4 text-ink/80">{t.intro}</p>

      <form method="get" className="mt-6 flex flex-col gap-2 sm:flex-row">
        <label htmlFor="code" className="sr-only">{t.codeLabel}</label>
        <input
          id="code"
          name="code"
          className="input font-mono sm:max-w-xs"
          placeholder="RIT-XXXXXXXX"
          defaultValue={code}
          required
        />
        <button type="submit" className="btn-primary">{t.search}</button>
      </form>

      {code && !job && (
        <p className="mt-6 rounded-lg bg-accent-strong/10 px-4 py-3 font-medium text-accent-strong" role="alert">
          {fill(t.notFound, { phone: site.phoneDisplay })}
        </p>
      )}

      {job && (
        <div className="mt-8 rounded-xl border border-ink/10 bg-surface p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="label">{t.deviceLabel}</p>
              <p className="text-lg font-bold">{job.device}</p>
              <p className="text-sm text-steel">{job.service}</p>
            </div>
            <div className="text-right">
              <p className="label">{t.codeLabel}</p>
              <p className="font-mono font-bold" data-track-copy="volgcode">{job.code}</p>
              {job.price && (
                <p className="mt-1 font-mono text-sm">
                  {t.priceLabel}: <strong>{job.price}</strong>
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
                      done ? "border-cobalt bg-cobalt" : "border-steel/40 bg-surface"
                    }`}
                    aria-hidden="true"
                  />
                  <span className={`font-medium ${isCurrent ? "font-bold text-cobalt" : done ? "text-ink" : "text-steel"}`}>
                    {statusLabel(status)}
                    {isCurrent && ` ${t.now}`}
                  </span>
                </li>
              );
            })}
          </ol>

          {/* Updates */}
          <div className="mt-8 border-t border-ink/10 pt-6">
            <p className="label">{t.updatesLabel}</p>
            <ul className="space-y-3">
              {[...updates].reverse().map((u) => (
                <li key={u.id} className="text-sm">
                  <span className="font-mono text-xs text-steel">{formatDate(u.created_at, htmlLang[lang])}</span>
                  <p className="font-semibold">{statusLabel(u.status)}</p>
                  {u.message && <p className="text-ink/80">{u.message}</p>}
                  {u.photo_file && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`/api/uploads/${u.photo_file}`}
                      alt=""
                      className="mt-2 max-h-64 rounded-lg border border-ink/10 object-cover"
                      loading="lazy"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 rounded-lg bg-cobalt/5 px-4 py-3 text-sm">
            {t.questions}{" "}
            <a href={`tel:${site.phone}`} className="font-semibold underline">{site.phoneDisplay}</a>.
          </p>
        </div>
      )}
    </div>
  );
}
