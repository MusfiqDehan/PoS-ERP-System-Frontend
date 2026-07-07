"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PosReceiptSnapshot } from "@/hooks/pos/usePosCart";
import { getAccessToken } from "@/lib/auth-session";
import { fetchLastBranchReceipt, type PosLastReceipt } from "@/lib/pos";
import { useActiveBranch } from "@/providers/branch-provider";
import { closePosModal } from "./categories-modal/closePosModal";
import PosReceiptBody, { printReceiptContent } from "./PosReceiptBody";
import { loadLastPosReceipt } from "./posLastReceiptStorage";

const MODAL_ID = "pos-print-receipt";

function toSnapshot(receipt: PosLastReceipt): PosReceiptSnapshot {
  return {
    saleId: receipt.saleId,
    invoiceId: receipt.invoiceId,
    totalPayable: receipt.totalPayable,
    paymentLabel: receipt.paymentLabel,
    receipt: receipt.receipt,
    receiptRender: receipt.receiptRender,
  };
}

export default function PosPrintReceiptModal() {
  const { activeBranch } = useActiveBranch();
  const branchId = activeBranch?.id ?? null;
  const receiptRef = useRef<HTMLDivElement>(null);

  const [snapshot, setSnapshot] = useState<PosReceiptSnapshot | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadLastReceipt = useCallback(async () => {
    if (!branchId) {
      setSnapshot(null);
      return;
    }

    const cached = loadLastPosReceipt(branchId);
    if (cached) {
      setSnapshot(cached);
    }

    setLoading(true);
    setError(null);
    const token = getAccessToken();
    const result = await fetchLastBranchReceipt(branchId, token);
    setLoading(false);

    if (result.ok) {
      if (result.body.data) {
        setSnapshot(toSnapshot(result.body.data));
      } else if (!cached) {
        setSnapshot(null);
      }
      return;
    }

    if (!cached) {
      setError(result.body.message ?? "Failed to load last receipt.");
    }
  }, [branchId]);

  useEffect(() => {
    const modal = document.getElementById(MODAL_ID);
    if (!modal) return;

    const handleShown = () => {
      void loadLastReceipt();
    };
    modal.addEventListener("shown.bs.modal", handleShown);
    return () => modal.removeEventListener("shown.bs.modal", handleShown);
  }, [loadLastReceipt]);

  const handlePrint = useCallback(() => {
    if (!snapshot || !receiptRef.current) return;
    printReceiptContent(receiptRef.current, snapshot.invoiceId);
  }, [snapshot]);

  const handleDownloadPdf = useCallback(() => {
    if (!snapshot?.saleId) return;
    window.open(
      `/api/v1/configuration/pos/checkout/receipt/${snapshot.saleId}/pdf/`,
      "_blank",
    );
  }, [snapshot?.saleId]);

  return (
    <div
      className="modal fade pos-sale-modal"
      id={MODAL_ID}
      tabIndex={-1}
      aria-labelledby="pos-print-receipt-title"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered pos-sale-modal__dialog pos-sale-modal__dialog--wide">
        <div className="modal-content pos-sale-modal__content">
          <div className="pos-sale-modal__header">
            <div>
              <h5 className="pos-sale-modal__title" id="pos-print-receipt-title">
                Last Receipt
              </h5>
              <p className="pos-sale-modal__subtitle">
                {activeBranch?.name ?? "Select a branch"} · latest completed sale
              </p>
            </div>
            <button
              type="button"
              className="pos-sale-modal__close"
              aria-label="Close"
              onClick={() => closePosModal(MODAL_ID)}
            >
              ×
            </button>
          </div>

          <div className="pos-sale-modal__body">
            {!branchId && (
              <p className="text-muted mb-0">Select a branch to view the last receipt.</p>
            )}

            {branchId && loading && !snapshot && (
              <div className="d-flex justify-content-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {branchId && error && !snapshot && (
              <div className="alert alert-danger py-2 mb-0">{error}</div>
            )}

            {branchId && !loading && !error && !snapshot && (
              <p className="text-muted mb-0">No completed sales found for this branch yet.</p>
            )}

            {snapshot && (
              <div ref={receiptRef}>
                <PosReceiptBody snapshot={snapshot} />
              </div>
            )}
          </div>

          <div className="pos-sale-modal__footer">
            <button
              type="button"
              className="pos-sale-modal__btn pos-sale-modal__btn--ghost"
              onClick={() => closePosModal(MODAL_ID)}
            >
              Close
            </button>
            {snapshot?.saleId && (
              <button
                type="button"
                className="pos-sale-modal__btn pos-sale-modal__btn--ghost"
                onClick={handleDownloadPdf}
              >
                PDF
              </button>
            )}
            <button
              type="button"
              className="pos-sale-modal__btn pos-sale-modal__btn--primary"
              disabled={!snapshot}
              onClick={handlePrint}
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
