"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import PayslipComponent from "@/components/hrm/payslip";

export default function Payslip(){
    return(
        <PermissionGuard featureKey="payroll">
            <PayslipComponent />
        </PermissionGuard>
    )
}