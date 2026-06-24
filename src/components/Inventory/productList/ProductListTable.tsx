"use client";

import Table from "@/core/common/pagination/datatable";
import { productListColumns } from "./columns";
import ProductListFilters from "./ProductListFilters";
import { useProductList } from "@/hooks/inventory/useProductList";

export default function ProductListTable() {
  const { dataSource } = useProductList();

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <ProductListFilters />
      <div className="overflow-x-auto">
        <Table columns={productListColumns} dataSource={dataSource} />
      </div>
    </div>
  );
}
