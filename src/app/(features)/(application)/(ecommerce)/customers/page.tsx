"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import CustomersComponent from "@/components/application/ecommerce/customers/customers";

export default function Customer(){
    return(
        <PermissionGuard featureKey="customers">
            <CustomersComponent />
        </PermissionGuard>
    )
}