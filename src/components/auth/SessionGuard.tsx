"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import { all_routes } from "@/data/all_routes";
import { getAccessToken, getSessionKind } from "@/lib/auth-session";
import { useAuth } from "@/providers/auth-provider";

const PLATFORM_ONLY_PREFIXES = [
  "/companies",
  "/packages",
  "/subscription",
  "/domain",
  "/vendor-dashboard",
  "/invoices",
];

function isPlatformOnlyPath(pathname: string): boolean {
  return PLATFORM_ONLY_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

/** Returns the tenant subdomain (e.g. "jubayer") when on a .localhost tenant host, else empty. */
function getTenantSubdomain(): string {
  if (typeof window === "undefined") return "";
  const h = window.location.hostname;
  if (h.endsWith(".localhost")) {
    return h.replace(/\.localhost$/, "");
  }
  return "";
}

export function SessionGuard({ children }: { children: ReactNode }) {
  const { loading, sessionKind } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const token = getAccessToken();
    const storedKind = getSessionKind();

    // No session — figure out the best redirect.
    if (!token || !storedKind) {
      if (isPlatformOnlyPath(pathname)) {
        const sub = getTenantSubdomain();
        if (sub) {
          // Tenant subdomain (e.g. jubayer.localhost) — stay on this host,
          // redirect to the tenant dashboard.
          router.replace(all_routes.newdashboard);
          return;
        }
      }

      // Not a platform-only path or bare localhost: just go to signin.
      router.replace(all_routes.signin);
      return;
    }

    // Session exists, but maybe it's the wrong kind for this path.
    if (storedKind === "tenant" && isPlatformOnlyPath(pathname)) {
      router.replace(all_routes.newdashboard);
      return;
    }

    if (
      storedKind === "platform" &&
      (pathname === all_routes.newdashboard ||
        pathname === "/sales-dashboard")
    ) {
      router.replace(all_routes.vendorDashboard);
    }
  }, [loading, sessionKind, pathname, router]);

  if (loading) {
    return null;
  }

  const token = getAccessToken();
  const storedKind = getSessionKind();

  if (!token || !storedKind) {
    return null;
  }

  return <>{children}</>;
}
