"use client";

import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import CommonFooter from "@/core/common/footer/commonFooter";
import { PermissionGuard } from "@/components/auth/PermissionGuard";
import PageHeader from "@/components/Inventory/low-stocks/PageHeader";
import SendEmailModal from "@/components/Inventory/low-stocks/SendEmailModal";
import StockTabsSection from "@/components/Inventory/low-stocks/StockTabsSection";

export default function LowStocks() {
  return (
    <PermissionGuard featureKey="low_stocks">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <StockTabsSection />
        </div>
        <CommonFooter />
      </div>
      <SendEmailModal />
      <CommonDeleteModal />
    </PermissionGuard>
  );
}
