"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import DepartmentGridComponent from "@/components/hrm/departmentgrid";

export default function DepartmentGrid(){
    return(
        <PermissionGuard featureKey="departments">
            <DepartmentGridComponent />
        </PermissionGuard>
    )
}