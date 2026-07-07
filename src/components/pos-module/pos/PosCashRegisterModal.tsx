"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { formatCurrency } from "@/lib/currency";
import { getAccessToken } from "@/lib/auth-session";
import {
  fetchCashRegisterStatus,
  openCashRegisterShift,
  recordCashRegisterMovement,
  type CashRegisterStatus,
} from "@/lib/pos";
import { useActiveBranch } from "@/providers/branch-provider";
import { closePosModal } from "./categories-modal/closePosModal";

const MODAL_ID = "pos-cash-register";

const MOVEMENT_LABELS: Record<string, string> = {
  opening: "Opening float",
  cash_in: "Cash in",
  cash_out: "Cash out",
  sale: "Cash sale",
  refund: "Cash refund",
};

function formatMoney(value: string | number): string {
  const amount = Number.parseFloat(String(value)) || 0;
  return formatCurrency(amount);
}

export default function PosCashRegisterModal() {
  const { activeBranch } = useActiveBranch();
  const branchId = activeBranch?.id ?? null;

  const [status, setStatus] = useState<CashRegisterStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [openingFloat, setOpeningFloat] = useState("0");
  const [movement, setMovement] = useState<"cash_in" | "cash_out">("cash_in");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const parsedAmount = Number.parseFloat(amount) || 0;
  const projectedBalance = useMemo(() => {
    const current = Number.parseFloat(status?.balance ?? "0") || 0;
    if (!status?.is_open || parsedAmount <= 0) {
      return current;
    }
    return movement === "cash_in" ? current + parsedAmount : current - parsedAmount;
  }, [movement, parsedAmount, status]);

  const loadStatus = useCallback(async () => {
    if (!branchId) {
      setStatus(null);
      return;
    }
    setLoading(true);
    setError(null);
    const token = getAccessToken();
    const result = await fetchCashRegisterStatus(branchId, token);
    setLoading(false);
    if (result.ok && result.body.data) {
      setStatus(result.body.data);
      setOpeningFloat(result.body.data.opening_float || "0");
    } else {
      setError(result.body.message ?? "Failed to load cash register.");
    }
  }, [branchId]);

  useEffect(() => {
    const modal = document.getElementById(MODAL_ID);
    if (!modal) {
      return;
    }

    const handleShown = () => {
      void loadStatus();
    };
    modal.addEventListener("shown.bs.modal", handleShown);
    return () => modal.removeEventListener("shown.bs.modal", handleShown);
  }, [loadStatus]);

  const handleOpenShift = async () => {
    if (!branchId) return;
    setSubmitting(true);
    setError(null);
    setMessage(null);
    const token = getAccessToken();
    const result = await openCashRegisterShift(
      { branch: branchId, opening_float: openingFloat || "0" },
      token,
    );
    setSubmitting(false);
    if (result.ok && result.body.data) {
      setStatus(result.body.data);
      setMessage("Cash register opened.");
    } else {
      setError(result.body.message ?? "Failed to open cash register.");
    }
  };

  const handleRecordMovement = async () => {
    if (!branchId || parsedAmount <= 0) return;
    setSubmitting(true);
    setError(null);
    setMessage(null);
    const token = getAccessToken();
    const result = await recordCashRegisterMovement(
      {
        branch: branchId,
        movement_type: movement,
        amount: parsedAmount,
        note,
      },
      token,
    );
    setSubmitting(false);
    if (result.ok && result.body.data) {
      setStatus(result.body.data);
      setAmount("");
      setNote("");
      setMessage(
        `${movement === "cash_in" ? "Cash in" : "Cash out"} of ${formatMoney(parsedAmount)} recorded.`,
      );
    } else {
      setError(result.body.message ?? "Failed to record cash movement.");
    }
  };

  return (
    <div
      className="modal fade pos-sale-modal"
      id={MODAL_ID}
      tabIndex={-1}
      aria-labelledby="pos-cash-register-title"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered pos-sale-modal__dialog pos-sale-modal__dialog--wide">
        <div className="modal-content pos-sale-modal__content">
          <div className="pos-sale-modal__header">
            <div>
              <h5 className="pos-sale-modal__title" id="pos-cash-register-title">
                Cash Register
              </h5>
              <p className="pos-sale-modal__subtitle">
                {activeBranch?.name ?? "Select a branch"} · synced with cash payments
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
              <p className="text-muted mb-0">Select a branch to manage the cash drawer.</p>
            )}

            {branchId && loading && (
              <div className="d-flex justify-content-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {branchId && !loading && error && (
              <div className="alert alert-danger py-2">{error}</div>
            )}

            {branchId && !loading && message && (
              <div className="alert alert-success py-2">{message}</div>
            )}

            {branchId && !loading && status && !status.is_open && (
              <div className="pos-cash-register__open-shift">
                <p className="text-muted">
                  Open the register before taking cash payments or recording movements.
                </p>
                <div className="pos-sale-modal__field-row">
                  <label className="pos-sale-modal__label" htmlFor="pos-opening-float">
                    Opening float
                  </label>
                  <div className="pos-sale-modal__input-wrap">
                    <span className="pos-sale-modal__input-prefix">$</span>
                    <input
                      id="pos-opening-float"
                      type="number"
                      min="0"
                      step="0.01"
                      className="pos-sale-modal__input"
                      value={openingFloat}
                      onChange={(event) => setOpeningFloat(event.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="pos-sale-modal__btn pos-sale-modal__btn--primary mt-3"
                  disabled={submitting}
                  onClick={handleOpenShift}
                >
                  Open shift
                </button>
              </div>
            )}

            {branchId && !loading && status?.is_open && (
              <>
                <div className="pos-sale-modal__total-card">
                  <span className="pos-sale-modal__total-label">Drawer balance</span>
                  <span className="pos-sale-modal__total-value">
                    {formatMoney(status.balance)}
                  </span>
                </div>

                <div className="pos-stat-grid mb-4">
                  <div className="pos-stat-grid__item">
                    <span className="pos-stat-grid__label">Opening float</span>
                    <span className="pos-stat-grid__value">
                      {formatMoney(status.opening_float)}
                    </span>
                  </div>
                  <div className="pos-stat-grid__item">
                    <span className="pos-stat-grid__label">Cash sales today</span>
                    <span className="pos-stat-grid__value">
                      {formatMoney(status.cash_sales_today)}
                    </span>
                  </div>
                </div>

                <div className="pos-cash-toggle">
                  <button
                    type="button"
                    className={`pos-cash-toggle__btn ${
                      movement === "cash_in" ? "pos-cash-toggle__btn--active" : ""
                    }`}
                    onClick={() => setMovement("cash_in")}
                  >
                    Cash In
                  </button>
                  <button
                    type="button"
                    className={`pos-cash-toggle__btn ${
                      movement === "cash_out" ? "pos-cash-toggle__btn--active" : ""
                    }`}
                    onClick={() => setMovement("cash_out")}
                  >
                    Cash Out
                  </button>
                </div>

                <div className="pos-sale-modal__field-row">
                  <label className="pos-sale-modal__label" htmlFor="pos-cash-amount">
                    Amount
                  </label>
                  <div className="pos-sale-modal__input-wrap">
                    <span className="pos-sale-modal__input-prefix">$</span>
                    <input
                      id="pos-cash-amount"
                      type="number"
                      min="0"
                      step="0.01"
                      className="pos-sale-modal__input"
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                    />
                  </div>
                </div>

                {parsedAmount > 0 && (
                  <p className="text-muted small mb-3">
                    Projected balance: {formatMoney(projectedBalance)}
                  </p>
                )}

                <div className="pos-sale-modal__field-row">
                  <label className="pos-sale-modal__label" htmlFor="pos-cash-note">
                    Note (optional)
                  </label>
                  <input
                    id="pos-cash-note"
                    type="text"
                    className="pos-sale-modal__input pos-sale-modal__input--full"
                    placeholder="Reason for cash movement"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                  />
                </div>

                {status.recent_movements.length > 0 && (
                  <div className="mt-4">
                    <h6 className="mb-3">Recent movements</h6>
                    <ul className="list-unstyled mb-0">
                      {status.recent_movements.map((entry) => (
                        <li
                          key={entry.id}
                          className="d-flex justify-content-between gap-3 border-bottom py-2 small"
                        >
                          <span>
                            {MOVEMENT_LABELS[entry.movement_type] ?? entry.movement_type}
                            {entry.sale_ref ? ` · ${entry.sale_ref}` : ""}
                            {entry.note ? ` — ${entry.note}` : ""}
                          </span>
                          <span className="text-nowrap fw-semibold">
                            {formatMoney(entry.amount)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
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
            {status?.is_open && (
              <button
                type="button"
                className="pos-sale-modal__btn pos-sale-modal__btn--primary"
                disabled={submitting || parsedAmount <= 0}
                onClick={handleRecordMovement}
              >
                Record
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
