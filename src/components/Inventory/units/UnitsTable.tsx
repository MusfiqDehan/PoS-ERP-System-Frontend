"use client";

import Table from "@/core/common/pagination/datatable";
import UnitsFilters from "./UnitsFilters";
import { unitsColumns } from "./columns";
import { useUnits } from "@/hooks/inventory/useUnits";

export default function UnitsTable() {
  const { dataSource } = useUnits();

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <UnitsFilters />
      <div className="overflow-x-auto">
        <Table columns={unitsColumns} dataSource={dataSource} />
      </div>
    </div>
  );
}
