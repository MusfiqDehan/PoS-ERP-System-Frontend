"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchPlatformPackages, type Package } from "@/lib/billing";
import { getAccessToken } from "@/lib/auth-session";

function planTypeFromPkg(pkg: Package): string {
  const hasMonthly = pkg.price_monthly && parseFloat(pkg.price_monthly) > 0;
  const hasYearly = pkg.price_yearly && parseFloat(pkg.price_yearly) > 0;
  if (hasMonthly && hasYearly) return "Monthly & Yearly";
  if (hasYearly) return "Yearly";
  return "Monthly";
}

export default function StatsCards() {
  const [pkgs, setPkgs] = useState<Package[]>([]);
  const [loaded, setLoaded] = useState(false);

  const loadPackages = useCallback(async function() {
    const token = getAccessToken();
    if (!token) { setLoaded(true); return; }

    const result = await fetchPlatformPackages(token);
    if (result.ok && result.body.success && result.body.data && Array.isArray(result.body.data)) {
      setPkgs(result.body.data);
    }
    setLoaded(true);
  }, []);

  useEffect(function() {
    loadPackages();
  }, [loadPackages]);

  const total = loaded ? pkgs.length : "---";
  const active = loaded ? pkgs.filter(function(p) { return p.is_active; }).length : "---";
  const inactive = loaded ? pkgs.filter(function(p) { return !p.is_active; }).length : "---";
  const types = loaded ? new Set(pkgs.map(function(p) { return planTypeFromPkg(p); })).size : "---";

  const cards = [
    { label: "Total Plans", value: total, icon: "ti ti-box", accent: "#0ac79e" },
    { label: "Active Plans", value: active, icon: "ti ti-activity-heartbeat", accent: "#3EB780" },
    { label: "Inactive Plans", value: inactive, icon: "ti ti-player-pause", accent: "#FF4031" },
    { label: "Plan Types", value: types, icon: "ti ti-mask", accent: "#06AED4" },
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
