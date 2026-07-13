"use client";

import { useState } from "react";
import type { Dict } from "@/i18n";
import { track } from "@/lib/analytics";

export function AccountLoginForm({
  lang,
  labels,
}: {
  lang: string;
  labels: Dict["accountPage"];
}) {
  const [status, setStatus] = useState<"idle" | "busy" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("busy");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang }),
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) track("login_link_request");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-lg bg-cobalt/5 px-4 py-3 font-medium" role="status">
        {labels.linkSent}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="l-website">Website</label>
        <input id="l-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label className="label" htmlFor="l-email">{labels.emailLabel}</label>
        <input className="input" id="l-email" name="email" type="email" required maxLength={200} autoComplete="email" />
      </div>
      <button type="submit" className="btn-primary" disabled={status === "busy"}>
        {labels.sendLink}
      </button>
    </form>
  );
}
