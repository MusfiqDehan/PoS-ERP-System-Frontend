"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import { useState } from "react";
import SalesPurchaseBarChart from "./SalesPurchaseBarChart";
import {
  salesPurchaseLegend,
  salesPurchasePeriods,
  type SalesPurchasePeriod,
} from "./salesPurchaseChartData";

export default function SalesPurchaseChart() {
  const [activePeriod, setActivePeriod] =
    useState<SalesPurchasePeriod>("1Y");

  return (
    <div className="col-xxl-8 col-xl-7 col-sm-12 col-12 d-flex">
      <div className="sales-purchase-chart flex-fill">
        <div className="sales-purchase-chart__header">
          <h5 className="sales-purchase-chart__title">Sales &amp; Purchase</h5>
          <div className="sales-purchase-chart__filters" role="group">
            {salesPurchasePeriods.map((period) => (
              <button
                key={period}
                type="button"
                className={`sales-purchase-chart__filter${
                  activePeriod === period
                    ? " sales-purchase-chart__filter--active"
                    : ""
                }`}
                onClick={() => setActivePeriod(period)}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="sales-purchase-chart__body">
          <SalesPurchaseBarChart />
        </div>

        <div className="sales-purchase-chart__legend">
          <div className="sales-purchase-chart__legend-item">
            <ImageWithBasePath
              src={salesPurchaseLegend.purchase.iconSrc}
              alt=""
              width={8}
              height={8}
              className="sales-purchase-chart__legend-dot"
            />
            <p className="sales-purchase-chart__legend-text">
              {salesPurchaseLegend.purchase.label}{" "}
              <span className="sales-purchase-chart__legend-value">
                ({salesPurchaseLegend.purchase.value})
              </span>
            </p>
          </div>
          <div className="sales-purchase-chart__legend-item">
            <ImageWithBasePath
              src={salesPurchaseLegend.sales.iconSrc}
              alt=""
              width={8}
              height={8}
              className="sales-purchase-chart__legend-dot"
            />
            <p className="sales-purchase-chart__legend-text">
              {salesPurchaseLegend.sales.label}{" "}
              <span className="sales-purchase-chart__legend-value">
                ({salesPurchaseLegend.sales.value})
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
