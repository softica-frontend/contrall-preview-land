export type ViewMode = "grid" | "list";

export type TrackerPlan = "FREE" | "PRO" | "BUSINESS" | "ENTERPRISE";

export type TrackerStatus = "active" | "paused" | "stopped";

export interface Tracker {
  id: string;
  name: string;
  plan: TrackerPlan;
  status: TrackerStatus;
  ip: string;
  countryCode: string;
  nextBillingDate: string;
  description?: string;
  usersCount?: number;
}

export const PLAN_COLORS: Record<TrackerPlan, string> = {
  FREE: "#ff5125",
  PRO: "#2575ff",
  BUSINESS: "#ff257c",
  ENTERPRISE: "#75d346",
};

export const STATUS_COLORS: Record<TrackerStatus, string> = {
  active: "#44BA3E",
  paused: "#98A2B3",
  stopped: "#98A2B3",
};

export const STATUS_BG: Record<TrackerStatus, string> = {
  active: "rgba(68,186,62,0.1)",
  paused: "rgba(152,162,179,0.1)",
  stopped: "rgba(152,162,179,0.1)",
};
