/**
 * WCAG AA contrast-verificatie voor het theming-systeem.
 * Leest de tokens uit src/app/globals.css en toetst elke gebruikte
 * voorgrond/achtergrond-combinatie in beide thema's.
 *
 *   node scripts/check-contrast.mjs      → exit 1 als een paar AA faalt
 */
import fs from "node:fs";

const css = fs.readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");

function tokens(block) {
  const match = css.match(block);
  if (!match) throw new Error("themablok niet gevonden");
  const vars = {};
  for (const m of match[1].matchAll(/--c-([\w-]+):\s*(\d+)\s+(\d+)\s+(\d+)/g)) {
    vars[m[1]] = [Number(m[2]), Number(m[3]), Number(m[4])];
  }
  return vars;
}

const light = tokens(/:root\s*{([^}]+)}/);
const dark = tokens(/html\.game\s*{([^}]+)}/);

function luminance([r, g, b]) {
  const chan = (v) => {
    v /= 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * chan(r) + 0.7152 * chan(g) + 0.0722 * chan(b);
}

function ratio(fg, bg) {
  const [l1, l2] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return (l1 + 0.05) / (l2 + 0.05);
}

const WHITE = [255, 255, 255];

// [omschrijving, voorgrond, achtergrond, minimum]
// 4.5 = normale tekst, 3.0 = grote/vette tekst en UI-componenten
const pairs = (t) => [
  ["tekst op pagina", t.text, t.page, 4.5],
  ["tekst op kaart", t.text, t.surface, 4.5],
  ["gedempte tekst op pagina", t["text-muted"], t.page, 4.5],
  ["gedempte tekst op kaart", t["text-muted"], t.surface, 4.5],
  ["link op pagina", t.link, t.page, 4.5],
  ["link op kaart", t.link, t.surface, 4.5],
  ["accent-strong op pagina (prijzen, labels)", t["accent-strong"], t.page, 4.5],
  ["accent-strong op kaart", t["accent-strong"], t.surface, 4.5],
  ["accent-soft op panel (banner-label, kickers)", t["accent-soft"], t.panel, 4.5],
  ["wit op panel (CTA-vlakken)", WHITE, t.panel, 4.5],
  ["decoratief accent op pagina (grote koppen, ≥3:1)", t.accent, t.page, 3.0],
];

// knoptekst: wit in licht thema, panel-donker in game-modus (zie .btn-primary)
const buttonPairs = [
  ["knoptekst (wit) op accent-strong — licht", WHITE, light["accent-strong"], 4.5],
  ["knoptekst (panel) op accent-strong — game", dark.panel, dark["accent-strong"], 4.5],
];

let failed = 0;
for (const [themeName, t] of [["licht", light], ["game (donker)", dark]]) {
  console.log(`\nThema: ${themeName}`);
  for (const [label, fg, bg, min] of pairs(t)) {
    const r = ratio(fg, bg);
    const ok = r >= min;
    if (!ok) failed++;
    console.log(`  ${ok ? "✓" : "✗ FAAL"}  ${r.toFixed(2)}:1 (min ${min})  ${label}`);
  }
}
console.log("\nKnoppen:");
for (const [label, fg, bg, min] of buttonPairs) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`  ${ok ? "✓" : "✗ FAAL"}  ${r.toFixed(2)}:1 (min ${min})  ${label}`);
}

if (failed > 0) {
  console.error(`\n${failed} contrastpaar/-paren onder WCAG AA.`);
  process.exit(1);
}
console.log("\nAlle paren voldoen aan WCAG AA.");
