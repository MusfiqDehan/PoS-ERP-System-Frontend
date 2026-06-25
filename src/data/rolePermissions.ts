// Role-based access tiers for the SaaS POS.
//
// Three audiences (see SAAS_PLAN.md):
//  - platform : the software company / SaaS vendor (root-domain admin)
//  - owner    : the subscriber / business owner (their subdomain, all branches)
//  - manager  : a branch manager (scoped to a single branch)
//
// Menu nodes in `siderbar_data.tsx` may carry an optional `roles` array. When
// present, only those roles see the node; when omitted, the node inherits its
// parent's roles (and a top-level node with no roles is visible to everyone).
// This keeps the data mostly untouched while letting us hide whole sections.

export type AppRole = "platform" | "owner" | "manager";

export const APP_ROLES: { value: AppRole; label: string }[] = [
  { value: "platform", label: "Platform (SaaS Vendor)" },
  { value: "owner", label: "Business Owner" },
  { value: "manager", label: "Branch Manager" },
];

export const DEFAULT_ROLE: AppRole = "owner";

const STORAGE_KEY = "app_role";
const VALID_ROLES: AppRole[] = ["platform", "owner", "manager"];

export function getStoredRole(): AppRole {
  if (typeof window === "undefined") return DEFAULT_ROLE;
  const value = window.localStorage.getItem(STORAGE_KEY) as AppRole | null;
  return value && VALID_ROLES.includes(value) ? value : DEFAULT_ROLE;
}

export const ROLE_CHANGE_EVENT = "app-role-change";

export function setStoredRole(role: AppRole): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, role);
    // Notify other components (e.g. header) in the same tab so role-dependent
    // UI updates live without a reload.
    window.dispatchEvent(new CustomEvent(ROLE_CHANGE_EVENT, { detail: role }));
  }
}

type SidebarNode = {
  roles?: AppRole[];
  submenuItems?: SidebarNode[];
  [key: string]: unknown;
};

// Returns a deep-filtered copy of the sidebar tree containing only the nodes
// the given role may see. A container is dropped when none of its children
// survive the filter.
export function filterSidebarByRole<T extends SidebarNode>(
  sections: T[],
  role: AppRole,
): T[] {
  return sections
    .map((section) => filterNode(section, role, undefined))
    .filter((node): node is T => node !== null);
}

function filterNode<T extends SidebarNode>(
  node: T,
  role: AppRole,
  inherited: AppRole[] | undefined,
): T | null {
  const effective = node.roles ?? inherited;
  const allowed = !effective || effective.includes(role);
  if (!allowed) return null;

  if (Array.isArray(node.submenuItems)) {
    const children = node.submenuItems
      .map((child) => filterNode(child, role, effective))
      .filter((child): child is SidebarNode => child !== null);

    if (children.length === 0) return null;
    return { ...node, submenuItems: children };
  }

  return node;
}
