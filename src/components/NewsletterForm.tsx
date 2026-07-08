"use client";

import { useState } from "react";

type Status = "idle" | "busy" | "sent" | "error";

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("busy");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-lg bg-cobalt/5 px-4 py-3 text-sm font-medium" role="status">
        Bijna klaar. Check je mailbox en klik op de bevestigingslink.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="nb-website">Website</label>
        <input id="nb-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <label htmlFor="nb-email" className="sr-only">E-mailadres</label>
      <input
        className="input sm:max-w-xs"
        id="nb-email"
        name="email"
        type="email"
        required
        maxLength={200}
        placeholder="jouw@mailadres.be"
        autoComplete="email"
      />
      <button type="submit" className="btn-secondary" disabled={status === "busy"}>
        {status === "busy" ? "Bezig..." : "Hou me op de hoogte"}
      </button>
      {status === "error" && (
        <p className="text-sm text-signal sm:self-center" role="alert">
          Lukte niet. Probeer straks nog eens.
        </p>
      )}
    </form>
  );
}
