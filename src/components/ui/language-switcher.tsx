"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/icons/header-icons";
import { usePathname, useRouter } from "@/i18n/navigation";

const LOCALES = [
  { code: "ru" as const, label: "Русский" },
  { code: "en" as const, label: "English" },
  { code: "uk" as const, label: "Українська" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("Header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const switchLocale = (newLocale: "ru" | "en" | "uk") => {
    setOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

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

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
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
        className={`absolute right-0 top-full z-50 mt-1 min-w-[140px] origin-top overflow-hidden rounded-[12px] bg-white shadow-dropdown transition-all duration-200 ease-out ${
          open
            ? "scale-y-100 opacity-100"
            : "pointer-events-none scale-y-0 opacity-0"
        }`}
      >
        {LOCALES.map((item) => (
          <button
            key={item.code}
            type="button"
            role="option"
            aria-selected={locale === item.code}
            onClick={() => switchLocale(item.code)}
            className={`flex w-full cursor-pointer items-center px-[16px] py-[10px] text-[14px] transition-colors duration-150 hover:bg-bg-hover ${
              locale === item.code
                ? "font-medium text-primary"
                : "text-text-primary"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
