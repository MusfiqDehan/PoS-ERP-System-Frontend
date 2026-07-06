"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import InvoiceTable from "@/components/sales/invoice/InvoiceTable";
import PageHeader from "@/components/sales/invoice/PageHeader";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function Invoice() {
  return (
    <PermissionGuard featureKey="invoices">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <InvoiceTable />
        </div>
        <CommonFooter />
      </div>
      <CommonDeleteModal />
    </PermissionGuard>
  );
}
