"use client";

import { useTranslations } from "next-intl";
import useSWR from "swr";
import { getBillingHistory } from "../actions";
import { StatusBadge } from "./status-badge";

const COLUMNS = [
  { key: "date", width: "w-[170px] shrink-0" },
  { key: "tracker", width: "min-w-[140px] flex-[2]" },
  { key: "amount", width: "w-[160px] shrink-0" },
  { key: "status", width: "w-[150px] shrink-0" },
  { key: "description", width: "min-w-[120px] flex-[2]" },
] as const;

export function BillingSection() {
  const t = useTranslations("Settings");
  const { data: transactions = [] } = useSWR("billing", getBillingHistory);

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
          {transactions.map((tx) => (
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
