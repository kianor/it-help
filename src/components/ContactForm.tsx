"use client";

import { useState } from "react";
import { contactServiceOptions } from "@/config/services";

type Status = "idle" | "busy" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("busy");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        const body = await res.json().catch(() => null);
        setError(body?.error || "Er ging iets mis. Bel of app me gerust rechtstreeks.");
        setStatus("error");
      }
    } catch {
      setError("Er ging iets mis. Bel of app me gerust rechtstreeks.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-cobalt/30 bg-cobalt/5 p-8 text-center" role="status">
        <p className="text-2xl font-bold font-display">Verstuurd.</p>
        <p className="mt-2 text-lg">Ik bel of app je vandaag nog terug.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Honeypot tegen spam: mensen zien dit veld niet */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">Naam *</label>
          <input className="input" id="name" name="name" required maxLength={100} autoComplete="name" />
        </div>
        <div>
          <label className="label" htmlFor="phone">Telefoon *</label>
          <input className="input" id="phone" name="phone" type="tel" required maxLength={30} autoComplete="tel" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="email">E-mail (optioneel, voor een bevestiging)</label>
        <input className="input" id="email" name="email" type="email" maxLength={200} autoComplete="email" />
      </div>

      <div>
        <label className="label" htmlFor="service">Waarover gaat het? *</label>
        <select className="input" id="service" name="service" required defaultValue="">
          <option value="" disabled>Kies een dienst</option>
          {contactServiceOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="label" htmlFor="message">Je bericht *</label>
        <textarea
          className="input min-h-32"
          id="message"
          name="message"
          required
          maxLength={3000}
          placeholder="Beschrijf kort het probleem of je plannen. Merk en type van het toestel helpt ook."
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-signal/10 px-4 py-3 text-sm font-medium text-signal" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "busy"}>
        {status === "busy" ? "Versturen..." : "Verstuur je aanvraag"}
      </button>
      <p className="text-xs text-steel">
        Je gegevens worden alleen gebruikt om je te helpen. Zie de{" "}
        <a href="/privacy" className="underline hover:text-cobalt">privacyverklaring</a>.
      </p>
    </form>
  );
}
