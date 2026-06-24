"use client";

import Table from "@/core/common/pagination/datatable";
import WarrantyFilters from "./WarrantyFilters";
import { warrantyColumns } from "./columns";
import { useWarranties } from "@/hooks/inventory/useWarranties";

export default function WarrantyTable() {
  const { dataSource } = useWarranties();

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <WarrantyFilters />
      <div className="overflow-x-auto">
        <Table columns={warrantyColumns} dataSource={dataSource} />
      </div>
    </div>
  );
}
