import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type React from "react";
import { SectionReveal } from "@/components/ui/section-reveal";

const GRADIENT_TEXT =
  "linear-gradient(180deg, #0C111D 20%, #192548 40%, #213B78 60%, #2651AC 80%, #2575FF 100%)";

const DARK_BG =
  "linear-gradient(180deg, #0C111D 20%, #192548 40%, #213B78 60%, #2651AC 80%, #2575FF 100%)";

export function DarkFeatureCard({
  title,
  description,
  icon,
  className,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-[16px] rounded-[24px] p-[28px] md:p-[32px] ${className ?? ""}`}
      style={{
        background:
          "linear-gradient(145deg, rgba(13,17,29,0.97) 0%, rgba(20,30,60,0.95) 50%, rgba(13,17,29,0.97) 100%)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(37,117,255,0.2)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(37,117,255,0.1)",
      }}
    >
      <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-primary">
        {icon}
      </div>
      <h4 className="text-[18px] font-bold leading-[1.2] text-white md:text-[20px]">
        {title}
      </h4>
      <p className="text-[14px] leading-normal text-[#94a3b8] md:text-[15px]">
        {description}
      </p>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  image,
  iconSrc,
}: {
  title: string;
  description: string;
  image: string;
  iconSrc: string;
}) {
  return (
    <div
      className="relative flex h-[460px] w-full flex-col rounded-[32px] px-[16px] pb-[16px] pt-[40px] sm:h-[500px] sm:w-[300px] sm:rounded-[48px] sm:px-[24px] sm:pb-[24px] sm:pt-[48px] xl:h-[540px] xl:w-[340px] 2xl:h-[600px] 2xl:w-[400px]"
      style={{
        background: "rgba(252,252,253,0.12)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Icon circle */}
      <div className="absolute -top-[30px] left-1/2 z-10 flex h-[60px] w-[60px] -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border-t-2 border-accent-blue bg-surface p-[4px] sm:-top-[38px] sm:h-[75px] sm:w-[75px]">
        <Image src={iconSrc} alt="" width={32} height={32} />
      </div>

      <div className="flex flex-1 flex-col gap-[16px] sm:gap-[24px]">
        <p className="px-[8px] text-center text-[20px] font-bold leading-[1.1] text-surface sm:px-[16px] sm:text-[24px] xl:text-[20px] 2xl:text-[24px]">
          {title}
        </p>
        <div className="relative flex-1 overflow-hidden rounded-t-[24px] sm:rounded-t-[32px]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="rounded-b-[20px] p-[16px] backdrop-blur-[20px] sm:rounded-b-[32px] sm:p-[24px] xl:rounded-b-[16px] xl:bg-[rgba(252,252,253,0.3)]">
        <p className="max-w-[90%] text-[15px] font-medium leading-normal text-surface sm:text-[18px] xl:text-[15px] xl:text-text-primary 2xl:text-[18px]">
          {description}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-inset-glow" />
    </div>
  );
}

export async function FeaturesSection() {
  const t = await getTranslations("Integrations");

  return (
    <div className="mx-auto mt-[24px] w-full max-w-[1440px] md:mt-[40px] xl:mt-[60px]">
      {/* Gradient title */}
      <SectionReveal className="relative mb-[40px] flex items-center justify-center md:mb-[48px]">
        <Image
          src="/images/integrations/background.svg"
          alt=""
          width={1920}
          height={1080}
          className="absolute -z-10 mb-40 w-screen opacity-40"
          aria-hidden="true"
          unoptimized
        />
        <h2
          className="animate-fade-in-up animate-fill-mode-both bg-clip-text text-center text-[28px] font-bold leading-[1.1] text-transparent md:text-[36px] xl:text-[42px]"
          style={{ backgroundImage: GRADIENT_TEXT }}
        >
          {t("featuresTitle")}
          <br />
          {t("featuresHighlight")}
        </h2>
      </SectionReveal>

      {/* ===== Desktop (xl) ===== */}
      <SectionReveal className="relative mx-auto hidden h-[740px] max-w-[1280px] xl:block 2xl:h-[831px]">
        {/* Dark bg — top portion */}
        <div
          className="absolute inset-x-0 top-0 h-[420px] overflow-hidden rounded-[48px] 2xl:h-[461px]"
          style={{ background: DARK_BG }}
        >
          {/* Contrall logo shapes pattern — overlay */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            aria-hidden="true"
          >
            {/* Center shape */}
            <Image
              src="/images/integrations/shape-center.svg"
              alt=""
              width={1194}
              height={1093}
              className="absolute left-1/2 top-1/2 h-[1093px] w-[1194px] -translate-x-1/2 -translate-y-1/2 opacity-100"
              aria-hidden="true"
              unoptimized
            />
            {/* Left shape */}
            <Image
              src="/images/integrations/shape-side.svg"
              alt=""
              width={1194}
              height={1093}
              className="absolute -left-[660px] bottom-0 h-[1093px] w-[1194px] opacity-100"
              aria-hidden="true"
              unoptimized
            />
            {/* Right shape */}
            <Image
              src="/images/integrations/shape-side.svg"
              alt=""
              width={1194}
              height={1093}
              className="absolute -right-[660px] bottom-0 h-[1093px] w-[1194px] opacity-100"
              aria-hidden="true"
              unoptimized
            />
          </div>
        </div>

        {/* Left card: AI assistant */}
        <div className="animate-fade-in-left animate-fill-mode-both absolute left-[5%] top-[100px] z-10 -rotate-3 2xl:left-[65px] 2xl:top-[113px]">
          <FeatureCard
            title={t("feature1Title")}
            description={t("feature1Desc")}
            image="/images/integrations/feature-ai.png"
            iconSrc="/images/integrations/icon-ai.svg"
          />
        </div>

        {/* Center card: Deep analytics — ON TOP */}
        <div className="animate-fade-in-up animate-fill-mode-both animate-delay-150 absolute left-1/2 top-[160px] z-20 -translate-x-1/2 rotate-[6.34deg] 2xl:left-[440px] 2xl:top-[191px] 2xl:translate-x-0">
          <FeatureCard
            title={t("feature2Title")}
            description={t("feature2Desc")}
            image="/images/integrations/feature-analytics.png"
            iconSrc="/images/integrations/icon-analytics.svg"
          />
        </div>

        {/* Right card: Import */}
        <div className="animate-fade-in-right animate-fill-mode-both animate-delay-300 absolute right-[5%] top-[40px] z-10 rotate-2 2xl:right-[60px] 2xl:top-[48px]">
          <FeatureCard
            title={t("feature3Title")}
            description={t("feature3Desc")}
            image="/images/integrations/feature-import.png"
            iconSrc="/images/integrations/icon-import.svg"
          />
        </div>
      </SectionReveal>

      {/* ===== Tablet + Mobile ===== */}
      <SectionReveal className="xl:hidden">
        <div
          className="relative flex flex-col items-center gap-[50px] overflow-hidden rounded-[32px] px-[16px] pb-[50px] pt-[50px] md:gap-[60px] md:rounded-[48px] md:px-[40px] md:pb-[60px] md:pt-[60px]"
          style={{ background: DARK_BG }}
        >
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            aria-hidden="true"
          >
            <Image
              src="/images/integrations/shape-center.svg"
              alt=""
              width={1194}
              height={1093}
              className="absolute left-1/2 top-1/2 h-[800px] w-[900px] -translate-x-1/2 -translate-y-1/2 md:h-[1093px] md:w-[1194px]"
              aria-hidden="true"
              unoptimized
            />
          </div>
          <div className="animate-fade-in-up animate-fill-mode-both -rotate-2">
            <FeatureCard
              title={t("feature1Title")}
              description={t("feature1Desc")}
              image="/images/integrations/feature-ai.png"
              iconSrc="/images/integrations/icon-ai.svg"
            />
          </div>
          <div className="animate-fade-in-up animate-fill-mode-both animate-delay-150 z-10 rotate-3">
            <FeatureCard
              title={t("feature2Title")}
              description={t("feature2Desc")}
              image="/images/integrations/feature-analytics.png"
              iconSrc="/images/integrations/icon-analytics.svg"
            />
          </div>
          <div className="animate-fade-in-up animate-fill-mode-both animate-delay-300 -rotate-2">
            <FeatureCard
              title={t("feature3Title")}
              description={t("feature3Desc")}
              image="/images/integrations/feature-import.png"
              iconSrc="/images/integrations/icon-import.svg"
            />
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}
