import { PriceTag } from "./PriceTag";

export type ServiceGroupData = {
  slug: string;
  title: string;
  services: { name: string; price: string; note?: string }[];
  footnote?: string;
};

export function ServiceList({ group, accent = false }: { group: ServiceGroupData; accent?: boolean }) {
  return (
    <div>
      <ul className="divide-y divide-ink/10 rounded-xl border border-ink/10 bg-white">
        {group.services.map((s) => (
          <li
            key={s.name}
            className="price-tag-hover flex flex-col gap-2 p-4 transition-colors hover:bg-cobalt/[0.03] sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            <div>
              <p className="font-semibold">{s.name}</p>
              {s.note && <p className="mt-0.5 text-sm text-steel">{s.note}</p>}
            </div>
            <div className="shrink-0">
              <PriceTag price={s.price} accent={accent || s.price === "€0" || s.price === "0 €"} />
            </div>
          </li>
        ))}
      </ul>
      {group.footnote && (
        <p className="mt-3 rounded-lg bg-cobalt/5 px-4 py-3 text-sm text-ink/80">
          {group.footnote}
        </p>
      )}
    </div>
  );
}
