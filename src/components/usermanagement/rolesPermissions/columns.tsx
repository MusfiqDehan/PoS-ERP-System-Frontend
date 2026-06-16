"use client";

import type { ColumnsType } from "antd/es/table";
import RolesPermissionsActions from "./RolesPermissionsActions";
import type { RoleRecord } from "./types";

export const rolesPermissionsColumns: ColumnsType<RoleRecord> = [
  {
    title: "Role Name",
    dataIndex: "rolename",
    sorter: (a, b) => a.rolename.length - b.rolename.length,
  },
  {
    title: "Created On",
    dataIndex: "createdon",
    sorter: (a, b) => a.createdon.length - b.createdon.length,
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: () => <RolesPermissionsActions />,
  },
];
