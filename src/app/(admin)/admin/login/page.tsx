"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "../actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary w-full" disabled={pending}>
      {pending ? "Bezig..." : "Inloggen"}
    </button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(loginAction, undefined);

  return (
    <div className="mx-auto max-w-sm px-4 pt-20">
      <h1 className="text-3xl font-bold">Admin</h1>
      <p className="mt-2 text-sm text-steel">Alleen voor Kiano. Klant? Ga naar de contactpagina.</p>
      <form action={formAction} className="mt-8 space-y-4">
        <div>
          <label className="label" htmlFor="password">Wachtwoord</label>
          <input
            className="input"
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
          />
        </div>
        {state?.error && (
          <p className="rounded-lg bg-accent-strong/10 px-4 py-3 text-sm font-medium text-accent-strong" role="alert">
            {state.error}
          </p>
        )}
        <SubmitButton />
      </form>
    </div>
  );
}
