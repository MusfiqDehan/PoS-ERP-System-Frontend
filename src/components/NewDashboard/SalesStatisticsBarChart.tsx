"use client";

import {
  salesStatisticsMonths,
  salesStatisticsYAxisLabels,
} from "./salesStatisticsData";

export default function SalesStatisticsBarChart() {
  return (
    <div className="sales-statistics__plot">
      <div className="sales-statistics__y-axis" aria-hidden="true">
        {salesStatisticsYAxisLabels.map((label) => (
          <span key={label} className="sales-statistics__y-label">
            {label}
          </span>
        ))}
      </div>
      <div className="sales-statistics__chart-main">
        <div className="sales-statistics__bars-area">
          <span className="sales-statistics__zero-line" aria-hidden="true" />
          <div className="sales-statistics__bars">
            {salesStatisticsMonths.map((item) => (
              <div
                key={item.month}
                className="sales-statistics__bar-group"
              >
                <div className="sales-statistics__bar-half sales-statistics__bar-half--positive">
                  <span
                    className="sales-statistics__bar sales-statistics__bar--revenue"
                    style={{ height: `${item.revenue}px` }}
                  />
                </div>
                <div className="sales-statistics__bar-half sales-statistics__bar-half--negative">
                  <span
                    className="sales-statistics__bar sales-statistics__bar--expense"
                    style={{ height: `${item.expense}px` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sales-statistics__x-labels">
          {salesStatisticsMonths.map((item) => (
            <span key={item.month} className="sales-statistics__x-label">
              {item.month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
