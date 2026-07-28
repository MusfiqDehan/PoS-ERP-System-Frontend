"use client";

import { useState, useEffect, FormEvent } from "react";
import type { StockLevel } from "@/lib/stock";

type Props = {
  target: StockLevel | null;
  onSubmit: (payload: {
    branch?: string;
    warehouse?: string;
    product: string;
    variant?: string;
    quantity_after: string;
    reason: string;
  }) => Promise<boolean>;
};

export default function EditStockModal({ target, onSubmit }: Props) {
  const [quantityAfter, setQuantityAfter] = useState("");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (target) {
      setQuantityAfter(target.quantity);
      setReason("");
    }
  }, [target]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!target) return;
    setSubmitting(true);
    const ok = await onSubmit({
      branch: target.branch ?? undefined,
      warehouse: target.warehouse ?? undefined,
      product: target.product,
      variant: target.variant ?? undefined,
      quantity_after: quantityAfter,
      reason,
    });
    setSubmitting(false);
    if (ok) closeBsModal("edit-units");
  };

  return (
    <div className="modal fade" id="edit-units">
      <div className="modal-dialog modal-dialog-centered stock-adjust-modal">
        <div className="modal-content">
          <div className="modal-header">
            <div className="page-title"><h4>Adjust Stock</h4></div>
            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Product</label>
                <input type="text" className="form-control" value={target?.product_name ?? target?.product ?? ""} disabled />
              </div>
              <div className="mb-3">
                <label className="form-label">Current Quantity</label>
                <input type="text" className="form-control" value={target?.quantity ?? ""} disabled />
              </div>
              <div className="mb-3">
                <label className="form-label">New Quantity <span className="text-danger">*</span></label>
                <input type="number" className="form-control" required value={quantityAfter} onChange={(e) => setQuantityAfter(e.target.value)} min="0" />
              </div>
              <div className="mb-3">
                <label className="form-label">Reason <span className="text-danger">*</span></label>
                <textarea className="form-control" required value={reason} onChange={(e) => setReason(e.target.value)} rows={3} placeholder="Reason for adjustment" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={submitting || !reason}>
                {submitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function closeBsModal(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bsModal = (window as any).bootstrap?.Modal?.getInstance(el);
  bsModal?.hide();
}
