"use client";

import { useState, useMemo } from "react";
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
      value: isLoading ? "…" : String(roleCount),
      badgeText: isLoading ? "Loading…" : roleCount > 0 ? "Active roles" : "No roles yet",
      badgeVariant: roleCount > 0 ? "success" : "danger",
      iconClass: "ti ti-shield",
    },
    {
      id: "team-members",
      label: "Team Members",
      value: isLoading ? "…" : String(userCount),
      badgeText: isLoading ? "Loading…" : userCount > 0 ? "Assigned members" : "No assignments yet",
      badgeVariant: userCount > 0 ? "success" : "danger",
      iconClass: "ti ti-users",
    },
    {
      id: "permissions",
      label: "Permissions",
      value: isLoading ? "…" : "—",
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
      members: assignments.filter((a) => a.role.slug === role.slug).length,
    }));
  }, [roles, assignments, loading]);

  return (
    <>
      <div className="page-wrapper mb-6">
        <div className="content mb-6">
          <PageHeader />
          <RolesPermissionsKpiCards data={kpiData} />
          <RolesCards data={liveRoleCards} onSelectRole={(slug, name) => setSelectedRole({ slug, name })} />
          <PermissionsMatrix />
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
