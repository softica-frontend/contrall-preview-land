import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  EmailIcon,
  NoCardIcon,
  TwoMinIcon,
} from "@/components/icons/cta-footer-icons";
import { CtaButton } from "@/components/sections/cta-footer/cta-button";
import { GlassOverlay } from "@/components/ui/glass-overlay";
import { GradientLabel } from "@/components/ui/gradient-label";
import { SectionReveal } from "@/components/ui/section-reveal";
import { CTA_CARD_GLASS_BG as CARD_GLASS_BG } from "@/components/ui/shadows";

const BENEFIT_ICONS = [NoCardIcon, TwoMinIcon, EmailIcon];

export async function CtaFooter() {
  const t = await getTranslations("CtaFooter");

  const benefits = [t("benefit1"), t("benefit2"), t("benefit3")];

  return (
    <section
      className="relative w-full overflow-hidden bg-bg-cta px-[8px] py-[16px] md:px-[40px] md:pb-[60px] md:pt-0 xl:px-[80px]"
    >
      {/* Decorative ellipse blurs (from Figma) */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[283px] w-[574px] -translate-x-1/2 -translate-y-1/2 mix-blend-lighten md:h-[545px] md:w-[2400px]"
        aria-hidden="true"
      >
        <div className="absolute inset-[-17.23%_-8.5%] md:inset-[-25.69%_-5.83%]">
          <Image
            src="/images/cta/ellipse-blur.svg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[283px] w-[574px] -translate-x-1/2 translate-y-1/2 mix-blend-lighten md:h-[545px] md:w-[2400px]"
        aria-hidden="true"
      >
        <div className="absolute inset-[-17.23%_-8.5%] md:inset-[-25.69%_-5.83%]">
          <Image
            src="/images/cta/ellipse-blur.svg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Glass content card */}
      <SectionReveal className="relative mx-auto flex w-full max-w-[1568px] flex-col items-center gap-[32px] rounded-[32px] border border-border-section px-[32px] py-[48px] text-center md:gap-[48px] md:rounded-[48px] md:px-[32px] md:py-[64px]">
        {/* Glass layers */}
        <GlassOverlay
          gradientSvg={CARD_GLASS_BG}
          insetShadow="inset -1px -2px 1px 0px rgba(252,252,253,0.8), inset 1px 2px 1px 0px rgba(252,252,253,0.8)"
        />

        {/* Section label + title */}
        <div className="animate-fade-in-up animate-fill-mode-both relative flex flex-col items-center gap-[16px] md:gap-[8px]">
          <GradientLabel className="text-[16px] md:text-[20px]">
            {t("sectionLabel")}
          </GradientLabel>
          {/* Desktop title */}
          <h2 className="hidden whitespace-pre-line text-[42px] font-bold leading-[1.1] text-text-heading md:block xl:text-[54px]">
            {t("title")}
          </h2>
          {/* Mobile title */}
          <h2 className="whitespace-pre-line text-[32px] font-bold leading-[1.1] text-text-heading md:hidden">
            {t("titleMobile")}
          </h2>
        </div>

        {/* Subtitle */}
        <p className="animate-fade-in animate-fill-mode-both animate-delay-150 relative hidden whitespace-pre-line text-[18px] leading-[1.4] text-text-secondary md:block">
          {t("subtitle")}
        </p>
        <p className="animate-fade-in animate-fill-mode-both animate-delay-150 relative whitespace-pre-line text-[14px] leading-[1.4] text-text-secondary md:hidden">
          {t("subtitleMobile")}
        </p>

        {/* CTA + Benefits */}
        <div className="animate-fade-in-up animate-fill-mode-both animate-delay-300 relative flex w-full flex-col items-center gap-[24px] px-[8px] md:gap-[32px] md:px-[32px]">
          {/* CTA button — glass pill track with slide animation */}
          <CtaButton label={t("cta")} />

          {/* Benefits row */}
          <div className="flex w-full items-start justify-center gap-[16px] md:gap-[32px] md:px-[96px]">
            {benefits.map((benefit, i) => {
              const Icon = BENEFIT_ICONS[i];
              return (
                <div
                  key={benefit}
                  className="flex flex-1 flex-col items-center gap-[8px]"
                >
                  <Icon />
                  <span className="text-[10px] leading-[1.3] text-text-muted md:text-[16px]">
                    {benefit}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
