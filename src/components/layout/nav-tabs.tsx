"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

interface NavTabsProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  navItems: readonly string[];
  className?: string;
}

export function NavTabs({
  activeSection,
  onNavigate,
  navItems,
  className,
}: NavTabsProps) {
  const t = useTranslations("Header");
  const navRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  // Sliding indicator position
  const updateIndicator = useCallback(() => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector(
      `[data-section="${activeSection}"]`,
    ) as HTMLElement | null;
    if (!activeLink) return;
    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    setIndicator({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
    });
  }, [activeSection]);

  useEffect(() => {
    updateIndicator();
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(updateIndicator, 100);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timer);
    };
  }, [updateIndicator]);

  return (
    <nav
      ref={navRef}
      className={`relative flex items-center gap-px rounded-[100px] p-[2px] lg:gap-[2px] xl:gap-[4px] ${className ?? ""}`}
    >
      <div
        className="absolute bottom-[2px] h-[2px] rounded-full bg-primary transition-all duration-300 ease-out"
        style={{ left: indicator.left, width: indicator.width }}
      />
      {navItems.map((id) => (
        <button
          key={id}
          type="button"
          data-section={id}
          aria-current={activeSection === id ? "true" : undefined}
          onClick={() => onNavigate(id)}
          className={`flex h-[32px] cursor-pointer items-center justify-center whitespace-nowrap px-[6px] py-[4px] font-inter text-[12px] font-medium leading-none transition-colors duration-200 hover:text-primary lg:px-[8px] lg:text-[13px] xl:px-[12px] xl:text-[14px] ${
            activeSection === id ? "text-primary" : "text-text-heading"
          }`}
        >
          {t(`nav.${id}`)}
        </button>
      ))}
    </nav>
  );
}
