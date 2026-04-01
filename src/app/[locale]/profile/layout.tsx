"use client";

import { useEffect, useState } from "react";
import { ProfileHeader } from "@/components/layout/profile-header";
import { useRouter } from "@/i18n/navigation";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.replace("/auth/login");
      return;
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2575FF] border-t-transparent" />
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        background:
          "linear-gradient(106.59deg, rgba(224,234,252,0.3) 4.6%, rgba(235,236,254,0.3) 52.3%, rgba(201,204,255,0.3) 100%), #FCFCFD",
      }}
    >
      <ProfileHeader />
      <main className="flex h-[calc(100dvh-var(--profile-header-h))] items-start justify-center overflow-hidden px-4 py-8 [--profile-header-h:107px] md:[--profile-header-h:82px] lg:[--profile-header-h:92px] xl:[--profile-header-h:107px]">
        {children}
      </main>
    </div>
  );
}
