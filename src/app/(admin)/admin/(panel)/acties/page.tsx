import { listPromos } from "@/lib/db";
import { deletePromoAction, savePromoAction2 } from "../../actions";

export const dynamic = "force-dynamic";

export default function AdminPromosPage() {
  const promos = listPromos();

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold">Acties</h1>
      <p className="mt-1 text-sm text-steel">
        De bovenste actieve actie verschijnt als balk op de site, in de juiste taal.
        Teller leeg laten = actie zonder beperkt aantal plekken. Nieuwe klant geholpen?
        Zet &quot;gebruikt&quot; één hoger; vol is vol en de balk verdwijnt vanzelf.
      </p>

      <details className="mt-6 rounded-xl border border-ink/10 bg-white p-5" open={promos.length === 0}>
        <summary className="cursor-pointer font-bold text-cobalt">+ Nieuwe actie</summary>
        <PromoForm />
      </details>

      <div className="mt-8 space-y-4">
        {promos.map((promo) => (
          <details key={promo.id} className={`rounded-xl border bg-white p-5 ${promo.active ? "border-signal/50" : "border-ink/10 opacity-60"}`}>
            <summary className="cursor-pointer">
              <span className="font-semibold">{promo.text_nl}</span>{" "}
              <span className="font-mono text-xs text-steel">
                {promo.active ? "actief" : "uit"}
                {promo.total != null && ` · ${promo.used}/${promo.total} gebruikt`}
              </span>
            </summary>
            <PromoForm promo={promo} />
            <form action={deletePromoAction} className="mt-2">
              <input type="hidden" name="id" value={promo.id} />
              <button type="submit" className="text-sm text-signal underline">Verwijder deze actie</button>
            </form>
          </details>
        ))}
      </div>
    </div>
  );
}

function PromoForm({
  promo,
}: {
  promo?: { id: number; text_nl: string; text_en: string; text_fr: string; active: number; total: number | null; used: number };
}) {
  return (
    <form action={savePromoAction2} className="mt-4 space-y-3">
      {promo && <input type="hidden" name="id" value={promo.id} />}
      <div>
        <label className="label">Tekst NL *</label>
        <input className="input" name="text_nl" required maxLength={160} defaultValue={promo?.text_nl || ""} placeholder="-20% op laptop-onderhoud tijdens de examens." />
      </div>
      <div>
        <label className="label">Tekst EN *</label>
        <input className="input" name="text_en" required maxLength={160} defaultValue={promo?.text_en || ""} />
      </div>
      <div>
        <label className="label">Tekst FR *</label>
        <input className="input" name="text_fr" required maxLength={160} defaultValue={promo?.text_fr || ""} />
      </div>
      <div className="flex flex-wrap items-end gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="active" defaultChecked={promo ? promo.active === 1 : true} className="h-5 w-5 accent-signal" />
          <span className="font-medium">Actief</span>
        </label>
        <div>
          <label className="label">Aantal plekken (leeg = onbeperkt)</label>
          <input className="input w-32 font-mono" name="total" type="number" min={0} defaultValue={promo?.total ?? ""} />
        </div>
        <div>
          <label className="label">Al gebruikt</label>
          <input className="input w-32 font-mono" name="used" type="number" min={0} defaultValue={promo?.used ?? 0} />
        </div>
        <button type="submit" className="btn-primary">Opslaan</button>
      </div>
    </form>
  );
}
