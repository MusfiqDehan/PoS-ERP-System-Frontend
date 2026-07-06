"use client";

import BlogCommentsComponent from "@/components/cms/blog/blogComments";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function BlogComments() {
  return (
    <PermissionGuard featureKey="platform.blogs">
      <BlogCommentsComponent />
    </PermissionGuard>
  );
}
