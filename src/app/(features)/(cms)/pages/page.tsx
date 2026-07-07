"use client";

import PagesListComponent from "@/components/cms/pages";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function Page() {
  return (
    <PermissionGuard featureKey="platform.pages">
      <PagesListComponent />
    </PermissionGuard>
  );
}
