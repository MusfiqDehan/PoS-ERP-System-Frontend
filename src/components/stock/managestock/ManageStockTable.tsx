"use client";

import Table from "@/core/common/pagination/datatable";
import ManageStockFilters from "./ManageStockFilters";
import { manageStockColumns } from "./columns";
import { useManageStocks } from "@/hooks/stock/useManageStocks";

export default function ManageStockTable() {
  const { dataSource } = useManageStocks();

  return (
    <div className="card table-list-card  manage-stock">
      <ManageStockFilters />
      <div className="card-body">
        <div className="custom-datatable-filter table-responsive">
          <Table columns={manageStockColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
