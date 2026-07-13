import { listCampaigns, listSubscribers } from "@/lib/db";
import { CampaignForm } from "./CampaignForm";

export const dynamic = "force-dynamic";

export default function AdminNewsletterPage() {
  const subs = listSubscribers();
  const confirmed = subs.filter((s) => s.confirmed_at && !s.unsubscribed_at);
  const pending = subs.filter((s) => !s.confirmed_at && !s.unsubscribed_at);
  const campaigns = listCampaigns();
  const counts = {
    all: confirmed.length,
    nl: confirmed.filter((s) => s.lang === "nl").length,
    en: confirmed.filter((s) => s.lang === "en").length,
    fr: confirmed.filter((s) => s.lang === "fr").length,
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold">Nieuwsbrief</h1>
      <p className="mt-1 text-sm text-steel">
        {confirmed.length} bevestigde inschrijvingen · {pending.length} wachten op bevestiging.
        Alleen bevestigde adressen krijgen mails (dubbele opt-in, GDPR).
      </p>

      <div className="mt-6 rounded-xl border border-ink/10 bg-surface p-5">
        <h2 className="font-bold">Nieuwsbrief opstellen en versturen</h2>
        <CampaignForm counts={counts} />
      </div>

      {campaigns.length > 0 && (
        <div className="mt-8">
          <h2 className="font-bold">Verstuurde nieuwsbrieven</h2>
          <ul className="mt-3 space-y-2">
            {campaigns.map((c) => (
              <li key={c.id} className="rounded-lg border border-ink/10 bg-surface px-4 py-2.5 text-sm">
                <span className="font-semibold">{c.subject}</span>{" "}
                <span className="font-mono text-xs text-steel">
                  → {c.sent_to} abonnees ({c.lang_filter}) · {c.created_at.slice(0, 16)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 overflow-x-auto rounded-xl border border-ink/10 bg-surface">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-xs uppercase text-steel">
              <th className="px-4 py-3">E-mail</th>
              <th className="px-4 py-3">Taal</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {subs.map((s) => (
              <tr key={s.id} className="border-b border-ink/5 last:border-0">
                <td className="px-4 py-2.5 font-mono text-xs">{s.email}</td>
                <td className="px-4 py-2.5 font-mono text-xs uppercase">{s.lang}</td>
                <td className="px-4 py-2.5">
                  {s.unsubscribed_at ? "uitgeschreven" : s.confirmed_at ? "✓ bevestigd" : "wacht op bevestiging"}
                </td>
              </tr>
            ))}
            {subs.length === 0 && (
              <tr><td colSpan={3} className="px-4 py-4 text-steel">Nog geen inschrijvingen.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
