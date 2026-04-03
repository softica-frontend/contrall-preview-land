import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CounterCard } from "./counter-card";
import { CtrlKey } from "./ctrl-key";
import { HeroCards } from "./hero-cards";
import { DESKTOP_CARDS } from "./hero-constants";
import { MigrationCard } from "./migration-card";
import { PlaceholderCard } from "./placeholder-card";
import { PricingCard } from "./pricing-card";
import { VideoCard } from "./video-card";

/** Render each line as a separately animated block */
function HeroTitle({ text, className }: { text: string; className?: string }) {
  const lines = text.split("\n");
  return (
    <h1 className={className}>
      {lines.map((line, i) => (
        <span key={i} className={`block hero-line hero-line-${i + 1}`}>
          {line}
        </span>
      ))}
    </h1>
  );
}

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="relative overflow-hidden rounded-b-[60px]">
      {/* Wave background — centered on CtrlKey area, full width */}

      {/* Desktop layout (md+) */}
      <div className="relative z-10 hidden md:flex flex-col items-center pt-[40px] pb-[200px] lg:pb-[400px] px-[80px]">
        <HeroTitle
          text={t("title")}
          className="text-center text-[42px] font-bold leading-[1.1] text-text-heading"
        />
        <Link
          href="/auth/register"
          className="hero-cta mt-[32px] inline-flex items-center justify-center rounded-[1000px] bg-primary-alt px-[54px] py-[24px] text-[20px] font-medium leading-none tracking-[0.5px] text-white transition-colors duration-200 hover:bg-primary-hover active:bg-primary-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2575ff] focus-visible:ring-offset-2"
        >
          {t("cta")}
        </Link>

        {/* 3D Ctrl key */}
        <div className="hero-key relative z-20 mt-[140px]">
          <CtrlKey />
        </div>

        <HeroCards>
          {DESKTOP_CARDS.map((card, i) => (
            <div
              key={card.id}
              className="absolute"
              data-hero-card={i}
              data-card-order={
                card.id.includes("placeholder")
                  ? 3
                  : card.id === "counter" || card.id === "pricing"
                    ? 1
                    : 0
              }
              data-card-side={
                card.rotate < -1 ? "left" : card.rotate > 1 ? "right" : "center"
              }
              style={{
                left: card.left,
                bottom: card.bottom,
                width: card.width,
                height: card.height,
                transform: `translateX(-50%) rotate(${card.rotate}deg) skewX(${card.skewX}deg) scaleY(${card.scaleY})`,
              }}
            >
              {card.id === "counter" && <CounterCard text={t("counterText")} />}
              {card.id === "migration" && (
                <MigrationCard
                  text={t("migrationText")}
                  time={t("migrationTime")}
                  desktop
                />
              )}
              {card.id === "video" && (
                <VideoCard
                  title={t("videoTitle")}
                  time={t("videoTime")}
                  desktop
                />
              )}
              {card.id === "pricing" && (
                <PricingCard
                  badge={t("pricingBadge")}
                  period={t("pricingPeriod")}
                  compare={t("pricingCompare")}
                  desktop
                />
              )}
              {(card.id === "placeholder-l" || card.id === "placeholder-r") && (
                <PlaceholderCard />
              )}
            </div>
          ))}
        </HeroCards>
      </div>

      {/* Mobile layout */}
      <div className="relative z-10 flex flex-col items-center gap-[24px] px-[8px] py-[24px] md:hidden">
        <HeroTitle
          text={t("title")}
          className="text-center text-[24px] font-bold leading-[1.1] text-text-heading"
        />
        <Link
          href="/auth/register"
          className="hero-cta flex items-center gap-[4px] h-[44px] rounded-[1000px] bg-primary-alt px-[24px] text-[14px] font-medium leading-none tracking-[0.5px] text-white transition-colors duration-200 hover:bg-primary-hover active:bg-primary-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2575ff] focus-visible:ring-offset-2"
        >
          {t("cta")}
        </Link>

        {/* 3D Ctrl key */}
        <div className="hero-key mt-[40px]">
          <CtrlKey className="h-[116px] w-[168px]" />
        </div>

        {/* Mobile card rows */}
        <div className="animate-fade-in-up animate-fill-mode-both animate-delay-500 flex w-full flex-col gap-[4px] mt-[80px]">
          {/* Row 1: Pricing + Video */}
          <div className="flex gap-[4px]">
            <div
              className="flex-1"
              style={{
                height: 169,
                transform: "rotate(-5.08deg) skewX(-5.08deg)",
              }}
            >
              <PricingCard
                badge={t("pricingBadge")}
                period={t("pricingPeriod")}
                compare={t("pricingCompare")}
                desktop={false}
              />
            </div>
            <div
              className="flex-1"
              style={{
                height: 169,
                transform: "rotate(5.08deg) skewX(5.08deg)",
              }}
            >
              <VideoCard
                title={t("videoTitle")}
                time={t("videoTime")}
                desktop={false}
              />
            </div>
          </div>
          {/* Row 2: Counter + Migration */}
          <div className="flex gap-[4px]">
            <div
              className="flex-1"
              style={{
                height: 180,
                transform: "rotate(-5.08deg) skewX(-5.08deg)",
              }}
            >
              <CounterCard text={t("counterText")} mobile />
            </div>
            <div
              className="flex-1"
              style={{
                height: 180,
                transform: "rotate(5.08deg) skewX(5.08deg)",
              }}
            >
              <MigrationCard
                text={t("migrationText")}
                time={t("migrationTime")}
                desktop={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
