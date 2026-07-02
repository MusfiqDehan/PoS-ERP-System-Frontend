"use client";

import { useEffect, useState } from "react";
import { fetchSubscriptionSummary, type SubscriptionSummary } from "@/lib/tenant-billing";
import { getAccessToken } from "@/lib/auth-session";

type Props = { refreshKey?: number };

function formatCurrency(amount: string, currency: string): string {
  const n = parseFloat(amount);
  if (isNaN(n)) return amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format(n);
}

function formatDate(iso: string | null): string {
  if (!iso) return "---";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso.slice(0, 10);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const limitItems = [
  { label: "Branches", key: "max_branches" as const, icon: "ti ti-building-store" },
  { label: "Users", key: "max_users" as const, icon: "ti ti-users" },
  { label: "Admins", key: "max_admins" as const, icon: "ti ti-shield-check" },
  { label: "Staff", key: "max_staff" as const, icon: "ti ti-user-star" },
  { label: "Custom Roles", key: "max_custom_roles" as const, icon: "ti ti-key" },
];

export default function SubscriptionSummaryCard({ refreshKey }: Props) {
  const [summary, setSummary] = useState<SubscriptionSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(function () {
    const token = getAccessToken();
    if (!token) { setError("Authentication required."); setLoading(false); return; }
    setLoading(true);
    setError(null);
    fetchSubscriptionSummary().then(function (result) {
      if (result.ok && result.body.success && result.body.data) {
        setSummary(result.body.data);
      } else {
        setError(result.body.message || "Failed to load subscription summary.");
      }
      setLoading(false);
    });
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map(function (i) {
          return (
            <div key={i} className="card flex-fill animate-pulse">
              <div className="card-body">
                <div className="h-3 bg-[#f1f1f1] rounded w-20 mb-3" />
                <div className="h-5 bg-[#f1f1f1] rounded w-32 mb-2" />
                <div className="h-3 bg-[#f1f1f1] rounded w-24" />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="card">
        <div className="card-body text-center py-5">
          <p className="text-[#646B72] text-sm">{error || "No subscription data available."}</p>
        </div>
      </div>
    );
  }

  const sub = summary.subscriptions[0];
  const limits = summary.effective_limits;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="card flex-fill">
          <div className="card-body">
            <p className="text-[12px] font-medium uppercase text-[#646B72] mb-2">Current Plan</p>
            <h5 className="text-[16px] font-semibold text-[#212B36] mb-1">
              {sub ? sub.package_name : "No active plan"}
            </h5>
            {sub ? (
              <p className="text-[13px] text-[#646B72]">
                {sub.software_product_name} &middot;{" "}
                <span className="capitalize">{sub.billing_cycle}</span>
              </p>
            ) : null}
          </div>
        </div>

        <div className="card flex-fill">
          <div className="card-body">
            <p className="text-[12px] font-medium uppercase text-[#646B72] mb-2">Total Paid</p>
            <h5 className="text-[16px] font-semibold text-[#212B36] mb-1">
              {formatCurrency(summary.total_paid, summary.currency)}
            </h5>
            <p className="text-[13px] text-[#646B72]">All-time payments</p>
          </div>
        </div>

        <div className="card flex-fill">
          <div className="card-body">
            <p className="text-[12px] font-medium uppercase text-[#646B72] mb-2">Status</p>
            <div className="flex items-center gap-2 mb-1">
              {sub ? (
                <span
                  className={
                    "inline-flex items-center gap-1 px-2 py-[3px] rounded text-[11px] font-medium " +
                    (sub.status === "active"
                      ? "bg-[#E7FBF7] text-[#0ac79e]"
                      : sub.status === "cancelled"
                        ? "bg-[#fff0f0] text-[#c80000]"
                        : "bg-[#f6f6f6] text-[#646B72]")
                  }
                >
                  <i className="ti ti-point-filled" />
                  {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                </span>
              ) : (
                <span className="text-[13px] text-[#646B72]">---</span>
              )}
              {summary.is_trial ? (
                <span className="inline-flex items-center gap-1 px-2 py-[3px] rounded bg-[#fff8e5] text-[#b76e00] text-[11px] font-medium">
                  Trial
                </span>
              ) : null}
            </div>
            {sub ? (
              <p className="text-[12px] text-[#646B72]">
                {formatDate(sub.current_period_start)} – {formatDate(sub.current_period_end)}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {sub ? (
        <div className="card flex-fill">
          <div className="card-header">
            <h5 className="card-title m-0 text-[15px] font-semibold text-[#212B36]">Usage Limits</h5>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {limitItems.map(function (item) {
                const value = limits[item.key] !== undefined ? limits[item.key] : 0;
                return (
                  <div key={item.key} className="bg-[#f8f9fa] rounded-md p-3 border border-[#f1f1f1]">
                    <div className="flex items-center gap-1.5 text-[#646B72] mb-1.5">
                      <i className={`${item.icon} text-sm`} />
                      <span className="text-[11px] font-medium uppercase">{item.label}</span>
                    </div>
                    <p className="text-[15px] font-semibold text-[#212B36]">
                      {value === -1 ? "Unlimited" : value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
