"use client";

import Table from "@/core/common/pagination/datatable";
import PurchaseReturnFilters from "./PurchaseReturnFilters";
import { purchaseReturnColumns } from "./columns";
import { usePurchaseReturns } from "@/hooks/purchase/usePurchaseReturns";

export default function PurchaseReturnTable() {
  const { dataSource } = usePurchaseReturns();

  return (
    <div className="card table-list-card">
      <PurchaseReturnFilters />
      <div className="card-body">
        <div className="table-responsive">
          <Table columns={purchaseReturnColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
