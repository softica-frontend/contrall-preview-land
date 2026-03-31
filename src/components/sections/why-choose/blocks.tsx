import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { GlassCard, GradientCard } from "@/components/ui/glass-card";

/* ── Profit "30дн" card ── */
export async function ProfitCard({ className }: { className?: string }) {
  const t = await getTranslations("WhyChoose");
  return (
    <GradientCard
      className={`flex flex-col items-end justify-between h-[145px] md:h-[163px] p-[16px] md:p-[24px] ${className ?? ""}`}
    >
      <p className="max-w-2/3 text-end text-[14px] font-normal leading-[1.2] text-[#7b8ccc] md:text-[16px]">
        {t("profitTitle")}
      </p>
      <span className="translate-y-[20%] translate-x-[5%] bg-linear-to-r from-[#A2AEFF] via-[#7491FF] to-[#2575FF] bg-clip-text text-left text-[86px] font-bold leading-none text-transparent md:text-[80px] xl:text-[100px]">
        {t("profitStat")}
      </span>
    </GradientCard>
  );
}

/* ── Ctrl key pattern card ── */
export function CtrlKeyCard({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[32px] ${className ?? ""}`}
    >
      <Image
        src="/images/why-choose/ctrl-key.png"
        alt="Ctrl"
        fill
        sizes="50vw"
        unoptimized
        className="hidden object-cover md:block"
      />
      <Image
        src="/images/why-choose/ctrl-key-mobile.png"
        alt="Ctrl"
        fill
        sizes="100vw"
        unoptimized
        className="object-cover md:hidden"
      />
    </div>
  );
}

/* ── Support 24/7 card (image only) ── */
export function SupportCard({ className }: { className?: string }) {
  return (
    <GlassCard className={`relative p-0 ${className ?? ""}`}>
      <Image
        src="/images/why-choose/support-3d.png"
        alt="24/7 Support"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        unoptimized
        className="object-cover"
      />
    </GlassCard>
  );
}

/* ── Private shared text block ── */
async function FeatureText({
  titleKey,
  descKey,
  className,
}: {
  titleKey: string;
  descKey: string;
  className?: string;
}) {
  const t = await getTranslations("WhyChoose");
  return (
    <div className={`px-[16px] ${className ?? ""}`}>
      <h3 className="text-[20px] font-bold leading-[1.1] text-[#101828] xl:text-[24px]">
        {t(titleKey)}
      </h3>
      <p className="mt-[4px] text-[14px] leading-[1.4] text-[#344054] md:text-[16px] xl:text-[18px]">
        {t(descKey)}
      </p>
    </div>
  );
}

/* ── Support text ── */
export function SupportText({ className }: { className?: string }) {
  return (
    <FeatureText
      titleKey="supportTitle"
      descKey="supportDesc"
      className={className}
    />
  );
}

/* ── Shield card (image only) ── */
export function ShieldCard({ className }: { className?: string }) {
  return (
    <GlassCard className={`relative p-0 ${className ?? ""}`}>
      <Image
        src="/images/why-choose/shield-3d.png"
        alt="Shield"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        unoptimized
        className="object-cover"
      />
    </GlassCard>
  );
}

/* ── Protection text ── */
export function ProtectionText({ className }: { className?: string }) {
  return (
    <FeatureText
      titleKey="protectionTitle"
      descKey="protectionDesc"
      className={className}
    />
  );
}

/* ── Dashboard card (PNG) ── */
export function DashboardCard({ className }: { className?: string }) {
  return (
    <GlassCard className={`overflow-hidden p-0 ${className ?? ""}`}>
      <Image
        src="/images/why-choose/dashboard.png"
        alt="Dashboard"
        width={1248}
        height={1248}
        unoptimized
        className="h-auto w-full object-cover"
      />
    </GlassCard>
  );
}

/* ── Dashboard card with fill (for fixed height) ── */
export function DashboardCardFill({ className }: { className?: string }) {
  return (
    <GlassCard className={`relative overflow-hidden p-0 ${className ?? ""}`}>
      <Image
        src="/images/why-choose/dashboard.png"
        alt="Dashboard"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        unoptimized
        className="object-cover"
      />
    </GlassCard>
  );
}

/* ── Savings text ── */
export function SavingsText({ className }: { className?: string }) {
  return (
    <FeatureText
      titleKey="savingsTitle"
      descKey="savingsDesc"
      className={className}
    />
  );
}

/* ── Simplicity text ── */
export function SimplicityText({ className }: { className?: string }) {
  return (
    <FeatureText
      titleKey="simplicityTitle"
      descKey="simplicityDesc"
      className={className}
    />
  );
}

/* ── Growth "15-25%" card ── */
export async function GrowthCard({ className }: { className?: string }) {
  const t = await getTranslations("WhyChoose");
  return (
    <GradientCard
      className={`flex flex-col items-center justify-center p-[24px] text-center xl:p-[32px] ${className ?? ""}`}
    >
      <p className="mb-[4px] text-[14px] leading-[1.4] text-[#7b8ccc] xl:mb-[8px]">
        {t("growthDesc")}
      </p>
      <div className="translate-y-1/2 bg-linear-to-r from-[#A2AEFF] via-[#7491FF] to-[#2575FF] bg-clip-text text-[64px] font-bold leading-none text-transparent md:text-[80px] xl:text-[100px]">
        {t("growthStat")}
      </div>
    </GradientCard>
  );
}

/* ── Quote text ── */
export async function QuoteText({ className }: { className?: string }) {
  const t = await getTranslations("WhyChoose");
  return (
    <div className={`ml-4 ${className ?? ""}`}>
      <p className="max-w-[500px] text-left text-[20px] font-bold leading-[1.1] text-[#2575ff] md:text-[24px]">
        {t("quoteText")}
      </p>
    </div>
  );
}

/* ── CTA button ── */
export async function CtaButton({ className }: { className?: string }) {
  const t = await getTranslations("WhyChoose");
  return (
    <div className={`flex justify-center ${className ?? ""}`}>
      <a
        href="/auth/register"
        className="inline-flex -rotate-[4deg] items-center justify-center rounded-[1000px] bg-[#2575ff] px-[32px] py-[16px] text-[16px] font-medium tracking-[0.5px] text-white transition-colors hover:bg-[#1a63e0] active:bg-[#1a5acc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2575ff] focus-visible:ring-offset-2 md:px-[40px] md:py-[20px] md:text-[18px]"
      >
        {t("ctaButton")}
      </a>
    </div>
  );
}
