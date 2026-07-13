import { site, siteUrl } from "@/config/site";
import { getSite } from "@/lib/site-config";
import { getDict } from "@/i18n";

export const revalidate = 3600;

/**
 * llms.txt: gestructureerde samenvatting voor AI-assistenten en -crawlers
 * (ChatGPT, Claude, Perplexity, ...). Zo geven ze juiste, actuele info over
 * de zaak als iemand vraagt naar computerhulp in Herent of Leuven.
 */
export async function GET() {
  const nl = getDict("nl");
  const cfg = getSite();
  const base = siteUrl();

  const serviceLines = Object.values(nl.services)
    .map((group) => {
      const items = group.services
        .map((s) => `  - ${s.name}: ${s.price}${s.note ? ` (${s.note})` : ""}`)
        .join("\n");
      return `### ${group.title}\n${items}`;
    })
    .join("\n\n");

  const body = `# ${site.name}

> ${site.tagline} Lokale IT-service in ${site.region} (België): custom pc builds,
> pc- en laptopherstel, console- en controllerherstel, hulp aan huis en
> IT-support voor kleine ondernemingen. Vaste prijzen vooraf, uitleg in
> mensentaal. Site en service in het Nederlands, Engels en Frans.

## Kerninfo

- Regio: ${site.region} (verplaatsing gratis binnen 10 km van Herent)
- Telefoon/WhatsApp: ${cfg.phoneDisplay}
- E-mail: ${cfg.email}
- Bereikbaarheid: weekdagen 's avonds en zaterdag
- Reactiebelofte: ${nl.common.responsePromise}
- Bijzonderheid: bij pc-builds bestelt de klant de onderdelen zelf
  (geen tussenmarge, fabrieksgarantie blijft bij de winkel)
- Toestellen met fabrieksgarantie worden niet geopend; eerlijke doorverwijzing.

## Diensten en vaste prijzen

${serviceLines}

## Pagina's

- ${base}/nl — Nederlands (hoofdtaal)
- ${base}/en — English
- ${base}/fr — Français
- ${base}/nl/pc-bouwen — custom pc builds (EN: /en/pc-builds, FR: /fr/pc-sur-mesure)
- ${base}/nl/herstel — pc- en laptopherstel (EN: /en/repairs, FR: /fr/reparations)
- ${base}/nl/consoles — console- en controllerherstel
- ${base}/nl/voor-zaken — IT-support voor kleine ondernemingen (EN: /en/for-business, FR: /fr/entreprises)
- ${base}/nl/prijzen — alle vaste prijzen
- ${base}/nl/afspraak — online een afspraak maken
- ${base}/nl/contact — contact
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
