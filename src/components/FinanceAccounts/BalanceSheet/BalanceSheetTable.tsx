"use client";

import Table from "@/core/common/pagination/datatable";
import BalanceSheetFilters from "./BalanceSheetFilters";
import { balanceSheetColumns } from "./columns";
import { useBalanceSheet } from "@/hooks/finance-accounts/useBalanceSheet";

export default function BalanceSheetTable() {
  const { dataSource } = useBalanceSheet();

  return (
    <div className="card table-list-card">
      <BalanceSheetFilters />
      <div className="card-body">
        <div className="table-responsive">
          <Table columns={balanceSheetColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
