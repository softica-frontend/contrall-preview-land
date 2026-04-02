"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { AuthInput } from "@/components/auth/auth-input";
import { Toast, type ToastData } from "@/components/auth/toast";

export default function ForgotPasswordPage() {
  const t = useTranslations("Auth");
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<ToastData | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const clearToast = useCallback(() => setToast(null), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = true;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setToast({
        type: "error",
        title: t("errorForgot"),
        description: t("errorForgotDesc"),
      });
      return;
    }

    setToast({
      type: "success",
      title: t("successForgot"),
      description: t("successForgotDesc"),
    });
  };

  return (
    <>
      <Toast toast={toast} onClose={clearToast} />

      <div className="text-center mb-3 h-md:mb-5 h-lg:mb-8 animate-fade-in animate-duration-500">
        <h1 className="text-[28px] h-md:text-[36px] h-lg:text-[42px] font-bold text-text-primary leading-tight">
          {t("forgotTitle")}
        </h1>
        <p className="text-[14px] h-md:text-[16px] h-lg:text-[18px] text-text-primary mt-2 h-lg:mt-3">
          {t("forgotSubtitle")}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="auth-form flex flex-col gap-2.5 h-md:gap-3 h-lg:gap-4"
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
        />

        <button
          type="submit"
          className="mt-1 h-lg:mt-2 h-10 h-lg:h-12 w-full rounded-full bg-primary cursor-pointer text-[13px] h-lg:text-[14px] font-medium tracking-[0.5px] text-surface hover:bg-primary-hover active:scale-[0.98] transition-all duration-200"
        >
          {t("forgotButton")}
        </button>

        <p className="mt-2 text-center text-[14px] text-text-muted">
          {t("rememberedPassword")}{" "}
          <Link
            href="/auth/login"
            className="text-primary font-medium hover:underline"
          >
            {t("loginLinkShort")}
          </Link>
        </p>
      </form>
    </>
  );
}
