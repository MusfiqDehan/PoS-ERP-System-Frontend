"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";
import { useState } from "react";
import TopCategoriesChart from "./TopCategoriesChart";
import {
  topCategoriesAssets,
  topCategoriesFilterOptions,
  topCategoriesLegend,
  topCategoriesStats,
} from "./topCategoriesData";

export default function TopCategories() {
  const [activeFilter, setActiveFilter] = useState(
    topCategoriesFilterOptions[1],
  );

  return (
    <div className="col-xxl-4 col-md-6 d-flex">
      <div className="top-categories flex-fill">
        <div className="top-categories__header">
          <p className="top-categories__title">Top Categories</p>
          <div className="dropdown top-categories__filter-dropdown">
            <button
              type="button"
              className="top-categories__filter dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="top-categories__filter-content">
                <ImageWithBasePath
                  src={topCategoriesAssets.calendar}
                  alt=""
                  width={16}
                  height={16}
                />
                <span>{activeFilter}</span>
              </span>
              <ImageWithBasePath
                src={topCategoriesAssets.chevronDown}
                alt=""
                width={16}
                height={16}
                className="top-categories__filter-chevron"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {topCategoriesFilterOptions.map((option) => (
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

        <div className="top-categories__overview">
          <TopCategoriesChart />
          <ul className="top-categories__legend">
            {topCategoriesLegend.map((item) => (
              <li key={item.id} className="top-categories__legend-item">
                <span
                  className="top-categories__legend-dot"
                  style={{ backgroundColor: item.color }}
                />
                <div className="top-categories__legend-content">
                  <span className="top-categories__legend-label">
                    {item.label}
                  </span>
                  <span className="top-categories__legend-sales">
                    {item.sales} Sales
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="top-categories__stats-section">
          <p className="top-categories__stats-title">Category Statistics</p>
          <ul className="top-categories__stats">
            {topCategoriesStats.map((stat) => (
              <li
                key={stat.id}
                className="top-categories__stat"
                style={{ borderLeftColor: stat.borderColor }}
              >
                <span className="top-categories__stat-label">{stat.label}</span>
                <span className="top-categories__stat-value">{stat.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
