# RitsIT — website

*Ritsvlug hersteld.* Website voor de IT-service in bijberoep (Herent/Leuven):
custom pc builds, pc- en laptopherstel, console care en IT-support voor
kleine zaken. Gebouwd volgens de briefing in mensentaal, met vaste prijzen
als signatuur. Volledig drietalig: Nederlands, Engels en Frans.

## Wat zit erin

**Publieke site (NL/EN/FR via /nl, /en, /fr — automatische taaldetectie)**
- 7 pagina's: home, `/pc-bouwen`, `/herstel`, `/consoles`, `/voor-zaken`, `/prijzen`, `/contact`
- `/volg` — klanten volgen hun herstelling live met een volgcode (zoals een pakje)
- `/privacy` en `/voorwaarden` — GDPR-conform, in mensentaal, in drie talen
- Launch-actie-balk: -50% voor de eerste 5 klanten in ruil voor een eerlijke
  Google-review, met live teller
- Voor/na-galerij met interactieve sleep-slider op de consolepagina
- Game-modus: opt-in donker thema via de gamepad-knop; theming loopt volledig
  via semantische CSS custom properties (WCAG AA in beide thema's, geverifieerd
  met `node scripts/check-contrast.mjs`; extra thema = één CSS-blok)
- RGB-glow op de gamer-blokken + Konami-code easter egg (↑↑↓↓←→←→BA = €5 korting)
- Nieuwsbrief met dubbele opt-in
- `/afspraak` — eigen afsprakensysteem: klant kiest een vrij slot, jij bevestigt
  met één klik (openingsuren instelbaar in het admin-paneel)
- `/account` — klantaccounts met magic-link login (geen wachtwoorden): eigen
  herstellingen volgen, afspraken zien, nieuwsbrief beheren
- Prijscalculator op de pc-bouwen-pagina (budget + gebruik + resolutie → pakket)
- Reviews-sectie gevoed vanuit het admin-paneel (Trustpilot/Google) met
  AggregateRating-schema; video-sectie met YouTube-embeds
- Vertaalde URL's per taal (bv. `/en/pc-builds`, `/fr/pc-sur-mesure`)
- Sticky bel/WhatsApp-balk op mobiel, SEO (meta's per taal, hreflang-alternates,
  JSON-LD LocalBusiness + FAQPage, sitemap, robots)
- GEO/AI-vindbaarheid: `/llms.txt` + expliciete toelating voor GPTBot, ClaudeBot,
  PerplexityBot en co in robots.txt

**Admin-paneel** (`/admin`, alleen voor Kiano)
- Aanvragen uit het contactformulier, met nieuw/behandeld
- Afspraken bevestigen/annuleren + beschikbaarheid en geblokkeerde dagen instellen
- Herstellingen: aanmaken (klant krijgt volgcode + mail in zijn taal), status
  bijwerken mét foto (automatische mail per stap), review-verzoek met één klik,
  printbare afgiftebon met QR-code
- Voor/na-galerij beheren (foto's uploaden, interactieve slider op de site)
- Reviews toevoegen/publiceren (bron Trustpilot/Google)
- Nieuwsbrief opstellen en versturen per taalgroep, met uitschrijflinks
- Acties beheren (meerdere kortingsacties, teller, drie talen)
- Statistieken: bezoekers per dag, uniek, toppagina's, verwijzers, taal, toestel
  (privacyvriendelijk: geen cookies, dagelijks wisselende hash)

**Automatische mails** (via Resend, in de taal van de klant)
- Bevestiging naar de klant na een contactaanvraag + melding naar jou
- Volgcode-mail bij het aanmaken van een herstelling
- Statusupdate-mail bij elke stap
- Review-verzoek na afronding (handmatig triggeren vanuit admin)
- Nieuwsbrief-bevestigingsmail (dubbele opt-in)

**Metingen** (zie `docs/TRACKING.md` voor het volledige meetplan)
- Cookievrije pageview- én event-tracking (navigatie, CTA's, scroll-diepte,
  calculator, afspraken, video's) in admin → Statistieken
- Optionele GA4-koppeling: zet `NEXT_PUBLIC_GA4_ID`, dan verschijnt een
  consent-banner en laadt gtag pas na toestemming (Consent Mode)

**Beveiliging**
- Admin achter wachtwoord + ondertekende sessiecookie (7 dagen), middleware-guard
- Security headers: CSP, HSTS, X-Frame-Options, X-Content-Type-Options,
  Referrer-Policy, Permissions-Policy
- Honeypot + rate limiting op alle formulieren (spam krijgt nep-succes)
- Zod-validatie op alle input, geen trackingcookies (dus geen cookiebanner nodig)
- Volgcodes zijn cryptografisch willekeurig en niet te raden

## Lokaal draaien

```bash
npm install
cp .env.example .env    # vul minstens ADMIN_PASSWORD in
npm run dev             # http://localhost:3000
```

Productie:

```bash
npm run build
npm start
```

## Omgevingsvariabelen (.env)

| Variabele | Verplicht | Uitleg |
|---|---|---|
| `ADMIN_PASSWORD` | ja | Wachtwoord voor `/admin`. Kies een lang, uniek wachtwoord. |
| `AUTH_SECRET` | ja (productie) | Sessiesleutel. Genereer: `openssl rand -hex 32` |
| `RESEND_API_KEY` | nee | Zonder key werkt alles, maar gaan er geen mails uit. |
| `MAIL_FROM` | nee | Afzender, bv. `Werkbank <noreply@jouwdomein.be>` (domein verifiëren in Resend). |
| `MAIL_TO` | nee | Jouw mailbox voor nieuwe aanvragen. |
| `SITE_URL` | ja (productie) | Bv. `https://jouwdomein.be` (voor links in mails, sitemap, SEO). |
| `DATA_DIR` | nee | Map voor database en uploads (standaard `./data`). |

## Hosten op eigen server

Node 20+ vereist (better-sqlite3 + Next.js). Kort:

```bash
npm ci && npm run build
# start met een procesmanager, bv. pm2:
pm2 start npm --name werkbank -- start
```

Zet er een reverse proxy met HTTPS voor (nginx/Caddy). Belangrijk:
- Maak een back-up van de map `data/` (database + foto's), bv. dagelijks.
- `DATA_DIR` mag buiten de projectmap staan zodat deploys je data niet raken.

## Alles aanpassen op één plek

- **Naam, telefoon, e-mail, KBO, socials, Google-reviewslink:** `src/config/site.ts`
- **Alle teksten, diensten en prijzen per taal:** `src/i18n/nl.ts`, `src/i18n/en.ts`, `src/i18n/fr.ts`
- **Mailteksten:** `src/lib/mail.ts`
- **Launch-actie:** via het admin-paneel, Instellingen

## Vóór livegang invullen (checklist uit de briefing)

1. Definitieve bedrijfsnaam + domeinnaam → `src/config/site.ts`
2. Telefoonnummer (tel + WhatsApp) → `src/config/site.ts`
2b. Domeinnaam checken (ritsit.be) en registreren
3. Zakelijk e-mailadres op eigen domein → `src/config/site.ts` en Resend
4. KBO-nummer (na Acerta) → `src/config/site.ts` (site pas live mét KBO + BA-verzekering)
5. 3 à 5 echte foto's van builds/werkplek → galerij of pagina's
6. Algemene voorwaarden laten nalezen (UNIZO/Acerta-model) → `src/app/voorwaarden/page.tsx`
7. Google Business Profile aanmaken → link in `src/config/site.ts`
8. Trustpilot-profiel aanmaken → link in `src/config/site.ts`

## Fase 2 (voorzien, nog niet gebouwd)

- Stick drift herstel & Hall-effect upgrade op de consolepagina (na soldeer-fase)
- Echte Google-reviews in de reviews-sectie
- Cal.com-embed voor afspraken zodra het volume dat vraagt
- Nieuwsbrief-campagnes rechtstreeks vanuit het admin-paneel
