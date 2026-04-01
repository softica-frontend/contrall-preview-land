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
 * 1. Reveal on mount — rings fade in from center outward
 * 2. Ripple on Ctrl click — rings pulse outward
 *
 * No DOM mutations — animates existing paths directly.
 * Ring refs cached at mount for zero querySelectorAll on click.
 */
export function HeroWaveRipple() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<SVGPathElement[] | null>(null);
  const overlayGroupsRef = useRef<SVGPathElement[][] | null>(null);
  const revealAnimsRef = useRef<Animation[]>([]);
  const busy = useRef(false);

  /* ── Mount: cache ring refs, pre-set transformOrigin, run reveal ── */
  useEffect(() => {
    const svg = containerRef.current?.querySelector("svg");
    if (!svg || ringsRef.current) return;

    const ringPaths = Array.from(
      svg.querySelectorAll<SVGPathElement>('path[fill="#FCFCFD"]'),
    );
    const total = ringPaths.length;
    if (total === 0) return;

    // Cache ring paths and their overlay siblings separately
    const overlayGroups: SVGPathElement[][] = [];
    for (const ring of ringPaths) {
      ring.style.transformOrigin = "864px 720px";
      overlayGroups.push(getSiblingOverlays(ring));
    }
    ringsRef.current = ringPaths;
    overlayGroupsRef.current = overlayGroups;

    // ── Reveal: fade in rings + overlays from center outward ──
    const DELAY_PER_RING = 25;
    const DURATION = 400;
    const BASE_DELAY = 500;
    const anims: Animation[] = [];

    busy.current = true;

    for (let i = 0; i < total; i++) {
      const ring = ringPaths[i];
      const overlays = overlayGroups[i];
      const allPaths = [ring, ...overlays];

      const reverseIdx = total - 1 - i;
      const delay = BASE_DELAY + reverseIdx * DELAY_PER_RING;

      for (const p of allPaths) {
        p.style.opacity = "0";
        const anim = p.animate([{ opacity: "0" }, { opacity: "1" }], {
          duration: DURATION,
          delay,
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          fill: "forwards",
        });
        anims.push(anim);
      }
    }

    revealAnimsRef.current = anims;

    // Cleanup after last ring finishes (index 0 has highest delay)
    const lastDelay = BASE_DELAY + (total - 1) * DELAY_PER_RING;
    const cleanupTime = lastDelay + DURATION + 50;
    const timeout = setTimeout(() => {
      for (const ring of ringPaths) ring.style.opacity = "";
      for (const group of overlayGroups) {
        for (const p of group) p.style.opacity = "";
      }
      for (const a of revealAnimsRef.current) a.cancel();
      revealAnimsRef.current = [];
      busy.current = false;
    }, cleanupTime);

    return () => clearTimeout(timeout);
  }, []);

  /* ── Click ripple: WAAPI on cached ring paths ── */
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
        [
          { transform: "scale(1)", opacity: "1" },
          { transform: "scale(1.03)", opacity: "0.45", offset: 0.4 },
          { transform: "scale(1)", opacity: "1" },
        ],
        {
          duration: 500,
          delay: (total - 1 - i) * 40,
          easing: "cubic-bezier(0, 0, 0.2, 1)",
          fill: "none",
        },
      );

      // Single onfinish on the last-to-finish ring (index 0, highest delay)
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

/** Get the next sibling paths that are gradient overlays for a ring */
function getSiblingOverlays(ring: SVGPathElement): SVGPathElement[] {
  const result: SVGPathElement[] = [];
  let el = ring.nextElementSibling;
  while (
    el instanceof SVGPathElement &&
    el.getAttribute("fill") !== "#FCFCFD"
  ) {
    result.push(el);
    el = el.nextElementSibling;
  }
  return result;
}
