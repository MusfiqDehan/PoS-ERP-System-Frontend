import AddRole from "@/core/modals/usermanagement/addrole";
import EditRole from "@/core/modals/usermanagement/editrole";
import DeleteRoleModal from "@/components/usermanagement/rolesPermissions/DeleteRoleModal";
import PageHeader from "@/components/usermanagement/rolesPermissions/PageHeader";
import RolesPermissionsKpiCards from "@/components/usermanagement/rolesPermissions/RolesPermissionsKpiCards";
import RolesPermissionsTable from "@/components/usermanagement/rolesPermissions/RolesPermissionsTable";

export default function RolesPermissions() {
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <RolesPermissionsKpiCards />
          <RolesPermissionsTable />
        </div>
      </div>
      <AddRole />
      <EditRole />
      <DeleteRoleModal />
    </>
  );
}
