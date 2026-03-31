import { getTranslations } from "next-intl/server";
import {
  ChartArrowsIcon,
  ChevronsRightIcon,
  ZoomMoneyIcon,
} from "@/components/icons/about-icons";
import { SectionReveal } from "@/components/ui/section-reveal";
import { GLASS_SHADOW_M as CARD_SHADOW } from "@/components/ui/shadows";

const CARDS = [
  {
    icon: ChartArrowsIcon,
    titleKey: "card1Title",
    descKey: "card1Desc",
    mobileRotate: "rotate-[-2deg]",
  },
  {
    icon: ZoomMoneyIcon,
    titleKey: "card2Title",
    descKey: "card2Desc",
    mobileRotate: "rotate-[1.5deg]",
  },
  {
    icon: ChevronsRightIcon,
    titleKey: "card3Title",
    descKey: "card3Desc",
    mobileRotate: "rotate-[-1deg]",
  },
] as const;

export async function AboutProduct() {
  const t = await getTranslations("AboutProduct");

  return (
    <section
      id="product"
      className="w-full px-[6px] max-md:pt-[32px] pb-[0px] lg:-mt-20 md:px-[40px] md:pb-[10px] xl:px-[80px] xl:pb-[20px]"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-[48px]">
        {/* Section Text */}
        <SectionReveal className="flex w-full flex-col items-center gap-[24px]">
          <h2 className="animate-fade-in-up animate-fill-mode-both max-w-[900px] whitespace-pre-line text-center text-[32px] font-bold leading-[1.1] text-[#0c111d] md:text-[42px] xl:text-[54px]">
            {t("title")}
          </h2>
          <p className="animate-fade-in-up animate-fill-mode-both animate-delay-150 max-w-[800px] whitespace-pre-line text-center text-[16px] leading-[1.4] text-[#21272a] md:text-[18px]">
            {t("subtitle")}
          </p>
        </SectionReveal>

        {/* Feature Cards — 3 in row */}
        <SectionReveal className="flex w-full flex-col -space-y-[2px] md:grid md:grid-cols-2 md:items-start md:gap-[16px] md:space-y-0 xl:grid-cols-3">
          {CARDS.map((card, i) => (
            <div
              key={card.titleKey}
              className={`animate-fade-in-up animate-fill-mode-both relative flex flex-col justify-between rounded-[32px] px-[24px] pb-[32px] pt-[24px] ${card.mobileRotate} md:rotate-0 md:min-h-[335px]`}
              style={{
                zIndex: i + 1,
                background: "rgba(252,252,253,0.97)",
                boxShadow: CARD_SHADOW,
                animationDelay: `${i * 120}ms`,
              }}
            >
              <div className="flex h-[75px] w-[75px] items-center justify-center rounded-full bg-[#2575ff]">
                <card.icon className="text-white" />
              </div>
              <div className="mt-[48px] flex flex-col gap-[4px] md:mt-auto">
                <h3 className="whitespace-pre-line text-[24px] font-bold leading-[1.1] text-black">
                  {t(card.titleKey)}
                </h3>
                <p className="text-[18px] leading-[1.4] text-black/40">
                  {t(card.descKey)}
                </p>
              </div>
            </div>
          ))}
        </SectionReveal>

        {/* Bottom Quote */}
        <SectionReveal className="flex justify-center">
          <p className="animate-fade-in animate-fill-mode-both max-w-[751px] text-center text-[28px] font-bold leading-[1.1] text-[#2575ff] md:text-[42px]">
            {t("quote")}
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
