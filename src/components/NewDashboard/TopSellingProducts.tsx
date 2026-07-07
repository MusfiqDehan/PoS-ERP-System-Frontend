"use client";
/* eslint-disable @next/next/no-img-element */

import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";
import { useState } from "react";
import { useSalesDashboardData } from "@/hooks/dashboard/useSalesDashboard";
import { formatCurrency, parseCurrency } from "@/lib/currency";
import { DEFAULT_POS_PRODUCT_IMAGE, resolveProductImageUrl } from "@/lib/media";
import {
  topSellingFilterOptions,
  topSellingProductsAssets,
  topSellingProductsData,
} from "./topSellingProductsData";

export default function TopSellingProducts() {
  const { sales, loading } = useSalesDashboardData();
  const [activeFilter, setActiveFilter] = useState(topSellingFilterOptions[0]);

  const topProducts = sales?.top_products ?? [];
  const products = topProducts.length
    ? topProducts.map((product) => ({
        id: product.product_id,
        name: product.product_name,
        price: formatCurrency(parseCurrency(product.price)),
        sales: `${parseCurrency(product.quantity_sold)} sold`,
        change: formatCurrency(parseCurrency(product.revenue)),
        trend: "up" as const,
        imageSrc: resolveProductImageUrl(
          product.image,
          DEFAULT_POS_PRODUCT_IMAGE,
        ),
      }))
    : loading
      ? []
      : topSellingProductsData;

  return (
    <div className="col-xxl-4 col-md-6 d-flex">
      <div className="top-selling-products flex-fill">
        <div className="top-selling-products__header">
          <h2 className="top-selling-products__title">Top Selling Products</h2>
          <div className="dropdown top-selling-products__filter-dropdown">
            <button
              type="button"
              className="top-selling-products__filter dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="top-selling-products__filter-content">
                <ImageWithBasePath
                  src={topSellingProductsAssets.calendar}
                  alt=""
                  width={16}
                  height={16}
                />
                <span>{activeFilter}</span>
              </span>
              <ImageWithBasePath
                src={topSellingProductsAssets.chevronDown}
                alt=""
                width={16}
                height={16}
                className="top-selling-products__filter-chevron"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {topSellingFilterOptions.map((option) => (
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

        <div className="top-selling-products__body">
          {products.length === 0 ? (
            <p className="px-3 py-4 text-[#646B72]">
              {loading ? "Loading…" : "No completed POS sales yet."}
            </p>
          ) : (
            <ul className="top-selling-products__list">
              {products.map((product, index) => (
                <li
                  key={product.id}
                  className={`top-selling-products__item${
                    index < products.length - 1
                      ? " top-selling-products__item--divider"
                      : ""
                  }`}
                >
                  <div className="top-selling-products__product">
                    <img
                      src={product.imageSrc}
                      alt=""
                      width={48}
                      height={48}
                      className="top-selling-products__thumb"
                    />
                    <div className="top-selling-products__info">
                      <p className="top-selling-products__name">{product.name}</p>
                      <div className="top-selling-products__meta">
                        <span className="top-selling-products__price">
                          {product.price}
                        </span>
                        <span className="top-selling-products__sales">
                          {product.sales}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`top-selling-products__badge top-selling-products__badge--${product.trend}`}
                    >
                      <ImageWithBasePath
                        src={topSellingProductsAssets.arrowUp}
                        alt=""
                        width={14}
                        height={14}
                      />
                      {product.change}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
