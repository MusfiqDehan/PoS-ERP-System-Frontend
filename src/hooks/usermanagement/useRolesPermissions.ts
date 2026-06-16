import { rolesandpermission } from "@/core/json/rolesandpermissiondata";
import type { RoleRecord } from "@/components/usermanagement/rolesPermissions/types";

export function useRolesPermissions() {
  const dataSource = rolesandpermission as RoleRecord[];

  return { dataSource };
}
