import { getPromo, getSetting } from "@/lib/db";
import { savePromoAction } from "../../actions";

export const dynamic = "force-dynamic";

export default function AdminSettingsPage() {
  const promo = getPromo();

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold">Instellingen</h1>

      <div className="mt-6 rounded-xl border border-ink/10 bg-white p-5">
        <h2 className="font-bold">Launch-actie: -50% voor de eerste klanten</h2>
        <p className="mt-1 text-sm text-steel">
          De balk bovenaan de site toont automatisch hoeveel plekken er nog
          vrij zijn. Nieuwe klant geholpen? Zet de teller één hoger. Vol of
          uitzetten? Dat kan hier ook.
        </p>
        <form action={savePromoAction} className="mt-4 space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="active"
              defaultChecked={getRawActive()}
              className="h-5 w-5 accent-signal"
            />
            <span className="font-medium">Actie is actief</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="total">Totaal aantal plekken</label>
              <input className="input font-mono" id="total" name="total" type="number" min={0} defaultValue={promo.total} />
            </div>
            <div>
              <label className="label" htmlFor="used">Al gebruikt</label>
              <input className="input font-mono" id="used" name="used" type="number" min={0} defaultValue={promo.used} />
            </div>
          </div>
          <p className="text-sm">
            Nu op de site: <strong className="font-mono">{promo.left}</strong>{" "}
            {promo.left === 1 ? "plek" : "plekken"} vrij
            {promo.active ? "" : " (balk staat uit)"}
          </p>
          <button type="submit" className="btn-primary">Opslaan</button>
        </form>
      </div>

      <div className="mt-6 rounded-xl border border-ink/10 bg-white p-5 text-sm">
        <h2 className="font-bold">Vaste gegevens aanpassen</h2>
        <p className="mt-1 text-steel">
          Naam, telefoonnummer, e-mail, KBO-nummer en social media-links staan
          in <code className="rounded bg-paper px-1.5 py-0.5 font-mono text-xs">src/config/site.ts</code>.
          Prijzen en diensten in <code className="rounded bg-paper px-1.5 py-0.5 font-mono text-xs">src/config/services.ts</code>.
          Eén aanpassing daar en de hele site (inclusief mails en SEO) volgt.
        </p>
      </div>
    </div>
  );
}

function getRawActive(): boolean {
  return getSetting("promo_active") === "1";
}
