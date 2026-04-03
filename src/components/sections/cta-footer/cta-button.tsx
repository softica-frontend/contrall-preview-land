"use client";

import { useRef, useState } from "react";
import { GlassOverlay } from "@/components/ui/glass-overlay";
import { CTA_BUTTON_GLASS_BG as BUTTON_GLASS_BG } from "@/components/ui/shadows";
import { useRouter } from "@/i18n/navigation";

interface CtaButtonProps {
  label: string;
}

export function CtaButton({ label }: CtaButtonProps) {
  const router = useRouter();
  const [sliding, setSliding] = useState(false);
  const trackRef = useRef<HTMLButtonElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  const handleClick = () => {
    if (sliding) return;

    const track = trackRef.current;
    const pill = pillRef.current;
    if (!track || !pill) return;

    const trackWidth = track.clientWidth;
    const pillWidth = pill.clientWidth;
    const padding = window.innerWidth >= 768 ? 8 : 4;
    const offset = trackWidth - pillWidth - padding * 2;

    pill.style.transform = `translateX(${offset}px)`;
    setSliding(true);

    setTimeout(() => {
      router.push("/auth/register");
    }, 1100);
  };

  return (
    <button
      type="button"
      ref={trackRef}
      onClick={handleClick}
      className="relative flex w-full items-center overflow-hidden rounded-[100px] p-[4px] md:p-[8px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2575ff] focus-visible:ring-offset-2"
    >
      <GlassOverlay
        gradientSvg={BUTTON_GLASS_BG}
        insetShadow="inset -0.5px -1px 1px 0px rgba(37,117,255,0.8), inset 0.5px 1px 1px 0px rgba(37,117,255,0.8)"
      />
      <span
        ref={pillRef}
        className="relative inline-flex h-[44px] items-center justify-center rounded-[1000px] bg-primary px-[24px] text-[14px] font-medium leading-none tracking-[0.5px] text-surface transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:h-auto md:px-[54px] md:py-[24px] md:text-[32px] md:leading-[1.1] md:tracking-normal hover:bg-primary-hover active:bg-primary-active"
      >
        {label}
      </span>
    </button>
  );
}
