"use client";

export function PrintButton() {
  return (
    <button type="button" className="btn-primary mt-6 w-full print:hidden" onClick={() => window.print()}>
      Print deze bon
    </button>
  );
}
