# UX-review RitsIT — juli 2026

Review van interface en navigatie door drie onafhankelijke auditors
(performance, UX, SEO/structuur), waarna elke high-impact-bevinding
adversarieel is geverifieerd tegen de echte code. Gerangschikt op
**gebruikersimpact**, niet op bouwkost. Status: ✅ = gefixt in deze PR,
📋 = aanbeveling voor later.

## Hoog

1. ✅ **Actie-balk verscheen pas na JavaScript en duwde de pagina ~80px omlaag**
   *Probleem:* de balk werd client-side opgehaald en verscheen 1-3 s na de
   eerste paint, bóven de header. *Waarom erg:* de hero-CTA verschoof precies
   op het moment dat de bezoeker wil tikken (CLS ~0,1 op mobiel) — op een site
   die van bel-conversies leeft is dat de duurste pixelverschuiving denkbaar.
   *Fix:* balk wordt nu server-side gerenderd (0 shift, geen extra request);
   statische pagina's verversen elk uur én direct bij elke admin-wijziging.
   Bonus: sluitknop toegevoegd (keuze geldt per sessie).

2. ✅ **Afspraakformulier beloofde een mailbevestiging terwijl e-mail optioneel was**
   *Probleem:* succes-tekst zegt "Pas na de bevestiging per mail ligt de
   afspraak vast", maar wie geen e-mail invulde kreeg nooit een mail — en het
   succes-scherm herhaalde dag/uur niet. *Waarom erg:* de kernconversie
   eindigde voor telefoon-eerst-klanten (exact de 40+-doelgroep) in totale
   onzekerheid. *Fix:* e-mail is nu verplicht op het afspraakformulier (mét
   uitleg waarom), en het succes-scherm toont de gekozen dag en het uur.

3. ✅ **"Slot net ingenomen" was een doodlopende lus**
   *Probleem:* na een 409 bleef het (bezette) slot gewoon aanklikbaar staan.
   *Fix:* selectie wordt gewist en de sloten worden vers opgehaald
   (`router.refresh`), zodat het bezette slot verdwijnt.

## Midden

4. ✅ **"Volg je herstelling" en "Mijn RitsIT" onbereikbaar via mobiele navigatie**
   Stonden alleen in de footer (desktop-icoon voor account is `sm:`-verborgen).
   *Fix:* beide toegevoegd aan het mobiele menu.

5. ✅ **Header brak in het Frans op lg-schermen** — 7 nav-items + taalkeuze +
   twee iconen + CTA wrapten over twee regels. *Fix:* volledige navigatie
   vanaf `xl`, daaronder het menu — geen wrap meer in eender welke taal.

6. ✅ **Taalwissel gooide de querystring weg** — wie op de volg-pagina met
   `?code=RIT-…` van taal wisselde, verloor de volgcode. *Fix:* querystring
   wordt meegenomen bij het wisselen.

7. ✅ **Servervalidatie-fouten verschenen hardcoded Nederlands in de EN/FR-UI.**
   *Fix:* formulieren tonen nu altijd de gelokaliseerde foutmelding.

8. ✅ **Konami-popup (toetsenbord-feature!) had geen Escape en geen focus-management.**
   *Fix:* Escape sluit, focus springt naar de sluitknop.

9. ✅ **"Alle plekken bezet" op de afspraakpagina was een doodlopend eind.**
   *Fix:* bel-knop onder de melding.

10. 📋 **Betekenis van de game-modus-toggle is niet zelfverklarend.** Een
    gamepad-icoon zonder label; wie hem per ongeluk aanzet begrijpt niet wat
    er gebeurde. *Suggestie:* eerste keer een mini-tooltip ("Probeer de
    game-modus!") of het label naast het icoon tonen op ≥xl.

11. 📋 **Client- en servervalidatie lopen uiteen** — fouten verschijnen pas
    na submit als generieke banner. *Suggestie:* inline veldvalidatie bij blur
    (telefoonformaat, minimale berichtlengte) zodat de fout naast het veld
    staat in plaats van eronder.

## Laag

12. ✅ Sticky belbalk respecteert nu de iOS safe-area (home-indicator).
13. ✅ Placeholder-contrast van 3,1:1 naar 5,8:1 (vol `muted`).
14. ✅ Nieuwsbrief-toggle op de accountpagina zei "✕ Hou me op de hoogte" bij
    het uitschrijven; nu een expliciet "Schrijf me uit"-label.
15. ✅ Entrance-animatie op de dienstblokken versneld (kortere stagger).
16. ✅ Favicon toegevoegd (was een 404 voor elke nieuwe bezoeker).
17. 📋 **PC-calculator verliest zijn resultaat bij de doorklik naar contact.**
    *Suggestie:* budget/gebruik/resolutie als querystring meesturen en het
    berichtveld voorvullen ("Ik zoek een 1440p-game-pc rond €1200").
18. 📋 **Root-URL kost één redirect-roundtrip** (`/` → 308 → `/nl`).
    Inherent aan de taalstructuur; alleen oplosbaar door NL op `/` te serveren
    (grote refactor, twijfelachtige winst). Bewuste trade-off.
19. 📋 **Contact-pagina zou de afspraak-route mogen promoten** — wie het
    formulier ziet weet niet dat er ook een slot-picker bestaat. *Suggestie:*
    kaartje "Liever meteen een moment prikken? → Maak een afspraak" in de
    zijkolom.

## Door de audit expliciet goedgekeurd

- Sitemap-dekking is volledig; gelokaliseerde URL's kloppen exact met de
  rewrites; noindex-pagina's correct uitgesloten.
- Client-JS is lean (~96 kB first load, geen zware dependencies client-side).
- Contrast voldoet na de token-refactor aan WCAG AA (zie
  `scripts/check-contrast.mjs`), in beide thema's.
