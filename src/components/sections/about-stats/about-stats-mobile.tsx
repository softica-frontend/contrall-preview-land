import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { GradientLabel } from "@/components/ui/gradient-label";
import { SectionReveal } from "@/components/ui/section-reveal";
import { CARD_SHADOW_SM } from "@/components/ui/shadows";

export async function AboutStatsMobile() {
  const t = await getTranslations("AboutStats");

  return (
    <SectionReveal className="rounded-[32px] md:hidden">
      <div className="px-[8px] py-[24px]">
        {/* Title */}
        <div className="animate-fade-in-up animate-fill-mode-both mb-[24px] px-[8px]">
          <GradientLabel className="text-[16px]">
            {t("sectionLabel")}
          </GradientLabel>
          <h2 className="mt-[8px] text-[32px] font-bold leading-[1.1] text-[#0c111d]">
            {t("title")}
          </h2>
        </div>

        {/* $15,200 — horizontal card */}
        <div
          className="relative mb-[16px] min-h-[120px] overflow-hidden rounded-[16px] bg-[#fcfcfd] pr-[130px]"
          style={{ boxShadow: CARD_SHADOW_SM }}
        >
          <div className="flex flex-col gap-[8px] p-[16px]">
            <span className="text-[24px] font-bold leading-[1.1] text-[#0c111d]">
              {t("stat1Value")}
            </span>
            <p className="text-[14px] font-medium leading-[1.2] text-[#1d2939]">
              {t("stat1Desc")}
            </p>
          </div>
          <div className="absolute bottom-0 right-0 h-[100px] w-[130px]">
            <Image
              src="/images/about-stats/stat-phone.png"
              alt=""
              fill
              className="object-cover object-top"
              sizes="130px"
            />
          </div>
        </div>

        {/* Watermark + cards + team area */}
        <div className="relative">
          {/* Watermark — diagonal staircase pattern like Figma */}
          <div
            className="pointer-events-none absolute inset-0 select-none"
            aria-hidden="true"
          >
            <span
              className="absolute right-[50%] top-[80px] flex flex-col items-end text-[68px] font-bold uppercase leading-[0.9]"
              style={{ color: "#C5C8F0" }}
            >
              {t("watermarkLine1").length > 3 ? (
                <>
                  <span className="mr-[60px]">
                    {t("watermarkLine1").slice(0, 2)}
                  </span>
                  <span>{t("watermarkLine1").slice(2)}</span>
                </>
              ) : (
                <span className="mt-10">{t("watermarkLine1")}</span>
              )}
            </span>
            <span
              className="absolute right-[10%] top-[200px] flex flex-col items-end text-[68px] font-bold uppercase leading-[0.9]"
              style={{ color: "#C5C8F0" }}
            >
              {t("watermarkLine2").length > 3 ? (
                <>
                  <span className="mr-[140px]">
                    {t("watermarkLine2").slice(0, 3)}
                  </span>
                  <span
                    className={
                      t("watermarkLine2").length <= 5 ? "mr-10 -mt-4" : "-mt-2"
                    }
                  >
                    {t("watermarkLine2").slice(3)}
                  </span>
                </>
              ) : (
                <span>{t("watermarkLine2")}</span>
              )}
            </span>
          </div>

          {/* 47 мін — right-aligned */}
          <div
            className="relative z-[1] ml-auto mb-[12px] h-[200px] w-[50%] overflow-hidden rounded-[16px] bg-[#fcfcfd]"
            style={{ boxShadow: CARD_SHADOW_SM }}
          >
            <Image
              src="/images/about-stats/card-bg-blue.png"
              alt=""
              fill
              sizes="50vw"
              className="object-cover"
              aria-hidden="true"
            />
            <Image
              src="/images/about-stats/stat-47min.png"
              alt=""
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="relative z-[1] p-[14px]">
              <p className="text-[14px] font-medium leading-[1.2] text-[#1d2939]">
                {t("stat2Desc")}
              </p>
            </div>
          </div>

          {/* Row: 1,892 + 99,98% */}
          <div className="relative z-[1] mt-[70px] flex gap-[10px]">
            {/* 1,892 */}
            <div
              className="relative flex-1 overflow-hidden rounded-[16px] bg-[#fcfcfd]"
              style={{ boxShadow: CARD_SHADOW_SM }}
            >
              <Image
                src="/images/about-stats/card-bg-blue.png"
                alt=""
                fill
                sizes="50vw"
                className="object-cover opacity-80 mix-blend-multiply"
                aria-hidden="true"
              />
              <div className="relative flex flex-col gap-[6px] p-[12px]">
                <span className="text-[20px] font-bold leading-[1.1] text-[#0c111d]">
                  {t("stat4Value")}
                </span>
                <p className="text-[12px] font-medium leading-[1.2] text-[#1d2939]">
                  {t("stat4Desc")}
                </p>
                <div className="mt-[4px] h-[70px]">
                  <Image
                    src="/images/about-stats/stat-transitions.png"
                    alt=""
                    width={157}
                    height={130}
                    unoptimized
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>
            </div>
            {/* 99,98% */}
            <div
              className="relative flex-1 overflow-hidden rounded-[16px] bg-[#fcfcfd] mt-10"
              style={{ boxShadow: CARD_SHADOW_SM }}
            >
              <Image
                src="/images/about-stats/card-bg-blue.png"
                alt=""
                fill
                sizes="50vw"
                className="object-cover opacity-80 mix-blend-multiply"
                aria-hidden="true"
              />
              <div className="relative flex flex-col gap-[6px] p-[12px] pb-0">
                <span className="text-[20px] font-bold leading-[1.1] text-[#0c111d]">
                  {t("stat3Value")}
                </span>
                <div className="flex flex-col gap-[2px]">
                  <p className="text-[12px] font-bold leading-[1.2] text-[#1d2939]">
                    {t("stat3Title")}
                  </p>
                  <p className="text-[10px] leading-[1.3] text-[#344054]">
                    {t("stat3Subtitle")}
                  </p>
                </div>
                <div className="mt-[10px] flex justify-center">
                  <Image
                    src="/images/about-stats/stat-uptime.png"
                    alt=""
                    width={160}
                    height={120}
                    unoptimized
                    className="h-auto w-[110px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Team section — side by side like Figma */}
          <div className="relative z-[1] mt-[20px] flex items-end gap-[8px]">
            <div className="w-[40%] shrink-0">
              <p className="text-[12px] leading-[1.4] text-[#344054]">
                {t("teamText")}
              </p>
            </div>
            <div className="flex-1">
              <p className="bg-gradient-to-b from-[#7491ff] via-[#2575ff] to-[#2769e3] bg-clip-text text-right text-[16px] font-bold leading-[1.2] text-transparent">
                {t("teamQuote")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
