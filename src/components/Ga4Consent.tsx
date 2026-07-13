"use client";

import { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;
const STORAGE_KEY = "ritsit-consent";

/**
 * GA4 is optioneel en consent-gedreven, zodat de site cookievrij blijft
 * zolang de bezoeker niets aanvaardt (en er dus geen banner nodig is als
 * GA4 niet geconfigureerd is):
 *
 * - Zonder NEXT_PUBLIC_GA4_ID rendert dit niets — geen banner, geen Google.
 * - Mét ID verschijnt een minimale keuzebanner; gtag.js laadt pas ná een
 *   expliciete "aanvaard" (GDPR/ePrivacy). Weigeren = alleen de eigen
 *   cookievrije statistieken, die sowieso al draaien.
 */
function loadGa(id: string) {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  window.gtag = gtag;
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  gtag("js", new Date());
  gtag("config", id, { anonymize_ip: true });
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  script.async = true;
  document.head.appendChild(script);
}

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function Ga4Consent({
  text,
  accept,
  decline,
}: {
  text: string;
  accept: string;
  decline: string;
}) {
  const [state, setState] = useState<"init" | "ask" | "done">("init");

  useEffect(() => {
    if (!GA_ID) return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "granted") {
      loadGa(GA_ID);
      setState("done");
    } else if (stored === "denied") {
      setState("done");
    } else {
      setState("ask");
    }
  }, []);

  if (!GA_ID || state !== "ask") return null;

  function choose(granted: boolean) {
    localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    if (granted && GA_ID) loadGa(GA_ID);
    setState("done");
  }

  return (
    <div
      className="fixed bottom-16 left-3 right-3 z-50 mx-auto max-w-md rounded-xl border border-ink/15 bg-surface p-4 shadow-lg md:bottom-4"
      role="dialog"
      aria-live="polite"
    >
      <p className="text-sm text-ink/90">{text}</p>
      <div className="mt-3 flex gap-2">
        <button type="button" className="btn-primary flex-1 !py-2 text-sm" onClick={() => choose(true)}>
          {accept}
        </button>
        <button
          type="button"
          className="flex-1 rounded-lg border border-ink/20 py-2 text-sm font-semibold text-muted hover:text-foreground"
          onClick={() => choose(false)}
        >
          {decline}
        </button>
      </div>
    </div>
  );
}
