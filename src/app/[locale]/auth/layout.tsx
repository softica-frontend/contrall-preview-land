import Image from "next/image";
import Link from "next/link";
import { Logomark, LogoText } from "@/components/icons/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative flex min-h-screen flex-col"
      style={{
        background:
          "linear-gradient(106.59deg, rgba(224,234,252,0.3) 4.6%, rgba(235,236,254,0.3) 52.3%, rgba(201,204,255,0.3) 100%), #FCFCFD",
      }}
    >
      {/* Background shape pattern */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
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

      {/* Logo — same size as landing header */}
      <div className="relative z-10 px-[16px] pt-[16px] lg:px-[40px] xl:px-[80px]">
        <Link
          href="/"
          aria-label="Go to homepage"
          className="relative flex h-[75px] w-[233px] items-center"
        >
          <div className="absolute inset-[14.75%_4.67%] flex items-center gap-[6px]">
            <Logomark className="h-full w-auto shrink-0 text-[#1d2939]" />
            <LogoText className="h-[60%] w-auto" />
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-8">
        <div className="relative w-full max-w-[480px]">{children}</div>
      </div>
    </div>
  );
}
