"use client";

import { formatOrderCurrency } from "./orderDetailsData";

type TransactionActionsProps = {
  totalPayable: number;
  canCheckout: boolean;
  onSaveDraft: () => void;
  onCompleteOrder: () => void;
};

export default function TransactionActions({
  totalPayable,
  canCheckout,
  onSaveDraft,
  onCompleteOrder,
}: TransactionActionsProps) {
  return (
    <div className="pos-transaction-details__actions">
      <button
        type="button"
        className="pos-transaction-details__pay-btn"
        disabled={!canCheckout}
        data-bs-toggle={canCheckout ? "modal" : undefined}
        data-bs-target="#pos-payment-completed"
        onClick={() => {
          if (canCheckout) {
            onCompleteOrder();
          }
        }}
      >
        Pay &amp; Print {formatOrderCurrency(totalPayable)}
      </button>

      <button
        type="button"
        className="pos-transaction-details__draft-btn"
        onClick={onSaveDraft}
      >
        Save as Draft
      </button>
    </div>
  );
}
