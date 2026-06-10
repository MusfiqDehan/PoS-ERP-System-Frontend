"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";
import { useState } from "react";
import {
  recentSalesAssets,
  recentSalesData,
  recentSalesFilterOptions,
  recentSaleStatusStyles,
} from "./recentSalesData";

export default function RecentSales() {
  const [activeFilter, setActiveFilter] = useState(recentSalesFilterOptions[0]);

  return (
    <div className="col-xxl-4 col-md-12 d-flex">
      <div className="recent-sales flex-fill">
        <div className="recent-sales__header">
          <p className="recent-sales__title">Recent Sales</p>
          <div className="dropdown recent-sales__filter-dropdown">
            <button
              type="button"
              className="recent-sales__filter dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="recent-sales__filter-content">
                <ImageWithBasePath
                  src={recentSalesAssets.calendar}
                  alt=""
                  width={16}
                  height={16}
                />
                <span>{activeFilter}</span>
              </span>
              <ImageWithBasePath
                src={recentSalesAssets.chevronDown}
                alt=""
                width={16}
                height={16}
                className="recent-sales__filter-chevron"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {recentSalesFilterOptions.map((option) => (
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

        <div className="recent-sales__body">
          <ul className="recent-sales__list">
            {recentSalesData.map((sale, index) => {
              const statusStyle = recentSaleStatusStyles[sale.status];

              return (
                <li
                  key={sale.id}
                  className={`recent-sales__item${
                    index < recentSalesData.length - 1
                      ? " recent-sales__item--divider"
                      : ""
                  }`}
                >
                  <div className="recent-sales__sale">
                    <ImageWithBasePath
                      src={sale.imageSrc}
                      alt=""
                      width={48}
                      height={48}
                      className="recent-sales__thumb"
                    />
                    <div className="recent-sales__info">
                      <p className="recent-sales__name">{sale.name}</p>
                      <div className="recent-sales__meta">
                        <span className="recent-sales__price">{sale.price}</span>
                        <span className="recent-sales__category">
                          {sale.category}
                        </span>
                      </div>
                    </div>
                    <div className="recent-sales__status">
                      <span className="recent-sales__date">{sale.date}</span>
                      <span
                        className="recent-sales__badge"
                        style={{
                          backgroundColor: statusStyle.background,
                          color: statusStyle.color,
                        }}
                      >
                        {sale.statusLabel}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
