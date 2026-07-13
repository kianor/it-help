import { getSite } from "@/lib/site-config";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

export function CallButton({
  label,
  className = "btn-primary",
}: {
  label: string;
  className?: string;
}) {
  return (
    <a href={`tel:${getSite().phone}`} data-track="cta_call_click" className={className}>
      <PhoneIcon />
      {label}
    </a>
  );
}

export function WhatsAppButton({
  label,
  className = "btn-secondary",
}: {
  label: string;
  className?: string;
}) {
  return (
    <a
      href={`https://wa.me/${getSite().whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      data-track="cta_whatsapp_click"
      className={className}
    >
      <WhatsAppIcon />
      {label}
    </a>
  );
}
