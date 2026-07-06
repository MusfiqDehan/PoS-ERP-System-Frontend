"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import PageHeader from "@/components/purchase/purchase-returns/PageHeader";
import PurchaseReturnTable from "@/components/purchase/purchase-returns/PurchaseReturnTable";
import AddPurchaseReturn from "@/core/modals/purchases/addpurchasereturn";
import EditPurchaseReturns from "@/core/modals/purchases/editpurchasereturns";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function PurchaseReturn() {
  return (
    <PermissionGuard featureKey="purchase_returns">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <PurchaseReturnTable />
        </div>
        <CommonFooter />
      </div>
      <AddPurchaseReturn />
      <EditPurchaseReturns />
      <CommonDeleteModal />
    </PermissionGuard>
  );
}
