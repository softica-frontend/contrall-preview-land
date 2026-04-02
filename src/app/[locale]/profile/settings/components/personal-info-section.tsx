"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { MainInput } from "@/components/ui/main-input";
import { SettingsActionButtons } from "./settings-action-buttons";
import { SettingsCard } from "./settings-card";
import { SettingsFormField } from "./settings-form-field";
import { TimezoneSelect } from "./timezone-select";

const DEFAULT_TIMEZONE = "UTC+2";

export function PersonalInfoSection() {
  const t = useTranslations("Settings");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [timezone, setTimezone] = useState(DEFAULT_TIMEZONE);

  useEffect(() => {
    const storedEmail = localStorage.getItem("auth_email") ?? "";
    setEmail(storedEmail);
    setCurrentEmail(storedEmail);
  }, []);

  const hasChanges =
    name !== "" || currentEmail !== email || timezone !== DEFAULT_TIMEZONE;

  const handleCancel = () => {
    setName("");
    setCurrentEmail(email);
    setTimezone(DEFAULT_TIMEZONE);
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
        onSave={() => {}}
        disabled={!hasChanges}
      />
    </SettingsCard>
  );
}
