export function PriceTag({
  price,
  accent = false,
}: {
  price: string;
  accent?: boolean;
}) {
  return (
    <span className={`price-tag ${accent ? "price-tag--accent" : ""}`}>{price}</span>
  );
}
