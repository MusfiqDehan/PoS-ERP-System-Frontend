"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import PageHeader from "@/components/sales/pos-orders/PageHeader";
import PosOrderTable from "@/components/sales/pos-orders/PosOrderTable";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function PosOrders() {
  return (
    <PermissionGuard featureKey="pos_orders">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <PosOrderTable />
        </div>
        <CommonFooter />
      </div>
    </PermissionGuard>
  );
}
