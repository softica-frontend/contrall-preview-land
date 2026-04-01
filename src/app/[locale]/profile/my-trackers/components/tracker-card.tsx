"use client";

import { useTranslations } from "next-intl";
import type { Tracker } from "./mock-data";
import { PLAN_COLORS } from "./mock-data";

interface TrackerCardProps {
  tracker: Tracker;
  onDelete: (id: string) => void;
  onPause: (id: string) => void;
}

export function TrackerCard({ tracker, onDelete, onPause }: TrackerCardProps) {
  const t = useTranslations("MyTrackers");
  const planColor = PLAN_COLORS[tracker.plan];
  const isActive = tracker.status === "active";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E4E7EC] bg-[#FCFCFD] transition-shadow duration-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col gap-3 px-4 pt-4">
        {/* Plan badge */}
        <div className="flex items-center">
          <span
            className="rounded-full px-3 py-1 text-[18px] font-bold leading-[1.1] text-[#FCFCFD]"
            style={{ backgroundColor: planColor }}
          >
            {tracker.plan}
          </span>
        </div>

        {/* Name + status */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[32px] font-bold leading-[1.1] text-[#0C111D]">
              {tracker.name}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-[rgba(68,186,62,0.1)] px-3 py-2">
              <span
                className="size-1.5 rounded-full"
                style={{
                  backgroundColor: isActive ? "#44BA3E" : "#98A2B3",
                }}
              />
              <span
                className="text-[14px] font-medium leading-none tracking-[0.5px]"
                style={{
                  color: isActive ? "#44BA3E" : "#98A2B3",
                }}
              >
                {t(`status.${tracker.status}`)}
              </span>
            </span>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-[16px] leading-[1.4] text-[#475467]">
              <span className="text-[14px]">{tracker.countryCode}</span>
              <span>Ip:</span>
              <span>{tracker.ip}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[16px] leading-[1.4] text-[#475467]">
              <BanknoteIcon />
              <span>{t("nextBilling")}:</span>
              <span>{tracker.nextBillingDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-1.5 px-4 py-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <ActionButton title={t("actions.upgrade")} onClick={() => {}}>
          <ChevronsUpIcon />
        </ActionButton>
        <ActionButton title={t("actions.settings")} onClick={() => {}}>
          <SettingsIcon />
        </ActionButton>
        <ActionButton
          title={t("actions.pause")}
          onClick={() => onPause(tracker.id)}
        >
          <PauseIcon />
        </ActionButton>
        <ActionButton title={t("actions.users")} onClick={() => {}}>
          <UsersIcon />
        </ActionButton>
        <ActionButton
          title={t("actions.delete")}
          onClick={() => onDelete(tracker.id)}
        >
          <TrashIcon />
        </ActionButton>
        <ActionButton title={t("actions.open")} onClick={() => {}}>
          <ExternalLinkIcon />
        </ActionButton>
      </div>
    </div>
  );
}

function ActionButton({
  children,
  title,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="flex size-7 cursor-pointer items-center justify-center rounded-full text-[#667085] transition-colors duration-150 hover:bg-[#F2F4F7] hover:text-[#0C111D]"
    >
      {children}
    </button>
  );
}

function BanknoteIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  );
}

function ChevronsUpIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m7 11 5-5 5 5M7 17l5-5 5 5" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
    </svg>
  );
}
