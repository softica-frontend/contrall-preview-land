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

const COL = {
  name: "min-w-[140px] flex-1",
  team: "w-[120px] shrink-0",
  nextBilling: "w-[170px] shrink-0",
  plan: "w-[160px] shrink-0",
  status: "w-[140px] shrink-0",
  actions: "w-[80px] shrink-0",
} as const;

export function TrackerTable({
  trackers,
  onDelete,
  onPause,
}: TrackerTableProps) {
  const t = useTranslations("MyTrackers");

  return (
    <div className="w-full overflow-x-auto pt-6">
      {/* Header */}
      <div className="flex h-[36px] min-w-[810px] border-b border-border-light">
        <div
          className={`flex items-center p-2 text-[14px] leading-[1.4] text-text-subtle ${COL.name}`}
        >
          <span className="whitespace-nowrap">{t("table.name")}</span>
        </div>
        <div
          className={`flex items-center p-2 text-[14px] leading-[1.4] text-text-subtle ${COL.team}`}
        >
          <span className="whitespace-nowrap">{t("table.team")}</span>
        </div>
        <div
          className={`flex items-center p-2 text-[14px] leading-[1.4] text-text-subtle ${COL.nextBilling}`}
        >
          <span className="whitespace-nowrap">{t("table.nextBilling")}</span>
        </div>
        <div
          className={`flex items-center p-2 text-[14px] leading-[1.4] text-text-subtle ${COL.plan}`}
        >
          <span className="whitespace-nowrap">{t("table.plan")}</span>
        </div>
        <div
          className={`flex items-center p-2 text-[14px] leading-[1.4] text-text-subtle ${COL.status}`}
        >
          <span className="whitespace-nowrap">{t("table.status")}</span>
        </div>
        <div
          className={`flex items-center p-2 text-[14px] leading-[1.4] text-text-subtle ${COL.actions}`}
        />
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
    <div className="relative flex h-[48px] min-w-[810px] border-b border-border-light">
      <div className={`flex items-center p-2 ${COL.name}`}>
        <span className="block overflow-hidden text-ellipsis whitespace-nowrap text-[16px] leading-[1.4] text-text-body">
          {tracker.name}
        </span>
      </div>
      <div
        className={`flex items-center p-2 text-[16px] leading-[1.4] text-text-body ${COL.team}`}
      >
        —
      </div>
      <div
        className={`flex items-center p-2 text-[16px] leading-[1.4] text-text-body ${COL.nextBilling}`}
      >
        {tracker.nextBillingDate}
      </div>
      <div className={`flex items-center p-2 ${COL.plan}`}>
        <PlanBadge plan={tracker.plan} />
      </div>
      <div className={`flex items-center p-2 ${COL.status}`}>
        <StatusIndicator
          status={tracker.status}
          label={t(`status.${tracker.status}`)}
        />
      </div>
      <div className={`flex items-center justify-end p-2 ${COL.actions}`}>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          className="flex size-[28px] cursor-pointer items-center justify-center rounded-full text-text-subtle transition-colors duration-150 hover:bg-[#F2F4F7] hover:text-text-heading"
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
              className="absolute right-2 top-[42px] z-20 flex flex-col rounded-lg border border-border-light bg-surface py-1 shadow-card"
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
        danger ? "text-[#D92D20]" : "text-text-body"
      }`}
    >
      {children}
    </button>
  );
}
