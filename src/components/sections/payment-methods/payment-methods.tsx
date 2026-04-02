import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SectionReveal } from "@/components/ui/section-reveal";

const PAYMENT_ICONS = [
  { src: "/images/payment-methods/visa.svg", alt: "VISA", w: 132, h: 75 },
  { src: "/images/payment-methods/btc.svg", alt: "BTC", w: 75, h: 75 },
  { src: "/images/payment-methods/stripe.svg", alt: "Stripe", w: 108, h: 75 },
  { src: "/images/payment-methods/usdt.svg", alt: "USDT", w: 75, h: 75 },
  {
    src: "/images/payment-methods/mastercard.svg",
    alt: "MasterCard",
    w: 75,
    h: 75,
  },
  { src: "/images/payment-methods/yoomoney.svg", alt: "ЮMoney", w: 73, h: 75 },
  { src: "/images/payment-methods/mir.svg", alt: "МИР", w: 148, h: 75 },
];

export async function PaymentMethods() {
  const t = await getTranslations("PaymentMethods");

  const features = [t("feature1"), t("feature2"), t("feature3")];

  return (
    <section className="w-full px-[8px] pb-[16px] pt-[10px] md:px-[40px] md:pb-[60px] md:pt-[30px] xl:px-[80px] xl:pb-[80px] xl:pt-[40px]">
      <SectionReveal className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-[24px] md:gap-[48px]">
        <h2 className="animate-fade-in-up animate-fill-mode-both whitespace-pre-line text-center text-[24px] font-bold leading-[1.1] text-text-primary md:text-[36px] xl:text-[42px]">
          {t("title")}
        </h2>

        {/* Payment logos */}
        <div className="flex w-full items-center justify-center gap-[8px] px-[16px] md:flex-wrap md:gap-[16px] md:px-[32px]">
          {PAYMENT_ICONS.map((icon, i) => (
            <div
              key={icon.alt}
              className="animate-fade-in animate-fill-mode-both relative min-h-0 min-w-0 flex-1 rounded-[20px] md:flex-none"
              style={{
                aspectRatio: `${icon.w} / ${icon.h}`,
                animationDelay: `${100 + i * 60}ms`,
              }}
            >
              {/* fixed size on md+ */}
              <div
                className="hidden md:block"
                style={{ width: icon.w, height: icon.h }}
              >
                <div className="relative h-full w-full">
                  <div className="absolute inset-[26.67%_15%]">
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      fill
                      className="object-contain"
                      sizes={`${icon.w}px`}
                    />
                  </div>
                </div>
              </div>
              {/* fluid on mobile */}
              <div className="absolute inset-[26.67%_15%] md:hidden">
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  fill
                  className="object-contain"
                  sizes="14vw"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Features with green dots */}
        <div className="animate-fade-in-up animate-fill-mode-both animate-delay-500 flex flex-wrap items-center justify-center gap-[4px] md:flex-nowrap md:gap-[48px]">
          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-[6px] rounded-[10px] px-[4px] pb-[2px] pt-[1px] md:rounded-[12px] md:py-[2px] md:pl-[8px] md:pr-[12px]"
            >
              <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-success-alt" />
              <span className="whitespace-nowrap text-[12px] leading-[1.4] text-indicator md:text-[14px]">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
