"use client";

import { useState } from "react";
import type { Dict } from "@/i18n";
import type { DaySlots } from "@/lib/appointments";

type Status = "idle" | "busy" | "sent" | "error";

export function AppointmentPicker({
  lang,
  days,
  labels,
  form,
  serviceOptions,
  htmlLang,
}: {
  lang: string;
  days: DaySlots[];
  labels: Dict["afspraakPage"];
  form: Dict["contactPage"]["form"];
  serviceOptions: readonly string[];
  htmlLang: string;
}) {
  const [day, setDay] = useState<string | null>(days[0]?.day ?? null);
  const [slot, setSlot] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const selectedDay = days.find((d) => d.day === day);

  function dayLabel(dayStr: string): string {
    const date = new Date(dayStr + "T12:00:00");
    return new Intl.DateTimeFormat(htmlLang, { weekday: "short", day: "numeric", month: "short" }).format(date);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!slot) return;
    setStatus("busy");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/afspraak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, slot, lang }),
      });
      if (res.ok) {
        setStatus("sent");
      } else {
        const body = await res.json().catch(() => null);
        setError(body?.error === "slot" ? labels.slotTakenError : body?.error || form.error);
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
        <p className="mt-2 text-lg">{labels.sentText}</p>
      </div>
    );
  }

  if (days.length === 0) {
    return <p className="rounded-lg bg-signal/10 px-4 py-3 font-medium text-signal">{labels.noSlots}</p>;
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
                  onClick={() => setSlot(s)}
                  className={`rounded-lg border px-3 py-2 font-mono text-sm font-bold transition ${
                    slot === s ? "border-signal bg-signal text-white" : "border-ink/15 hover:border-signal hover:text-signal"
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

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="a-name">{form.name}</label>
            <input className="input" id="a-name" name="name" required maxLength={100} autoComplete="name" />
          </div>
          <div>
            <label className="label" htmlFor="a-phone">{form.phone}</label>
            <input className="input" id="a-phone" name="phone" type="tel" required maxLength={30} autoComplete="tel" />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="a-email">{form.email}</label>
          <input className="input" id="a-email" name="email" type="email" maxLength={200} autoComplete="email" />
        </div>
        <div>
          <label className="label" htmlFor="a-service">{form.service}</label>
          <select className="input" id="a-service" name="service" required defaultValue="">
            <option value="" disabled>{form.servicePlaceholder}</option>
            {serviceOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
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
          <p className="rounded-lg bg-signal/10 px-4 py-3 text-sm font-medium text-signal" role="alert">{error}</p>
        )}
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "busy" || !slot}>
          {status === "busy" ? labels.sending : labels.submit}
        </button>
      </form>
    </div>
  );
}
