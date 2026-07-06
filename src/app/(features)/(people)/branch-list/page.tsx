"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import BranchListComponent from "@/components/people/storelist";

export default function BranchList() {
  return (
    <PermissionGuard featureKey="branches">
      <BranchListComponent />
    </PermissionGuard>
  );
}
