"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import CouponTable from "@/components/promo/coupons/CouponTable";
import PageHeader from "@/components/promo/coupons/PageHeader";
import AddCoupons from "@/core/modals/coupons/addcoupons";
import EditCoupons from "@/core/modals/coupons/editcoupons";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function Coupons() {
  return (
    <PermissionGuard featureKey="coupons">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <CouponTable />
        </div>
        <CommonFooter />
      </div>
      <AddCoupons />
      <EditCoupons />
    </PermissionGuard>
  );
}
