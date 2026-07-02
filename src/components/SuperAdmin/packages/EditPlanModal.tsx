"use client";

import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import {
  fetchPlatformPackage,
  updatePlatformPackage,
  type Package,
  type PackageUpdatePayload,
} from "@/lib/billing";
import { getAccessToken } from "@/lib/auth-session";
import { status } from "@/components/SuperAdmin/packages/planSelectOptions";

const inputCls =
  "w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px] text-[#212B36] placeholder:text-[#9aa0a6] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e] transition-colors";
const labelCls = "block text-[13px] font-medium text-[#212B36] mb-1.5";

type Props = {
  packageId?: string | null;
  onUpdated?: () => void;
};

export default function EditPlanModal({ packageId, onUpdated }: Props) {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pkg, setPkg] = useState<Package | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceMonthly, setPriceMonthly] = useState("");
  const [priceYearly, setPriceYearly] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [maxBranches, setMaxBranches] = useState("");
  const [maxUsers, setMaxUsers] = useState("");
  const [maxCustomRoles, setMaxCustomRoles] = useState("");
  const [maxAdmins, setMaxAdmins] = useState("");
  const [maxStaff, setMaxStaff] = useState("");
  const [isTrial, setIsTrial] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(
    function () {
      if (!packageId) {
        setPkg(null);
        return;
      }

      const token = getAccessToken();
      if (!token) return;

      setFetching(true);
      setError(null);

      fetchPlatformPackage(packageId, token).then(function (result) {
        if (result.ok && result.body.success && result.body.data) {
          const data = result.body.data as Package;
          setPkg(data);
          setName(data.name || "");
          setDescription(data.description || "");
          setPriceMonthly(data.price_monthly || "");
          setPriceYearly(data.price_yearly || "");
          setSortOrder(String(data.sort_order ?? 0));
          setMaxBranches(String(data.max_branches ?? ""));
          setMaxUsers(String(data.max_users ?? ""));
          setMaxCustomRoles(String(data.max_custom_roles ?? ""));
          setMaxAdmins(String(data.max_admins ?? ""));
          setMaxStaff(String(data.max_staff ?? ""));
          setIsTrial(data.is_trial);
          setIsActive(data.is_active);
        } else {
          setError(result.body.message || "Failed to load package.");
        }
        setFetching(false);
      });
    },
    [packageId],
  );

  const handleSave = useCallback(
    async function (e: React.FormEvent) {
      e.preventDefault();
      if (!packageId) return;

      const token = getAccessToken();
      if (!token) {
        setError("You must be signed in as a platform admin.");
        return;
      }

      setLoading(true);
      setError(null);

      const payload: PackageUpdatePayload = {
        name: name || undefined,
        description: description || undefined,
        price_monthly: priceMonthly || undefined,
        price_yearly: priceYearly || undefined,
        sort_order: sortOrder ? parseInt(sortOrder, 10) : undefined,
        max_branches: maxBranches ? parseInt(maxBranches, 10) : undefined,
        max_users: maxUsers ? parseInt(maxUsers, 10) : undefined,
        max_custom_roles: maxCustomRoles ? parseInt(maxCustomRoles, 10) : undefined,
        max_admins: maxAdmins ? parseInt(maxAdmins, 10) : undefined,
        max_staff: maxStaff ? parseInt(maxStaff, 10) : undefined,
        is_trial: isTrial,
        is_active: isActive,
      };

      try {
        const result = await updatePlatformPackage(packageId, payload, token);
        if (result.ok && result.body.success) {
          if (onUpdated) onUpdated();
        } else {
          setError(result.body.message || "Failed to update package.");
        }
      } catch {
        setError("Unable to reach the server.");
      } finally {
        setLoading(false);
      }
    },
    [
      packageId,
      name,
      description,
      priceMonthly,
      priceYearly,
      sortOrder,
      maxBranches,
      maxUsers,
      maxCustomRoles,
      maxAdmins,
      maxStaff,
      isTrial,
      isActive,
      onUpdated,
    ],
  );

  return (
    <div className="modal fade" id="edit_plans">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
            <h4 className="m-0 text-[18px] font-bold text-[#212B36]">Edit Plan</h4>
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              className="w-7 h-7 inline-flex items-center justify-center rounded-md text-[#646B72] hover:bg-[#f6f6f6]"
            >
              <i className="ti ti-x" />
            </button>
          </div>

          {fetching ? (
            <div className="p-6 text-center text-muted">Loading package...</div>
          ) : pkg ? (
            <form onSubmit={handleSave}>
              <div className="p-4">
                <div className="flex items-center gap-3 bg-[#f8f9fa] rounded-md p-3 mb-4">
                  <div>
                    <h6 className="mb-1 text-[14px] font-semibold text-[#212B36]">
                      {pkg.name}
                    </h6>
                    <p className="text-[12px] text-[#646B72] m-0">
                      {pkg.slug}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 min-[768px]:col-span-6">
                    <label className={labelCls}>
                      Plan Name <span className="text-[#dc3545]">*</span>
                    </label>
                    <input
                      type="text"
                      className={inputCls}
                      value={name}
                      onChange={function (e) { setName(e.target.value); }}
                      required
                    />
                  </div>
                  <div className="col-span-12 min-[768px]:col-span-6">
                    <label className={labelCls}>Sort Order</label>
                    <input
                      type="number"
                      className={inputCls}
                      value={sortOrder}
                      onChange={function (e) { setSortOrder(e.target.value); }}
                    />
                  </div>
                  <div className="col-span-12 min-[768px]:col-span-6">
                    <label className={labelCls}>Monthly Price</label>
                    <input
                      type="text"
                      className={inputCls}
                      value={priceMonthly}
                      onChange={function (e) { setPriceMonthly(e.target.value); }}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="col-span-12 min-[768px]:col-span-6">
                    <label className={labelCls}>Yearly Price</label>
                    <input
                      type="text"
                      className={inputCls}
                      value={priceYearly}
                      onChange={function (e) { setPriceYearly(e.target.value); }}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="col-span-6 min-[768px]:col-span-3">
                    <label className={labelCls}>Max Branches</label>
                    <input
                      type="number"
                      className={inputCls}
                      value={maxBranches}
                      onChange={function (e) { setMaxBranches(e.target.value); }}
                    />
                  </div>
                  <div className="col-span-6 min-[768px]:col-span-3">
                    <label className={labelCls}>Max Users</label>
                    <input
                      type="number"
                      className={inputCls}
                      value={maxUsers}
                      onChange={function (e) { setMaxUsers(e.target.value); }}
                    />
                  </div>
                  <div className="col-span-6 min-[768px]:col-span-3">
                    <label className={labelCls}>Max Custom Roles</label>
                    <input
                      type="number"
                      className={inputCls}
                      value={maxCustomRoles}
                      onChange={function (e) { setMaxCustomRoles(e.target.value); }}
                    />
                  </div>
                  <div className="col-span-6 min-[768px]:col-span-3">
                    <label className={labelCls}>Max Admins</label>
                    <input
                      type="number"
                      className={inputCls}
                      value={maxAdmins}
                      onChange={function (e) { setMaxAdmins(e.target.value); }}
                    />
                  </div>
                  <div className="col-span-6 min-[768px]:col-span-3">
                    <label className={labelCls}>Max Staff</label>
                    <input
                      type="number"
                      className={inputCls}
                      value={maxStaff}
                      onChange={function (e) { setMaxStaff(e.target.value); }}
                    />
                  </div>
                  <div className="col-span-6 min-[768px]:col-span-3">
                    <label className={labelCls}>Status</label>
                    <Select
                      classNamePrefix="react-select"
                      options={status}
                      value={status.find(function (s) {
                        return s.value === (isActive ? "Active" : "Inactive");
                      })}
                      onChange={function (opt) {
                        setIsActive((opt as any)?.value === "Active");
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-8 mt-4">
                  <label className="flex items-center gap-2 text-[14px] font-medium text-[#212B36] cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded accent-[#0ac79e]"
                      checked={isTrial}
                      onChange={function (e) { setIsTrial(e.target.checked); }}
                    />
                    Trial
                  </label>
                </div>

                <div className="col-span-12 mt-4">
                  <label className={labelCls}>Description</label>
                  <textarea
                    className={`${inputCls} min-h-[90px]`}
                    value={description}
                    onChange={function (e) { setDescription(e.target.value); }}
                  />
                </div>
              </div>

              {error ? (
                <p className="px-4 text-[14px] text-[#dc3545]">{error}</p>
              ) : null}

              <div className="flex items-center justify-end gap-2 p-4 border-t border-[#f1f1f1]">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  disabled={loading}
                  className="px-4 py-2 rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[14px] font-medium hover:bg-[#f6f6f6] transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] transition-colors disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          ) : error ? (
            <div className="p-6 text-center text-[#dc3545]">{error}</div>
          ) : (
            <div className="p-6 text-center text-muted">
              Select a package to edit.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
