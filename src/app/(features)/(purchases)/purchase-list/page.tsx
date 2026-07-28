"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import PageHeader from "@/components/purchase/purchase-list/PageHeader";
import PurchaseListTable from "@/components/purchase/purchase-list/PurchaseListTable";
import AddPurchases from "@/core/modals/purchases/addpurchases";
import EditPurchases from "@/core/modals/purchases/editpurchases";
import ImportPurchases from "@/core/modals/purchases/importpurchases";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function PurchaseList() {
  return (
    <PermissionGuard featureKey="purchases">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <PurchaseListTable />
        </div>
        <CommonFooter />
      </div>
      <AddPurchases />
      <ImportPurchases />
      <EditPurchases />
      <CommonDeleteModal />
    </PermissionGuard>
  );
}
