/** Whitelist van meetbare events — zie docs/TRACKING.md voor het meetplan. */
export const EVENT_NAMES = [
  "nav_click",
  "footer_click",
  "promo_banner_click",
  "cta_call_click",
  "cta_whatsapp_click",
  "language_switch",
  "game_mode_toggle",
  "scroll_depth",
  "copy_code",
  "calculator_use",
  "calculator_cta_click",
  "appointment_day_select",
  "appointment_slot_select",
  "appointment_request",
  "contact_submit",
  "newsletter_subscribe",
  "login_link_request",
  "video_play",
  "before_after_drag",
  "konami_unlock",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];
