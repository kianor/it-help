import { getSite } from "@/lib/site-config";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

/** Vaste bel/WhatsApp-balk onderaan op mobiel — de 40+-doelgroep belt liever. */
export function StickyCallBar({ callMe }: { callMe: string }) {
  const cfg = getSite();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-ink/10 bg-ink/10 pb-[env(safe-area-inset-bottom)] md:hidden">
      <a
        href={`tel:${cfg.phone}`}
        data-track="cta_call_click"
        data-track-label="sticky"
        className="flex items-center justify-center gap-2 bg-accent-strong py-3.5 font-semibold text-white"
      >
        <PhoneIcon />
        {callMe}
      </a>
      <a
        href={`https://wa.me/${cfg.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        data-track="cta_whatsapp_click"
        data-track-label="sticky"
        className="flex items-center justify-center gap-2 bg-[#25D366] py-3.5 font-semibold text-[#0B3D2E]"
      >
        <WhatsAppIcon />
        WhatsApp
      </a>
    </div>
  );
}
