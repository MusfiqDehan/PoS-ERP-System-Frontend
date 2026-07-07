"use client";

import { useEffect, useState } from "react";
import {
  fetchTenantFeatureOverrides,
  patchTenantFeatures,
  PLATFORM_LANDING_KEY,
  type PlatformTenant,
} from "@/lib/platform";
import { getAccessToken } from "@/lib/auth-session";
import {
  subscriptionFeatureKeys,
  TENANT_FEATURE_GROUPS,
} from "./featureGroups";

type Props = {
  tenant: PlatformTenant | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ManageFeaturesModal({
  tenant,
  open,
  onClose,
  onSuccess,
}: Props) {
  const [enabled, setEnabled] = useState<Set<string>>(new Set());
  const [platformFlags, setPlatformFlags] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!tenant || !open) return;
    const token = getAccessToken();
    if (!token) return;

    setLoading(true);
    setError("");
    fetchTenantFeatureOverrides(token, tenant.id).then(function (result) {
      setLoading(false);
      if (!result.ok || !result.body.success || !result.body.data) {
        setError(result.body.message || "Failed to load feature overrides.");
        return;
      }

      const { features, platform_flags: flags } = result.body.data;
      const active = new Set<string>();
      for (const key of subscriptionFeatureKeys()) {
        if (features[key] !== false) {
          active.add(key);
        }
      }
      setEnabled(active);
      setPlatformFlags({
        [PLATFORM_LANDING_KEY]: Boolean(flags?.[PLATFORM_LANDING_KEY]),
      });
    });
  }, [tenant, open]);

  function toggleFeature(key: string) {
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function togglePlatformFlag(key: string) {
    setPlatformFlags((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function toggleGroup(groupKeys: string[]) {
    setEnabled((prev) => {
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

  async function handleSave() {
    if (!tenant) return;
    setError("");
    setSubmitting(true);
    const token = getAccessToken();
    if (!token) {
      setError("Authentication required.");
      setSubmitting(false);
      return;
    }

    const overrides: Record<string, boolean> = {};
    for (const key of subscriptionFeatureKeys()) {
      overrides[key] = enabled.has(key);
    }

    const result = await patchTenantFeatures(token, tenant.id, overrides, {
      [PLATFORM_LANDING_KEY]: Boolean(platformFlags[PLATFORM_LANDING_KEY]),
    });
    setSubmitting(false);
    if (result.ok && result.body.success) {
      onSuccess();
      onClose();
    } else {
      setError(result.body.message || "Failed to update features.");
    }
  }

  if (!open || !tenant) return null;

  const subscriptionGroups = TENANT_FEATURE_GROUPS.filter(
    (group) => group.group !== "Others",
  );
  const othersGroup = TENANT_FEATURE_GROUPS.find((group) => group.group === "Others");

  return (
    <div className="fixed inset-0 z-[1050] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-[600px] max-h-[90vh] flex flex-col shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
          <div>
            <h4 className="m-0 text-[18px] font-bold text-[#212B36]">
              Manage Features
            </h4>
            <p className="m-0 mt-1 text-[13px] text-[#94A3B8]">{tenant.name}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 inline-flex items-center justify-center rounded-md text-[#646B72] hover:bg-[#f6f6f6]"
          >
            <i className="ti ti-x" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {error && (
            <div className="p-3 rounded-md bg-[#fff0f0] text-[#c80000] text-[13px] mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-[13px] text-[#646B72]">Loading features…</p>
          ) : (
            <div className="space-y-4">
              {subscriptionGroups.map((group) => {
                const groupKeys = group.children.map((c) => c.key);
                const allChecked = groupKeys.every((k) => enabled.has(k));
                const someChecked =
                  !allChecked && groupKeys.some((k) => enabled.has(k));

                return (
                  <div
                    key={group.group}
                    className="border border-[#eef0f3] rounded-lg p-3"
                  >
                    <label className="flex items-center justify-between cursor-pointer mb-2">
                      <span className="text-[14px] font-semibold text-[#212B36]">
                        {group.group}
                      </span>
                      <input
                        type="checkbox"
                        checked={allChecked}
                        ref={(el) => {
                          if (el) el.indeterminate = someChecked;
                        }}
                        onChange={() => toggleGroup(groupKeys)}
                        className="accent-[#0ac79e] w-4 h-4"
                      />
                    </label>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {group.children.map((child) => (
                        <label
                          key={child.key}
                          className="flex items-center justify-between cursor-pointer py-1 px-2 rounded hover:bg-[#f8f9fa]"
                        >
                          <span className="text-[13px] text-[#646B72]">
                            {child.name}
                          </span>
                          <input
                            type="checkbox"
                            checked={enabled.has(child.key)}
                            onChange={() => toggleFeature(child.key)}
                            className="accent-[#0ac79e]"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}

              {othersGroup ? (
                <div className="border border-[#eef0f3] rounded-lg p-3">
                  <p className="text-[14px] font-semibold text-[#212B36] mb-2">
                    {othersGroup.group}
                  </p>
                  <div className="space-y-2">
                    {othersGroup.children.map((child) => (
                      <label
                        key={child.key}
                        className="flex items-center justify-between cursor-pointer py-1 px-2 rounded hover:bg-[#f8f9fa]"
                      >
                        <span className="text-[13px] text-[#646B72]">
                          {child.name}
                        </span>
                        <input
                          type="checkbox"
                          checked={Boolean(platformFlags[child.key])}
                          onChange={() => togglePlatformFlag(child.key)}
                          className="accent-[#0ac79e]"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}
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
            type="button"
            onClick={handleSave}
            disabled={submitting || loading}
            className="px-4 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] transition-colors disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Save Features"}
          </button>
        </div>
      </div>
    </div>
  );
}
