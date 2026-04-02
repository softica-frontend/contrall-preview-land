import type { TrackerPlan } from "@/app/[locale]/profile/my-trackers/components/types";
import { PLAN_COLORS } from "@/app/[locale]/profile/my-trackers/components/types";

interface PlanBadgeProps {
  plan: TrackerPlan;
  className?: string;
}

export function PlanBadge({ plan, className }: PlanBadgeProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-[14px] font-bold leading-[1.1] text-[#FCFCFD] ${className ?? ""}`}
      style={{ backgroundColor: PLAN_COLORS[plan] }}
    >
      {plan}
    </span>
  );
}
