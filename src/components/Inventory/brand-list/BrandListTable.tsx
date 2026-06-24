"use client";

import Table from "@/core/common/pagination/datatable";
import BrandListFilters from "./BrandListFilters";
import { brandListColumns } from "./columns";
import { useBrandList } from "@/hooks/inventory/useBrandList";

export default function BrandListTable() {
  const { dataSource } = useBrandList();

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <BrandListFilters />
      <div className="overflow-x-auto">
        <Table columns={brandListColumns} dataSource={dataSource} />
      </div>
    </div>
  );
}
