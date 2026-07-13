"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Eén luisteraar voor de hele site — voegt tracking toe zonder bestaande
 * componenten te wijzigen:
 *
 * - klikken: elk element met een data-track-attribuut (event-naam) en
 *   optioneel data-track-label
 * - kopiëren: tekstselecties binnen [data-track-copy] → copy_code
 * - scroll-diepte: 25/50/75/100% op lange pagina's (> 1,5× viewport),
 *   elke drempel maximaal één keer per paginaweergave
 */
export function AnalyticsListener() {
  const pathname = usePathname();

  // Klik- en copy-delegatie (eenmalig)
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-track]");
      if (!el) return;
      const name = el.dataset.track;
      if (!name) return;
      track(name, { label: el.dataset.trackLabel || el.textContent?.trim().slice(0, 60) || undefined });
    }
    function onCopy(e: ClipboardEvent) {
      const el = (e.target as HTMLElement | null)?.closest?.("[data-track-copy]");
      if (el) track("copy_code", { label: (el as HTMLElement).dataset.trackCopy });
    }
    document.addEventListener("click", onClick, { capture: true, passive: true });
    document.addEventListener("copy", onCopy);
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("copy", onCopy);
    };
  }, []);

  // Scroll-diepte per pagina
  useEffect(() => {
    const fired = new Set<number>();
    function onScroll() {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      if (doc.scrollHeight < window.innerHeight * 1.5 || total <= 0) return;
      const percent = ((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100;
      for (const threshold of [25, 50, 75, 100]) {
        if (percent >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          track("scroll_depth", { label: pathname, value: threshold });
        }
      }
      if (fired.size === 4) window.removeEventListener("scroll", onScroll);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}
