"use client";

import AllBlogsComponent from "@/components/cms/blog/allBlogs";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function AllBlogs() {
  return (
    <PermissionGuard featureKey="platform.blogs">
      <AllBlogsComponent />
    </PermissionGuard>
  );
}
