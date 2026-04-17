"use client";

import { useTranslations } from "next-intl";
import ReactCountryFlag from "react-country-flag";
import { BanknoteIcon } from "@/components/icons/profile-icons";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { TrackerActionsMenu } from "./tracker-actions-menu";
import type { Tracker } from "./types";
import { PLAN_COLORS } from "./types";

interface TrackerCardProps {
  tracker: Tracker;
  onDelete: (id: string) => void;
  onPause: (id: string) => void;
}

export function TrackerCard({ tracker, onDelete, onPause }: TrackerCardProps) {
  const t = useTranslations("MyTrackers");
  const accentColor = PLAN_COLORS[tracker.plan];

  return (
    <div
      className="group relative flex h-[268px] overflow-hidden rounded-[21px] transition-shadow duration-200 hover:shadow-elevated"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(252,252,253,0) 0%, rgba(37,117,255,0.10) 100%), #FCFCFD",
        backgroundBlendMode: "screen, screen",
        border: "1px solid #E4E7EC",
      }}
    >
      {/* Left accent bar */}
      <div
        className="w-2 shrink-0 self-stretch rounded-l-none"
        style={{ backgroundColor: accentColor }}
      />

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col px-4 pt-4">
        {/* Top section — grows to fill available space */}
        <div className="flex flex-1 flex-col gap-1 overflow-hidden">
          {/* IP row + burger */}
          <div className="flex items-center gap-2">
            <ReactCountryFlag
              countryCode={tracker.countryCode}
              svg
              style={{ width: "24px", height: "18px", borderRadius: "2px" }}
              aria-hidden="true"
            />
            <a
              href={`https://${tracker.ip}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-[16px] leading-[1.4] text-text-primary transition-colors duration-150 hover:text-primary hover:underline"
            >
              {tracker.ip}
            </a>
            <div className="opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
              <TrackerActionsMenu
                trackerId={tracker.id}
                trackerStatus={tracker.status}
                onDelete={onDelete}
                onPause={onPause}
                variant="card"
              />
            </div>
          </div>

          {/* Name + status row */}
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-[32px] font-bold leading-[1.1] text-text-heading">
              {tracker.name}
            </span>
            <StatusIndicator
              status={tracker.status}
              label={t(`status.${tracker.status}`)}
              showBackground
            />
          </div>

          {/* Description — fills remaining space */}
          {tracker.description && (
            <p className="mt-1 flex-1 overflow-hidden text-[16px] leading-[1.4] text-text-subtle">
              {tracker.description}
            </p>
          )}
        </div>

        {/* Footer — pinned to bottom with top border */}
        <div className="flex gap-1.5 border-t border-border-light py-3">
          <div className="flex flex-1 flex-col gap-1.5">
            <div className="flex items-center gap-1 text-[14px] leading-[1.4] text-text-primary">
              <BanknoteIcon size={16} className="shrink-0 text-text-subtle" />
              <span className="truncate">{tracker.nextBillingDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Inset glow overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
      />
    </div>
  );
}
