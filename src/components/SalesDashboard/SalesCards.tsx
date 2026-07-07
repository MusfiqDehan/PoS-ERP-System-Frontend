"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import { useSalesDashboardData } from "@/hooks/dashboard/useSalesDashboard";
import { formatCurrency, parseCurrency } from "@/lib/currency";
import {
  salesCardsAssets,
  salesStatCards,
  weeklyEarningCard,
  type SalesStatCard,
} from "./salesCardsData";

function formatChangePct(value: string | null | undefined): string {
  if (value == null || value === "") return "—";
  const num = Number.parseFloat(value);
  if (Number.isNaN(num)) return "—";
  const sign = num >= 0 ? "+" : "";
  return `${sign}${num}% vs Last Week`;
}

export default function SalesCards() {
  const { sales, loading } = useSalesDashboardData();
  const overview = sales?.overview;

  const weeklyCard = {
    title: weeklyEarningCard.title,
    value: overview
      ? formatCurrency(parseCurrency(overview.weekly_sales))
      : loading
        ? "…"
        : weeklyEarningCard.value,
    changeLabel: overview
      ? formatChangePct(overview.weekly_change_pct)
      : weeklyEarningCard.changeLabel,
  };

  const cards: SalesStatCard[] = overview
    ? [
        {
          id: "total-sales",
          title: "Total Sales",
          value: formatCurrency(parseCurrency(overview.total_sales)),
          badge: `${overview.order_count} Completed Orders`,
          variant: "sales",
          decoSrc: salesCardsAssets.totalSalesDeco,
        },
        {
          id: "purchased-goods",
          title: "Items Sold",
          value: String(parseCurrency(overview.items_sold)),
          badge: "Units from POS Sales",
          variant: "purchased",
          decoSrc: salesCardsAssets.purchasedGoodsDeco,
        },
        {
          id: "avg-order-value",
          title: "Avg Order Value",
          value: formatCurrency(parseCurrency(overview.avg_order_value)),
          badge: `${overview.weekly_order_count} orders this week`,
          variant: "avg-order",
          decoSrc: salesCardsAssets.avgOrderDeco,
          trendBadge: Boolean(overview.weekly_change_pct),
        },
      ]
    : salesStatCards;

  return (
    <div className="sales-cards">
      <div className="sales-cards__row">
        <div className="sales-cards__weekly">
          <div className="sales-cards__weekly-content">
            <p className="sales-cards__weekly-title">{weeklyCard.title}</p>
            <p className="sales-cards__weekly-value">{weeklyCard.value}</p>
          </div>
          <ImageWithBasePath
            src={salesCardsAssets.weeklyEarningDeco}
            alt=""
            width={64}
            height={64}
            className="sales-cards__weekly-deco"
          />
          <div className="sales-cards__weekly-footer">
            <div className="sales-cards__weekly-change">
              <ImageWithBasePath
                src={salesCardsAssets.arrowUp}
                alt=""
                width={16}
                height={16}
                className="sales-cards__weekly-change-icon"
              />
              <p className="sales-cards__weekly-change-text">
                {weeklyCard.changeLabel}
              </p>
            </div>
            <ImageWithBasePath
              src={salesCardsAssets.mastercard}
              alt=""
              width={36}
              height={24}
              className="sales-cards__weekly-brand"
            />
          </div>
        </div>

        {cards.map((card) => (
          <div
            key={card.id}
            className={`sales-cards__stat sales-cards__stat--${card.variant}`}
          >
            <div className="sales-cards__stat-top">
              <div className="sales-cards__stat-copy">
                <p className="sales-cards__stat-title">{card.title}</p>
                <p className="sales-cards__stat-value">{card.value}</p>
              </div>
              <button
                type="button"
                className="sales-cards__stat-refresh"
                aria-label={`Refresh ${card.title}`}
              >
                <ImageWithBasePath
                  src={salesCardsAssets.refresh}
                  alt=""
                  width={20}
                  height={20}
                />
              </button>
            </div>
            <div
              className={`sales-cards__stat-badge${
                card.trendBadge ? " sales-cards__stat-badge--trend" : ""
              }`}
            >
              {card.trendBadge && (
                <ImageWithBasePath
                  src={salesCardsAssets.arrowUp}
                  alt=""
                  width={14}
                  height={14}
                  className="sales-cards__stat-badge-icon"
                />
              )}
              <span>{card.badge}</span>
            </div>
            <div className="sales-cards__stat-deco" aria-hidden="true">
              <ImageWithBasePath
                src={card.decoSrc}
                alt=""
                width={32}
                height={32}
                className="sales-cards__stat-deco-img"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
