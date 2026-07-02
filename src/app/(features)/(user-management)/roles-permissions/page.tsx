"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import AddRole from "@/core/modals/usermanagement/addrole";
import AddUsers from "@/core/modals/usermanagement/addusers";
import EditRole from "@/core/modals/usermanagement/editrole";
import DeleteRoleModal from "@/components/usermanagement/rolesPermissions/DeleteRoleModal";
import PageHeader from "@/components/usermanagement/rolesPermissions/PageHeader";
import RolesPermissionsKpiCards from "@/components/usermanagement/rolesPermissions/RolesPermissionsKpiCards";
import RolesCards from "@/components/usermanagement/rolesPermissions/RolesCards";
import PermissionsMatrix from "@/components/usermanagement/rolesPermissions/PermissionsMatrix";
import RoleAssignments from "@/components/usermanagement/rolesPermissions/RoleAssignments";
import { useRolesPermissions } from "@/hooks/useRolesPermissions";
import { fetchMyFeatures } from "@/lib/access";
import { getAccessToken } from "@/lib/auth-session";
import type { RoleCardData } from "@/components/usermanagement/rolesPermissions/rolesData";
import type { RolesPermissionsKpiCardData } from "@/components/usermanagement/rolesPermissions/rolesPermissionsKpiData";

const ICON_MAP: Record<string, string> = {
  admin: "ti ti-crown",
  manager: "ti ti-user",
  cashier: "ti ti-cash-register",
  accountant: "ti ti-calculator",
  auditor: "ti ti-search",
  supervisor: "ti ti-user-check",
  storekeeper: "ti ti-package",
};

function buildKpiData(
  roleCount: number,
  userCount: number,
  isLoading: boolean,
): RolesPermissionsKpiCardData[] {
  return [
    {
      id: "total-roles",
      label: "Total Roles",
      value: isLoading ? "\u2026" : String(roleCount),
      badgeText: isLoading ? "Loading\u2026" : roleCount > 0 ? "Active roles" : "No roles yet",
      badgeVariant: roleCount > 0 ? "success" : "danger",
      iconClass: "ti ti-shield",
    },
    {
      id: "team-members",
      label: "Team Members",
      value: isLoading ? "\u2026" : String(userCount),
      badgeText: isLoading ? "Loading\u2026" : userCount > 0 ? "Assigned members" : "No assignments yet",
      badgeVariant: userCount > 0 ? "success" : "danger",
      iconClass: "ti ti-users",
    },
    {
      id: "permissions",
      label: "Permissions",
      value: isLoading ? "\u2026" : "\u2014",
      badgeText: "Per-feature access",
      badgeVariant: "success",
      iconClass: "ti ti-shield-check",
    },
    {
      id: "editable",
      label: "Editable",
      value: "Yes",
      badgeText: "You can change roles",
      badgeVariant: "success",
      iconClass: "ti ti-user-edit",
    },
  ];
}

export default function RolesPermissions() {
  const { roles, assignments, loading, reload } = useRolesPermissions();

  const [selectedRole, setSelectedRole] = useState<{
    slug: string;
    name: string;
  } | null>(null);

  const [matrixRefreshKey, setMatrixRefreshKey] = useState(0);
  const [enabledFeatures, setEnabledFeatures] = useState<string[]>([]);

  const loadMyFeatures = useCallback(async () => {
    try {
      const res = await fetchMyFeatures(getAccessToken());
      if (res.ok && res.body.success && res.body.data) {
        const data = res.body.data as Record<string, unknown>;
        if (Array.isArray(data.features)) {
          setEnabledFeatures(data.features as string[]);
        }
      }
    } catch {
      // non-critical
    }
  }, []);

  useEffect(() => {
    loadMyFeatures();
  }, [loadMyFeatures]);

  const kpiData = useMemo(
    () => buildKpiData(roles.length, assignments.length, loading),
    [roles.length, assignments.length, loading],
  );

  const liveRoleCards = useMemo((): RoleCardData[] | undefined => {
    if (loading || roles.length === 0) return undefined;
    return roles.map((role) => ({
      id: role.slug,
      name: role.name,
      description: role.description ?? "",
      iconClass: ICON_MAP[role.slug] ?? "ti ti-shield",
      highlight: role.slug === "admin",
      members: assignments.filter((a) => a.role_slug === role.slug).length,
    }));
  }, [roles, assignments, loading]);

  return (
    <>
      <div className="page-wrapper mb-6">
        <div className="content mb-6">
          <PageHeader />
          <RolesPermissionsKpiCards data={kpiData} />

          {enabledFeatures.length > 0 && (
            <section className="mb-[24px] rounded-lg border border-[#f1f1f1] bg-white p-4">
              <h2 className="m-0 mb-2 text-base font-semibold text-[#333333]">
                Enabled tenant features
              </h2>
              <div className="flex flex-wrap gap-2">
                {enabledFeatures.map((fk) => (
                  <span
                    key={fk}
                    className="inline-flex items-center gap-1 rounded-[4px] bg-[#f1fcf5] px-3 py-1 text-sm font-medium text-[#237e46]"
                  >
                    <i className="ti ti-check text-[14px]" />
                    {fk}
                  </span>
                ))}
              </div>
            </section>
          )}

          <RolesCards
            data={liveRoleCards}
            onSelectRole={(slug, name) => setSelectedRole({ slug, name })}
          />
          <PermissionsMatrix
            roles={roles}
            rolesLoading={loading}
            refreshKey={matrixRefreshKey}
            onPermissionsSaved={() => {
              setMatrixRefreshKey((k) => k + 1);
              reload();
            }}
          />
          <RoleAssignments data={assignments} />
        </div>
      </div>
      <AddRole />
      <AddUsers
        id="assign-role-member"
        preselectedRole={selectedRole}
        onSuccess={reload}
      />
      <EditRole />
      <DeleteRoleModal />
    </>
  );
}
