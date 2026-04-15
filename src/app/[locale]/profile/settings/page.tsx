"use client";

import { useState } from "react";
import { BillingSection } from "./components/billing-section";
import { PersonalInfoSection } from "./components/personal-info-section";
import { PrivacySection } from "./components/privacy-section";
import { SettingsMobileNav } from "./components/settings-mobile-nav";
import { SettingsSidebar } from "./components/settings-sidebar";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("personal");

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
