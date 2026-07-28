"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { formatOrderCurrency } from "./orderDetailsData";
import type { TransactionPaymentMethod } from "./transactionDetailsData";
import { transactionPaymentMethods } from "./transactionDetailsData";
import PosReceipt from "./PosReceipt";
import type { PosReceiptSnapshot } from "@/hooks/pos/usePosCart";

type PosSaleModalsProps = {
  totalPayable: number;
  invoiceId: string;
  selectedPaymentId: string | null;
  receiptSnapshot: PosReceiptSnapshot | null;
  onCompleteOrder: () => Promise<void> | void;
  onDismissReceipt: () => void;
  paymentMethods?: TransactionPaymentMethod[];
  printReceiptRequest?: number;
};

type ModalView = "closed" | "finalize" | "success";

const QUICK_CASH = [500, 1000, 2000, 5000, 10000];

function getPaymentLabel(paymentId: string | null, methods: TransactionPaymentMethod[]): string {
  if (!paymentId) return "Payment";
  return methods.find((method) => method.id === paymentId)?.label ?? "Payment";
}

export function useFinalizeSale() {
  const [view, setView] = useState<ModalView>("closed");
  const open = useCallback(() => setView("finalize"), []);
  const close = useCallback(() => setView("closed"), []);
  return { view, setView, open, close };
}

export default function PosSaleModals({
  totalPayable,
  invoiceId,
  selectedPaymentId,
  receiptSnapshot,
  onCompleteOrder,
  onDismissReceipt,
  paymentMethods,
  modalView,
  onModalViewChange,
  printReceiptRequest = 0,
}: PosSaleModalsProps & {
  modalView: ModalView;
  onModalViewChange: (view: ModalView) => void;
}) {
  const [receivedAmount, setReceivedAmount] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const allMethods = paymentMethods ?? transactionPaymentMethods;
  const paymentLabel = getPaymentLabel(selectedPaymentId, allMethods);
  const selectedMethod = allMethods.find((m) => m.id === selectedPaymentId);
  const isCash = selectedMethod
    ? selectedMethod.code === "cash"
    : selectedPaymentId === "cash";
  const successTotal = receiptSnapshot?.totalPayable ?? totalPayable;
  const successPaymentLabel = receiptSnapshot?.paymentLabel ?? paymentLabel;

  const payingAmount = totalPayable;
  const receivedValue = Number.parseFloat(receivedAmount) || 0;
  const changeAmount = Math.max(0, receivedValue - payingAmount);

  const canComplete = useMemo(() => {
    if (payingAmount <= 0) return false;
    if (isCash) return receivedValue >= payingAmount;
    return true;
  }, [isCash, payingAmount, receivedValue]);

  useEffect(() => {
    if (!isCash) {
      setReceivedAmount("");
      return;
    }
    setReceivedAmount(payingAmount > 0 ? payingAmount.toFixed(2) : "");
  }, [isCash, payingAmount, selectedPaymentId]);

  useEffect(() => {
    if (receiptSnapshot && isProcessing) {
      setIsProcessing(false);
      onModalViewChange("success");
    }
  }, [receiptSnapshot, isProcessing, onModalViewChange]);

  useEffect(() => {
    if (printReceiptRequest > 0 && receiptSnapshot) {
      onModalViewChange("closed");
      setShowReceipt(true);
    }
  }, [printReceiptRequest, receiptSnapshot, onModalViewChange]);

  const handleCompleteSale = useCallback(async () => {
    if (!canComplete || isProcessing) return;
    setIsProcessing(true);
    try {
      await onCompleteOrder();
    } catch {
      setIsProcessing(false);
    }
  }, [canComplete, isProcessing, onCompleteOrder]);

  const handleClose = useCallback(() => {
    if (!isProcessing) {
      onModalViewChange("closed");
    }
  }, [isProcessing, onModalViewChange]);

  const handleNextOrder = useCallback(() => {
    onModalViewChange("closed");
    onDismissReceipt();
  }, [onModalViewChange, onDismissReceipt]);

  const handlePrintReceipt = useCallback(() => {
    onModalViewChange("closed");
    setShowReceipt(true);
  }, [onModalViewChange]);

  if (showReceipt && receiptSnapshot) {
    return (
      <PosReceipt
        snapshot={receiptSnapshot}
        onClose={() => {
          setShowReceipt(false);
          onDismissReceipt();
        }}
      />
    );
  }

  if (modalView === "closed") return null;

  return (
    <div
      className="pos-sale-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1050,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.5)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {modalView === "finalize" && (
        <div
          className="pos-sale-modal__content"
          style={{
            background: "#fff",
            borderRadius: 12,
            width: "100%",
            maxWidth: 440,
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          }}
        >
          <div className="pos-sale-modal__header">
            <div>
              <h5 className="pos-sale-modal__title">Finalize Sale</h5>
              <p className="pos-sale-modal__subtitle">
                {paymentLabel} · {invoiceId}
              </p>
            </div>
            <button
              type="button"
              className="pos-sale-modal__close"
              aria-label="Close"
              onClick={handleClose}
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
                    <span className="pos-sale-modal__input-prefix">৳</span>
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
                        onClick={() => setReceivedAmount(amount.toFixed(2))}
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
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="pos-sale-modal__btn pos-sale-modal__btn--primary"
              disabled={!canComplete || isProcessing}
              onClick={handleCompleteSale}
            >
              {isProcessing ? "Processing..." : "Complete Sale"}
            </button>
          </div>
        </div>
      )}

      {modalView === "success" && (
        <div
          className="pos-sale-modal__content pos-sale-modal__content--success"
          style={{
            background: "#fff",
            borderRadius: 12,
            width: "100%",
            maxWidth: 400,
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            textAlign: "center",
            padding: "32px 24px",
          }}
        >
          <div className="pos-sale-modal__success-body">
            <div
              className="pos-sale-modal__success-icon"
              aria-hidden="true"
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "#0bdbae",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                color: "#fff",
              }}
            >
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
            <h5 className="pos-sale-modal__success-title" style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
              Payment Completed
            </h5>
            <p className="pos-sale-modal__success-text" style={{ fontSize: 14, color: "#555", marginBottom: 4 }}>
              {formatOrderCurrency(successTotal)} received via {successPaymentLabel}
            </p>
            <p className="pos-sale-modal__success-hint" style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>
              Would you like to print the receipt?
            </p>

            <div className="pos-sale-modal__success-actions" style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                type="button"
                className="pos-sale-modal__btn pos-sale-modal__btn--ghost"
                onClick={handleNextOrder}
              >
                Next Order
              </button>
              <button
                type="button"
                className="pos-sale-modal__btn pos-sale-modal__btn--primary"
                onClick={handlePrintReceipt}
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
