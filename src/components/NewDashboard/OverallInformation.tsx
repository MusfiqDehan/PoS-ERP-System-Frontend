"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";
import { useState } from "react";
import CustomerOverviewChart from "./CustomerOverviewChart";
import {
  customerOverviewFilterOptions,
  customerOverviewMetrics,
  overallInformationAssets,
  overallStatsData,
} from "./overallInformationData";

export default function OverallInformation() {
  const [activeFilter, setActiveFilter] =
    useState(customerOverviewFilterOptions[0]);

  return (
    <div className="col-xxl-4 col-xl-5 d-flex">
      <div className="overall-information flex-fill">
        <h2 className="overall-information__title">Overall Information</h2>

        <div className="overall-information__stats">
          {overallStatsData.map((stat) => (
            <div
              key={stat.id}
              className="overall-information__stat"
              style={{
                borderTopColor: stat.borderColor,
                maxWidth: stat.width,
              }}
            >
              <div className="overall-information__stat-head">
                <ImageWithBasePath
                  src={stat.iconSrc}
                  alt=""
                  width={18}
                  height={18}
                  className="overall-information__stat-icon"
                />
                <span
                  className="overall-information__stat-label"
                  style={{ color: stat.labelColor }}
                >
                  {stat.label}
                </span>
              </div>
              <p className="overall-information__stat-value">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="overall-information__customers">
          <div className="overall-information__customers-header">
            <h2 className="overall-information__subtitle">Customers Overview</h2>
            <div className="dropdown overall-information__filter-dropdown">
              <button
                type="button"
                className="overall-information__filter dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="overall-information__filter-content">
                  <ImageWithBasePath
                    src={overallInformationAssets.calendar}
                    alt=""
                    width={14}
                    height={14}
                  />
                  <span>{activeFilter}</span>
                </span>
                <ImageWithBasePath
                  src={overallInformationAssets.chevronDown}
                  alt=""
                  width={8}
                  height={5}
                  className="overall-information__filter-chevron"
                />
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {customerOverviewFilterOptions.map((option) => (
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

          <div className="overall-information__customers-body">
            <CustomerOverviewChart />
            <div className="overall-information__metrics">
              {customerOverviewMetrics.map((metric) => (
                <div
                  key={metric.id}
                  className="overall-information__metric"
                  style={{ borderLeftColor: metric.borderColor }}
                >
                  <p className="overall-information__metric-text">
                    {metric.value}{" "}
                    <span style={{ color: metric.labelColor }}>
                      {metric.label}
                    </span>
                  </p>
                  <span className="overall-information__metric-badge">
                    <ImageWithBasePath
                      src={overallInformationAssets.arrowUp}
                      alt=""
                      width={14}
                      height={14}
                    />
                    {metric.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
