"use client";

import { useMemo } from "react";
import Table from "@/core/common/pagination/datatable";
import StockAdjustmentFilters from "./StockAdjustmentFilters";
import { buildStockAdjustmentColumns } from "./columns";
import type { StockAdjustment } from "@/lib/stock";
import type { BranchOption } from "@/hooks/stock/useStockAdjustments";

type Props = {
  dataSource: StockAdjustment[];
  loading?: boolean;
  error?: string | null;
  branches: BranchOption[];
  filterBranch: string;
  setFilterBranch: (v: string) => void;
  onViewNotes: (record: StockAdjustment) => void;
};

export default function StockAdjustmentTable({
  dataSource,
  loading,
  error,
  branches,
  filterBranch,
  setFilterBranch,
  onViewNotes,
}: Props) {
  const columns = useMemo(
    () => buildStockAdjustmentColumns({ onViewNotes }),
    [onViewNotes],
  );

  return (
    <div className="card table-list-card manage-stock">
      <StockAdjustmentFilters
        branches={branches}
        filterBranch={filterBranch}
        setFilterBranch={setFilterBranch}
      />
      <div className="card-body">
        {error && <div className="alert alert-danger mb-3">{error}</div>}
        {loading ? (
          <p className="text-muted mb-0">Loading adjustments...</p>
        ) : (
          <div className="custom-datatable-filter table-responsive">
            <Table columns={columns} dataSource={dataSource} />
          </div>
        )}
      </div>
    </div>
  );
}
