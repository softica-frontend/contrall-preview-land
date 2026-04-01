"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import type { Tracker } from "./mock-data";
import { PLAN_COLORS } from "./mock-data";

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
        />
      ))}
    </div>
  );
}

function TableRow({
  tracker,
  onDelete,
  onPause,
}: {
  tracker: Tracker;
  onDelete: (id: string) => void;
  onPause: (id: string) => void;
}) {
  const t = useTranslations("MyTrackers");
  const [menuOpen, setMenuOpen] = useState(false);
  const planColor = PLAN_COLORS[tracker.plan];
  const isActive = tracker.status === "active";

  return (
    <div className="relative flex h-[48px] border-b border-[#E4E7EC]">
      <div className="flex flex-[2] items-center overflow-hidden text-ellipsis whitespace-nowrap p-2 text-[16px] leading-[1.4] text-[#344054]">
        {tracker.name}
      </div>
      <div className="flex w-[160px] shrink-0 items-center p-2 text-[16px] leading-[1.4] text-[#344054]">
        —
      </div>
      <div className="flex flex-[2] items-center p-2 text-[16px] leading-[1.4] text-[#344054]">
        {tracker.nextBillingDate}
      </div>
      <div className="flex w-[200px] shrink-0 items-center p-2">
        <span
          className="rounded-full px-3 py-1 text-[14px] font-bold leading-[1.1] text-[#FCFCFD]"
          style={{ backgroundColor: planColor }}
        >
          {tracker.plan}
        </span>
      </div>
      <div className="flex flex-[2] items-center gap-1.5 p-2">
        <span
          className="size-[6px] rounded-full"
          style={{ backgroundColor: isActive ? "#44BA3E" : "#98A2B3" }}
        />
        <span
          className="text-[14px] font-medium leading-none tracking-[0.5px]"
          style={{ color: isActive ? "#44BA3E" : "#98A2B3" }}
        >
          {t(`status.${tracker.status}`)}
        </span>
      </div>
      <div className="flex w-[100px] shrink-0 items-center justify-end p-2">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex size-[28px] cursor-pointer items-center justify-center rounded-full text-[#667085] transition-colors duration-150 hover:bg-[#F2F4F7] hover:text-[#0C111D]"
        >
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
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {menuOpen && (
          <>
            {/* biome-ignore lint/a11y/noStaticElementInteractions: click-away dismiss */}
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: supplementary dismiss */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute right-2 top-[42px] z-20 flex flex-col rounded-lg border border-[#E4E7EC] bg-[#FCFCFD] py-1 shadow-[0px_0px_6px_0px_rgba(12,17,29,0.02),0px_2px_4px_0px_rgba(16,24,40,0.08)]">
              <MenuButton
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                {t("actions.upgrade")}
              </MenuButton>
              <MenuButton
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                {t("actions.settings")}
              </MenuButton>
              <MenuButton
                onClick={() => {
                  setMenuOpen(false);
                  onPause(tracker.id);
                }}
              >
                {t("actions.pause")}
              </MenuButton>
              <MenuButton
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                {t("actions.users")}
              </MenuButton>
              <MenuButton
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                {t("actions.open")}
              </MenuButton>
              <MenuButton
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(tracker.id);
                }}
                danger
              >
                {t("actions.delete")}
              </MenuButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function MenuButton({
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
