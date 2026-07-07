"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import EmployeesListComponent from "@/components/hrm/employeesList";

export default function EmployeeList(){
    return(
        <PermissionGuard featureKey="employees">
            <EmployeesListComponent />
        </PermissionGuard>
    )
}