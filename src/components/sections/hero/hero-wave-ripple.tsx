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
 * 1. Reveal on mount — ring groups fade in from center outward (opacity on <g>)
 * 2. Ripple on Ctrl click — ring paths only pulse outward (scale+opacity on path)
 *
 * <g> groups used for reveal (18 opacity anims instead of ~50).
 * Ripple targets ring paths directly to match original visual (overlays stay still).
 */
export function HeroWaveRipple() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const groupsRef = useRef<SVGGElement[] | null>(null);
  const ringsRef = useRef<SVGPathElement[] | null>(null);
  const revealAnimsRef = useRef<Animation[] | null>(null);
  const busy = useRef(false);

  /* ── Mount: wrap rings in <g>, cache refs, run reveal ── */
  useEffect(() => {
    const svg = containerRef.current?.querySelector("svg");
    if (!svg || groupsRef.current) return;
    svgRef.current = svg;

    const ringPaths = Array.from(
      svg.querySelectorAll<SVGPathElement>('path[fill="#FCFCFD"]'),
    );
    const total = ringPaths.length;
    if (total === 0) return;

    // Wrap each ring + its gradient overlay siblings into a <g> for reveal
    const groups: SVGGElement[] = [];
    for (const ring of ringPaths) {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      const siblings = [ring, ...getSiblingOverlays(ring)];
      ring.parentNode?.insertBefore(g, ring);
      for (const p of siblings) g.appendChild(p);
      groups.push(g);
    }
    groupsRef.current = groups;

    // Cache ring paths separately and pre-set transformOrigin for ripple
    for (const ring of ringPaths) {
      ring.style.transformOrigin = "864px 720px";
    }
    ringsRef.current = ringPaths;

    // ── Reveal: fade in <g> groups from center outward ──
    const DELAY_PER_RING = 25;
    const DURATION = 400;
    const BASE_DELAY = 500;

    busy.current = true;
    const revealAnims: Animation[] = [];

    for (let i = 0; i < groups.length; i++) {
      const g = groups[i];
      g.style.opacity = "0";

      const reverseIdx = total - 1 - i;
      const delay = BASE_DELAY + reverseIdx * DELAY_PER_RING;

      const anim = g.animate([{ opacity: "0" }, { opacity: "1" }], {
        duration: DURATION,
        delay,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        fill: "forwards",
      });
      revealAnims.push(anim);

      // Track finish on the first group (highest delay = last to finish)
      if (i === 0) {
        anim.onfinish = () => {
          for (const group of groups) group.style.opacity = "";
          for (const a of revealAnims) a.cancel();
          revealAnimsRef.current = null;
          busy.current = false;
        };
      }
    }
    revealAnimsRef.current = revealAnims;
  }, []);

  /* ── Click ripple: WAAPI on cached ring paths (not <g> groups) ── */
  const ripple = useCallback((onDone: () => void) => {
    const rings = ringsRef.current;
    if (busy.current || !rings) {
      onDone();
      return;
    }

    busy.current = true;
    const total = rings.length;

    // Enable GPU compositing on SVG container (1 write instead of 18)
    const svg = svgRef.current;
    if (svg) svg.style.willChange = "contents";

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
          if (svg) svg.style.willChange = "";
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
