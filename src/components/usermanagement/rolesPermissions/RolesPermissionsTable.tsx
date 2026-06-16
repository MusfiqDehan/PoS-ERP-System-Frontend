"use client";

import Table from "@/core/common/pagination/datatable";
import { useRolesPermissions } from "@/hooks/usermanagement/useRolesPermissions";
import { rolesPermissionsColumns } from "./columns";
import RolesPermissionsFilters from "./RolesPermissionsFilters";

export default function RolesPermissionsTable() {
  const { dataSource } = useRolesPermissions();

  return (
    <div className="overflow-hidden rounded-lg border border-[#e7e7e7] bg-white">
      <RolesPermissionsFilters />
      <div className="p-4">
        <div className="overflow-x-auto">
          <Table columns={rolesPermissionsColumns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}
