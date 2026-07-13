import localFont from "next/font/local";

/**
 * Fonts via next/font in plaats van CSS-@imports: Next preload't de woff2's
 * in de <head> (geen late discovery), genereert een passende fallback-font
 * (minder verspringing bij font-swap) en er gaan alleen nog latin-subsets
 * over de lijn. De bestanden komen uit de al geïnstalleerde
 * @fontsource-packages, dus blijven zelf-gehost (geen Google Fonts CDN).
 */
export const displayFont = localFont({
  src: "../../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2",
  weight: "200 800",
  display: "swap",
  variable: "--font-display",
});

export const bodyFont = localFont({
  src: "../../node_modules/@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2",
  weight: "400 700",
  display: "swap",
  variable: "--font-body",
});

export const monoFont = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2",
      weight: "400",
    },
    {
      path: "../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2",
      weight: "700",
    },
  ],
  display: "swap",
  variable: "--font-mono",
});

export const fontClasses = `${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`;
