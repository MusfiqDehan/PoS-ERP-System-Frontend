"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import { all_routes } from "@/data/all_routes";
import Link from "next/link";
import { useSalesDashboardData } from "@/hooks/dashboard/useSalesDashboard";
import {
  formatLowStockCount,
  lowStockProductsData,
} from "./lowStockProductsData";

export default function LowStockProducts() {
  const { lowStock, loading } = useSalesDashboardData();

  const products = lowStock.length
    ? lowStock.map((item) => ({
        id: item.id,
        name: item.product_name,
        productId: item.product_sku,
        stock: Number(item.quantity),
        imageSrc: "assets/img/products/product-01.jpg",
      }))
    : loading
      ? []
      : lowStockProductsData;

  return (
    <div className="col-xxl-4 col-md-6 d-flex">
      <div className="low-stock-products flex-fill">
        <div className="low-stock-products__header">
          <h2 className="low-stock-products__title">Low Stock Products</h2>
          <Link href={all_routes.lowstock} className="low-stock-products__view-all">
            View All
          </Link>
        </div>

        <div className="low-stock-products__body">
          {products.length === 0 ? (
            <p className="px-3 py-4 text-[#646B72]">
              {loading ? "Loading…" : "No low-stock products."}
            </p>
          ) : (
            <ul className="low-stock-products__list">
              {products.map((product, index) => (
                <li
                  key={product.id}
                  className={`low-stock-products__item${
                    index < products.length - 1
                      ? " low-stock-products__item--divider"
                      : ""
                  }`}
                >
                  <div className="low-stock-products__product">
                    <ImageWithBasePath
                      src={product.imageSrc}
                      alt=""
                      width={48}
                      height={48}
                      className="low-stock-products__thumb"
                    />
                    <div className="low-stock-products__info">
                      <p className="low-stock-products__name">{product.name}</p>
                      <p className="low-stock-products__id">
                        ID : {product.productId}
                      </p>
                    </div>
                    <div className="low-stock-products__stock">
                      <span className="low-stock-products__stock-label">
                        In Stock
                      </span>
                      <span className="low-stock-products__stock-value">
                        {formatLowStockCount(product.stock)}
                      </span>
                    </div>
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
