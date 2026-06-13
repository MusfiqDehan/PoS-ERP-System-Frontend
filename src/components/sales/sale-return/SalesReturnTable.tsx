"use client";

import Table from "@/core/common/pagination/datatable";
import SalesReturnFilters from "./SalesReturnFilters";
import { salesReturnColumns } from "./columns";
import { useSalesReturns } from "./useSalesReturns";

export default function SalesReturnTable() {
  const { dataSource } = useSalesReturns();

  return (
    <div className="card table-list-card">
      <SalesReturnFilters />
      <div className="card-body">
        <div className="custom-datatable-filter table-responsive">
          <Table columns={salesReturnColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
