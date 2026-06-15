"use client";

import { useState } from "react";
import PosCategoryTabs from "./PosCategoryTabs";
import PosProductTabs from "./PosProductTabs";
import PosProductsToolbar from "./products-toolbar";
import type { PosProduct, PosProductFilter } from "./posProductsData";

type PosProductsPanelProps = {
  categories: PosProductFilter[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onProductSelect: (product: PosProduct) => void;
  cartProductIds: Set<string>;
};

export default function PosProductsPanel({
  categories,
  activeTab,
  onTabChange,
  onProductSelect,
  cartProductIds,
}: PosProductsPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="pos-products-panel__col">
      <section className="pos-products-panel">
        <h2 className="pos-products-panel__title">All Products</h2>

        <PosProductsToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <PosCategoryTabs
          categories={categories}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />

        <div className="pos-products-panel__scroll">
          <PosProductTabs
            activeTab={activeTab}
            searchQuery={searchQuery}
            onProductSelect={onProductSelect}
            cartProductIds={cartProductIds}
          />
        </div>
      </section>
    </div>
  );
}
