"use client";

import {
  salesPurchaseChartMax,
  salesPurchaseMonths,
  salesPurchaseYAxisLabels,
} from "./salesPurchaseChartData";

const toBarHeight = (value: number) =>
  `${(value / salesPurchaseChartMax) * 100}%`;

export default function SalesPurchaseBarChart() {
  return (
    <div className="sales-purchase-chart__plot">
      <div className="sales-purchase-chart__y-axis" aria-hidden="true">
        {salesPurchaseYAxisLabels.map((label) => (
          <span key={label} className="sales-purchase-chart__y-label">
            {label}
          </span>
        ))}
      </div>
      <div className="sales-purchase-chart__chart-main">
        <div className="sales-purchase-chart__bars-area">
          <div className="sales-purchase-chart__grid-lines" aria-hidden="true">
            {salesPurchaseYAxisLabels.slice(0, -1).map((label) => (
              <span key={label} className="sales-purchase-chart__grid-line" />
            ))}
          </div>
          <div className="sales-purchase-chart__bars">
            {salesPurchaseMonths.map((item) => (
              <div key={item.month} className="sales-purchase-chart__bar-group">
                <div className="sales-purchase-chart__bar-stack">
                  <span
                    className="sales-purchase-chart__bar sales-purchase-chart__bar--purchase"
                    style={{ height: toBarHeight(item.purchase) }}
                  />
                  <span
                    className="sales-purchase-chart__bar sales-purchase-chart__bar--sales"
                    style={{ height: toBarHeight(item.sales) }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sales-purchase-chart__x-labels">
          {salesPurchaseMonths.map((item) => (
            <span key={item.month} className="sales-purchase-chart__x-label">
              {item.month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
