import { getTranslations } from "next-intl/server";
import { SectionReveal } from "@/components/ui/section-reveal";
import {
  CtaButton,
  CtrlKeyCard,
  DashboardCard,
  DashboardCardFill,
  GrowthCard,
  ProfitCard,
  ProtectionText,
  QuoteText,
  SavingsText,
  ShieldCard,
  SimplicityText,
  SupportCard,
  SupportText,
} from "./blocks";

export async function WhyChoose() {
  const t = await getTranslations("WhyChoose");

  return (
    <section
      id="advantages"
      className="w-full pb-0 pt-[12px] md:pb-[5px] md:pt-[40px] xl:pb-[10px] xl:pt-[60px]"
    >
      <div
        className="relative w-full overflow-hidden rounded-[32px] px-[27px] pt-[32px] py-[40px] md:rounded-[48px] md:px-[40px] md:py-[60px] xl:rounded-[60px] xl:px-[80px] xl:py-[80px]"
        style={{
          background:
            "linear-gradient(101deg, rgba(224, 234, 252, 0.30) 4.6%, rgba(235, 236, 254, 0.30) 52.3%, rgba(201, 204, 255, 0.30) 100%), #FCFCFD",
        }}
      >
        <div className="mx-auto max-w-[1280px]">
          {/* Header (tablet/mobile) */}
          <SectionReveal className="mb-[32px] md:mb-[48px] xl:hidden">
            <h2 className="animate-fade-in-up animate-fill-mode-both max-w-[800px] text-left text-[28px] font-bold leading-[1.1] text-text-heading md:text-[36px]">
              {t("title")}
            </h2>
            <p className="animate-fade-in-up animate-fill-mode-both animate-delay-150 mt-[12px] max-w-[700px] text-left text-[16px] font-bold leading-[1.4] text-text-secondary md:text-[20px]">
              {t("subtitle")}
            </p>
          </SectionReveal>

          {/* ===== Desktop (≥1280px) ===== */}
          <div className="hidden xl:grid xl:grid-cols-3 xl:gap-[16px]">
            {/* Header — col 1-2 */}
            <SectionReveal className="col-span-2 mb-[48px]">
              <h2 className="animate-fade-in-up animate-fill-mode-both max-w-[600px] text-left text-[42px] font-bold leading-[1.1] text-text-heading">
                {t("title")}
              </h2>
              <p className="animate-fade-in-up animate-fill-mode-both animate-delay-150 mt-[12px] max-w-[480px] text-left text-[24px] font-bold leading-[1.4] text-text-secondary">
                {t("subtitle")}
              </p>
            </SectionReveal>

            {/* Column 3 — row 1+2 */}
            <SectionReveal className="row-span-2 flex flex-col gap-[16px]">
              <div className="animate-fade-in-left animate-fill-mode-both">
                <CtrlKeyCard className="h-[416px]" />
              </div>
              <div className="animate-fade-in animate-fill-mode-both animate-delay-100">
                <SavingsText />
              </div>
              <div className="animate-fade-in-left animate-fill-mode-both animate-delay-200">
                <ShieldCard className="h-[416px]" />
                <div className="mt-[16px]">
                  <ProtectionText />
                </div>
              </div>
            </SectionReveal>

            {/* Column 1 */}
            <SectionReveal className="flex flex-col gap-[16px]">
              <div className="animate-fade-in-up animate-fill-mode-both">
                <ProfitCard className="min-h-[163px]" />
              </div>
              <div className="animate-fade-in-up animate-fill-mode-both animate-delay-100">
                <SupportCard className="h-[416px]" />
                <div className="mt-[16px]">
                  <SupportText />
                </div>
              </div>
              <div className="animate-fade-in animate-fill-mode-both animate-delay-200">
                <QuoteText className="mt-[16px]" />
              </div>
            </SectionReveal>

            {/* Column 2 */}
            <SectionReveal className="flex flex-col gap-[16px]">
              <div className="animate-fade-in-up animate-fill-mode-both">
                <DashboardCard />
              </div>
              <div className="animate-fade-in animate-fill-mode-both animate-delay-100">
                <SimplicityText />
              </div>
              <div className="animate-fade-in-up animate-fill-mode-both animate-delay-200">
                <GrowthCard />
              </div>
            </SectionReveal>
          </div>

          {/* Desktop CTA */}
          <SectionReveal>
            <CtaButton className="animate-fade-in-up animate-fill-mode-both mt-[40px] hidden xl:flex" />
          </SectionReveal>

          {/* ===== Tablet (768-1279px) ===== */}
          <SectionReveal className="hidden grid-cols-2 gap-[16px] md:grid xl:hidden">
            <div className="animate-fade-in-up animate-fill-mode-both">
              <ProfitCard className="h-[300px]" />
            </div>
            <div className="animate-fade-in-up animate-fill-mode-both animate-delay-100">
              <DashboardCardFill className="h-[300px]" />
            </div>
            <div className="animate-fade-in-up animate-fill-mode-both animate-delay-200">
              <CtrlKeyCard className="h-[300px]" />
            </div>
            <div className="animate-fade-in-up animate-fill-mode-both animate-delay-300">
              <SupportCard className="h-[300px]" />
            </div>
            <div className="animate-fade-in animate-fill-mode-both animate-delay-200">
              <SavingsText />
            </div>
            <div className="animate-fade-in animate-fill-mode-both animate-delay-300">
              <SupportText />
            </div>
            <div className="animate-fade-in-up animate-fill-mode-both animate-delay-400">
              <ShieldCard className="h-[300px]" />
            </div>
            <div className="animate-fade-in-up animate-fill-mode-both animate-delay-500">
              <GrowthCard className="h-[300px]" />
            </div>
            <div className="animate-fade-in animate-fill-mode-both animate-delay-400">
              <ProtectionText />
            </div>
            <div className="animate-fade-in animate-fill-mode-both animate-delay-500">
              <SimplicityText />
            </div>
          </SectionReveal>

          {/* ===== Mobile (<768px) ===== */}
          <SectionReveal className="flex flex-col gap-[16px] md:hidden">
            <div className="animate-fade-in-up animate-fill-mode-both">
              <ProfitCard className="min-h-[140px]" />
            </div>
            <div className="animate-fade-in-up animate-fill-mode-both animate-delay-100">
              <CtrlKeyCard className="h-[280px]" />
            </div>
            <div className="animate-fade-in animate-fill-mode-both animate-delay-150">
              <SavingsText />
            </div>
            <div className="animate-fade-in-up animate-fill-mode-both animate-delay-200">
              <ShieldCard className="h-[280px]" />
            </div>
            <div className="animate-fade-in animate-fill-mode-both animate-delay-250">
              <ProtectionText />
            </div>
            <div className="animate-fade-in-up animate-fill-mode-both animate-delay-300">
              <SupportCard className="h-[280px]" />
            </div>
            <div className="animate-fade-in animate-fill-mode-both animate-delay-300">
              <SupportText />
            </div>
            <div className="animate-fade-in-up animate-fill-mode-both animate-delay-400">
              <DashboardCard />
            </div>
            <div className="animate-fade-in animate-fill-mode-both animate-delay-400">
              <SimplicityText />
            </div>
            <div className="animate-fade-in-up animate-fill-mode-both animate-delay-500">
              <GrowthCard />
            </div>
          </SectionReveal>

          {/* Quote + CTA (tablet/mobile) */}
          <SectionReveal className="mt-[40px] md:mt-[48px] xl:hidden">
            <div className="animate-fade-in animate-fill-mode-both">
              <QuoteText />
            </div>
            <div className="animate-fade-in-up animate-fill-mode-both animate-delay-150">
              <CtaButton className="mt-[24px]" />
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
