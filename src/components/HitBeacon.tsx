"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Privacyvriendelijke bezoekersteller: geen cookies, geen fingerprinting
 * aan de clientkant. Stuurt alleen pad + referrer; de server telt unieke
 * bezoekers via een dagelijks wisselende hash.
 */
export function HitBeacon({ lang }: { lang: string }) {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const body = JSON.stringify({
        path: pathname,
        lang,
        ref: document.referrer || "",
      });
      navigator.sendBeacon?.("/api/hit", new Blob([body], { type: "application/json" })) ||
        fetch("/api/hit", { method: "POST", body, keepalive: true });
    } catch {}
  }, [pathname, lang]);

  return null;
}
