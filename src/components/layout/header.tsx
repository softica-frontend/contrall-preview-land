"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { UserCircleIcon } from "@/components/icons/header-icons";
import { Logomark, LogoText } from "@/components/icons/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavTabs } from "@/components/layout/nav-tabs";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

const NAV_IDS = [
  "product",
  "integrations",
  "pricing",
  "about",
  "contacts",
] as const;

export function Header() {
  const t = useTranslations("Header");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(NAV_IDS[0]);
  const [mobileVisible, setMobileVisible] = useState(true);

  const lastY = useRef(0);
  const ticking = useRef(false);
  const sectionEls = useRef<Map<string, HTMLElement>>(new Map());

  // Cache section DOM elements once
  useEffect(() => {
    const map = new Map<string, HTMLElement>();
    for (const id of NAV_IDS) {
      const el = document.getElementById(id);
      if (el) map.set(id, el);
    }
    sectionEls.current = map;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;

        // Mobile show/hide — only update state when value changes
        const visible = y < 10 || y < lastY.current;
        setMobileVisible((prev) => (prev === visible ? prev : visible));
        lastY.current = y;

        // Active section
        let closest: string | null = null;
        let closestDist = Infinity;

        sectionEls.current.forEach((el, id) => {
          const top = el.getBoundingClientRect().top - 100;
          if (top <= 0 && -top < closestDist) {
            closestDist = -top;
            closest = id;
          }
        });

        if (closest) {
          setActiveSection((prev) => (prev === closest ? prev : closest!));
        }

        ticking.current = false;
      });
    };

    // Initial run
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const scrollTo = useCallback((id: string) => {
    setMobileMenuOpen(false);

    // Instantly reveal all SectionReveal elements that we'll skip past
    // so they don't animate as we jump through them
    const target = document.getElementById(id);
    if (!target) return;

    const reveals = document.querySelectorAll<HTMLElement>(
      '[data-visible="false"]',
    );
    const targetRect = target.getBoundingClientRect();

    for (const el of reveals) {
      // Skip the target section itself — let it animate normally
      if (target.contains(el) || el.contains(target)) continue;
      // Reveal everything above or at the target
      const elRect = el.getBoundingClientRect();
      if (elRect.top < targetRect.bottom) {
        el.dataset.visible = "true";
      }
    }

    target.scrollIntoView({ behavior: "instant" });
  }, []);

  const toggleMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Desktop Header (≥768px) */}
      <div className="hidden items-center justify-between px-[16px] py-[16px] backdrop-blur-md md:flex lg:px-[40px] xl:px-[80px]">
        <button
          type="button"
          aria-label="Go to homepage"
          onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
          className="animate-fade-in-down animate-fill-mode-both animate-duration-500 relative flex h-[50px] w-[155px] shrink-0 cursor-pointer items-center lg:h-[60px] lg:w-[186px] xl:h-[75px] xl:w-[233px] hover:opacity-80 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2575ff] focus-visible:ring-offset-2 rounded-lg"
        >
          <div className="absolute inset-[14.75%_4.67%] flex items-center gap-[6px]">
            <Logomark className="h-full w-auto shrink-0 text-[#1d2939]" />
            <LogoText className="h-[60%] w-auto" />
          </div>
        </button>

        <NavTabs
          activeSection={activeSection}
          onNavigate={scrollTo}
          navItems={NAV_IDS}
          className="animate-fade-in animate-fill-mode-both animate-duration-700 animate-delay-200"
        />

        <div className="animate-fade-in-down animate-fill-mode-both animate-duration-500 animate-delay-100 flex items-center">
          <a
            href="/auth/register"
            className="flex shrink-0 items-center justify-center whitespace-nowrap rounded-[1000px] bg-[#2370e8] px-[12px] py-[10px] text-[12px] font-medium leading-none tracking-[0.5px] text-white transition-colors hover:bg-[#1a63e0] lg:px-[16px] lg:py-[12px] lg:text-[14px] xl:px-[20px] xl:py-[14px] xl:text-[16px]"
          >
            <span className="lg:hidden">{t("loginShort")}</span>
            <span className="hidden lg:inline">{t("login")}</span>
          </a>
          <LanguageSwitcher className="hidden lg:block" />
        </div>
      </div>

      {/* Mobile Header (<768px) */}
      <div
        className={`flex items-center justify-between px-[16px] pb-[12px] pt-[16px] backdrop-blur-md transition-transform duration-300 will-change-transform md:hidden ${
          mobileVisible || mobileMenuOpen
            ? "translate-y-0"
            : "-translate-y-[200%]"
        }`}
      >
        <div className="animate-fade-in-down animate-fill-mode-both animate-duration-500 flex flex-1 items-start">
          <button
            type="button"
            aria-label="Go to homepage"
            onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
            className="relative flex h-[75px] w-[81px] shrink-0 cursor-pointer items-center hover:opacity-80 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2575ff] focus-visible:ring-offset-2 rounded-lg"
          >
            <div className="absolute inset-[14.75%_13.72%]">
              <Logomark className="size-full text-[#1d2939]" />
            </div>
          </button>
        </div>

        <MobileMenu
          isOpen={mobileMenuOpen}
          onToggle={toggleMenu}
          onNavigate={scrollTo}
          navItems={NAV_IDS}
        />

        <div className="animate-fade-in-down animate-fill-mode-both animate-duration-500 animate-delay-100 flex flex-1 items-center justify-end">
          <button
            type="button"
            aria-label="Личный кабинет"
            className="flex size-[50px] items-center justify-center rounded-full bg-[#2575ff] hover:opacity-70 transition-opacity duration-200"
          >
            <UserCircleIcon />
          </button>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
