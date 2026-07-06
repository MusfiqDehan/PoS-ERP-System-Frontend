"use client";
/* eslint-disable @next/next/no-img-element */

import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";
import { useState } from "react";
import { useSalesDashboardData } from "@/hooks/dashboard/useSalesDashboard";
import { formatCurrency, parseCurrency } from "@/lib/currency";
import { DEFAULT_POS_PRODUCT_IMAGE, resolveProductImageUrl } from "@/lib/media";
import {
  recentSalesAssets,
  recentSalesData,
  recentSalesFilterOptions,
  recentSaleStatusStyles,
  type RecentSaleStatus,
} from "./recentSalesData";

function formatSaleDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function RecentSales() {
  const { sales, loading } = useSalesDashboardData();
  const [activeFilter, setActiveFilter] = useState(recentSalesFilterOptions[0]);

  const recentSales = sales?.recent_sales ?? [];
  const items = recentSales.length
    ? recentSales.map((sale) => ({
        id: sale.id,
        name: sale.product_name,
        price: formatCurrency(parseCurrency(sale.total)),
        category: sale.category_name || sale.customer_name,
        date: formatSaleDate(sale.created_at),
        status: sale.status as RecentSaleStatus,
        statusLabel:
          sale.status === "completed"
            ? "Completed"
            : sale.status.charAt(0).toUpperCase() + sale.status.slice(1),
        imageSrc: resolveProductImageUrl(
          sale.product_image,
          DEFAULT_POS_PRODUCT_IMAGE,
        ),
      }))
    : loading
      ? []
      : recentSalesData;

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
          {items.length === 0 ? (
            <p className="px-3 py-4 text-[#646B72]">
              {loading ? "Loading…" : "No completed POS sales yet."}
            </p>
          ) : (
            <ul className="recent-sales__list">
              {items.map((sale, index) => {
                const statusStyle =
                  recentSaleStatusStyles[sale.status] ??
                  recentSaleStatusStyles.completed;

                return (
                  <li
                    key={sale.id}
                    className={`recent-sales__item${
                      index < items.length - 1
                        ? " recent-sales__item--divider"
                        : ""
                    }`}
                  >
                    <div className="recent-sales__sale">
                      <img
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
          )}
        </div>
      </div>
    </div>
  );
}
