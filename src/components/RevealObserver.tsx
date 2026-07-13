"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Site-brede scroll-reveals: elk element met [data-reveal] glijdt in zodra
 * het in beeld komt. Progressive enhancement — de verborgen begintoestand
 * geldt alleen onder html.js (gezet door het inline script in de layout),
 * dus zonder JavaScript is alles gewoon zichtbaar.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
