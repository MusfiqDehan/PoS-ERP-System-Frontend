"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import AttendanceEmployeeComponent from "@/components/hrm/attendance-employee";

export default function AttendanceEmloyee(){
    return(
        <PermissionGuard featureKey="attendance">
            <AttendanceEmployeeComponent />
        </PermissionGuard>
    )
}