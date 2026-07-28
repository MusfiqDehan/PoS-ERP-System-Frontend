"use client";

import { useCallback, useRef } from "react";
import type { PosReceiptSnapshot } from "@/hooks/pos/usePosCart";
import PosReceiptBody, { printReceiptContent } from "./PosReceiptBody";

export {
  shouldDisplayReceiptRender,
  getReceiptFooterMessage,
} from "./posReceiptUtils";

type Props = {
  snapshot: PosReceiptSnapshot;
  onClose: () => void;
};

export default function PosReceipt({ snapshot, onClose }: Props) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = useCallback(() => {
    if (receiptRef.current) {
      printReceiptContent(receiptRef.current, snapshot.invoiceId);
    }
  }, [snapshot.invoiceId]);

  const handleDownloadPdf = useCallback(() => {
    if (snapshot.saleId) {
      const url = `/api/v1/configuration/pos/checkout/receipt/${snapshot.saleId}/pdf/`;
      window.open(url, "_blank");
    }
  }, [snapshot.saleId]);

  return (
    <div
      className="pos-receipt-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 24,
          maxWidth: 420,
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Receipt</h5>
          <button type="button" className="btn-close" onClick={onClose} />
        </div>

        <div ref={receiptRef}>
          <PosReceiptBody snapshot={snapshot} />
        </div>

        <div className="d-flex gap-2 mt-3">
          <button type="button" className="btn btn-outline-secondary flex-fill" onClick={onClose}>
            Close
          </button>
          {snapshot.saleId && (
            <button type="button" className="btn btn-outline-primary flex-fill" onClick={handleDownloadPdf}>
              <i className="ti ti-file-download me-1" /> PDF
            </button>
          )}
          <button type="button" className="btn btn-primary flex-fill" onClick={handlePrint}>
            <i className="ti ti-printer me-1" /> Print
          </button>
        </div>
      </div>
    </div>
  );
}

