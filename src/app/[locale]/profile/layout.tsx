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
    <>
      <ProfileHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        {children}
      </main>
    </>
  );
}
