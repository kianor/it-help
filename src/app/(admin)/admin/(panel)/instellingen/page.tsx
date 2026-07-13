import { getSetting } from "@/lib/db";
import { saveVideosAction } from "../../actions";

export const dynamic = "force-dynamic";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold">Instellingen</h1>

      <div className="mt-6 rounded-xl border border-ink/10 bg-surface p-5">
        <h2 className="font-bold">Video&apos;s op de homepagina</h2>
        <p className="mt-1 text-sm text-steel">
          Plak hier YouTube-links (één per lijn, ook Shorts). De eerste drie
          verschijnen als video&apos;s in de sectie &quot;Volg de werkbank&quot;.
          TikTok/Instagram-profielen stel je in via{" "}
          <code className="rounded bg-paper px-1.5 py-0.5 font-mono text-xs">src/config/site.ts</code>.
        </p>
        <form action={saveVideosAction} className="mt-4 space-y-3">
          <textarea
            className="input min-h-28 font-mono text-xs"
            name="social_videos"
            placeholder={"https://www.youtube.com/watch?v=...\nhttps://youtube.com/shorts/..."}
            defaultValue={getSetting("social_videos") || ""}
          />
          <button type="submit" className="btn-primary">Opslaan</button>
        </form>
      </div>

      <div className="mt-6 rounded-xl border border-ink/10 bg-surface p-5 text-sm">
        <h2 className="font-bold">Waar staat de rest?</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-ink/80">
          <li>Launch-actie en kortingen: tabblad <strong>Acties</strong></li>
          <li>Openingsuren voor afspraken: tabblad <strong>Afspraken</strong>, onderaan</li>
          <li>Naam, telefoon, KBO, Trustpilot- en social-links: <code className="rounded bg-paper px-1.5 py-0.5 font-mono text-xs">src/config/site.ts</code></li>
          <li>Teksten, prijzen en diensten per taal: <code className="rounded bg-paper px-1.5 py-0.5 font-mono text-xs">src/i18n/nl.ts</code>, <code className="rounded bg-paper px-1.5 py-0.5 font-mono text-xs">en.ts</code>, <code className="rounded bg-paper px-1.5 py-0.5 font-mono text-xs">fr.ts</code></li>
        </ul>
      </div>
    </div>
  );
}
