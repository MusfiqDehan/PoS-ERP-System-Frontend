"use client";

import Table from "@/core/common/pagination/datatable";
import ExpenseCategoryFilters from "./ExpenseCategoryFilters";
import { expenseCategoryColumns } from "./columns";
import { useExpenseCategory } from "./useExpenseCategory";

export default function ExpenseCategoryTable() {
  const { dataSource } = useExpenseCategory();

  return (
    <div className="card table-list-card">
      <ExpenseCategoryFilters />
      <div className="card-body pb-0">
        <div className="table-responsive">
          <Table columns={expenseCategoryColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
