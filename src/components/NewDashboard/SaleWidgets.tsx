"use client";

import KpiCard from "./KpiCard";
import { useSalesDashboardData } from "@/hooks/dashboard/useSalesDashboard";
import { formatCurrency, parseCurrency } from "@/lib/currency";
import { kpiCardsData, type KpiCardData } from "./kpiCardsData";

export default function SaleWidgets() {
  const { sales, loading } = useSalesDashboardData();
  const overview = sales?.overview;

  const cards: KpiCardData[] = overview
    ? kpiCardsData.map((card) => {
        if (card.id === "total-sales") {
          return {
            ...card,
            value: formatCurrency(parseCurrency(overview.total_sales)),
            change: `${overview.order_count} orders`,
            trend: "up" as const,
          };
        }
        if (card.id === "total-sales-return") {
          return {
            ...card,
            title: "Weekly POS Sales",
            value: formatCurrency(parseCurrency(overview.weekly_sales)),
            change: overview.weekly_change_pct
              ? `${overview.weekly_change_pct}%`
              : `${overview.weekly_order_count} orders`,
            trend:
              overview.weekly_change_pct &&
              Number.parseFloat(overview.weekly_change_pct) < 0
                ? "down"
                : "up",
          };
        }
        if (card.id === "total-purchase") {
          return {
            ...card,
            title: "Avg Order Value",
            value: formatCurrency(parseCurrency(overview.avg_order_value)),
            change: `${overview.items_sold} items sold`,
            trend: "up" as const,
          };
        }
        return card;
      })
    : loading
      ? kpiCardsData.map((card) => ({ ...card, value: "…" }))
      : kpiCardsData;

  return (
    <div className="grid grid-cols-1 min-[576px]:grid-cols-2 min-[1200px]:grid-cols-4 gap-x-[24px] gap-y-[16px] min-[1200px]:gap-y-[24px]">
      {cards.map((card) => (
        <KpiCard key={card.id} card={card} />
      ))}
    </div>
  );
}
