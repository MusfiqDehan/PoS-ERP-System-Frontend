"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import PageHeader from "@/components/FinanceAccounts/BalanceSheet/PageHeader";
import BalanceSheetTable from "@/components/FinanceAccounts/BalanceSheet/BalanceSheetTable";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function BalanceSheet() {
  return (
    <PermissionGuard featureKey="balance_sheet">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <BalanceSheetTable />
        </div>
        <CommonFooter />
      </div>
    </PermissionGuard>
  );
}
