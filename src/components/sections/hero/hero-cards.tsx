"use client";

import { useEffect, useRef } from "react";

/**
 * Animates hero cards when user scrolls down to them.
 * Uses IntersectionObserver — cards stay invisible until threshold is met.
 * Each card slides in from its side with staggered timing via WAAPI.
 */
export function HeroCards({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cards = el.querySelectorAll<HTMLElement>("[data-hero-card]");
    if (cards.length === 0) return;

    // Ref survives Fast Refresh — don't re-hide already-animated cards
    if (triggered.current) return;

    // Hide cards immediately
    for (const card of cards) card.style.opacity = "0";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered.current) return;
        triggered.current = true;
        observer.disconnect();
        animateCards(cards);
      },
      { threshold: 1, rootMargin: "0px 0px 0px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id="hero-cards"
      className="relative mx-auto -mt-[349px] h-[686px] w-full max-w-[1440px]"
    >
      {children}
    </div>
  );
}

function animateCards(cards: NodeListOf<HTMLElement>) {
  const DURATION = 900;
  const STAGGER = 90;

  cards.forEach((card) => {
    const order = Number(card.dataset.cardOrder ?? 0);
    const side = card.dataset.cardSide ?? "center";
    const slideX = side === "left" ? -50 : side === "right" ? 50 : 0;

    const anim = card.animate(
      [
        { opacity: "0", translate: `${slideX}px 40px`, scale: "0.92" },
        { opacity: "1", translate: "0 0", scale: "1" },
      ],
      {
        duration: DURATION,
        delay: order * STAGGER,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        fill: "forwards",
      },
    );

    anim.onfinish = () => {
      card.style.opacity = "";
      anim.cancel();
    };
  });
}
