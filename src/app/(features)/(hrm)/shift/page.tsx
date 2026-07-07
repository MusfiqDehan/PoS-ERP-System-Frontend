"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import ShiftComponent from "@/components/hrm/shift";

export default function Shift() {
  return (
    <PermissionGuard featureKey="shifts">
      <ShiftComponent />
    </PermissionGuard>
  );
}
