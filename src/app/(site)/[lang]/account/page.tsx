import type { Metadata } from "next";
import Link from "next/link";
import { customerEmail } from "@/lib/auth";
import {
  getSubscriberByEmail,
  listAppointmentsByEmail,
  listJobsByEmail,
} from "@/lib/db";
import { AccountLoginForm } from "@/components/AccountLoginForm";
import { isLocale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import { p } from "@/i18n/slugs.mjs";
import { logoutCustomerAction, toggleNewsletterAction } from "./actions";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const meta = pageMetadata(params.lang, "account", (d) => d.meta.account);
  return { ...meta, robots: { index: false } };
}

export const dynamic = "force-dynamic";

export default async function AccountPage({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams: { fout?: string };
}) {
  const lang = isLocale(params.lang) ? params.lang : "nl";
  const dict = getDict(lang);
  const t = dict.accountPage;
  const email = await customerEmail();

  if (!email) {
    return (
      <div className="mx-auto max-w-md px-4 pt-14">
        <h1 className="text-4xl font-bold">{t.title}</h1>
        <h2 className="mt-6 text-xl font-bold">{t.loginTitle}</h2>
        <p className="mt-2 text-ink/80">{t.loginIntro}</p>
        {searchParams.fout === "link" && (
          <p className="mt-4 rounded-lg bg-signal/10 px-4 py-3 text-sm font-medium text-signal" role="alert">
            {t.verifyFail}
          </p>
        )}
        <div className="mt-6">
          <AccountLoginForm lang={lang} labels={t} />
        </div>
      </div>
    );
  }

  const jobs = listJobsByEmail(email);
  const appointments = listAppointmentsByEmail(email);
  const subscriber = getSubscriberByEmail(email);
  const newsletterOn = Boolean(subscriber?.confirmed_at && !subscriber?.unsubscribed_at);
  const volgStatuses = dict.volgPage.statuses;

  return (
    <div className="mx-auto max-w-3xl px-4 pt-14">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-4xl font-bold">{t.title}</h1>
          <p className="mt-2 text-sm text-steel">
            {t.hello} <span className="font-mono">{email}</span>
          </p>
        </div>
        <form action={logoutCustomerAction}>
          <input type="hidden" name="lang" value={lang} />
          <button type="submit" className="text-sm text-steel underline hover:text-signal">
            {t.logout}
          </button>
        </form>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">{t.jobsTitle}</h2>
        {jobs.length === 0 ? (
          <p className="mt-3 text-ink/80">{t.jobsEmpty}</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {jobs.map((job) => (
              <li key={job.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink/10 bg-white p-4">
                <div>
                  <p className="font-bold">{job.device}</p>
                  <p className="text-sm text-steel">{job.service}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-cobalt/10 px-2.5 py-0.5 text-xs font-semibold text-cobalt">
                    {volgStatuses[job.status] ?? job.status}
                  </span>
                  <Link
                    href={`${p(lang, "volg")}?code=${job.code}`}
                    className="text-sm font-semibold text-cobalt hover:underline"
                  >
                    {t.track} →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">{t.apptsTitle}</h2>
        {appointments.length === 0 ? (
          <p className="mt-3 text-ink/80">
            {t.apptsEmpty}{" "}
            <Link href={p(lang, "afspraak")} className="font-semibold text-cobalt hover:underline">
              {t.newApptCta} →
            </Link>
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {appointments.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink/10 bg-white p-4">
                <div>
                  <p className="font-mono font-bold">{a.slot_start}</p>
                  <p className="text-sm text-steel">{a.service}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${a.status === "bevestigd" ? "bg-cobalt/10 text-cobalt" : a.status === "geannuleerd" ? "bg-ink/10 text-steel" : "bg-signal/10 text-signal"}`}>
                  {a.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">{t.newsletterTitle}</h2>
        <div className="mt-3 flex flex-wrap items-center gap-4 rounded-xl border border-ink/10 bg-white p-4">
          <p className="flex-1 text-sm">{newsletterOn ? t.newsletterOn : t.newsletterOff}</p>
          <form action={toggleNewsletterAction}>
            <input type="hidden" name="lang" value={lang} />
            <button type="submit" className="btn-secondary text-sm">
              {newsletterOn ? "✕" : "✓"} {dict.newsletter.submit}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
