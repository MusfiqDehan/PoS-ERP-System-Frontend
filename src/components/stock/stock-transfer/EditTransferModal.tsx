"use client";

import { useState, useEffect } from "react";
import FormCol from "@/core/common/form/FormCol";
import type { StockTransferRecord } from "./types";
import { usePermission } from "@/hooks/usePermission";
import { closeBootstrapModal } from "@/lib/bootstrapModal";

type Props = {
  transfer: StockTransferRecord | null;
  detailLoading?: boolean;
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
  detailLoading,
  saving,
  onApprove,
  onReject,
  onShip,
  onReceive,
  onPartialApprove,
}: Props) {
  const { allowed: canEdit } = usePermission("stock_transfer", "edit");
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

  const run = async (fn: () => Promise<boolean>) => {
    const ok = await fn();
    if (ok) closeBootstrapModal("edit-units");
  };

  return (
    <div className="modal fade" id="edit-units" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          {!transfer || detailLoading ? (
            <div className="modal-body">
              <p className="text-muted mb-0">Loading transfer...</p>
            </div>
          ) : (
            <TransferDetails
              transfer={transfer}
              canEdit={canEdit}
              saving={saving}
              lineQtys={lineQtys}
              setLineQtys={setLineQtys}
              onApprove={onApprove}
              onReject={onReject}
              onShip={onShip}
              onReceive={onReceive}
              onPartialApprove={onPartialApprove}
              run={run}
            />
          )}
        </div>
      </div>
    </div>
  );
}

type TransferDetailsProps = {
  transfer: StockTransferRecord;
  canEdit: boolean;
  saving?: boolean;
  lineQtys: Record<string, string>;
  setLineQtys: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onApprove: (id: string) => Promise<boolean>;
  onReject: (id: string) => Promise<boolean>;
  onShip: (id: string) => Promise<boolean>;
  onReceive: (id: string) => Promise<boolean>;
  onPartialApprove: (
    id: string,
    lineQuantities: Record<string, string>,
  ) => Promise<boolean>;
  run: (fn: () => Promise<boolean>) => Promise<void>;
};

function TransferDetails({
  transfer,
  canEdit,
  saving,
  lineQtys,
  setLineQtys,
  onApprove,
  onReject,
  onShip,
  onReceive,
  onPartialApprove,
  run,
}: TransferDetailsProps) {
  const source =
    transfer.source_warehouse_name ??
    transfer.source_branch_name ??
    "—";
  const target =
    transfer.target_warehouse_name ??
    transfer.target_branch_name ??
    "—";
  const isPending =
    transfer.status === "pending" || transfer.status === "draft";

  return (
    <>
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

        {transfer.notes ? (
          <div className="mb-3">
            <p className="mb-1 text-muted">Notes</p>
            <p>{transfer.notes}</p>
          </div>
        ) : null}

        <div className="table-responsive mb-3">
          <table className="table datanew">
            <thead>
              <tr>
                <th>Product</th>
                <th>Requested</th>
                <th>Approved</th>
                <th>Received</th>
                {isPending && canEdit ? <th>Approve Qty</th> : null}
              </tr>
            </thead>
            <tbody>
              {transfer.lines.map((line) => (
                <tr key={line.id ?? line.product}>
                  <td>{line.product}</td>
                  <td>{line.quantity_requested}</td>
                  <td>{line.quantity_approved ?? "—"}</td>
                  <td>{line.quantity_received ?? "—"}</td>
                  {isPending && canEdit && line.id ? (
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
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {canEdit ? (
        <div className="modal-footer flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          {isPending ? (
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
          ) : null}
          {transfer.status === "approved" ? (
            <button
              type="button"
              className="btn btn-primary"
              disabled={saving}
              onClick={() => run(() => onShip(transfer.id))}
            >
              Ship
            </button>
          ) : null}
          {transfer.status === "in_transit" ? (
            <button
              type="button"
              className="btn btn-primary"
              disabled={saving}
              onClick={() => run(() => onReceive(transfer.id))}
            >
              Receive
            </button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
