"use client";

import Table from "@/core/common/pagination/datatable";
import { expiredProductColumns } from "./columns";
import ExpiredProductsFilters from "./ExpiredProductsFilters";
import { useExpiredProducts } from "@/hooks/inventory/useExpiredProducts";

export default function ExpiredProductsTable() {
  const { dataSource, loading, error } = useExpiredProducts();

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <ExpiredProductsFilters />
      <div className="overflow-x-auto">
        {error ? <div className="p-6 text-center text-[#646B72]"><i className="ti ti-alert-circle text-[#dc3545] text-2xl mb-2 block" /><p>{error}</p></div> : <Table columns={expiredProductColumns} dataSource={dataSource} props={{ loading }} />}
      </div>
    </div>
  );
}
