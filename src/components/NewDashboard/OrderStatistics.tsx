"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";
import { useState } from "react";
import OrderStatisticsHeatmap from "./OrderStatisticsHeatmap";
import {
  orderStatisticsAssets,
  orderStatisticsFilterOptions,
} from "./orderStatisticsData";

export default function OrderStatistics() {
  const [activeFilter, setActiveFilter] = useState(
    orderStatisticsFilterOptions[1],
  );

  return (
    <div className="col-xxl-4 col-md-6 d-flex">
      <div className="order-statistics flex-fill">
        <div className="order-statistics__header">
          <p className="order-statistics__title">Order Statistics</p>
          <div className="dropdown order-statistics__filter-dropdown">
            <button
              type="button"
              className="order-statistics__filter dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="order-statistics__filter-content">
                <ImageWithBasePath
                  src={orderStatisticsAssets.calendar}
                  alt=""
                  width={16}
                  height={16}
                />
                <span>{activeFilter}</span>
              </span>
              <ImageWithBasePath
                src={orderStatisticsAssets.chevronDown}
                alt=""
                width={16}
                height={16}
                className="order-statistics__filter-chevron"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {orderStatisticsFilterOptions.map((option) => (
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

        <div className="order-statistics__body">
          <OrderStatisticsHeatmap />
        </div>
      </div>
    </div>
  );
}
