import type { TrackerStatus } from "@/app/[locale]/profile/my-trackers/components/types";
import {
  STATUS_BG,
  STATUS_COLORS,
} from "@/app/[locale]/profile/my-trackers/components/types";

interface StatusIndicatorProps {
  status: TrackerStatus;
  label: string;
  showBackground?: boolean;
}

export function StatusIndicator({
  status,
  label,
  showBackground = false,
}: StatusIndicatorProps) {
  const color = STATUS_COLORS[status];

  return (
    <span
      className={`flex items-center gap-1 ${showBackground ? "rounded-full px-3 py-2" : ""}`}
      style={
        showBackground ? { backgroundColor: STATUS_BG[status] } : undefined
      }
    >
      <span
        className="size-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span
        className="text-[14px] font-medium leading-none tracking-[0.5px]"
        style={{ color }}
      >
        {label}
      </span>
    </span>
  );
}
