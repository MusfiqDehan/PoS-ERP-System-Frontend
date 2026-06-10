"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import { all_routes } from "@/data/all_routes";
import Link from "next/link";
import {
  formatLowStockCount,
  lowStockProductsData,
} from "./lowStockProductsData";

export default function LowStockProducts() {
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
          <ul className="low-stock-products__list">
            {lowStockProductsData.map((product, index) => (
              <li
                key={product.id}
                className={`low-stock-products__item${
                  index < lowStockProductsData.length - 1
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
        </div>
      </div>
    </div>
  );
}
