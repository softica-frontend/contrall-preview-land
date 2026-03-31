"use client";

import { CheckIcon } from "@/components/icons/pricing-icons";

export function FeatureItem({ text }: { text: string }) {
  return (
    <div className="group flex cursor-default items-start gap-[8px]">
      <CheckIcon className="transition-transform duration-200 group-hover:scale-110" />
      <span className="whitespace-pre-line text-[16px] leading-[1.4] text-[#1d2939] transition-colors duration-200 group-hover:text-[#2575ff] md:text-[18px]">
        {text}
      </span>
    </div>
  );
}
