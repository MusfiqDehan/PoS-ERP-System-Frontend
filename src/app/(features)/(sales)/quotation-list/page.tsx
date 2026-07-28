"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import PageHeader from "@/components/sales/quotation/PageHeader";
import QuotationTable from "@/components/sales/quotation/QuotationTable";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import CommonFooter from "@/core/common/footer/commonFooter";
import AddQuotation from "@/core/modals/sales/addquotation";
import EditQuotation from "@/core/modals/sales/editquotation";

export default function Quotation() {
  return (
    <PermissionGuard featureKey="quotations">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <QuotationTable />
        </div>
        <CommonFooter />
      </div>
      <AddQuotation />
      <EditQuotation />
      <CommonDeleteModal />
    </PermissionGuard>
  );
}
