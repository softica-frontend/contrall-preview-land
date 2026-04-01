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
  teamAvatars: string[];
}

export const PLAN_COLORS: Record<TrackerPlan, string> = {
  FREE: "#afafaf",
  PRO: "#2575ff",
  BUSINESS: "#e225ff",
  ENTERPRISE: "#00ba1f",
};

export const MOCK_TRACKERS: Tracker[] = [
  {
    id: "1",
    name: "Campaign A",
    plan: "FREE",
    status: "active",
    ip: "192.168.1.101",
    countryCode: "US",
    nextBillingDate: "23 April",
    teamAvatars: [],
  },
  {
    id: "2",
    name: "Lead Gen",
    plan: "PRO",
    status: "active",
    ip: "10.0.0.42",
    countryCode: "DE",
    nextBillingDate: "15 May",
    teamAvatars: [],
  },
  {
    id: "3",
    name: "Offer Track",
    plan: "BUSINESS",
    status: "paused",
    ip: "172.16.0.88",
    countryCode: "GB",
    nextBillingDate: "1 June",
    teamAvatars: [],
  },
  {
    id: "4",
    name: "Analytics",
    plan: "ENTERPRISE",
    status: "active",
    ip: "234.324.234",
    countryCode: "AT",
    nextBillingDate: "10 April",
    teamAvatars: [],
  },
  {
    id: "5",
    name: "Push Ads",
    plan: "PRO",
    status: "active",
    ip: "192.168.2.55",
    countryCode: "FR",
    nextBillingDate: "28 April",
    teamAvatars: [],
  },
  {
    id: "6",
    name: "Native Pro",
    plan: "FREE",
    status: "stopped",
    ip: "10.0.1.12",
    countryCode: "ES",
    nextBillingDate: "5 May",
    teamAvatars: [],
  },
  {
    id: "7",
    name: "CPA Tracker",
    plan: "BUSINESS",
    status: "active",
    ip: "172.16.1.99",
    countryCode: "PL",
    nextBillingDate: "20 May",
    teamAvatars: [],
  },
  {
    id: "8",
    name: "Revenue Max",
    plan: "ENTERPRISE",
    status: "active",
    ip: "234.100.200",
    countryCode: "NL",
    nextBillingDate: "12 June",
    teamAvatars: [],
  },
];
