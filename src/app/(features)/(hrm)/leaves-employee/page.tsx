"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import LeavesEmployeeComponent from "@/components/hrm/leavesemployee";

export default function LeaveEmployee() {
  return (
    <PermissionGuard featureKey="leaves">
      <LeavesEmployeeComponent />
    </PermissionGuard>
  );
}
