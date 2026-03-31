import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionReveal } from "@/components/ui/section-reveal";
import { GLASS_SHADOW } from "@/components/ui/shadows";

const AD_SYSTEM_LOGOS = [
  { src: "/images/integrations/logo-dots.svg", alt: "More" },
  { src: "/images/integrations/logo-facebook.svg", alt: "Facebook" },
  { src: "/images/integrations/logo-google.svg", alt: "Google" },
  { src: "/images/integrations/logo-keitaro.svg", alt: "Keitaro" },
  { src: "/images/integrations/logo-tiktok.svg", alt: "TikTok" },
];

const PARTNER_LOGOS = [
  { src: "/images/integrations/logo-dots.svg", alt: "More" },
  {
    src: "/images/integrations/logo-redtrack-new.png",
    alt: "Redtrack",
    icon: true,
  },
  { src: "/images/integrations/logo-keitaro-2.svg", alt: "Keitaro" },
  { src: "/images/integrations/logo-voluum.svg", alt: "Voluum" },
  { src: "/images/integrations/logo-binom-2.svg", alt: "Binom" },
];

function OverlappingLogos({
  logos,
}: {
  logos: { src: string; alt: string; icon?: boolean }[];
}) {
  return (
    <div className="flex items-center">
      {logos.map((logo, i) =>
        logo.icon ? (
          <div
            key={logo.alt}
            className="-mr-[44px] flex h-[75px] w-[75px] shrink-0 items-center justify-center rounded-full bg-[#fcfcfd] shadow-[0px_0px_6px_0px_rgba(12,17,29,0.02),0px_2px_4px_0px_rgba(16,24,40,0.08)]"
            style={{ zIndex: i }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={48}
              height={48}
              className="h-[48px] w-[48px] object-contain"
            />
          </div>
        ) : (
          <div
            key={logo.alt}
            className="-mr-[44px] h-[87px] w-[87px] shrink-0"
            style={{ zIndex: i }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={87}
              height={87}
              className="h-full w-full"
            />
          </div>
        ),
      )}
    </div>
  );
}

export async function ToolsSection() {
  const t = await getTranslations("Integrations");

  return (
    <div className="mx-auto w-full max-w-[1280px] px-[16px]">
      <SectionReveal className="flex flex-col items-center">
        <p className="animate-fade-in animate-fill-mode-both mb-[16px] text-center text-[12px] font-semibold uppercase tracking-[2px] text-[#2575ff] md:text-[14px]">
          {t("sectionLabel")}
        </p>
        <h2 className="animate-fade-in-up animate-fill-mode-both animate-delay-100 mx-auto mb-[16px] max-w-[800px] text-center text-[28px] font-bold leading-[1.1] text-[#0c111d] md:text-[36px] xl:text-[42px]">
          {t("title")}
        </h2>
        <div className="animate-fade-in-up animate-fill-mode-both animate-delay-200 mx-auto mb-[40px] text-center text-[16px] leading-normal text-[#475467] md:mb-[48px] md:text-[18px]">
          <p>{t("subtitle1")}</p>
          <p>{t("subtitle2")}</p>
        </div>
      </SectionReveal>

      {/* Two cards */}
      <SectionReveal className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 gap-[16px] md:grid-cols-2 max-md:max-w-[95vw]">
        {/* Ad systems card */}
        <GlassCard
          className="animate-fade-in-left animate-fill-mode-both flex flex-col gap-[32px] px-[24px] pb-[32px] pt-[24px]"
          style={{ background: "rgb(252,252,253)", boxShadow: GLASS_SHADOW }}
        >
          <OverlappingLogos logos={AD_SYSTEM_LOGOS} />
          <div className="flex flex-col gap-[8px] px-[4px]">
            <h3 className="text-[24px] font-bold leading-[1.1] text-[#101828]">
              {t("adSystemsTitle")}
            </h3>
            <p className="text-[18px] leading-[1.4] text-[#344054]">
              {t("adSystemsDesc")}
            </p>
          </div>
        </GlassCard>

        {/* Partner networks card */}
        <GlassCard
          className="animate-fade-in-right animate-fill-mode-both animate-delay-150 flex flex-col gap-[32px] px-[24px] pb-[32px] pt-[24px] max-md:max-w-[95vw]"
          style={{ background: "rgb(252,252,253)", boxShadow: GLASS_SHADOW }}
        >
          <OverlappingLogos logos={PARTNER_LOGOS} />
          <div className="flex flex-col gap-[8px] px-[4px]">
            <h3 className="text-[24px] font-bold leading-[1.1] text-[#101828]">
              {t("partnerTitle")}
            </h3>
            <p className="text-[18px] leading-[1.4] text-[#344054]">
              {t("partnerDesc")}
            </p>
          </div>
        </GlassCard>
      </SectionReveal>

      {/* Team work card — centered below */}
      <SectionReveal className="relative mx-auto mt-[16px] max-w-[632px] md:mt-0 max-md:max-w-[95vw]">
        {/* Badges with cursors floating around */}
        <div className="pointer-events-none absolute inset-0 hidden overflow-visible md:block">
          {/* Analyst — left side, cursor top-right */}
          <div className="absolute -left-[140px] top-[105px] flex items-end">
            <span className="rounded-full bg-[#75FFE5] px-[18px] py-[3px] text-[21px] text-[#101828]">
              {t("analyst")}
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="mb-[22px] -ml-[2px] rotate-90"
              aria-hidden="true"
            >
              <path
                d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                fill="#0EFFDE"
                stroke="#0EFFDE"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Manager — right side, cursor top-left (flipped) */}
          <div className="absolute -right-[180px] top-[64px] flex items-end 2xl:-right-[240px]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="mb-[22px] -mr-[2px] -scale-x-100 rotate-270"
              aria-hidden="true"
            >
              <path
                d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                fill="#667085"
                stroke="#667085"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="rounded-full bg-[#D0D5DD] px-[18px] py-[3px] text-[21px] text-[#101828]">
              {t("manager")}
            </span>
          </div>

          {/* Owner — bottom-right, hand cursor rotated */}
          <div className="absolute -right-[110px] bottom-[64px] flex items-end">
            <svg
              width="24"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              className="-mb-[4px] -mr-[2px] -rotate-45"
              aria-hidden="true"
            >
              <path
                d="M8 13V4.5C8 3.83696 8.26339 3.20107 8.73223 2.73223C9.20107 2.26339 9.83696 2 10.5 2C11.163 2 11.7989 2.26339 12.2678 2.73223C12.7366 3.20107 13 3.83696 13 4.5V12"
                stroke="#2575FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 8.5C13 7.83696 13.2634 7.20107 13.7322 6.73223C14.2011 6.26339 14.837 6 15.5 6C16.163 6 16.7989 6.26339 17.2678 6.73223C17.7366 7.20107 18 7.83696 18 8.5"
                stroke="#2575FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 8.5C18 7.83696 18.2634 7.20107 18.7322 6.73223C19.2011 6.26339 19.837 6 20.5 6C21.163 6 21.7989 6.26339 22.2678 6.73223C22.7366 7.20107 23 7.83696 23 8.5V14C23 16.3869 22.0518 18.6761 20.364 20.364C18.6761 22.0518 16.3869 23 14 23H11C9 23 5 21 5 16"
                stroke="#2575FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="rounded-full bg-[#B6BDFF] px-[18px] py-[3px] text-[21px] text-[#101828]">
              {t("owner")}
            </span>
          </div>
        </div>

        <GlassCard
          className="animate-fade-in-up animate-fill-mode-both flex flex-col gap-[24px] px-[24px] pb-[32px] pt-[24px] md:mt-[-40px] md:flex-row md:items-end md:pt-[58px]"
          style={{ background: "rgb(252,252,253)", boxShadow: GLASS_SHADOW }}
        >
          {/* Team illustration */}
          <div className="mx-auto h-[157px] w-[172px] shrink-0 md:mx-0">
            <Image
              src="/images/integrations/team-illustration.svg"
              alt="Team"
              width={172}
              height={157}
              className="h-full w-full"
            />
          </div>
          {/* Text */}
          <div className="flex flex-col gap-[12px] px-[4px]">
            <h3 className="text-[24px] font-bold leading-[1.1] text-[#101828]">
              {t("teamTitle")}
            </h3>
            <p className="text-[18px] leading-[1.4] text-[#344054]">
              {t("teamDesc")}
            </p>
          </div>
        </GlassCard>
      </SectionReveal>
    </div>
  );
}
