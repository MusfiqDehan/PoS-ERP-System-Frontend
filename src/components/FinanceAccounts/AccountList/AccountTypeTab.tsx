"use client";

import AccountTypeTable from "./AccountTypeTable";
import PageHeader from "./PageHeader";

export default function AccountTypeTab() {
  return (
    <div
      className="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
    >
      <PageHeader
        title="Accounts Type"
        subtitle="Manage your Accounts Type"
        addLabel="Add Account Type"
        addModalTarget="#add-units2"
        showTooltipIcons={false}
        usePlusCircleIcon
      />
      <AccountTypeTable />
    </div>
  );
}
