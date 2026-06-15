"use client";

import { useEffect, useMemo, useState } from "react";
import { formatOrderCurrency } from "./orderDetailsData";
import { transactionPaymentMethods } from "./transactionDetailsData";
import type { PosReceiptSnapshot } from "@/hooks/pos/usePosCart";

type PosSaleModalsProps = {
  totalPayable: number;
  invoiceId: string;
  selectedPaymentId: string | null;
  receiptSnapshot: PosReceiptSnapshot | null;
  onCompleteOrder: () => void;
  onDismissReceipt: () => void;
};

const QUICK_CASH = [500, 1000, 2000, 5000, 10000];

function getPaymentLabel(paymentId: string | null): string {
  if (!paymentId) {
    return "Payment";
  }

  return (
    transactionPaymentMethods.find((method) => method.id === paymentId)?.label ??
    "Payment"
  );
}

export default function PosSaleModals({
  totalPayable,
  invoiceId,
  selectedPaymentId,
  receiptSnapshot,
  onCompleteOrder,
  onDismissReceipt,
}: PosSaleModalsProps) {
  const [receivedAmount, setReceivedAmount] = useState("");
  const paymentLabel = getPaymentLabel(selectedPaymentId);
  const isCash = selectedPaymentId === "cash";
  const successTotal = receiptSnapshot?.totalPayable ?? totalPayable;
  const successPaymentLabel =
    receiptSnapshot?.paymentLabel ?? paymentLabel;

  const payingAmount = totalPayable;
  const receivedValue = Number.parseFloat(receivedAmount) || 0;
  const changeAmount = Math.max(0, receivedValue - payingAmount);

  const canComplete = useMemo(() => {
    if (payingAmount <= 0) {
      return false;
    }

    if (isCash) {
      return receivedValue >= payingAmount;
    }

    return true;
  }, [isCash, payingAmount, receivedValue]);

  useEffect(() => {
    if (!isCash) {
      setReceivedAmount("");
      return;
    }

    setReceivedAmount(payingAmount > 0 ? payingAmount.toFixed(2) : "");
  }, [isCash, payingAmount, selectedPaymentId]);

  const handleQuickCash = (amount: number) => {
    setReceivedAmount(amount.toFixed(2));
  };

  const handleCompleteSale = () => {
    if (!canComplete) {
      return;
    }

    onCompleteOrder();
  };

  return (
    <>
      <div
        className="modal fade pos-sale-modal"
        id="pos-finalize-sale"
        tabIndex={-1}
        aria-labelledby="pos-finalize-sale-title"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered pos-sale-modal__dialog">
          <div className="modal-content pos-sale-modal__content">
            <div className="pos-sale-modal__header">
              <div>
                <h5 className="pos-sale-modal__title" id="pos-finalize-sale-title">
                  Finalize Sale
                </h5>
                <p className="pos-sale-modal__subtitle">
                  {paymentLabel} · {invoiceId}
                </p>
              </div>
              <button
                type="button"
                className="pos-sale-modal__close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="pos-sale-modal__body">
              <div className="pos-sale-modal__total-card">
                <span className="pos-sale-modal__total-label">Total Payable</span>
                <span className="pos-sale-modal__total-value">
                  {formatOrderCurrency(payingAmount)}
                </span>
              </div>

              {isCash && (
                <>
                  <div className="pos-sale-modal__field-row">
                    <label className="pos-sale-modal__label" htmlFor="pos-received">
                      Received
                    </label>
                    <div className="pos-sale-modal__input-wrap">
                      <span className="pos-sale-modal__input-prefix">$</span>
                      <input
                        id="pos-received"
                        type="number"
                        min="0"
                        step="0.01"
                        className="pos-sale-modal__input"
                        value={receivedAmount}
                        onChange={(event) => setReceivedAmount(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="pos-sale-modal__field-row">
                    <span className="pos-sale-modal__label">Change</span>
                    <span className="pos-sale-modal__change-value">
                      {formatOrderCurrency(changeAmount)}
                    </span>
                  </div>

                  <div className="pos-sale-modal__quick-cash">
                    <span className="pos-sale-modal__quick-label">Quick Cash</span>
                    <div className="pos-sale-modal__quick-list">
                      {QUICK_CASH.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          className="pos-sale-modal__quick-btn"
                          onClick={() => handleQuickCash(amount)}
                        >
                          {formatOrderCurrency(amount)}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {!isCash && selectedPaymentId && (
                <div className="pos-sale-modal__field-row">
                  <label className="pos-sale-modal__label" htmlFor="pos-reference">
                    Reference (optional)
                  </label>
                  <input
                    id="pos-reference"
                    type="text"
                    className="pos-sale-modal__input pos-sale-modal__input--full"
                    placeholder="Transaction / cheque / card ref."
                  />
                </div>
              )}
            </div>

            <div className="pos-sale-modal__footer">
              <button
                type="button"
                className="pos-sale-modal__btn pos-sale-modal__btn--ghost"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="pos-sale-modal__btn pos-sale-modal__btn--primary"
                disabled={!canComplete}
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#pos-payment-completed"
                onClick={handleCompleteSale}
              >
                Complete Sale
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade pos-sale-modal"
        id="pos-payment-completed"
        tabIndex={-1}
        aria-labelledby="pos-payment-completed-title"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered pos-sale-modal__dialog pos-sale-modal__dialog--success">
          <div className="modal-content pos-sale-modal__content pos-sale-modal__content--success">
            <div className="pos-sale-modal__success-body">
              <div className="pos-sale-modal__success-icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M7 14.5L11.5 19L21 9"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h5 className="pos-sale-modal__success-title" id="pos-payment-completed-title">
                Payment Completed
              </h5>
              <p className="pos-sale-modal__success-text">
                {formatOrderCurrency(successTotal)} received via{" "}
                {successPaymentLabel}
              </p>
              <p className="pos-sale-modal__success-hint">
                Would you like to print the receipt?
              </p>

              <div className="pos-sale-modal__success-actions">
                <button
                  type="button"
                  className="pos-sale-modal__btn pos-sale-modal__btn--ghost"
                  data-bs-dismiss="modal"
                  onClick={onDismissReceipt}
                >
                  Next Order
                </button>
                <button
                  type="button"
                  className="pos-sale-modal__btn pos-sale-modal__btn--primary"
                  data-bs-dismiss="modal"
                  onClick={onDismissReceipt}
                >
                  Print Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
