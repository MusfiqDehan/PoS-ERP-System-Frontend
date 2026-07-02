"use client";

import { useMemo } from "react";
import Table from "@/core/common/pagination/datatable";
import UnitsFilters from "./UnitsFilters";
import { makeUnitsColumns } from "./columns";
import type { UnitRecord } from "./types";

type Props = {
  dataSource: UnitRecord[];
  loading: boolean;
  error: string | null;
  onSelectForEdit: (record: UnitRecord) => void;
  onSelectForDelete: (record: UnitRecord) => void;
};

export default function UnitsTable({
  dataSource,
  loading,
  error,
  onSelectForEdit,
  onSelectForDelete,
}: Props) {
  const columns = useMemo(
    () => makeUnitsColumns({ onSelectForEdit, onSelectForDelete }),
    [onSelectForEdit, onSelectForDelete],
  );

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <UnitsFilters />
      <div className="overflow-x-auto">
        {error ? (
          <div className="p-6 text-center text-[#646B72]">
            <i className="ti ti-alert-circle text-[#dc3545] text-2xl mb-2 block" />
            <p>{error}</p>
          </div>
        ) : (
          <Table columns={columns} dataSource={dataSource} props={{ loading }} />
        )}
      </div>
    </div>
  );
}
