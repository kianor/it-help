import { listSubscribers } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function AdminNewsletterPage() {
  const subs = listSubscribers();
  const confirmed = subs.filter((s) => s.confirmed_at && !s.unsubscribed_at);
  const pending = subs.filter((s) => !s.confirmed_at && !s.unsubscribed_at);

  const csv = confirmed.map((s) => s.email).join("\n");

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold">Nieuwsbrief</h1>
      <p className="mt-1 text-sm text-steel">
        {confirmed.length} bevestigde inschrijvingen · {pending.length} wachten op bevestiging.
        Alleen bevestigde adressen mag je mailen (dubbele opt-in, GDPR).
      </p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-ink/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-xs uppercase text-steel">
              <th className="px-4 py-3">E-mail</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {subs.map((s) => (
              <tr key={s.id} className="border-b border-ink/5 last:border-0">
                <td className="px-4 py-2.5 font-mono text-xs">{s.email}</td>
                <td className="px-4 py-2.5">
                  {s.unsubscribed_at
                    ? "uitgeschreven"
                    : s.confirmed_at
                      ? "✓ bevestigd"
                      : "wacht op bevestiging"}
                </td>
              </tr>
            ))}
            {subs.length === 0 && (
              <tr><td colSpan={2} className="px-4 py-4 text-steel">Nog geen inschrijvingen.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {confirmed.length > 0 && (
        <div className="mt-6 rounded-xl border border-ink/10 bg-white p-5">
          <p className="label">Kopieer voor je mailprogramma (BCC!) of mailtool</p>
          <textarea className="input min-h-28 font-mono text-xs" readOnly value={csv} />
        </div>
      )}
    </div>
  );
}
