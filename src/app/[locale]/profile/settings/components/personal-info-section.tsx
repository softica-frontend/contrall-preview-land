"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import useSWR from "swr";
import { MainInput } from "@/components/ui/main-input";
import { getProfileInfo, updateProfileInfo } from "../actions";
import { SettingsActionButtons } from "./settings-action-buttons";
import { SettingsCard } from "./settings-card";
import { SettingsFormField } from "./settings-form-field";
import { TimezoneSelect } from "./timezone-select";

export function PersonalInfoSection() {
  const t = useTranslations("Settings");
  const { data, mutate } = useSWR("profile-info", getProfileInfo);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [timezone, setTimezone] = useState("UTC+2");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
      setTimezone(data.timezone);
    }
  }, [data]);

  const hasChanges =
    !!data &&
    (name !== data.name || email !== data.email || timezone !== data.timezone);

  const handleCancel = () => {
    if (!data) return;
    setName(data.name);
    setEmail(data.email);
    setTimezone(data.timezone);
  };

  const handleSave = () => {
    startTransition(async () => {
      await updateProfileInfo({ name, email, timezone });
      await mutate();
    });
  };

  return (
    <SettingsCard>
      <SettingsFormField label={t("personal.name")}>
        <MainInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("personal.name")}
          disabled={!data || isPending}
        />
      </SettingsFormField>

      <SettingsFormField label="Email">
        <MainInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@gmail.com"
          disabled={!data || isPending}
        />
      </SettingsFormField>

      <SettingsFormField label={t("personal.timezone")}>
        <TimezoneSelect value={timezone} onChange={setTimezone} />
      </SettingsFormField>

      <SettingsFormField label={t("personal.userSince")}>
        <span className="font-roboto text-[16px] leading-[1.4] text-text-subtle">
          {data?.userSince ?? "—"}
        </span>
      </SettingsFormField>

      <SettingsActionButtons
        cancelLabel={t("personal.cancel")}
        saveLabel={t("personal.save")}
        onCancel={handleCancel}
        onSave={handleSave}
        disabled={!hasChanges || isPending}
      />
    </SettingsCard>
  );
}
