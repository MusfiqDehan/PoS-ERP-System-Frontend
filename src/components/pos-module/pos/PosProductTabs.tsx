"use client";

import PosProductCard from "./PosProductCard";
import type { PosProduct } from "./posProductsData";

type PosProductTabsProps = {
  activeTab: string;
  searchQuery: string;
  onProductSelect: (product: PosProduct) => void;
  cartProductIds: Set<string>;
  apiProducts?: PosProduct[];
};

export default function PosProductTabs({
  activeTab,
  searchQuery,
  onProductSelect,
  cartProductIds,
  apiProducts,
}: PosProductTabsProps) {
  const products = apiProducts ?? [];

  if (products.length === 0) {
    return (
      <div className="pos-products-panel__empty">
        <p>No products match your search.</p>
      </div>
    );
  }

  return (
    <div className="pos-products-panel__grid-wrap">
      <div className="pos-products-panel__grid">
        {products.map((product) => (
          <PosProductCard
            key={product.id}
            product={product}
            isInCart={cartProductIds.has(product.id)}
            onSelect={() => onProductSelect(product)}
          />
        ))}
      </div>
    </div>
  );
}
