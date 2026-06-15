"use client";

import Table from "@/core/common/pagination/datatable";
import IncomeCategoryFilters from "./IncomeCategoryFilters";
import { incomeCategoryColumns } from "./columns";
import { useIncomeCategory } from "@/hooks/finance-accounts/useIncomeCategory";

export default function IncomeCategoryTable() {
  const { dataSource } = useIncomeCategory();

  return (
    <div className="card table-list-card">
      <IncomeCategoryFilters />
      <div className="card-body pb-0">
        <div className="table-responsive">
          <Table columns={incomeCategoryColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
