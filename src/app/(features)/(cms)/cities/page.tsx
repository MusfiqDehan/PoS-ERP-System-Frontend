"use client";

import CitiesComponent from "@/components/cms/location/cities";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function Cities() {
  return (
    <PermissionGuard featureKey="platform.locations">
      <CitiesComponent />
    </PermissionGuard>
  );
}
