"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import WareHousesComponent from "@/components/people/warehouses";

export default function Warehouse() {
  return (
    <PermissionGuard featureKey="warehouses">
      <WareHousesComponent />
    </PermissionGuard>
  );
}
