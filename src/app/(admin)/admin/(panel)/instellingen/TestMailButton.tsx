"use client";

import { useFormState, useFormStatus } from "react-dom";
import { sendTestMailAction } from "../../actions";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-secondary text-sm" disabled={pending}>
      {pending ? "Versturen..." : "Stuur een testmail naar mij"}
    </button>
  );
}

export function TestMailButton() {
  const [state, formAction] = useFormState(sendTestMailAction, undefined);
  return (
    <form action={formAction} className="space-y-2">
      <Submit />
      {state?.ok && (
        <p className="rounded-lg bg-link/5 px-3 py-2 text-sm font-medium" role="status">
          Verstuurd! Check je mailbox (en je spam-map bij een eerste keer).
        </p>
      )}
      {state?.error && (
        <p className="rounded-lg bg-accent-strong/10 px-3 py-2 text-sm font-medium text-accent-strong" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}
