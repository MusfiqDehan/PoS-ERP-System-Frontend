"use client";

import Table from "@/core/common/pagination/datatable";
import { accountTypeColumns } from "./columns";
import AccountTypeFilters from "./AccountTypeFilters";
import { useAccountList } from "@/hooks/finance-accounts/useAccountList";

export default function AccountTypeTable() {
  const { accountTypeData } = useAccountList();

  return (
    <div className="card table-list-card">
      <AccountTypeFilters />
      <div className="card-body">
        <div className="table-responsive">
          <Table columns={accountTypeColumns} dataSource={accountTypeData} />
        </div>
      </div>
    </div>
  );
}
