"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface PricingSliderProps {
  children: React.ReactNode[];
}

export function PricingSlider({ children }: PricingSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = children.length;

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.scrollWidth / total;
    const idx = Math.round(scrollLeft / cardWidth);
    setActive(Math.min(idx, total - 1));
  }, [total]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / total;
    el.scrollTo({ left: cardWidth * idx, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {/* Scrollable cards */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-[16px] overflow-x-auto pb-[8px]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children.map((child, i) => (
          <div
            key={`slide-${i}`}
            className="w-[85vw] max-w-[340px] shrink-0 snap-center first:ml-[16px] last:mr-[16px] md:max-w-[400px]"
          >
            {child}
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="mt-[16px] flex items-center justify-center gap-[8px]">
        {Array.from({ length: total }).map((_, i) => (
          <button
            type="button"
            key={`dot-${i}`}
            onClick={() => scrollTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-[8px] rounded-full transition-all duration-300 hover:opacity-70 ${
              active === i ? "w-[24px] bg-[#2575ff]" : "w-[8px] bg-[#d0d5dd]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
