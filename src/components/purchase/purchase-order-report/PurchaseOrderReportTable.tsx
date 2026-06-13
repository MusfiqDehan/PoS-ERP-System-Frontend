"use client";

import Table from "@/core/common/pagination/datatable";
import PurchaseOrderReportFilters from "./PurchaseOrderReportFilters";
import { purchaseOrderReportColumns } from "./columns";
import { usePurchaseOrderReport } from "./usePurchaseOrderReport";

export default function PurchaseOrderReportTable() {
  const { dataSource } = usePurchaseOrderReport();

  return (
    <div className="card table-list-card">
      <PurchaseOrderReportFilters />
      <div className="card-body">
        <div className="table-responsive">
          <Table columns={purchaseOrderReportColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
