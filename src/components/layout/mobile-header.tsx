"use client";

import { useHeaderContext } from "@/components/layout/header-provider";

export function MobileHeader({ children }: { children: React.ReactNode }) {
  const { mobileVisible } = useHeaderContext();

  return (
    <div
      className={`flex items-center justify-between px-[16px] pb-[12px] pt-[16px] backdrop-blur-md transition-transform duration-300 will-change-transform md:hidden ${
        mobileVisible ? "translate-y-0" : "-translate-y-[200%]"
      }`}
    >
      {children}
    </div>
  );
}
