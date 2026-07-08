import { getSetting, takenSlots } from "./db";

/**
 * Slots worden berekend uit een weekschema in de instellingen
 * (appt_hours_mon..sun, bv. "18:00-21:00"), minus geblokkeerde dagen en
 * al geboekte afspraken. Tijden zijn lokale Belgische tijd.
 */

const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

export type DaySlots = { day: string; label: string; slots: string[] };

function brusselsNow(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Brussels" }));
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function availableSlots(): DaySlots[] {
  const slotMinutes = parseInt(getSetting("appt_slot_minutes") || "60", 10);
  const leadHours = parseInt(getSetting("appt_lead_hours") || "24", 10);
  const horizonDays = parseInt(getSetting("appt_horizon_days") || "21", 10);
  const blocked = new Set(
    (getSetting("appt_blocked") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  );

  const now = brusselsNow();
  const earliest = new Date(now.getTime() + leadHours * 60 * 60 * 1000);
  const fromDay = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const taken = takenSlots(fromDay);

  const days: DaySlots[] = [];
  for (let offset = 0; offset <= horizonDays; offset++) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
    const dayStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    if (blocked.has(dayStr)) continue;

    const hours = getSetting(`appt_hours_${DAY_KEYS[date.getDay()]}`) || "";
    const match = hours.match(/^(\d{2}):(\d{2})-(\d{2}):(\d{2})$/);
    if (!match) continue;

    const [, h1, m1, h2, m2] = match;
    const slots: string[] = [];
    const start = new Date(date);
    start.setHours(Number(h1), Number(m1), 0, 0);
    const end = new Date(date);
    end.setHours(Number(h2), Number(m2), 0, 0);

    for (let t = start; t.getTime() + slotMinutes * 60000 <= end.getTime() + 1; t = new Date(t.getTime() + slotMinutes * 60000)) {
      if (t < earliest) continue;
      const slot = `${dayStr} ${pad(t.getHours())}:${pad(t.getMinutes())}`;
      if (!taken.has(slot)) slots.push(slot);
    }
    if (slots.length > 0) days.push({ day: dayStr, label: dayStr, slots });
  }
  return days;
}

/** Alleen slots die uit het schema komen mogen geboekt worden. */
export function isValidSlot(slot: string): boolean {
  return availableSlots().some((d) => d.slots.includes(slot));
}
