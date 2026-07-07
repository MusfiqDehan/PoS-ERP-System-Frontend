"use client";

import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import CommonFooter from "@/core/common/footer/commonFooter";
import { PermissionGuard } from "@/components/auth/PermissionGuard";
import EditExpiredProductModal from "@/components/Inventory/expired-products/EditExpiredProductModal";
import ExpiredProductsTable from "@/components/Inventory/expired-products/ExpiredProductsTable";
import PageHeader from "@/components/Inventory/expired-products/PageHeader";

export default function ExpiredProducts() {
  return (
    <PermissionGuard featureKey="expired_products">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <ExpiredProductsTable />
        </div>
        <CommonFooter />
      </div>
      <EditExpiredProductModal />
      <CommonDeleteModal />
    </PermissionGuard>
  );
}
