"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import SuppliersComponent from "@/components/people/suppliers";

export default function Suppliers(){
    return(
        <PermissionGuard featureKey="suppliers">
            <SuppliersComponent />
        </PermissionGuard>
    )
}