/**
 * Role-based navigation tiers for the SaaS POS UI.
 *
 * Tiers map to optional `roles` tags on sidebar nodes. Effective tier is derived
 * from the authenticated session and backend permission payload — never from
 * client-side user selection.
 */

import type { SessionKind } from "@/lib/auth-session";

export type AppTier = "platform" | "owner" | "manager";

export type TenantAccessPayload = {
  role_slugs: string[];
  is_tenant_admin: boolean;
  permissions: Record<string, string>;
  enabled_features: string[];
};

export type PlatformAccessPayload = {
  permissions: Record<string, string>;
};

const LEGACY_STORAGE_KEY = "app_role";

/** Remove deprecated client-side role switcher value from localStorage. */
export function removeLegacyAppRole(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  }
}

/** Derive the sidebar tier from session kind and tenant access payload. */
export function deriveAccessTier(
  sessionKind: SessionKind | null,
  tenantAccess: TenantAccessPayload | null,
): AppTier | null {
  if (!sessionKind) return null;
  if (sessionKind === "platform") return "platform";
  if (!tenantAccess) return "manager";

  if (tenantAccess.is_tenant_admin || tenantAccess.role_slugs.includes("admin")) {
    return "owner";
  }
  if (tenantAccess.role_slugs.includes("branch_manager")) {
    return "manager";
  }
  return "manager";
}

/** Whether the header branch/store selector should be hidden. */
export function shouldHideStoreSelector(
  tier: AppTier | null,
  tenantAccess: TenantAccessPayload | null,
): boolean {
  if (tier !== "manager") return false;
  if (!tenantAccess) return true;
  return !tenantAccess.is_tenant_admin;
}

type SidebarNode = {
  roles?: AppTier[];
  submenuItems?: SidebarNode[];
  [key: string]: unknown;
};

/** Deep-filter sidebar tree to nodes visible for the given access tier. */
export function filterSidebarByAccess<T extends SidebarNode>(
  sections: T[],
  tier: AppTier | null,
): T[] {
  if (!tier) return [];
  return sections
    .map((section) => filterNode(section, tier, undefined))
    .filter((node): node is T => node !== null);
}

function filterNode<T extends SidebarNode>(
  node: T,
  tier: AppTier,
  inherited: AppTier[] | undefined,
): T | null {
  const effective = node.roles ?? inherited;
  const allowed = !effective || effective.includes(tier);
  if (!allowed) return null;

  if (Array.isArray(node.submenuItems)) {
    const children = node.submenuItems
      .map((child) => filterNode(child, tier, effective))
      .filter((child): child is SidebarNode => child !== null);

    if (children.length === 0) return null;
    return { ...node, submenuItems: children };
  }

  return node;
}

/** @deprecated Use filterSidebarByAccess with deriveAccessTier instead. */
export const filterSidebarByRole = filterSidebarByAccess;
