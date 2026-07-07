"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import BillerComponent from "@/components/people/billers";

export default function Billers() {
  return (
    <PermissionGuard featureKey="billers">
      <BillerComponent />
    </PermissionGuard>
  );
}
