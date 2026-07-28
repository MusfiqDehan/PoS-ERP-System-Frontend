"use client";

import CountriesComponent from "@/components/cms/location/countries";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function Countries() {
  return (
    <PermissionGuard featureKey="platform.locations">
      <CountriesComponent />
    </PermissionGuard>
  );
}
