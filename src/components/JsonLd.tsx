/**
 * Rendert één schema.org-object als <script type="application/ld+json">.
 * Server component; centraliseert het (voorheen herhaalde) dangerouslySet-
 * patroon zodat alle structured data via één, geteste weg de pagina op komt.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
