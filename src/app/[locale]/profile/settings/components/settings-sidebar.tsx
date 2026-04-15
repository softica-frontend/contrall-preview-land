"use client";

import { useTranslations } from "next-intl";
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

interface SettingsSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function SettingsSidebar({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) {
  const t = useTranslations("Settings");

  return (
    <aside className="hidden w-[278px] shrink-0 rounded-xl border border-border-light bg-surface p-3 lg:block">
      <nav className="flex flex-col gap-1">
        {SECTIONS.map(({ key, icon: Icon }) => {
          const isActive = activeSection === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSectionChange(key)}
              className={`flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-md px-2 text-left font-roboto text-[16px] leading-[1.4] text-text-body transition-colors ${
                isActive ? "bg-[#F2F4F7]" : "hover:bg-[#F2F4F7]/50"
              }`}
            >
              <Icon className="size-3.5 shrink-0 text-text-body" />
              <span className="truncate">{t(`sidebar.${key}`)}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
