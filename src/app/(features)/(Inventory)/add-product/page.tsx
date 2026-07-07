"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PermissionGuard } from "@/components/auth/PermissionGuard";
import CommonFooter from "@/core/common/footer/commonFooter";
import ExportButtons from "@/core/common/exportButtons";
import PageHeader from "@/components/Inventory/add-product/PageHeader";
import ProductForm from "@/components/Inventory/add-product/ProductForm";
import { useAddProduct } from "@/hooks/inventory/useAddProduct";
import { all_routes } from "@/data/all_routes";

export default function AddProduct() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleSuccess = () => router.push(all_routes.productlist);
  const form = useAddProduct(handleSuccess);

  if (!mounted || form.loadingOptions) {
    return (
      <PermissionGuard featureKey="add_product" requiredLevel="edit">
        <div className="page-wrapper">
          <div className="content">
            <PageHeader />
            <div className="py-10 text-center text-[#646B72]">Loading form...</div>
          </div>
          <CommonFooter />
        </div>
      </PermissionGuard>
    );
  }

  return (
    <PermissionGuard featureKey="add_product" requiredLevel="edit">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <div className="d-flex gap-3 justify-content-end mb-3">
            <ExportButtons />
          </div>
          <ProductForm form={form} submitLabel="Add Product" />
        </div>
        <CommonFooter />
      </div>
    </PermissionGuard>
  );
}
