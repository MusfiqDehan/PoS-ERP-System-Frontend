"use client";

import { getCustomerLoyalty, type LoyaltyMode } from "./posLoyaltyConfig";
import type { TransactionCustomer } from "./transactionDetailsData";

type CustomerLoyaltyModeProps = {
  customer: TransactionCustomer;
  subtotal: number;
  mode: LoyaltyMode;
  onModeChange: (mode: LoyaltyMode) => void;
};

export default function CustomerLoyaltyMode({
  customer,
  subtotal,
  mode,
  onModeChange,
}: CustomerLoyaltyModeProps) {
  const loyalty = getCustomerLoyalty(customer.id, customer.points);

  if (!loyalty.earnsPoints || loyalty.discountPercent === 0 || subtotal <= 0) {
    return null;
  }

  return (
    <div className="pos-transaction-details__loyalty-mode">
      <p className="pos-transaction-details__loyalty-mode-summary">
        <strong>{loyalty.points} pts</strong> total ·{" "}
        <strong>{loyalty.discountPercent}%</strong> offer
        {loyalty.discountPercent > 0 && (
          <span className="pos-transaction-details__loyalty-mode-milestone">
            {" "}
            (every 100 pts = 1%)
          </span>
        )}
      </p>

      <span className="pos-transaction-details__loyalty-mode-label">
        Seller choice for this order
      </span>

      <div className="pos-transaction-details__loyalty-mode-options">
        <button
          type="button"
          className={`pos-transaction-details__loyalty-mode-btn${
            mode === "redeem"
              ? " pos-transaction-details__loyalty-mode-btn--active"
              : ""
          }`}
          disabled={!loyalty.canRedeem}
          onClick={() => onModeChange("redeem")}
        >
          Exchange {loyalty.redeemCostPoints} pts
          <span className="pos-transaction-details__loyalty-mode-hint">
            {loyalty.discountPercent}% off · {loyalty.pointsAfterRedeem} pts left
          </span>
        </button>
        <button
          type="button"
          className={`pos-transaction-details__loyalty-mode-btn${
            mode === "accumulate"
              ? " pos-transaction-details__loyalty-mode-btn--active"
              : ""
          }`}
          onClick={() => onModeChange("accumulate")}
        >
          Store points
          <span className="pos-transaction-details__loyalty-mode-hint">
            keep {loyalty.points} pts · earn today
          </span>
        </button>
      </div>

      {!loyalty.canRedeem && (
        <p className="pos-transaction-details__loyalty-mode-note">
          Need {loyalty.redeemCostPoints} pts to unlock {loyalty.discountPercent}%
          (has {loyalty.points})
        </p>
      )}
    </div>
  );
}
