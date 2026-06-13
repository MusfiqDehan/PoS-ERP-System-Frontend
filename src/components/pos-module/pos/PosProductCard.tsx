"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import type { PosProduct } from "./posProductsData";

type PosProductCardProps = {
  product: PosProduct;
  isInCart: boolean;
  onSelect: () => void;
};

export default function PosProductCard({
  product,
  isInCart,
  onSelect,
}: PosProductCardProps) {
  const isOutOfStock = product.stockStatus === "out-of-stock";

  return (
    <button
      type="button"
      className={`pos-products-panel__card${
        isInCart ? " pos-products-panel__card--in-cart" : ""
      }${isOutOfStock ? " pos-products-panel__card--disabled" : ""}`}
      onClick={onSelect}
      disabled={isOutOfStock}
      aria-label={`Add ${product.name} to order`}
    >
      <div className="pos-products-panel__card-image">
        <ImageWithBasePath
          src={product.imageSrc}
          alt={product.name}
          className="pos-products-panel__card-img"
        />
      </div>

      <div className="pos-products-panel__card-body">
        <p className="pos-products-panel__card-name">{product.name}</p>
        <p className="pos-products-panel__card-sku">{product.sku}</p>
        <div className="pos-products-panel__card-footer">
          <span className="pos-products-panel__card-price">{product.price}</span>
          <span
            className={`pos-products-panel__stock pos-products-panel__stock--${product.stockStatus}`}
          >
            {product.stockLabel}
          </span>
        </div>
      </div>
    </button>
  );
}
