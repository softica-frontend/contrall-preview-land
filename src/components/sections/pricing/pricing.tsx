import { getTranslations } from "next-intl/server";
import { GradientLabel } from "@/components/ui/gradient-label";
import { SectionReveal } from "@/components/ui/section-reveal";
import { PricingCard } from "./pricing-card";
import { PricingSlider } from "./pricing-slider";
import { TrialCta } from "./trial-cta";

export async function Pricing() {
  const t = await getTranslations("Pricing");

  const plans = [
    {
      title: t("plan1Title"),
      desc: t("plan1Desc"),
      price: "$49",
      features: [
        t("plan1Feature1"),
        t("plan1Feature2"),
        t("plan1Feature3"),
        t("plan1Feature4"),
      ],
    },
    {
      title: t("plan2Title"),
      desc: t("plan2Desc"),
      price: "$99",
      popular: true,
      features: [
        t("plan2Feature1"),
        t("plan2Feature2"),
        t("plan2Feature3"),
        t("plan2Feature4"),
      ],
    },
    {
      title: t("plan3Title"),
      desc: t("plan3Desc"),
      price: "$199",
      features: [
        t("plan3Feature1"),
        t("plan3Feature2"),
        t("plan3Feature3"),
        t("plan3Feature4"),
        t("plan3Feature5"),
      ],
    },
  ];

  const cards = plans.map((plan) => (
    <PricingCard
      key={plan.title}
      title={plan.title}
      desc={plan.desc}
      price={plan.price}
      period={t("period")}
      features={plan.features}
      buttonLabel={t("button")}
      popular={plan.popular}
      popularLabel={t("popularBadge")}
    />
  ));

  return (
    <section
      id="pricing"
      className="w-full pb-[20px] pt-[24px] md:px-[40px] md:pb-[30px] md:pt-[30px] xl:px-[80px] xl:pb-[40px] xl:pt-[50px]"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-[48px]">
        {/* Header */}
        <SectionReveal className="flex w-full flex-col gap-[24px] px-[16px] text-center md:px-0">
          <div className="flex flex-col items-center gap-[8px]">
            <GradientLabel className="animate-fade-in animate-fill-mode-both text-[14px] md:text-[20px]">
              {t("sectionLabel")}
            </GradientLabel>
            <h2 className="animate-fade-in-up animate-fill-mode-both animate-delay-100 max-w-[900px] whitespace-pre-line text-[32px] font-bold leading-[1.1] text-text-heading md:text-[42px] xl:text-[54px]">
              {t("title")}
            </h2>
          </div>
          <p className="animate-fade-in-up animate-fill-mode-both animate-delay-200 whitespace-pre-line text-[16px] leading-[1.4] text-text-secondary md:text-[18px]">
            {t("subtitle")}
          </p>
        </SectionReveal>

        {/* Slider (<1280px) */}
        <SectionReveal className="w-full xl:hidden">
          <div className="animate-fade-in-up animate-fill-mode-both">
            <PricingSlider>{cards}</PricingSlider>
          </div>
        </SectionReveal>

        {/* Desktop cards (≥1280px) */}
        <SectionReveal className="hidden w-full gap-[16px] xl:flex xl:flex-row xl:px-[48px]">
          {plans.map((plan, i) => (
            <div
              key={plan.title}
              className="animate-fade-in-up animate-fill-mode-both flex-1"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <PricingCard
                title={plan.title}
                desc={plan.desc}
                price={plan.price}
                period={t("period")}
                features={plan.features}
                buttonLabel={t("button")}
                popular={plan.popular}
                popularLabel={t("popularBadge")}
              />
            </div>
          ))}
        </SectionReveal>

        {/* Trial CTA */}
        <SectionReveal className="px-[16px] md:px-0">
          <div className="animate-fade-in-up animate-fill-mode-both">
            <TrialCta
              trialText={t("trialText")}
              trialButton={t("trialButton")}
            />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
