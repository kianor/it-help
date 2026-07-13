"use client";

/**
 * Eén meetfunctie voor de hele site.
 *
 * 1. Stuurt elk event cookievrij naar de eigen statistieken (/api/event) —
 *    werkt altijd, zonder consent-vereiste (geen persoonsgegevens, geen
 *    cookies, dagelijkse niet-herleidbare hash aan de serverkant).
 * 2. Stuurt hetzelfde event door naar Google Analytics 4 wanneer GA4 is
 *    geconfigureerd (NEXT_PUBLIC_GA4_ID) én de bezoeker toestemming gaf
 *    (zie Ga4Consent.tsx). Eventnamen volgen de GA4-conventies:
 *    snake_case, ≤40 tekens, parameters als losse velden.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type EventParams = { label?: string; value?: number };

export function track(name: string, params: EventParams = {}) {
  try {
    const payload = JSON.stringify({
      name,
      ...params,
      path: window.location.pathname,
      lang: document.documentElement.lang?.slice(0, 2),
    });
    if (!navigator.sendBeacon?.("/api/event", new Blob([payload], { type: "application/json" }))) {
      fetch("/api/event", { method: "POST", body: payload, keepalive: true }).catch(() => {});
    }
  } catch {}

  // GA4 (alleen actief na consent; gtag bestaat anders niet)
  try {
    window.gtag?.("event", name, {
      event_label: params.label,
      value: params.value,
    });
  } catch {}
}
