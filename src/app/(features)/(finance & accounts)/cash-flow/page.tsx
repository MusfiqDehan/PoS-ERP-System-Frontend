"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import PageHeader from "@/components/FinanceAccounts/CashFlow/PageHeader";
import CashFlowTable from "@/components/FinanceAccounts/CashFlow/CashFlowTable";
import PageFooter from "@/components/FinanceAccounts/CashFlow/PageFooter";

export default function CashFlow() {
  return (
    <PermissionGuard featureKey="cash_flow">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <CashFlowTable />
        </div>
        <PageFooter />
      </div>
    </PermissionGuard>
  );
}
