"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchPlatformTenants, type PlatformTenant } from "@/lib/platform";
import { getAccessToken } from "@/lib/auth-session";

export default function DomainStatsCards() {
  const [tenants, setTenants] = useState<PlatformTenant[]>([]);
  const [loaded, setLoaded] = useState(false);

  const loadTenants = useCallback(async function() {
    const token = getAccessToken();
    if (!token) { setLoaded(true); return; }

    const result = await fetchPlatformTenants(token);
    if (result.ok && result.body.success && result.body.data && Array.isArray(result.body.data)) {
      setTenants(result.body.data);
    }
    setLoaded(true);
  }, []);

  useEffect(function() {
    loadTenants();
  }, [loadTenants]);

  const totalDomains = loaded
    ? tenants.reduce(function(sum, t) { return sum + (t.domains ? t.domains.length : 0); }, 0)
    : "---";

  const customEnabled = loaded
    ? tenants.filter(function(t) { return t.custom_domain_enabled; }).length
    : "---";

  const withDomain = loaded
    ? tenants.filter(function(t) { return t.domains && t.domains.length > 0; }).length
    : "---";

  const noDomain = loaded
    ? tenants.filter(function(t) { return !t.domains || t.domains.length === 0; }).length
    : "---";

  const cards = [
    { label: "Total Domains", value: totalDomains, icon: "ti ti-world", accent: "#4687f4" },
    { label: "Custom Enabled", value: customEnabled, icon: "ti ti-link", accent: "#0ac79e" },
    { label: "With Domain", value: withDomain, icon: "ti ti-globe", accent: "#7364c2" },
    { label: "No Domain", value: noDomain, icon: "ti ti-world-off", accent: "#FF4031" },
  ];

  if (!loaded) {
    return (
      <div className="grid grid-cols-1 min-[768px]:grid-cols-2 min-[992px]:grid-cols-4 gap-[20px] mb-[1.25rem]">
        {cards.map(function(card) {
          return (
            <div
              key={card.label}
              className="bg-white rounded-[12px] p-5 border border-[#eef0f3] animate-pulse h-[120px]"
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 min-[768px]:grid-cols-2 min-[992px]:grid-cols-4 gap-[20px] mb-[1.25rem]">
      {cards.map(function(card) {
        return (
          <div
            key={card.label}
            className="group relative bg-white rounded-[12px] p-5 border border-[#eef0f3] shadow-[0_1px_2px_rgba(16,24,40,0.04),0_1px_3px_rgba(16,24,40,0.06)] hover:shadow-[0_8px_24px_rgba(16,24,40,0.10)] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
          >
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
                  {card.value}
                </h4>
              </div>

              <span
                className="w-[56px] h-[56px] rounded-[14px] flex items-center justify-center shrink-0 shadow-sm"
                style={{ backgroundColor: card.accent }}
              >
                <i className={card.icon + " text-white text-[26px]"} />
              </span>
            </div>

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
