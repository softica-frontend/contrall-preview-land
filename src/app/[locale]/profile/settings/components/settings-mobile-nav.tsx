"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
  CreditCardIcon,
  ShieldIcon,
  UserIcon,
} from "@/components/icons/profile-icons";

const SECTIONS = [
  { key: "personal", icon: UserIcon },
  { key: "privacy", icon: ShieldIcon },
  { key: "billing", icon: CreditCardIcon },
] as const;

interface SettingsMobileNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function SettingsMobileNav({
  activeSection,
  onSectionChange,
}: SettingsMobileNavProps) {
  const t = useTranslations("Settings");
  const [open, setOpen] = useState(false);
  const [panelMounted, setPanelMounted] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);

  const active = SECTIONS.find((s) => s.key === activeSection) ?? SECTIONS[0];
  const ActiveIcon = active.icon;

  useEffect(() => {
    if (open) {
      setPanelMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPanelVisible(true));
      });
    } else {
      setPanelVisible(false);
      const timer = setTimeout(() => setPanelMounted(false), 150);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-md border border-border-light bg-surface px-2 font-roboto text-[16px] leading-[1.4] text-text-body"
      >
        <ActiveIcon className="size-3.5 shrink-0 text-text-body" />
        <span className="flex-1 text-left">{t(`sidebar.${active.key}`)}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M3 4.5 6 7.5l3-3"
            stroke="#667085"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {panelMounted && (
        <div
          className={`absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-xl border border-border-light bg-surface shadow-dropdown ${
            panelVisible
              ? "animate-[dropdown-in_220ms_cubic-bezier(0.16,1,0.3,1)_both]"
              : "animate-[dropdown-out_150ms_ease-in_both]"
          }`}
        >
          {SECTIONS.map(({ key, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                onSectionChange(key);
                setOpen(false);
              }}
              className={`flex w-full cursor-pointer items-center gap-2.5 px-3 py-2.5 font-roboto text-[16px] leading-[1.4] text-text-body transition-colors ${activeSection === key ? "bg-[#F2F4F7]" : "hover:bg-[#F2F4F7]/50"}`}
            >
              <Icon className="size-3.5 shrink-0 text-text-body" />
              <span>{t(`sidebar.${key}`)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
