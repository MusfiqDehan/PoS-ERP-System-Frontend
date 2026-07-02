"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchTenantInvoices, type TenantInvoice } from "@/lib/tenant-billing";
import { getAccessToken } from "@/lib/auth-session";

type Props = { refreshKey?: number };

function formatDate(iso: string | null): string {
  if (!iso) return "---";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso.slice(0, 10);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatCurrency(amount: string, currency: string): string {
  const n = parseFloat(amount);
  if (isNaN(n)) return amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: currency || "USD", minimumFractionDigits: 2,
  }).format(n);
}

const statusBadge: Record<string, string> = {
  success: "bg-[#E7FBF7] text-[#0ac79e]",
  pending: "bg-[#fff8e5] text-[#b76e00]",
  failed: "bg-[#fff0f0] text-[#c80000]",
  cancelled: "bg-[#f6f6f6] text-[#646B72]",
  trial: "bg-[#e8f0fe] text-[#1967d2]",
  init: "bg-[#e8f0fe] text-[#1967d2]",
};

export default function InvoiceHistoryTable({ refreshKey }: Props) {
  const [invoices, setInvoices] = useState<TenantInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(function () {
    const token = getAccessToken();
    if (!token) { setError("Authentication required."); setLoading(false); return; }
    setLoading(true);
    setError(null);
    fetchTenantInvoices().then(function (result) {
      if (result.ok && result.body.success && Array.isArray(result.body.data)) {
        setInvoices(result.body.data);
      } else {
        setError(result.body.message || "Failed to load invoices.");
      }
      setLoading(false);
    });
  }, [refreshKey]);

  const rows = useMemo(function () {
    return invoices.map(function (inv) {
      return {
        key: inv.id,
        tranId: inv.tran_id,
        amount: formatCurrency(inv.amount, inv.currency),
        status: inv.status,
        cycle: inv.billing_cycle,
        gateway: inv.gateway_slug || "---",
        date: formatDate(inv.created_at),
      };
    });
  }, [invoices]);

  if (loading) {
    return (
      <div className="card">
        <div className="card-header"><h5 className="card-title m-0 text-[15px] font-semibold text-[#212B36]">Invoice History</h5></div>
        <div className="card-body"><p className="text-[#646B72] text-sm text-center py-4">Loading...</p></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="card-header"><h5 className="card-title m-0 text-[15px] font-semibold text-[#212B36]">Invoice History</h5></div>
        <div className="card-body"><p className="text-[#c80000] text-sm">{error}</p></div>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="card">
        <div className="card-header"><h5 className="card-title m-0 text-[15px] font-semibold text-[#212B36]">Invoice History</h5></div>
        <div className="card-body"><p className="text-[#646B72] text-sm text-center py-4">No invoices yet.</p></div>
      </div>
    );
  }

  return (
    <div className="card flex-fill">
      <div className="card-header">
        <h5 className="card-title m-0 text-[15px] font-semibold text-[#212B36]">Invoice History</h5>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead className="bg-[#f8f9fa]">
              <tr>
                <th className="text-[12px] font-medium text-[#646B72] uppercase px-4 py-3 border-0">Transaction ID</th>
                <th className="text-[12px] font-medium text-[#646B72] uppercase px-4 py-3 border-0">Amount</th>
                <th className="text-[12px] font-medium text-[#646B72] uppercase px-4 py-3 border-0">Status</th>
                <th className="text-[12px] font-medium text-[#646B72] uppercase px-4 py-3 border-0">Cycle</th>
                <th className="text-[12px] font-medium text-[#646B72] uppercase px-4 py-3 border-0">Gateway</th>
                <th className="text-[12px] font-medium text-[#646B72] uppercase px-4 py-3 border-0">Date</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(function (row) {
                return (
                  <tr key={row.key}>
                    <td className="px-4 py-3 text-[13px] text-[#646B72] font-mono">{row.tranId}</td>
                    <td className="px-4 py-3 text-[14px] font-medium text-[#212B36]">{row.amount}</td>
                    <td className="px-4 py-3">
                      <span className={"inline-flex items-center gap-1 px-2 py-[3px] rounded text-[11px] font-medium " + (statusBadge[row.status] || "bg-[#f6f6f6] text-[#646B72]")}>
                        <i className="ti ti-point-filled" />
                        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#646B72] capitalize">{row.cycle}</td>
                    <td className="px-4 py-3 text-[13px] text-[#646B72] capitalize">{row.gateway}</td>
                    <td className="px-4 py-3 text-[13px] text-[#646B72]">{row.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
