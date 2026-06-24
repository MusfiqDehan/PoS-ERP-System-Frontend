"use client";

import Table from "@/core/common/pagination/datatable";
import VariantAttributeFilters from "./VariantAttributeFilters";
import { variantAttributeColumns } from "./columns";
import { useVariantAttributes } from "@/hooks/inventory/useVariantAttributes";

export default function VariantAttributeTable() {
  const { dataSource } = useVariantAttributes();

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <VariantAttributeFilters />
      <div className="overflow-x-auto">
        <Table columns={variantAttributeColumns} dataSource={dataSource} />
      </div>
    </div>
  );
}
