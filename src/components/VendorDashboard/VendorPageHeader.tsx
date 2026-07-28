"use client";

import { all_routes } from "@/data/all_routes";
import Link from "next/link";

export default function VendorPageHeader() {
  const routes = all_routes;

  return (
    <div className="relative overflow-hidden rounded-[14px] mb-5 p-6 sm:p-7 bg-gradient-to-br from-[#0ac79e] via-[#089b7c] to-[#06806a] shadow-[0_8px_24px_rgba(8,155,124,0.25)]">
      {/* decorative glows */}
      <div className="absolute -top-16 -right-10 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-20 left-1/3 w-52 h-52 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute top-6 right-24 w-24 h-24 rounded-full border border-white/15" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-white/90 text-[14px] font-semibold mb-2.5 backdrop-blur-sm">
            <i className="ti ti-sparkles text-[14px]" />
            Platform Overview
          </span>
          <h2 className="m-0 text-[26px] sm:text-[28px] font-bold text-white leading-tight">
            Welcome Back, Adrian
          </h2>
          <p className="m-0 mt-1 text-[16px] text-white/80">
            14 New Companies subscribed today &mdash; great momentum!
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href={routes.superAdminCompanies}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white text-[#089b7c] text-[14px] font-semibold hover:bg-white/90 transition-colors shadow-sm"
          >
            <i className="ti ti-building text-[16px]" />
            Companies
          </Link>
          <Link
            href={routes.superAdminPackages}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white/15 text-white text-[14px] font-semibold hover:bg-white/25 transition-colors backdrop-blur-sm border border-white/20"
          >
            <i className="ti ti-box text-[16px]" />
            All Packages
          </Link>
        </div>
      </div>
    </div>
  );
}
