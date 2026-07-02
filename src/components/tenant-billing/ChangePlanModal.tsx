"use client";

import { useCallback, useEffect, useState } from "react";
import { initiatePlanChange, type InitiateChangePayload } from "@/lib/tenant-billing";
import { fetchPublicPackages, type PublicPackage } from "@/lib/billing";
import { getAccessToken } from "@/lib/auth-session";

const inputCls =
  "w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px] text-[#212B36] placeholder:text-[#9aa0a6] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e] transition-colors";

const labelCls = "block text-[13px] font-medium text-[#212B36] mb-1.5";

type Props = { onChanged?: () => void };

export default function ChangePlanModal({ onChanged }: Props) {
  const [packages, setPackages] = useState<PublicPackage[]>([]);
  const [loadingPkgs, setLoadingPkgs] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successUrl, setSuccessUrl] = useState<string | null>(null);

  useEffect(function () {
    fetchPublicPackages().then(function (result) {
      if (result.ok && result.body.success && Array.isArray(result.body.data)) {
        setPackages(result.body.data);
      }
      setLoadingPkgs(false);
    });
  }, []);

  const selected = packages.find(function (p) { return p.slug === selectedSlug; });

  const handleSubmit = useCallback(async function (e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlug) return;
    const token = getAccessToken();
    if (!token) { setError("Authentication required."); return; }
    setSubmitting(true);
    setError(null);
    setSuccessUrl(null);
    try {
      const payload: InitiateChangePayload = {
        package_slug: selectedSlug,
        billing_cycle: billingCycle,
      };
      const result = await initiatePlanChange(payload);
      if (result.ok && result.body.success && result.body.data) {
        if (result.body.data.gateway_url) {
          setSuccessUrl(result.body.data.gateway_url);
        } else if (onChanged) { onChanged(); }
      } else {
        setError(result.body.message || "Failed to initiate plan change.");
      }
    } catch { setError("Unable to reach the server."); }
    finally { setSubmitting(false); }
  }, [selectedSlug, billingCycle, onChanged]);

  return (
    <div className="modal fade" id="change_plan_modal">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
            <h4 className="m-0 text-[18px] font-bold text-[#212B36]">Change Plan</h4>
            <button type="button" data-bs-dismiss="modal" aria-label="Close"
              className="w-7 h-7 inline-flex items-center justify-center rounded-md text-[#646B72] hover:bg-[#f6f6f6]">
              <i className="ti ti-x" />
            </button>
          </div>

          {successUrl ? (
            <div className="p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#E7FBF7] flex items-center justify-center">
                <i className="ti ti-check text-2xl text-[#0ac79e]" />
              </div>
              <h5 className="text-[16px] font-semibold text-[#212B36] mb-2">Redirecting to Payment</h5>
              <p className="text-[13px] text-[#646B72] mb-4">You will be redirected to complete your payment.</p>
              <a href={successUrl} className="btn btn-primary">
                Continue to Payment <i className="ti ti-arrow-right ms-1" />
              </a>
            </div>
          ) : loadingPkgs ? (
            <div className="p-6 text-center text-[#646B72] text-[14px]">Loading plans...</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="p-4 space-y-4">
                <div>
                  <label className={labelCls}>Select Plan <span className="text-[#dc3545]">*</span></label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {packages.map(function (pkg) {
                      const selectedC = selectedSlug === pkg.slug
                        ? "border-[#0ac79e] bg-[#f0fdf9] shadow-sm" : "border-[#e7e7e7] hover:border-[#cdcdcd]";
                      return (
                        <label key={pkg.slug}
                          className={"flex flex-col gap-1 p-3 rounded-md border cursor-pointer transition-colors " + selectedC}>
                          <div className="flex items-center gap-2">
                            <input type="radio" name="plan" value={pkg.slug} checked={selectedSlug === pkg.slug}
                              onChange={function () { setSelectedSlug(pkg.slug); }}
                              className="w-4 h-4 accent-[#0ac79e]" />
                            <span className="text-[14px] font-semibold text-[#212B36]">{pkg.name}</span>
                          </div>
                          <p className="text-[12px] text-[#646B72] ml-6">{pkg.description}</p>
                          <div className="ml-6 flex items-center gap-3 text-[12px] text-[#646B72]">
                            <span className="font-semibold text-[#212B36]">
                              ${billingCycle === "monthly" ? pkg.price_monthly : pkg.price_yearly}
                              <span className="text-[#646B72] font-normal">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                            </span>
                            <span>{pkg.max_branches} branches &middot; {pkg.max_users} users</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Billing Cycle</label>
                  <div className="flex gap-2">
                    {(function () {
                      const cycles: ("monthly" | "yearly")[] = ["monthly", "yearly"];
                      return cycles.map(function (cycle) {
                        return (
                          <button key={cycle} type="button" onClick={function () { setBillingCycle(cycle); }}
                            className={
                              "px-4 py-2 rounded-md text-[13px] font-medium border transition-colors capitalize " +
                              (billingCycle === cycle
                                ? "bg-[#0ac79e] text-white border-[#0ac79e]"
                                : "bg-white text-[#646B72] border-[#e7e7e7] hover:border-[#cdcdcd]")
                            }>
                            {cycle}
                          </button>
                        );
                      });
                    })()}
                  </div>
                </div>

                {selected ? (
                  <div className="bg-[#f8f9fa] rounded-md p-3 border border-[#f1f1f1]">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <i className="ti ti-info-circle text-[#646B72] text-sm" />
                      <span className="text-[11px] font-medium uppercase text-[#646B72]">Plan Summary</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[13px]">
                      <div><p className="text-[#646B72] text-[12px]">Branches</p><p className="font-semibold text-[#212B36]">{selected.max_branches}</p></div>
                      <div><p className="text-[#646B72] text-[12px]">Users</p><p className="font-semibold text-[#212B36]">{selected.max_users}</p></div>
                      <div><p className="text-[#646B72] text-[12px]">Price</p><p className="font-semibold text-[#212B36]">${billingCycle === "monthly" ? selected.price_monthly : selected.price_yearly}</p></div>
                      <div><p className="text-[#646B72] text-[12px]">Cycle</p><p className="font-semibold text-[#212B36] capitalize">{billingCycle}</p></div>
                    </div>
                  </div>
                ) : null}

                {error ? (
                  <div className="flex items-center gap-1.5 text-[13px] text-[#c80000] bg-[#fff0f0] border border-[#ffcccc] rounded-md p-3">
                    <i className="ti ti-alert-circle" /> {error}
                  </div>
                ) : null}
              </div>

              <div className="flex items-center justify-end gap-2 p-4 border-t border-[#f1f1f1]">
                <button type="button" data-bs-dismiss="modal" disabled={submitting}
                  className="px-4 py-2 rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[14px] font-medium hover:bg-[#f6f6f6] transition-colors disabled:opacity-50">
                  Cancel
                </button>
                <button type="submit" disabled={submitting || !selectedSlug}
                  className="px-4 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] transition-colors disabled:opacity-50">
                  {submitting ? "Processing..." : "Change Plan"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
