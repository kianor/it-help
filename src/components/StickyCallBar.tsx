import { site } from "@/config/site";
import { PhoneIcon, WhatsAppIcon } from "./CtaButtons";

/** Vaste bel/WhatsApp-balk onderaan op mobiel — de 40+-doelgroep belt liever. */
export function StickyCallBar({ callMe }: { callMe: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-ink/10 bg-ink/10 md:hidden">
      <a
        href={`tel:${site.phone}`}
        className="flex items-center justify-center gap-2 bg-signal py-3.5 font-semibold text-white"
      >
        <PhoneIcon />
        {callMe}
      </a>
      <a
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-[#25D366] py-3.5 font-semibold text-white"
      >
        <WhatsAppIcon />
        WhatsApp
      </a>
    </div>
  );
}
