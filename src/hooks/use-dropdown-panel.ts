import { useEffect, useState } from "react";

const CLOSE_ANIMATION_MS = 150;

/**
 * Manages the three-state lifecycle for animated dropdown panels:
 * - `panelMounted`  — controls whether the panel is in the DOM (portal/conditional render)
 * - `panelVisible`  — drives the CSS animation class (open = animate-in, close = animate-out)
 *
 * On open:  mount immediately → single rAF → set visible (triggers animate-in)
 * On close: set invisible (triggers animate-out) → unmount after animation finishes
 */
export function useDropdownPanel() {
  const [open, setOpen] = useState(false);
  const [panelMounted, setPanelMounted] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setPanelMounted(true);
      const raf = requestAnimationFrame(() => setPanelVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setPanelVisible(false);
    const timer = setTimeout(() => setPanelMounted(false), CLOSE_ANIMATION_MS);
    return () => clearTimeout(timer);
  }, [open]);

  return { open, setOpen, panelMounted, panelVisible };
}
