"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import EmployeesGridComponent from "@/components/hrm/employeesgrid";

export default function EmployeesGrid() {
  return (
    <PermissionGuard featureKey="employees">
      <EmployeesGridComponent />
    </PermissionGuard>
  );
}
