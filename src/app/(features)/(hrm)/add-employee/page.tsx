"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import AddEmployeeComponent from "@/components/hrm/addemployee";

export default function AddEmployee(){
    return(
        <PermissionGuard featureKey="employees" requiredLevel="edit">
            <AddEmployeeComponent />
        </PermissionGuard>
    )
}