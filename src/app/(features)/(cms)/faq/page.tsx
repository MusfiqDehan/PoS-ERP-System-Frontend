"use client";

import FaqComponent from "@/components/cms/faq";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function FAQ() {
  return (
    <PermissionGuard featureKey="platform.faq">
      <FaqComponent />
    </PermissionGuard>
  );
}
