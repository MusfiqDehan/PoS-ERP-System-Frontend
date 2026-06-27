"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import { all_routes } from "@/data/all_routes";
import { getAccessToken } from "@/lib/auth-session";
import { useAuth } from "@/providers/auth-provider";

const PLATFORM_ONLY_PREFIXES = [
  "/companies",
  "/packages",
  "/subscription",
  "/domain",
  "/vendor-dashboard",
  "/purchase-transaction",
];

function isPlatformOnlyPath(pathname: string): boolean {
  return PLATFORM_ONLY_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function SessionGuard({ children }: { children: ReactNode }) {
  const { loading, sessionKind } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const token = getAccessToken();
    if (!token || !sessionKind) {
      router.replace(all_routes.signin);
      return;
    }

    if (sessionKind === "tenant" && isPlatformOnlyPath(pathname)) {
      router.replace(all_routes.newdashboard);
      return;
    }

    if (
      sessionKind === "platform" &&
      (pathname === all_routes.newdashboard ||
        pathname === "/dashboard" ||
        pathname === "/sales-dashboard")
    ) {
      router.replace(all_routes.vendorDashboard);
    }
  }, [loading, sessionKind, pathname, router]);

  if (loading) {
    return null;
  }

  if (!getAccessToken() || !sessionKind) {
    return null;
  }

  return <>{children}</>;
}
