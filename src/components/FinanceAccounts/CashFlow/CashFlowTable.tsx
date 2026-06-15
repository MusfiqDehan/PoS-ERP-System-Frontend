"use client";

import Table from "@/core/common/pagination/datatable";
import CashFlowFilters from "./CashFlowFilters";
import { cashFlowColumns } from "./columns";
import { useCashFlow } from "@/hooks/finance-accounts/useCashFlow";

export default function CashFlowTable() {
  const { dataSource } = useCashFlow();

  return (
    <div className="card table-list-card">
      <CashFlowFilters />
      <div className="card-body">
        <div className="table-responsive">
          <Table columns={cashFlowColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
