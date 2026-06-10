"use client";

import Table from "@/core/common/pagination/datatable";
import IncomeFilters from "./IncomeFilters";
import { incomeColumns } from "./columns";
import { useIncomeList } from "./useIncomeList";

export default function IncomeTable() {
  const { dataSource } = useIncomeList();

  return (
    <div className="card table-list-card">
      <IncomeFilters />
      <div className="card-body pb-0">
        <div className=" table-responsive">
          <Table columns={incomeColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
