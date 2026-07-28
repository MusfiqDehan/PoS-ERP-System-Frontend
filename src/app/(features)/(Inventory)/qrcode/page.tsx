"use client";

import LabelPrintWorkspace from "@/components/Inventory/labels/LabelPrintWorkspace";
import { PermissionGuard } from "@/components/auth/PermissionGuard";
import PageHeader from "@/components/Inventory/qrcode/PageHeader";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function Qrcode() {
  return (
    <PermissionGuard featureKey="qrcodes">
      <div className="page-wrapper notes-page-wrapper">
        <div className="content">
          <PageHeader />
          <LabelPrintWorkspace codeType="qrcode" />
        </div>
        <CommonFooter />
      </div>
    </PermissionGuard>
  );
}
