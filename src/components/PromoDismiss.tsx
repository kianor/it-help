"use client";

import { useLayoutEffect } from "react";

/**
 * Sluitknop voor de actie-balk. De keuze geldt voor de rest van de sessie;
 * de balk wordt vóór de eerste paint verborgen (useLayoutEffect) zodat
 * bezoekers die hem wegklikten geen flits zien bij de volgende pagina.
 */
export function PromoDismiss() {
  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem("ritsit-promo-weg") === "1") {
        hide();
      }
    } catch {}
  }, []);

  function hide() {
    document.querySelector<HTMLElement>("[data-promo-banner]")?.style.setProperty("display", "none");
  }

  return (
    <button
      type="button"
      aria-label="×"
      onClick={() => {
        try {
          sessionStorage.setItem("ritsit-promo-weg", "1");
        } catch {}
        hide();
      }}
      className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-white/60 transition hover:text-white"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  );
}
