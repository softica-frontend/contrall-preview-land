/** Shared box-shadow & SVG-gradient constants used across sections. */

/* ── Glass inset shadows ─────────────────────────────────────────── */

/** Thin blue inset glow (0.8 opacity) — hero glass cards, integration cards */
export const GLASS_SHADOW =
  "inset -0.5px -1px 1px rgba(37,117,255,0.8), inset 0.5px 1px 1px rgba(37,117,255,0.8)";

/** Thin blue inset glow (0.2 opacity) — pricing card border */
export const GLASS_SHADOW_S =
  "inset -0.5px -1px 1px rgba(37,117,255,0.2), inset 0.5px 1px 1px rgba(37,117,255,0.2)";

/** Thick blue inset glow (0.8 opacity) — pricing popular card, about-product cards */
export const GLASS_SHADOW_M =
  "inset -1px -2px 1px rgba(37,117,255,0.8), inset 1px 2px 1px rgba(37,117,255,0.8)";

/* ── Drop shadows ────────────────────────────────────────────────── */

/** Large card shadow — about-stats desktop photo cards */
export const CARD_SHADOW_XL =
  "0px 0px 6px 4px rgba(33,59,120,0.08), 8px 12px 16px 0px rgba(12,17,29,0.15)";

/** Small card shadow — about-stats mobile photo cards */
export const CARD_SHADOW_SM =
  "1px 1px 3px 0px rgba(34,58,96,0.06), 3px 5px 6px 0px rgba(34,58,96,0.05), 6px 12px 8px 0px rgba(34,58,96,0.03), 11px 21px 10px 0px rgba(34,58,96,0.01), 17px 33px 10px 0px rgba(34,58,96,0)";

/* ── SVG radial-gradient backgrounds ─────────────────────────────── */

/** Pricing card glass gradient overlay */
export const CARD_GRADIENT_SVG =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 400 700' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='0.2'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='200' cy='350' r='350'><stop stop-color='rgba(252,252,253,0)' offset='0'/><stop stop-color='rgba(145,185,254,0.25)' offset='0.5'/><stop stop-color='rgba(91,151,255,0.375)' offset='0.75'/><stop stop-color='rgba(37,117,255,0.5)' offset='1'/></radialGradient></defs></svg>\")";

/** Pricing button glass gradient overlay */
export const BTN_GRADIENT_SVG =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 347 44' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='0.2'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='173.5' cy='22' r='174'><stop stop-color='rgba(252,252,253,0)' offset='0'/><stop stop-color='rgba(145,185,254,0.25)' offset='0.5'/><stop stop-color='rgba(91,151,255,0.375)' offset='0.75'/><stop stop-color='rgba(37,117,255,0.5)' offset='1'/></radialGradient></defs></svg>\")";

/** CTA footer card glass gradient overlay */
export const CTA_CARD_GLASS_BG = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 1280 629' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='0.2'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='640' cy='314' r='640'><stop stop-color='rgba(252,252,253,0)' offset='0'/><stop stop-color='rgba(145,185,254,0.25)' offset='0.5'/><stop stop-color='rgba(91,151,255,0.375)' offset='0.75'/><stop stop-color='rgba(37,117,255,0.5)' offset='1'/></radialGradient></defs></svg>")`;

/** CTA footer button glass gradient overlay */
export const CTA_BUTTON_GLASS_BG = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 1280 99' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='0.2'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='640' cy='50' r='640'><stop stop-color='rgba(252,252,253,0)' offset='0'/><stop stop-color='rgba(145,185,254,0.25)' offset='0.5'/><stop stop-color='rgba(91,151,255,0.375)' offset='0.75'/><stop stop-color='rgba(37,117,255,0.5)' offset='1'/></radialGradient></defs></svg>")`;
