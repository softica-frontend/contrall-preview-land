import { getTranslations } from "next-intl/server";
import { TelegramIcon } from "@/components/icons/misc-icons";
import { GradientLabel } from "@/components/ui/gradient-label";
import { SectionReveal } from "@/components/ui/section-reveal";

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="w-full px-[16px] py-[32px] md:px-[20px] lg:px-[80px] md:pb-[80px] md:pt-0 overflow-x-clip">
      <SectionReveal className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-[16px]">
        {/* Support label */}
        <GradientLabel className="animate-fade-in animate-fill-mode-both text-[16px] md:text-[20px]">
          {t("supportLabel")}
        </GradientLabel>

        {/* Email + Telegram icon */}
        <div className="animate-fade-in-up animate-fill-mode-both animate-delay-100 group w-full max-w-max overflow-visible text-center text-[7.5vw] font-bold leading-[1.1] min-[520px]:text-[40px] md:text-[80px] xl:text-[110px]">
          <a
            href={`mailto:${t("email")}`}
            className="text-border-accent transition-colors duration-200 group-hover:text-primary"
          >
            support@Contrall
          </a>
          <span className="relative inline-block">
            <a
              href={`mailto:${t("email")}`}
              className="text-border-accent transition-colors duration-200 group-hover:text-primary"
            >
              .
            </a>
            <a
              href="https://t.me/"
              aria-label="Contact us on Telegram"
              className="absolute left-[110%] -translate-x-1/2 bottom-[100%] md:bottom-[85%] xl:bottom-[90%] z-10 flex h-[28px] w-[28px] items-center justify-center rounded-[10px] p-[7px] min-[520px]:h-[36px] min-[520px]:w-[36px] min-[520px]:rounded-[14px] min-[520px]:p-[9px] md:h-[50px] md:w-[50px] md:rounded-[16px] md:p-[12px] xl:h-[75px] xl:w-[75px] xl:rounded-[20px] xl:p-[19px] hover:opacity-70 transition-opacity duration-200"
              style={{
                background:
                  "linear-gradient(180deg, rgba(252,252,253,0.3) 0%, rgba(145,185,254,0.15) 100%)",
                boxShadow:
                  "inset -0.5px -1px 1px 0px rgba(37,117,255,0.8), inset 0.5px 1px 1px 0px rgba(37,117,255,0.8)",
              }}
            >
              <TelegramIcon />
            </a>
          </span>
          <a
            href={`mailto:${t("email")}`}
            className="text-border-accent transition-colors duration-200 group-hover:text-primary"
          >
            com
          </a>
        </div>

        {/* Bottom bar */}
        <div className="animate-fade-in animate-fill-mode-both animate-delay-200 flex w-full flex-col items-center gap-[16px] border-t border-text-placeholder pt-[24px] text-center text-[12px] font-medium leading-none md:flex-row md:items-center md:justify-between md:pt-[48px] md:text-[16px]">
          <p className="text-text-body">{t("copyright")}</p>
          <div className="flex flex-col items-center gap-[16px] text-text-subtle md:flex-row md:gap-[32px]">
            <a
              href="/privacy"
              className="underline hover:text-primary transition-colors duration-200"
            >
              {t("privacyPolicy")}
            </a>
            <a
              href="/terms"
              className="underline hover:text-primary transition-colors duration-200"
            >
              {t("terms")}
            </a>
          </div>
        </div>
      </SectionReveal>
    </footer>
  );
}
