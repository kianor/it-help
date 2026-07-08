"use client";

import { useState } from "react";

/**
 * Interactieve voor/na-vergelijker: sleep de schuif (werkt ook met toetsenbord
 * en touch, via een onzichtbare range-input over de foto).
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
  sliderLabel,
  alt,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
  sliderLabel: string;
  alt: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-square w-full select-none overflow-hidden rounded-lg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={afterSrc} alt={`${afterLabel}: ${alt}`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={beforeSrc} alt={`${beforeLabel}: ${alt}`} className="h-full w-full object-cover" loading="lazy" />
      </div>

      {/* Schuiflijn + greep */}
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_6px_rgba(0,0,0,0.5)]" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-ink/80 font-mono text-xs font-bold text-white">
          ⇄
        </span>
      </div>

      <span className="pointer-events-none absolute left-2 top-2 rounded bg-ink/75 px-2 py-0.5 font-mono text-xs font-bold uppercase text-white">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-2 top-2 rounded bg-signal/90 px-2 py-0.5 font-mono text-xs font-bold uppercase text-white">
        {afterLabel}
      </span>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={sliderLabel}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
