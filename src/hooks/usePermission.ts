"use client";

import { useAuth } from "@/providers/auth-provider";

export type PermissionLevel = "none" | "view" | "edit" | "full";

const LEVEL_HIERARCHY: Record<PermissionLevel, number> = {
  none: 0,
  view: 1,
  edit: 2,
  full: 3,
};

/**
 * Check whether the current user has at least `requiredLevel` for `featureKey`.
 *
 * Works for both tenant and platform sessions:
 *  - Tenant admins are auto-allowed for all features.
 *  - Platform users check `platformAccess.permissions`.
 *  - Tenant users check `tenantAccess.permissions`.
 */
export function usePermission(
  featureKey: string,
  requiredLevel: PermissionLevel = "view",
): { allowed: boolean; loading: boolean } {
  const { loading, sessionKind, tenantAccess, platformAccess } = useAuth();

  if (loading) return { allowed: false, loading: true };

  if (!sessionKind) return { allowed: false, loading: false };

  if (sessionKind === "platform") {
    if (!platformAccess) return { allowed: false, loading: false };
    const actual = (platformAccess.permissions[featureKey] ?? "none") as PermissionLevel;
    return {
      allowed: LEVEL_HIERARCHY[actual] >= LEVEL_HIERARCHY[requiredLevel],
      loading: false,
    };
  }

  // Tenant session
  if (!tenantAccess) return { allowed: false, loading: false };

  if (tenantAccess.is_tenant_admin) return { allowed: true, loading: false };

  const actual = (tenantAccess.permissions[featureKey] ?? "none") as PermissionLevel;
  return {
    allowed: LEVEL_HIERARCHY[actual] >= LEVEL_HIERARCHY[requiredLevel],
    loading: false,
  };
}

/**
 * Standalone helper (no hook) for checking a permission level against a map.
 * Useful inside sidebar filtering where hooks cannot be called.
 */
export function hasPermission(
  permissions: Record<string, string>,
  featureKey: string,
  requiredLevel: PermissionLevel = "view",
): boolean {
  const actual = (permissions[featureKey] ?? "none") as PermissionLevel;
  return LEVEL_HIERARCHY[actual] >= LEVEL_HIERARCHY[requiredLevel];
}
