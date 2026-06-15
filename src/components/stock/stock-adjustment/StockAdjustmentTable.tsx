"use client";

import Table from "@/core/common/pagination/datatable";
import StockAdjustmentFilters from "./StockAdjustmentFilters";
import { stockAdjustmentColumns } from "./columns";
import { useStockAdjustments } from "@/hooks/stock/useStockAdjustments";

export default function StockAdjustmentTable() {
  const { dataSource } = useStockAdjustments();

  return (
    <div className="card table-list-card manage-stock">
      <StockAdjustmentFilters />
      <div className="card-body">
        <div className="custom-datatable-filter table-responsive">
          <Table columns={stockAdjustmentColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
