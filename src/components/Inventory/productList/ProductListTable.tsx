"use client";

import Table from "@/core/common/pagination/datatable";
import { productListColumns } from "./columns";
import ProductListFilters from "./ProductListFilters";
import { useProductList } from "@/hooks/inventory/useProductList";

export default function ProductListTable() {
  const { dataSource } = useProductList();

  return (
          <div className="card table-list-card">
            <ProductListFilters />
            <div className="card-body">
              <div className="table-responsive">
                <Table columns={productListColumns} dataSource={dataSource} />
              </div>
            </div>
          </div>
  );
}
