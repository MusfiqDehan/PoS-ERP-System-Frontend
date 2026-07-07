"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import DepartmentListComponent from "@/components/hrm/departmentlist";

export default function DepartmentList(){
    return(
        <PermissionGuard featureKey="departments">
            <DepartmentListComponent />
        </PermissionGuard>
    )
}