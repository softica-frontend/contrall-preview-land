"use client";

import { useTranslations } from "next-intl";
import { Logomark, LogoText } from "@/components/icons/logo";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

const NAV_ITEMS = [
  { href: "/profile/my-trackers", key: "my-trackers" },
  { href: "/profile/settings", key: "settings" },
] as const;

export function ProfileHeader() {
  const t = useTranslations("Profile");
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_email");
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Desktop (≥768px) */}
      <div className="hidden items-center justify-between px-[16px] py-[16px] backdrop-blur-md md:flex lg:px-[40px] xl:px-[80px]">
        <div className="relative flex h-[50px] w-[155px] shrink-0 items-center lg:h-[60px] lg:w-[186px] xl:h-[75px] xl:w-[233px]">
          <div className="absolute inset-[14.75%_4.67%] flex items-center gap-[6px]">
            <Logomark className="h-full w-auto shrink-0 text-[#1d2939]" />
            <LogoText className="h-[60%] w-auto" />
          </div>
        </div>

        <nav className="relative flex items-center gap-px rounded-[100px] p-[2px] lg:gap-[2px] xl:gap-[4px]">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`relative flex h-[32px] items-center justify-center whitespace-nowrap px-[6px] py-[4px] font-inter text-[12px] font-medium leading-none transition-colors duration-200 hover:text-[#2575ff] lg:px-[8px] lg:text-[13px] xl:px-[12px] xl:text-[14px] ${
                  isActive ? "text-[#2575ff]" : "text-[#0c111d]"
                }`}
              >
                {t(`nav.${item.key}`)}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#2575ff]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={handleLogout}
            aria-label={t("logout")}
            className="flex size-[40px] cursor-pointer items-center justify-center rounded-lg border border-[#D0D5DD] text-[#667085] hover:border-[#DA1E28] hover:text-[#DA1E28] transition-colors duration-200"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7.5 17.5H4.167A1.667 1.667 0 0 1 2.5 15.833V4.167A1.667 1.667 0 0 1 4.167 2.5H7.5M13.333 14.167 17.5 10l-4.167-4.167M17.5 10H7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile (<768px) */}
      <div className="flex items-center justify-between px-[16px] pb-[12px] pt-[16px] backdrop-blur-md md:hidden">
        <div className="relative flex h-[75px] w-[81px] shrink-0 items-center">
          <div className="absolute inset-[14.75%_13.72%]">
            <Logomark className="size-full text-[#1d2939]" />
          </div>
        </div>

        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`relative flex shrink-0 items-center justify-center whitespace-nowrap px-[10px] py-[8px] font-inter text-[13px] font-medium leading-none transition-colors duration-200 hover:text-[#2575ff] ${
                  isActive ? "text-[#2575ff]" : "text-[#0c111d]"
                }`}
              >
                {t(`nav.${item.key}`)}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#2575ff]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={handleLogout}
            aria-label={t("logout")}
            className="flex size-[36px] cursor-pointer items-center justify-center rounded-lg border border-[#D0D5DD] text-[#667085] hover:border-[#DA1E28] hover:text-[#DA1E28] transition-colors duration-200"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7.5 17.5H4.167A1.667 1.667 0 0 1 2.5 15.833V4.167A1.667 1.667 0 0 1 4.167 2.5H7.5M13.333 14.167 17.5 10l-4.167-4.167M17.5 10H7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
