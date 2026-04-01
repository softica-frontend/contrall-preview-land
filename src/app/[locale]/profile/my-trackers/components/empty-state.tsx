"use client";

import { useTranslations } from "next-intl";

interface EmptyStateProps {
  onAdd: () => void;
}

export function EmptyState({ onAdd }: EmptyStateProps) {
  const t = useTranslations("MyTrackers");

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-36">
      {/* Nested bordered plus icon */}
      <div className="p-6">
        <div className="rounded-xl border border-[#E4E7EC] p-6">
          <div className="rounded-xl border border-[#D0D5DD] p-6">
            <div className="flex size-[66px] items-center justify-center rounded-xl border border-[#D0D5DD]">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#D0D5DD"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[16px] leading-[1.4] text-black">
        {t("emptyMessage")}
      </p>

      <button
        type="button"
        onClick={onAdd}
        className="flex h-[44px] cursor-pointer items-center gap-1 rounded-full bg-[#2575FF] px-3.5 py-[7px] text-[14px] font-medium leading-none tracking-[0.5px] text-[#FCFCFD] transition-colors duration-200 hover:bg-[#1a63e0]"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        {t("add")}
      </button>
    </div>
  );
}
