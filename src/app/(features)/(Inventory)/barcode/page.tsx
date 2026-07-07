"use client";

import LabelPrintWorkspace from "@/components/Inventory/labels/LabelPrintWorkspace";
import { PermissionGuard } from "@/components/auth/PermissionGuard";
import PageHeader from "@/components/Inventory/barcode/PageHeader";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function Barcode() {
  return (
    <PermissionGuard featureKey="barcodes">
      <div className="page-wrapper notes-page-wrapper">
        <div className="content">
          <PageHeader />
          <LabelPrintWorkspace codeType="barcode" />
        </div>
        <CommonFooter />
      </div>
    </PermissionGuard>
  );
}
