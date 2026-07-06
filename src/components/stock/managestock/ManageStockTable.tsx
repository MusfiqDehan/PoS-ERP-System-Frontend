"use client";

import { useMemo } from "react";
import Table from "@/core/common/pagination/datatable";
import ManageStockFilters from "./ManageStockFilters";
import { buildManageStockColumns } from "./columns";
import type { StockLevel } from "@/lib/stock";
import type { BranchOption, WarehouseOption } from "@/hooks/stock/useManageStocks";

type Props = {
  dataSource: StockLevel[];
  branches: BranchOption[];
  warehouses: WarehouseOption[];
  filterBranch: string;
  setFilterBranch: (v: string) => void;
  filterWarehouse: string;
  setFilterWarehouse: (v: string) => void;
  onEdit: (record: StockLevel) => void;
  onDelete: (record: StockLevel) => void;
};

export default function ManageStockTable({
  dataSource, branches, warehouses,
  filterBranch, setFilterBranch, filterWarehouse, setFilterWarehouse,
  onEdit, onDelete,
}: Props) {
  const columns = useMemo(
    () => buildManageStockColumns({ onEdit, onDelete }),
    [onEdit, onDelete],
  );

  return (
    <div className="card table-list-card manage-stock">
      <ManageStockFilters
        branches={branches}
        warehouses={warehouses}
        filterBranch={filterBranch}
        setFilterBranch={setFilterBranch}
        filterWarehouse={filterWarehouse}
        setFilterWarehouse={setFilterWarehouse}
      />
      <div className="card-body">
        <div className="custom-datatable-filter table-responsive">
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
