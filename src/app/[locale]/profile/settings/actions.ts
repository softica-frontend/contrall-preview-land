"use server";

import { cookies } from "next/headers";
import type { ApiResult } from "@/lib/api-client";

export interface Transaction {
  date: string;
  time: string;
  tracker: string;
  amount: string;
  statusKey: string;
  descriptionKey: string;
}

export interface ProfileInfo {
  name: string;
  email: string;
  timezone: string;
  userSince: string;
}

export async function getProfileInfo(): Promise<ProfileInfo> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // TODO: replace mock with real call
  // return apiFetch<ProfileInfo>("/profile");

  const cookieStore = await cookies();
  const email = cookieStore.get("auth_email")?.value ?? "user@example.com";

  return {
    name: "",
    email,
    timezone: "UTC+2",
    userSince: "24 October 2025",
  };
}

export async function updateProfileInfo(data: {
  name: string;
  email: string;
  timezone: string;
}): Promise<ApiResult<void>> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // TODO: replace mock with real call
  // return apiAction("PUT", "/profile", data);

  const cookieStore = await cookies();
  cookieStore.set("auth_email", data.email, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return { ok: true, data: undefined };
}

export async function changePassword(_data: {
  currentPassword: string;
  newPassword: string;
}): Promise<ApiResult<void>> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // TODO: replace mock with real call
  // return apiAction("PUT", "/profile/password", _data);

  return { ok: true, data: undefined };
}

export async function getBillingHistory(): Promise<Transaction[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // TODO: replace mock with real call
  // return apiFetch<Transaction[]>("/billing");

  return [
    {
      date: "28.03.2026",
      time: "14:32",
      tracker: "Contrall Pro",
      amount: "$99.00",
      statusKey: "completed",
      descriptionKey: "monthlySubscription",
    },
    {
      date: "28.02.2026",
      time: "14:30",
      tracker: "Contrall Pro",
      amount: "$99.00",
      statusKey: "completed",
      descriptionKey: "monthlySubscription",
    },
    {
      date: "28.01.2026",
      time: "14:28",
      tracker: "Contrall Pro",
      amount: "$99.00",
      statusKey: "completed",
      descriptionKey: "monthlySubscription",
    },
    {
      date: "28.12.2025",
      time: "09:15",
      tracker: "Contrall Pro",
      amount: "$99.00",
      statusKey: "completed",
      descriptionKey: "monthlySubscription",
    },
    {
      date: "15.12.2025",
      time: "11:42",
      tracker: "Contrall Pro",
      amount: "$29.00",
      statusKey: "completed",
      descriptionKey: "additionalDomain",
    },
    {
      date: "28.11.2025",
      time: "14:30",
      tracker: "Contrall Pro",
      amount: "$99.00",
      statusKey: "completed",
      descriptionKey: "monthlySubscription",
    },
    {
      date: "28.10.2025",
      time: "14:33",
      tracker: "Contrall Pro",
      amount: "$99.00",
      statusKey: "completed",
      descriptionKey: "monthlySubscription",
    },
    {
      date: "28.09.2025",
      time: "10:05",
      tracker: "Contrall Starter",
      amount: "$49.00",
      statusKey: "completed",
      descriptionKey: "monthlySubscription",
    },
    {
      date: "15.09.2025",
      time: "16:20",
      tracker: "Contrall Pro",
      amount: "$99.00",
      statusKey: "cancelled",
      descriptionKey: "refundCancellation",
    },
    {
      date: "28.08.2025",
      time: "14:30",
      tracker: "Contrall Starter",
      amount: "$49.00",
      statusKey: "completed",
      descriptionKey: "monthlySubscription",
    },
    {
      date: "10.08.2025",
      time: "08:45",
      tracker: "Contrall Starter",
      amount: "$49.00",
      statusKey: "resolved",
      descriptionKey: "refund",
    },
    {
      date: "28.07.2025",
      time: "14:31",
      tracker: "Contrall Starter",
      amount: "$49.00",
      statusKey: "completed",
      descriptionKey: "monthlySubscription",
    },
    {
      date: "28.06.2025",
      time: "14:29",
      tracker: "Contrall Starter",
      amount: "$49.00",
      statusKey: "completed",
      descriptionKey: "monthlySubscription",
    },
    {
      date: "01.06.2025",
      time: "12:00",
      tracker: "Contrall Starter",
      amount: "$0.00",
      statusKey: "completed",
      descriptionKey: "trialPeriod",
    },
  ];
}
