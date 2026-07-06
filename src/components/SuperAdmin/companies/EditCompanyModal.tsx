"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import {
  updatePlatformTenant,
  uploadTenantLogo,
  removeTenantLogo,
  fetchPublicPackages,
  type PlatformTenant,
  type PublicPackage,
} from "@/lib/platform";
import { getAccessToken } from "@/lib/auth-session";

const inputCls =
  "w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px] text-[#212B36] placeholder:text-[#9aa0a6] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e] transition-colors";
const labelCls = "block text-[13px] font-medium text-[#212B36] mb-1.5";

type Props = {
  tenant: PlatformTenant | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditCompanyModal({
  tenant,
  open,
  onClose,
  onSuccess,
}: Props) {
  const [plan, setPlan] = useState("");
  const [maxUsers, setMaxUsers] = useState(10);
  const [maxBranches, setMaxBranches] = useState(1);
  const [maxRoles, setMaxRoles] = useState(5);
  const [isEnabled, setIsEnabled] = useState(true);
  const [status, setStatus] = useState("active");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [packages, setPackages] = useState<PublicPackage[]>([]);

  useEffect(() => {
    if (!open) return;
    fetchPublicPackages().then(setPackages);
  }, [open]);

  useEffect(() => {
    if (tenant) {
      setPlan(tenant.plan || "");
      setMaxUsers(tenant.max_users);
      setMaxBranches(tenant.max_branches);
      setMaxRoles(tenant.max_roles || 5);
      setIsEnabled(tenant.is_enabled);
      setStatus(tenant.status);
      setLogoPreview(tenant.logo_url);
    }
  }, [tenant]);

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !tenant) return;
    const token = getAccessToken();
    if (!token) return;
    const result = await uploadTenantLogo(token, tenant.id, file);
    if (result.ok && result.body.success && result.body.data?.logo) {
      setLogoPreview(result.body.data.logo.url);
    }
  }

  async function handleRemoveLogo() {
    if (!tenant) return;
    const token = getAccessToken();
    if (!token) return;
    await removeTenantLogo(token, tenant.id);
    setLogoPreview(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!tenant) return;
    setError("");
    setSubmitting(true);
    const token = getAccessToken();
    if (!token) {
      setError("Authentication required.");
      setSubmitting(false);
      return;
    }
    const result = await updatePlatformTenant(token, tenant.id, {
      plan,
      max_users: maxUsers,
      max_branches: maxBranches,
      max_roles: maxRoles,
      is_enabled: isEnabled,
      status: isEnabled ? status : tenant.status,
    });
    setSubmitting(false);
    if (result.ok && result.body.success) {
      onSuccess();
      onClose();
    } else {
      setError(result.body.message || "Failed to update tenant.");
    }
  }

  if (!open || !tenant) return null;

  return (
    <div className="fixed inset-0 z-[1050] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-[640px] max-h-[90vh] flex flex-col shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
          <h4 className="m-0 text-[18px] font-bold text-[#212B36]">
            Edit Company
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

            {/* Logo upload */}
            <div className="flex items-center flex-wrap gap-3 bg-[#f8f9fa] rounded-md p-3">
              <span className="w-[72px] h-[72px] rounded-full border border-dashed border-[#cfd4da] flex items-center justify-center text-[#646B72] shrink-0 overflow-hidden">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    className="w-full h-full object-cover"
                    alt="Company logo"
                  />
                ) : (
                  <i className="ti ti-building text-[24px]" />
                )}
              </span>
              <div>
                <h6 className="mb-1 text-[14px] font-semibold text-[#212B36]">
                  Company Logo
                </h6>
                <p className="text-[12px] text-[#646B72] mb-2">
                  Image should be below 4 MB
                </p>
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center px-3 py-1.5 rounded-md bg-[#0ac79e] text-white text-[13px] font-medium cursor-pointer hover:bg-[#089b7c] transition-colors">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleLogoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                  {logoPreview && (
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      className="px-3 py-1.5 rounded-md border border-[#e7e7e7] text-[#646B72] text-[13px] font-medium hover:bg-[#f6f6f6]"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 min-[768px]:col-span-6">
                <label className={labelCls}>Plan</label>
                <select
                  className={inputCls}
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                >
                  {packages.length === 0 && (
                    <option value={plan || ""}>{plan || "Loading..."}</option>
                  )}
                  {packages.map((pkg) => (
                    <option key={pkg.slug} value={pkg.slug}>
                      {pkg.name}
                      {pkg.is_trial ? " (Trial)" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 min-[768px]:col-span-6">
                <label className={labelCls}>Status</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isEnabled}
                      onChange={(e) => setIsEnabled(e.target.checked)}
                      className="accent-[#0ac79e]"
                    />
                    <span className="text-[13px] text-[#212B36]">
                      {isEnabled ? "Active" : "Inactive"}
                    </span>
                  </label>
                  {isEnabled && (
                    <select
                      className={inputCls + " !w-auto"}
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="active">Active</option>
                      <option value="trial">Trial</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  )}
                </div>
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
          </div>

          <div className="flex items-center justify-end gap-2 p-4 border-t border-[#f1f1f1]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[14px] font-medium hover:bg-[#f6f6f6] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] transition-colors disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
