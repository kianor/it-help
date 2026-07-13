import { getSetting } from "@/lib/db";
import { getSite } from "@/lib/site-config";
import { saveSiteSettingsAction } from "../../actions";
import { TestMailButton } from "./TestMailButton";

export const dynamic = "force-dynamic";

/**
 * Alle zaakgegevens op één plek, zonder code aan te raken. Elke wijziging
 * ververst meteen de hele publieke site (knoppen, footer, mails, JSON-LD).
 */
export default function AdminSettingsPage() {
  const cfg = getSite();
  const value = (key: string) => getSetting(key)?.trim() || "";

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold">Instellingen</h1>
      <p className="mt-1 text-sm text-muted">
        Wijzigingen staan meteen live op de site, in de mails en op de afgiftebonnen.
      </p>

      <form action={saveSiteSettingsAction} className="mt-6 space-y-6">
        <Section title="Contactgegevens" intro="Deze staan in de belknoppen, de footer, de mails en de QR-bonnen.">
          <Field label="Telefoon zoals getoond" name="site_phone_display" defaultValue={value("site_phone_display")} placeholder={cfg.phoneDisplay} hint="Bv. 0470 12 34 56" />
          <Field label="Telefoon internationaal (voor de belknop)" name="site_phone" defaultValue={value("site_phone")} placeholder={cfg.phone} hint="Formaat +32..., zonder spaties" mono />
          <Field label="WhatsApp-nummer" name="site_whatsapp" defaultValue={value("site_whatsapp")} placeholder={cfg.whatsapp} hint="Zonder + of spaties, bv. 32470123456" mono />
          <Field label="Zakelijk e-mailadres (zichtbaar voor klanten)" name="site_email" defaultValue={value("site_email")} placeholder={cfg.email} type="email" />
          <Field label="KBO-nummer" name="site_kbo" defaultValue={value("site_kbo")} placeholder="1234.567.890" hint="Verplicht in de footer vóór livegang" mono />
        </Section>

        <Section title="Reviews & vindbaarheid">
          <Field label="Google Business-reviewlink" name="site_google_reviews" defaultValue={value("site_google_reviews")} placeholder="https://g.page/r/..." type="url" hint="Wordt gebruikt in de review-verzoekmails en de footer" />
          <Field label="Trustpilot-pagina" name="site_trustpilot" defaultValue={value("site_trustpilot")} placeholder="https://be.trustpilot.com/review/ritsit.be" type="url" hint="Toont de 'lees alle reviews'-links op de homepagina" />
        </Section>

        <Section title="Social media" intro="Lege velden worden nergens getoond.">
          <Field label="Instagram" name="site_instagram" defaultValue={value("site_instagram")} placeholder="https://instagram.com/ritsit" type="url" />
          <Field label="TikTok" name="site_tiktok" defaultValue={value("site_tiktok")} placeholder="https://tiktok.com/@ritsit" type="url" />
          <Field label="YouTube" name="site_youtube" defaultValue={value("site_youtube")} placeholder="https://youtube.com/@ritsit" type="url" />
          <Field label="Facebook" name="site_facebook" defaultValue={value("site_facebook")} placeholder="https://facebook.com/ritsit" type="url" />
        </Section>

        <Section title="Video's op de homepagina" intro="YouTube-links (ook Shorts), één per lijn; de eerste drie verschijnen in 'Volg de werkbank'.">
          <textarea
            className="input min-h-24 font-mono text-xs"
            name="social_videos"
            placeholder={"https://www.youtube.com/watch?v=...\nhttps://youtube.com/shorts/..."}
            defaultValue={value("social_videos")}
          />
        </Section>

        <Section title="Mail-instellingen" intro="De Resend API-key zelf blijft veilig in .env op de server; hier stel je de adressen in.">
          <Field label="Mails naar jou (aanvragen en afspraakverzoeken)" name="mail_to" defaultValue={value("mail_to")} placeholder={cfg.mailTo || "kiano.rits@gmail.com"} type="email" />
          <Field label="Afzender van klantmails" name="mail_from" defaultValue={value("mail_from")} placeholder={cfg.mailFrom || "RitsIT <noreply@ritsit.be>"} hint="Formaat: Naam <adres@domein.be> — domein moet geverifieerd zijn in Resend" />
          <div className="pt-1">
            <p className="mb-2 text-xs text-muted">
              Resend-status:{" "}
              {process.env.RESEND_API_KEY ? (
                <span className="font-semibold text-link">API-key aanwezig ✓</span>
              ) : (
                <span className="font-semibold text-accent-strong">geen API-key in .env — mails worden alleen gelogd</span>
              )}
            </p>
          </div>
        </Section>

        <button type="submit" className="btn-primary">Alles opslaan</button>
      </form>

      <div className="mt-6 rounded-xl border border-ink/10 bg-surface p-5">
        <h2 className="font-bold">Mailconfiguratie testen</h2>
        <p className="mb-3 mt-1 text-sm text-muted">
          Stuurt een testmail via exact dezelfde route als echte contactaanvragen.
        </p>
        <TestMailButton />
      </div>

      <div className="mt-6 rounded-xl border border-ink/10 bg-surface p-5 text-sm">
        <h2 className="font-bold">Waar staat de rest?</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground/80">
          <li>Kortingsacties en de teller: tabblad <strong>Acties</strong></li>
          <li>Openingsuren en geblokkeerde dagen voor afspraken: tabblad <strong>Afspraken</strong>, onderaan</li>
          <li>Admin-wachtwoord en geheime sleutels: <code className="rounded bg-page px-1.5 py-0.5 font-mono text-xs">.env</code> op de server (bewust niet via de browser aanpasbaar)</li>
          <li>Teksten, prijzen en diensten per taal: <code className="rounded bg-page px-1.5 py-0.5 font-mono text-xs">src/i18n/nl.ts</code>, <code className="rounded bg-page px-1.5 py-0.5 font-mono text-xs">en.ts</code>, <code className="rounded bg-page px-1.5 py-0.5 font-mono text-xs">fr.ts</code></li>
        </ul>
      </div>
    </div>
  );
}

function Section({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-ink/10 bg-surface p-5">
      <h2 className="font-bold">{title}</h2>
      {intro && <p className="mt-1 text-sm text-muted">{intro}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  hint,
  type = "text",
  mono = false,
}: {
  label: string;
  name: string;
  defaultValue: string;
  placeholder?: string;
  hint?: string;
  type?: string;
  mono?: boolean;
}) {
  return (
    <div>
      <label className="label" htmlFor={name}>{label}</label>
      <input
        className={`input ${mono ? "font-mono" : ""}`}
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        maxLength={300}
      />
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
