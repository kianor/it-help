"use client";

import { useState } from "react";
import type { Dict } from "@/i18n";
import type { Locale } from "@/i18n/config";

type Status = "idle" | "busy" | "sent" | "error";

export function ContactForm({
  lang,
  labels,
  serviceOptions,
  privacyHref,
}: {
  lang: Locale;
  labels: Dict["contactPage"]["form"];
  serviceOptions: readonly string[];
  privacyHref: string;
}) {
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
        body: JSON.stringify({ ...data, lang }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        const body = await res.json().catch(() => null);
        setError(body?.error || labels.error);
        setStatus("error");
      }
    } catch {
      setError(labels.error);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-cobalt/30 bg-cobalt/5 p-8 text-center" role="status">
        <p className="font-display text-2xl font-bold">{labels.sentTitle}</p>
        <p className="mt-2 text-lg">{labels.sentText}</p>
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
          <label className="label" htmlFor="name">{labels.name}</label>
          <input className="input" id="name" name="name" required maxLength={100} autoComplete="name" />
        </div>
        <div>
          <label className="label" htmlFor="phone">{labels.phone}</label>
          <input className="input" id="phone" name="phone" type="tel" required maxLength={30} autoComplete="tel" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="email">{labels.email}</label>
        <input className="input" id="email" name="email" type="email" maxLength={200} autoComplete="email" />
      </div>

      <div>
        <label className="label" htmlFor="service">{labels.service}</label>
        <select className="input" id="service" name="service" required defaultValue="">
          <option value="" disabled>{labels.servicePlaceholder}</option>
          {serviceOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="label" htmlFor="message">{labels.message}</label>
        <textarea
          className="input min-h-32"
          id="message"
          name="message"
          required
          maxLength={3000}
          placeholder={labels.messagePlaceholder}
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-signal/10 px-4 py-3 text-sm font-medium text-signal" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "busy"}>
        {status === "busy" ? labels.sending : labels.send}
      </button>
      <p className="text-xs text-steel">
        {labels.privacyNote}{" "}
        <a href={privacyHref} className="underline hover:text-cobalt">{labels.privacyLink}</a>.
      </p>
    </form>
  );
}
