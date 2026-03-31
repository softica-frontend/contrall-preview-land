import { GLASS_SHADOW } from "@/components/ui/shadows";

/** Exact glass card style from Figma */
export const GLASS_BG = {
  background:
    "radial-gradient(50% 50% at 50% 50%, rgba(252,252,253,0) 0%, rgba(37,117,255,0.10) 100%), rgba(252,252,253,0.30)",
  backgroundBlendMode: "screen, screen",
  boxShadow: GLASS_SHADOW,
} as const;
