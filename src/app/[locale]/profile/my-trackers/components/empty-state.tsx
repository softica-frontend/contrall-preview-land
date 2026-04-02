"use client";

import { useTranslations } from "next-intl";
import { PlusIcon } from "@/components/icons/profile-icons";

interface EmptyStateProps {
  onAdd: () => void;
}

export function EmptyState({ onAdd }: EmptyStateProps) {
  const t = useTranslations("MyTrackers");

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-36">
      {/* Nested bordered plus icon */}
      <div className="p-6">
        <div className="rounded-xl border border-border-light p-6">
          <div className="rounded-xl border border-border p-6">
            <div className="flex size-[66px] items-center justify-center rounded-xl border border-border">
              <PlusIcon size={32} className="stroke-[#D0D5DD]" />
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
        className="flex h-[44px] cursor-pointer items-center gap-1 rounded-full bg-primary px-3.5 py-[7px] text-[14px] font-medium leading-none tracking-[0.5px] text-surface transition-colors duration-200 hover:bg-primary-hover"
      >
        <PlusIcon size={18} />
        {t("add")}
      </button>
    </div>
  );
}
