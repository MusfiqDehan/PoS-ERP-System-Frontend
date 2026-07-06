"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import GiftCardTable from "@/components/promo/gift-cards/GiftCardTable";
import PageHeader from "@/components/promo/gift-cards/PageHeader";
import GiftCardModals from "@/core/modals/coupons/giftCardModals";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function GiftCards() {
  return (
    <PermissionGuard featureKey="gift_cards">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <GiftCardTable />
        </div>
        <CommonFooter />
      </div>
      <GiftCardModals />
    </PermissionGuard>
  );
}
