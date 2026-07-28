"use client";

import { useState, useCallback } from "react";
import { PermissionGuard } from "@/components/auth/PermissionGuard";
import CommonFooter from "@/core/common/footer/commonFooter";
import DeleteProductModal from "@/components/Inventory/productList/DeleteProductModal";
import PageHeader from "@/components/Inventory/productList/PageHeader";
import ProductListTable from "@/components/Inventory/productList/ProductListTable";
import { useProductList } from "@/hooks/inventory/useProductList";
import type { ProductDisplay } from "@/lib/inventory";

export default function ProductList() {
  const {
    dataSource, loading, error, removeProduct,
    categories, brands, filters, applyFilters,
    pagination, goNextPage, goPrevPage,
  } = useProductList();
  const [toDelete, setToDelete] = useState<ProductDisplay | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    const trimmed = value.trim();
    if (trimmed.length >= 2 || trimmed.length === 0) {
      applyFilters({ ...filters, search: trimmed || undefined });
    }
  }, [filters, applyFilters]);

  return (
    <PermissionGuard featureKey="products">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <ProductListTable
            dataSource={dataSource}
            loading={loading}
            error={error}
            onSelectForDelete={useCallback(r => setToDelete(r), [])}
            categories={categories}
            brands={brands}
            filters={filters}
            onFilterChange={applyFilters}
            onSearchChange={handleSearchChange}
            searchValue={searchValue}
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
