"use client";

import { useEffect, useState } from "react";
import { fetchPlatformInvoices, type SubscriptionStats } from "@/lib/billing";
import { getAccessToken } from "@/lib/auth-session";
import { cacheGet, cacheSet, CACHE_KEYS } from "@/lib/api-cache";

const FALLBACK_STATS: SubscriptionStats = {
  total_revenue: "0",
  successful_payments: 0,
  failed_payments: 0,
  pending_payments: 0,
  unique_paying_tenants: 0,
};

export default function StatsCards() {
  const [stats, setStats] = useState<SubscriptionStats>(function() {
    return cacheGet<SubscriptionStats>(CACHE_KEYS.SUBSCRIPTION_STATS) ?? FALLBACK_STATS;
  });
  // loaded=true if we had cached stats (show numbers immediately) or after API responds
  const [loaded, setLoaded] = useState(function() {
    return cacheGet<SubscriptionStats>(CACHE_KEYS.SUBSCRIPTION_STATS) !== null;
  });

  useEffect(function() {
    const token = getAccessToken();
    if (!token) { setLoaded(true); return; }

    fetchPlatformInvoices(token).then(function(result) {
      if (result.ok && result.body.success && result.body.data && result.body.data.stats) {
        const s = result.body.data.stats as SubscriptionStats;
        cacheSet(CACHE_KEYS.SUBSCRIPTION_STATS, s);
        setStats(s);
      }
      setLoaded(true);
    });
  }, []);

  const totalRevenue = loaded ? "$" + Number(stats.total_revenue).toLocaleString() : "---";
  const totalPayments = loaded ? String(stats.successful_payments + stats.failed_payments + stats.pending_payments) : "---";
  const successful = loaded ? String(stats.successful_payments) : "---";
  const failed = loaded ? String(stats.failed_payments) : "---";

  const cards = [
    { label: "Total Revenue", value: totalRevenue, icon: "ti ti-report-money", accent: "#4687f4" },
    { label: "Total Payments", value: totalPayments, icon: "ti ti-credit-card", accent: "#0ac79e" },
    { label: "Successful", value: successful, icon: "ti ti-user-check", accent: "#3EB780" },
    { label: "Failed", value: failed, icon: "ti ti-user-x", accent: "#FF4031" },
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
