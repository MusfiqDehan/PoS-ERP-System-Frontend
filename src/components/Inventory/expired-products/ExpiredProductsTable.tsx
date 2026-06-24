"use client";

import Table from "@/core/common/pagination/datatable";
import { expiredProductColumns } from "./columns";
import ExpiredProductsFilters from "./ExpiredProductsFilters";
import { useExpiredProducts } from "@/hooks/inventory/useExpiredProducts";

export default function ExpiredProductsTable() {
  const { dataSource } = useExpiredProducts();

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <ExpiredProductsFilters />
      <div className="overflow-x-auto">
        <Table columns={expiredProductColumns} dataSource={dataSource} />
      </div>
    </div>
  );
}
