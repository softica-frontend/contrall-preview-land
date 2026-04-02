"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { MenuIcon } from "@/components/icons/profile-icons";
import { PlanBadge } from "@/components/ui/plan-badge";
import { StatusIndicator } from "@/components/ui/status-indicator";
import type { Tracker } from "./types";

interface TrackerTableProps {
  trackers: Tracker[];
  onDelete: (id: string) => void;
  onPause: (id: string) => void;
}

export function TrackerTable({
  trackers,
  onDelete,
  onPause,
}: TrackerTableProps) {
  const t = useTranslations("MyTrackers");

  return (
    <div className="w-full pt-6">
      {/* Header */}
      <div className="flex h-[36px] border-b border-[#E4E7EC]">
        <div className="flex flex-[2] items-center p-2 text-[14px] leading-[1.4] text-[#667085]">
          {t("table.name")}
        </div>
        <div className="flex w-[160px] shrink-0 items-center p-2 text-[14px] leading-[1.4] text-[#667085]">
          {t("table.team")}
        </div>
        <div className="flex flex-[2] items-center p-2 text-[14px] leading-[1.4] text-[#667085]">
          {t("table.nextBilling")}
        </div>
        <div className="flex w-[200px] shrink-0 items-center p-2 text-[14px] leading-[1.4] text-[#667085]">
          {t("table.plan")}
        </div>
        <div className="flex flex-[2] items-center p-2 text-[14px] leading-[1.4] text-[#667085]">
          {t("table.status")}
        </div>
        <div className="flex w-[100px] shrink-0 items-center p-2 text-[14px] leading-[1.4] text-[#667085]">
          {t("table.actions")}
        </div>
      </div>

      {/* Rows */}
      {trackers.map((tracker) => (
        <TableRow
          key={tracker.id}
          tracker={tracker}
          onDelete={onDelete}
          onPause={onPause}
          t={t}
        />
      ))}
    </div>
  );
}

function TableRow({
  tracker,
  onDelete,
  onPause,
  t,
}: {
  tracker: Tracker;
  onDelete: (id: string) => void;
  onPause: (id: string) => void;
  t: ReturnType<typeof useTranslations<"MyTrackers">>;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative flex h-[48px] border-b border-[#E4E7EC]">
      <div className="flex flex-[2] items-center p-2">
        <span className="block overflow-hidden text-ellipsis whitespace-nowrap text-[16px] leading-[1.4] text-[#344054]">
          {tracker.name}
        </span>
      </div>
      <div className="flex w-[160px] shrink-0 items-center p-2 text-[16px] leading-[1.4] text-[#344054]">
        —
      </div>
      <div className="flex flex-[2] items-center p-2 text-[16px] leading-[1.4] text-[#344054]">
        {tracker.nextBillingDate}
      </div>
      <div className="flex w-[200px] shrink-0 items-center p-2">
        <PlanBadge plan={tracker.plan} />
      </div>
      <div className="flex flex-[2] items-center p-2">
        <StatusIndicator
          status={tracker.status}
          label={t(`status.${tracker.status}`)}
        />
      </div>
      <div className="flex w-[100px] shrink-0 items-center justify-end p-2">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          className="flex size-[28px] cursor-pointer items-center justify-center rounded-full text-[#667085] transition-colors duration-150 hover:bg-[#F2F4F7] hover:text-[#0C111D]"
        >
          <MenuIcon />
        </button>

        {menuOpen && (
          <>
            {/* biome-ignore lint/a11y/noStaticElementInteractions: click-away dismiss */}
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: Escape handled via onKeyDown on menu */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setMenuOpen(false)}
            />
            <div
              role="menu"
              className="absolute right-2 top-[42px] z-20 flex flex-col rounded-lg border border-[#E4E7EC] bg-[#FCFCFD] py-1 shadow-[0px_0px_6px_0px_rgba(12,17,29,0.02),0px_2px_4px_0px_rgba(16,24,40,0.08)]"
              onKeyDown={(e) => {
                if (e.key === "Escape") setMenuOpen(false);
              }}
            >
              <DropdownItem onClick={() => setMenuOpen(false)}>
                {t("actions.upgrade")}
              </DropdownItem>
              <DropdownItem onClick={() => setMenuOpen(false)}>
                {t("actions.settings")}
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setMenuOpen(false);
                  onPause(tracker.id);
                }}
              >
                {t("actions.pause")}
              </DropdownItem>
              <DropdownItem onClick={() => setMenuOpen(false)}>
                {t("actions.users")}
              </DropdownItem>
              <DropdownItem onClick={() => setMenuOpen(false)}>
                {t("actions.open")}
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(tracker.id);
                }}
                danger
              >
                {t("actions.delete")}
              </DropdownItem>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function DropdownItem({
  children,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer whitespace-nowrap px-4 py-2 text-left text-[14px] leading-[1.4] transition-colors duration-100 hover:bg-[#F2F4F7] ${
        danger ? "text-[#D92D20]" : "text-[#344054]"
      }`}
    >
      {children}
    </button>
  );
}
