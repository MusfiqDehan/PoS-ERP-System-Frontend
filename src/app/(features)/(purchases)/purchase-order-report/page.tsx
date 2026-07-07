"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import PageHeader from "@/components/purchase/purchase-order-report/PageHeader";
import PurchaseOrderReportTable from "@/components/purchase/purchase-order-report/PurchaseOrderReportTable";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function PurchaseOrderReport() {
  return (
    <PermissionGuard featureKey="purchase_orders">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <PurchaseOrderReportTable />
        </div>
        <CommonFooter />
      </div>
    </PermissionGuard>
  );
}
