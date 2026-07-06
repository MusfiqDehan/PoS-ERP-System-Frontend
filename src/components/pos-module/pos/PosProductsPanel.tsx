"use client";

import { useState } from "react";
import PosCategoryTabs from "./PosCategoryTabs";
import PosProductTabs from "./PosProductTabs";
import PosProductsToolbar from "./products-toolbar";
import type { PosProduct, PosProductFilter } from "./posProductsData";
import type { PosProductRow } from "@/lib/pos";
import { apiRowToPosProduct } from "@/lib/posProductMapping";

type PosProductsPanelProps = {
  categories: PosProductFilter[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onProductSelect: (product: PosProduct) => void;
  cartProductIds: Set<string>;
  products: PosProductRow[];
  productsLoading: boolean;
  onBarcodeScan: (code: string) => void;
  branchId: string | null;
};

export default function PosProductsPanel({
  categories,
  activeTab,
  onTabChange,
  onProductSelect,
  cartProductIds,
  products,
  productsLoading,
  onBarcodeScan,
}: PosProductsPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const displayProducts = products.map(apiRowToPosProduct).filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.trim().toLowerCase();
    return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
  });

  return (
    <div className="pos-products-panel__col">
      <section className="pos-products-panel">
        <h2 className="pos-products-panel__title">All Products</h2>

        <PosProductsToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onBarcodeScan={onBarcodeScan}
        />

        <PosCategoryTabs
          categories={categories}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />

        <div className="pos-products-panel__scroll">
          {productsLoading ? (
            <div className="d-flex justify-content-center align-items-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : displayProducts.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <i className="ti ti-package-off fs-1 d-block mb-2" />
              <p>No products found</p>
            </div>
          ) : (
            <PosProductTabs
              activeTab={activeTab}
              searchQuery={searchQuery}
              onProductSelect={onProductSelect}
              cartProductIds={cartProductIds}
              apiProducts={displayProducts}
            />
          )}
        </div>
      </section>
    </div>
  );
}
