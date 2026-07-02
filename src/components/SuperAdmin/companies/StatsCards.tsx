"use client";

import { useCallback, useEffect, useState } from "react";
import { companies_details } from "@/core/json/companiesdetails";
import { fetchPlatformTenants, type PlatformTenant } from "@/lib/platform";
import { getAccessToken } from "@/lib/auth-session";

export default function StatsCards() {
  const [tenants, setTenants] = useState<PlatformTenant[]>([]);

  const loadTenants = useCallback(async function() {
    const token = getAccessToken();
    if (!token) return;

    const result = await fetchPlatformTenants(token);
    if (result.ok && result.body.success && result.body.data && Array.isArray(result.body.data)) {
      setTenants(result.body.data);
    }
  }, []);

  useEffect(function() {
    loadTenants();
  }, [loadTenants]);

  const total = tenants.length || companies_details.length;
  const active = tenants.length > 0
    ? tenants.filter(function(t) { return t.is_enabled; }).length
    : companies_details.filter(function(c: any) { return c.Status === "Active"; }).length;
  const inactive = tenants.length > 0
    ? tenants.filter(function(t) { return !t.is_enabled; }).length
    : companies_details.filter(function(c: any) { return c.Status === "Inactive"; }).length;
  const locations = tenants.length > 0
    ? new Set(
        tenants
          .map(function(t) { return t.locale || t.timezone; })
          .filter(Boolean),
      ).size
    : 0;
  const locationsDisplay = tenants.length > 0 ? locations : "---";

  const cards = [
    { label: "Total Companies", value: total, icon: "ti ti-building", accent: "#0ac79e", tint: "#E7FBF7" },
    { label: "Active Companies", value: active, icon: "ti ti-circle-check", accent: "#3EB780", tint: "#ECFAF2" },
    { label: "Inactive Companies", value: inactive, icon: "ti ti-ban", accent: "#FF4031", tint: "#FFE8E8" },
    { label: "Company Location", value: locationsDisplay, icon: "ti ti-map-pin-check", accent: "#06AED4", tint: "#E9F8FB" },
  ];

  return (
    <div className="grid grid-cols-1 min-[768px]:grid-cols-2 min-[992px]:grid-cols-4 gap-[20px] mb-[1.25rem]">
      {cards.map(function(card) {
        return (
          <div
            key={card.label}
            className="group relative bg-white rounded-[12px] p-5 border border-[#eef0f3] shadow-[0_1px_2px_rgba(16,24,40,0.04),0_1px_3px_rgba(16,24,40,0.06)] hover:shadow-[0_8px_24px_rgba(16,24,40,0.10)] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
          >
            {/* accent bar */}
            <span
              className="absolute top-0 left-0 h-full w-[4px]"
              style={{ backgroundColor: card.accent }}
              aria-hidden="true"
            />

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[16px] font-medium text-[#667085] truncate">
                  {card.label}
                </p>
                <h4 className="m-0 mt-2 text-[32px] font-bold leading-[1.1] text-[#101828] tracking-tight">
                  {card.value.toLocaleString()}
                </h4>
              </div>

              {/* icon tile */}
              <span
                className="w-[56px] h-[56px] rounded-[14px] flex items-center justify-center shrink-0 shadow-sm"
                style={{ backgroundColor: card.accent }}
              >
                <i className={card.icon + " text-white text-[26px]"} />
              </span>
            </div>

            {/* subtle bottom glow */}
            <span
              className="absolute bottom-0 left-0 right-0 h-[2px] opacity-40"
              style={{ background: "linear-gradient(to right, " + card.accent + ", transparent)" }}
              aria-hidden="true"
            />
          </div>
        );
      })}
    </div>
  );
}
