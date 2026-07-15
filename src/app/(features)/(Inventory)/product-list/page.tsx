"use client";

import { useState, useCallback } from "react";
import { PermissionGuard } from "@/components/auth/PermissionGuard";
import CommonFooter from "@/core/common/footer/commonFooter";
import DeleteProductModal from "@/components/Inventory/productList/DeleteProductModal";
import PageHeader from "@/components/Inventory/productList/PageHeader";
import ProductListFilters from "@/components/Inventory/productList/ProductListFilters";
import ProductListTable from "@/components/Inventory/productList/ProductListTable";
import { useProductList } from "@/hooks/inventory/useProductList";
import type { ProductDisplay } from "@/lib/inventory";

export default function ProductList() {
  const {
    dataSource, loading, error, removeProduct,
    categories, brands, filters, applyFilters,
    searchInput, setSearchInput,
    pagination, goNextPage, goPrevPage,
  } = useProductList();
  const [toDelete, setToDelete] = useState<ProductDisplay | null>(null);
  const handleSelectForDelete = useCallback((record: ProductDisplay) => {
    setToDelete(record);
  }, []);

  return (
    <PermissionGuard featureKey="products">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <div className="mb-3 rounded-[8px] border border-[#eef1f3] bg-white p-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="search-set">
                <div className="search-input">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="form-control form-control-sm"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <span className="btn btn-searchset">
                    <i className="ti ti-search" />
                  </span>
                </div>
              </div>
              <ProductListFilters
                categories={categories}
                brands={brands}
                filters={filters}
                onFilterChange={applyFilters}
              />
            </div>
          </div>
          <ProductListTable
            dataSource={dataSource}
            loading={loading}
            error={error}
            onSelectForDelete={handleSelectForDelete}
            pagination={pagination}
            onNextPage={goNextPage}
            onPrevPage={goPrevPage}
          />
        </div>
        <CommonFooter />
      </div>
      <DeleteProductModal product={toDelete} onDelete={removeProduct} />
    </PermissionGuard>
  );
}
