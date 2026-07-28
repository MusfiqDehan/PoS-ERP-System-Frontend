"use client";

import BlogCategoriesComponent from "@/components/cms/blog/blogCategories";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function BlogCategories() {
  return (
    <PermissionGuard featureKey="platform.blogs">
      <BlogCategoriesComponent />
    </PermissionGuard>
  );
}
