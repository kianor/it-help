"use client";

import { useEffect, useState } from "react";
import type { Dict } from "@/i18n";
import { track } from "@/lib/analytics";
import type { Locale } from "@/i18n/config";
import { fieldError as validate, type Field } from "@/lib/validation";

type Status = "idle" | "busy" | "sent" | "error";

const FIELD_ORDER: Field[] = ["name", "phone", "email", "service", "message"];

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
  // Voorvullen vanuit de PC-calculator (?msg=…&service=pc). Client-side gelezen
  // zodat de contactpagina statisch geserveerd blijft.
  const [message, setMessage] = useState("");
  const [service, setService] = useState("");
  // Inline veldvalidatie: fout verschijnt náást het veld (bij blur of submit),
  // spiegelt exact de server-side Zod-regels in /api/contact.
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const msg = q.get("msg");
    if (msg) setMessage(msg);
    if (q.get("service") === "pc" && serviceOptions.length > 0) {
      setService(serviceOptions[0]);
    }
  }, [serviceOptions]);

  /** E-mail is optioneel op contact; bericht is verplicht. */
  const fieldError = (field: Field, value: string) =>
    validate(field, value, labels.errors, { messageRequired: true });

  const onBlur = (field: Field) => (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setErrors((prev) => ({ ...prev, [field]: fieldError(field, e.target.value) }));

  // Fout live wegwerken zodra het veld geldig wordt (maar niet vroegtijdig tonen).
  const clearIfFixed = (field: Field, value: string) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: fieldError(field, value) }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Volledige validatie vóór verzenden; bij fouten focus het eerste veld.
    const next: Partial<Record<Field, string>> = {};
    for (const f of FIELD_ORDER) next[f] = fieldError(f, String(data[f] ?? ""));
    setErrors(next);
    const firstBad = FIELD_ORDER.find((f) => next[f]);
    if (firstBad) {
      document.getElementById(firstBad)?.focus();
      return;
    }

    setStatus("busy");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang }),
      });
      if (res.ok) {
        setStatus("sent");
        track("contact_submit");
        form.reset();
      } else {
        setError(labels.error);
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

  const errorProps = (field: Field) =>
    errors[field]
      ? { "aria-invalid": true as const, "aria-describedby": `${field}-error` }
      : {};

  const FieldError = ({ field }: { field: Field }) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-1 text-xs font-medium text-accent-strong" role="alert">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {/* Honeypot tegen spam: mensen zien dit veld niet */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">{labels.name}</label>
          <input
            className="input"
            id="name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            onBlur={onBlur("name")}
            onChange={(e) => clearIfFixed("name", e.target.value)}
            {...errorProps("name")}
          />
          <FieldError field="name" />
        </div>
        <div>
          <label className="label" htmlFor="phone">{labels.phone}</label>
          <input
            className="input"
            id="phone"
            name="phone"
            type="tel"
            required
            maxLength={30}
            autoComplete="tel"
            onBlur={onBlur("phone")}
            onChange={(e) => clearIfFixed("phone", e.target.value)}
            {...errorProps("phone")}
          />
          <FieldError field="phone" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="email">{labels.email}</label>
        <input
          className="input"
          id="email"
          name="email"
          type="email"
          maxLength={200}
          autoComplete="email"
          onBlur={onBlur("email")}
          onChange={(e) => clearIfFixed("email", e.target.value)}
          {...errorProps("email")}
        />
        <FieldError field="email" />
      </div>

      <div>
        <label className="label" htmlFor="service">{labels.service}</label>
        <select
          className="input"
          id="service"
          name="service"
          required
          value={service}
          onChange={(e) => {
            setService(e.target.value);
            clearIfFixed("service", e.target.value);
          }}
          onBlur={onBlur("service")}
          {...errorProps("service")}
        >
          <option value="" disabled>{labels.servicePlaceholder}</option>
          {serviceOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <FieldError field="service" />
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
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            clearIfFixed("message", e.target.value);
          }}
          onBlur={onBlur("message")}
          {...errorProps("message")}
        />
        <FieldError field="message" />
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-accent-strong/10 px-4 py-3 text-sm font-medium text-accent-strong" role="alert">
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
