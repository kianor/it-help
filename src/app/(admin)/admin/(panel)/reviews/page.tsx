import { listReviews, reviewStats } from "@/lib/db";
import { addReviewAction, deleteReviewAction, toggleReviewAction } from "../../actions";

export const dynamic = "force-dynamic";

export default function AdminReviewsPage() {
  const reviews = listReviews();
  const stats = reviewStats();

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold">Reviews</h1>
      <p className="mt-1 text-sm text-steel">
        Zet hier reviews van Trustpilot of Google op de site (kopieer ze letterlijk, met naam).
        Gepubliceerde reviews verschijnen op de homepagina, met sterren-schema voor Google.
        Nu: {stats.count} gepubliceerd, gemiddeld {stats.avg}/5.
      </p>

      <form action={addReviewAction} className="mt-6 grid gap-4 rounded-xl border border-ink/10 bg-white p-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="author">Naam klant *</label>
          <input className="input" id="author" name="author" required maxLength={80} />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="label" htmlFor="rating">Sterren</label>
            <select className="input" id="rating" name="rating" defaultValue="5">
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{n} ★</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="label" htmlFor="source">Bron</label>
            <select className="input" id="source" name="source" defaultValue="Trustpilot">
              <option>Trustpilot</option>
              <option>Google</option>
              <option>Facebook</option>
            </select>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="text">Tekst *</label>
          <textarea className="input min-h-20" id="text" name="text" required maxLength={600} />
        </div>
        <div className="sm:col-span-2">
          <button type="submit" className="btn-primary">Toevoegen</button>
        </div>
      </form>

      <div className="mt-8 space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className={`rounded-xl border bg-white p-4 ${r.published ? "border-ink/10" : "border-ink/10 opacity-50"}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-bold">
                {r.author}{" "}
                <span className="font-mono text-signal">{"★".repeat(r.rating)}</span>{" "}
                <span className="text-xs font-normal text-steel">via {r.source}</span>
              </p>
              <div className="flex gap-3 text-sm">
                <form action={toggleReviewAction}>
                  <input type="hidden" name="id" value={r.id} />
                  <button type="submit" className="text-cobalt underline">
                    {r.published ? "Verberg" : "Publiceer"}
                  </button>
                </form>
                <form action={deleteReviewAction}>
                  <input type="hidden" name="id" value={r.id} />
                  <button type="submit" className="text-signal underline">Verwijder</button>
                </form>
              </div>
            </div>
            <p className="mt-2 text-sm text-ink/80">{r.text}</p>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-sm text-steel">Nog geen reviews.</p>}
      </div>
    </div>
  );
}
