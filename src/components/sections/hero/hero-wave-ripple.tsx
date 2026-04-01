"use client";

import { useCallback, useEffect, useRef } from "react";
import { WaveBackground } from "./wave-bg";

/**
 * Module-level ripple trigger — direct function call, no DOM events.
 * CtrlKey imports `triggerRipple` and calls it on click.
 */
let rippleFn: ((onDone: () => void) => void) | null = null;
export function triggerRipple(onDone: () => void) {
  if (rippleFn) {
    rippleFn(onDone);
  } else {
    onDone();
  }
}

/**
 * Wrapper around WaveBackground with two animations:
 * 1. Reveal on mount — ring paths fade in from center outward
 * 2. Ripple on Ctrl click — ring paths pulse (opacity only, no scale)
 *
 * Performance notes:
 * - Only ring paths animated (18), overlay paths stay visible
 * - Ripple uses opacity-only (no transform) to avoid SVG repaint
 * - Ring refs cached at mount, transformOrigin not needed (no scale)
 */
export function HeroWaveRipple() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<SVGPathElement[] | null>(null);
  const busy = useRef(false);

  /* ── Mount: cache ring refs, run reveal ── */
  useEffect(() => {
    const svg = containerRef.current?.querySelector("svg");
    if (!svg || ringsRef.current) return;

    const ringPaths = Array.from(
      svg.querySelectorAll<SVGPathElement>('path[fill="#FCFCFD"]'),
    );
    const total = ringPaths.length;
    if (total === 0) return;

    // No transformOrigin needed — opacity-only animation avoids subpixel jank
    ringsRef.current = ringPaths;

    // No reveal animation — rings visible immediately
  }, []);

  /* ── Click ripple: per-ring scale+opacity (original visual) ── */
  const ripple = useCallback((onDone: () => void) => {
    const rings = ringsRef.current;
    if (busy.current || !rings) {
      onDone();
      return;
    }

    busy.current = true;
    const total = rings.length;

    for (let i = 0; i < total; i++) {
      const ring = rings[i];

      const anim = ring.animate(
        [{ opacity: "1" }, { opacity: "0.4", offset: 0.4 }, { opacity: "1" }],
        {
          duration: 500,
          delay: (total - 1 - i) * 40,
          easing: "cubic-bezier(0, 0, 0.2, 1)",
          fill: "none",
        },
      );

      if (i === 0) {
        anim.onfinish = () => {
          busy.current = false;
          onDone();
        };
      }
    }
  }, []);

  /* ── Register/unregister module-level trigger ── */
  useEffect(() => {
    rippleFn = ripple;
    return () => {
      rippleFn = null;
    };
  }, [ripple]);

  return (
    <div ref={containerRef} className="contents">
      <WaveBackground />
    </div>
  );
}
