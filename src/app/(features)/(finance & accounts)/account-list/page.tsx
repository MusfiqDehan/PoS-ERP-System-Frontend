"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import AccountListModals from "@/components/FinanceAccounts/AccountList/AccountListModals";
import AccountListTab from "@/components/FinanceAccounts/AccountList/AccountListTab";
import AccountTypeTab from "@/components/FinanceAccounts/AccountList/AccountTypeTab";
import TabNav from "@/components/FinanceAccounts/AccountList/TabNav";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function AccountList() {
  return (
    <PermissionGuard featureKey="bank_accounts">
      <div>
        <div className="page-wrapper">
          <div className="content">
            <TabNav />
            <div className="tab-content" id="pills-tabContent">
              <AccountListTab />
              <AccountTypeTab />
            </div>
          </div>
          <CommonFooter />
        </div>
        <AccountListModals />
      </div>
    </PermissionGuard>
  );
}
