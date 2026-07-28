"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import DiscountPlanTable from "@/components/promo/discount-plan/DiscountPlanTable";
import PageHeader from "@/components/promo/discount-plan/PageHeader";
import DiscountPlanModal from "@/core/modals/coupons/discountPlanModal";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function DiscountPlan() {
  return (
    <PermissionGuard featureKey="discounts">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <DiscountPlanTable />
        </div>
        <CommonFooter />
      </div>
      <DiscountPlanModal />
    </PermissionGuard>
  );
}
