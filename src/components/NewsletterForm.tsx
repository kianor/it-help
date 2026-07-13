"use client";

import { useState } from "react";
import type { Dict } from "@/i18n";
import { track } from "@/lib/analytics";
import type { Locale } from "@/i18n/config";

type Status = "idle" | "busy" | "sent" | "error";

export function NewsletterForm({
  lang,
  labels,
}: {
  lang: Locale;
  labels: Dict["newsletter"];
}) {
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
        body: JSON.stringify({ ...data, lang }),
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) {
        track("newsletter_subscribe");
        form.reset();
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-lg bg-cobalt/5 px-4 py-3 text-sm font-medium" role="status">
        {labels.done}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="nb-website">Website</label>
        <input id="nb-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <label htmlFor="nb-email" className="sr-only">E-mail</label>
      <input
        className="input"
        id="nb-email"
        name="email"
        type="email"
        required
        maxLength={200}
        placeholder={labels.placeholder}
        autoComplete="email"
      />
      <button type="submit" className="btn-secondary" disabled={status === "busy"}>
        {status === "busy" ? labels.busy : labels.submit}
      </button>
      {status === "error" && (
        <p className="text-sm text-accent-strong" role="alert">{labels.error}</p>
      )}
    </form>
  );
}
