import type { Metadata } from "next";
import Link from "next/link";
import { consoles } from "@/config/services";
import { ServiceList } from "@/components/ServiceList";
import { CallButton } from "@/components/CtaButtons";
import { listGallery } from "@/lib/db";

export const metadata: Metadata = {
  title: "PlayStation of controller herstellen Leuven",
  description:
    "Console reinigen, Joy-Con drift herstellen, controller deep clean of ouderlijk toezicht instellen. Vaste prijzen, vaak dezelfde dag klaar. Herent en Leuven.",
};

export const dynamic = "force-dynamic";

export default function ConsolesPage() {
  const gallery = listGallery();

  return (
    <div className="mx-auto max-w-6xl px-4 pt-14">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold">Consoles & controllers</h1>
        <p className="mt-4 text-lg text-ink/80">
          Blaast je PlayStation als een straaljager? Drift je Joy-Con? Plakt je
          controller nog van dat ene glas cola? Ik maak consoles vanbinnen weer
          proper en stil en herstel controllers. Vaste prijzen, vaak dezelfde
          dag klaar.
        </p>
      </div>

      <div className="mt-10">
        <ServiceList group={consoles} />
      </div>

      {gallery.length > 0 && (
        <section className="pt-16">
          <h2 className="text-2xl font-bold">Voor en na</h2>
          <p className="mt-2 max-w-2xl text-ink/80">
            Echte toestellen van echte klanten. Zo komt je console binnen, en zo
            gaat hij weer buiten.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {gallery.map((item) => (
              <figure key={item.id} className="rounded-xl border border-ink/10 bg-white p-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="label">Voor</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/api/uploads/${item.before_file}`}
                      alt={`Voor: ${item.title}`}
                      className="aspect-square w-full rounded-lg object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="label">Na</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/api/uploads/${item.after_file}`}
                      alt={`Na: ${item.title}`}
                      className="aspect-square w-full rounded-lg object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <figcaption className="mt-3 font-semibold">{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="pt-16">
        <div className="rounded-2xl border border-ink/10 bg-white p-8">
          <h2 className="text-2xl font-bold">Voor ouders</h2>
          <p className="mt-3 max-w-2xl text-ink/80">
            Wil je schermtijd en aankopen op de console van je kinderen onder
            controle? Ik stel ouderlijk toezicht in op console, telefoon en
            wifi, en leg je uit hoe je het daarna zelf beheert.
          </p>
          <p className="mt-4">
            <span className="price-tag price-tag--accent">€49</span>
          </p>
        </div>
      </section>

      <section className="pt-16">
        <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-cobalt/5 p-8">
          <div className="flex-1">
            <h2 className="text-xl font-bold">Console of controller kapot?</h2>
            <p className="mt-1 text-ink/80">App me een foto of filmpje van het probleem, dan weet je meteen de vaste prijs.</p>
          </div>
          <div className="flex gap-3">
            <CallButton />
            <Link href="/contact" className="btn-secondary">Stuur een bericht</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
