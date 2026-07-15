"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useActiveBranch } from "@/providers/branch-provider";
import { useAuth } from "@/providers/auth-provider";
import DashboardDateRange from "./DashboardDateRange";
import CollapesIcon from "@/core/common/tooltip-content/collapes";

function formatRoleLabel(
  roleSlugs: string[] | undefined,
  isTenantAdmin: boolean,
): string {
  if (isTenantAdmin || roleSlugs?.includes("admin")) {
    return "Administrator";
  }
  if (roleSlugs?.includes("branch_manager")) {
    return "Branch Manager";
  }
  const slug = roleSlugs?.[0];
  if (!slug) return "Team Member";
  return slug
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function PageHeader() {
  const { user, loading: userLoading } = useCurrentUser();
  const { activeBranch, loading: branchLoading } = useActiveBranch();
  const { tenantAccess } = useAuth();

  const displayName = userLoading
    ? "…"
    : user?.full_name?.trim() || user?.email || "User";

  const roleLabel = formatRoleLabel(
    tenantAccess?.role_slugs,
    tenantAccess?.is_tenant_admin ?? false,
  );

  const branchName = branchLoading
    ? null
    : activeBranch?.name ?? null;

  const subtitle = userLoading || branchLoading
    ? "Loading your workspace overview…"
    : branchName
      ? `${branchName} · ${roleLabel}`
      : `${roleLabel} · all branches`;

  return (
    <div className="d-lg-flex align-items-center justify-content-between mb-4">
      <div>
        <h2 className="mb-1 text-[24px] font-bold whitespace-nowrap">
          {userLoading ? "Welcome" : `Welcome, ${displayName}`}
        </h2>
        <p className="mb-0 text-muted">{subtitle}</p>
      </div>
      <ul className="table-top-head">
        <li>
          <DashboardDateRange />
        </li>
        <CollapesIcon />
      </ul>
    </div>
  );
}
