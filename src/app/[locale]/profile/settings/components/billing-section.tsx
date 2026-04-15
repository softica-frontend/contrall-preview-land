"use client";

import { useTranslations } from "next-intl";
import { StatusBadge } from "./status-badge";

interface Transaction {
  date: string;
  time: string;
  tracker: string;
  amount: string;
  statusKey: string;
  descriptionKey: string;
}

const MOCK_DATA: Transaction[] = [
  {
    date: "28.03.2026",
    time: "14:32",
    tracker: "Contrall Pro",
    amount: "$99.00",
    statusKey: "completed",
    descriptionKey: "monthlySubscription",
  },
  {
    date: "28.02.2026",
    time: "14:30",
    tracker: "Contrall Pro",
    amount: "$99.00",
    statusKey: "completed",
    descriptionKey: "monthlySubscription",
  },
  {
    date: "28.01.2026",
    time: "14:28",
    tracker: "Contrall Pro",
    amount: "$99.00",
    statusKey: "completed",
    descriptionKey: "monthlySubscription",
  },
  {
    date: "28.12.2025",
    time: "09:15",
    tracker: "Contrall Pro",
    amount: "$99.00",
    statusKey: "completed",
    descriptionKey: "monthlySubscription",
  },
  {
    date: "15.12.2025",
    time: "11:42",
    tracker: "Contrall Pro",
    amount: "$29.00",
    statusKey: "completed",
    descriptionKey: "additionalDomain",
  },
  {
    date: "28.11.2025",
    time: "14:30",
    tracker: "Contrall Pro",
    amount: "$99.00",
    statusKey: "completed",
    descriptionKey: "monthlySubscription",
  },
  {
    date: "28.10.2025",
    time: "14:33",
    tracker: "Contrall Pro",
    amount: "$99.00",
    statusKey: "completed",
    descriptionKey: "monthlySubscription",
  },
  {
    date: "28.09.2025",
    time: "10:05",
    tracker: "Contrall Starter",
    amount: "$49.00",
    statusKey: "completed",
    descriptionKey: "monthlySubscription",
  },
  {
    date: "15.09.2025",
    time: "16:20",
    tracker: "Contrall Pro",
    amount: "$99.00",
    statusKey: "cancelled",
    descriptionKey: "refundCancellation",
  },
  {
    date: "28.08.2025",
    time: "14:30",
    tracker: "Contrall Starter",
    amount: "$49.00",
    statusKey: "completed",
    descriptionKey: "monthlySubscription",
  },
  {
    date: "10.08.2025",
    time: "08:45",
    tracker: "Contrall Starter",
    amount: "$49.00",
    statusKey: "resolved",
    descriptionKey: "refund",
  },
  {
    date: "28.07.2025",
    time: "14:31",
    tracker: "Contrall Starter",
    amount: "$49.00",
    statusKey: "completed",
    descriptionKey: "monthlySubscription",
  },
  {
    date: "28.06.2025",
    time: "14:29",
    tracker: "Contrall Starter",
    amount: "$49.00",
    statusKey: "completed",
    descriptionKey: "monthlySubscription",
  },
  {
    date: "01.06.2025",
    time: "12:00",
    tracker: "Contrall Starter",
    amount: "$0.00",
    statusKey: "completed",
    descriptionKey: "trialPeriod",
  },
];

const COLUMNS = [
  { key: "date", width: "w-[170px] shrink-0" },
  { key: "tracker", width: "min-w-[140px] flex-[2]" },
  { key: "amount", width: "w-[160px] shrink-0" },
  { key: "status", width: "w-[150px] shrink-0" },
  { key: "description", width: "min-w-[120px] flex-[2]" },
] as const;

export function BillingSection() {
  const t = useTranslations("Settings");

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border-light bg-surface p-4 lg:h-full lg:max-h-full lg:p-6">
      <h2 className="mb-4 shrink-0 font-roboto text-2xl font-bold leading-tight text-text-heading md:text-[32px]">
        {t("billing.title")}
      </h2>

      <div className="overflow-x-auto lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
        {/* Header */}
        <div className="shrink-0 border-b border-border-light bg-surface lg:sticky lg:top-0 lg:z-10">
          <div className="flex h-9 min-w-[700px]">
            {COLUMNS.map((col) => (
              <div
                key={col.key}
                className={`flex items-center px-2 ${col.width}`}
              >
                <span className="whitespace-nowrap font-roboto text-[14px] leading-[1.4] text-text-subtle">
                  {t(`billing.${col.key}`)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
          {MOCK_DATA.map((tx) => (
            <div
              key={`${tx.date}-${tx.time}-${tx.tracker}`}
              className="flex h-12 min-w-[700px] border-b border-border-light last:border-b-0"
            >
              <div className="flex w-[170px] shrink-0 flex-col justify-center px-2">
                <div className="font-roboto text-[14px] leading-[1.4] text-text-body">
                  {tx.date}
                </div>
                <div className="font-roboto text-[12px] leading-[1.4] text-text-subtle">
                  {tx.time}
                </div>
              </div>
              <div className="flex min-w-[140px] flex-[2] items-center truncate px-2 font-roboto text-[14px] leading-[1.4] text-text-body">
                {tx.tracker}
              </div>
              <div className="flex w-[160px] shrink-0 items-center px-2 font-roboto text-[14px] leading-[1.4] text-success">
                {tx.amount}
              </div>
              <div className="flex w-[150px] shrink-0 items-center px-2">
                <StatusBadge statusKey={tx.statusKey} />
              </div>
              <div className="flex min-w-[120px] flex-[2] items-center truncate px-2 font-roboto text-[14px] leading-[1.4] text-text-body">
                {t(`billing.descriptions.${tx.descriptionKey}`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
