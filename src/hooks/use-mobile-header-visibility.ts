"use client";

import { useEffect, useRef, useState } from "react";

export function useMobileHeaderVisibility(menuOpen: boolean) {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const isVisible = y < 10 || y < lastY.current;
        setVisible((prev) => (prev === isVisible ? prev : isVisible));
        lastY.current = y;
        ticking.current = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return visible || menuOpen;
}
