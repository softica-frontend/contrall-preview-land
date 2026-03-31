"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { AuthCheckbox } from "@/components/auth/auth-checkbox";
import { AuthInput } from "@/components/auth/auth-input";
import { Divider, SocialButtons } from "@/components/auth/social-buttons";
import { Toast, type ToastData } from "@/components/auth/toast";
import { useRouter } from "@/i18n/navigation";

export default function LoginPage() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const clearToast = useCallback(() => setToast(null), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = true;
    }
    if (!password) {
      newErrors.password = true;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setToast({
        type: "error",
        title: t("errorLogin"),
        description: t("errorLoginDesc"),
      });
      return;
    }

    localStorage.setItem("auth_token", "mock-token");
    localStorage.setItem("auth_email", email);

    setToast({
      type: "success",
      title: t("successLogin"),
      description: t("successLoginDesc"),
    });

    setTimeout(() => router.push("/profile"), 1000);
  };

  return (
    <>
      <Toast toast={toast} onClose={clearToast} />

      <div className="text-center mb-8">
        <h1 className="text-[42px] font-bold text-[#1D2939] leading-tight">
          {t("loginTitle")}
        </h1>
        <p className="text-[18px] text-[#1D2939] mt-3">{t("loginSubtitle")}</p>
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

        <div className="flex items-center justify-between">
          <AuthCheckbox
            checked={remember}
            onChange={setRemember}
            label={t("rememberMe")}
          />
          <Link
            href="/auth/forgot-password"
            className="text-[14px] text-[#2575FF] font-medium hover:underline"
          >
            {t("forgotPassword")}
          </Link>
        </div>

        <button
          type="submit"
          className="mt-2 h-12 w-full rounded-full bg-[#2575FF] cursor-pointer text-[14px] font-medium tracking-[0.5px] text-[#FCFCFD] hover:bg-[#1a63e0] transition-colors"
        >
          {t("loginButton")}
        </button>

        <Divider label={t("or")} />
        <SocialButtons />

        <p className="mt-2 text-center text-[14px] text-[#475467]">
          {t("noAccount")}{" "}
          <Link
            href="/auth/register"
            className="text-[#2575FF] font-medium hover:underline"
          >
            {t("registerLink")}
          </Link>
        </p>
      </form>
    </>
  );
}
