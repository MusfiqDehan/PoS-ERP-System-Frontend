"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import LeavesAdminComponent from "@/components/hrm/leavesadmin";

export default function LeavesAdmin(){
    return(
        <PermissionGuard featureKey="leaves">
            <LeavesAdminComponent />
        </PermissionGuard>
    )
}