"use client";

import { useState, useCallback } from "react";
import CommonFooter from "@/core/common/footer/commonFooter";
import DeleteProductModal from "@/components/Inventory/productList/DeleteProductModal";
import PageHeader from "@/components/Inventory/productList/PageHeader";
import ProductListTable from "@/components/Inventory/productList/ProductListTable";
import { useProductList } from "@/hooks/inventory/useProductList";
import type { ProductDisplay } from "@/lib/inventory";

export default function ProductList() {
  const { dataSource, loading, error, removeProduct } = useProductList();
  const [toDelete, setToDelete] = useState<ProductDisplay | null>(null);

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <ProductListTable dataSource={dataSource} loading={loading} error={error} onSelectForDelete={useCallback(r => setToDelete(r), [])} />
        </div>
        <CommonFooter />
      </div>
      <DeleteProductModal product={toDelete} onDelete={removeProduct} />
    </>
  );
}
