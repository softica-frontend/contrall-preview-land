"use client";

import { useEffect, useState } from "react";
import { BillingSection } from "./components/billing-section";
import { PersonalInfoSection } from "./components/personal-info-section";
import { PrivacySection } from "./components/privacy-section";
import { SettingsSidebar } from "./components/settings-sidebar";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("personal");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("auth_email") ?? "");
  }, []);

  return (
    <div className="flex h-full w-full max-w-[1366px] items-start gap-6 overflow-hidden">
      <SettingsSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="h-full min-h-0 min-w-0 flex-1">
        {activeSection === "personal" && <PersonalInfoSection email={email} />}
        {activeSection === "privacy" && <PrivacySection />}
        {activeSection === "billing" && <BillingSection />}
      </div>
    </div>
  );
}
