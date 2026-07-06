"use client";

import BlogDetailsComponent from "@/components/cms/blog/blogDetails";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function BlogDetails() {
  return (
    <PermissionGuard featureKey="platform.blogs">
      <BlogDetailsComponent />
    </PermissionGuard>
  );
}
