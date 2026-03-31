"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { AuthCheckbox } from "@/components/auth/auth-checkbox";
import { AuthInput } from "@/components/auth/auth-input";
import { PasswordRules } from "@/components/auth/password-rules";
import { Divider, SocialButtons } from "@/components/auth/social-buttons";
import { Toast, type ToastData } from "@/components/auth/toast";

export default function RegisterPage() {
  const t = useTranslations("Auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const clearToast = useCallback(() => setToast(null), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = true;
    }
    if (password.length < 8) {
      newErrors.password = true;
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = true;
    }
    if (!agreed) {
      newErrors.agreed = true;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setToast({
        type: "error",
        title: t("errorRegister"),
        description: t("errorRegisterDesc"),
      });
      return;
    }

    setToast({
      type: "success",
      title: t("successRegister"),
      description: t("successRegisterDesc"),
    });
  };

  return (
    <>
      <Toast toast={toast} onClose={clearToast} />

      <div className="text-center mb-8">
        <h1 className="text-[42px] font-bold text-[#1D2939] leading-tight">
          {t("registerTitle")}
        </h1>
        <p className="text-[18px] text-[#1D2939] mt-3">
          {t("registerSubtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthInput
          label={t("email")}
          type="email"
          placeholder={t("emailPlaceholder")}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: false }));
          }}
          error={errors.email}
          aria-invalid={!!errors.email}
        />

        <div className="flex flex-col gap-2">
          <AuthInput
            label={t("password")}
            type="password"
            placeholder={t("passwordPlaceholder")}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: false }));
            }}
            error={errors.password}
            aria-invalid={!!errors.password}
          />
          <PasswordRules
            password={password}
            labels={[t("rule8chars"), t("ruleUppercase"), t("ruleDigit")]}
          />
        </div>

        <AuthInput
          label={t("confirmPassword")}
          type="password"
          placeholder={t("confirmPasswordPlaceholder")}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setErrors((prev) => ({ ...prev, confirmPassword: false }));
          }}
          error={errors.confirmPassword}
          aria-invalid={!!errors.confirmPassword}
        />

        <div className="mt-1">
          <AuthCheckbox
            checked={agreed}
            onChange={(checked) => {
              setAgreed(checked);
              setErrors((prev) => ({ ...prev, agreed: false }));
            }}
            label={
              <span>
                {t("agreeWith")}{" "}
                <Link href="/terms" className="text-[#2575FF] hover:underline">
                  {t("termsLink")}
                </Link>
              </span>
            }
          />
        </div>

        <button
          type="submit"
          className="mt-2 h-12 w-full rounded-full bg-[#2575FF] cursor-pointer text-[14px] font-medium tracking-[0.5px] text-[#FCFCFD] hover:bg-[#1a63e0] transition-colors"
        >
          {t("registerButton")}
        </button>

        <Divider label={t("or")} />
        <SocialButtons />

        <p className="mt-2 text-center text-[14px] text-[#475467]">
          {t("hasAccount")}{" "}
          <Link
            href="/auth/login"
            className="text-[#2575FF] font-medium hover:underline"
          >
            {t("loginLink")}
          </Link>
        </p>
      </form>
    </>
  );
}
