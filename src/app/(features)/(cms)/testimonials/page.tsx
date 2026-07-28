"use client";

import TestimonialComponent from "@/components/cms/testimonial";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function Testimonials() {
  return (
    <PermissionGuard featureKey="platform.testimonials">
      <TestimonialComponent />
    </PermissionGuard>
  );
}
