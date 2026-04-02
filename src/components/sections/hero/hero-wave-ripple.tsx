"use client";

import { useCallback, useEffect, useRef } from "react";
import { WaveBackground } from "./wave-bg";

let rippleFn: ((onDone: () => void) => void) | null = null;
export function triggerRipple(onDone: () => void) {
  if (rippleFn) {
    rippleFn(onDone);
  } else {
    onDone();
  }
}

export function HeroWaveRipple() {
  const ref = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<SVGPathElement[] | null>(null);
  const busy = useRef(false);

  const getRings = useCallback(() => {
    if (ringsRef.current) return ringsRef.current;
    const svg = ref.current?.querySelector("svg");
    if (!svg) return null;
    const rings = Array.from(
      svg.querySelectorAll<SVGPathElement>('path[fill="#FCFCFD"]'),
    ).slice(-14);
    if (rings.length === 0) return null;
    ringsRef.current = rings;
    return rings;
  }, []);

  useEffect(() => {
    getRings();
  }, [getRings]);

  const ripple = useCallback(
    (onDone: () => void) => {
      const rings = getRings();
      if (busy.current || !rings) {
        onDone();
        return;
      }

      busy.current = true;
      const cachedRings = rings;
      const total = cachedRings.length;
      const DURATION = 500;
      const STAGGER = 40;
      const start = performance.now();
      const totalTime = (total - 1) * STAGGER + DURATION;

      function tick(now: number) {
        const elapsed = now - start;
        let allDone = true;

        for (let i = 0; i < total; i++) {
          const delay = (total - 1 - i) * STAGGER;
          const t = (elapsed - delay) / DURATION;

          if (t < 0) {
            allDone = false;
            continue;
          }

          if (t >= 1) {
            cachedRings[i].removeAttribute("transform");
            cachedRings[i].style.opacity = "";
            continue;
          }

          allDone = false;
          const eased = easeOutCubic(t);

          // Keyframe: 0→0.4 ramp up, 0.4→1 ramp down
          let scaleFactor: number;
          let opacity: number;
          if (eased <= 0.4) {
            const p = eased / 0.4;
            scaleFactor = 1 + 0.03 * p;
            opacity = 1 - 0.55 * p;
          } else {
            const p = (eased - 0.4) / 0.6;
            scaleFactor = 1.03 - 0.03 * p;
            opacity = 0.45 + 0.55 * p;
          }

          // SVG transform attribute — operates in viewBox coordinates, no subpixel jank
          cachedRings[i].setAttribute(
            "transform",
            `translate(864 720) scale(${scaleFactor}) translate(-864 -720)`,
          );
          cachedRings[i].style.opacity = String(opacity);
        }

        if (allDone || elapsed >= totalTime + 50) {
          // Final cleanup
          for (const ring of cachedRings) {
            ring.removeAttribute("transform");
            ring.style.opacity = "";
          }
          busy.current = false;
          onDone();
        } else {
          requestAnimationFrame(tick);
        }
      }

      requestAnimationFrame(tick);
    },
    [getRings],
  );

  useEffect(() => {
    rippleFn = ripple;
    return () => {
      rippleFn = null;
    };
  }, [ripple]);

  return (
    <div ref={ref} className="contents">
      <WaveBackground />
    </div>
  );
}

/** cubic-bezier(0, 0, 0.2, 1) approximation — strong ease-out */
function easeOutCubic(t: number): number {
  return 1 - (1 - t) * (1 - t) * (1 - t);
}
