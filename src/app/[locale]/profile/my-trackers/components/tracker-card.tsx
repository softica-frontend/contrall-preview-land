"use client";

import { useTranslations } from "next-intl";
import {
  BanknoteIcon,
  ChevronsUpIcon,
  ExternalLinkIcon,
  PauseIcon,
  SettingsGearIcon,
  TrashIcon,
  UsersIcon,
} from "@/components/icons/profile-icons";
import { PlanBadge } from "@/components/ui/plan-badge";
import { StatusIndicator } from "@/components/ui/status-indicator";
import type { Tracker } from "./types";

interface TrackerCardProps {
  tracker: Tracker;
  onDelete: (id: string) => void;
  onPause: (id: string) => void;
}

export function TrackerCard({ tracker, onDelete, onPause }: TrackerCardProps) {
  const t = useTranslations("MyTrackers");

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border-light bg-surface transition-shadow duration-200 hover:shadow-dropdown">
      <div className="flex flex-col gap-3 px-4 pt-4">
        {/* Plan badge */}
        <div className="flex items-center">
          <PlanBadge plan={tracker.plan} className="text-[18px]" />
        </div>

        {/* Name + status */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[32px] font-bold leading-[1.1] text-text-heading">
              {tracker.name}
            </span>
            <StatusIndicator
              status={tracker.status}
              label={t(`status.${tracker.status}`)}
              showBackground
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-[16px] leading-[1.4] text-text-body">
              <span className="text-[14px]">{tracker.countryCode}</span>
              <span>{t("ip")}:</span>
              <span>{tracker.ip}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[16px] leading-[1.4] text-text-body">
              <BanknoteIcon />
              <span>{t("nextBilling")}:</span>
              <span>{tracker.nextBillingDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-1.5 px-4 py-3 transition-opacity duration-200 lg:opacity-0 lg:group-hover:opacity-100">
        <ActionButton title={t("actions.upgrade")} onClick={() => {}}>
          <ChevronsUpIcon />
        </ActionButton>
        <ActionButton title={t("actions.settings")} onClick={() => {}}>
          <SettingsGearIcon />
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
      className="flex size-7 cursor-pointer items-center justify-center rounded-full text-text-subtle transition-colors duration-150 hover:bg-[#F2F4F7] hover:text-text-heading"
    >
      {children}
    </button>
  );
}
