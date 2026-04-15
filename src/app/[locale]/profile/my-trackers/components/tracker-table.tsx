"use client";

import { useTranslations } from "next-intl";
import { PlanBadge } from "@/components/ui/plan-badge";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { TrackerActionsMenu } from "./tracker-actions-menu";
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
        <TrackerActionsMenu
          trackerId={tracker.id}
          trackerStatus={tracker.status}
          onDelete={onDelete}
          onPause={onPause}
        />
      </div>
    </div>
  );
}
