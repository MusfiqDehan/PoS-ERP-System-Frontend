"use client";

import { useEffect, useState } from "react";
import {
  createTenantInvitation,
  fetchPublicPackages,
  type PublicPackage,
} from "@/lib/platform";
import { getAccessToken } from "@/lib/auth-session";
import { TENANT_FEATURE_GROUPS, allFeatureKeys } from "./featureGroups";

const inputCls =
  "w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px] text-[#212B36] placeholder:text-[#9aa0a6] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e] transition-colors";
const labelCls = "block text-[13px] font-medium text-[#212B36] mb-1.5";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function InviteCompanyModal({ open, onClose, onSuccess }: Props) {
  const [companyName, setCompanyName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [plan, setPlan] = useState("");
  const [maxUsers, setMaxUsers] = useState(10);
  const [maxBranches, setMaxBranches] = useState(1);
  const [maxRoles, setMaxRoles] = useState(5);
  const [featureKeys, setFeatureKeys] = useState<Set<string>>(
    new Set(allFeatureKeys()),
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [packages, setPackages] = useState<PublicPackage[]>([]);

  useEffect(() => {
    if (!open) return;
    fetchPublicPackages().then((pkgs) => {
      setPackages(pkgs);
      if (pkgs.length > 0 && !plan) {
        setPlan(pkgs[0].slug);
      }
    });
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  function toggleFeature(key: string) {
    setFeatureKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function toggleGroup(groupKeys: string[]) {
    setFeatureKeys((prev) => {
      const next = new Set(prev);
      const allChecked = groupKeys.every((k) => next.has(k));
      if (allChecked) {
        groupKeys.forEach((k) => next.delete(k));
      } else {
        groupKeys.forEach((k) => next.add(k));
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!companyName.trim() || !ownerEmail.trim() || !subdomain.trim()) {
      setError("Company name, owner email, and subdomain are required.");
      return;
    }
    setSubmitting(true);
    const token = getAccessToken();
    if (!token) {
      setError("Authentication required.");
      setSubmitting(false);
      return;
    }
    const result = await createTenantInvitation(token, {
      company_name: companyName.trim(),
      owner_email: ownerEmail.trim(),
      subdomain: subdomain.trim().toLowerCase(),
      plan,
      max_users: maxUsers,
      max_branches: maxBranches,
      max_roles: maxRoles,
      feature_keys: Array.from(featureKeys),
    });
    setSubmitting(false);
    if (result.ok && result.body.success) {
      resetForm();
      onSuccess();
      onClose();
    } else {
      setError(result.body.message || "Failed to create invitation.");
    }
  }

  function resetForm() {
    setCompanyName("");
    setOwnerEmail("");
    setSubdomain("");
    setPlan(packages.length > 0 ? packages[0].slug : "");
    setMaxUsers(10);
    setMaxBranches(1);
    setMaxRoles(5);
    setFeatureKeys(new Set(allFeatureKeys()));
    setError("");
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1050] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-[720px] max-h-[90vh] flex flex-col shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
          <h4 className="m-0 text-[18px] font-bold text-[#212B36]">
            Invite Company
          </h4>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 inline-flex items-center justify-center rounded-md text-[#646B72] hover:bg-[#f6f6f6]"
          >
            <i className="ti ti-x" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-[#fff0f0] text-[#c80000] text-[13px]">
                {error}
              </div>
            )}

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 min-[768px]:col-span-6">
                <label className={labelCls}>
                  Company Name <span className="text-[#dc3545]">*</span>
                </label>
                <input
                  type="text"
                  className={inputCls}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Acme Corp"
                  required
                />
              </div>
              <div className="col-span-12 min-[768px]:col-span-6">
                <label className={labelCls}>
                  Owner Email <span className="text-[#dc3545]">*</span>
                </label>
                <input
                  type="email"
                  className={inputCls}
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  placeholder="admin@acme.com"
                  required
                />
              </div>
              <div className="col-span-12 min-[768px]:col-span-6">
                <label className={labelCls}>
                  Subdomain <span className="text-[#dc3545]">*</span>
                </label>
                <input
                  type="text"
                  className={inputCls}
                  value={subdomain}
                  onChange={(e) =>
                    setSubdomain(e.target.value.replace(/[^a-z0-9-]/g, ""))
                  }
                  placeholder="acme"
                  required
                />
              </div>
              <div className="col-span-12 min-[768px]:col-span-6">
                <label className={labelCls}>Plan</label>
                <select
                  className={inputCls}
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                >
                  {packages.length === 0 && (
                    <option value="">Loading packages...</option>
                  )}
                  {packages.map((pkg) => (
                    <option key={pkg.slug} value={pkg.slug}>
                      {pkg.name}
                      {pkg.is_trial ? " (Trial)" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 min-[768px]:col-span-4">
                <label className={labelCls}>Max Users</label>
                <input
                  type="number"
                  className={inputCls}
                  value={maxUsers}
                  onChange={(e) => setMaxUsers(Number(e.target.value) || 1)}
                  min={1}
                />
              </div>
              <div className="col-span-12 min-[768px]:col-span-4">
                <label className={labelCls}>Max Branches</label>
                <input
                  type="number"
                  className={inputCls}
                  value={maxBranches}
                  onChange={(e) => setMaxBranches(Number(e.target.value) || 1)}
                  min={1}
                />
              </div>
              <div className="col-span-12 min-[768px]:col-span-4">
                <label className={labelCls}>Max Roles</label>
                <input
                  type="number"
                  className={inputCls}
                  value={maxRoles}
                  onChange={(e) => setMaxRoles(Number(e.target.value) || 1)}
                  min={1}
                />
              </div>
            </div>

            <div>
              <h6 className="text-[14px] font-semibold text-[#212B36] mb-3">
                Feature Selection
              </h6>
              <div className="space-y-3 max-h-[280px] overflow-y-auto border border-[#eef0f3] rounded-lg p-3">
                {TENANT_FEATURE_GROUPS.map((group) => {
                  const groupKeys = group.children.map((c) => c.key);
                  const allChecked = groupKeys.every((k) =>
                    featureKeys.has(k),
                  );
                  const someChecked =
                    !allChecked &&
                    groupKeys.some((k) => featureKeys.has(k));
                  return (
                    <div key={group.group}>
                      <label className="flex items-center gap-2 cursor-pointer mb-1.5">
                        <input
                          type="checkbox"
                          checked={allChecked}
                          ref={(el) => {
                            if (el) el.indeterminate = someChecked;
                          }}
                          onChange={() => toggleGroup(groupKeys)}
                          className="accent-[#0ac79e]"
                        />
                        <span className="text-[13px] font-semibold text-[#212B36]">
                          {group.group}
                        </span>
                      </label>
                      <div className="ml-5 grid grid-cols-2 min-[768px]:grid-cols-3 gap-x-4 gap-y-1">
                        {group.children.map((child) => (
                          <label
                            key={child.key}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={featureKeys.has(child.key)}
                              onChange={() => toggleFeature(child.key)}
                              className="accent-[#0ac79e]"
                            />
                            <span className="text-[12px] text-[#646B72]">
                              {child.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 p-4 border-t border-[#f1f1f1]">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-4 py-2 rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[14px] font-medium hover:bg-[#f6f6f6] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] transition-colors disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Send Invitation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
