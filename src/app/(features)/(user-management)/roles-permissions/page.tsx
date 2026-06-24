import AddRole from "@/core/modals/usermanagement/addrole";
import AddUsers from "@/core/modals/usermanagement/addusers";
import EditRole from "@/core/modals/usermanagement/editrole";
import DeleteRoleModal from "@/components/usermanagement/rolesPermissions/DeleteRoleModal";
import PageHeader from "@/components/usermanagement/rolesPermissions/PageHeader";
import RolesPermissionsKpiCards from "@/components/usermanagement/rolesPermissions/RolesPermissionsKpiCards";
import RolesCards from "@/components/usermanagement/rolesPermissions/RolesCards";
import PermissionsMatrix from "@/components/usermanagement/rolesPermissions/PermissionsMatrix";
import RoleAssignments from "@/components/usermanagement/rolesPermissions/RoleAssignments";
import RolesPermissionsTable from "@/components/usermanagement/rolesPermissions/RolesPermissionsTable";

export default function RolesPermissions() {
  return (
    <>
      <div className="page-wrapper mb-6">
        <div className="content mb-6">
          <PageHeader />
          <RolesPermissionsKpiCards />
          <RolesCards />
          <PermissionsMatrix />
          <RoleAssignments />
          {/* <RolesPermissionsTable /> */}
        </div>
      </div>
      <AddRole />
      <AddUsers id="assign-role-member" />
      <EditRole />
      <DeleteRoleModal />
    </>
  );
}
