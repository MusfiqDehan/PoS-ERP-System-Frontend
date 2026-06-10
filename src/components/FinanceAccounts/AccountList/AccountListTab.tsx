"use client";

import AccountListTable from "./AccountListTable";
import PageHeader from "./PageHeader";

export default function AccountListTab() {
  return (
    <div
      className="tab-pane fade show active"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
      <PageHeader
        title="Accounts List"
        subtitle="Manage your Accounts List"
        addLabel="Add Account List"
        addModalTarget="#add-units"
      />
      <AccountListTable />
    </div>
  );
}
