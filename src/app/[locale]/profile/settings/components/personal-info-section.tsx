"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { MainInput } from "@/components/ui/main-input";
import { SettingsActionButtons } from "./settings-action-buttons";
import { SettingsCard } from "./settings-card";
import { SettingsFormField } from "./settings-form-field";
import { TimezoneSelect } from "./timezone-select";

interface PersonalInfoSectionProps {
  email: string;
}

export function PersonalInfoSection({ email }: PersonalInfoSectionProps) {
  const t = useTranslations("Settings");
  const [name, setName] = useState("");
  const [currentEmail, setCurrentEmail] = useState(email);
  const [timezone, setTimezone] = useState("UTC+2");

  const hasChanges =
    name !== "" || currentEmail !== email || timezone !== "UTC+2";

  const handleCancel = () => {
    setName("");
    setCurrentEmail(email);
    setTimezone("UTC+2");
  };

  return (
    <SettingsCard>
      <SettingsFormField label={t("personal.name")}>
        <MainInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("personal.name")}
        />
      </SettingsFormField>

      <SettingsFormField label="Email">
        <MainInput
          type="email"
          value={currentEmail}
          onChange={(e) => setCurrentEmail(e.target.value)}
          placeholder="email@gmail.com"
        />
      </SettingsFormField>

      <SettingsFormField label={t("personal.timezone")}>
        <TimezoneSelect value={timezone} onChange={setTimezone} />
      </SettingsFormField>

      <SettingsFormField label={t("personal.userSince")}>
        <span className="font-roboto text-[16px] leading-[1.4] text-[#667085]">
          24 {t("personal.october")} 2025
        </span>
      </SettingsFormField>

      <SettingsActionButtons
        cancelLabel={t("personal.cancel")}
        saveLabel={t("personal.save")}
        onCancel={handleCancel}
        disabled={!hasChanges}
      />
    </SettingsCard>
  );
}
