import { getTranslations } from "next-intl/server";
import { UserCircleIcon } from "@/components/icons/header-icons";
import { Logomark, LogoText } from "@/components/icons/logo";
import { HeaderProvider } from "@/components/layout/header-provider";
import { MobileHeader } from "@/components/layout/mobile-header";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavTabs } from "@/components/layout/nav-tabs";
import { ScrollToTopButton } from "@/components/layout/scroll-to-top-button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Link } from "@/i18n/navigation";

export async function Header() {
  const t = await getTranslations("Header");

  return (
    <HeaderProvider>
      <header className="sticky top-0 z-50 w-full">
        {/* Desktop Header (≥768px) */}
        <div className="hidden items-center justify-between px-[16px] py-[16px] backdrop-blur-md md:flex lg:px-[40px] xl:px-[80px]">
          <ScrollToTopButton className="relative flex h-[50px] w-[155px] shrink-0 cursor-pointer items-center lg:h-[60px] lg:w-[186px] xl:h-[75px] xl:w-[233px] hover:opacity-80 transition-opacity duration-200 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2575ff] focus-visible:ring-offset-2 rounded-lg">
            <div className="absolute inset-[14.75%_4.67%] flex items-center gap-[6px]">
              <Logomark className="h-full w-auto shrink-0 text-[#1d2939]" />
              <LogoText className="h-[60%] w-auto" />
            </div>
          </ScrollToTopButton>

          <NavTabs className="animate-fade-in animate-fill-mode-both animate-duration-700 animate-delay-200" />

          <div className="animate-fade-in-down animate-fill-mode-both animate-duration-500 animate-delay-100 flex items-center">
            <Link
              href="/auth/register"
              className="flex shrink-0 items-center justify-center whitespace-nowrap rounded-[1000px] bg-primary-alt px-[12px] py-[10px] text-[12px] font-medium leading-none tracking-[0.5px] text-white transition-colors hover:bg-primary-hover lg:px-[16px] lg:py-[12px] lg:text-[14px] xl:px-[20px] xl:py-[14px] xl:text-[16px]"
            >
              <span className="lg:hidden">{t("loginShort")}</span>
              <span className="hidden lg:inline">{t("login")}</span>
            </Link>
            <LanguageSwitcher className="hidden lg:block" />
          </div>
        </div>

        {/* Mobile Header (<768px) */}
        <MobileHeader>
          <div className="flex flex-1 items-start">
            <ScrollToTopButton className="relative flex h-[75px] w-[81px] shrink-0 cursor-pointer items-center hover:opacity-80 transition-opacity duration-200 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2575ff] focus-visible:ring-offset-2 rounded-lg">
              <div className="absolute inset-[14.75%_13.72%]">
                <Logomark className="size-full text-[#1d2939]" />
              </div>
            </ScrollToTopButton>
          </div>

          <MobileMenu />

          <div className="animate-fade-in-down animate-fill-mode-both animate-duration-500 animate-delay-100 flex flex-1 items-center justify-end">
            <Link
              href="/auth/register"
              aria-label={t("account")}
              className="flex size-[50px] items-center justify-center rounded-full bg-primary hover:opacity-70 transition-opacity duration-200"
            >
              <UserCircleIcon />
            </Link>
            <LanguageSwitcher />
          </div>
        </MobileHeader>
      </header>
    </HeaderProvider>
  );
}
