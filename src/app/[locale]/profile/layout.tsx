"use client";

import { useEffect, useState } from "react";
import { ProfileHeader } from "@/components/layout/profile-header";
import { useRouter } from "@/i18n/navigation";

function getAuthToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authState, setAuthState] = useState<
    "checking" | "authenticated" | "unauthenticated"
  >(() => {
    const token = getAuthToken();
    if (token) return "authenticated";
    return typeof window === "undefined" ? "checking" : "unauthenticated";
  });

  useEffect(() => {
    if (authState === "checking") {
      const token = getAuthToken();
      setAuthState(token ? "authenticated" : "unauthenticated");
    }
    if (authState === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [authState, router]);

  if (authState !== "authenticated") {
    return null;
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
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
