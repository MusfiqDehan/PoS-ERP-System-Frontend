"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import PayrollListComponent from "@/components/hrm/payroll-list";

export default function EmployeeSalary(){
    return(
        <PermissionGuard featureKey="payroll">
            <PayrollListComponent />
        </PermissionGuard>
    )
}