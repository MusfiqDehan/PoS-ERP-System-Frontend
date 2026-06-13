"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import { all_routes } from "@/data/all_routes";
import Link from "next/link";
import { bestSellerData } from "./bestSellerData";

const sortedBestSellerData = [...bestSellerData].sort(
  (a, b) => b.sales - a.sales,
);

export default function BestSeller() {
  return (
    <div className="col-sm-12 col-md-12 col-xl-4 d-flex">
      <div className="best-seller flex-fill">
        <div className="best-seller__header">
          <h2 className="best-seller__title">Best Seller</h2>
          <Link href={all_routes.bestseller} className="best-seller__view-all">
            View All
          </Link>
        </div>

        <div className="best-seller__body">
          <ul className="best-seller__list">
            {sortedBestSellerData.map((product, index) => (
              <li
                key={product.id}
                className={`best-seller__item${
                  index < sortedBestSellerData.length - 1
                    ? " best-seller__item--divider"
                    : ""
                }`}
              >
                <div className="best-seller__product">
                  <ImageWithBasePath
                    src={product.imageSrc}
                    alt=""
                    width={48}
                    height={48}
                    className="best-seller__thumb"
                  />
                  <div className="best-seller__info">
                    <p className="best-seller__name">{product.name}</p>
                    <p className="best-seller__price">{product.price}</p>
                  </div>
                  <div className="best-seller__sales">
                    <span className="best-seller__sales-label">Sales</span>
                    <span className="best-seller__sales-value">
                      {product.sales}
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
