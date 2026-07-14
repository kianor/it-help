"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

/**
 * Schakelt de donkere game-modus in en uit (klasse "game" op <html>).
 * De keuze wordt bewaard in localStorage en vóór hydration toegepast
 * via een inline script in de layout.
 *
 * De eerste keer dat iemand hem inschakelt verschijnt een korte, sluitbare
 * uitleg — zodat een per ongeluk ingeschakeld donker thema meteen te plaatsen
 * (en terug te draaien) is. Daarna nooit meer.
 */
export function GameModeToggle({ label, hint }: { label: string; hint: string }) {
  const [on, setOn] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setOn(document.documentElement.classList.contains("game"));
  }, []);

  function toggle() {
    const next = !on;
    setOn(next);
    document.documentElement.classList.toggle("game", next);
    try {
      localStorage.setItem("ritsit-game", next ? "1" : "0");
      // Toon de uitleg alleen bij de eerste keer inschakelen.
      if (next && localStorage.getItem("ritsit-game-hint") !== "1") {
        setShowHint(true);
        localStorage.setItem("ritsit-game-hint", "1");
      } else {
        setShowHint(false);
      }
    } catch {}
    track("game_mode_toggle", { label: next ? "on" : "off" });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        title={label}
        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border transition ${
          on
            ? "border-accent bg-ink text-accent-soft shadow-[0_0_12px_rgba(242,107,29,0.5)]"
            : "border-ink/15 text-steel hover:text-ink"
        }`}
      >
        <span className="sr-only">{label}</span>
        {/* Gamepad-icoon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 12h4m-2-2v4" />
          <circle cx="15.5" cy="11" r="0.5" fill="currentColor" />
          <circle cx="18" cy="13" r="0.5" fill="currentColor" />
          <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
        </svg>
      </button>

      {showHint && (
        <div
          role="status"
          className="absolute right-0 top-12 z-50 w-60 rounded-lg border border-ink/10 bg-surface p-3 text-xs text-ink/90 shadow-lg"
        >
          <p>{hint}</p>
          <button
            type="button"
            onClick={() => setShowHint(false)}
            className="mt-2 font-semibold text-cobalt hover:underline"
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
}
