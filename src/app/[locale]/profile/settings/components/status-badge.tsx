"use client";

import { useTranslations } from "next-intl";

const STATUS_STYLES: Record<string, { bg: string; dot: string; text: string }> =
  {
    completed: {
      bg: "bg-[rgba(68,186,62,0.1)]",
      dot: "bg-success",
      text: "text-success",
    },
    pending: {
      bg: "bg-[rgba(218,152,30,0.1)]",
      dot: "bg-[#DA981E]",
      text: "text-[#DA981E]",
    },
    failed: {
      bg: "bg-[rgba(218,30,40,0.1)]",
      dot: "bg-error",
      text: "text-error",
    },
    in_progress: {
      bg: "bg-[rgba(218,152,30,0.1)]",
      dot: "bg-[#DA981E]",
      text: "text-[#DA981E]",
    },
    cancelled: {
      bg: "bg-[rgba(218,30,40,0.1)]",
      dot: "bg-error",
      text: "text-error",
    },
    on_hold: {
      bg: "bg-[rgba(218,152,30,0.1)]",
      dot: "bg-[#DA981E]",
      text: "text-[#DA981E]",
    },
    scheduled: {
      bg: "bg-[rgba(102,112,133,0.1)]",
      dot: "bg-text-subtle",
      text: "text-text-subtle",
    },
    acknowledged: {
      bg: "bg-[rgba(68,186,62,0.1)]",
      dot: "bg-success",
      text: "text-success",
    },
    resolved: {
      bg: "bg-[rgba(68,186,62,0.1)]",
      dot: "bg-success",
      text: "text-success",
    },
    not_found: {
      bg: "bg-[rgba(218,30,40,0.1)]",
      dot: "bg-error",
      text: "text-error",
    },
    awaiting_feedback: {
      bg: "bg-[rgba(218,152,30,0.1)]",
      dot: "bg-[#DA981E]",
      text: "text-[#DA981E]",
    },
  };

interface StatusBadgeProps {
  statusKey: string;
}

export function StatusBadge({ statusKey }: StatusBadgeProps) {
  const t = useTranslations("Settings");
  const style = STATUS_STYLES[statusKey];
  if (!style) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-[14px] font-medium leading-5 tracking-[0.5px] ${style.bg} ${style.text}`}
    >
      <span className={`size-1.5 rounded-[29px] ${style.dot}`} />
      {t(`billing.statuses.${statusKey}`)}
    </span>
  );
}
