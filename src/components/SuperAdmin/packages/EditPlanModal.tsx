"use client";

import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import {
  fetchPlatformPackage,
  updatePlatformPackage,
  fetchPlatformFeatures,
  type Package,
  type PackageUpdatePayload,
  type PlatformFeature,
} from "@/lib/billing";
import { getAccessToken } from "@/lib/auth-session";
import { status as statusOptions } from "@/components/SuperAdmin/packages/planSelectOptions";

const inputCls =
  "w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px] text-[#212B36] placeholder:text-[#9aa0a6] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e] transition-colors";
const labelCls = "block text-[13px] font-medium text-[#212B36] mb-1.5";
const checkboxCls = "w-4 h-4 rounded accent-[#0ac79e]";

type RoleLimitRow = { role_slug: string; max_users: string };

type Props = {
  packageId?: string | null;
  onUpdated?: () => void;
};

export default function EditPlanModal({ packageId, onUpdated }: Props) {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pkg, setPkg] = useState<Package | null>(null);

  const [allFeatures, setAllFeatures] = useState<PlatformFeature[]>([]);
  const [featuresLoading, setFeaturesLoading] = useState(false);

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
  const [isPublic, setIsPublic] = useState(true);
  const [isTrial, setIsTrial] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [selectedFeatureIds, setSelectedFeatureIds] = useState<Set<string>>(new Set());
  const [roleLimits, setRoleLimits] = useState<RoleLimitRow[]>([]);

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
      setFeaturesLoading(true);

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
          setIsPublic(data.is_public);
          setIsTrial(data.is_trial);
          setIsActive(data.is_active);

          const assignedIds = new Set(
            (data.package_features || []).map(function (pf) {
              return pf.feature;
            }),
          );
          setSelectedFeatureIds(assignedIds);

          const existingLimits = (data.role_limits || []).map(function (rl) {
            return { role_slug: rl.role_slug, max_users: String(rl.max_users) };
          });
          setRoleLimits(existingLimits);
        } else {
          setError(result.body.message || "Failed to load package.");
        }
        setFetching(false);
      });

      fetchPlatformFeatures(token).then(function (result) {
        if (result.ok && result.body.success && result.body.data) {
          const data = result.body.data;
          setAllFeatures(Array.isArray(data) ? data : []);
        }
        setFeaturesLoading(false);
      });
    },
    [packageId],
  );

  const tenantFeatures = allFeatures.filter(function (f) {
    return f.scope === "tenant";
  });

  function toggleFeature(featureId: string) {
    setSelectedFeatureIds(function (prev) {
      const next = new Set(prev);
      if (next.has(featureId)) {
        next.delete(featureId);
      } else {
        next.add(featureId);
      }
      return next;
    });
  }

  function toggleAllFeatures() {
    if (selectedFeatureIds.size === tenantFeatures.length) {
      setSelectedFeatureIds(new Set());
    } else {
      setSelectedFeatureIds(new Set(tenantFeatures.map(function (f) { return f.id; })));
    }
  }

  function addRoleLimitRow() {
    setRoleLimits(function (prev) {
      return [...prev, { role_slug: "", max_users: "0" }];
    });
  }

  function updateRoleLimit(index: number, field: keyof RoleLimitRow, value: string) {
    setRoleLimits(function (prev) {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function removeRoleLimit(index: number) {
    setRoleLimits(function (prev) {
      return prev.filter(function (_, i) { return i !== index; });
    });
  }

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
        is_public: isPublic,
        is_trial: isTrial,
        is_active: isActive,
        feature_ids: Array.from(selectedFeatureIds),
      };

      const validRoleLimits = roleLimits.filter(function (rl) {
        return rl.role_slug.trim() !== "";
      });
      payload.role_limits_data = validRoleLimits.map(function (rl) {
        return {
          role_slug: rl.role_slug.trim(),
          max_users: parseInt(rl.max_users, 10) || 0,
        };
      });

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
      packageId, name, description, priceMonthly, priceYearly, sortOrder,
      maxBranches, maxUsers, maxCustomRoles, maxAdmins, maxStaff,
      isPublic, isTrial, isActive, selectedFeatureIds, roleLimits, onUpdated,
    ],
  );

  return (
    <div className="modal fade" id="edit_plans">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
            <h4 className="m-0 text-[18px] font-bold text-[#212B36]">Edit Package</h4>
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
              <div className="p-4 max-h-[70vh] overflow-y-auto">
                {/* Package header info */}
                <div className="flex items-center gap-3 bg-[#f8f9fa] rounded-md p-3 mb-4">
                  <div>
                    <h6 className="mb-1 text-[14px] font-semibold text-[#212B36]">
                      {pkg.name}
                    </h6>
                    <p className="text-[12px] text-[#646B72] m-0">
                      {pkg.slug} &middot; Product: {pkg.software_product_slug}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                  {/* Name & Sort Order */}
                  <div className="col-span-12 min-[768px]:col-span-6">
                    <label className={labelCls}>
                      Package Name <span className="text-[#dc3545]">*</span>
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

                  {/* Pricing */}
                  <div className="col-span-12 min-[768px]:col-span-6">
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[13px] font-medium text-[#212B36]">Monthly Price</label>
                      <span className="text-[12px] text-[#0ac79e] inline-flex items-center gap-1">
                        <i className="fa-solid fa-circle-exclamation" /> Set 0 for free
                      </span>
                    </div>
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

                  {/* Limits */}
                  <div className="col-span-6 min-[768px]:col-span-4">
                    <label className={labelCls}>Max Branches</label>
                    <input
                      type="number"
                      min="0"
                      className={inputCls}
                      value={maxBranches}
                      onChange={function (e) { setMaxBranches(e.target.value); }}
                    />
                  </div>
                  <div className="col-span-6 min-[768px]:col-span-4">
                    <label className={labelCls}>Max Users</label>
                    <input
                      type="number"
                      min="0"
                      className={inputCls}
                      value={maxUsers}
                      onChange={function (e) { setMaxUsers(e.target.value); }}
                    />
                  </div>
                  <div className="col-span-6 min-[768px]:col-span-4">
                    <label className={labelCls}>Max Custom Roles</label>
                    <input
                      type="number"
                      min="0"
                      className={inputCls}
                      value={maxCustomRoles}
                      onChange={function (e) { setMaxCustomRoles(e.target.value); }}
                    />
                  </div>
                  <div className="col-span-6 min-[768px]:col-span-3">
                    <label className={labelCls}>Max Admins</label>
                    <input
                      type="number"
                      min="0"
                      className={inputCls}
                      value={maxAdmins}
                      onChange={function (e) { setMaxAdmins(e.target.value); }}
                    />
                  </div>
                  <div className="col-span-6 min-[768px]:col-span-3">
                    <label className={labelCls}>Max Staff</label>
                    <input
                      type="number"
                      min="0"
                      className={inputCls}
                      value={maxStaff}
                      onChange={function (e) { setMaxStaff(e.target.value); }}
                    />
                  </div>
                  <div className="col-span-6 min-[768px]:col-span-3">
                    <label className={labelCls}>Status</label>
                    <Select
                      classNamePrefix="react-select"
                      options={statusOptions}
                      value={statusOptions.find(function (s) {
                        return s.value === (isActive ? "Active" : "Inactive");
                      })}
                      onChange={function (opt) {
                        setIsActive((opt as any)?.value === "Active");
                      }}
                    />
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-8 mt-4">
                  <label className="flex items-center gap-2 text-[14px] font-medium text-[#212B36] cursor-pointer">
                    <input
                      type="checkbox"
                      className={checkboxCls}
                      checked={isPublic}
                      onChange={function (e) { setIsPublic(e.target.checked); }}
                    />
                    Public (visible on marketing site)
                  </label>
                  <label className="flex items-center gap-2 text-[14px] font-medium text-[#212B36] cursor-pointer">
                    <input
                      type="checkbox"
                      className={checkboxCls}
                      checked={isTrial}
                      onChange={function (e) { setIsTrial(e.target.checked); }}
                    />
                    Trial
                  </label>
                </div>

                {/* Features */}
                <div className="flex items-center justify-between mt-5 mb-3">
                  <h6 className="m-0 text-[14px] font-semibold text-[#212B36]">Package Features</h6>
                  {tenantFeatures.length > 0 && (
                    <label className="flex items-center gap-2 text-[14px] font-medium text-[#212B36] cursor-pointer">
                      <input
                        type="checkbox"
                        className={checkboxCls}
                        checked={selectedFeatureIds.size === tenantFeatures.length && tenantFeatures.length > 0}
                        onChange={toggleAllFeatures}
                      />
                      Select All
                    </label>
                  )}
                </div>
                {featuresLoading ? (
                  <div className="text-[13px] text-[#9aa0a6] mb-4">Loading features...</div>
                ) : tenantFeatures.length === 0 ? (
                  <div className="text-[13px] text-[#9aa0a6] mb-4">No tenant features configured.</div>
                ) : (
                  <div className="grid grid-cols-2 min-[992px]:grid-cols-3 gap-3 mb-4">
                    {tenantFeatures.map(function (feat) {
                      return (
                        <label
                          key={feat.id}
                          className="flex items-center gap-2 text-[14px] font-medium text-[#212B36] cursor-pointer"
                          title={feat.description || feat.key}
                        >
                          <input
                            type="checkbox"
                            className={checkboxCls}
                            checked={selectedFeatureIds.has(feat.id)}
                            onChange={function () { toggleFeature(feat.id); }}
                          />
                          {feat.name}
                        </label>
                      );
                    })}
                  </div>
                )}

                {/* Role Limits */}
                <div className="flex items-center justify-between mt-2 mb-3">
                  <h6 className="m-0 text-[14px] font-semibold text-[#212B36]">Role Limits</h6>
                  <button
                    type="button"
                    onClick={addRoleLimitRow}
                    className="text-[13px] text-[#0ac79e] font-medium hover:underline"
                  >
                    + Add Role Limit
                  </button>
                </div>
                {roleLimits.length === 0 ? (
                  <p className="text-[13px] text-[#9aa0a6] mb-4">
                    No role limits configured.
                  </p>
                ) : (
                  <div className="space-y-2 mb-4">
                    {roleLimits.map(function (rl, idx) {
                      return (
                        <div key={idx} className="flex items-center gap-3">
                          <input
                            type="text"
                            className={inputCls + " flex-1"}
                            value={rl.role_slug}
                            onChange={function (e) { updateRoleLimit(idx, "role_slug", e.target.value); }}
                            placeholder="Role slug (e.g. cashier)"
                          />
                          <input
                            type="number"
                            min="0"
                            className={inputCls + " w-[100px]"}
                            value={rl.max_users}
                            onChange={function (e) { updateRoleLimit(idx, "max_users", e.target.value); }}
                            placeholder="Max users"
                          />
                          <button
                            type="button"
                            onClick={function () { removeRoleLimit(idx); }}
                            className="w-8 h-8 inline-flex items-center justify-center rounded text-[#dc3545] hover:bg-[#fff0f0]"
                          >
                            <i className="ti ti-trash" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Description */}
                <div className="mt-2">
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
