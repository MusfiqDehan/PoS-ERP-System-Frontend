"use client";

import { useCallback, useState } from "react";
import {
  orderStatisticsDays,
  orderStatisticsFeaturedTooltip,
  orderStatisticsTimeLabels,
} from "./orderStatisticsData";

type TooltipState = {
  dayIndex: number;
  rowIndex: number;
  orders: number;
} | null;

export default function OrderStatisticsHeatmap() {
  const [tooltip, setTooltip] = useState<TooltipState>(
    orderStatisticsFeaturedTooltip,
  );

  const showTooltip = useCallback(
    (dayIndex: number, rowIndex: number, orders: number) => {
      setTooltip({ dayIndex, rowIndex, orders });
    },
    [],
  );

  const resetTooltip = useCallback(() => {
    setTooltip(orderStatisticsFeaturedTooltip);
  }, []);

  const activeTooltip = tooltip ?? orderStatisticsFeaturedTooltip;

  return (
    <div className="order-statistics__chart">
      <ul className="order-statistics__y-labels" aria-hidden="true">
        {orderStatisticsTimeLabels.map((label, index) => (
          <li key={`${label}-${index}`} className="order-statistics__y-label">
            {label}
          </li>
        ))}
      </ul>

      <div className="order-statistics__heatmap">
        <div className="order-statistics__grid">
          {orderStatisticsDays.map((day, dayIndex) => (
            <div key={day.id} className="order-statistics__column">
              {day.cells.map((cell, rowIndex) => (
                <div
                  key={`${day.id}-${rowIndex}`}
                  className={`order-statistics__cell${
                    cell.active ? " order-statistics__cell--active" : ""
                  }`}
                  onMouseEnter={() => {
                    if (cell.active && cell.orders) {
                      showTooltip(dayIndex, rowIndex, cell.orders);
                    }
                  }}
                  onMouseLeave={resetTooltip}
                  onFocus={() => {
                    if (cell.active && cell.orders) {
                      showTooltip(dayIndex, rowIndex, cell.orders);
                    }
                  }}
                  onBlur={resetTooltip}
                  tabIndex={cell.active ? 0 : -1}
                  role={cell.active ? "button" : undefined}
                  aria-label={
                    cell.active && cell.orders
                      ? `${day.label} ${orderStatisticsTimeLabels[rowIndex]}: ${cell.orders} orders`
                      : undefined
                  }
                />
              ))}
            </div>
          ))}
        </div>

        <ul className="order-statistics__x-labels" aria-hidden="true">
          {orderStatisticsDays.map((day) => (
            <li key={day.id} className="order-statistics__x-label">
              {day.label}
            </li>
          ))}
        </ul>

        <div
          className="order-statistics__tooltip"
          style={{
            "--tooltip-day": activeTooltip.dayIndex,
            "--tooltip-row": activeTooltip.rowIndex,
          }}
        >
          <p className="order-statistics__tooltip-text">
            {activeTooltip.orders} Orders
          </p>
          <span className="order-statistics__tooltip-arrow" aria-hidden="true" />
          <span className="order-statistics__tooltip-marker" aria-hidden="true">
            <span className="order-statistics__tooltip-marker-core" />
          </span>
        </div>
      </div>
    </div>
  );
}
