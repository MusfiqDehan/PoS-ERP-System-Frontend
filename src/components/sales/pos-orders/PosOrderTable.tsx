"use client";

import Table from "@/core/common/pagination/datatable";
import { onlineOrderColumns } from "@/components/sales/online-orders/columns";
import { useOnlineOrders } from "@/hooks/sales/useOnlineOrders";
import PosOrderFilters from "./PosOrderFilters";

export default function PosOrderTable() {
  const { dataSource } = useOnlineOrders();

  return (
    <div className="card table-list-card manage-stock">
      <PosOrderFilters />
      <div className="card-body">
        <div className="custom-datatable-filter table-responsive">
          <Table columns={onlineOrderColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
