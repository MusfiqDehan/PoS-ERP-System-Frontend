"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import PageHeader from "@/components/FinanceAccounts/TrialBalance/PageHeader";
import TrialBalanceTable from "@/components/FinanceAccounts/TrialBalance/TrialBalanceTable";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function TrialBalance() {
  return (
    <PermissionGuard featureKey="trial_balance">
      <div>
        <div className="page-wrapper">
          <div className="content">
            <PageHeader />
            <TrialBalanceTable />
          </div>
          <CommonFooter />
        </div>
      </div>
    </PermissionGuard>
  );
}
