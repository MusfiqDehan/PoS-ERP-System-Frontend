"use client";

import StatesComponent from "@/components/cms/location/states";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function States() {
  return (
    <PermissionGuard featureKey="platform.locations">
      <StatesComponent />
    </PermissionGuard>
  );
}
