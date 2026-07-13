import type { Config } from "tailwindcss";

/**
 * Alle kleuren lopen via semantische CSS custom properties (zie globals.css).
 * Licht is de standaard (:root, geen JS nodig); html.game activeert het
 * donkere thema. Extra thema's = één extra CSS-blok dat de variabelen
 * herdefinieert, geen refactor.
 *
 * De merknamen (paper/ink/...) blijven bestaan als alias op de semantische
 * tokens zodat bestaande markup blijft werken; nieuwe code mag de
 * semantische namen (surface, panel, accent, ...) gebruiken.
 */
const token = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const semantic = {
  page: token("--c-page"), //        pagina-achtergrond
  surface: token("--c-surface"), //  kaarten en formulieren
  foreground: token("--c-text"), //  primaire tekst
  muted: token("--c-text-muted"), // bijschriften (AA op page én surface)
  link: token("--c-link"), //        links en secundaire acties
  accent: token("--c-accent"), //         decoratief oranje (grote/vette tekst)
  "accent-strong": token("--c-accent-strong"), // AA-variant voor kleine tekst en knoppen
  "accent-soft": token("--c-accent-soft"), //     accent óp panel/donkere vlakken
  panel: token("--c-panel"), //      omgekeerd (donker) vlak, in elk thema donker
};

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...semantic,
        // merk-aliassen (bestaande markup)
        paper: semantic.page,
        ink: semantic.foreground,
        cobalt: semantic.link,
        signal: semantic.accent,
        steel: semantic.muted,
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        reveal: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        reveal: "reveal 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
