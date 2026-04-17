"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCallback, useState, useTransition } from "react";
import { AuthCheckbox } from "@/components/auth/auth-checkbox";
import { AuthInput } from "@/components/auth/auth-input";
import { PasswordRules } from "@/components/auth/password-rules";
import { Divider, SocialButtons } from "@/components/auth/social-buttons";
import { Toast, type ToastData } from "@/components/auth/toast";
import { useRouter } from "@/i18n/navigation";
import { register } from "./actions";

export default function RegisterPage() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isPending, startTransition] = useTransition();

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

    startTransition(async () => {
      const result = await register(email, password);
      if (result.ok) {
        setToast({
          type: "success",
          title: t("successRegister"),
          description: t("successRegisterDesc"),
        });
        setTimeout(() => router.push("/profile"), 1000);
      } else {
        setToast({
          type: "error",
          title: t("errorRegister"),
          description: result.error.message,
        });
      }
    });
  };

  return (
    <>
      <Toast toast={toast} onClose={clearToast} />

      <div className="text-center mb-2 h-md:mb-4 h-lg:mb-6 animate-fade-in animate-duration-500">
        <h1 className="text-[26px] h-md:text-[32px] h-lg:text-[42px] font-bold text-text-primary leading-tight">
          {t("registerTitle")}
        </h1>
        <p className="text-[13px] h-md:text-[15px] h-lg:text-[18px] text-text-primary mt-1.5 h-lg:mt-3">
          {t("registerSubtitle")}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="auth-form flex flex-col gap-2 h-md:gap-2.5 h-lg:gap-4"
      >
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

        <div className="flex flex-col gap-1.5">
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

        <div>
          <AuthCheckbox
            checked={agreed}
            error={errors.agreed}
            onChange={(checked) => {
              setAgreed(checked);
              setErrors((prev) => ({ ...prev, agreed: false }));
            }}
            label={
              <span>
                {t("agreeWith")}{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  {t("termsLink")}
                </Link>
              </span>
            }
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-0.5 h-md:mt-1 h-lg:mt-2 h-9 h-md:h-10 h-lg:h-12 w-full rounded-full bg-primary cursor-pointer text-[13px] h-lg:text-[14px] font-medium tracking-[0.5px] text-surface hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {t("registerButton")}
        </button>

        <Divider label={t("or")} />
        <SocialButtons />

        <p className="mt-0.5 h-lg:mt-2 text-center text-[13px] h-lg:text-[14px] text-text-muted">
          {t("hasAccount")}{" "}
          <Link
            href="/auth/login"
            className="text-primary font-medium hover:underline"
          >
            {t("loginLink")}
          </Link>
        </p>
      </form>
    </>
  );
}
