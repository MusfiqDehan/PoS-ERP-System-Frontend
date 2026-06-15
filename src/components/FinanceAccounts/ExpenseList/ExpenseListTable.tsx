"use client";

import Table from "@/core/common/pagination/datatable";
import ExpenseListFilters from "./ExpenseListFilters";
import { expenseListColumns } from "./columns";
import { useExpenseList } from "@/hooks/finance-accounts/useExpenseList";

export default function ExpenseListTable() {
  const { dataSource } = useExpenseList();

  return (
    <div className="card table-list-card">
      <ExpenseListFilters />
      <div className="card-body pb-0">
        <div className="table-responsive">
          <Table columns={expenseListColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
