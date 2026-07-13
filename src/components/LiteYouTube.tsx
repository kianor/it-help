"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

/**
 * Click-to-load YouTube-facade. Een echte YouTube-iframe laadt ±0,5 MB
 * third-party JS vóór er ook maar iets afgespeeld wordt; deze facade toont
 * alleen de thumbnail (~15 kB) en laadt de speler pas bij een klik.
 */
export function LiteYouTube({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);

  if (play) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        title={title}
        className="aspect-video w-full"
        allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setPlay(true);
        track("video_play", { label: id });
      }}
      className="group relative block aspect-video w-full"
      aria-label={`${title} — play`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-panel/20 transition group-hover:bg-panel/40">
        <span className="flex h-14 w-20 items-center justify-center rounded-xl bg-panel/80 transition group-hover:bg-accent-strong">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
