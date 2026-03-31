"use client";

import { useCallback, useEffect, useRef } from "react";
import { WaveBackground } from "./wave-bg";

/** Custom event name dispatched by CtrlKey on click */
export const CTRL_RIPPLE_EVENT = "ctrl-ripple";

/**
 * Thin client wrapper around WaveBackground.
 * On mount — reveals rings one-by-one from center outward.
 * On CTRL_RIPPLE_EVENT — animates ring paths outward via WAAPI.
 */
export function HeroWaveRipple() {
  const ref = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const revealDone = useRef(false);

  const getRings = useCallback(() => {
    const svg = ref.current?.querySelector("svg");
    if (!svg) return null;
    const rings = svg.querySelectorAll<SVGPathElement>('path[fill="#FCFCFD"]');
    return rings.length > 0 ? rings : null;
  }, []);

  /* ── Initial reveal: rings appear from center outward, after key drop lands ── */
  useEffect(() => {
    if (revealDone.current || !ref.current) return;
    const rings = getRings();
    if (!rings) return;
    revealDone.current = true;

    const total = rings.length;
    const DELAY_PER_RING = 40;
    const DURATION = 600;
    // Start just before key-drop finishes (0.45s delay + 0.8s duration = 1.25s end)
    const BASE_DELAY = 700;

    // Collect all paths (ring + its gradient overlays) grouped per ring
    const groups: SVGPathElement[][] = [];
    rings.forEach((ring) => {
      groups.push([ring, ...getSiblingOverlays(ring)]);
    });

    // Hide everything instantly
    for (const paths of groups) {
      for (const p of paths) p.style.opacity = "0";
    }

    // Block ripple clicks until reveal is done
    busy.current = true;

    // Animate from center outward; commit styles on finish & clean up
    let finished = 0;
    const totalAnims = groups.length;

    groups.forEach((paths, i) => {
      const reverseIdx = total - 1 - i;
      const delay = BASE_DELAY + reverseIdx * DELAY_PER_RING;

      for (const p of paths) {
        const anim = p.animate([{ opacity: "0" }, { opacity: "1" }], {
          duration: DURATION,
          delay,
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          fill: "forwards",
        });

        // Only track finish on the ring path (first in group)
        if (p === paths[0]) {
          anim.onfinish = () => {
            // Commit final state to inline style & kill WAAPI animation
            for (const el of paths) {
              el.style.opacity = "";
              // biome-ignore lint/suspicious/useIterableCallbackReturn: need to clean
              el.getAnimations().forEach((a) => a.cancel());
            }
            finished++;
            if (finished === totalAnims) busy.current = false;
          };
        }
      }
    });
  }, [getRings]);

  /* ── Click ripple ── */
  const ripple = useCallback(() => {
    if (busy.current) return;
    const rings = getRings();
    if (!rings) return;

    busy.current = true;
    let done = 0;
    const total = rings.length;

    rings.forEach((ring, i) => {
      ring.style.transformOrigin = "864px 720px";

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

      anim.onfinish = () => {
        done++;
        if (done === total) busy.current = false;
      };
    });
  }, [getRings]);

  useEffect(() => {
    const handler = () => ripple();
    window.addEventListener(CTRL_RIPPLE_EVENT, handler);
    return () => window.removeEventListener(CTRL_RIPPLE_EVENT, handler);
  }, [ripple]);

  return (
    <div ref={ref} className="contents">
      <WaveBackground />
    </div>
  );
}

/** Get the next 1-2 sibling paths that are gradient overlays for a ring */
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
