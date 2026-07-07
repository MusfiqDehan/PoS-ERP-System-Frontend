"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import LeaveTypesComponent from "@/components/hrm/leavetypes";

export default function LeaveType() {
  return (
    <PermissionGuard featureKey="leaves">
      <LeaveTypesComponent />
    </PermissionGuard>
  );
}
