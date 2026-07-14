"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Dict } from "@/i18n";
import type { DaySlots } from "@/lib/appointments";
import { track } from "@/lib/analytics";
import { fieldError as validate, type Field } from "@/lib/validation";

type Status = "idle" | "busy" | "sent" | "error";

// Op het afspraakformulier is e-mail verplicht (bevestiging), bericht optioneel.
const FIELD_ORDER: Field[] = ["name", "phone", "email", "service"];

export function AppointmentPicker({
  lang,
  days,
  labels,
  form,
  serviceOptions,
  htmlLang,
  callCta,
  phone,
}: {
  lang: string;
  days: DaySlots[];
  labels: Dict["afspraakPage"];
  form: Dict["contactPage"]["form"];
  serviceOptions: readonly string[];
  htmlLang: string;
  callCta: string;
  phone: string;
}) {
  const [day, setDay] = useState<string | null>(days[0]?.day ?? null);
  const [slot, setSlot] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const router = useRouter();

  const selectedDay = days.find((d) => d.day === day);

  const fieldError = (field: Field, value: string) =>
    validate(field, value, form.errors, { emailRequired: true });
  const onBlur = (field: Field) => (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) =>
    setErrors((prev) => ({ ...prev, [field]: fieldError(field, e.target.value) }));
  const clearIfFixed = (field: Field, value: string) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: fieldError(field, value) }));
  };
  const errorProps = (field: Field) =>
    errors[field] ? { "aria-invalid": true as const, "aria-describedby": `a-${field}-error` } : {};
  const FieldError = ({ field }: { field: Field }) =>
    errors[field] ? (
      <p id={`a-${field}-error`} className="mt-1 text-xs font-medium text-accent-strong" role="alert">
        {errors[field]}
      </p>
    ) : null;

  function dayLabel(dayStr: string): string {
    const date = new Date(dayStr + "T12:00:00");
    return new Intl.DateTimeFormat(htmlLang, { weekday: "short", day: "numeric", month: "short" }).format(date);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!slot) return;
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;

    // Volledige validatie vóór verzenden; bij fouten focus het eerste veld.
    const next: Partial<Record<Field, string>> = {};
    for (const f of FIELD_ORDER) next[f] = fieldError(f, String(data[f] ?? ""));
    setErrors(next);
    const firstBad = FIELD_ORDER.find((f) => next[f]);
    if (firstBad) {
      document.getElementById(`a-${firstBad}`)?.focus();
      return;
    }

    setStatus("busy");
    setError("");
    try {
      const res = await fetch("/api/afspraak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, slot, lang }),
      });
      if (res.ok) {
        setStatus("sent");
        track("appointment_request");
      } else {
        const body = await res.json().catch(() => null);
        if (body?.error === "slot") {
          setError(labels.slotTakenError);
          setSlot(null);
          router.refresh(); // verse slots ophalen, het bezette slot verdwijnt
        } else {
          setError(form.error);
        }
        setStatus("error");
      }
    } catch {
      setError(form.error);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-cobalt/30 bg-cobalt/5 p-8 text-center" role="status">
        <p className="font-display text-2xl font-bold">{labels.sentTitle}</p>
        {slot && (
          <p className="mt-3 font-mono text-lg font-bold">
            {dayLabel(slot.slice(0, 10))} · {slot.slice(11)}
          </p>
        )}
        <p className="mt-2 text-lg">{labels.sentText}</p>
      </div>
    );
  }

  if (days.length === 0) {
    return (
      <div className="rounded-lg bg-accent-strong/10 p-5">
        <p className="font-medium text-accent-strong">{labels.noSlots}</p>
        <a href={`tel:${phone}`} data-track="cta_call_click" data-track-label="afspraak-vol" className="btn-primary mt-4">
          {callCta}
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <p className="label">{labels.chooseDay}</p>
        <div className="flex flex-wrap gap-2">
          {days.map((d) => (
            <button
              key={d.day}
              type="button"
              aria-pressed={day === d.day}
              onClick={() => {
                setDay(d.day);
                setSlot(null);
                track("appointment_day_select", { label: d.day });
              }}
              className={`rounded-lg border px-3 py-2 font-mono text-sm font-bold transition ${
                day === d.day ? "border-cobalt bg-cobalt text-white" : "border-ink/15 hover:border-cobalt hover:text-cobalt"
              }`}
            >
              {dayLabel(d.day)}
            </button>
          ))}
        </div>

        {selectedDay && (
          <>
            <p className="label mt-6">{labels.chooseSlot}</p>
            <div className="flex flex-wrap gap-2">
              {selectedDay.slots.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={slot === s}
                  onClick={() => {
                    setSlot(s);
                    track("appointment_slot_select", { label: s });
                  }}
                  className={`rounded-lg border px-3 py-2 font-mono text-sm font-bold transition ${
                    slot === s ? "border-signal bg-accent-strong text-white" : "border-ink/15 hover:border-signal hover:text-accent-strong"
                  }`}
                >
                  {s.slice(11)}
                </button>
              ))}
            </div>
          </>
        )}

        {slot && (
          <p className="mt-6 rounded-lg bg-cobalt/5 px-4 py-3 text-sm">
            {labels.yourSlot}: <strong className="font-mono">{dayLabel(slot.slice(0, 10))} · {slot.slice(11)}</strong>
          </p>
        )}
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="a-name">{form.name}</label>
            <input
              className="input"
              id="a-name"
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
            <label className="label" htmlFor="a-phone">{form.phone}</label>
            <input
              className="input"
              id="a-phone"
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
          <label className="label" htmlFor="a-email">{labels.emailLabel}</label>
          <input
            className="input"
            id="a-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            onBlur={onBlur("email")}
            onChange={(e) => clearIfFixed("email", e.target.value)}
            {...errorProps("email")}
          />
          <FieldError field="email" />
        </div>
        <div>
          <label className="label" htmlFor="a-service">{form.service}</label>
          <select
            className="input"
            id="a-service"
            name="service"
            required
            defaultValue=""
            onBlur={onBlur("service")}
            onChange={(e) => clearIfFixed("service", e.target.value)}
            {...errorProps("service")}
          >
            <option value="" disabled>{form.servicePlaceholder}</option>
            {serviceOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <FieldError field="service" />
        </div>
        <div>
          <label className="label" htmlFor="a-message">{form.message}</label>
          <textarea className="input min-h-24" id="a-message" name="message" maxLength={2000} placeholder={form.messagePlaceholder} />
        </div>
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="a-website">Website</label>
          <input id="a-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        {status === "error" && (
          <p className="rounded-lg bg-accent-strong/10 px-4 py-3 text-sm font-medium text-accent-strong" role="alert">{error}</p>
        )}
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "busy" || !slot}>
          {status === "busy" ? labels.sending : labels.submit}
        </button>
      </form>
    </div>
  );
}
