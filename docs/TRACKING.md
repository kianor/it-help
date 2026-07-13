# Meetplan RitsIT — referentie

Dit document beschrijft **elk event** dat de site meet, hoe het getriggerd
wordt en hoe de optionele Google Analytics 4-koppeling werkt. Eventnamen
volgen de GA4-conventies: `snake_case`, maximaal 40 tekens, parameters als
losse velden (`event_label`, `value`).

## Architectuur in één alinea

Alle events lopen via één functie: `track(name, {label, value})` in
`src/lib/analytics.ts`. Die stuurt het event **altijd** naar de eigen
cookievrije statistieken (`/api/event` → SQLite, dagelijkse niet-herleidbare
bezoekershash, 90 dagen retentie, zichtbaar in admin → Statistieken) en
**alleen ná consent** door naar GA4. GA4 staat volledig uit zolang
`NEXT_PUBLIC_GA4_ID` niet in `.env` staat: geen banner, geen Google-request,
geen CSP-uitzondering. Met ID gezet verschijnt een consent-banner
(drietalig); pas na "aanvaarden" laadt `gtag.js` (Consent Mode: alleen
`analytics_storage`, advertentie-opslag blijft geweigerd, `anonymize_ip`).
Klik-events lopen via één gedelegeerde listener
(`src/components/AnalyticsListener.tsx`) op `data-track`-attributen, zodat
bestaande componenten niet aangepast hoefden te worden.

## GA4 activeren

1. Maak een GA4-property en web-datastream aan → kopieer het measurement-ID (`G-XXXXXXX`).
2. Zet in `.env`: `NEXT_PUBLIC_GA4_ID=G-XXXXXXX`
3. `npm run build && pm2 restart ritsit` (het ID en de CSP worden bij build ingebakken).

## Events

### Navigatie

| Event | Trigger | label | value |
|---|---|---|---|
| `nav_click` | klik op een header-navigatielink, het account-icoon of een dienstblok op de homepagina | linktekst of paginanaam | — |
| `footer_click` | klik op een footerlink | linktekst | — |
| `promo_banner_click` | klik op de actie-balk bovenaan | bannertekst | — |
| `language_switch` | klik op NL/EN/FR in de header | doeltaal | — |

### Conversie-CTA's

| Event | Trigger | label | value |
|---|---|---|---|
| `cta_call_click` | klik op eender welke "Bel of app me"-knop of de sticky belbalk | `header`/`sticky` of knoptekst | — |
| `cta_whatsapp_click` | klik op een WhatsApp-knop of de sticky balk | `sticky` of knoptekst | — |
| `contact_submit` | contactformulier succesvol verstuurd | — | — |
| `appointment_request` | afspraakverzoek succesvol verstuurd | — | — |
| `newsletter_subscribe` | nieuwsbriefinschrijving verstuurd (vóór dubbele opt-in) | — | — |
| `login_link_request` | magic-link aangevraagd op /account | — | — |

### Interactie & engagement

| Event | Trigger | label | value |
|---|---|---|---|
| `scroll_depth` | 25/50/75/100% gescrold op pagina's langer dan 1,5× viewport; elke drempel max. 1× per weergave | pad | 25/50/75/100 |
| `calculator_use` | pc-calculator aangepast (debounced, 1,2 s rust) | `resolutie/gebruik-index` | budget in € |
| `calculator_cta_click` | klik op "Bespreek dit voorstel" in de calculator | — | — |
| `appointment_day_select` | dag gekozen in de afspraak-picker | datum | — |
| `appointment_slot_select` | uur gekozen in de afspraak-picker | slot | — |
| `video_play` | klik op play bij een YouTube-facade | video-ID | — |
| `before_after_drag` | eerste interactie met een voor/na-slider | titel galerij-item | — |
| `copy_code` | volgcode gekopieerd op de volg-pagina | `volgcode` | — |
| `game_mode_toggle` | game-modus aan/uit | `on`/`off` | — |
| `konami_unlock` | Konami-code ingevoerd | — | — |

## Afwijkingen t.o.v. de oorspronkelijke vraag

- **"Copy-to-clipboard op code samples"** — de site heeft geen code samples;
  het dichtstbijzijnde equivalent is de volgcode op de trackingpagina, die
  wordt gemeten als `copy_code`.
- **"Filter- en zoekinteracties op component listings"** — er zijn geen
  listings met filters of zoek; de interactieve equivalenten (pc-calculator
  en afspraak-picker) worden op dezelfde granulariteit gemeten.
- **GA4 niet hard ingebakken** — de site is bewust cookievrij (geen banner
  nodig, zo staat het ook in de privacyverklaring). GA4 zonder consent zou
  GDPR/ePrivacy schenden; daarom is het opt-in via env-var + consent-banner,
  en meten de eigen statistieken altijd al hetzelfde, cookievrij.

## Nieuw event toevoegen

1. Naam toevoegen aan de whitelist in `src/lib/events.ts`.
2. `track("mijn_event", { label, value })` aanroepen, of `data-track="mijn_event"`
   (+ optioneel `data-track-label`) op een klikbaar element zetten.
3. Verschijnt automatisch in admin → Statistieken en (na consent) in GA4.
