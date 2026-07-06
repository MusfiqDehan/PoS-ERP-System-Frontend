"use client";
/* eslint-disable @next/next/no-img-element */

import ImageWithBasePath from "@/core/common/image-with-base-path";
import { all_routes } from "@/data/all_routes";
import Link from "next/link";
import { useSalesDashboardData } from "@/hooks/dashboard/useSalesDashboard";
import { formatCurrency, parseCurrency } from "@/lib/currency";
import { DEFAULT_POS_PRODUCT_IMAGE, resolveProductImageUrl } from "@/lib/media";
import { bestSellerData } from "./bestSellerData";

function ProductThumb({ src, alt }: { src: string; alt: string }) {
  const resolved = resolveProductImageUrl(src, DEFAULT_POS_PRODUCT_IMAGE);
  if (resolved.startsWith("http") || resolved.startsWith("/media/")) {
    return (
      <img
        src={resolved}
        alt={alt}
        width={48}
        height={48}
        className="best-seller__thumb"
      />
    );
  }
  return (
    <ImageWithBasePath
      src={resolved}
      alt={alt}
      width={48}
      height={48}
      className="best-seller__thumb"
    />
  );
}

export default function BestSeller() {
  const { sales, loading } = useSalesDashboardData();

  const topProducts = sales?.top_products ?? [];
  const items = topProducts.length
    ? topProducts.map((product) => ({
        id: product.product_id,
        name: product.product_name,
        price: formatCurrency(parseCurrency(product.price)),
        sales: parseCurrency(product.quantity_sold),
        imageSrc: product.image,
      }))
    : loading
      ? []
      : bestSellerData;

  const sorted = [...items].sort((a, b) => b.sales - a.sales);

  return (
    <div className="col-sm-12 col-md-12 col-xl-4 d-flex">
      <div className="best-seller flex-fill">
        <div className="best-seller__header">
          <h2 className="best-seller__title">Best Seller</h2>
          <Link href={all_routes.productlist} className="best-seller__view-all">
            View All
          </Link>
        </div>

        <div className="best-seller__body">
          {sorted.length === 0 ? (
            <p className="px-3 py-4 text-[#646B72]">
              {loading ? "Loading…" : "No completed POS sales yet."}
            </p>
          ) : (
            <ul className="best-seller__list">
              {sorted.map((product, index) => (
                <li
                  key={product.id}
                  className={`best-seller__item${
                    index < sorted.length - 1 ? " best-seller__item--divider" : ""
                  }`}
                >
                  <div className="best-seller__product">
                    <ProductThumb src={product.imageSrc} alt={product.name} />
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
          )}
        </div>
      </div>
    </div>
  );
}
