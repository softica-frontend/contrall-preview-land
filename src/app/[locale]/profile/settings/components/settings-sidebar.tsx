"use client";

import { useTranslations } from "next-intl";

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
    <aside className="hidden w-[278px] shrink-0 rounded-xl border border-[#E4E7EC] bg-[#FCFCFD] p-3 md:block">
      <nav className="flex flex-col gap-1">
        {SECTIONS.map(({ key, icon: Icon }) => {
          const isActive = activeSection === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSectionChange(key)}
              className={`flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-md px-2 text-left font-roboto text-[16px] leading-[1.4] text-[#344054] transition-colors ${
                isActive ? "bg-[#F2F4F7]" : "hover:bg-[#F2F4F7]/50"
              }`}
            >
              <Icon className="size-3.5 shrink-0 text-[#344054]" />
              <span className="truncate">{t(`sidebar.${key}`)}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="7"
        cy="4.667"
        r="2.333"
        stroke="currentColor"
        strokeWidth="1.17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.333 12.833v-.583a4.667 4.667 0 0 1 9.334 0v.583"
        stroke="currentColor"
        strokeWidth="1.17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 1.167 2.333 3.5v3.5c0 3.033 1.993 5.867 4.667 6.417 2.674-.55 4.667-3.384 4.667-6.417V3.5L7 1.167Z"
        stroke="currentColor"
        strokeWidth="1.17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 1.167v12.25M2.333 7h9.334"
        stroke="currentColor"
        strokeWidth="1.17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CreditCardIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="1.167"
        y="2.917"
        width="11.667"
        height="8.167"
        rx="1.167"
        stroke="currentColor"
        strokeWidth="1.17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.167 5.833h11.667"
        stroke="currentColor"
        strokeWidth="1.17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.083 8.75h.583"
        stroke="currentColor"
        strokeWidth="1.17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.417 8.75h1.166"
        stroke="currentColor"
        strokeWidth="1.17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
