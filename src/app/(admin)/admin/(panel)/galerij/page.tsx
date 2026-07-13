import { listGallery } from "@/lib/db";
import { addGalleryAction, deleteGalleryAction } from "../../actions";

export const dynamic = "force-dynamic";

export default function AdminGalleryPage() {
  const items = listGallery();

  return (
    <div>
      <h1 className="text-2xl font-bold">Voor/na-galerij</h1>
      <p className="mt-1 text-sm text-steel">
        Deze foto&apos;s verschijnen op de consolepagina. Perfect voor je
        social media-materiaal: film het uitkuisen, en zet hier de before/after.
        Vraag de klant altijd even toestemming.
      </p>

      <form action={addGalleryAction} className="mt-6 grid gap-4 rounded-xl border border-ink/10 bg-surface p-5 sm:grid-cols-3">
        <div className="sm:col-span-3">
          <label className="label" htmlFor="title">Titel *</label>
          <input className="input" id="title" name="title" required maxLength={120} placeholder="PS4 na 6 jaar zonder schoonmaak" />
        </div>
        <div>
          <label className="label" htmlFor="before">Foto vóór *</label>
          <input className="input" id="before" name="before" type="file" accept="image/jpeg,image/png,image/webp" required />
        </div>
        <div>
          <label className="label" htmlFor="after">Foto na *</label>
          <input className="input" id="after" name="after" type="file" accept="image/jpeg,image/png,image/webp" required />
        </div>
        <div className="self-end">
          <button type="submit" className="btn-primary w-full">Toevoegen</button>
        </div>
      </form>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-ink/10 bg-surface p-4">
            <div className="grid grid-cols-2 gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/api/uploads/${item.before_file}`} alt={`Voor: ${item.title}`} className="aspect-square w-full rounded-lg object-cover" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/api/uploads/${item.after_file}`} alt={`Na: ${item.title}`} className="aspect-square w-full rounded-lg object-cover" />
            </div>
            <p className="mt-2 font-semibold">{item.title}</p>
            <form action={deleteGalleryAction} className="mt-2">
              <input type="hidden" name="id" value={item.id} />
              <button type="submit" className="text-sm text-accent-strong underline">Verwijderen</button>
            </form>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-steel">Nog geen foto&apos;s.</p>}
      </div>
    </div>
  );
}
