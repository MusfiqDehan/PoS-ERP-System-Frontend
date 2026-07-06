"use client";

import { useState, useEffect } from "react";
import FormCol from "@/core/common/form/FormCol";
import type { StockTransferRecord } from "./types";
import { usePermission } from "@/hooks/usePermission";

type Props = {
  transfer: StockTransferRecord | null;
  saving?: boolean;
  onApprove: (id: string) => Promise<boolean>;
  onReject: (id: string) => Promise<boolean>;
  onShip: (id: string) => Promise<boolean>;
  onReceive: (id: string) => Promise<boolean>;
  onPartialApprove: (
    id: string,
    lineQuantities: Record<string, string>,
  ) => Promise<boolean>;
};

export default function EditTransferModal({
  transfer,
  saving,
  onApprove,
  onReject,
  onShip,
  onReceive,
  onPartialApprove,
}: Props) {
  const canEdit = usePermission("stock_transfer", "edit");
  const [lineQtys, setLineQtys] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!transfer) {
      setLineQtys({});
      return;
    }
    const initial: Record<string, string> = {};
    for (const line of transfer.lines) {
      if (line.id) {
        initial[line.id] = line.quantity_requested;
      }
    }
    setLineQtys(initial);
  }, [transfer]);

  if (!transfer) return null;

  const source =
    transfer.source_warehouse_name ??
    transfer.source_branch_name ??
    "—";
  const target =
    transfer.target_warehouse_name ??
    transfer.target_branch_name ??
    "—";

  const run = async (fn: () => Promise<boolean>) => {
    const ok = await fn();
    if (ok) closeBsModal("edit-units");
  };

  return (
    <div className="modal fade" id="edit-units">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <div className="page-title">
              <h4>Transfer {transfer.ref_number}</h4>
            </div>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row mb-3">
              <FormCol lg={6}>
                <p className="mb-1 text-muted">From</p>
                <strong>{source}</strong>
              </FormCol>
              <FormCol lg={6}>
                <p className="mb-1 text-muted">To</p>
                <strong>{target}</strong>
              </FormCol>
              <FormCol lg={6}>
                <p className="mb-1 text-muted">Status</p>
                <strong className="text-capitalize">
                  {transfer.status.replace(/_/g, " ")}
                </strong>
              </FormCol>
              <FormCol lg={6}>
                <p className="mb-1 text-muted">Requested By</p>
                <strong>{transfer.requested_by_name ?? "—"}</strong>
              </FormCol>
            </div>
            {transfer.notes && (
              <div className="mb-3">
                <p className="mb-1 text-muted">Notes</p>
                <p>{transfer.notes}</p>
              </div>
            )}
            <div className="table-responsive mb-3">
              <table className="table datanew">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Requested</th>
                    <th>Approved</th>
                    <th>Received</th>
                    {(transfer.status === "pending" ||
                      transfer.status === "draft") &&
                      canEdit && <th>Approve Qty</th>}
                  </tr>
                </thead>
                <tbody>
                  {transfer.lines.map((line) => (
                    <tr key={line.id ?? line.product}>
                      <td>{line.product}</td>
                      <td>{line.quantity_requested}</td>
                      <td>{line.quantity_approved ?? "—"}</td>
                      <td>{line.quantity_received ?? "—"}</td>
                      {(transfer.status === "pending" ||
                        transfer.status === "draft") &&
                        canEdit &&
                        line.id && (
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={lineQtys[line.id] ?? line.quantity_requested}
                              onChange={(e) =>
                                setLineQtys((prev) => ({
                                  ...prev,
                                  [line.id!]: e.target.value,
                                }))
                              }
                              min="0"
                              step="any"
                            />
                          </td>
                        )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {canEdit && (
            <div className="modal-footer flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {(transfer.status === "pending" || transfer.status === "draft") && (
                <>
                  <button
                    type="button"
                    className="btn btn-success"
                    disabled={saving}
                    onClick={() => run(() => onApprove(transfer.id))}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    disabled={saving}
                    onClick={() =>
                      run(() => onPartialApprove(transfer.id, lineQtys))
                    }
                  >
                    Partial Approve
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    disabled={saving}
                    onClick={() => run(() => onReject(transfer.id))}
                  >
                    Reject
                  </button>
                </>
              )}
              {transfer.status === "approved" && (
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={() => run(() => onShip(transfer.id))}
                >
                  Ship
                </button>
              )}
              {transfer.status === "in_transit" && (
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={() => run(() => onReceive(transfer.id))}
                >
                  Receive
                </button>
              )}
            </div>
          )}
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
