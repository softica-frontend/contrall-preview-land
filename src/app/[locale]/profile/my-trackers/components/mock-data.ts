import type { Tracker } from "./types";

export const MOCK_TRACKERS: Tracker[] = [
  {
    id: "1",
    name: "Campaign A",
    plan: "FREE",
    status: "active",
    ip: "192.168.1.101",
    countryCode: "US",
    nextBillingDate: "23 April",
    description:
      "Main campaign tracker for US market. Monitors conversion rates across all active ad networks and tracks ROI metrics.",
    usersCount: 12,
  },
  {
    id: "2",
    name: "Lead Gen",
    plan: "PRO",
    status: "active",
    ip: "10.0.0.42",
    countryCode: "DE",
    nextBillingDate: "15 May",
    description:
      "Lead generation funnel tracker for European campaigns. Tracks form submissions and email capture across landing pages.",
    usersCount: 34,
  },
  {
    id: "3",
    name: "Offer Track",
    plan: "BUSINESS",
    status: "paused",
    ip: "172.16.0.88",
    countryCode: "GB",
    nextBillingDate: "1 June",
    description:
      "Offer performance tracker for UK audience. Currently paused for optimization. Tracks click-through and offer acceptance rates.",
    usersCount: 8,
  },
  {
    id: "4",
    name: "Analytics",
    plan: "ENTERPRISE",
    status: "active",
    ip: "234.324.234",
    countryCode: "AT",
    nextBillingDate: "10 April",
    description:
      "Enterprise analytics dashboard for the Austrian market. Aggregates data from all sub-trackers and provides unified reporting.",
    usersCount: 57,
  },
  {
    id: "5",
    name: "Push Ads",
    plan: "PRO",
    status: "active",
    ip: "192.168.2.55",
    countryCode: "FR",
    nextBillingDate: "28 April",
    description:
      "Push notification ad tracker for French campaigns. Monitors open rates, CTR, and subscriber growth on a daily basis.",
    usersCount: 21,
  },
  {
    id: "6",
    name: "Native Pro",
    plan: "FREE",
    status: "stopped",
    ip: "10.0.1.12",
    countryCode: "ES",
    nextBillingDate: "5 May",
    description:
      "Native advertising tracker for Spanish market. Currently stopped. Was tracking sponsored content performance across news sites.",
    usersCount: 3,
  },
  {
    id: "7",
    name: "CPA Tracker",
    plan: "BUSINESS",
    status: "active",
    ip: "172.16.1.99",
    countryCode: "PL",
    nextBillingDate: "20 May",
    description:
      "Cost-per-action tracker for Polish affiliate campaigns. Monitors commission payouts and affiliate partner performance metrics.",
    usersCount: 16,
  },
  {
    id: "8",
    name: "Revenue Max",
    plan: "ENTERPRISE",
    status: "active",
    ip: "234.100.200",
    countryCode: "NL",
    nextBillingDate: "12 June",
    description:
      "Revenue maximization suite tracker for Netherlands operations. Tracks ROAS, LTV, and cross-channel attribution in real time.",
    usersCount: 43,
  },
];
