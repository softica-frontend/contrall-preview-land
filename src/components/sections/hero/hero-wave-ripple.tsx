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
  const svgRef = useRef<SVGSVGElement | null>(null);
  const ringsRef = useRef<SVGPathElement[] | null>(null);
  const revealAnimsRef = useRef<Animation[]>([]);
  const busy = useRef(false);

  /* ── Mount: cache ring refs, run reveal ── */
  useEffect(() => {
    const svg = containerRef.current?.querySelector("svg");
    if (!svg || ringsRef.current) return;
    svgRef.current = svg;

    const ringPaths = Array.from(
      svg.querySelectorAll<SVGPathElement>('path[fill="#FCFCFD"]'),
    );
    const total = ringPaths.length;
    if (total === 0) return;

    ringsRef.current = ringPaths;

    // ── Reveal: fade in ring paths only (overlays stay visible) ──
    const DELAY_PER_RING = 25;
    const DURATION = 400;
    const BASE_DELAY = 500;
    const anims: Animation[] = [];

    busy.current = true;

    for (let i = 0; i < total; i++) {
      const ring = ringPaths[i];
      ring.style.opacity = "0";

      const reverseIdx = total - 1 - i;
      const delay = BASE_DELAY + reverseIdx * DELAY_PER_RING;

      const anim = ring.animate([{ opacity: "0" }, { opacity: "1" }], {
        duration: DURATION,
        delay,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        fill: "forwards",
      });
      anims.push(anim);
    }

    revealAnimsRef.current = anims;

    // Cleanup after all reveals finish
    const lastDelay = BASE_DELAY + (total - 1) * DELAY_PER_RING;
    const timeout = setTimeout(
      () => {
        for (const ring of ringPaths) ring.style.opacity = "";
        for (const a of revealAnimsRef.current) a.cancel();
        revealAnimsRef.current = [];
        busy.current = false;
      },
      lastDelay + DURATION + 50,
    );

    return () => clearTimeout(timeout);
  }, []);

  /* ── Click ripple: single scale on SVG + staggered opacity on rings ── */
  const ripple = useCallback((onDone: () => void) => {
    const rings = ringsRef.current;
    const svg = svgRef.current;
    if (busy.current || !rings || !svg) {
      onDone();
      return;
    }

    busy.current = true;
    const total = rings.length;

    // Single scale pulse on entire SVG (1 transform instead of 18)
    svg.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.015)", offset: 0.4 },
        { transform: "scale(1)" },
      ],
      {
        duration: 600,
        easing: "cubic-bezier(0, 0, 0.2, 1)",
        fill: "none",
      },
    );

    // Staggered opacity pulse per ring (cheap — no transform)
    for (let i = 0; i < total; i++) {
      const ring = rings[i];

      const anim = ring.animate(
        [{ opacity: "1" }, { opacity: "0.35", offset: 0.4 }, { opacity: "1" }],
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
