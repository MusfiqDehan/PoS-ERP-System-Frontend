"use client";

import Table from "@/core/common/pagination/datatable";
import WarrantyFilters from "./WarrantyFilters";
import { warrantyColumns } from "./columns";
import { useWarranties } from "@/hooks/inventory/useWarranties";

export default function WarrantyTable() {
  const { dataSource } = useWarranties();

  return (
    <div className="card table-list-card">
      <WarrantyFilters />
      <div className="card-body">
        <div className="table-responsive">
          <Table columns={warrantyColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
