"use client";

import { useFormState, useFormStatus } from "react-dom";
import { sendCampaignAction } from "../../actions";

function SendButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? "Bezig met versturen..." : "Verstuur nu"}
    </button>
  );
}

export function CampaignForm({ counts }: { counts: { all: number; nl: number; en: number; fr: number } }) {
  const [state, formAction] = useFormState(sendCampaignAction, undefined);

  return (
    <form action={formAction} className="mt-4 space-y-4">
      <div>
        <label className="label" htmlFor="c-subject">Onderwerp *</label>
        <input className="input" id="c-subject" name="subject" required maxLength={150} />
      </div>
      <div>
        <label className="label" htmlFor="c-body">Tekst * (gewone tekst, wordt netjes opgemaakt met jouw huisstijl en een uitschrijflink)</label>
        <textarea className="input min-h-40" id="c-body" name="body" required maxLength={10000} />
      </div>
      <div>
        <label className="label" htmlFor="c-lang">Naar wie?</label>
        <select className="input" id="c-lang" name="lang_filter" defaultValue="all">
          <option value="all">Iedereen ({counts.all})</option>
          <option value="nl">Nederlands ({counts.nl})</option>
          <option value="en">Engels ({counts.en})</option>
          <option value="fr">Frans ({counts.fr})</option>
        </select>
      </div>
      {state?.error && (
        <p className="rounded-lg bg-signal/10 px-4 py-3 text-sm font-medium text-signal" role="alert">{state.error}</p>
      )}
      {state?.done != null && (
        <p className="rounded-lg bg-cobalt/5 px-4 py-3 text-sm font-medium" role="status">
          Verstuurd naar {state.done} {state.done === 1 ? "abonnee" : "abonnees"}.
        </p>
      )}
      <SendButton />
      <p className="text-xs text-steel">
        Tip: schrijf in de taal van de groep die je kiest. Resend (gratis plan) verstuurt max. 100 mails per dag.
      </p>
    </form>
  );
}
