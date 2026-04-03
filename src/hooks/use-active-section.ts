"use client";

import { useEffect, useRef, useState } from "react";

const NAV_IDS = [
  "product",
  "integrations",
  "pricing",
  "about",
  "contacts",
] as const;

export type NavId = (typeof NAV_IDS)[number];

export { NAV_IDS };

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>(NAV_IDS[0]);
  const sectionEls = useRef<Map<string, HTMLElement>>(new Map());
  const ticking = useRef(false);

  useEffect(() => {
    const map = new Map<string, HTMLElement>();
    for (const id of NAV_IDS) {
      const el = document.getElementById(id);
      if (el) map.set(id, el);
    }
    sectionEls.current = map;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        let closest: string | null = null;
        let closestDist = Infinity;

        sectionEls.current.forEach((el, id) => {
          const top = el.getBoundingClientRect().top - 100;
          if (top <= 0 && -top < closestDist) {
            closestDist = -top;
            closest = id;
          }
        });

        if (closest) {
          const next = closest;
          setActiveSection((prev) => (prev === next ? prev : next));
        }

        ticking.current = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return activeSection;
}
