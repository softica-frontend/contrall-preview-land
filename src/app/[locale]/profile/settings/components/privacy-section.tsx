"use client";

import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { MainInput } from "@/components/ui/main-input";
import { Link } from "@/i18n/navigation";
import { changePassword } from "../actions";
import { SettingsActionButtons } from "./settings-action-buttons";
import { SettingsCard } from "./settings-card";
import { SettingsFormField } from "./settings-form-field";

export function PrivacySection() {
  const t = useTranslations("Settings");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSave = () => {
    startTransition(async () => {
      await changePassword({ currentPassword, newPassword });
      handleCancel();
    });
  };

  const isDisabled =
    isPending ||
    !currentPassword ||
    !newPassword ||
    !confirmPassword ||
    newPassword !== confirmPassword;

  return (
    <SettingsCard>
      <SettingsFormField
        label={t("privacy.currentPassword")}
        rightContent={
          <Link
            href="/auth/forgot-password"
            className="flex h-7 shrink-0 items-center justify-center rounded-[40px] px-2.5 py-1 font-roboto text-[14px] font-medium tracking-[0.5px] text-primary transition-opacity hover:opacity-70"
          >
            {t("privacy.forgotPassword")}
          </Link>
        }
      >
        <MainInput
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="**************"
        />
      </SettingsFormField>

      <SettingsFormField label={t("privacy.newPassword")}>
        <MainInput
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder={t("privacy.newPasswordPlaceholder")}
        />
      </SettingsFormField>

      <SettingsFormField label={t("privacy.confirmPassword")}>
        <MainInput
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder={t("privacy.confirmPasswordPlaceholder")}
        />
      </SettingsFormField>

      <SettingsActionButtons
        cancelLabel={t("personal.cancel")}
        saveLabel={t("privacy.changeButton")}
        onCancel={handleCancel}
        onSave={handleSave}
        disabled={isDisabled}
      />
    </SettingsCard>
  );
}
