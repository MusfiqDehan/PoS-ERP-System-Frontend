"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import DiscountTable from "@/components/promo/discount/DiscountTable";
import PageHeader from "@/components/promo/discount/PageHeader";
import DiscountPlanModal from "@/core/modals/coupons/discountPlanModal";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function Discount() {
  return (
    <PermissionGuard featureKey="discounts">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <DiscountTable />
        </div>
        <CommonFooter />
      </div>
      <DiscountPlanModal />
    </PermissionGuard>
  );
}
