"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import PageHeader from "@/components/FinanceAccounts/AccountStatement/PageHeader";
import AccountStatementTable from "@/components/FinanceAccounts/AccountStatement/AccountStatementTable";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function AccountStatement() {
  return (
    <PermissionGuard featureKey="account_statement">
      <div>
        <div className="page-wrapper">
          <div className="content">
            <PageHeader />
            <AccountStatementTable />
          </div>
          <CommonFooter />
        </div>
      </div>
    </PermissionGuard>
  );
}
