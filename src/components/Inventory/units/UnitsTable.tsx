"use client";

import Table from "@/core/common/pagination/datatable";
import UnitsFilters from "./UnitsFilters";
import { unitsColumns } from "./columns";
import { useUnits } from "./useUnits";

export default function UnitsTable() {
  const { dataSource } = useUnits();

  return (
    <div className="card table-list-card">
      <UnitsFilters />
      <div className="card-body">
        <div className="table-responsive">
          <Table columns={unitsColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
