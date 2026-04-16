"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCallback, useState, useTransition } from "react";
import { AuthCheckbox } from "@/components/auth/auth-checkbox";
import { AuthInput } from "@/components/auth/auth-input";
import { Divider, SocialButtons } from "@/components/auth/social-buttons";
import { Toast, type ToastData } from "@/components/auth/toast";
import { useRouter } from "@/i18n/navigation";
import { login } from "./actions";

export default function LoginPage() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
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

    startTransition(async () => {
      const result = await login(email, password);
      if (result.ok) {
        setToast({
          type: "success",
          title: t("successLogin"),
          description: t("successLoginDesc"),
        });
        setTimeout(() => router.push("/profile"), 1000);
      }
    });
  };

  return (
    <>
      <Toast toast={toast} onClose={clearToast} />

      <div className="text-center mb-3 h-md:mb-5 h-lg:mb-8 animate-fade-in animate-duration-500">
        <h1 className="text-[28px] h-md:text-[36px] h-lg:text-[42px] font-bold text-text-primary leading-tight">
          {t("loginTitle")}
        </h1>
        <p className="text-[14px] h-md:text-[16px] h-lg:text-[18px] text-text-primary mt-2 h-lg:mt-3">
          {t("loginSubtitle")}
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
            className="text-[14px] text-primary font-medium hover:underline"
          >
            {t("forgotPassword")}
          </Link>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-1 h-lg:mt-2 h-10 h-lg:h-12 w-full rounded-full bg-primary cursor-pointer text-[13px] h-lg:text-[14px] font-medium tracking-[0.5px] text-surface hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {t("loginButton")}
        </button>

        <Divider label={t("or")} />
        <SocialButtons />

        <p className="mt-2 text-center text-[14px] text-text-muted">
          {t("noAccount")}{" "}
          <Link
            href="/auth/register"
            className="text-primary font-medium hover:underline"
          >
            {t("registerLink")}
          </Link>
        </p>
      </form>
    </>
  );
}
