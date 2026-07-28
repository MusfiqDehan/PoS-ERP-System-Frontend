"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import AttendanceAdminComponent from "@/components/hrm/attendanceadmin";

export default function AttendanceAdmin(){
    return(
        <PermissionGuard featureKey="attendance">
            <AttendanceAdminComponent />
        </PermissionGuard>
    )
}