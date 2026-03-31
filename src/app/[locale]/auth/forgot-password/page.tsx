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

      <div className="text-center mb-8">
        <h1 className="text-[42px] font-bold text-[#1D2939] leading-tight">
          {t("forgotTitle")}
        </h1>
        <p className="text-[18px] text-[#1D2939] mt-3">{t("forgotSubtitle")}</p>
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
        />

        <button
          type="submit"
          className="mt-2 h-12 w-full rounded-full bg-[#2575FF] cursor-pointer text-[14px] font-medium tracking-[0.5px] text-[#FCFCFD] hover:bg-[#1a63e0] transition-colors"
        >
          {t("forgotButton")}
        </button>

        <p className="mt-2 text-center text-[14px] text-[#475467]">
          {t("rememberedPassword")}{" "}
          <Link
            href="/auth/login"
            className="text-[#2575FF] font-medium hover:underline"
          >
            {t("loginLinkShort")}
          </Link>
        </p>
      </form>
    </>
  );
}
