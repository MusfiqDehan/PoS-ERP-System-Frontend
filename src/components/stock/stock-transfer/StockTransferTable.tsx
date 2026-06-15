"use client";

import Table from "@/core/common/pagination/datatable";
import StockTransferFilters from "./StockTransferFilters";
import { stockTransferColumns } from "./columns";
import { useStockTransfers } from "@/hooks/stock/useStockTransfers";

export default function StockTransferTable() {
  const { dataSource } = useStockTransfers();

  return (
    <div className="card table-list-card manage-stock">
      <StockTransferFilters />
      <div className="card-body">
        <div className="custom-datatable-filter table-responsive">
          <Table columns={stockTransferColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
