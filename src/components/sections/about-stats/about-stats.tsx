import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { GradientLabel } from "@/components/ui/gradient-label";
import { SectionReveal } from "@/components/ui/section-reveal";
import { CARD_SHADOW_XL } from "@/components/ui/shadows";
import { AboutStatsMobile } from "./about-stats-mobile";

const PHOTOS = [
  "/images/about-stats/photo1.png",
  "/images/about-stats/photo2.png",
  "/images/about-stats/photo3.png",
  "/images/about-stats/photo4.png",
  "/images/about-stats/photo5.png",
];

/* Desktop photo positions (center-offset, top, size) */
const PHOTO_POS_XL = [
  { left: "calc(50% - 230px)", top: 586, size: 120 },
  { left: "calc(50% - 152px)", top: 436, size: 160 },
  { left: "calc(50% + 78px)", top: 553, size: 120 },
  { left: "calc(50% - 2px)", top: 448, size: 120 },
  { left: "calc(50% - 72px)", top: 586, size: 180 },
];

export async function AboutStats() {
  const t = await getTranslations("AboutStats");

  return (
    <section
      id="about"
      className="w-full px-[8px] pb-[8px] pt-[24px] md:px-[40px] md:pb-[10px] md:pt-[90px] xl:px-[80px] xl:pb-[15px] xl:pt-[120px]"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        {/* ===== Desktop + Tablet (md+) ===== */}
        <div className="hidden md:block">
          {/* Title — full content width */}
          <SectionReveal className="mb-[48px] xl:mb-[96px]">
            <GradientLabel className="animate-fade-in animate-fill-mode-both text-[16px] md:text-[20px]">
              {t("sectionLabel")}
            </GradientLabel>
            <h2 className="animate-fade-in-up animate-fill-mode-both animate-delay-100 mt-[8px] whitespace-pre-line text-[36px] font-bold leading-[1.1] text-[#0c111d] xl:text-[54px]">
              {t("title")}
            </h2>
          </SectionReveal>

          {/* Bento — 1280px design, scaled to fit viewport */}
          <SectionReveal className="relative mx-auto aspect-[1280/750] w-full max-w-[1280px] ">
            <div className="absolute left-1/2 top-0 h-[835px] w-[1280px] -translate-x-1/2 origin-top md:scale-[0.54] lg:scale-[0.74] xl:scale-[0.88] min-[1440px]:scale-100">
              {/* Watermark "НАШІ" — left of $15,200 card */}
              <span
                className="pointer-events-none absolute right-[calc(50%-162px+84px)] -top-10 text-[200px] font-bold uppercase leading-[0.9] select-none min-[1440px]:text-[220px]"
                style={{ color: "#C5C8F0" }}
                aria-hidden="true"
              >
                {t("watermarkLine1")}
              </span>
              {/* Watermark "ЦИФРИ" — left of 1,892 card */}
              <span
                className="pointer-events-none absolute right-0 top-[200px] text-[200px] font-bold uppercase leading-[0.9] select-none min-[1440px]:text-[220px]"
                style={{ color: "#C5C8F0" }}
                aria-hidden="true"
              >
                {t("watermarkLine2")}
              </span>

              {/* Card: 47 мін */}
              <div
                className="animate-fade-in-right animate-fill-mode-both absolute left-[calc(50%+486px)] top-[-383px] h-[340px] w-[308px] -translate-x-1/2  overflow-hidden rounded-[32px] bg-[#fcfcfd]"
                style={{ boxShadow: CARD_SHADOW_XL }}
              >
                <Image
                  src="/images/about-stats/card-bg-blue.png"
                  alt=""
                  fill
                  sizes="308px"
                  className="object-cover opacity-80 mix-blend-multiply"
                  aria-hidden="true"
                />
                <div className="relative h-full">
                  <Image
                    src="/images/about-stats/stat-47min.png"
                    alt=""
                    fill
                    sizes="308px"
                    className="object-cover"
                  />
                  <div className="relative z-[1] flex flex-col gap-[12px] px-[28px] pt-[24px]">
                    <span className="text-[42px] font-bold leading-[1.1] text-[#0c111d]">
                      {t("stat2Value")}
                    </span>
                    <p className="text-[20px] font-bold leading-[1.1] text-[#1d2939]">
                      {t("stat2Desc")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card: $15,200 */}
              <div
                className="animate-fade-in-up animate-fill-mode-both animate-delay-100 absolute left-[calc(50%+162px)] top-[-130px] h-[340px] w-[308px] -translate-x-1/2  overflow-hidden rounded-[32px] bg-[#fcfcfd]"
                style={{ boxShadow: CARD_SHADOW_XL }}
              >
                <div className="flex h-full flex-col gap-[16px] px-[24px] pt-[24px]">
                  <div className="flex flex-col gap-[12px] px-[4px]">
                    <span className="text-[42px] font-bold leading-[1.1] text-[#0c111d]">
                      {t("stat1Value")}
                    </span>
                    <p className="text-[20px] font-bold leading-[1.1] text-[#1d2939]">
                      {t("stat1Desc")}
                    </p>
                  </div>
                  <div className="relative flex flex-1 items-center justify-center ">
                    <Image
                      src="/images/about-stats/stat-phone.png"
                      alt=""
                      fill
                      sizes="252px"
                      className="object-contain mt-2"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* Card: 99,98% */}
              <div
                className="animate-fade-in-left animate-fill-mode-both animate-delay-200 absolute left-[calc(50%-486px)] top-[210px] h-[340px] w-[308px] -translate-x-1/2  overflow-hidden rounded-[32px] bg-[#fcfcfd]"
                style={{ boxShadow: CARD_SHADOW_XL }}
              >
                <Image
                  src="/images/about-stats/card-bg-blue.png"
                  alt=""
                  fill
                  sizes="308px"
                  className="object-cover opacity-80 mix-blend-multiply"
                  aria-hidden="true"
                />
                <div className="relative flex h-full flex-col gap-[16px] px-[24px] pt-[24px]">
                  <div className="flex flex-col gap-[12px] px-[4px]">
                    <span className="text-[42px] font-bold leading-[1.1] text-[#0c111d]">
                      {t("stat3Value")}
                    </span>
                    <div className="flex flex-col gap-[4px]">
                      <p className="text-[20px] font-bold leading-[1.1] text-[#1d2939]">
                        Аптайм за 2 года работы
                      </p>
                      <p className="text-[16px] leading-[1.4] text-[#344054]">
                        Менее двух часов простоя
                        <br />
                        за все время
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-1 items-center justify-center ">
                    <Image
                      src="/images/about-stats/stat-uptime.png"
                      alt=""
                      fill
                      sizes="252px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Card: 1,892 */}
              <div
                className="animate-fade-in-right animate-fill-mode-both animate-delay-300 absolute left-[calc(50%+378px)] top-[304px] h-[340px] w-[308px] -translate-x-1/2  overflow-hidden rounded-[32px] bg-[#fcfcfd]"
                style={{ boxShadow: CARD_SHADOW_XL }}
              >
                <Image
                  src="/images/about-stats/card-bg-blue.png"
                  alt=""
                  fill
                  sizes="308px"
                  className="object-cover opacity-80 mix-blend-multiply"
                  aria-hidden="true"
                />
                <div className="relative flex h-full flex-col gap-[16px] px-[24px] pt-[24px]">
                  <div className="flex flex-col gap-[12px] px-[4px]">
                    <span className="text-[42px] font-bold leading-[1.1] text-[#0c111d]">
                      {t("stat4Value")}
                    </span>
                    <p className="text-[20px] font-bold leading-[1.1] text-[#1d2939]">
                      {t("stat4Desc")}
                    </p>
                  </div>
                  <div className="relative flex flex-1 items-center justify-center ">
                    <Image
                      src="/images/about-stats/stat-transitions.png"
                      alt=""
                      fill
                      sizes="274px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Photos — scattered */}
              {PHOTOS.map((src, i) => (
                <div
                  key={src}
                  className="absolute -translate-x-1/2  rounded-full"
                  style={{
                    left: PHOTO_POS_XL[i].left,
                    top: PHOTO_POS_XL[i].top,
                    width: PHOTO_POS_XL[i].size,
                    height: PHOTO_POS_XL[i].size,
                  }}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes={`${PHOTO_POS_XL[i].size}px`}
                  />
                </div>
              ))}

              {/* Team text */}
              <div className="animate-fade-in animate-fill-mode-both animate-delay-400 absolute left-0 top-[674px] w-[414px]">
                <p className="whitespace-pre-line text-[18px] leading-[1.4] text-[#344054]">
                  {t("teamText")}
                </p>
                <p className="mt-[16px] bg-gradient-to-b from-[#7491ff] via-[#2575ff] to-[#2769e3] bg-clip-text text-right text-[32px] font-bold leading-[1.1] text-transparent">
                  {t("teamQuote")}
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>

        {/* ===== Mobile (<md) — Figma mobile layout ===== */}
        <AboutStatsMobile />
      </div>
    </section>
  );
}
