"use client";

import Table from "@/core/common/pagination/datatable";
import PurchaseListFilters from "./PurchaseListFilters";
import { purchaseListColumns } from "./columns";
import { usePurchaseList } from "./usePurchaseList";

export default function PurchaseListTable() {
  const { dataSource } = usePurchaseList();

  return (
    <div className="card table-list-card">
      <PurchaseListFilters />
      <div className="card-body">
        <div className="table-responsive">
          <Table columns={purchaseListColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
