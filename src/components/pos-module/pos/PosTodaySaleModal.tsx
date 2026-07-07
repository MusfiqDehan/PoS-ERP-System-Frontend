"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { formatCurrency } from "@/lib/currency";
import { getAccessToken } from "@/lib/auth-session";
import { fetchPosTodaySummary, type PosTodaySummary } from "@/lib/pos";
import { useActiveBranch } from "@/providers/branch-provider";
import { closePosModal } from "./categories-modal/closePosModal";

const MODAL_ID = "pos-today-sale";

function formatMoney(value: string | number): string {
  const amount = Number.parseFloat(String(value)) || 0;
  return formatCurrency(amount);
}

function formatSummaryDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function buildStats(summary: PosTodaySummary) {
  return [
    { label: "Total Sales", value: formatMoney(summary.total_sales) },
    { label: "Transactions", value: String(summary.transaction_count) },
    { label: "Items Sold", value: summary.items_sold },
    { label: "Avg. Order Value", value: formatMoney(summary.avg_order_value) },
  ];
}

export default function PosTodaySaleModal() {
  const { activeBranch } = useActiveBranch();
  const branchId = activeBranch?.id ?? null;

  const [summary, setSummary] = useState<PosTodaySummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stats = useMemo(() => (summary ? buildStats(summary) : []), [summary]);

  const loadSummary = useCallback(async () => {
    if (!branchId) {
      setSummary(null);
      return;
    }

    setLoading(true);
    setError(null);
    const token = getAccessToken();
    const result = await fetchPosTodaySummary(branchId, token);
    setLoading(false);

    if (result.ok && result.body.data) {
      setSummary(result.body.data);
    } else {
      setSummary(null);
      setError(result.body.message ?? "Failed to load today's sales.");
    }
  }, [branchId]);

  useEffect(() => {
    const modal = document.getElementById(MODAL_ID);
    if (!modal) return;

    const handleShown = () => {
      void loadSummary();
    };
    modal.addEventListener("shown.bs.modal", handleShown);
    return () => modal.removeEventListener("shown.bs.modal", handleShown);
  }, [loadSummary]);

  return (
    <div
      className="modal fade pos-sale-modal"
      id={MODAL_ID}
      tabIndex={-1}
      aria-labelledby="pos-today-sale-title"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered pos-sale-modal__dialog">
        <div className="modal-content pos-sale-modal__content">
          <div className="pos-sale-modal__header">
            <div>
              <h5 className="pos-sale-modal__title" id="pos-today-sale-title">
                Today&apos;s Sale
              </h5>
              <p className="pos-sale-modal__subtitle">
                {activeBranch?.name ?? "Select a branch"}
                {summary?.date ? ` · ${formatSummaryDate(summary.date)}` : ""}
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
              <p className="text-muted mb-0">Select a branch to view today&apos;s sales.</p>
            )}

            {branchId && loading && (
              <div className="d-flex justify-content-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {branchId && !loading && error && (
              <div className="alert alert-danger py-2 mb-0">{error}</div>
            )}

            {branchId && !loading && !error && summary && (
              <div className="pos-stat-grid">
                {stats.map((stat) => (
                  <div key={stat.label} className="pos-stat-grid__item">
                    <span className="pos-stat-grid__label">{stat.label}</span>
                    <span className="pos-stat-grid__value">{stat.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pos-sale-modal__footer">
            <button
              type="button"
              className="pos-sale-modal__btn pos-sale-modal__btn--primary"
              onClick={() => closePosModal(MODAL_ID)}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
