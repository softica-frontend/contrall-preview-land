"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { BillingSection } from "./components/billing-section";
import { PersonalInfoSection } from "./components/personal-info-section";
import { PrivacySection } from "./components/privacy-section";
import { SettingsMobileNav } from "./components/settings-mobile-nav";
import { SettingsSidebar } from "./components/settings-sidebar";

const VALID_SECTIONS = ["personal", "privacy", "billing"] as const;
type Section = (typeof VALID_SECTIONS)[number];

function isValidSection(value: string | null): value is Section {
  return VALID_SECTIONS.includes(value as Section);
}

function SettingsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sectionParam = searchParams.get("section");
  const activeSection: Section = isValidSection(sectionParam)
    ? sectionParam
    : "personal";

  const setActiveSection = (section: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("section", section);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="px-4 py-6 lg:flex lg:h-[calc(100dvh-92px)] lg:items-start lg:justify-center lg:overflow-hidden lg:py-8 xl:h-[calc(100dvh-107px)]">
      <div className="flex w-full flex-col gap-4 lg:h-full lg:max-w-[1366px] lg:flex-row lg:items-start lg:gap-6">
        <SettingsSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <SettingsMobileNav
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <div className="min-w-0 flex-1 lg:h-full lg:min-h-0">
          {activeSection === "personal" && <PersonalInfoSection />}
          {activeSection === "privacy" && <PrivacySection />}
          {activeSection === "billing" && <BillingSection />}
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense>
      <SettingsContent />
    </Suspense>
  );
}
