"use client";

import { useTranslations } from "next-intl";

export default function SettingsPage() {
  const t = useTranslations("Profile");

  return (
    <div className="w-full max-w-[480px] rounded-2xl bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
      <h1 className="text-center text-[28px] font-bold text-[#1D2939]">
        {t("nav.settings")}
      </h1>
      <div className="mt-8 rounded-xl bg-[#F9FAFB] p-6">
        <p className="text-center text-[14px] text-[#667085]">
          {t("placeholder")}
        </p>
      </div>
    </div>
  );
}
