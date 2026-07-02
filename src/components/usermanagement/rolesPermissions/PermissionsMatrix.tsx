"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import AccessSelect from "./AccessSelect";
import {
  ACCESS_LEVELS,
  ACCESS_LEVEL_KEYS,
  type AccessLevel,
} from "./permissionsMatrixData";
import {
  fetchFeatureCatalog,
  type FeatureCatalogItem,
} from "@/lib/access";
import {
  fetchRolePermissions,
  replaceRolePermissions,
  type TenantRole,
} from "@/lib/roles";
import { getAccessToken } from "@/lib/auth-session";

type Props = {
  roles: TenantRole[];
  rolesLoading: boolean;
  refreshKey: number;
  onPermissionsSaved?: () => void;
};

/** Unwrap { items: [...] } or direct array from API envelope data. */
function unwrapItems<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];
  const obj = data as Record<string, unknown> | null;
  if (obj?.items && Array.isArray(obj.items)) return obj.items as T[];
  return [];
}

type RoleColInfo = {
  key: string;
  label: string;
  isSystem: boolean;
};

const FEATURE_COL_WIDTH = 180;
const ROLE_COL_MIN = 120;
const COLUMN_GAP = 12;
const VISIBLE_ROLE_COLS = 5;

function roleColWidth(roleCount: number) {
  const cols = Math.min(roleCount, VISIBLE_ROLE_COLS);
  return `max(${ROLE_COL_MIN}px, calc((100cqw - ${
    FEATURE_COL_WIDTH + cols * COLUMN_GAP
  }px) / ${cols}))`;
}

const stickyFeatureClass =
  "sticky left-0 z-20 self-stretch bg-white border-r border-[#e7e7e7] shadow-[8px_0_8px_-6px_rgba(0,0,0,0.06)]";

function AccessBadge({ level }: { level: AccessLevel }) {
  const config = ACCESS_LEVELS[level];
  return (
    <div
      className={`mx-auto flex w-fit items-center justify-center gap-1 rounded-[4px] px-3 py-1 ${config.bgClass}`}
    >
      <i
        className={`${config.iconClass} flex h-[18px] w-[18px] items-center justify-center text-[16px] leading-none ${config.textClass}`}
      />
      <span className={`text-sm font-medium leading-normal ${config.textClass}`}>
        {config.label}
      </span>
    </div>
  );
}

/** A map keyed by "roleId:featureKey" → access level string from the API. */
type AccessMap = Record<string, string>;

export default function PermissionsMatrix({ roles, rolesLoading, refreshKey, onPermissionsSaved }: Props) {
  const [features, setFeatures] = useState<FeatureCatalogItem[]>([]);
  const [featuresLoading, setFeaturesLoading] = useState(true);
  const [featuresError, setFeaturesError] = useState<string | null>(null);

  const [accessMap, setAccessMap] = useState<AccessMap>({});
  const [permsLoading, setPermsLoading] = useState(true);

  const [dirtyMap, setDirtyMap] = useState<Record<string, AccessLevel>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // ── Fetch feature catalog ──────────────────────────────────────
  const loadFeatures = useCallback(async () => {
    setFeaturesLoading(true);
    setFeaturesError(null);
    try {
      const res = await fetchFeatureCatalog(getAccessToken());
      if (res.ok && res.body.success) {
        setFeatures(unwrapItems<FeatureCatalogItem>(res.body.data));
      } else {
        setFeaturesError(res.body.message || "Failed to load feature catalog.");
      }
    } catch {
      setFeaturesError("Failed to load feature catalog.");
    } finally {
      setFeaturesLoading(false);
    }
  }, []);

  // ── Fetch per-role permissions ─────────────────────────────────
  const loadPermissions = useCallback(async (roleList: TenantRole[]) => {
    if (roleList.length === 0) {
      setAccessMap({});
      setPermsLoading(false);
      return;
    }

    setPermsLoading(true);
    const map: AccessMap = {};
    const results = await Promise.allSettled(
      roleList.map((r) => fetchRolePermissions(r.id, getAccessToken())),
    );

    roleList.forEach((role, idx) => {
      const result = results[idx];
      if (
        result.status === "fulfilled" &&
        result.value.ok &&
        result.value.body.success
      ) {
        const raw = result.value.body.data as Record<string, unknown>;
        const perms: Array<{ feature_key: string; permission_level: string }> =
          Array.isArray(raw)
            ? (raw as Array<{ feature_key: string; permission_level: string }>)
            : Array.isArray(raw?.permissions)
              ? (raw.permissions as Array<{ feature_key: string; permission_level: string }>)
              : [];
        perms.forEach((p) => {
          map[`${role.id}:${p.feature_key}`] = p.permission_level;
        });
      }
    });
    setAccessMap(map);
    setPermsLoading(false);
  }, []);

  useEffect(() => {
    loadFeatures();
  }, [loadFeatures, refreshKey]);

  useEffect(() => {
    if (!rolesLoading && roles.length > 0) {
      loadPermissions(roles);
    }
  }, [roles, rolesLoading, loadPermissions, refreshKey]);

  // ── Derived data ───────────────────────────────────────────────
  const roleCols = useMemo<RoleColInfo[]>(() => {
    return roles.map((r) => ({
      key: r.id,
      label: r.name,
      isSystem: r.is_system ?? false,
    }));
  }, [roles]);

  /** Group features for display — preserve API group order. */
  const featureGroups = useMemo(() => {
    const order: string[] = [];
    const map = new Map<string, FeatureCatalogItem[]>();
    for (const f of features) {
      const grp = f.group || "Other";
      if (!map.has(grp)) {
        map.set(grp, []);
        order.push(grp);
      }
      map.get(grp)!.push(f);
    }
    return { order, map };
  }, [features]);

  /** Resolve effective access for a (roleId, featureKey) pair. */
  const getAccessLevel = useCallback(
    (roleId: string, featureKey: string, isSystem: boolean): AccessLevel => {
      // Dirty override wins
      const dirtyKey = `${roleId}:${featureKey}`;
      if (dirtyKey in dirtyMap) return dirtyMap[dirtyKey];
      // System roles always full
      if (isSystem) return "full";
      const stored = accessMap[`${roleId}:${featureKey}`];
      if (stored && ACCESS_LEVEL_KEYS.includes(stored as AccessLevel)) {
        return stored as AccessLevel;
      }
      return "none";
    },
    [accessMap, dirtyMap],
  );

  // ── Save handler ───────────────────────────────────────────────
  const hasDirty = Object.keys(dirtyMap).length > 0;

  const handleSave = useCallback(async () => {
    if (!hasDirty) return;
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    // Group dirty cells by roleId
    const byRole = new Map<string, Array<{ feature_key: string; permission_level: string }>>();
    for (const [key, level] of Object.entries(dirtyMap)) {
      const [roleId, featureKey] = key.split(":");
      if (!byRole.has(roleId)) byRole.set(roleId, []);
      byRole.get(roleId)!.push({ feature_key: featureKey!, permission_level: level });
    }

    let failed = false;
    for (const [roleId, perms] of byRole) {
      const role = roles.find((r) => r.id === roleId);
      if (!role || role.is_system) continue;
      // Merge with existing permissions so we don't wipe unedited cells
      const existing = await fetchRolePermissions(roleId, getAccessToken());
      const existingMap = new Map<string, string>();
      if (existing.ok && existing.body.success) {
        const arr = Array.isArray(existing.body.data) ? existing.body.data : [];
        arr.forEach((p: { feature_key: string; permission_level: string }) => {
          existingMap.set(p.feature_key, p.permission_level);
        });
      }
      // Apply dirty overrides
      for (const d of perms) {
        existingMap.set(d.feature_key, d.permission_level);
      }
      const merged = Array.from(existingMap.entries()).map(([feature_key, permission_level]) => ({
        feature_key,
        permission_level,
      }));
      const res = await replaceRolePermissions(roleId, merged, getAccessToken());
      if (!res.ok || !res.body.success) {
        failed = true;
      }
    }

    setSaving(false);
    if (failed) {
      setSaveError("Failed to save some permissions. Please try again.");
    } else {
      setDirtyMap({});
      setSaveSuccess(true);
      onPermissionsSaved?.();
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  }, [hasDirty, dirtyMap, roles, onPermissionsSaved]);

  const handleDiscard = useCallback(() => {
    setDirtyMap({});
    setSaveError(null);
    setSaveSuccess(false);
  }, []);

  const handleCellChange = useCallback(
    (roleId: string, featureKey: string, level: AccessLevel) => {
      const key = `${roleId}:${featureKey}`;
      // Remove if it matches what's in accessMap (i.e., "reverted back")
      const stored = accessMap[key];
      if (stored === level) {
        setDirtyMap((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      } else {
        setDirtyMap((prev) => ({ ...prev, [key]: level }));
      }
    },
    [accessMap],
  );

  // ── Grid style ─────────────────────────────────────────────────
  const gridStyle = useMemo<React.CSSProperties>(
    () => ({
      display: "grid",
      gridTemplateColumns: `${FEATURE_COL_WIDTH}px repeat(${roleCols.length}, ${roleColWidth(roleCols.length)})`,
      columnGap: `${COLUMN_GAP}px`,
    }),
    [roleCols.length],
  );

  // ── Loading / error states ─────────────────────────────────────
  const isLoading = featuresLoading || permsLoading || rolesLoading;
  const hasError = featuresError;

  return (
    <section className="mb-[24px] w-full rounded-lg border border-[#f1f1f1] bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="m-0 text-lg font-semibold leading-normal text-[#333333]">
            Permissions matrix
          </h2>
          <p className="mt-1 mb-0 text-sm font-normal leading-normal text-[#666666]">
            Feature access by role — click a cell to edit.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="text-sm font-medium text-[#237e46]">Saved!</span>
          )}
          {saveError && (
            <span className="text-sm font-medium text-[#c80000]">{saveError}</span>
          )}
          <button
            type="button"
            className="rounded-[2px] border border-[#e7e7e7] px-4 py-1.5 text-sm font-medium leading-normal text-[#666666] disabled:opacity-50"
            disabled={!hasDirty || saving}
            onClick={handleDiscard}
          >
            Discard
          </button>
          <button
            type="button"
            className="rounded-[2px] border border-[#089b7c] bg-[#f1fcf5] px-4 py-1.5 text-sm font-medium leading-normal text-[#089b7c] disabled:opacity-50"
            disabled={!hasDirty || saving}
            onClick={handleSave}
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {hasError ? (
        <div className="mt-6 rounded border border-[#fff0f0] bg-[#fff5f5] p-4 text-center">
          <p className="m-0 text-sm font-medium text-[#c80000]">{hasError}</p>
          <button
            type="button"
            className="mt-2 rounded-[2px] border border-[#e7e7e7] px-3 py-1 text-sm text-[#666666]"
            onClick={() => { loadFeatures(); loadPermissions(roles); }}
          >
            Retry
          </button>
        </div>
      ) : isLoading ? (
        <div className="mt-6 flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#e7e7e7] border-t-[#089b7c]" />
            <span className="text-sm text-[#666666]">Loading permissions…</span>
          </div>
        </div>
      ) : features.length === 0 ? (
        <div className="mt-6 rounded border border-[#f1f1f1] bg-[#fafafa] p-6 text-center">
          <p className="m-0 text-sm text-[#666666]">No features available.</p>
        </div>
      ) : roleCols.length === 0 ? (
        <div className="mt-6 rounded border border-[#f1f1f1] bg-[#fafafa] p-6 text-center">
          <p className="m-0 text-sm text-[#666666]">No roles to display. Create a role first.</p>
        </div>
      ) : (
        <div className="permissions-matrix-scroll mt-4 w-full overflow-x-auto">
          <div className="w-max min-w-full">
            {/* Header row */}
            <div
              className="items-center border-t border-b border-[#089b7c] py-[14px] text-base font-semibold leading-normal text-[#333333]"
              style={gridStyle}
            >
              <p className={`m-0 flex items-center truncate ${stickyFeatureClass}`}>
                Feature
              </p>
              {roleCols.map((col) => (
                <p key={col.key} className="m-0 truncate text-center">
                  {col.label}{col.isSystem ? " ⚙" : ""}
                </p>
              ))}
            </div>

            {/* Grouped feature rows */}
            {featureGroups.order.map((groupName) => (
              <div key={groupName}>
                {featureGroups.map.get(groupName)!.map((feat) => {
                  const isLastInGroup =
                    feat === featureGroups.map.get(groupName)!.slice(-1)[0];
                  const isLastOverall =
                    groupName === featureGroups.order.slice(-1)[0] &&
                    isLastInGroup;
                  return (
                    <div
                      key={feat.key}
                      className={`items-center py-[10px] ${isLastOverall ? "" : "border-b border-[#e7e7e7]"}`}
                      style={gridStyle}
                    >
                      <div className={`flex flex-col justify-center gap-1 pr-3 ${stickyFeatureClass}`}>
                        <p className="m-0 truncate text-base font-semibold leading-normal text-[#212b36]">
                          {feat.name}
                        </p>
                        <p className="m-0 truncate text-sm font-medium leading-normal text-[#666666]">
                          {feat.group}
                        </p>
                      </div>
                      {roleCols.map((col) => {
                        const level = getAccessLevel(col.key, feat.key, col.isSystem);
                        const dirtyKey = `${col.key}:${feat.key}`;
                        const isDirty = dirtyKey in dirtyMap;
                        return col.isSystem ? (
                          <AccessBadge key={col.key} level={level} />
                        ) : (
                          <div key={col.key} className="relative">
                            {isDirty && (
                              <span className="absolute -top-1 right-1 h-2 w-2 rounded-full bg-[#e5950d]" />
                            )}
                            <AccessSelect
                              defaultLevel={level}
                              onLevelChange={(newLevel) =>
                                handleCellChange(col.key, feat.key, newLevel)
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
