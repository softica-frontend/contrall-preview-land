"use client";

import { PricingChartIcon } from "@/components/icons/pricing-icons";
import { GlassOverlay } from "@/components/ui/glass-overlay";
import {
  BTN_GRADIENT_SVG,
  CARD_GRADIENT_SVG,
  GLASS_SHADOW_M,
  GLASS_SHADOW_S,
} from "@/components/ui/shadows";
import { FeatureItem } from "./feature-item";

function GlassButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="relative z-[1] flex h-[44px] items-center justify-center overflow-hidden rounded-[1000px] text-[16px] font-medium tracking-[0.5px] text-[#2575ff] transition-colors hover:bg-[#2575ff] hover:text-white active:bg-[#1a5acc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2575ff] focus-visible:ring-offset-2"
    >
      <GlassOverlay
        gradientSvg={BTN_GRADIENT_SVG}
        insetShadow={GLASS_SHADOW_S}
      />
      <span className="relative">{label}</span>
    </a>
  );
}

function SolidButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="relative z-[1] flex h-[44px] items-center justify-center rounded-[1000px] bg-[#2575ff] text-[16px] font-medium tracking-[0.5px] text-[#fcfcfd] transition-colors hover:bg-[#1a63e0] active:bg-[#1a5acc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2575ff] focus-visible:ring-offset-2"
    >
      {label}
    </a>
  );
}

export function PricingCard({
  title,
  desc,
  price,
  period,
  features,
  buttonLabel,
  popular,
  popularLabel,
}: {
  title: string;
  desc: string;
  price: string;
  period: string;
  features: string[];
  buttonLabel: string;
  popular?: boolean;
  popularLabel?: string;
}) {
  return (
    <div className="relative flex h-full flex-col gap-[24px] overflow-hidden rounded-[32px] px-[16px] py-[32px] md:gap-[32px] md:rounded-[48px] md:px-[24px] md:py-[48px] xl:flex-1">
      {/* Glass background */}
      <GlassOverlay
        gradientSvg={CARD_GRADIENT_SVG}
        insetShadow={popular ? GLASS_SHADOW_M : GLASS_SHADOW_S}
      />

      {/* Popular badge */}
      {popular && popularLabel && (
        <div className="absolute right-0 top-0 z-10 flex h-[36px] items-center justify-center rounded-bl-[3000px] rounded-tl-[3000px] bg-[#2575ff] px-[24px] py-[2px]">
          <span className="text-[14px] leading-[1.4] text-[#fcfcfd]">
            {popularLabel}
          </span>
        </div>
      )}

      {/* Icon + Text */}
      <div className="relative flex flex-col gap-[32px]">
        <div className="flex h-[75px] w-[75px] items-center justify-center rounded-full bg-[#2575ff]">
          <PricingChartIcon className="text-white" />
        </div>
        <div className="flex flex-col gap-[8px]">
          <h3 className="whitespace-pre-line text-[24px] font-bold leading-[1.1] text-[#1d2939] md:text-[32px]">
            {title}
          </h3>
          <p className="whitespace-pre-line text-[16px] leading-[1.4] text-[#1d2939] md:text-[18px]">
            {desc}
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="relative flex items-end gap-[2px]">
        <span className="text-[40px] font-bold leading-[1.1] text-[#1d2939] md:text-[54px]">
          {price}
        </span>
        <span className="text-[20px] font-bold leading-[1.1] text-[#344054] md:text-[24px]">
          {period}
        </span>
      </div>

      {/* Button */}
      {popular ? (
        <SolidButton href="/auth/register" label={buttonLabel} />
      ) : (
        <GlassButton href="/auth/register" label={buttonLabel} />
      )}

      {/* Features */}
      <div className="relative flex flex-col gap-[8px]">
        {features.map((feature) => (
          <FeatureItem key={feature} text={feature} />
        ))}
      </div>
    </div>
  );
}
