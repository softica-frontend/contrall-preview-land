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
      className="group relative flex overflow-hidden rounded-[21px] transition-shadow duration-200 hover:shadow-elevated"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(252,252,253,0) 0%, rgba(37,117,255,0.10) 100%), #FCFCFD",
        backgroundBlendMode: "screen, screen",
        // boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        border: "1px solid #E4E7EC",
      }}
    >
      {/* Left accent bar */}
      <div
        className="w-2 shrink-0 self-stretch rounded-l-none"
        style={{ backgroundColor: accentColor }}
      />

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-4 px-4 pb-3 pt-4">
        {/* Header */}
        <div className="flex flex-col gap-1">
          {/* IP row + burger (top-right, hover only) */}
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

          {/* Description */}
          {tracker.description && (
            <p
              className="overflow-hidden text-[16px] leading-[1.4] text-text-subtle"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
              }}
            >
              {tracker.description}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-border-light" />

        {/* Footer metadata */}
        <div className="flex gap-1.5">
          {/* Left column */}
          <div className="flex flex-1 flex-col gap-1.5">
            <div className="flex items-center gap-1 text-[14px] leading-[1.4] text-text-primary">
              <BanknoteIcon size={16} className="shrink-0 text-text-subtle" />
              <span className="truncate">{tracker.nextBillingDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Inset glow overlay — renders on top of all content including accent bar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
      />
    </div>
  );
}
