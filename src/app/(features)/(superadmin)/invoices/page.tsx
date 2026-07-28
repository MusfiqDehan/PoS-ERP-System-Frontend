"use client";

import { useState } from "react";
import CommonFooter from "@/core/common/footer/commonFooter";
import DeleteInvoiceModal from "@/components/SuperAdmin/invoices/DeleteInvoiceModal";
import PageHeader from "@/components/SuperAdmin/invoices/PageHeader";
import InvoicesTable from "@/components/SuperAdmin/invoices/InvoicesTable";
import ViewInvoiceModal from "@/components/SuperAdmin/invoices/ViewInvoiceModal";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function Invoices() {
  const [searchText, setSearchText] = useState("");

  return (
    <PermissionGuard featureKey="platform.invoices">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader searchText={searchText} onSearchChange={setSearchText} />
          <InvoicesTable searchText={searchText} />
        </div>
        <CommonFooter />
      </div>
      <ViewInvoiceModal />
      <DeleteInvoiceModal />
    </PermissionGuard>
  );
}
