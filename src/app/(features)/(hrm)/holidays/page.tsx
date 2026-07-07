"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import HolidaysComponent from "@/components/hrm/holidays";

export default function Holidays(){
    return(
        <PermissionGuard featureKey="holidays">
            <HolidaysComponent />
        </PermissionGuard>
    )
}