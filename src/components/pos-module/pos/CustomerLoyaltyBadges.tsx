"use client";

import { getCustomerLoyalty } from "./posLoyaltyConfig";
import type { TransactionCustomer } from "./transactionDetailsData";

type CustomerLoyaltyBadgesProps = {
  customer: TransactionCustomer;
};

export default function CustomerLoyaltyBadges({
  customer,
}: CustomerLoyaltyBadgesProps) {
  const loyalty = getCustomerLoyalty(customer.id, customer.points);

  return (
    <>
      <span className="pos-transaction-details__badge">
        {loyalty.points} Points
      </span>
      {loyalty.discountPercent > 0 && (
        <span className="pos-transaction-details__badge">
          {loyalty.discountPercent}%
        </span>
      )}
    </>
  );
}
