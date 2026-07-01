"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { all_routes } from "@/data/all_routes";
import LogoutLink from "@/components/auth/LogoutLink";

type PageMeta = {
  icon: string;
  title: string;
  subtitle: string;
};

const PAGE_META: Record<string, PageMeta> = {
  "/vendor-dashboard": {
    icon: "ti ti-layout-dashboard",
    title: "Platform Overview",
    subtitle: "Monitor your platform at a glance",
  },
  "/companies": {
    icon: "ti ti-building-community",
    title: "Companies",
    subtitle: "Manage all tenant organizations on the platform",
  },
  "/subscription": {
    icon: "ti ti-credit-card",
    title: "Subscriptions",
    subtitle: "Track billing and payment activity",
  },
  "/packages": {
    icon: "ti ti-package",
    title: "Packages",
    subtitle: "Manage subscription plans and pricing",
  },
  "/domain": {
    icon: "ti ti-world",
    title: "Domains",
    subtitle: "Manage custom domain requests",
  },
  "/invoices": {
    icon: "ti ti-file-invoice",
    title: "Invoices",
    subtitle: "View all subscription invoices",
  },
  "/dashboard": {
    icon: "ti ti-chart-bar",
    title: "Dashboard",
    subtitle: "Platform performance overview",
  },
};

function usePageMeta(pathname: string): PageMeta {
  return PAGE_META[pathname] || {
    icon: "ti ti-building-skyscraper",
    title: "Platform Owner",
    subtitle: "",
  };
}

export default function PlatformHeader() {
  const route = all_routes;
  const pathname = usePathname();
  const { user } = useCurrentUser();
  const pageMeta = usePageMeta(pathname);

  const displayName = user?.full_name || user?.email || "Admin";
  const displayRole = user?.platform_roles?.[0] || "Platform Owner";
  const firstLetter = displayName.charAt(0).toUpperCase();

  const profilePictureUrl =
    user?.profile_picture && typeof user.profile_picture === "object"
      ? (user.profile_picture as Record<string, unknown>)?.url
      : null;

  useEffect(function cleanup() {
    document?.querySelector(".main-wrapper")?.classList?.remove("slide-nav");
    document?.querySelector(".sidebar-overlay")?.classList?.remove("opened");
    document?.querySelector("html")?.classList?.remove("menu-opened");
  }, [pathname]);

  function toggleSidebar() {
    document?.querySelector(".main-wrapper")?.classList?.toggle("slide-nav");
    document?.querySelector(".sidebar-overlay")?.classList?.toggle("opened");
    document?.querySelector("html")?.classList?.toggle("menu-opened");
  }

  return (
    <nav className="header-platform sticky top-0 z-[1020] h-[64px] bg-white border-b border-[#E2E8F0] backdrop-blur-sm bg-white/95">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left — page title */}
        <div className="flex items-center gap-4 min-w-0">
          <button
            type="button"
            className="lg:hidden w-[38px] h-[38px] shrink-0 inline-flex items-center justify-center rounded-xl text-[#64748B] hover:bg-[#F1F5F9] transition-colors"
            onClick={toggleSidebar}
          >
            <i className="ti ti-menu-2 text-[22px]" />
          </button>

          <Link href={route.vendorDashboard} className="no-underline shrink-0">
            <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-[#0ac79e] to-[#089e7e] flex items-center justify-center shadow-sm shadow-[#0ac79e]/20">
              <i className={pageMeta.icon + " text-[16px] text-white"} />
            </div>
          </Link>

          <div className="hidden sm:block min-w-0">
            <p className="text-[20px] font-bold text-[#0F172A] leading-tight m-0 truncate">
              {pageMeta.title}
            </p>
            {pageMeta.subtitle && (
              <p className="text-[13px] text-[#94A3B8] leading-tight m-0 truncate">
                {pageMeta.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right — profile */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="dropdown">
            <button
              type="button"
              className="flex items-center gap-2.5 py-1.5 pl-1.5 pr-3 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-sm bg-white transition-all"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {profilePictureUrl ? (
                <img
                  src={String(profilePictureUrl)}
                  alt={displayName}
                  className="w-[32px] h-[32px] rounded-[9px] object-cover"
                />
              ) : (
                <div className="w-[32px] h-[32px] rounded-[9px] bg-gradient-to-br from-[#E2E8F0] to-[#CBD5E1] flex items-center justify-center text-[14px] font-bold text-[#475569]">
                  {firstLetter}
                </div>
              )}

              <div className="hidden sm:block text-left">
                <p className="text-[13px] font-semibold text-[#0F172A] leading-tight m-0">
                  {displayName}
                </p>
                <p className="text-[11px] text-[#94A3B8] leading-tight m-0">
                  {displayRole}
                </p>
              </div>

              <i className="ti ti-chevron-down text-[13px] text-[#94A3B8] hidden sm:block" />
            </button>

            <div className="dropdown-menu dropdown-menu-end shadow-lg border border-[#F1F5F9] rounded-xl p-2 mt-1.5 min-w-[230px]">
              <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
                {profilePictureUrl ? (
                  <img
                    src={String(profilePictureUrl)}
                    alt={displayName}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E2E8F0] to-[#CBD5E1] flex items-center justify-center text-[16px] font-bold text-[#475569]">
                    {firstLetter}
                  </div>
                )}
                <div>
                  <p className="text-[14px] font-semibold text-[#0F172A] m-0">
                    {displayName}
                  </p>
                  <p className="text-[12px] text-[#94A3B8] m-0">{displayRole}</p>
                </div>
              </div>

              <div className="border-t border-[#F1F5F9] my-1" />

              <Link
                className="flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium text-[#475569] rounded-lg hover:bg-[#F8FAFC] hover:text-[#0ac79e] transition-colors no-underline"
                href={route.profile}
              >
                <i className="ti ti-user-circle text-[16px] text-[#94A3B8]" />
                My Profile
              </Link>

              <Link
                className="flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium text-[#475569] rounded-lg hover:bg-[#F8FAFC] hover:text-[#0ac79e] transition-colors no-underline"
                href={route.generalsettings}
              >
                <i className="ti ti-settings text-[16px] text-[#94A3B8]" />
                Settings
              </Link>

              <div className="border-t border-[#F1F5F9] my-1" />

              <LogoutLink className="flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium text-[#EF4444] rounded-lg hover:bg-[#FEF2F2] transition-colors no-underline">
                <i className="ti ti-logout text-[16px]" />
                Logout
              </LogoutLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
