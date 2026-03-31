// Glass gradient SVG generator
export function glassGradient(w: number, h: number): string {
  const cx = Math.round(w / 2);
  const cy = Math.round(h / 2);
  const r = Math.round(Math.max(w, h) * 0.75);
  return `url("data:image/svg+xml;utf8,<svg viewBox='0 0 ${w} ${h}' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='0.2'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='${cx}' cy='${cy}' r='${r}'><stop stop-color='rgba(252,252,253,0)' offset='0'/><stop stop-color='rgba(145,185,254,0.25)' offset='0.5'/><stop stop-color='rgba(91,151,255,0.375)' offset='0.75'/><stop stop-color='rgba(37,117,255,0.5)' offset='1'/></radialGradient></defs></svg>")`;
}

// Desktop card positions
export const DESKTOP_CARDS = [
  {
    id: "counter",
    left: "calc(50% - 571px)",
    bottom: "-222px",
    width: 300,
    height: 302,
    rotate: -10.08,
    skewX: -10.08,
    scaleY: 0.98,
  },
  {
    id: "migration",
    left: "calc(50% - 208px)",
    bottom: "-165px",
    width: 400,
    height: 302,
    rotate: -5.08,
    skewX: -5.08,
    scaleY: 1,
  },
  {
    id: "video",
    left: "calc(50% + 207px)",
    bottom: "-165px",
    width: 400,
    height: 302,
    rotate: 5.08,
    skewX: 5.08,
    scaleY: 1,
  },
  {
    id: "pricing",
    left: "calc(50% + 572px)",
    bottom: "-222px",
    width: 300,
    height: 302,
    rotate: 10.08,
    skewX: 10.08,
    scaleY: 0.98,
  },
  {
    id: "placeholder-l",
    left: "calc(50% - 878px)",
    bottom: "-335px",
    width: 302,
    height: 302,
    rotate: -19.57,
    skewX: -19.57,
    scaleY: 0.94,
  },
  {
    id: "placeholder-r",
    left: "calc(50% + 878px)",
    bottom: "-335px",
    width: 302,
    height: 302,
    rotate: 19.57,
    skewX: 19.57,
    scaleY: 0.94,
  },
] as const;

// Migration logo avatars
export const MIGRATION_AVATARS = [
  { bg: "#fcfcfd", color: "#667085", label: "···" },
  { bg: "#ff4438", color: "#fcfcfd", label: "C" },
  { bg: "#fcfcfd", color: "#27AE60", label: "K" },
  { bg: "#fcfcfd", color: "#F59E0B", label: "B" },
] as const;
