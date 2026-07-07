"use client";

import BlogTagsComponent from "@/components/cms/blog/blogTags";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function BlogTags() {
  return (
    <PermissionGuard featureKey="platform.blogs">
      <BlogTagsComponent />
    </PermissionGuard>
  );
}
