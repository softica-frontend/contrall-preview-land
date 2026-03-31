import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AboutProduct } from "@/components/sections/about-product/about-product";
import { AboutStats } from "@/components/sections/about-stats/about-stats";
import { CtaFooter } from "@/components/sections/cta-footer/cta-footer";
import { Hero } from "@/components/sections/hero/hero";
import { HeroWaveRipple } from "@/components/sections/hero/hero-wave-ripple";
import { Integrations } from "@/components/sections/integrations/integrations";
import { PaymentMethods } from "@/components/sections/payment-methods/payment-methods";
import { Pricing } from "@/components/sections/pricing/pricing";
import { WhyChoose } from "@/components/sections/why-choose/why-choose";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <div
        className="pointer-events-none absolute inset-0  flex justify-center overflow-x-clip overflow-y-visible"
        aria-hidden="true"
      >
        <HeroWaveRipple />
      </div>
      <main id="main" className="overflow-x-clip">
        <Hero />

        <AboutProduct />
        <WhyChoose />
        <Integrations />
        <Pricing />
        <AboutStats />
        <PaymentMethods />
        <CtaFooter />
      </main>
      <Footer />
    </>
  );
}
