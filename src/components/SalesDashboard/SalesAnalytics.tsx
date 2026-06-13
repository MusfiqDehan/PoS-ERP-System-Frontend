"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";
import { useState } from "react";
import SalesAnalyticsBarChart from "./SalesAnalyticsBarChart";
import {
  salesAnalyticsAssets,
  salesAnalyticsFilterOptions,
} from "./salesAnalyticsData";

export default function SalesAnalytics() {
  const [activeYear, setActiveYear] = useState(
    salesAnalyticsFilterOptions[0],
  );

  return (
    <div className="col-md-12 col-lg-7 col-sm-12 col-12 d-flex">
      <div className="sales-analytics flex-fill">
        <div className="sales-analytics__header">
          <h2 className="sales-analytics__title">Sales Analytics</h2>
          <div className="dropdown sales-analytics__filter-dropdown">
            <button
              type="button"
              className="sales-analytics__filter dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="sales-analytics__filter-content">
                <ImageWithBasePath
                  src={salesAnalyticsAssets.calendar}
                  alt=""
                  width={16}
                  height={16}
                />
                <span>{activeYear}</span>
              </span>
              <ImageWithBasePath
                src={salesAnalyticsAssets.chevronDown}
                alt=""
                width={16}
                height={16}
                className="sales-analytics__filter-chevron"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {salesAnalyticsFilterOptions.map((year) => (
                <li key={year}>
                  <Link
                    href="#"
                    className="dropdown-item"
                    onClick={(event) => {
                      event.preventDefault();
                      setActiveYear(year);
                    }}
                  >
                    {year}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="sales-analytics__body">
          <SalesAnalyticsBarChart />
        </div>
      </div>
    </div>
  );
}
