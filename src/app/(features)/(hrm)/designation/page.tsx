"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import DesignationComponent from "@/components/hrm/designation";

export default function Designation() {
  return (
    <PermissionGuard featureKey="designations">
      <DesignationComponent />
    </PermissionGuard>
  );
}
