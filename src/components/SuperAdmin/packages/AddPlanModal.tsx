"use client";

import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import {
  createPlatformPackage,
  fetchPlatformProducts,
  fetchPlatformFeatures,
  type PackageCreatePayload,
  type SoftwareProduct,
  type PlatformFeature,
} from "@/lib/billing";
import { getAccessToken } from "@/lib/auth-session";
import { status as statusOptions } from "@/components/SuperAdmin/packages/planSelectOptions";

const inputCls =
  "w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px] text-[#212B36] placeholder:text-[#9aa0a6] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e] transition-colors";
const labelCls = "block text-[13px] font-medium text-[#212B36] mb-1.5";
const checkboxCls = "w-4 h-4 rounded accent-[#0ac79e]";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

type RoleLimitRow = { role_slug: string; max_users: string };

type Props = {
  onCreated?: () => void;
};

export default function AddPlanModal({ onCreated }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [products, setProducts] = useState<SoftwareProduct[]>([]);
  const [features, setFeatures] = useState<PlatformFeature[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [featuresLoading, setFeaturesLoading] = useState(true);

  const [softwareProduct, setSoftwareProduct] = useState<string>("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [description, setDescription] = useState("");
  const [priceMonthly, setPriceMonthly] = useState("");
  const [priceYearly, setPriceYearly] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isTrial, setIsTrial] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState("0");
  const [maxBranches, setMaxBranches] = useState("1");
  const [maxUsers, setMaxUsers] = useState("10");
  const [maxCustomRoles, setMaxCustomRoles] = useState("0");
  const [maxAdmins, setMaxAdmins] = useState("0");
  const [maxStaff, setMaxStaff] = useState("0");
  const [selectedFeatureIds, setSelectedFeatureIds] = useState<Set<string>>(new Set());
  const [roleLimits, setRoleLimits] = useState<RoleLimitRow[]>([]);

  useEffect(function () {
    const token = getAccessToken();
    if (!token) {
      setProductsLoading(false);
      setFeaturesLoading(false);
      return;
    }

    fetchPlatformProducts(token).then(function (result) {
      if (result.ok && result.body.success && result.body.data) {
        const data = result.body.data;
        setProducts(Array.isArray(data) ? data : []);
      }
      setProductsLoading(false);
    });

    fetchPlatformFeatures(token).then(function (result) {
      if (result.ok && result.body.success && result.body.data) {
        const data = result.body.data;
        setFeatures(Array.isArray(data) ? data : []);
      }
      setFeaturesLoading(false);
    });
  }, []);

  function handleNameChange(value: string) {
    setName(value);
    if (!slugManual) {
      setSlug(slugify(value));
    }
  }

  function handleSlugChange(value: string) {
    setSlugManual(true);
    setSlug(value);
  }

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

  const tenantFeatures = features.filter(function (f) {
    return f.scope === "tenant";
  });

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

  function resetForm() {
    setSoftwareProduct("");
    setName("");
    setSlug("");
    setSlugManual(false);
    setDescription("");
    setPriceMonthly("");
    setPriceYearly("");
    setIsPublic(true);
    setIsTrial(false);
    setIsActive(true);
    setSortOrder("0");
    setMaxBranches("1");
    setMaxUsers("10");
    setMaxCustomRoles("0");
    setMaxAdmins("0");
    setMaxStaff("0");
    setSelectedFeatureIds(new Set());
    setRoleLimits([]);
    setError(null);
  }

  const handleSubmit = useCallback(
    async function (e: React.FormEvent) {
      e.preventDefault();

      const token = getAccessToken();
      if (!token) {
        setError("You must be signed in as a platform admin.");
        return;
      }

      if (!softwareProduct) {
        setError("Please select a software product.");
        return;
      }
      if (!name.trim()) {
        setError("Plan name is required.");
        return;
      }
      if (!slug.trim()) {
        setError("Plan slug is required.");
        return;
      }

      setLoading(true);
      setError(null);

      const payload: PackageCreatePayload = {
        software_product: softwareProduct,
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim() || undefined,
        price_monthly: priceMonthly || "0.00",
        price_yearly: priceYearly || "0.00",
        is_public: isPublic,
        is_trial: isTrial,
        is_active: isActive,
        sort_order: sortOrder ? parseInt(sortOrder, 10) : 0,
        max_branches: maxBranches ? parseInt(maxBranches, 10) : 1,
        max_users: maxUsers ? parseInt(maxUsers, 10) : 10,
        max_custom_roles: maxCustomRoles ? parseInt(maxCustomRoles, 10) : 0,
        max_admins: maxAdmins ? parseInt(maxAdmins, 10) : 0,
        max_staff: maxStaff ? parseInt(maxStaff, 10) : 0,
      };

      if (selectedFeatureIds.size > 0) {
        payload.feature_ids = Array.from(selectedFeatureIds);
      }

      const validRoleLimits = roleLimits.filter(function (rl) {
        return rl.role_slug.trim() !== "";
      });
      if (validRoleLimits.length > 0) {
        payload.role_limits_data = validRoleLimits.map(function (rl) {
          return {
            role_slug: rl.role_slug.trim(),
            max_users: parseInt(rl.max_users, 10) || 0,
          };
        });
      }

      try {
        const result = await createPlatformPackage(payload, token);
        if (result.ok && result.body.success) {
          resetForm();
          if (typeof window !== "undefined") {
            const modalEl = document.getElementById("add_plans");
            if (modalEl) {
              const modal = (window as any).bootstrap?.Modal?.getInstance(modalEl);
              if (modal) modal.hide();
            }
          }
          if (onCreated) onCreated();
        } else {
          setError(result.body.message || "Failed to create package.");
        }
      } catch {
        setError("Unable to reach the server.");
      } finally {
        setLoading(false);
      }
    },
    [
      softwareProduct, name, slug, description, priceMonthly, priceYearly,
      isPublic, isTrial, isActive, sortOrder, maxBranches, maxUsers,
      maxCustomRoles, maxAdmins, maxStaff, selectedFeatureIds, roleLimits,
      onCreated,
    ],
  );

  const productOptions = products.map(function (p) {
    return { value: p.id, label: p.name };
  });

  return (
    <div className="modal fade" id="add_plans">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
            <h4 className="m-0 text-[18px] font-bold text-[#212B36]">Add New Package</h4>
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              className="w-7 h-7 inline-flex items-center justify-center rounded-md text-[#646B72] hover:bg-[#f6f6f6]"
            >
              <i className="ti ti-x" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-12 gap-4">
                {/* Software Product */}
                <div className="col-span-12">
                  <label className={labelCls}>
                    Software Product <span className="text-[#dc3545]">*</span>
                  </label>
                  {productsLoading ? (
                    <div className="text-[13px] text-[#9aa0a6]">Loading products...</div>
                  ) : (
                    <Select
                      classNamePrefix="react-select"
                      options={productOptions}
                      value={productOptions.find(function (o) { return o.value === softwareProduct; }) || null}
                      onChange={function (opt) { setSoftwareProduct((opt as any)?.value || ""); }}
                      placeholder="Select a software product"
                      isClearable
                    />
                  )}
                </div>

                {/* Name & Slug */}
                <div className="col-span-12 min-[768px]:col-span-6">
                  <label className={labelCls}>
                    Package Name <span className="text-[#dc3545]">*</span>
                  </label>
                  <input
                    type="text"
                    className={inputCls}
                    value={name}
                    onChange={function (e) { handleNameChange(e.target.value); }}
                    placeholder="e.g. Starter"
                    required
                  />
                </div>
                <div className="col-span-12 min-[768px]:col-span-6">
                  <label className={labelCls}>
                    Slug <span className="text-[#dc3545]">*</span>
                  </label>
                  <input
                    type="text"
                    className={inputCls}
                    value={slug}
                    onChange={function (e) { handleSlugChange(e.target.value); }}
                    placeholder="auto-generated from name"
                    required
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
                    type="number"
                    step="0.01"
                    min="0"
                    className={inputCls}
                    value={priceMonthly}
                    onChange={function (e) { setPriceMonthly(e.target.value); }}
                    placeholder="0.00"
                  />
                </div>
                <div className="col-span-12 min-[768px]:col-span-6">
                  <label className={labelCls}>Yearly Price</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
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
                  <label className={labelCls}>Sort Order</label>
                  <input
                    type="number"
                    min="0"
                    className={inputCls}
                    value={sortOrder}
                    onChange={function (e) { setSortOrder(e.target.value); }}
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
                  No role limits configured. Click &ldquo;Add Role Limit&rdquo; to restrict users per role.
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
                  placeholder="Optional package description"
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
                onClick={resetForm}
                className="px-4 py-2 rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[14px] font-medium hover:bg-[#f6f6f6] transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] transition-colors disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Package"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
