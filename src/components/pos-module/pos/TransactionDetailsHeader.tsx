"use client";

type TransactionDetailsHeaderProps = {
  invoiceId: string;
  onHold?: () => void;
  onNew?: () => void;
  onClear?: () => void;
};

export default function TransactionDetailsHeader({
  invoiceId,
  onHold,
  onNew,
  onClear,
}: TransactionDetailsHeaderProps) {
  return (
    <>
      <h2 className="pos-transaction-details__title">Transaction Details</h2>

      <div className="pos-transaction-details__invoice-row">
        <span className="pos-transaction-details__invoice-badge">
          {invoiceId}
        </span>

        <div className="pos-transaction-details__quick-actions">
          <button
            type="button"
            className="pos-transaction-details__action-btn"
            onClick={onHold}
          >
            Hold
          </button>
          <button
            type="button"
            className="pos-transaction-details__action-btn"
            onClick={onNew}
          >
            New
          </button>
          <button
            type="button"
            className="pos-transaction-details__action-btn pos-transaction-details__action-btn--danger"
            onClick={onClear}
          >
            Clear
          </button>
        </div>
      </div>
    </>
  );
}
