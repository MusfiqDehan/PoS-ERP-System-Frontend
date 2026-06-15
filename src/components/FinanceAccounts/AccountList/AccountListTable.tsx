"use client";

import Table from "@/core/common/pagination/datatable";
import { accountListColumns } from "./columns";
import AccountListFilters from "./AccountListFilters";
import { useAccountList } from "@/hooks/finance-accounts/useAccountList";

export default function AccountListTable() {
  const { accountListData } = useAccountList();

  return (
    <div className="card table-list-card">
      <AccountListFilters />
      <div className="card-body">
        <div className="table-responsive">
          <Table columns={accountListColumns} dataSource={accountListData} />
        </div>
      </div>
    </div>
  );
}
