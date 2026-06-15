"use client";

import Table from "@/core/common/pagination/datatable";
import VariantAttributeFilters from "./VariantAttributeFilters";
import { variantAttributeColumns } from "./columns";
import { useVariantAttributes } from "@/hooks/inventory/useVariantAttributes";

export default function VariantAttributeTable() {
  const { dataSource } = useVariantAttributes();

  return (
    <div className="card table-list-card">
      <VariantAttributeFilters />
      <div className="card-body">
        <div className="table-responsive">
          <Table columns={variantAttributeColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
