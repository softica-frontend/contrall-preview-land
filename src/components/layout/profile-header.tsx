"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, HamburgerIcon } from "@/components/icons/header-icons";
import { Logomark, LogoText } from "@/components/icons/logo";
import { LogoutIcon } from "@/components/icons/profile-icons";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Modal } from "@/components/ui/modal";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

const NAV_ITEMS = [
  { href: "/profile/my-trackers", key: "my-trackers" },
  { href: "/profile/settings", key: "settings" },
] as const;

export function ProfileHeader() {
  const t = useTranslations("Profile");
  const tHeader = useTranslations("Header");
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      closeButtonRef.current?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [menuOpen]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setMenuOpen(false);
      return;
    }
    if (e.key !== "Tab") return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    const focusable = overlay.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_email");
    router.push("/auth/login");
  };

  const handleLogoutConfirm = () => {
    setLogoutConfirmOpen(false);
    handleLogout();
  };

  const overlay = (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      onKeyDown={handleKeyDown}
      className={`fixed inset-0 z-100 flex flex-col items-center gap-[32px] overflow-y-auto px-[24px] pb-[32px] pt-[32px] transition-[transform,opacity] duration-300 ease-out md:hidden ${
        menuOpen
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      }`}
      style={{
        background:
          "linear-gradient(180deg, #e8eeff 0%, #edeefa 30%, #f4f2fd 60%, #fcfcfd 100%)",
      }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        aria-label={tHeader("closeMenu")}
        onClick={() => setMenuOpen(false)}
        className="flex size-[44px] items-center justify-center rounded-full bg-primary text-surface outline-none transition-opacity duration-200 hover:opacity-70"
      >
        <CloseIcon />
      </button>

      <span
        className="flex h-[44px] items-center justify-center rounded-[1000px] px-[24px] py-[8px] text-[14px] font-medium leading-none tracking-[0.5px] text-primary"
        style={{
          background: "rgba(252,252,253,0.5)",
          boxShadow:
            "inset -0.5px -1px 1px 0px rgba(37,117,255,0.8), inset 0.5px 1px 1px 0px rgba(37,117,255,0.8)",
        }}
      >
        {tHeader("menu")}
      </span>

      <nav className="flex w-full flex-col gap-[16px]">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className={`cursor-pointer text-center text-[18px] leading-[1.4] transition-colors hover:text-primary active:text-primary-hover ${
              pathname === item.href ? "text-primary" : "text-text-primary"
            }`}
          >
            {t(`nav.${item.key}`)}
          </Link>
        ))}
      </nav>
    </div>
  );

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
                className={`relative flex h-[32px] items-center justify-center whitespace-nowrap px-[6px] py-[4px] font-inter text-[12px] font-medium leading-none transition-colors duration-200 hover:text-primary lg:px-[8px] lg:text-[13px] xl:px-[12px] xl:text-[14px] ${
                  isActive ? "text-primary" : "text-text-heading"
                }`}
              >
                {t(`nav.${item.key}`)}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setLogoutConfirmOpen(true)}
            aria-label={t("logout")}
            className="flex size-[40px] cursor-pointer items-center justify-center rounded-xl border border-border-light text-text-subtle transition-colors duration-200 hover:border-[#DA1E28] hover:text-[#DA1E28]"
          >
            <LogoutIcon size={20} />
          </button>
        </div>
      </div>

      {/* Mobile (<768px) */}
      <div className="flex items-center justify-between px-[16px] pb-[16px] pt-[16px] backdrop-blur-md md:hidden">
        <div className="relative flex h-[75px] w-[81px] shrink-0 items-center">
          <div className="absolute inset-[14.75%_13.72%]">
            <Logomark className="size-full text-[#1d2939]" />
          </div>
        </div>

        <div className="flex flex-1 justify-center">
          <button
            ref={triggerRef}
            type="button"
            aria-label={tHeader("openMenu")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="flex h-[32px] items-center justify-center px-[16px] transition-opacity duration-200 hover:opacity-70"
          >
            <HamburgerIcon />
          </button>
        </div>

        <LanguageSwitcher />
      </div>

      {mounted && createPortal(overlay, document.body)}

      <Modal.Confirm
        open={logoutConfirmOpen}
        onClose={() => setLogoutConfirmOpen(false)}
        onConfirm={handleLogoutConfirm}
        title={t("logoutConfirm.title")}
        message={t("logoutConfirm.message")}
        confirmLabel={t("logoutConfirm.confirm")}
        cancelLabel={t("logoutConfirm.cancel")}
      />
    </header>
  );
}
