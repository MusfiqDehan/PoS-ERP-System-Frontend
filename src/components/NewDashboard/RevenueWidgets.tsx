"use client";

import RevenueStatItem from "./RevenueStatItem";
import { useSalesDashboardData } from "@/hooks/dashboard/useSalesDashboard";
import { formatCurrency, parseCurrency } from "@/lib/currency";
import { revenueStatsData, type RevenueStatData } from "./revenueStatsData";

export default function RevenueWidgets() {
  const { sales } = useSalesDashboardData();
  const overview = sales?.overview;

  const stats: RevenueStatData[] = overview
    ? revenueStatsData.map((stat) => {
        if (stat.id === "profit") {
          return {
            ...stat,
            label: "Total POS Sales",
            value: formatCurrency(parseCurrency(overview.total_sales)),
            change: `${overview.order_count} orders`,
            trend: "up",
          };
        }
        if (stat.id === "invoice-due") {
          return {
            ...stat,
            label: "Weekly Sales",
            value: formatCurrency(parseCurrency(overview.weekly_sales)),
            change: overview.weekly_change_pct
              ? `${overview.weekly_change_pct}%`
              : "—",
            trend:
              overview.weekly_change_pct &&
              Number.parseFloat(overview.weekly_change_pct) < 0
                ? "down"
                : "up",
          };
        }
        if (stat.id === "total-expenses") {
          return {
            ...stat,
            label: "Avg Order Value",
            value: formatCurrency(parseCurrency(overview.avg_order_value)),
            change: `${overview.items_sold} items`,
            trend: "up",
          };
        }
        return stat;
      })
    : revenueStatsData;

  return (
    <div className="mt-[24px] bg-white border border-[#f1f1f1] rounded-[8px] overflow-hidden">
      <div className="flex items-center justify-between py-[18px] px-[16px] gap-0 max-[1199.98px]:flex-wrap max-[1199.98px]:gap-x-0 max-[1199.98px]:gap-y-[24px]">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className="flex items-center flex-[1_1_0] min-w-0 max-[1199.98px]:flex-[1_1_calc(50%_-_12px)] max-[1199.98px]:px-[12px] max-[575px]:flex-[1_1_100%]"
          >
            {index > 0 ? (
              <span
                className="w-px h-[93px] bg-[#e7e7e7] shrink-0 mr-[16px] max-[1199.98px]:hidden"
                aria-hidden="true"
              />
            ) : null}
            <RevenueStatItem
              stat={stat}
              isFirst={index === 0}
              isLast={index === stats.length - 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
