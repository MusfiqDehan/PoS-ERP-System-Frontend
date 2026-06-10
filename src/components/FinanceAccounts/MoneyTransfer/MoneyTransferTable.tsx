"use client";

import Table from "@/core/common/pagination/datatable";
import { moneyTransferColumns } from "./columns";
import MoneyTransferFilters from "./MoneyTransferFilters";
import { useMoneyTransfer } from "./useMoneyTransfer";

export default function MoneyTransferTable() {
  const { dataSource } = useMoneyTransfer();

  return (
    <div className="card table-list-card">
      <MoneyTransferFilters />
      <div className="card-body">
        <div className="table-responsive">
          <Table columns={moneyTransferColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
