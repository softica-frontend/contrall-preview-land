"use client";

import { useLocale, useTranslations } from "next-intl";
import type { ComponentType } from "react";
import { useEffect, useRef, useState } from "react";
import { EnFlag, RuFlag, UkFlag } from "@/components/icons/flag-icons";
import { ChevronDownIcon } from "@/components/icons/header-icons";
import { usePathname, useRouter } from "@/i18n/navigation";

const LOCALES: {
  code: "ru" | "en" | "uk";
  label: string;
  Flag: ComponentType;
}[] = [
  { code: "ru", label: "Русский", Flag: RuFlag },
  { code: "en", label: "English", Flag: EnFlag },
  { code: "uk", label: "Українська", Flag: UkFlag },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("Header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const switchLocale = (newLocale: "ru" | "en" | "uk") => {
    setOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  // Reset active index when opening, set to current locale
  useEffect(() => {
    if (open) {
      const idx = LOCALES.findIndex((l) => l.code === locale);
      setActiveIndex(idx);
      optionRefs.current[idx]?.focus();
    }
  }, [open, locale]);

  // Close on outside click (mousedown to avoid same-tick conflict with toggle)
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        const next = (activeIndex + 1) % LOCALES.length;
        setActiveIndex(next);
        optionRefs.current[next]?.focus();
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const prev = (activeIndex - 1 + LOCALES.length) % LOCALES.length;
        setActiveIndex(prev);
        optionRefs.current[prev]?.focus();
        break;
      }
      case "Enter":
      case " ": {
        e.preventDefault();
        if (activeIndex >= 0) {
          switchLocale(LOCALES[activeIndex].code);
        }
        break;
      }
    }
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: wrapper needs onKeyDown for arrow key navigation
    <div
      ref={ref}
      className={`relative ${className ?? ""}`}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen(!open)}
        className="flex h-[48px] cursor-pointer items-center gap-[6px] px-[8px] lg:px-[12px] xl:px-[16px] hover:opacity-70 transition-opacity duration-200"
      >
        <span className="pl-[4px] text-[15px] leading-[18px] tracking-[0.2px] text-text-primary">
          {t("language")}
        </span>
        <span
          className={`inline-flex transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <ChevronDownIcon />
        </span>
      </button>

      {/* Dropdown */}
      <div
        role="listbox"
        aria-label="Select language"
        tabIndex={-1}
        aria-activedescendant={
          open && activeIndex >= 0
            ? `lang-option-${LOCALES[activeIndex].code}`
            : undefined
        }
        className={`absolute right-0 top-full z-50 mt-1 min-w-[140px] origin-top overflow-hidden rounded-[12px] bg-white shadow-dropdown transition-all duration-200 ease-out ${
          open
            ? "scale-y-100 opacity-100"
            : "pointer-events-none scale-y-0 opacity-0"
        }`}
      >
        {LOCALES.map((item, i) => (
          <button
            key={item.code}
            ref={(el) => {
              optionRefs.current[i] = el;
            }}
            id={`lang-option-${item.code}`}
            type="button"
            role="option"
            aria-selected={locale === item.code}
            tabIndex={-1}
            onClick={() => switchLocale(item.code)}
            className={`flex w-full cursor-pointer items-center gap-[8px] px-[16px] py-[10px] text-[14px] transition-colors duration-150 hover:bg-bg-hover focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset focus-visible:rounded-[12px] ${
              locale === item.code
                ? "font-medium text-primary"
                : "text-text-primary"
            } ${activeIndex === i ? "bg-bg-hover" : ""}`}
          >
            <item.Flag />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
