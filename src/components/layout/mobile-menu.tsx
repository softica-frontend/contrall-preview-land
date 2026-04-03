"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, HamburgerIcon } from "@/components/icons/header-icons";
import { useHeaderContext } from "@/components/layout/header-provider";
import { NAV_IDS } from "@/hooks/use-active-section";

export function MobileMenu() {
  const t = useTranslations("Header");
  const {
    activeSection,
    mobileMenuOpen: isOpen,
    toggleMenu: onToggle,
  } = useHeaderContext();
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onToggle();
        return;
      }
      if (e.key !== "Tab") return;

      const overlay = overlayRef.current;
      if (!overlay) return;

      const focusable = overlay.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onToggle],
  );

  const overlay = (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      onKeyDown={handleKeyDown}
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
        aria-label={t("closeMenu")}
        onClick={onToggle}
        className="flex size-[44px] items-center justify-center rounded-full bg-primary text-surface outline-none hover:opacity-70 transition-opacity duration-200"
      >
        <CloseIcon />
      </button>

      <span
        className="flex h-[44px] items-center justify-center rounded-[1000px] px-[24px] py-[8px] text-[14px] font-medium leading-none tracking-[0.5px] text-primary"
        style={{
          background: "rgba(252,252,253,0.5)",
          boxShadow:
            "inset -0.5px -1px 1px 0px rgba(37,117,255,0.8), inset 0.5px 1px 1px 0px rgba(37,117,255,0.8)",
        }}
      >
        {t("menu")}
      </span>

      <nav className="flex w-full flex-col gap-[16px]">
        {NAV_IDS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => onToggle()}
            className={`cursor-pointer text-center text-[18px] leading-[1.4] transition-colors hover:text-primary active:text-primary-hover ${
              activeSection === id ? "text-primary" : "text-text-primary"
            }`}
          >
            {t(`nav.${id}`)}
          </a>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      <div className="flex flex-1 justify-center">
        <button
          ref={triggerRef}
          type="button"
          aria-label={t("openMenu")}
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
