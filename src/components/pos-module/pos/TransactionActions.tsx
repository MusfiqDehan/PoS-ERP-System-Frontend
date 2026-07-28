"use client";

import { formatOrderCurrency } from "./orderDetailsData";

type TransactionActionsProps = {
  totalPayable: number;
  canCheckout: boolean;
  onSaveDraft: () => void;
  onPayAndPrint: () => void;
};

export default function TransactionActions({
  totalPayable,
  canCheckout,
  onSaveDraft,
  onPayAndPrint,
}: TransactionActionsProps) {
  return (
    <div className="pos-transaction-details__actions">
      <button
        type="button"
        className="pos-transaction-details__pay-btn"
        disabled={!canCheckout}
        onClick={canCheckout ? onPayAndPrint : undefined}
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
