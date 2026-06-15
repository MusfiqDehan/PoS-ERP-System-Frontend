"use client";

import Table from "@/core/common/pagination/datatable";
import OnlineOrderFilters from "./OnlineOrderFilters";
import { onlineOrderColumns } from "./columns";
import { useOnlineOrders } from "@/hooks/sales/useOnlineOrders";

export default function OnlineOrderTable() {
  const { dataSource } = useOnlineOrders();

  return (
    <div className="card table-list-card manage-stock">
      <OnlineOrderFilters />
      <div className="card-body">
        <div className="custom-datatable-filter table-responsive">
          <Table columns={onlineOrderColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
