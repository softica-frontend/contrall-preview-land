"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, HamburgerIcon } from "@/components/icons/header-icons";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (id: string) => void;
  navItems: readonly string[];
}

export function MobileMenu({
  isOpen,
  onToggle,
  onNavigate,
  navItems,
}: MobileMenuProps) {
  const t = useTranslations("Header");
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className={`fixed inset-0 z-100 flex flex-col items-center gap-[32px] overflow-y-auto px-[24px] pb-[32px] pt-[32px] transition-all duration-300 ease-out md:hidden ${
        isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none "
      }`}
      style={{
        background:
          "linear-gradient(180deg, #e8eeff 0%, #edeefa 30%, #f4f2fd 60%, #fcfcfd 100%)",
      }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        aria-label="Закрыть меню"
        onClick={onToggle}
        className="flex size-[44px] items-center justify-center rounded-full bg-[#2575ff] text-[#fcfcfd] hover:opacity-70 transition-opacity duration-200"
      >
        <CloseIcon />
      </button>

      <span
        className="flex h-[44px] items-center justify-center rounded-[1000px] px-[24px] py-[8px] text-[14px] font-medium leading-none tracking-[0.5px] text-[#2575ff]"
        style={{
          background: "rgba(252,252,253,0.5)",
          boxShadow:
            "inset -0.5px -1px 1px 0px rgba(37,117,255,0.8), inset 0.5px 1px 1px 0px rgba(37,117,255,0.8)",
        }}
      >
        {t("menu")}
      </span>

      <nav className="flex w-full flex-col gap-[16px]">
        {navItems.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(id)}
            className="cursor-pointer text-center text-[18px] leading-[1.4] text-[#1d2939] transition-colors hover:text-[#2575ff] active:text-[#1a63e0]"
          >
            {t(`nav.${id}`)}
          </button>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      <div className="flex flex-1 justify-center">
        <button
          type="button"
          aria-label="Открыть меню"
          aria-expanded={isOpen}
          onClick={onToggle}
          className="flex h-[32px] items-center justify-center px-[16px] hover:opacity-70 transition-opacity duration-200"
        >
          <HamburgerIcon />
        </button>
      </div>

      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
