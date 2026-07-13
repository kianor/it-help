"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

const SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

/** ↑↑↓↓←→←→BA — wie de klassiekers kent, verdient een knipoog (en €5 korting). */
export function KonamiEgg({ title, text, close }: { title: string; text: string; close: string }) {
  const [found, setFound] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let index = 0;
    function onKey(e: KeyboardEvent) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === SEQUENCE[index]) {
        index += 1;
        if (index === SEQUENCE.length) {
          setFound(true);
          track("konami_unlock");
          index = 0;
        }
      } else {
        index = key === SEQUENCE[0] ? 1 : 0;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!found) return;
    closeRef.current?.focus();
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setFound(false);
    }
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [found]);

  if (!found) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-panel/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={() => setFound(false)}
    >
      <div
        className="animate-reveal max-w-sm rounded-2xl border-2 border-signal bg-surface p-8 text-center shadow-[0_0_40px_rgba(242,107,29,0.45)]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-mono text-2xl text-accent" aria-hidden="true">↑↑↓↓←→←→BA</p>
        <h2 className="mt-3 font-display text-2xl font-bold text-ink">{title}</h2>
        <p className="mt-2 text-ink/80">{text}</p>
        <button ref={closeRef} type="button" className="btn-primary mt-5" onClick={() => setFound(false)}>
          {close}
        </button>
      </div>
    </div>
  );
}
