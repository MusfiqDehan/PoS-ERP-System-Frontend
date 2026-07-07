"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import EditEmployeeComponent from "@/components/hrm/editemployee";

export default function EditEmployee(){
    return(
        <PermissionGuard featureKey="employees" requiredLevel="edit">
            <EditEmployeeComponent />
        </PermissionGuard>
    )
}