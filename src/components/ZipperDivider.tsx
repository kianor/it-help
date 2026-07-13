/**
 * Merksignatuur-divider: een rits die dichtritst zodra hij in beeld scrolt
 * (RitsIT!). Puur decoratief en volledig CSS-gedreven; de animatie hangt aan
 * het site-brede data-reveal-systeem.
 */
export function ZipperDivider() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-20" aria-hidden="true">
      <div className="zipper" data-reveal>
        <span className="zipper-pull">
          <svg width="18" height="26" viewBox="0 0 18 26" fill="currentColor">
            <rect x="5" y="0" width="8" height="7" rx="2" />
            <path d="M3 8h12l-1.5 10a4.5 4.5 0 0 1-9 0z" />
            <circle cx="9" cy="15" r="2.4" fill="rgb(var(--c-page))" />
          </svg>
        </span>
      </div>
    </div>
  );
}
