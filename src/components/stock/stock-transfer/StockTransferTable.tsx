"use client";

import { useMemo } from "react";
import Table from "@/core/common/pagination/datatable";
import StockTransferFilters from "./StockTransferFilters";
import { buildStockTransferColumns } from "./columns";
import type { StockTransferRecord } from "./types";
import type { BranchOption } from "@/hooks/stock/useStockTransfers";

type Props = {
  dataSource: StockTransferRecord[];
  loading?: boolean;
  error?: string | null;
  branches: BranchOption[];
  filterBranch: string;
  setFilterBranch: (v: string) => void;
  onView: (record: StockTransferRecord) => void;
};

export default function StockTransferTable({
  dataSource,
  loading,
  error,
  branches,
  filterBranch,
  setFilterBranch,
  onView,
}: Props) {
  const columns = useMemo(
    () => buildStockTransferColumns({ onView }),
    [onView],
  );

  return (
    <div className="card table-list-card manage-stock">
      <StockTransferFilters
        branches={branches}
        filterBranch={filterBranch}
        setFilterBranch={setFilterBranch}
      />
      <div className="card-body">
        {error && <div className="alert alert-danger mb-3">{error}</div>}
        {loading ? (
          <p className="text-muted mb-0">Loading transfers...</p>
        ) : (
          <div className="custom-datatable-filter table-responsive">
            <Table columns={columns} dataSource={dataSource} />
          </div>
        )}
      </div>
    </div>
  );
}
