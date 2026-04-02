import Image from "next/image";
import Link from "next/link";
import { Logomark, LogoText } from "@/components/icons/logo";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative h-screen overflow-y-auto"
      style={{
        background:
          "linear-gradient(106.59deg, rgba(224,234,252,0.3) 4.6%, rgba(235,236,254,0.3) 52.3%, rgba(201,204,255,0.3) 100%), #FCFCFD",
      }}
    >
      {/* Background shape pattern — 100vh */}
      <div
        className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden animate-fade-in animate-duration-1000"
        aria-hidden="true"
      >
        <Image
          src="/images/auth/shape-bg.svg"
          alt=""
          width={2094}
          height={1357}
          className="hidden min-h-full min-w-full object-cover md:block"
          priority
          unoptimized
        />
      </div>

      {/* Foreground */}
      <div className="relative z-10 flex min-h-[90vh] flex-col">
        {/* Header — matches landing header style */}
        <div className="flex shrink-0 items-center justify-between px-[16px] py-[16px] lg:px-[40px] xl:px-[80px]">
          <Link
            href="/"
            aria-label="Go to homepage"
            className="relative flex h-[50px] w-[155px] shrink-0 items-center lg:h-[60px] lg:w-[186px] xl:h-[75px] xl:w-[233px] hover:opacity-80 transition-opacity duration-200"
          >
            <div className="absolute inset-[14.75%_4.67%] flex items-center gap-[6px]">
              <Logomark className="h-full w-auto shrink-0 text-[#1d2939]" />
              <LogoText className="h-[60%] w-auto" />
            </div>
          </Link>
          <div className="flex items-center">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 items-center justify-center px-4 py-3 h-md:py-6 h-lg:py-8">
          <div className="relative w-full max-w-[480px] animate-fade-in-up animate-duration-700 animate-delay-200">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
