"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";
import { useState } from "react";
import SalesStatisticsBarChart from "./SalesStatisticsBarChart";
import {
  salesStatisticsAssets,
  salesStatisticsFilterOptions,
  salesStatisticsLegend,
} from "./salesStatisticsData";

export default function SalesStatistics() {
  const [activeFilter, setActiveFilter] = useState(
    salesStatisticsFilterOptions[0],
  );

  return (
    <div className="col-xl-6 col-sm-12 col-12 d-flex">
      <div className="sales-statistics flex-fill">
        <div className="sales-statistics__header">
          <p className="sales-statistics__title">Sales Statics</p>
          <div className="dropdown sales-statistics__filter-dropdown">
            <button
              type="button"
              className="sales-statistics__filter dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="sales-statistics__filter-content">
                <ImageWithBasePath
                  src={salesStatisticsAssets.calendar}
                  alt=""
                  width={16}
                  height={16}
                />
                <span>{activeFilter}</span>
              </span>
              <ImageWithBasePath
                src={salesStatisticsAssets.chevronDown}
                alt=""
                width={16}
                height={16}
                className="sales-statistics__filter-chevron"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {salesStatisticsFilterOptions.map((option) => (
                <li key={option}>
                  <Link
                    href="#"
                    className="dropdown-item"
                    onClick={(event) => {
                      event.preventDefault();
                      setActiveFilter(option);
                    }}
                  >
                    {option}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="sales-statistics__body">
          <SalesStatisticsBarChart />
        </div>

        <div className="sales-statistics__legend">
          <div className="sales-statistics__legend-item">
            <ImageWithBasePath
              src={salesStatisticsAssets.legendRevenue}
              alt=""
              width={8}
              height={8}
              className="sales-statistics__legend-dot"
            />
            <p className="sales-statistics__legend-text">
              {salesStatisticsLegend.revenue.label} :{" "}
              <span
                className="sales-statistics__legend-value"
                style={{ color: salesStatisticsLegend.revenue.valueColor }}
              >
                {salesStatisticsLegend.revenue.value}
              </span>
            </p>
            <span className="sales-statistics__legend-badge sales-statistics__legend-badge--up">
              <ImageWithBasePath
                src={salesStatisticsAssets.arrowUp}
                alt=""
                width={14}
                height={14}
              />
              {salesStatisticsLegend.revenue.change}
            </span>
          </div>
          <div className="sales-statistics__legend-item">
            <ImageWithBasePath
              src={salesStatisticsAssets.legendExpense}
              alt=""
              width={8}
              height={8}
              className="sales-statistics__legend-dot"
            />
            <p className="sales-statistics__legend-text">
              {salesStatisticsLegend.expense.label} :{" "}
              <span
                className="sales-statistics__legend-value"
                style={{ color: salesStatisticsLegend.expense.valueColor }}
              >
                {salesStatisticsLegend.expense.value}
              </span>
            </p>
            <span className="sales-statistics__legend-badge sales-statistics__legend-badge--down">
              <ImageWithBasePath
                src={salesStatisticsAssets.arrowDown}
                alt=""
                width={14}
                height={14}
              />
              {salesStatisticsLegend.expense.change}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
